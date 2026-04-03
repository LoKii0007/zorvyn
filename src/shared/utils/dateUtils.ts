import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";

import { TimeFilter, DateRange } from "../types/date.types";
export type { TimeFilter, DateRange };

/**
 * Checks if a given date matches a specific time filter relative to a reference date.
 */
export const isWithinTimeFilter = (
  date: Date,
  filter: TimeFilter,
  referenceDate: Date = new Date(),
  range?: DateRange,
): boolean => {
  switch (filter) {
    case "daily":
      return isSameDay(date, referenceDate);
    case "weekly":
      return isSameWeek(date, referenceDate, { weekStartsOn: 1 });
    case "monthly":
      return isSameMonth(date, referenceDate);
    case "yearly":
      return isSameYear(date, referenceDate);
    case "custom":
      if (!range?.from) return true;
      if (!range.to) return isSameDay(date, range.from);
      return date >= range.from && date <= range.to;
    case "all":
    default:
      return true;
  }
};

/**
 * Returns the start of the previous period based on the filter and reference date.
 */
export const getPreviousPeriodDate = (
  filter: TimeFilter,
  referenceDate: Date = new Date(),
): Date => {
  switch (filter) {
    case "daily":
      return subDays(referenceDate, 1);
    case "weekly":
      return subWeeks(referenceDate, 1);
    case "monthly":
      return subMonths(referenceDate, 1);
    case "yearly":
      return subYears(referenceDate, 1);
    default:
      return subMonths(referenceDate, 1);
  }
};
