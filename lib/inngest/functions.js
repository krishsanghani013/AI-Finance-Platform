import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/react-email-starter/emails/template";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Check Budget Alert Function
export const checkBudgetAlert = inngest.createFunction(
    {
        id: "check-budget-alerts",
        name: "Check Budget Alerts",
        triggers: [{ cron: "0 */6 * * *" }],
    },
    async ({ step }) => {
        const budgets = await step.run("fetch-budget", async () => {
            return await db.budget.findMany({
                include: {
                    user: {
                        include: {
                            accounts: {
                                where: {
                                    isDefault: true,
                                },
                            },
                        },
                    },
                },
            });
        });

        for (const budget of budgets) {
            const defaultAccount = budget.user?.accounts?.[0];
            if (!defaultAccount) {
                console.log(`[Inngest] No default account found for user ${budget.userId}`);
                continue;
            }

            await step.run(`check-budget-${budget.id}`, async () => {
                const currentDate = new Date();
                const startOfMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                const endOfMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999
                );

                const expenses = await db.transaction.aggregate({
                    where: {
                        userId: budget.userId,
                        accountId: defaultAccount.id,
                        type: "EXPENSE",
                        date: {
                            gte: startOfMonth,
                            lte: endOfMonth,
                        },
                    },
                    _sum: {
                        amount: true,
                    },
                });

                const totalExpenses = expenses._sum.amount ? Number(expenses._sum.amount) : 0;
                const budgetAmount = Number(budget.amount);

                if (budgetAmount <= 0) {
                    console.log(`[Inngest] Budget amount is <= 0 for budget ${budget.id}`);
                    return { skipped: "budget amount <= 0" };
                }

                const percentageUsed = (totalExpenses / budgetAmount) * 100;

                console.log(`[Inngest] Budget check stats:`, {
                    userEmail: budget.user?.email,
                    accountName: defaultAccount.name,
                    totalExpenses,
                    budgetAmount,
                    percentageUsed: percentageUsed.toFixed(2) + "%",
                    lastAlertSent: budget.lastAlertSent,
                });

                if (
                    percentageUsed >= 80 &&
                    (!budget.lastAlertSent ||
                        isNewMonth(new Date(budget.lastAlertSent), new Date()))
                ) {
                    try {
                        await sendEmail({
                            to: budget.user.email,
                            subject: `Budget Alert for ${defaultAccount.name}`,
                            react: EmailTemplate({
                                userName: budget.user.name,
                                type: "budget-alert",
                                data: {
                                    percentageUsed,
                                    budgetAmount: budgetAmount.toFixed(1),
                                    totalExpenses: totalExpenses.toFixed(1),
                                    accountName: defaultAccount.name,
                                },
                            }),
                        });
                    } catch (emailErr) {
                        console.error(`[Inngest] Error while sending email:`, emailErr);
                    }

                    // Update lastAlertSent in Supabase
                    await db.budget.update({
                        where: { id: budget.id },
                        data: { lastAlertSent: new Date() },
                    });

                    console.log(`[Inngest] Successfully updated lastAlertSent for budget ${budget.id}`);
                    return { success: true, percentageUsed: percentageUsed.toFixed(2) + "%", updatedLastAlertSent: true };
                }

                return {
                    skipped: "Percentage < 80% or alert already sent this month",
                    percentageUsed: percentageUsed.toFixed(2) + "%",
                    lastAlertSent: budget.lastAlertSent,
                };
            });
        }
    }
);

// 2. Trigger Recurring Transactions Function
export const triggerRecurringTransactions = inngest.createFunction(
    {
        id: "trigger-recurring-transactions",
        name: "Trigger Recurring Transactions",
        triggers: [{ cron: "0 0 * * *" }], // Daily at midnight
    },
    async ({ step }) => {
        const recurringTransactions = await step.run(
            "fetch-recurring-transactions",
            async () => {
                return await db.transaction.findMany({
                    where: {
                        isRecurring: true,
                        status: "COMPLETED",
                        OR: [
                            { lastProcessed: null },
                            {
                                nextRecurringDate: {
                                    lte: new Date(),
                                },
                            },
                        ],
                    },
                });
            }
        );

        // Send event for each recurring transaction
        if (recurringTransactions.length > 0) {
            const events = recurringTransactions.map((transaction) => ({
                name: "transaction.recurring.process",
                data: {
                    transactionId: transaction.id,
                    userId: transaction.userId,
                },
            }));

            // Send events directly using inngest.send()
            await inngest.send(events);
        }

        return { triggered: recurringTransactions.length };
    }
);

// 3. Process Recurring Transaction Function
export const processRecurringTransaction = inngest.createFunction(
    {
        id: "process-recurring-transaction",
        name: "Process Recurring Transaction",
        triggers: [{ event: "transaction.recurring.process" }],
        throttle: {
            limit: 10, // Process 10 transactions
            period: "1m", // per minute
            key: "event.data.userId", // Throttle per user
        },
    },
    async ({ event, step }) => {
        // Validate event data
        if (!event?.data?.transactionId || !event?.data?.userId) {
            console.error("Invalid event data:", event);
            return { error: "Missing required event data" };
        }

        await step.run("process-transaction", async () => {
            const transaction = await db.transaction.findUnique({
                where: {
                    id: event.data.transactionId,
                    userId: event.data.userId,
                },
                include: {
                    account: true,
                },
            });

            if (!transaction || !isTransactionDue(transaction)) return;

            // Create new transaction and update account balance in a transaction
            await db.$transaction(async (tx) => {
                // Create new transaction
                await tx.transaction.create({
                    data: {
                        type: transaction.type,
                        amount: transaction.amount,
                        description: `${transaction.description} (Recurring)`,
                        date: new Date(),
                        category: transaction.category,
                        userId: transaction.userId,
                        accountId: transaction.accountId,
                        isRecurring: false,
                    },
                });

                // Update account balance
                const balanceChange =
                    transaction.type === "EXPENSE"
                        ? -transaction.amount.toNumber()
                        : transaction.amount.toNumber();

                await tx.account.update({
                    where: { id: transaction.accountId },
                    data: { balance: { increment: balanceChange } },
                });

                // Update last processed date and next recurring date
                await tx.transaction.update({
                    where: { id: transaction.id },
                    data: {
                        lastProcessed: new Date(),
                        nextRecurringDate: calculateNextRecurringDate(
                            new Date(),
                            transaction.recurringInterval
                        ),
                    },
                });
            });
        });
    }
);

// 4. Generate Monthly Reports Function
export const generateMonthlyReports = inngest.createFunction(
    {
        id: "generate-monthly-reports",
        name: "Generate Monthly Reports",
        triggers: [{ cron: "0 0 1 * *" }], // First day of each month at midnight
    },
    async ({ step }) => {
        const users = await step.run("fetch-users", async () => {
            return await db.user.findMany({
                include: {
                    accounts: true,
                },
            });
        });

        for (const user of users) {
            await step.run(`generate-report-${user.id}`, async () => {
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);

                const stats = await getMonthlyStats(user.id, lastMonth);
                const monthName = lastMonth.toLocaleString("default", {
                    month: "long",
                });

                // Generate AI Insights
                const insights = await generateFinancialInsights(stats, monthName);

                await sendEmail({
                    to: user.email,
                    subject: `Your Monthly Financial Report - ${monthName}`,
                    react: EmailTemplate({
                        userName: user.name,
                        type: "monthly-report",
                        data: {
                            stats,
                            month: monthName,
                            insights,
                        },
                    }),
                });
            });
        }

        return { processed: users.length };
    }
);

// --- Helper Functions ---

function isNewMonth(lastAlertDate, currentDate) {
    return (
        lastAlertDate.getMonth() !== currentDate.getMonth() ||
        lastAlertDate.getFullYear() !== currentDate.getFullYear()
    );
}

function isTransactionDue(transaction) {
    // If no lastProcessed date, transaction is due
    if (!transaction.lastProcessed) return true;

    const today = new Date();
    const nextDue = new Date(transaction.nextRecurringDate);

    // Compare with nextRecurringDate
    return nextDue <= today;
}

function calculateNextRecurringDate(startDate, interval) {
    const date = new Date(startDate);

    switch (interval) {
        case "DAILY":
            date.setDate(date.getDate() + 1);
            break;
        case "WEEKLY":
            date.setDate(date.getDate() + 7);
            break;
        case "MONTHLY":
            date.setMonth(date.getMonth() + 1);
            break;
        case "YEARLY":
            date.setFullYear(date.getFullYear() + 1);
            break;
    }

    return date;
}

async function getMonthlyStats(userId, month) {
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    const transactions = await db.transaction.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    return transactions.reduce(
        (stats, t) => {
            const amount = t.amount.toNumber();
            if (t.type === "EXPENSE") {
                stats.totalExpenses += amount;
                stats.byCategory[t.category] =
                    (stats.byCategory[t.category] || 0) + amount;
            } else {
                stats.totalIncome += amount;
            }
            return stats;
        },
        {
            totalExpenses: 0,
            totalIncome: 0,
            byCategory: {},
            transactionCount: transactions.length,
        }
    );
}

async function generateFinancialInsights(stats, month) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return [
            "Review your expenses regularly to maintain a healthy budget.",
            "Consider tracking your highest spending categories.",
            "Build an emergency fund covering 3-6 months of essential expenses.",
        ];
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
Analyze this monthly financial summary for ${month} and provide 3 concise, actionable financial insights/recommendations:
- Total Income: $${stats.totalIncome}
- Total Expenses: $${stats.totalExpenses}
- Net Savings: $${stats.totalIncome - stats.totalExpenses}
- Expense Categories: ${JSON.stringify(stats.byCategory)}

Format the response strictly as a JSON array of 3 strings, like this:
["insight 1", "insight 2", "insight 3"]

Do not include markdown or extra explanations.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("[Inngest] Error generating AI financial insights:", error);
        return [
            "Review your expenses regularly to maintain a healthy budget.",
            "Consider tracking your highest spending categories.",
            "Build an emergency fund covering 3-6 months of essential expenses.",
        ];
    }
}