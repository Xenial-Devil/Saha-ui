"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonTableProps } from "../Skeleton.types";

/**
 * SkeletonTable Component
 *
 * Pre-built skeleton loader for table components.
 * Perfect for data tables, grids, and tabular data displays.
 *
 * @example
 * Basic table skeleton:
 * ```tsx
 * <SkeletonTable />
 * ```
 *
 * @example
 * Large table without header:
 * ```tsx
 * <SkeletonTable rows={10} columns={6} showHeader={false} />
 * ```
 *
 * @example
 * Custom variant:
 * ```tsx
 * <SkeletonTable variant="shimmer" rows={8} columns={5} />
 * ```
 */
export const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  SkeletonTableProps
>(
  (
    {
      variant = "pulse",
      speed = "normal",
      noAnimation = false,
      rows = 5,
      columns = 4,
      showHeader = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm",
          className
        )}
        {...props}
      >
        {/* Table Header */}
        {showHeader && (
          <div className="grid gap-4 border-b border-border bg-muted/30 p-4">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`header-${colIndex}`}
                  variant={variant}
                  height="20px"
                  width={colIndex === 0 ? "80%" : "70%"}
                  speed={speed}
                  noAnimation={noAnimation}
                />
              ))}
            </div>
          </div>
        )}

        {/* Table Body */}
        <div className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="p-4">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <Skeleton
                    key={`cell-${rowIndex}-${colIndex}`}
                    variant={variant === "pulse" ? "default" : variant}
                    height="16px"
                    width={
                      colIndex === columns - 1
                        ? "60%"
                        : colIndex === 0
                          ? "85%"
                          : "75%"
                    }
                    speed={speed}
                    noAnimation={noAnimation}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SkeletonTable.displayName = "SkeletonTable";

export default SkeletonTable;
