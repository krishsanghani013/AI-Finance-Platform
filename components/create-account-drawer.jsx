"use client"

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
    DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

const CreateAccountDrawer = ({ children }) => {
    const [open, setOpen] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        },
    });

    const {
        loading: createAccountLoading,
        fn: createAccountFn,
        data: newAccount,
        error: createAccountError,
    } = useFetch(createAccount);

    useEffect(() => {
        if (newAccount?.success) {
            toast.success("Account created successfully");
            reset();
            setOpen(false);
        }
    }, [newAccount, reset]);

    const onSubmit = async (data) => {
        await createAccountFn(data);
    };

    return (
        <Drawer showSwipeHandle open={open} onOpenChange={setOpen}>
            {React.cloneElement(children, {
                onClick: (e) => {
                    children.props.onClick?.(e);
                    setOpen(true);
                }
            })}
            <DrawerContent className="bg-[#12151F] border-t border-white/10 text-white max-w-lg mx-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <span>Create New Account</span>
                    </DrawerTitle>
                    <DrawerDescription className="text-xs text-slate-400">
                        Add a checking or savings account to start tracking transactions.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-xs font-semibold text-slate-300">
                                Account Name
                            </label>
                            <Input 
                                id="name" 
                                placeholder="e.g., Main Checking, Chase Savings" 
                                className="bg-[#0A0C12] border-white/10 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-orange-500"
                                {...register("name")} 
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="type" className="text-xs font-semibold text-slate-300">
                                Account Type
                            </label>
                            <Select
                                value={watch("type") || "CURRENT"}
                                onValueChange={(value) => setValue("type", value)}
                            >
                                <SelectTrigger id="type" className="bg-[#0A0C12] border-white/10 text-white rounded-xl focus:ring-orange-500">
                                    <SelectValue placeholder="Select type">
                                        {(val) =>
                                            val === "CURRENT"
                                                ? "Current / Checking"
                                                : val === "SAVINGS"
                                                ? "Savings"
                                                : "Select type"
                                        }
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-[#161926] border-white/10 text-white">
                                    <SelectItem value="CURRENT">Current / Checking</SelectItem>
                                    <SelectItem value="SAVINGS">Savings</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-xs text-red-400">{errors.type.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="balance" className="text-xs font-semibold text-slate-300">
                                Initial Balance ($)
                            </label>
                            <Input 
                                id="balance" 
                                type="number" 
                                step="0.01" 
                                placeholder="0.00" 
                                className="bg-[#0A0C12] border-white/10 text-white placeholder:text-slate-500 rounded-xl font-mono focus-visible:ring-orange-500"
                                {...register("balance")} 
                            />
                            {errors.balance && (
                                <p className="text-xs text-red-400">{errors.balance.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                            <div className="space-y-0.5">
                                <label htmlFor="isDefault" className="text-xs font-semibold text-white">
                                    Set as Default Account
                                </label>
                                <p className="text-[11px] text-slate-400">
                                    Selected automatically for dashboard summaries and new transactions
                                </p>
                            </div>
                            <Switch
                                id="isDefault"
                                checked={watch("isDefault")}
                                onCheckedChange={(checked) => setValue("isDefault", checked)}
                                className="data-[state=checked]:bg-orange-500"
                            />
                        </div>

                        <div className="flex gap-3 pt-3">
                            <DrawerClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white rounded-xl"
                                >
                                    Cancel
                                </Button>
                            </DrawerClose>
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20"
                                disabled={createAccountLoading}
                            >
                                {createAccountLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export { CreateAccountDrawer };
export default CreateAccountDrawer;