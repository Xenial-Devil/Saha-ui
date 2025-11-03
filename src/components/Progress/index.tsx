import React, { useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { ProgressProps } from "./Progress.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import { progressBarVariants, progressLabelVariants, progressVariants } from "./Progress.styles";


/**
 * Flat Progress Component
 *
 * Clean, minimal design with solid colors and smooth animations.
 * No shadows, gradients, or 3D effects - pure flat design.
 *
 * @variant default - Vibrant blue
 * @variant primary - Primary brand color
 * @variant secondary - Secondary accent
 * @variant accent - Accent color
 * @variant success - Fresh green
 * @variant warning - Warm amber
 * @variant error - Bold red
 * @variant info - Info blue
 * @variant gradient - Colorful gradient (only variant with gradient)
 * @variant striped - Diagonal pattern
 * @variant glass - Frosted glass
 */

export type ProgressVariantsProps = VariantProps<typeof progressVariants>;

/**
 * Flat Progress Component
 *
 * A clean, minimal progress bar with smooth animations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Progress value={75} />
 *
 * // With variant and size
 * <Progress value={60} variant="success" size="lg" />
 *
 * // With outside label
 * <Progress value={45} showValue labelPosition="outside" />
 *
 * // Striped with animation
 * <Progress value={80} striped stripedAnimated />
 *
 * // Indeterminate loading
 * <Progress indeterminate variant="gradient" />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      variant = "default",
      size = "md",
      shape = "rounded",
      animation = "none",
      value = 0,
      max = 100,
      showValue = false,
      label,
      labelPosition = "inside",
      color,
      trackColor,
      striped = false,
      stripedAnimated = false,
      glow = false,
      valueFormat,
      barClassName,
      labelClassName,
      indeterminate = false,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Progress");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
        "gradient",
        "striped",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
      ] as const);

      // Validate shape
      validator.validateEnum("shape", shape, [
        "rounded",
        "pill",
        "square",
      ] as const);

      // Validate animation
      validator.validateEnum("animation", animation, [
        "none",
        "pulse",
        "shimmer",
      ] as const);

      // Validate labelPosition
      validator.validateEnum("labelPosition", labelPosition, [
        "inside",
        "outside",
        "top",
      ] as const);

      // Validate numeric props
      validator.validateType("value", value, "number", isValidNumber);
      validator.validateType("max", max, "number", isValidNumber);

      if (max <= 0) {
        validator.error("max must be greater than 0");
      }

      if (value < 0) {
        validator.warn("value should not be negative");
      }

      // Validate boolean props
      validator.validateType("showValue", showValue, "boolean", isValidBoolean);
      validator.validateType("striped", striped, "boolean", isValidBoolean);
      validator.validateType(
        "stripedAnimated",
        stripedAnimated,
        "boolean",
        isValidBoolean
      );
      validator.validateType("glow", glow, "boolean", isValidBoolean);
      validator.validateType(
        "indeterminate",
        indeterminate,
        "boolean",
        isValidBoolean
      );

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      shape,
      animation,
      labelPosition,
      value,
      max,
      showValue,
      striped,
      stripedAnimated,
      glow,
      indeterminate,
      className,
    ]);

    // Normalize value within bounds
    const normalizedValue = Math.min(Math.max(value, 0), max);
    const percentage = (normalizedValue / max) * 100;

    // Format display value
    const displayValue = valueFormat
      ? valueFormat(normalizedValue, max)
      : label
      ? label
      : `${Math.round(percentage)}%`;

    // Show striped pattern
    const showStriped = striped || variant === "striped";

    // Animation classes
    const animationClass = indeterminate
      ? "animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
      : animation === "pulse"
      ? "animate-pulse"
      : animation === "shimmer"
      ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-[progress-shimmer_2s_ease-in-out_infinite]"
      : "";

    // Wrapper class for layout
    const wrapperClass =
      labelPosition === "top" ? "flex flex-col" : "flex items-center gap-2";

    return (
      <div className={cn(wrapperClass, className)} ref={ref}>
        {/* Top label */}
        {showValue && labelPosition === "top" && (
          <div
            className={cn(
              progressLabelVariants({ position: "top", size }),
              labelClassName
            )}
          >
            {displayValue}
          </div>
        )}

        {/* Progress container */}
        <div className="flex-1 relative">
          {/* Track */}
          <div
            className={cn(progressVariants({ size, shape }))}
            style={trackColor ? { backgroundColor: trackColor } : undefined}
            role="progressbar"
            aria-label={ariaLabel || "Progress"}
            aria-valuenow={indeterminate ? undefined : normalizedValue}
            aria-valuemin={0}
            aria-valuemax={max}
            {...props}
          >
            {/* Bar */}
            <div
              className={cn(
                progressBarVariants({
                  variant,
                  glow,
                  striped: showStriped,
                  stripedAnimated: stripedAnimated && showStriped,
                }),
                animationClass,
                barClassName
              )}
              style={{
                width: indeterminate ? "40%" : `${percentage}%`,
                backgroundColor: color,
              }}
            >
              {/* Inside label - only for larger sizes */}
              {showValue &&
                labelPosition === "inside" &&
                size !== "xs" &&
                size !== "sm" &&
                percentage > 10 && (
                  <div
                    className={cn(
                      progressLabelVariants({ position: "inside", size }),
                      labelClassName
                    )}
                  >
                    {displayValue}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Outside label */}
        {showValue && labelPosition === "outside" && (
          <div
            className={cn(
              progressLabelVariants({ position: "outside", size }),
              "shrink-0 min-w-[3rem] text-right",
              labelClassName
            )}
          >
            {displayValue}
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
export { progressVariants, progressBarVariants, progressLabelVariants };
