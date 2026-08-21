import { inngest } from "@/lib/inngest/client";
import { serve } from "inngest/next";
import {
    checkBudgetAlert,
    triggerRecurringTransactions,
    processRecurringTransaction,
    generateMonthlyReports,
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        checkBudgetAlert,
        triggerRecurringTransactions,
        processRecurringTransaction,
        generateMonthlyReports,
    ],
});