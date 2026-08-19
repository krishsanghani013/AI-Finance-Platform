import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/react-email-starter/emails/template";

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

function isNewMonth(lastAlertDate, currentDate) {
    return (
        lastAlertDate.getMonth() !== currentDate.getMonth() ||
        lastAlertDate.getFullYear() !== currentDate.getFullYear()
    );
}