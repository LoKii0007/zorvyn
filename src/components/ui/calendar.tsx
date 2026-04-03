"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  eachDayOfInterval,
  isWithinInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "./button";
import { DateRange } from "@/shared/utils/dateUtils";

interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date | DateRange;
  onSelect?: (date: any) => void;
  className?: string;
}

export const Calendar = ({
  mode = "single",
  selected,
  onSelect,
  className,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const isSelected = (day: Date) => {
    if (!selected) return false;
    if (mode === "single" && selected instanceof Date) {
      return isSameDay(day, selected);
    }
    if (mode === "range" && typeof selected === "object" && "from" in selected) {
      if (selected.from && isSameDay(day, selected.from)) return true;
      if (selected.to && isSameDay(day, selected.to)) return true;
      if (selected.from && selected.to) {
        return isWithinInterval(day, { start: selected.from, end: selected.to });
      }
    }
    return false;
  };

  const handleDateClick = (day: Date) => {
    if (!onSelect) return;

    if (mode === "single") {
      onSelect(day);
    } else {
      const range = selected as { from?: Date; to?: Date };
      if (!range?.from || (range.from && range.to)) {
        onSelect({ from: day, to: undefined });
      } else {
        if (day < range.from) {
          onSelect({ from: day, to: range.from });
        } else {
          onSelect({ from: range.from, to: day });
        }
      }
    }
  };

  return (
    <div className={cn("p-3 w-[280px] bg-white dark:bg-[#1a1b21]", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className="h-7 w-7 p-0 rounded-md border-gray-100 dark:border-white/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="h-7 w-7 p-0 rounded-md border-gray-100 dark:border-white/5"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-[10px] font-medium text-zinc-500 text-center uppercase"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const selectedState = isSelected(day);
          
          return (
            <button
              key={idx}
              onClick={() => handleDateClick(day)}
              className={cn(
                "h-8 w-8 text-xs rounded-md transition-all flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5",
                !isCurrentMonth && "text-zinc-300 dark:text-zinc-700",
                isCurrentMonth && "text-zinc-900 dark:text-zinc-300",
                selectedState && "bg-black text-white dark:bg-zinc-200 dark:text-black font-semibold"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};
