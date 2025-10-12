import React, { useState, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TooltipProps } from "./Tooltip.types";

/**
 * Tooltip component variants using CVA
 *
 * Provides 9 modern tooltip variants with flexible positioning,
 * multiple trigger types, and interactive options.
 *
 * @variant default - Standard tooltip with card background
 * @variant dark - Dark themed tooltip
 * @variant light - Light themed tooltip
 * @variant glass - Glass morphism effect
 * @variant primary - Primary color tooltip
 * @variant success - Success/green tooltip
 * @variant warning - Warning/yellow tooltip
 * @variant error - Error/red tooltip
 * @variant info - Info/blue tooltip
 *
 * @position top | bottom | left | right - Tooltip position
 * @size sm | md | lg - Size variations
 */
export const tooltipVariants = cva(
  "absolute whitespace-nowrap z-50 transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground border border-border/50 shadow-xl backdrop-blur-sm",
        dark: "bg-gray-900 text-white border border-gray-700 shadow-xl",
        light:
          "bg-white text-gray-900 border border-gray-200 shadow-xl dark:bg-gray-100 dark:text-gray-900",
        glass:
          "glass-strong backdrop-blur-2xl text-foreground shadow-[0_8px_32px_0] shadow-black/20",
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_0] shadow-primary/40 border border-primary/50",
        success:
          "bg-green-500 text-white shadow-[0_8px_24px_0] shadow-green-500/40 border border-green-600",
        warning:
          "bg-yellow-500 text-gray-900 shadow-[0_8px_24px_0] shadow-yellow-500/40 border border-yellow-600",
        error:
          "bg-red-500 text-white shadow-[0_8px_24px_0] shadow-red-500/40 border border-red-600",
        info: "bg-blue-500 text-white shadow-[0_8px_24px_0] shadow-blue-500/40 border border-blue-600",
      },
      size: {
        sm: "text-xs px-2 py-1 rounded-md",
        md: "text-sm px-3 py-1.5 rounded-lg",
        lg: "text-base px-4 py-2 rounded-xl",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2",
        bottom: "top-full left-1/2 -translate-x-1/2",
        left: "right-full top-1/2 -translate-y-1/2",
        right: "left-full top-1/2 -translate-y-1/2",
      },
      interactive: {
        true: "pointer-events-auto cursor-auto",
        false: "pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "top",
      interactive: false,
    },
  }
);

/**
 * Arrow variants for tooltip
 */
const arrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-card border-l border-t border-border/50",
      dark: "bg-gray-900 border-l border-t border-gray-700",
      light: "bg-white border-l border-t border-gray-200 dark:bg-gray-100",
      glass:
        "glass-strong backdrop-blur-2xl border-l border-t border-border/30",
      primary: "bg-primary border-l border-t border-primary/50",
      success: "bg-green-500 border-l border-t border-green-600",
      warning: "bg-yellow-500 border-l border-t border-yellow-600",
      error: "bg-red-500 border-l border-t border-red-600",
      info: "bg-blue-500 border-l border-t border-blue-600",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "top",
  },
});

export type TooltipVariantsProps = VariantProps<typeof tooltipVariants>;

/**
 * Tooltip Component
 *
 * A versatile tooltip component for displaying contextual information,
 * hints, and descriptions with multiple visual styles and positioning options.
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // Variant with position
 * <Tooltip content="Success message" variant="success" position="right">
 *   <span>✓</span>
 * </Tooltip>
 *
 * // Interactive tooltip
 * <Tooltip
 *   content={<div>Click <a href="#">here</a></div>}
 *   interactive={true}
 *   trigger="click"
 * >
 *   <Button>Click for info</Button>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = "top",
      variant = "default",
      size = "md",
      delay = 200,
      arrow = true,
      trigger = "hover",
      open: controlledOpen,
      onOpenChange,
      tooltipClassName,
      wrapperClassName,
      className,
      maxWidth = "320px",
      interactive = false,
      offset = 8,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const setOpen = (open: boolean) => {
      if (disabled) return;

      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    const handleMouseEnter = () => {
      if (trigger !== "hover" || disabled) return;
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(() => setOpen(true), delay);
      setTimeoutId(id);
    };

    const handleMouseLeave = () => {
      if (trigger !== "hover" || disabled) return;
      if (timeoutId) clearTimeout(timeoutId);
      if (!interactive) {
        setOpen(false);
      }
    };

    const handleClick = () => {
      if (trigger !== "click" || disabled) return;
      setOpen(!isOpen);
    };

    const handleFocus = () => {
      if (trigger !== "focus" || disabled) return;
      setOpen(true);
    };

    const handleBlur = () => {
      if (trigger !== "focus" || disabled) return;
      setOpen(false);
    };

    // Close on outside click for interactive tooltips
    useEffect(() => {
      if (!interactive || !isOpen || trigger !== "click") return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [interactive, isOpen, trigger]);

    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [timeoutId]);

    // Calculate offset based on position
    const getOffsetStyle = () => {
      switch (position) {
        case "top":
          return { marginBottom: `${offset}px` };
        case "bottom":
          return { marginTop: `${offset}px` };
        case "left":
          return { marginRight: `${offset}px` };
        case "right":
          return { marginLeft: `${offset}px` };
      }
    };

    return (
      <div
        ref={wrapperRef}
        className={cn("relative inline-flex group", wrapperClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}

        {/* Tooltip */}
        {!disabled && (
          <div
            ref={ref}
            className={cn(
              tooltipVariants({ variant, size, position, interactive }),
              isOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible",
              className,
              tooltipClassName
            )}
            style={{
              maxWidth,
              ...getOffsetStyle(),
            }}
            role="tooltip"
            aria-hidden={!isOpen}
          >
            {/* Content */}
            <div className="relative z-10">{content}</div>

            {/* Arrow */}
            {arrow && (
              <div className={cn(arrowVariants({ variant, position }))} />
            )}

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;

// Export variants for external use
export { arrowVariants };
