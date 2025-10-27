import { forwardRef, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
  isValidFunction,
} from "../../lib/validation";
import type { AspectRatioProps } from "./AspectRatio.types";

/**
 * AspectRatio Component Variants
 *
 * Ultra-modern aspect ratio component with beautiful styling options.
 * Maintains consistent aspect ratios for images, videos, iframes, and any content.
 *
 * @variant default - Clean minimal design with subtle border
 * @variant bordered - Prominent border with hover effects
 * @variant glass - Frosted glass effect with backdrop blur
 * @variant glass-strong - Enhanced glass effect with stronger blur
 * @variant gradient - Gradient border with shimmer effect
 */
const aspectRatioVariants = cva(
  [
    "relative w-full overflow-hidden",
    "transition-all duration-300 ease-out",
    "group isolate",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-muted/30 border border-border/30",
          "hover:border-border/50",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        bordered: [
          "border-2 border-border/50",
          "hover:border-primary/40",
          "shadow-sm hover:shadow-md",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        glass: [
          "glass backdrop-blur-xl",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30",
          "hover:shadow-[0_12px_48px_0] hover:shadow-primary/20",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        "glass-strong": [
          "glass-strong backdrop-blur-2xl",
          "border-2 border-white/20 dark:border-white/10",
          "shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40",
          "hover:shadow-[0_16px_64px_0] hover:shadow-primary/25",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 via-background to-accent/20",
          "border-2 border-transparent",
          "relative",
          "before:absolute before:inset-0 before:-z-10",
          "before:bg-gradient-to-r before:from-primary before:via-accent before:to-secondary",
          "before:opacity-50 before:blur-xl",
          "after:absolute after:inset-[2px] after:bg-background/95 after:rounded-[inherit]",
          "hover:before:opacity-75 before:transition-opacity before:duration-500",
        ],
      },
      rounded: {
        none: "rounded-none before:rounded-none after:rounded-none",
        sm: "rounded-sm before:rounded-sm after:rounded-sm",
        md: "rounded-md before:rounded-md after:rounded-md",
        lg: "rounded-lg before:rounded-lg after:rounded-lg",
        xl: "rounded-xl before:rounded-xl after:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl after:rounded-2xl",
        full: "rounded-full before:rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "md",
    },
  }
);

/**
 * Overlay gradient variants
 */
const overlayVariants = cva(
  [
    "absolute inset-0 pointer-events-none z-10",
    "transition-opacity duration-300",
  ],
  {
    variants: {
      position: {
        top: "bg-gradient-to-b from-black/50 via-transparent to-transparent",
        bottom: "bg-gradient-to-t from-black/50 via-transparent to-transparent",
        left: "bg-gradient-to-r from-black/50 via-transparent to-transparent",
        right: "bg-gradient-to-l from-black/50 via-transparent to-transparent",
        center:
          "bg-radial-gradient from-transparent via-transparent to-black/40",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

/**
 * Parse custom ratio string to number
 * Supports formats: "16:9", "1.3:2.3", or number
 */
const parseRatio = (ratio: number | string | undefined): number => {
  if (!ratio) return 16 / 9;

  if (typeof ratio === "number") return ratio;

  // Parse string format like "16:9" or "1.3:2.3"
  if (typeof ratio === "string" && ratio.includes(":")) {
    const [width, height] = ratio.split(":").map(Number);
    if (!isNaN(width) && !isNaN(height) && height !== 0) {
      return width / height;
    }
  }

  // Try to parse as number
  const parsed = parseFloat(ratio);
  return isNaN(parsed) ? 16 / 9 : parsed;
};

/**
 * Aspect ratio value mapping
 */
const aspectRatioMap = {
  "1/1": 1,
  "4/3": 4 / 3,
  "16/9": 16 / 9,
  "21/9": 21 / 9,
  "3/2": 3 / 2,
  "2/3": 2 / 3,
  "9/16": 9 / 16,
  "3/4": 3 / 4,
  custom: 0, // Will be overridden by customRatio prop
};

/**
 * AspectRatio Component
 *
 * Advanced aspect ratio component that maintains consistent proportions for any content.
 * Perfect for images, videos, iframes, embedded content, and responsive layouts.
 *
 * Features:
 * - 8 preset aspect ratios + custom ratio support
 * - 5 beautiful visual variants
 * - Optional overlay gradients
 * - Smooth hover effects and transitions
 * - Glass morphism support
 * - Fully responsive and accessible
 *
 * @example
 * ```tsx
 * // Basic usage with image
 * <AspectRatio ratio="16/9">
 *   <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
 * </AspectRatio>
 *
 * // Video with glass effect
 * <AspectRatio ratio="21/9" variant="glass" rounded="lg">
 *   <video src="/video.mp4" className="w-full h-full object-cover" />
 * </AspectRatio>
 *
 * // Custom ratio with overlay
 * <AspectRatio ratio="custom" customRatio={2.5} overlay overlayPosition="bottom">
 *   <iframe src="https://example.com" className="w-full h-full" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      children,
      ratio = "16/9",
      customRatio,
      variant = "default",
      rounded = "md",
      overlay = false,
      overlayPosition = "bottom",
      zoomOnHover = false,
      zoomScale = 1.1,
      lazy = false,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className,
      contentClassName,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("AspectRatio");

      // Validate ratio
      validator.validateEnum("ratio", ratio, [
        "1/1",
        "4/3",
        "16/9",
        "21/9",
        "3/2",
        "2/3",
        "9/16",
        "3/4",
        "custom",
      ] as const);

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "bordered",
        "glass",
        "glass-strong",
        "gradient",
      ] as const);

      // Validate rounded
      validator.validateEnum("rounded", rounded, [
        "none",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "full",
      ] as const);

      // Validate overlayPosition
      if (overlayPosition) {
        validator.validateEnum("overlayPosition", overlayPosition, [
          "top",
          "bottom",
          "left",
          "right",
          "center",
        ] as const);
      }

      // Validate boolean props
      validator.validateType("overlay", overlay, "boolean", isValidBoolean);
      validator.validateType(
        "zoomOnHover",
        zoomOnHover,
        "boolean",
        isValidBoolean
      );
      validator.validateType("lazy", lazy, "boolean", isValidBoolean);

      // Validate customRatio
      if (ratio === "custom") {
        if (!customRatio) {
          validator.error(
            '"customRatio" prop is required when ratio is set to "custom"'
          );
        } else {
          validator.validateType(
            "customRatio",
            customRatio,
            "number",
            isValidNumber
          );
        }
      } else if (customRatio !== undefined) {
        validator.warn(
          `"customRatio" prop is ignored when ratio is "${ratio}". Only use customRatio when ratio="custom".`
        );
      }

      // Validate zoomScale
      if (zoomScale !== undefined) {
        validator.validateType("zoomScale", zoomScale, "number", isValidNumber);
        if (isValidNumber(zoomScale)) {
          if (zoomScale < 1.0 || zoomScale > 2.0) {
            validator.warn(
              `"zoomScale" should be between 1.0 and 2.0. Received: ${zoomScale}. Value will be clamped.`
            );
          }
        }
      }

      // Validate callbacks
      if (onClick) {
        validator.validateType("onClick", onClick, "function", isValidFunction);
      }
      if (onMouseEnter) {
        validator.validateType(
          "onMouseEnter",
          onMouseEnter,
          "function",
          isValidFunction
        );
      }
      if (onMouseLeave) {
        validator.validateType(
          "onMouseLeave",
          onMouseLeave,
          "function",
          isValidFunction
        );
      }

      // Validate children
      if (!children) {
        validator.warn("AspectRatio should have children content");
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [
      ratio,
      customRatio,
      variant,
      rounded,
      overlay,
      overlayPosition,
      zoomOnHover,
      zoomScale,
      lazy,
      onClick,
      onMouseEnter,
      onMouseLeave,
      children,
      className,
    ]);

    // Calculate the aspect ratio value
    const ratioValue =
      ratio === "custom"
        ? parseRatio(customRatio)
        : aspectRatioMap[ratio] || aspectRatioMap["16/9"];

    // Calculate padding-bottom percentage for aspect ratio
    const paddingBottom = `${(1 / ratioValue) * 100}%`;

    // Clamp zoom scale between 1.0 and 2.0
    const safeZoomScale = Math.max(1.0, Math.min(2.0, zoomScale));

    return (
      <div
        ref={ref}
        className={cn(aspectRatioVariants({ variant, rounded }), className)}
        style={{ paddingBottom }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {/* Content wrapper */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "transition-transform duration-300",
            zoomOnHover
              ? `group-hover:scale-[${safeZoomScale}]`
              : "group-hover:scale-[1.02]",
            variant === "gradient" && "z-10",
            lazy && "[&_img]:lazy",
            contentClassName
          )}
          style={
            zoomOnHover
              ? {
                  transform: `scale(1)`,
                  transition: "transform 0.3s ease-out",
                }
              : undefined
          }
          onMouseEnter={(e) => {
            if (zoomOnHover && e.currentTarget instanceof HTMLElement) {
              e.currentTarget.style.transform = `scale(${safeZoomScale})`;
            }
          }}
          onMouseLeave={(e) => {
            if (zoomOnHover && e.currentTarget instanceof HTMLElement) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {children}
        </div>

        {/* Optional overlay gradient */}
        {overlay && (
          <div
            className={cn(
              overlayVariants({ position: overlayPosition }),
              "group-hover:opacity-80"
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export default AspectRatio;

// Export types
export type { AspectRatioProps } from "./AspectRatio.types";
