import { db } from "@/lib/prisma";
import { inngest } from "./client";

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
            if (!defaultAccount) continue;

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
                    0
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

                const totalExpenses = expenses._sum.amount ? expenses._sum.amount.toNumber() : 0;
                const budgetAmount = Number(budget.amount);

                if (budgetAmount <= 0) return;

                const percentageUsed = (totalExpenses / budgetAmount) * 100;

                if (
                    percentageUsed >= 80 &&
                    (!budget.lastAlertSent ||
                        isNewMonth(new Date(budget.lastAlertSent), new Date()))
                ) {
                    // Send alert email here (e.g. via Resend or email service)

                    // Update lastAlertSent
                    await db.budget.update({
                        where: { id: budget.id },
                        data: { lastAlertSent: new Date() },
                    });
                }
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