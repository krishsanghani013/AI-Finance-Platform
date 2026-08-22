"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { updateDefaultAccount, deleteAccount } from "@/actions/accounts";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import {
  ArrowDownRight,
  ArrowUpRight,
  Trash2,
  Loader2,
  CreditCard,
  Building,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault, _count } = account;

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

    if (
      window.confirm(
        "Are you sure you want to delete this account? All associated transactions will also be permanently deleted."
      )
    ) {
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

  const isSavings = type === "SAVINGS";

  return (
    <Card className="relative overflow-hidden bg-[#12151F] border border-white/[0.08] hover:border-orange-500/40 transition-all duration-300 rounded-2xl shadow-lg shadow-black/30 group">
      {/* Background ambient glow */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl transition-all ${
          isDefault
            ? "bg-orange-500/15 group-hover:bg-orange-500/25"
            : "bg-white/[0.03] group-hover:bg-orange-500/10"
        }`}
      />

      <Link href={`/account/${id}`} className="block h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center border text-sm ${
                isDefault
                  ? "bg-orange-500/15 border-orange-500/30 text-orange-400"
                  : "bg-white/[0.04] border-white/[0.08] text-slate-300"
              }`}
            >
              {isSavings ? (
                <Building className="h-4 w-4" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <CardTitle className="text-sm font-semibold text-white capitalize truncate">
                  {name}
                </CardTitle>
                {isDefault && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 capitalize">
                {type.toLowerCase()} Account
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 relative z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading || deleteAccountLoading}
              className="data-[state=checked]:bg-orange-500 scale-90"
              title="Set as default account"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
              onClick={handleDeleteAccount}
              disabled={deleteAccountLoading || updateDefaultLoading}
              title="Delete Account"
            >
              {deleteAccountLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="py-2 relative z-10">
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            ${parseFloat(balance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>
              {_count?.transactions ? `${_count.transactions} transactions` : "Active wallet"}
            </span>
            <span className="text-orange-400/80 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-[11px]">
              View Details <ChevronRight className="h-3 w-3" />
            </span>
          </p>
        </CardContent>

        <CardFooter className="pt-3 pb-4 border-t border-white/[0.05] flex justify-between text-xs text-slate-400 relative z-10">
          <div className="flex items-center text-emerald-400 gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span className="text-emerald-400 font-medium">Income</span>
          </div>
          <div className="flex items-center text-red-400 gap-1">
            <ArrowDownRight className="h-3.5 w-3.5" />
            <span className="text-red-400 font-medium">Expenses</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export { AccountCard };
export default AccountCard;