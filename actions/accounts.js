"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };

    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
}

export async function updateDefaultAccount(accountId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized: No userId found.")

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) throw new Error("User not Found");

        // Handle case where accountId is passed as an object containing id
        const targetId = typeof accountId === "object" ? accountId.id : accountId;

        // Perform updates atomically in a transaction
        const [_, updatedAccount] = await db.$transaction([
            db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false },
            }),
            db.account.update({
                where: {
                    id: targetId,
                    userId: user.id
                },
                data: { isDefault: true }
            })
        ]);

        revalidatePath('/dashboard');
        return { success: true, data: serializeTransaction(updatedAccount) }
    } catch (error) {
        return {success:false, error:error.message}
    }
}

export async function getAccountWithTransactions(accountId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized: No userId found.")

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) throw new Error("User not Found");

        const targetId = typeof accountId === "object" ? accountId.id : accountId;

        const account = await db.account.findUnique({
            where: {
                id: targetId,
                userId: user.id
            },
            include: {
                transactions: {
                    orderBy: { createdAt: "desc" },
                },
                _count:{
                    select: {transactions : true},
                    
                }
            }
        });
        if(!account) return null;

        return {
            ...serializeTransaction(account),
            transactions: account.transactions.map(serializeTransaction),
        }
    } catch (error) {
        return {success:false, error:error.message}
    }
}