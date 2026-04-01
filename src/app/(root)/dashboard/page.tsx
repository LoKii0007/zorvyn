import React from "react";
import { BalanceCard } from "@/features/dashboard/components/BalanceCard";
import { FinancialRecord } from "@/features/dashboard/components/FinancialRecord";
import { MoneyFlowChart } from "@/features/dashboard/components/MoneyFlowChart";
import { TransactionsList } from "@/features/dashboard/components/TransactionsList";
import { CategoryChart } from "@/features/dashboard/components/CategoryChart";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-1 gap-8">
        {/* Left Column */}
        <div className="flex flex-col space-y-8 w-[65%]">
          <BalanceCard />
          <FinancialRecord />
          <MoneyFlowChart />
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-[35%] space-y-12">
          <CategoryChart />
          <TransactionsList />
        </div>
      </div>
    </div>
  );
}
