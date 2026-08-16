import { getUserAccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AccountCard from './_components/account-card'

async function DashboardPage() {

    const accounts = await getUserAccounts()

    return (
        <div className='px-5'>
            {/* Budget Progress */}

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