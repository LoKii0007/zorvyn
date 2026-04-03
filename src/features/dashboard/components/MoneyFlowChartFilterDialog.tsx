import React, { useState } from "react";
import {
  format,
  subDays,
  startOfMonth,
  startOfYear,
  subYears,
  startOfWeek,
} from "date-fns";
import { REFERENCE_NOW } from "@/shared/constants/transactions";
import { Filter, CalendarIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "@/shared/types/date.types";

import { GroupingType } from "../types/dashboard.types";
import { useSyncFilterState } from "../hooks/useSyncFilterState";

interface Props {
  appliedInterval: { from: Date; to: Date };
  appliedGrouping: GroupingType;
  onApply: (interval: { from: Date; to: Date }, grouping: GroupingType) => void;
  onReset: () => void;
}

export const MoneyFlowChartFilterDialog = ({
  appliedInterval,
  appliedGrouping,
  onApply,
  onReset,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { interval, setInterval, grouping, setGrouping } = useSyncFilterState(
    isOpen,
    appliedInterval,
    appliedGrouping,
  );

  const presetIntervals = [
    {
      label: "Last 7 Days",
      value: { from: subDays(REFERENCE_NOW, 7), to: REFERENCE_NOW },
    },
    {
      label: "Last 30 Days",
      value: { from: subDays(REFERENCE_NOW, 30), to: REFERENCE_NOW },
    },
    {
      label: "Last Year",
      value: { from: subYears(REFERENCE_NOW, 1), to: REFERENCE_NOW },
    },
    {
      label: "This Week",
      value: {
        from: startOfWeek(REFERENCE_NOW, { weekStartsOn: 1 }),
        to: REFERENCE_NOW,
      },
    },
    {
      label: "This Month",
      value: { from: startOfMonth(REFERENCE_NOW), to: REFERENCE_NOW },
    },
    {
      label: "This Year",
      value: { from: startOfYear(REFERENCE_NOW), to: REFERENCE_NOW },
    },
  ];

  const handleApply = () => {
    onApply(
      { from: interval.from, to: interval.to || interval.from },
      grouping,
    );
    setIsOpen(false);
  };

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  const isFilterActive =
    appliedGrouping !== "weekly" ||
    appliedInterval.from.getTime() !== subDays(REFERENCE_NOW, 14).getTime() ||
    appliedInterval.to.getTime() !== REFERENCE_NOW.getTime();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 w-8 p-0 rounded-full transition-colors ${
            isFilterActive
              ? "bg-black border-black dark:bg-white dark:border-white hover:bg-black/80 dark:hover:bg-white/80"
              : "bg-white dark:bg-[#1a1b21] border-black/10 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <Filter
            className={`w-4 h-4 ${
              isFilterActive
                ? "text-white dark:text-black"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1f2027] dark:border-white/10 dark:text-zinc-200">
        <DialogHeader>
          <DialogTitle>Chart Filters</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold opacity-70">
              Interval (Date Range)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {presetIntervals.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setInterval(preset.value)}
                  className={`dark:border-white/10 ${
                    interval.from.getTime() === preset.value.from.getTime()
                      ? "bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 hover:text-white dark:hover:bg-white/80 dark:hover:text-black"
                      : "bg-transparent dark:text-zinc-300"
                  }`}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-xs text-zinc-500 mb-1 block">
                Custom Range
              </span>
              <DateRangePicker
                date={interval as DateRange}
                setDate={(range) => {
                  if (range?.from) {
                    setInterval({ from: range.from, to: range.to });
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold opacity-70">
              Data Grouping
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(["daily", "weekly", "monthly", "yearly"] as GroupingType[]).map(
                (g) => (
                  <Button
                    key={g}
                    variant="outline"
                    size="sm"
                    onClick={() => setGrouping(g)}
                    className={`capitalize dark:border-white/10 ${
                      grouping === g
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-transparent dark:text-zinc-300"
                    }`}
                  >
                    {g}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center sm:justify-between w-full">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
