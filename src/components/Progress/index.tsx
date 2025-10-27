import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { ProgressProps } from "./Progress.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

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

/**
 * Progress track - enhanced background with glow effects
 */
const progressVariants = cva(
  [
    "relative w-full overflow-hidden",
    "bg-black/[0.08] dark:bg-white/[0.08]",
    "transition-all duration-300 ease-out",
    "shadow-inner",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-50",
  ],
  {
    variants: {
      size: {
        xs: "h-1.5",
        sm: "h-2.5",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  }
);

/**
 * Progress bar - enhanced with glow and shimmer effects
 */
const progressBarVariants = cva(
  [
    "h-full relative overflow-hidden",
    "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
    "before:translate-x-[-100%] before:animate-[shimmer_2s_infinite]",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[oklch(0.60_0.24_250)]",
          "dark:bg-[oklch(0.70_0.20_250)]",
          "shadow-lg shadow-[oklch(0.60_0.24_250)]/50",
        ],
        primary: "bg-primary shadow-lg shadow-primary/50",
        secondary: "bg-secondary shadow-lg shadow-secondary/50",
        accent: "bg-accent shadow-lg shadow-accent/50",
        success: [
          "bg-[oklch(0.70_0.20_145)]",
          "dark:bg-[oklch(0.75_0.18_145)]",
          "shadow-lg shadow-[oklch(0.70_0.20_145)]/50",
        ],
        warning: [
          "bg-[oklch(0.80_0.16_75)]",
          "dark:bg-[oklch(0.82_0.16_75)]",
          "shadow-lg shadow-[oklch(0.80_0.16_75)]/50",
        ],
        error: [
          "bg-[oklch(0.64_0.26_15)]",
          "dark:bg-[oklch(0.68_0.24_15)]",
          "shadow-lg shadow-[oklch(0.64_0.26_15)]/50",
        ],
        info: "bg-info shadow-lg shadow-info/50",
        gradient: [
          "bg-gradient-to-r",
          "from-[oklch(0.65_0.25_250)] via-[oklch(0.60_0.28_300)] to-[oklch(0.68_0.26_330)]",
          "dark:from-[oklch(0.70_0.22_250)] dark:via-[oklch(0.65_0.25_300)] dark:to-[oklch(0.72_0.24_330)]",
          "shadow-xl shadow-[oklch(0.65_0.25_250)]/60",
        ],
        striped: "bg-primary shadow-lg shadow-primary/50",
        glass: [
          "backdrop-blur-xl bg-white/40 dark:bg-white/20",
          "border border-white/60 dark:border-white/30",
          "shadow-xl shadow-white/30",
        ],
      },
      glow: {
        true: "drop-shadow-[0_0_12px_currentColor]",
        false: "",
      },
      striped: {
        true: [
          "bg-[linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)]",
          "bg-[length:1.5rem_1.5rem]",
        ],
        false: "",
      },
      stripedAnimated: {
        true: "animate-[progress-stripes_1.2s_linear_infinite]",
        false: "",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "default",
      glow: false,
      striped: false,
      stripedAnimated: false,
    },
  }
);

/**
 * Progress label - clean typography
 */
const progressLabelVariants = cva(
  "font-semibold tabular-nums transition-all duration-300",
  {
    variants: {
      position: {
        inside: [
          "absolute inset-0 flex items-center justify-center",
          "text-white dark:text-white",
          "font-bold tracking-tight",
        ],
        outside: [
          "ml-3 text-foreground/80 dark:text-foreground/70",
          "font-medium",
        ],
        top: ["mb-2 text-foreground/80 dark:text-foreground/70", "font-medium"],
      },
      size: {
        xs: "text-[9px]",
        sm: "text-[11px]",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-base",
      },
    },
    defaultVariants: {
      position: "inside",
      size: "md",
    },
  }
);

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
