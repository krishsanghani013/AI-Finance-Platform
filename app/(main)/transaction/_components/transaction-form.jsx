"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Loader2,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  RotateCcw,
  Sparkles,
  CreditCard,
  Tag,
  FileText,
  Repeat,
  DollarSign,
  X,
  MoreHorizontal,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";
import { CategoryIcon } from "./category-icon";
import { TransactionPreviewCard } from "./transaction-preview-card";

export function AddTransactionForm({
  accounts = [],
  categories = [],
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [activeTab, setActiveTab] = useState("form"); // "form" or "preview" on mobile

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description || "",
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            recurringInterval: initialData.recurringInterval || "MONTHLY",
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id || accounts[0]?.id || "",
            category: "",
            date: new Date(),
            isRecurring: false,
            recurringInterval: "MONTHLY",
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = useCallback((scannedData) => {
    if (scannedData) {
      if (scannedData.amount) {
        setValue("amount", scannedData.amount.toString(), { shouldValidate: true });
      }
      if (scannedData.date) {
        setValue("date", new Date(scannedData.date), { shouldValidate: true });
      }
      if (scannedData.description || scannedData.merchantName) {
        const desc = scannedData.description || scannedData.merchantName;
        setValue("description", desc, { shouldValidate: true });
      }
      if (scannedData.category) {
        const matched = categories.find(
          (c) =>
            c.id.toLowerCase() === scannedData.category.toLowerCase() ||
            c.name.toLowerCase() === scannedData.category.toLowerCase()
        );
        if (matched) {
          setValue("category", matched.id, { shouldValidate: true });
        }
      }
    }
  }, [categories, setValue]);

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction recorded successfully",
        {
          id: "transaction-submit-toast",
        }
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode, reset, router]);

  const type = watch("type");
  const amount = watch("amount");
  const isRecurring = watch("isRecurring");
  const date = watch("date");
  const accountId = watch("accountId");
  const category = watch("category");
  const description = watch("description");
  const recurringInterval = watch("recurringInterval");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const topCategories = filteredCategories.slice(0, 4);
  const selectedCategoryObj = categories.find((c) => c.id === category);
  const isOtherCategorySelected =
    Boolean(category) && !topCategories.some((cat) => cat.id === category);

  // Quick Amount preset increment
  const handleAddPresetAmount = (presetVal) => {
    const currentVal = parseFloat(amount) || 0;
    const newVal = (currentVal + presetVal).toFixed(2);
    setValue("amount", newVal.toString(), { shouldValidate: true });
  };

  // Quick Date presets
  const handleDatePreset = (daysAgo) => {
    const targetDate = subDays(new Date(), daysAgo);
    setValue("date", targetDate, { shouldValidate: true });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Form Column (8 cols on lg) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Receipt Scanner - Only show in create mode */}
        {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Card 1: Core Details */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#12151F]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <h3 className="text-sm font-semibold text-white">Transaction Details</h3>
              </div>
              <span className="text-xs text-slate-400">Step 1 of 2</span>
            </div>

            {/* Segmented Type Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-black/40 border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => {
                    setValue("type", "EXPENSE", { shouldValidate: true });
                    setValue("category", "");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    type === "EXPENSE"
                      ? "bg-rose-500/15 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-950/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <ArrowDownRight
                    className={`h-4 w-4 ${
                      type === "EXPENSE" ? "text-rose-400" : "text-slate-500"
                    }`}
                  />
                  <span>Expense</span>
                  <span className="hidden sm:inline text-[10px] text-slate-500">
                    (Out)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setValue("type", "INCOME", { shouldValidate: true });
                    setValue("category", "");
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    type === "INCOME"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <ArrowUpRight
                    className={`h-4 w-4 ${
                      type === "INCOME" ? "text-emerald-400" : "text-slate-500"
                    }`}
                  />
                  <span>Income</span>
                  <span className="hidden sm:inline text-[10px] text-slate-500">
                    (In)
                  </span>
                </button>
              </div>
              {errors.type && (
                <p className="text-xs text-rose-400">{errors.type.message}</p>
              )}
            </div>

            {/* Hero Amount Input with Currency Symbol & Quick Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </label>
                {amount && (
                  <button
                    type="button"
                    onClick={() => setValue("amount", "")}
                    className="text-[11px] text-slate-400 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>

              <div className="relative rounded-xl border border-white/[0.12] bg-[#0A0C13] focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all flex items-center px-3.5 py-1">
                <span className="text-xl sm:text-2xl font-bold text-slate-400 select-none mr-2 font-mono">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-transparent text-xl sm:text-2xl font-bold text-white placeholder:text-slate-600 focus:outline-none font-mono"
                  {...register("amount")}
                />
              </div>

              {/* Quick Amount Preset Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-slate-500 mr-1">Quick Add:</span>
                {[10, 25, 50, 100, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAddPresetAmount(preset)}
                    className="text-[11px] font-medium text-slate-300 bg-white/[0.04] hover:bg-orange-500/20 hover:text-orange-300 hover:border-orange-500/30 border border-white/[0.08] px-2 py-0.5 rounded-lg transition-all cursor-pointer active:scale-95"
                  >
                    +${preset}
                  </button>
                ))}
              </div>

              {errors.amount && (
                <p className="text-xs text-rose-400">{errors.amount.message}</p>
              )}
            </div>

            {/* Account Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account
                </label>
                <CreateAccountDrawer>
                  <button
                    type="button"
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Plus className="h-3 w-3" /> New Account
                  </button>
                </CreateAccountDrawer>
              </div>

              <Select
                onValueChange={(value) => setValue("accountId", value, { shouldValidate: true })}
                value={accountId || ""}
              >
                <SelectTrigger className="w-full bg-[#0A0C13] border-white/[0.12] h-12 rounded-xl text-slate-200 focus:border-orange-500 focus:ring-orange-500/20">
                  <SelectValue placeholder="Select account">
                    {(selectedId) => {
                      const account = accounts.find((ac) => ac.id === selectedId);
                      return account ? (
                        <div className="flex items-center justify-between w-full pr-2">
                          <span className="font-medium text-white flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-orange-400" />
                            {account.name}
                          </span>
                          <span className="font-mono text-xs text-slate-400">
                            ${parseFloat(account.balance).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        "Select account"
                      );
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#12151F] border-white/10 text-slate-200">
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-3.5 w-3.5 text-orange-400" />
                          <span className="font-medium">{account.name}</span>
                          {account.isDefault && (
                            <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.2 rounded border border-orange-500/30">
                              Default
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-slate-400">
                          ${parseFloat(account.balance).toFixed(2)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.accountId && (
                <p className="text-xs text-rose-400">{errors.accountId.message}</p>
              )}
            </div>
          </div>

          {/* Card 2: Classification & Schedule */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#12151F]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <h3 className="text-sm font-semibold text-white">Classification & Date</h3>
              </div>
              <span className="text-xs text-slate-400">Step 2 of 2</span>
            </div>

            {/* Category Selector with Equal-Sized Buttons & More Dropdown */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>

              {/* Uniform Equal-Sized Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {topCategories.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                      className={cn(
                        "h-11 px-2.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 text-center truncate",
                        isSelected
                          ? "bg-orange-500/20 border-orange-500/50 text-white shadow-sm shadow-orange-500/10 font-semibold"
                          : "bg-[#0A0C13] border-white/[0.08] text-slate-300 hover:bg-white/[0.05] hover:text-white hover:border-white/[0.18]"
                      )}
                    >
                      <CategoryIcon
                        iconName={cat.icon}
                        color={cat.color}
                        size="sm"
                        className="h-3.5 w-3.5 flex-shrink-0"
                      />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}

                {/* 5th Button: Same Size 'More Categories' Dropdown Trigger */}
                <Select
                  onValueChange={(value) => setValue("category", value, { shouldValidate: true })}
                  value={isOtherCategorySelected ? category : ""}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-11 px-2.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-1.5 focus:ring-0 focus:ring-offset-0 focus:border-orange-500 active:scale-95",
                      isOtherCategorySelected
                        ? "bg-orange-500/20 border-orange-500/50 text-white shadow-sm shadow-orange-500/10 font-semibold"
                        : "bg-[#0A0C13] border-white/[0.08] text-slate-300 hover:bg-white/[0.05] hover:text-white hover:border-white/[0.18]"
                    )}
                  >
                    <div className="flex items-center gap-1.5 min-w-0 truncate">
                      {isOtherCategorySelected && selectedCategoryObj ? (
                        <>
                          <CategoryIcon
                            iconName={selectedCategoryObj.icon}
                            color={selectedCategoryObj.color}
                            size="sm"
                            className="h-3.5 w-3.5 flex-shrink-0"
                          />
                          <span className="truncate">{selectedCategoryObj.name}</span>
                        </>
                      ) : (
                        <>
                          <div className="h-3.5 w-3.5 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                            <MoreHorizontal className="h-3 w-3 text-slate-400" />
                          </div>
                          <span className="truncate">More...</span>
                        </>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#12151F] border-white/10 text-slate-200 max-h-64">
                    {filteredCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <CategoryIcon
                            iconName={cat.icon}
                            color={cat.color}
                            size="sm"
                          />
                          <span>{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategories tags helper */}
              {selectedCategoryObj?.subcategories && (
                <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500">Suggestions:</span>
                  {selectedCategoryObj.subcategories.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => {
                        const currentDesc = getValues("description");
                        setValue(
                          "description",
                          currentDesc ? `${currentDesc} - ${sub}` : sub,
                          { shouldValidate: true }
                        );
                      }}
                      className="text-[11px] text-slate-400 hover:text-orange-300 bg-white/[0.04] hover:bg-orange-500/10 border border-white/[0.06] px-2 py-0.5 rounded-md transition-all cursor-pointer"
                    >
                      +{sub}
                    </button>
                  ))}
                </div>
              )}

              {errors.category && (
                <p className="text-xs text-rose-400">{errors.category.message}</p>
              )}
            </div>

            {/* Date with Quick Preset Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDatePreset(0)}
                    className="text-[11px] font-medium text-slate-300 hover:text-orange-300 bg-white/[0.04] hover:bg-orange-500/10 px-2 py-0.5 rounded-md border border-white/[0.06] transition-all cursor-pointer"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDatePreset(1)}
                    className="text-[11px] font-medium text-slate-300 hover:text-orange-300 bg-white/[0.04] hover:bg-orange-500/10 px-2 py-0.5 rounded-md border border-white/[0.06] transition-all cursor-pointer"
                  >
                    Yesterday
                  </button>
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-[#0A0C13] border-white/[0.12] hover:bg-white/[0.05] hover:text-white rounded-xl text-slate-200",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2.5 h-4 w-4 text-orange-400" />
                    {date ? format(date, "EEEE, MMMM dd, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#12151F] border-white/10 text-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (selectedDate) setValue("date", selectedDate, { shouldValidate: true });
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-xs text-rose-400">{errors.date.message}</p>
              )}
            </div>

            {/* Description / Merchant Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description / Notes
              </label>
              <div className="relative rounded-xl border border-white/[0.12] bg-[#0A0C13] focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all flex items-center px-3.5 py-1">
                <FileText className="h-4 w-4 text-slate-500 mr-2.5 flex-shrink-0" />
                <input
                  placeholder="e.g. Trader Joe's groceries, Netflix, Freelance payout..."
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none h-9"
                  {...register("description")}
                />
              </div>
              {errors.description && (
                <p className="text-xs text-rose-400">{errors.description.message}</p>
              )}
            </div>

            {/* Recurring Toggle Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0A0C13]/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Repeat className="h-4 w-4 text-orange-400" />
                    <label className="text-sm font-medium text-slate-200">
                      Recurring Transaction
                    </label>
                  </div>
                  <p className="text-xs text-slate-400">
                    Schedule automated tracking for subscriptions or recurring income
                  </p>
                </div>
                <Switch
                  checked={isRecurring}
                  onCheckedChange={(checked) =>
                    setValue("isRecurring", checked, { shouldValidate: true })
                  }
                />
              </div>

              {/* Recurring Interval Options */}
              {isRecurring && (
                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Frequency Interval
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "DAILY", label: "Daily" },
                      { id: "WEEKLY", label: "Weekly" },
                      { id: "MONTHLY", label: "Monthly" },
                      { id: "YEARLY", label: "Yearly" },
                    ].map((interval) => (
                      <button
                        key={interval.id}
                        type="button"
                        onClick={() =>
                          setValue("recurringInterval", interval.id, {
                            shouldValidate: true,
                          })
                        }
                        className={`py-2 px-1 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          recurringInterval === interval.id
                            ? "bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm"
                            : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white"
                        }`}
                      >
                        {interval.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 Next cycle will automatically sync starting from {format(date || new Date(), "MMM dd, yyyy")}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="w-full sm:w-auto border-white/10 bg-[#12151F] text-slate-300 hover:bg-white/[0.08] hover:text-white rounded-xl h-11 px-4 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="w-full sm:w-auto text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-xl h-11 px-4 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={transactionLoading}
              className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl h-11 shadow-lg shadow-orange-950/50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              {transactionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editMode ? "Saving Changes..." : "Recording Transaction..."}
                </>
              ) : editMode ? (
                "Update Transaction"
              ) : (
                "Save & Record Transaction"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Sidebar Column (5 cols on lg) - Live Preview & Smart Insights */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        {/* Live Transaction Digital Slip Preview */}
        <TransactionPreviewCard
          type={type}
          amount={amount}
          description={description}
          accountId={accountId}
          category={category}
          date={date}
          isRecurring={isRecurring}
          recurringInterval={recurringInterval}
          accounts={accounts}
          categories={categories}
        />

        {/* Quick Tips & Short-cut Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#12151F]/70 backdrop-blur-md p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Pro Tips for Clarity
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
              <span>Use the <strong>AI Receipt Scanner</strong> to auto-fill supermarket, dining, and retail bills in seconds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>Set up <strong>Recurring</strong> for Netflix, Spotify, gym memberships, or monthly salary deposits.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
              <span>Balance updates reflect in real-time across all your charts & budgets.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionForm;