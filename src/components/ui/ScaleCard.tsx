"use client";

import React from "react";

export const ScaleCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-card rounded-2xl p-6 shadow-sm border border-black/5 ${className}`}
    {...props}
  >
    {children}
  </div>
));
ScaleCard.displayName = "ScaleCard";
