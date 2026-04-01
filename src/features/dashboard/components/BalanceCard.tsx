"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import { ScaleCard } from "../../../components/ui/ScaleCard";

export const BalanceCard = () => {
  return (
    <ScaleCard className="bg-card-dark text-white border-0 p-8! flex flex-col justify-between h-48 w-full relative overflow-hidden">
      <div className="flex justify-between items-start z-10 w-full">
        <span className="text-gray-300 font-medium text-lg">My Card</span>
        <div className="flex items-center space-x-2 text-green-400 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>10%</span>
        </div>
      </div>

      <div className="flex justify-between items-end z-10 w-full mt-auto">
        <h2 className="text-4xl font-bold tracking-tight">$1,43,899.00</h2>
        <div className="flex space-x-3">
          <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold flex items-center shadow-lg">
            <ArrowDownLeft className="w-4 h-4 mr-1.5" />
            Deposit
          </button>
          <button className="bg-transparent border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center hover:bg-white/10 transition-colors">
            <ArrowUpRight className="w-4 h-4 mr-1.5" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Abstract chart curve background */}
      <svg
        className="absolute top-0 right-0 h-24 w-1/2 opacity-30 pointer-events-none"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q25,10 50,30 T100,5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
        />
      </svg>
    </ScaleCard>
  );
};
