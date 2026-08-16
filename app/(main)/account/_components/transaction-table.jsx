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

const TransactionTable = ({ transactions }) => {

    const handleSort = ()=>{


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
                            <TableHead className="cursor-pointer" onClick={handleSort}>
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.description}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell className="text-right">${transaction.amount}</TableCell>
                            </TableRow>
                        ))}
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