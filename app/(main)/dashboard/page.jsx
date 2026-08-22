import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardKpiCards } from "./_components/dashboard-kpi-cards";
import { CashFlowChart } from "./_components/cash-flow-chart";
import { SpendingBreakdown } from "./_components/spending-breakdown";
import { BudgetProgress } from "./_components/budget-progress";
import { RecentTransactions } from "./_components/recent-transactions";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CreditCard, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const [clerkUser, accounts, transactions] = await Promise.all([
    currentUser(),
    getUserAccounts(),
    getDashboardData(),
  ]);

  const userName =
    clerkUser?.firstName ||
    clerkUser?.name ||
    clerkUser?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "Krish";

  const defaultAccount = accounts?.find((account) => account.isDefault) || accounts?.[0];

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // --- Calculate Analytics for Default Account ---
  const allTransactions = transactions || [];
  const defaultTransactions = defaultAccount
    ? allTransactions.filter((t) => t.accountId === defaultAccount.id)
    : allTransactions;

  const defaultBalance = defaultAccount ? parseFloat(defaultAccount.balance || 0) : 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const prevMonth = prevMonthDate.getMonth();
  const prevYear = prevMonthDate.getFullYear();

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  let prevMonthIncome = 0;
  let prevMonthExpense = 0;

  // Category Expenses map for spending breakdown of default account
  const categoryTotals = {};

  defaultTransactions.forEach((t) => {
    const tDate = new Date(t.date);
    const tMonth = tDate.getMonth();
    const tYear = tDate.getFullYear();
    const amt = parseFloat(t.amount || 0);

    if (tYear === currentYear && tMonth === currentMonth) {
      if (t.type === "INCOME") {
        currentMonthIncome += amt;
      } else if (t.type === "EXPENSE") {
        currentMonthExpense += amt;
        const cat = t.category || "other";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
      }
    } else if (tYear === prevYear && tMonth === prevMonth) {
      if (t.type === "INCOME") {
        prevMonthIncome += amt;
      } else if (t.type === "EXPENSE") {
        prevMonthExpense += amt;
      }
    }
  });

  // Calculate percentage changes for default account
  const incomeChangePercent =
    prevMonthIncome > 0
      ? ((currentMonthIncome - prevMonthIncome) / prevMonthIncome) * 100
      : currentMonthIncome > 0
      ? 100
      : 0;

  const expenseChangePercent =
    prevMonthExpense > 0
      ? ((currentMonthExpense - prevMonthExpense) / prevMonthExpense) * 100
      : currentMonthExpense > 0
      ? 100
      : 0;

  const netSavingsThisMonth = currentMonthIncome - currentMonthExpense;
  const startingEstBalance = defaultBalance - netSavingsThisMonth;
  const balanceChangePercent =
    startingEstBalance > 0
      ? (netSavingsThisMonth / startingEstBalance) * 100
      : 0;

  // 3. Historical Cash Flow (Last 6 Months) for Default Account
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCashFlowData = [];

  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const targetM = targetDate.getMonth();
    const targetY = targetDate.getFullYear();
    const label = monthNames[targetM];

    let inc = 0;
    let exp = 0;

    defaultTransactions.forEach((t) => {
      const tDate = new Date(t.date);
      if (tDate.getMonth() === targetM && tDate.getFullYear() === targetY) {
        if (t.type === "INCOME") inc += parseFloat(t.amount || 0);
        if (t.type === "EXPENSE") exp += parseFloat(t.amount || 0);
      }
    });

    monthlyCashFlowData.push({
      month: label,
      income: Number(inc.toFixed(2)),
      expense: Number(exp.toFixed(2)),
      net: Number((inc - exp).toFixed(2)),
    });
  }

  // 4. Spending Category Array for Default Account
  const spendingCategoryData = Object.entries(categoryTotals).map(([cat, val]) => ({
    name: cat,
    value: Number(val.toFixed(2)),
  }));

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header Greeting & Quick Actions */}
      <DashboardHeader userName={userName} defaultAccount={defaultAccount} />

      {/* 2. Top Summary KPI Cards for Default Account */}
      <DashboardKpiCards
        totalBalance={defaultBalance}
        totalIncome={currentMonthIncome}
        totalExpense={currentMonthExpense}
        balanceChangePercent={balanceChangePercent}
        incomeChangePercent={incomeChangePercent}
        expenseChangePercent={expenseChangePercent}
        accountsCount={accounts?.length || 1}
        accountName={defaultAccount?.name || "Personal"}
      />

      {/* 3. Middle Row: Cash Flow Chart & Spending Breakdown Donut (Default Account Data) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Cash Flow (7 Cols on Laptop) */}
        <div className="lg:col-span-7 flex flex-col">
          <CashFlowChart monthlyData={monthlyCashFlowData} />
        </div>

        {/* Right Column: Spending Breakdown (5 Cols on Laptop) */}
        <div className="lg:col-span-5 flex flex-col">
          <SpendingBreakdown
            categoryData={spendingCategoryData}
            totalExpenses={currentMonthExpense}
          />
        </div>
      </div>

      {/* 4. Budget Progress Section */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || currentMonthExpense}
        categoryExpenses={spendingCategoryData}
      />

      {/* 5. Connected Accounts Management */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-orange-400" />
              <span>Connected Accounts</span>
            </h2>
            <span className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
              {accounts?.length || 0} active
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="bg-[#12151F]/50 border border-dashed border-white/15 hover:border-orange-500/50 hover:bg-[#12151F] transition-all cursor-pointer rounded-2xl group flex flex-col justify-center min-h-[140px]">
              <CardContent className="flex flex-col items-center justify-center text-slate-400 group-hover:text-orange-400 p-6">
                <div className="h-10 w-10 rounded-full bg-white/[0.04] group-hover:bg-orange-500/15 border border-white/[0.08] group-hover:border-orange-500/30 flex items-center justify-center mb-2 transition-all">
                  <Plus className="h-5 w-5 text-slate-300 group-hover:text-orange-400 transition-colors" />
                </div>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white">
                  Add New Account
                </p>
                <p className="text-[11px] text-slate-500">Checking, Savings or Wallet</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts?.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>

      {/* 6. Recent Transactions List (Filtered to Default Account by default) */}
      <RecentTransactions
        transactions={defaultTransactions}
        accounts={accounts || []}
      />
    </div>
  );
}