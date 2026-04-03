export type TimeFilter = "daily" | "weekly" | "monthly" | "yearly" | "all" | "custom" | string;

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}
