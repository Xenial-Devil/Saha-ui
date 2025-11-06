"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonAvatarProps } from "../Skeleton.types";

/**
 * Avatar size mapping
 */
const avatarSizes = {
  xs: "24px",
  sm: "32px",
  md: "48px",
  lg: "64px",
  xl: "80px",
  "2xl": "96px",
} as const;

/**
 * SkeletonAvatar Component
 *
 * Pre-built skeleton loader for avatar components.
 * Perfect for profile pictures, user lists, comment sections, etc.
 *
 * @example
 * Basic avatar skeleton:
 * ```tsx
 * <SkeletonAvatar />
 * ```
 *
 * @example
 * Large avatar with text:
 * ```tsx
 * <SkeletonAvatar size="lg" showText lines={2} />
 * ```
 *
 * @example
 * Multiple avatars in a group:
 * ```tsx
 * <div className="flex gap-2">
 *   <SkeletonAvatar size="sm" variant="shimmer" />
 *   <SkeletonAvatar size="sm" variant="shimmer" />
 *   <SkeletonAvatar size="sm" variant="shimmer" />
 * </div>
 * ```
 */
export const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  SkeletonAvatarProps
>(
  (
    {
      variant = "shimmer",
      speed = "normal",
      noAnimation = false,
      size = "md",
      showText = false,
      lines = 2,
      className,
      ...props
    },
    ref
  ) => {
    const avatarSize = avatarSizes[size];

    // If showing text, render avatar + text layout
    if (showText) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3", className)}
          {...props}
        >
          {/* Avatar circle */}
          <Skeleton
            variant={variant}
            shape="circle"
            width={avatarSize}
            height={avatarSize}
            speed={speed}
            noAnimation={noAnimation}
            className="flex-shrink-0"
          />

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {lines === 1 ? (
              <Skeleton
                variant={variant === "shimmer" ? "pulse" : variant}
                height="16px"
                width="120px"
                speed={speed}
                noAnimation={noAnimation}
              />
            ) : (
              <>
                {/* Name/Title */}
                <Skeleton
                  variant={variant === "shimmer" ? "pulse" : variant}
                  height="16px"
                  width="140px"
                  speed={speed}
                  noAnimation={noAnimation}
                  className="mb-2"
                />
                {/* Subtitle/Description */}
                <Skeleton
                  variant={variant === "shimmer" ? "pulse" : variant}
                  height="14px"
                  width="100px"
                  speed={speed}
                  noAnimation={noAnimation}
                />
              </>
            )}
          </div>
        </div>
      );
    }

    // Just avatar, no text
    return (
      <Skeleton
        ref={ref}
        variant={variant}
        shape="circle"
        width={avatarSize}
        height={avatarSize}
        speed={speed}
        noAnimation={noAnimation}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";

export default SkeletonAvatar;
