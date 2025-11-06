"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonListProps } from "../Skeleton.types";

/**
 * Avatar size mapping for list items
 */
const listAvatarSizes = {
  sm: "32px",
  md: "48px",
  lg: "64px",
} as const;

/**
 * SkeletonList Component
 *
 * Pre-built skeleton loader for list components.
 * Perfect for user lists, comment threads, notifications, activity feeds, etc.
 *
 * @example
 * Basic list skeleton:
 * ```tsx
 * <SkeletonList />
 * ```
 *
 * @example
 * List without avatars:
 * ```tsx
 * <SkeletonList items={5} showAvatar={false} />
 * ```
 *
 * @example
 * Compact list with small avatars:
 * ```tsx
 * <SkeletonList items={8} avatarSize="sm" lines={1} />
 * ```
 *
 * @example
 * Custom variant and speed:
 * ```tsx
 * <SkeletonList variant="shimmer" speed="fast" items={4} />
 * ```
 */
export const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  (
    {
      variant = "pulse",
      speed = "normal",
      noAnimation = false,
      items = 3,
      showAvatar = true,
      avatarSize = "md",
      lines = 2,
      className,
      ...props
    },
    ref
  ) => {
    const avatarDimension = listAvatarSizes[avatarSize];

    return (
      <div
        ref={ref}
        className={cn("w-full space-y-4", className)}
        {...props}
      >
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 shadow-sm"
          >
            {/* Avatar skeleton */}
            {showAvatar && (
              <Skeleton
                variant={variant}
                shape="circle"
                width={avatarDimension}
                height={avatarDimension}
                speed={speed}
                noAnimation={noAnimation}
                className="flex-shrink-0"
              />
            )}

            {/* Content skeleton */}
            <div className="flex-1 min-w-0">
              {lines === 1 ? (
                <Skeleton
                  variant={variant}
                  height="16px"
                  width="85%"
                  speed={speed}
                  noAnimation={noAnimation}
                />
              ) : (
                <>
                  {/* Title/Name */}
                  <Skeleton
                    variant={variant}
                    height="18px"
                    width="70%"
                    speed={speed}
                    noAnimation={noAnimation}
                    className="mb-2"
                  />
                  {/* Description/Details */}
                  {Array.from({ length: lines - 1 }).map((_, lineIndex) => (
                    <Skeleton
                      key={lineIndex}
                      variant={variant === "pulse" ? "default" : variant}
                      shape="text"
                      height="14px"
                      width={lineIndex === lines - 2 ? "60%" : "90%"}
                      speed={speed}
                      noAnimation={noAnimation}
                      className={lineIndex < lines - 2 ? "mb-1.5" : ""}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SkeletonList.displayName = "SkeletonList";

export default SkeletonList;
