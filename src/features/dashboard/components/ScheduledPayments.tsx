"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { ScaleCard } from "../../../components/ui/ScaleCard";

const payments = [
  { name: "Discord", amount: "$34.99/m", color: "bg-gray-100" },
  { name: "Wattpad", amount: "$14.99/m", color: "bg-orange-50" },
  { name: "Netflix", amount: "$9.99/m", color: "bg-red-50" },
];

export const ScheduledPayments = () => {
  return (
    <ScaleCard className="flex flex-col flex-2 border border-black/5 bg-white rounded-3xl p-6 pb-8! pt-6! ml-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Scheduled Payments</h3>
        <button className="hover:bg-black/5 rounded-full p-1 text-text-muted">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-4">
        {payments.map((p, idx) => (
          <button
            key={idx}
            className={`flex-1 flex flex-col p-4 rounded-2xl ${p.color} text-left transition-colors`}
          >
            <span className="text-gray-500 text-sm mb-1">{p.name}</span>
            <span className="font-bold text-[15px]">{p.amount}</span>
          </button>
        ))}
      </div>
    </ScaleCard>
  );
};
