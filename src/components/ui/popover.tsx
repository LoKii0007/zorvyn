"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils/cn";

interface PopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export const Popover = ({
  children,
  trigger,
  className,
  align = "center",
}: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={toggle}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute z-50 mt-2 min-w-32 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 text-zinc-950 shadow-xl outline-none animate-in fade-in-0 zoom-in-95 dark:border-white/5 dark:bg-[#1a1b21] dark:text-zinc-50",
            align === "start" && "left-0",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "end" && "right-0",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
