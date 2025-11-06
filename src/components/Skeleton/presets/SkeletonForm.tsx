"use client";

import React from "react";
import { Skeleton } from "../index";
import { cn } from "../../../lib/utils";
import type { SkeletonFormProps } from "../Skeleton.types";

/**
 * SkeletonForm Component
 *
 * Pre-built skeleton loader for form components.
 * Perfect for loading forms, settings pages, profile editors, etc.
 *
 * @example
 * Basic form skeleton:
 * ```tsx
 * <SkeletonForm />
 * ```
 *
 * @example
 * Form without submit button:
 * ```tsx
 * <SkeletonForm fields={6} showButton={false} />
 * ```
 *
 * @example
 * Custom variant and speed:
 * ```tsx
 * <SkeletonForm variant="wave" speed="fast" fields={5} />
 * ```
 */
export const SkeletonForm = React.forwardRef<HTMLDivElement, SkeletonFormProps>(
  (
    {
      variant = "pulse",
      speed = "normal",
      noAnimation = false,
      fields = 4,
      showButton = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Form Fields */}
        {Array.from({ length: fields }).map((_, index) => (
          <div key={`field-${index}`} className="space-y-2">
            {/* Field Label */}
            <Skeleton
              variant={variant}
              height="16px"
              width="120px"
              speed={speed}
              noAnimation={noAnimation}
              className="mb-1.5"
            />
            {/* Field Input */}
            <Skeleton
              variant={variant === "pulse" ? "default" : variant}
              shape="input"
              width="100%"
              height="40px"
              speed={speed}
              noAnimation={noAnimation}
            />
          </div>
        ))}

        {/* Form Actions */}
        {showButton && (
          <div className="flex gap-3 pt-2">
            {/* Submit Button */}
            <Skeleton
              variant={variant}
              shape="button"
              width="120px"
              height="40px"
              speed={speed}
              noAnimation={noAnimation}
            />
            {/* Cancel/Secondary Button */}
            <Skeleton
              variant={variant}
              shape="button"
              width="100px"
              height="40px"
              speed={speed}
              noAnimation={noAnimation}
            />
          </div>
        )}
      </div>
    );
  }
);

SkeletonForm.displayName = "SkeletonForm";

export default SkeletonForm;
