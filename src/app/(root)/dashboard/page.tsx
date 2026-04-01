import React from "react";
import { BalanceCard } from "@/features/dashboard/components/BalanceCard";
import { FinancialRecord } from "@/features/dashboard/components/FinancialRecord";
import { MoneyFlowChart } from "@/features/dashboard/components/MoneyFlowChart";
import { TransactionsList } from "@/features/dashboard/components/TransactionsList";
import { CategoryChart } from "@/features/dashboard/components/CategoryChart";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6 xl:gap-8 w-full xl:w-[63%]">
          <BalanceCard />
          <FinancialRecord />
          <MoneyFlowChart />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 xl:gap-8 w-full xl:w-[37%]">
          <CategoryChart />
          <TransactionsList />
        </div>
      </div>
    </div>
  );
}
