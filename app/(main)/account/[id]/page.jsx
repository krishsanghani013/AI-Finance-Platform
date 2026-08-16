import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import { Suspense } from 'react';

const AccountsPage = async ({ params }) => {
  const { id } = await params;

  const accountData = await getAccountWithTransactions(id)
  if (!accountData || accountData.success === false) {
    notFound()
  }

  const { transactions, ...account } = accountData

  return (
    <div className='space-y-8 px-5'>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-5xl  sm:text-6xl font-bold gradient-title capitalize'>{account.name}</h1>
          <p className='text-muted-foreground'>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
        </div>
        <div className='text-right pb-2'>
          <p className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</p>
          <p className='text-sm text-muted-foreground'>{account._count.transactions} Transaction</p>
        </div>
      </div>

      {/* Chart Section */}

      {/* Transaction Table */}
      <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea' />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
