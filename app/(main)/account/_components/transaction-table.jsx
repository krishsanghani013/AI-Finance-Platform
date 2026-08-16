"use client"

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'

const TransactionTable = ({ transactions }) => {

    const filteredAndSortedTransactions = transactions

    const handleSort = () => {


    }
    return (
        <div className='space-y-4 '>
            {/* Filters */}

            {/* Transaction */}
            <div className='rounded-md border'>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("data")}>
                                <div className='flex items-center'>Date</div>
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                                <div className='flex items-center'>Category</div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                                <div className='flex items-end'>Amount</div>
                            </TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead className='w-[50px]'></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className='text-center text-muted-foreground'>
                                    No Transactions Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(transaction.date), "PP")}
                                    </TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell className="text-right">${transaction.amount}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}

export default TransactionTable