"use client"

import React, { useMemo, useState } from 'react'
import { format, startOfDay, subDays } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const income = payload.find(p => p.dataKey === "income")?.value || 0;
        const expense = payload.find(p => p.dataKey === "expense")?.value || 0;
        const net = income - expense;

        return (
            <div className="bg-background/95 border border-border p-3 rounded-lg shadow-lg space-y-1.5 min-w-42.5 backdrop-blur-xs">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <hr className="border-border my-1" />
                <div className="flex justify-between items-center text-xs text-muted-foreground gap-4">
                    <span className="flex items-center gap-1.5 font-medium">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        Income:
                    </span>
                    <span className="font-semibold text-green-500">${income.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground gap-4">
                    <span className="flex items-center gap-1.5 font-medium">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        Expense:
                    </span>
                    <span className="font-semibold text-red-500">${expense.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-border pt-1.5 mt-1.5 gap-4">
                    <span className="font-medium text-foreground">Net:</span>
                    <span className={`font-semibold ${net >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {net === 0 ? "$0.00" : (net > 0 ? `+$${net.toFixed(2)}` : `-$${Math.abs(net).toFixed(2)}`)}
                    </span>
                </div>
            </div>
        );
    }

    return null;
};

const DATE_RANGE = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last 30 Days", days: 30 },
    "3M": { label: "Last 90 Days", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null }
}

const AccountChart = ({ transactions }) => {
    const [dateRange, setDateRange] = useState("1M")

    const filteredData = useMemo(() => {
        const range = DATE_RANGE[dateRange]
        const now = new Date()
        const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0))
        const endDate = startOfDay(now)

        // Filter transactions within date
        const filtered = transactions.filter((t) => {
            const transactionDate = new Date(t.date)
            return transactionDate >= startDate && transactionDate <= endDate
        })

        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd")

            if (!acc[date]) {
                acc[date] = {
                    date,
                    income: 0,
                    expense: 0,
                    timestamp: startOfDay(new Date(transaction.date)).getTime()
                }
            }

            const amount = Number(transaction.amount) || 0
            if (transaction.type === 'INCOME') {
                acc[date].income += amount
            } else {
                acc[date].expense += amount
            }
            return acc
        }, {})

        return Object.values(grouped).sort(
            (a, b) => a.timestamp - b.timestamp
        )
    }, [transactions, dateRange])

    const totals = useMemo(() => {
        return filteredData.reduce(
            (acc, day) => ({
                income: acc.income + day.income,
                expense: acc.expense + day.expense
            }),
            { income: 0, expense: 0 }
        );
    }, [filteredData]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle className="text-base font-normal">
                    Transaction Overview
                </CardTitle>
                <Select defaultValue={dateRange} value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Select range">
                            {(range) => DATE_RANGE[range]?.label || range || "Select range"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(DATE_RANGE).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className='flex justify-around mb-6 text-sm'>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Total Income</p>
                        <p className='text-lg font-bold text-green-500'>${totals.income.toFixed(2)}</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Total Expense</p>
                        <p className='text-lg font-bold text-red-500'>${totals.expense.toFixed(2)}</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Net</p>
                        <p className={`text-lg font-bold ${totals.income - totals.expense >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${(totals.income - totals.expense).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className='h-75'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#22c55e"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill="#ef4444"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export { AccountChart };
export default AccountChart;