import React, { useState, useEffect, useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PopoverProps } from "./Popover.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

/**
 * Flat Popover Component
 *
 * A versatile popover component for displaying rich content, menus, and interactive elements.
 * Features multiple positioning options, variants, and trigger types.
 *
 * @variant default - Standard card-style popover
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant danger - Danger color theme
 * @variant info - Info color theme
 * @variant glass - Glassmorphism effect
 * @variant bordered - Emphasized border
 * @variant elevated - Flat with subtle shadow
 * @variant flat - Minimal flat design
 *
 * @position top | bottom | left | right (with -start and -end variations)
 * @size sm | md | lg | xl - Size variations
 */

/**
 * Popover content variants
 */
export const popoverVariants = cva(
  [
    "absolute z-50 rounded-lg",
    "transition-all duration-200 ease-out",
    "pointer-events-auto",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground",
          "border border-border/50",
          "shadow-lg",
        ],
        primary: [
          "bg-primary text-primary-foreground",
          "border border-primary/80",
          "shadow-lg shadow-primary/20",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-secondary/80",
          "shadow-lg shadow-secondary/20",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "border border-accent/80",
          "shadow-lg shadow-accent/20",
        ],
        success: [
          "bg-success text-success-foreground",
          "border border-success/80",
          "shadow-lg shadow-success/20",
        ],
        warning: [
          "bg-warning text-warning-foreground",
          "border border-warning/80",
          "shadow-lg shadow-warning/20",
        ],
        danger: [
          "bg-destructive text-destructive-foreground",
          "border border-destructive/80",
          "shadow-lg shadow-destructive/20",
        ],
        info: [
          "bg-info text-info-foreground",
          "border border-info/80",
          "shadow-lg shadow-info/20",
        ],
        glass: [
          "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
          "border border-white/40 dark:border-white/20",
          "shadow-xl",
        ],
        bordered: [
          "bg-card text-foreground",
          "border-2 border-border",
          "shadow-md",
        ],
        elevated: [
          "bg-card text-foreground",
          "border border-border/30",
          "shadow-2xl",
        ],
        flat: ["bg-card text-foreground", "border border-border/50"],
      },
      size: {
        sm: "text-sm p-2 min-w-[120px] max-w-[200px]",
        md: "text-sm p-3 min-w-[200px] max-w-[320px]",
        lg: "text-base p-4 min-w-[280px] max-w-[400px]",
        xl: "text-base p-5 min-w-[360px] max-w-[500px]",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2",
        "top-start": "bottom-full left-0",
        "top-end": "bottom-full right-0",
        bottom: "top-full left-1/2 -translate-x-1/2",
        "bottom-start": "top-full left-0",
        "bottom-end": "top-full right-0",
        left: "right-full top-1/2 -translate-y-1/2",
        "left-start": "right-full top-0",
        "left-end": "right-full bottom-0",
        right: "left-full top-1/2 -translate-y-1/2",
        "right-start": "left-full top-0",
        "right-end": "left-full bottom-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "bottom",
    },
  }
);

/**
 * Arrow variants for popover
 */
const arrowVariants = cva("absolute w-3 h-3 rotate-45", {
  variants: {
    variant: {
      default: "bg-card border-l border-t border-border/50",
      primary: "bg-primary border-l border-t border-primary/80",
      secondary: "bg-secondary border-l border-t border-secondary/80",
      accent: "bg-accent border-l border-t border-accent/80",
      success: "bg-success border-l border-t border-success/80",
      warning: "bg-warning border-l border-t border-warning/80",
      danger: "bg-destructive border-l border-t border-destructive/80",
      info: "bg-info border-l border-t border-info/80",
      glass:
        "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-l border-t border-white/40 dark:border-white/20",
      bordered: "bg-card border-l border-t border-border border-2",
      elevated: "bg-card border-l border-t border-border/30",
      flat: "bg-card border-l border-t border-border/50",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      "top-start": "top-full left-4 -translate-y-1/2",
      "top-end": "top-full right-4 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      "bottom-start": "bottom-full left-4 translate-y-1/2",
      "bottom-end": "bottom-full right-4 translate-y-1/2",
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      "left-start": "left-full top-4 -translate-x-1/2",
      "left-end": "left-full bottom-4 -translate-x-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
      "right-start": "right-full top-4 translate-x-1/2",
      "right-end": "right-full bottom-4 translate-x-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "bottom",
  },
});

export type PopoverVariantsProps = VariantProps<typeof popoverVariants>;

/**
 * Popover Component
 *
 * A versatile popover for displaying rich interactive content.
 *
 * @example
 * ```tsx
 * // Basic popover
 * <Popover content="Popover content">
 *   <Button>Click me</Button>
 * </Popover>
 *
 * // With title and position
 * <Popover
 *   title="Settings"
 *   content={<div>Your settings here</div>}
 *   position="right"
 * >
 *   <Button>Settings</Button>
 * </Popover>
 *
 * // Glass variant with footer
 * <Popover
 *   variant="glass"
 *   title="Confirm"
 *   content="Are you sure?"
 *   footer={<Button>Confirm</Button>}
 * >
 *   <Button>Delete</Button>
 * </Popover>
 * ```
 */
const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      children,
      position = "bottom",
      variant = "default",
      size = "md",
      arrow = true,
      trigger = "click",
      open: controlledOpen,
      onOpenChange,
      popoverClassName,
      wrapperClassName,
      arrowClassName,
      className,
      maxWidth = "320px",
      offset = 12,
      closeOnClickOutside = true,
      closeOnEscape = true,
      showCloseButton = false,
      title,
      footer,
      interactive = true,
      delay = 0,
      disablePortal = false,
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(controlledOpen ?? false);
    const [mounted, setMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Handle controlled vs uncontrolled state
    const open = controlledOpen !== undefined ? controlledOpen : isOpen;

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Popover");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "danger",
        "info",
        "glass",
        "bordered",
        "elevated",
        "flat",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate position
      validator.validateEnum("position", position, [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ] as const);

      // Validate trigger
      validator.validateEnum("trigger", trigger, [
        "click",
        "hover",
        "focus",
        "manual",
      ] as const);

      // Validate boolean props
      validator.validateType("arrow", arrow, "boolean", isValidBoolean);
      validator.validateType(
        "closeOnClickOutside",
        closeOnClickOutside,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "closeOnEscape",
        closeOnEscape,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "showCloseButton",
        showCloseButton,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "interactive",
        interactive,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "disablePortal",
        disablePortal,
        "boolean",
        isValidBoolean
      );

      // Validate numeric props
      validator.validateType("offset", offset, "number", isValidNumber);
      validator.validateType("delay", delay, "number", isValidNumber);

      // Validate content
      if (!content && !children) {
        validator.warn("Popover should have content or children");
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.className(validator, popoverClassName);
    }, [
      variant,
      size,
      position,
      trigger,
      arrow,
      closeOnClickOutside,
      closeOnEscape,
      showCloseButton,
      interactive,
      disablePortal,
      offset,
      delay,
      content,
      children,
      className,
      popoverClassName,
    ]);

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [controlledOpen, onOpenChange]
    );

    // Handle trigger events
    const handleTrigger = useCallback(() => {
      if (trigger === "click") {
        handleOpenChange(!open);
      } else if (trigger === "hover") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          handleOpenChange(true);
        }, delay);
      } else if (trigger === "focus") {
        handleOpenChange(true);
      }
    }, [trigger, open, handleOpenChange, delay]);

    const handleMouseLeave = useCallback(() => {
      if (trigger === "hover") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          handleOpenChange(false);
        }, 100);
      }
    }, [trigger, handleOpenChange]);

    const handleBlur = useCallback(() => {
      if (trigger === "focus") {
        handleOpenChange(false);
      }
    }, [trigger, handleOpenChange]);

    // Handle click outside
    useEffect(() => {
      if (!open || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [open, closeOnClickOutside, handleOpenChange]);

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleOpenChange(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, handleOpenChange]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    // Mount animation
    useEffect(() => {
      if (open) {
        setMounted(true);
      } else {
        const timer = setTimeout(() => setMounted(false), 200);
        return () => clearTimeout(timer);
      }
    }, [open]);

    // Calculate offset style
    const getOffsetStyle = () => {
      const offsetMap: Record<string, string> = {
        top: `${offset}px`,
        "top-start": `${offset}px`,
        "top-end": `${offset}px`,
        bottom: `${offset}px`,
        "bottom-start": `${offset}px`,
        "bottom-end": `${offset}px`,
        left: `${offset}px`,
        "left-start": `${offset}px`,
        "left-end": `${offset}px`,
        right: `${offset}px`,
        "right-start": `${offset}px`,
        "right-end": `${offset}px`,
      };

      if (position.startsWith("top")) {
        return { marginBottom: offsetMap[position] };
      } else if (position.startsWith("bottom")) {
        return { marginTop: offsetMap[position] };
      } else if (position.startsWith("left")) {
        return { marginRight: offsetMap[position] };
      } else {
        return { marginLeft: offsetMap[position] };
      }
    };

    const triggerProps =
      trigger === "click"
        ? { onClick: handleTrigger }
        : trigger === "hover"
        ? { onMouseEnter: handleTrigger, onMouseLeave: handleMouseLeave }
        : trigger === "focus"
        ? { onFocus: handleTrigger, onBlur: handleBlur }
        : {};

    return (
      <div
        ref={wrapperRef}
        className={cn("relative inline-block", wrapperClassName)}
      >
        {/* Trigger element */}
        <div {...triggerProps}>{children}</div>

        {/* Popover content */}
        {mounted && (
          <div
            ref={popoverRef}
            className={cn(
              popoverVariants({ variant, size, position }),
              open ? "opacity-100 scale-100" : "opacity-0 scale-95",
              "origin-center",
              popoverClassName,
              className
            )}
            style={{
              ...getOffsetStyle(),
              maxWidth,
              pointerEvents: interactive ? "auto" : "none",
            }}
            role="dialog"
            aria-modal="false"
            {...props}
          >
            {/* Header with optional close button */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between mb-2 pb-2 border-b border-border/50">
                {title && (
                  <div className="font-semibold text-base text-foreground">
                    {title}
                  </div>
                )}
                {showCloseButton && (
                  <button
                    onClick={() => handleOpenChange(false)}
                    className="ml-auto p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    aria-label="Close popover"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="text-foreground/90">{content}</div>

            {/* Footer */}
            {footer && (
              <div className="mt-3 pt-3 border-t border-border/50">
                {footer}
              </div>
            )}

            {/* Arrow */}
            {arrow && (
              <div
                className={cn(
                  arrowVariants({ variant, position }),
                  arrowClassName
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;
export { arrowVariants };
