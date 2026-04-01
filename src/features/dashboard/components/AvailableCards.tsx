"use client";

import React from "react";

export const AvailableCards = () => {
  return (
    <div className="flex flex-col space-y-4 mt-10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl">Available Card</h3>
        <button className="text-text-muted text-sm font-medium hover:text-black">
          View all
        </button>
      </div>

      <div className="border border-black/5 rounded-3xl p-4 bg-white shadow-sm flex flex-col space-y-3">
        {/* Card 1 */}
        <button className="bg-card-green rounded-2xl p-5 text-left text-black transition-transform w-full relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <h4 className="font-bold text-xl">$3,736</h4>
            <span className="font-extrabold italic text-xl tracking-tighter">
              VISA
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-60 mb-1">Card Number</p>
              <p className="font-semibold text-[13px] tracking-widest">
                7283 2323 7319 ****
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60 mb-1">Exp</p>
              <p className="font-semibold text-sm">**/**</p>
            </div>
          </div>
        </button>

        {/* Card 2 */}
        <button className="bg-card-blue rounded-2xl p-5 text-left text-black transition-transform w-full relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <h4 className="font-bold text-xl">$21,426</h4>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-orange-500/80 mix-blend-multiply"></div>
              <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-multiply"></div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-60 mb-1">Card Number</p>
              <p className="font-semibold text-[13px] tracking-widest">
                3253 8243 1100 ****
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60 mb-1">Exp</p>
              <p className="font-semibold text-sm">**/**</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
