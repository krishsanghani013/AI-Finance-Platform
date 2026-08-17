import { getUserAccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AccountCard from './_components/account-card'
import { getCurrentBudget } from '@/actions/budget'
import BudgetProgress from './_components/budget-progress'

async function DashboardPage() {

    const accounts = await getUserAccounts()

    const defaultAccount = accounts?.find((account) => account.isDefault)

    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    return (
        <div className='space-y-8'>
            {/* Budget Progress */}
            {defaultAccount && <BudgetProgress 
            initialBudget = {budgetData?.budget}
            currentExpense = {budgetData?.currentExpenses || 0}
            />}
            {/* Dashboard Overview */}

            {/* Accounts Grid */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
                        <CardContent className='flex flex-md items-center justify-center text-muted-foreground h-full pt-5'>
                            <Plus className='h-10 w-10 mb-2' />
                            <p className='text-sm font-medium'>Add new Account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {accounts.length > 0 && accounts.map((account) => {
                    return <AccountCard key={account.id} account={account} />
                })}
            </div>
        </div>
    )
}

export default DashboardPage