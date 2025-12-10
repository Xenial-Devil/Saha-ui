"use client";

import React from "react";
import { cn } from "../../lib/utils";
import type { SkeletonProps } from "./Skeleton.types";
import { skeletonVariants, skeletonContainerVariants } from "./Skeleton.styles";

/**
 * Skeleton Component
 *
 * A flexible skeleton loader component for displaying placeholder content
 * while data is loading. Supports multiple variants, shapes, and animations.
 *
 * Why use skeleton loaders?
 * 1. **Perceived Performance**: Users see immediate visual feedback
 * 2. **Reduced Layout Shift**: Maintains space before content loads (better CLS score)
 * 3. **Better UX**: Animated placeholders feel more responsive than blank screens
 * 4. **Loading Communication**: Users understand content is being fetched
 * 5. **Progressive Loading**: Show structure before details
 *
 * How it works:
 * - Uses CSS animations (pulse, shimmer, wave) to create loading effect
 * - Pseudo-elements (::before) create animated gradient overlays
 * - CVA (Class Variance Authority) manages variant combinations
 * - Supports custom dimensions, shapes, and animation speeds
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * ```
 *
 * @example
 * Avatar skeleton:
 * ```tsx
 * <Skeleton variant="shimmer" shape="circle" width="48px" height="48px" />
 * ```
 *
 * @example
 * Multiple text lines:
 * ```tsx
 * <Skeleton variant="pulse" shape="text" count={3} spacing="normal" />
 * ```
 *
 * @example
 * Card skeleton with wave effect:
 * ```tsx
 * <Skeleton variant="wave" shape="card" height="200px" />
 * ```
 *
 * @example
 * Custom styling and no animation:
 * ```tsx
 * <Skeleton
 *   variant="gradient"
 *   width="200px"
 *   height="100px"
 *   className="mb-4"
 *   noAnimation={false}
 * />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "default",
      shape = "rectangle",
      width = "100%",
      height = "20px",
      count = 1,
      speed = "normal",
      spacing = "normal",
      noAnimation = false,
      borderRadius,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Convert width/height to CSS values
    const widthValue = typeof width === "number" ? `${width}px` : width;
    const heightValue = typeof height === "number" ? `${height}px` : height;

    // Custom styles for individual skeleton
    const customStyles: React.CSSProperties = {
      width: widthValue,
      height: heightValue,
      ...(borderRadius && shape === "rectangle" ? { borderRadius } : {}),
      ...style,
    };

    // Handle numeric or custom string spacing values for container
    const isTokenSpacing =
      typeof spacing === "string" &&
      ["tight", "normal", "loose", "relaxed"].includes(spacing);

    const containerStyle =
      !isTokenSpacing && spacing !== undefined
        ? {
            gap: typeof spacing === "number" ? `${spacing}px` : spacing,
          }
        : undefined;

    // If count > 1, render multiple skeletons in a container
    if (count > 1) {
      return (
        <div
          className={cn(
            skeletonContainerVariants({
              spacing: isTokenSpacing
                ? (spacing as "tight" | "normal" | "loose" | "relaxed")
                : "normal",
            })
          )}
          style={containerStyle}
          ref={ref}
        >
          {Array.from({ length: count }).map((_, index) => {
            // Calculate width for last item (optional variation)
            const isLastItem = index === count - 1;
            const itemWidth =
              isLastItem && shape === "text"
                ? typeof width === "string" && width.includes("%")
                  ? `${Math.max(40, parseInt(width) - 20)}%`
                  : widthValue
                : widthValue;

            return (
              <div
                key={index}
                className={cn(
                  skeletonVariants({
                    variant: noAnimation ? undefined : variant,
                    shape,
                    speed: noAnimation ? undefined : speed,
                  }),
                  noAnimation && "animate-none",
                  className
                )}
                style={{
                  ...customStyles,
                  width: itemWidth,
                }}
                {...props}
              />
            );
          })}
        </div>
      );
    }

    // Single skeleton
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({
            variant: noAnimation ? undefined : variant,
            shape,
            speed: noAnimation ? undefined : speed,
          }),
          noAnimation && "animate-none",
          className
        )}
        style={customStyles}
        aria-busy="true"
        aria-live="polite"
        role="status"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
