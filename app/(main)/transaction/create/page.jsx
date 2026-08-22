import Link from "next/link";
import { ArrowLeft, Sparkles, PenLine } from "lucide-react";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export const metadata = {
  title: "Add Transaction | Flowoid",
  description: "Create or edit a financial transaction with AI receipt scanning.",
};

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-6">
      {/* Header & Breadcrumb Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="space-y-1.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-400 transition-colors mb-1 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {editId ? "Edit Transaction" : "Add Transaction"}
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {editId ? (
                <>
                  <PenLine className="h-3 w-3" /> Edit Mode
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" /> AI-Powered
                </>
              )}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400">
            {editId
              ? "Update details, recurring schedule, or categorization for this transaction."
              : "Record income or expense entries with instant AI receipt scanning and automated categorization."}
          </p>
        </div>
      </div>

      {/* Main Form & Interactive Preview */}
      <AddTransactionForm
        accounts={accounts || []}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}