import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { SkeletonProps } from "./Skeleton.types";

/**
 * Skeleton variant styles using CVA
 */
export const skeletonVariants = cva(
  [
    // Base styles
    "relative",
    "overflow-hidden",
    "bg-base-200/50",
    "dark:bg-base-content/10",
    "shadow-sm",
  ],
  {
    variants: {
      variant: {
        default: ["animate-pulse", "shadow-inner"],
        pulse: ["animate-pulse", "shadow-inner"],
        wave: [
          "shadow-md",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-primary/10",
          "before:to-transparent",
          "after:absolute",
          "after:inset-0",
          "after:bg-gradient-to-b",
          "after:from-transparent",
          "after:to-black/5",
        ],
        shimmer: [
          "shadow-md",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_1.5s_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/30",
          "dark:before:via-white/15",
          "before:to-transparent",
          "before:shadow-[0_0_20px_10px_rgba(255,255,255,0.1)]",
        ],
        gradient: [
          "bg-gradient-to-r",
          "from-base-200/50",
          "via-primary/10",
          "to-base-200/50",
          "dark:from-base-content/10",
          "dark:via-primary/5",
          "dark:to-base-content/10",
          "animate-pulse",
          "shadow-lg",
        ],
        glass: [
          "bg-white/5",
          "backdrop-blur-md",
          "border",
          "border-white/10",
          "shadow-xl",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/20",
          "before:to-transparent",
          "after:absolute",
          "after:inset-0",
          "after:bg-gradient-to-br",
          "after:from-white/5",
          "after:to-transparent",
        ],
      },
      shape: {
        rectangle: ["rounded-md"],
        circle: ["rounded-full"],
        rounded: ["rounded-lg"],
        text: ["rounded-sm"],
      },
      speed: {
        slow: ["[animation-duration:2s]"],
        normal: [],
        fast: ["[animation-duration:0.8s]"],
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rectangle",
      speed: "normal",
    },
  }
);

/**
 * Skeleton Component
 *
 * A flexible skeleton loader component for displaying placeholder content
 * while data is loading. Supports multiple variants, shapes, and animations.
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton width="100%" height="20px" />
 *
 * // Circle skeleton (avatar)
 * <Skeleton variant="pulse" shape="circle" width="48px" height="48px" />
 *
 * // Multiple skeleton lines
 * <Skeleton variant="shimmer" count={3} />
 *
 * // Custom styling
 * <Skeleton variant="wave" width="200px" height="100px" className="mb-4" />
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

    // Custom styles
    const customStyles: React.CSSProperties = {
      width: widthValue,
      height: heightValue,
      ...(borderRadius && shape === "rectangle" ? { borderRadius } : {}),
      ...style,
    };

    // If count > 1, render multiple skeletons
    if (count > 1) {
      return (
        <div className="flex flex-col gap-2" ref={ref}>
          {Array.from({ length: count }).map((_, index) => (
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
              style={customStyles}
              {...props}
            />
          ))}
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
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
