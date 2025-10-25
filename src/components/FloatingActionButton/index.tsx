import React, { useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { FloatingActionButtonProps } from "./FloatingActionButton.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

/**
 * Floating Action Button Component
 *
 * A modern floating action button (FAB) with beautiful visual effects.
 * Features position variants, size options, and smooth animations.
 *
 * Icon can be passed either via the `icon` prop or as children:
 * @example
 * // Using children (recommended)
 * <FloatingActionButton><Plus size={24} /></FloatingActionButton>
 *
 * // Using icon prop
 * <FloatingActionButton icon={<Plus size={24} />} />
 *
 * @variant default - Standard style
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant info - Info color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant error - Error color theme
 * @variant glass - Glassmorphism effect
 *
 * @size sm | md | lg | xl - Size variations
 * @position bottom-right | bottom-left | top-right | top-left - Screen position
 */

/**
 * FAB variants using CVA
 */
export const fabVariants = cva(
  [
    "group fixed inline-flex items-center justify-center gap-2",
    "rounded-full font-medium transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50",
    "overflow-hidden isolate cursor-pointer z-50",
    // Enhanced shadow effects
    "shadow-[0_8px_32px_0] hover:shadow-[0_12px_48px_0]",
    // Gradient overlays
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent",
    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent",
    "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
    // Hover effects
    "hover:scale-110 active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground border-2 border-border",
          "shadow-black/10 hover:shadow-black/20",
          "hover:border-primary/40",
        ],
        primary: [
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
          "border-2 border-primary/80",
          "shadow-primary/40 hover:shadow-primary/70",
          "hover:brightness-110 active:brightness-90",
        ],
        secondary: [
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground",
          "border-2 border-secondary/80",
          "shadow-secondary/40 hover:shadow-secondary/70",
          "hover:brightness-110 active:brightness-90",
        ],
        accent: [
          "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground",
          "border-2 border-accent/80",
          "shadow-accent/40 hover:shadow-accent/70",
          "hover:brightness-110 active:brightness-90",
        ],
        info: [
          "bg-gradient-to-br from-info to-info/80 text-info-foreground",
          "border-2 border-info/80",
          "shadow-info/40 hover:shadow-info/70",
          "hover:brightness-110 active:brightness-90",
        ],
        success: [
          "bg-gradient-to-br from-success to-success/80 text-success-foreground",
          "border-2 border-success/80",
          "shadow-success/40 hover:shadow-success/70",
          "hover:brightness-110 active:brightness-90",
        ],
        warning: [
          "bg-gradient-to-br from-warning to-warning/80 text-warning-foreground",
          "border-2 border-warning/80",
          "shadow-warning/40 hover:shadow-warning/70",
          "hover:brightness-110 active:brightness-90",
        ],
        error: [
          "bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground",
          "border-2 border-destructive/80",
          "shadow-destructive/40 hover:shadow-destructive/70",
          "hover:brightness-110 active:brightness-90",
        ],
        glass: [
          "glass backdrop-blur-2xl",
          "border-2 border-border/30 hover:border-primary/40",
          "bg-background/40 text-foreground",
          "shadow-black/10 hover:shadow-primary/20",
        ],
      },
      size: {
        sm: "h-12 w-12 text-sm",
        md: "h-14 w-14 text-base",
        lg: "h-16 w-16 text-lg",
        xl: "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Position variants for FAB
 */
const positionVariants: Record<
  "bottom-right" | "bottom-left" | "top-right" | "top-left",
  string
> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

/**
 * Label wrapper variants
 */
const labelVariants = cva(
  [
    "absolute whitespace-nowrap px-3 py-1.5 rounded-lg",
    "bg-card/95 backdrop-blur-sm text-foreground text-sm font-medium",
    "border border-border/50 shadow-lg",
    "transition-all duration-300 ease-out",
    "pointer-events-none z-10",
  ],
  {
    variants: {
      position: {
        "bottom-right": "right-full mr-3 top-1/2 -translate-y-1/2",
        "bottom-left": "left-full ml-3 top-1/2 -translate-y-1/2",
        "top-right": "right-full mr-3 top-1/2 -translate-y-1/2",
        "top-left": "left-full ml-3 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      position = "bottom-right",
      icon,
      label,
      showLabel = false,
      extended = false,
      offset,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("FloatingActionButton");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate position
      validator.validateEnum("position", position, [
        "bottom-right",
        "bottom-left",
        "top-right",
        "top-left",
      ] as const);

      // Validate boolean props
      validator.validateType("showLabel", showLabel, "boolean", isValidBoolean);
      validator.validateType("extended", extended, "boolean", isValidBoolean);

      // Validate content
      if (!icon && !children) {
        validator.warn(
          "FloatingActionButton should have icon or children for accessibility"
        );
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      position,
      showLabel,
      extended,
      icon,
      children,
      className,
    ]);

    const [isHovered, setIsHovered] = React.useState(false);

    // Calculate position with custom offset
    const getPositionStyle = () => {
      if (!offset) return {};
      const style: React.CSSProperties = {};

      if (position.includes("bottom")) {
        style.bottom = offset.y ? `${24 + offset.y}px` : undefined;
      } else {
        style.top = offset.y ? `${24 + offset.y}px` : undefined;
      }

      if (position.includes("right")) {
        style.right = offset.x ? `${24 + offset.x}px` : undefined;
      } else {
        style.left = offset.x ? `${24 + offset.x}px` : undefined;
      }

      return style;
    };

    const showLabelTooltip = (showLabel || isHovered) && label && !extended;
    const isExtended = extended && label;
    const fabPosition:
      | "bottom-right"
      | "bottom-left"
      | "top-right"
      | "top-left" = position || "bottom-right";

    return (
      <button
        ref={ref}
        className={cn(
          fabVariants({ variant, size }),
          positionVariants[fabPosition],
          isExtended && "w-auto px-6",
          className
        )}
        style={getPositionStyle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Label tooltip (non-extended mode) */}
        {showLabelTooltip && (
          <span
            className={cn(
              labelVariants({ position }),
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            {label}
          </span>
        )}

        {/* Icon */}
        <span className="relative z-10 inline-flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
          {children || icon}
        </span>

        {/* Extended label */}
        {isExtended && (
          <span className="relative z-10 font-semibold">{label}</span>
        )}
      </button>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export default FloatingActionButton;
