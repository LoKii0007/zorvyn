"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis-1");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis-2");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-gray-100 dark:border-white/3 bg-transparent transition-colors",
        className,
      )}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border-gray-200 dark:border-white/10 dark:text-zinc-400 dark:bg-[#1a1b21]"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border-gray-200 dark:border-white/10 dark:text-zinc-400 dark:bg-[#1a1b21]"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-500">
            Page{" "}
            <span className="font-semibold text-black dark:text-zinc-300">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-black dark:text-zinc-300">
              {totalPages}
            </span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex items-center space-x-1"
            aria-label="Pagination"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-xl border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-600 hover:text-black dark:hover:text-zinc-300 dark:bg-[#1a1b21] focus:ring-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, idx) => {
              if (typeof page === "string") {
                return (
                  <div
                    key={`ellipsis-${idx}`}
                    className="h-9 w-9 flex items-center justify-center text-gray-400 dark:text-zinc-600"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(page)}
                  className={`h-9 w-12 rounded-xl text-sm font-semibold transition-all shadow-none! border-none! ${
                    currentPage === page
                      ? "bg-black dark:bg-zinc-200 text-white dark:text-black hover:bg-black/90 dark:hover:bg-white shadow-md dark:shadow-none"
                      : "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-300"
                  } focus:ring-0`}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-xl border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-600 hover:text-black dark:hover:text-zinc-300 dark:bg-[#1a1b21] focus:ring-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};
