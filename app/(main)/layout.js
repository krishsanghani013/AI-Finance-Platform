import React from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = async ({ children }) => {
  let accounts = [];
  try {
    accounts = await getUserAccounts();
  } catch (error) {
    // If not authenticated or during SSR
    accounts = [];
  }

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col md:flex-row">
      {/* Upgraded Flowoid App Sidebar */}
      <AppSidebar initialAccounts={accounts || []} />

      {/* Main Content Area with responsive sidebar offset */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 lg:pl-72 transition-all duration-300">
        <main className="flex-1 pt-20 md:pt-24 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;