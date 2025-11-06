"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonTextProps } from "../Skeleton.types";

/**
 * SkeletonText Component
 *
 * Pre-built skeleton loader for text content.
 * Perfect for paragraphs, articles, descriptions, and any text-heavy content.
 *
 * @example
 * Basic text skeleton:
 * ```tsx
 * <SkeletonText />
 * ```
 *
 * @example
 * Long paragraph with custom last line:
 * ```tsx
 * <SkeletonText lines={8} lastLineWidth={45} />
 * ```
 *
 * @example
 * Custom variant and speed:
 * ```tsx
 * <SkeletonText variant="shimmer" speed="fast" lines={5} />
 * ```
 */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      variant = "pulse",
      speed = "normal",
      noAnimation = false,
      lines = 3,
      lastLineWidth = 60,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full space-y-3", className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? `${lastLineWidth}%` : "100%";

          return (
            <Skeleton
              key={`text-line-${index}`}
              variant={variant}
              shape="text"
              height="16px"
              width={lineWidth}
              speed={speed}
              noAnimation={noAnimation}
            />
          );
        })}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

export default SkeletonText;
