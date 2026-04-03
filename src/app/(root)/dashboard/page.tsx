import React from "react";
import { FinancialRecord } from "@/features/dashboard/components/FinancialRecord";
import { MoneyFlowChart } from "@/features/dashboard/components/MoneyFlowChart";
import { TransactionsList } from "@/features/dashboard/components/TransactionsList";
import { CategoryChart } from "@/features/dashboard/components/CategoryChart";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* header  */}

      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6 xl:gap-8 flex-1 w-full">
          <FinancialRecord />
          <MoneyFlowChart />
          <CategoryChart />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 xl:gap-8 w-full xl:w-[35%] shrink-0">
          <TransactionsList />
        </div>
      </div>
    </div>
  );
}
