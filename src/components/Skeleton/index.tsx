import React from "react";
import { cn } from "../../lib/utils";
import type { SkeletonProps } from "./Skeleton.types";
import { skeletonVariants } from "./Skeleton.styles";

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
