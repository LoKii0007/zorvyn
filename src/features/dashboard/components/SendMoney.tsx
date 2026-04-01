"use client";

import React from "react";
import { Plus, MoreVertical } from "lucide-react";
import { ScaleCard } from "../../../components/ui/ScaleCard";

export const SendMoney = () => {
  return (
    <ScaleCard className="flex flex-col flex-1 border border-black/5 bg-white rounded-3xl p-6 pb-8! pt-6!">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Send Money To</h3>
        <button className="hover:bg-black/5 rounded-full p-1 text-text-muted">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-md">
          <Plus className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User 1"
            className="w-full h-full bg-blue-100"
          />
        </button>
        <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
            alt="User 2"
            className="w-full h-full bg-pink-100"
          />
        </button>
        <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver"
            alt="User 3"
            className="w-full h-full bg-yellow-100"
          />
        </button>
      </div>
    </ScaleCard>
  );
};
