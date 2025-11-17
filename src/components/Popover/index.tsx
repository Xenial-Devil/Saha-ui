"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PopoverProps } from "./Popover.types";
// validation removed
import { arrowVariants, popoverVariants } from "./Popover.styles";

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

    // reference some props that are intentionally unused for now to avoid
    // "assigned a value but never used" diagnostics (these props are kept for
    // API compatibility and may be used in future implementations)
    void disablePortal;

    // Handle controlled vs uncontrolled state
    const open = controlledOpen !== undefined ? controlledOpen : isOpen;

    // development-only validation removed

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
        return undefined;
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
