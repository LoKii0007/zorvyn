import React, { useState } from "react";
import { GroupingType } from "../types/dashboard.types";

export const useSyncFilterState = (
  isOpen: boolean,
  appliedInterval: { from: Date; to: Date },
  appliedGrouping: GroupingType,
) => {
  const [interval, setInterval] = useState<{ from: Date; to?: Date }>(
    appliedInterval,
  );
  const [grouping, setGrouping] = useState<GroupingType>(appliedGrouping);

  React.useEffect(() => {
    if (isOpen) {
      setInterval(appliedInterval);
      setGrouping(appliedGrouping);
    }
  }, [isOpen, appliedInterval, appliedGrouping]);

  return {
    interval,
    setInterval,
    grouping,
    setGrouping,
  };
};
