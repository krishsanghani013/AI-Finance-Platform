"use client"

import { updateDefaultAccount, deleteAccount } from '@/actions/accounts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import { ArrowDownRight, ArrowUpRight, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const AccountCard = ({ account }) => {
    const { name, type, balance, id, isDefault } = account

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updateAccount,
        error: updateError,
    } = useFetch(updateDefaultAccount);

    const {
        loading: deleteAccountLoading,
        fn: deleteAccountFn,
        data: deletedAccount,
        error: deleteError,
    } = useFetch(deleteAccount);

    const handleDefaultChange = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isDefault) {
            toast.warning("You need at least one default account");
            return;
        }

        await updateDefaultFn(id);
    };

    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (window.confirm("Are you sure you want to delete this account? All associated transactions will also be permanently deleted.")) {
            await deleteAccountFn(id);
        }
    };

    useEffect(() => {
        if (updateAccount?.success) {
            toast.success("Default Account updated successfully");
        }
    }, [updateAccount]);

    useEffect(() => {
        if (updateError) {
            toast.error(updateError.message || "Failed to update Default account");
        }
    }, [updateError]);

    useEffect(() => {
        if (deletedAccount?.success) {
            toast.success("Account deleted successfully");
        }
    }, [deletedAccount]);

    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError.message || "Failed to delete account");
        }
    }, [deleteError]);

    return (
        <div>
            <Card className='hover:shadow-md transition-shadow group relative'>
                <Link href={`/account/${id}`}>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium capitalize truncate pr-2'>{name}</CardTitle>
                        <div
                            className='flex items-center gap-2'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <Switch
                                checked={isDefault}
                                onClick={handleDefaultChange}
                                disabled={updateDefaultLoading || deleteAccountLoading}
                            />
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50'
                                onClick={handleDeleteAccount}
                                disabled={deleteAccountLoading || updateDefaultLoading}
                                title='Delete Account'
                            >
                                {deleteAccountLoading ? (
                                    <Loader2 className='h-4 w-4 animate-spin text-red-500' />
                                ) : (
                                    <Trash2 className='h-4 w-4' />
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            ${parseFloat(balance).toFixed(2)}
                        </div>
                        <p className='text-xl text-muted-foreground'>
                            {type.charAt(0) + type.slice(1).toLowerCase()} Account
                        </p>
                    </CardContent>
                    <CardFooter className='flex justify-between text-sm text-muted-foreground'>
                        <div className='flex items-center'>
                            <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
                            Income
                        </div>
                        <div className='flex items-center'>
                            <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
                            Expense
                        </div>
                    </CardFooter>
                </Link>
            </Card>
        </div>
    );
};

export { AccountCard };
export default AccountCard;