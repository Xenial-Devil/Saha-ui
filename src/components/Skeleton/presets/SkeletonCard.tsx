"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonCardProps } from "../Skeleton.types";

/**
 * SkeletonCard Component
 *
 * Pre-built skeleton loader for card components.
 * Perfect for blog posts, product cards, news items, etc.
 *
 * @example
 * Basic card skeleton:
 * ```tsx
 * <SkeletonCard />
 * ```
 *
 * @example
 * Card without image:
 * ```tsx
 * <SkeletonCard showImage={false} lines={4} />
 * ```
 *
 * @example
 * Custom variant:
 * ```tsx
 * <SkeletonCard variant="shimmer" imageHeight="300px" />
 * ```
 */
export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      variant = "wave",
      speed = "normal",
      noAnimation = false,
      showImage = true,
      imageHeight = "200px",
      lines = 3,
      showActions = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card p-4 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Image skeleton */}
        {showImage && (
          <Skeleton
            variant={variant}
            shape="rounded"
            height={imageHeight}
            width="100%"
            speed={speed}
            noAnimation={noAnimation}
            className="mb-4"
          />
        )}

        {/* Title skeleton */}
        <Skeleton
          variant={variant}
          height="24px"
          width="80%"
          speed={speed}
          noAnimation={noAnimation}
          className="mb-3"
        />

        {/* Description lines */}
        <Skeleton
          variant={variant === "wave" ? "pulse" : variant}
          shape="text"
          count={lines}
          speed={speed}
          noAnimation={noAnimation}
          spacing="normal"
          className="mb-4"
        />

        {/* Action button skeleton */}
        {showActions && (
          <Skeleton
            variant={variant}
            shape="button"
            width="120px"
            height="40px"
            speed={speed}
            noAnimation={noAnimation}
          />
        )}
      </div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
