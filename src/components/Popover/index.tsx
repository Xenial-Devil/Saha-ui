"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import usePortalPosition from "../../lib/usePortalPosition";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PopoverProps } from "./Popover.types";
// validation removed
import {
  arrowVariants,
  popoverVariants,
  popoverBaseVariants,
} from "./Popover.styles";

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
        const target = event.target as Node;
        const insideWrapper = wrapperRef.current?.contains(target);
        const insidePopover = popoverRef.current?.contains(target);
        if (!insideWrapper && !insidePopover) {
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

        {/* Popover content (portal) */}
        {mounted && (
          <PortalPopover
            anchorRef={wrapperRef}
            open={open}
            popoverRef={popoverRef}
            popoverClassName={popoverClassName}
            className={className}
            popoverVariantsProps={{ variant, size, position }}
            offset={offset}
            timeoutRef={timeoutRef}
            trigger={trigger}
            delay={delay}
            handleOpenChange={handleOpenChange}
            maxWidth={maxWidth}
            interactive={interactive}
            content={content}
            footer={footer}
            arrow={arrow}
            arrowClassName={arrowClassName}
            showCloseButton={showCloseButton}
            title={title}
            onClose={() => handleOpenChange(false)}
            disablePortal={disablePortal}
            {...props}
          />
        )}
      </div>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;

function PortalPopover({
  anchorRef,
  open,
  popoverRef,
  popoverClassName,
  className,
  popoverVariantsProps,
  offset,
  maxWidth,
  interactive,
  content,
  footer,
  arrow,
  arrowClassName,
  showCloseButton,
  title,
  onClose,
  disablePortal,
  timeoutRef,
  trigger,
  handleOpenChange,
  ...props
}: any) {
  const { portalContainer, portalRef, portalPos } = usePortalPosition(
    anchorRef as React.RefObject<HTMLElement>,
    open,
    { position: popoverVariantsProps.position, offset }
  );

  // compute arrow inline style to precisely align arrow with anchor center
  let arrowStyle: React.CSSProperties | undefined = undefined;
  try {
    const anchorEl = anchorRef?.current as HTMLElement | null;
    const popEl = portalRef?.current as HTMLElement | null;
    if (anchorEl && popEl) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popRect = popEl.getBoundingClientRect();
      const anchorCenterX =
        anchorRect.left + anchorRect.width / 2 + window.scrollX;
      const anchorCenterY =
        anchorRect.top + anchorRect.height / 2 + window.scrollY;

      const posName = (popoverVariantsProps.position || "bottom").split("-")[0];

      if (posName === "top" || posName === "bottom") {
        const leftPx = anchorCenterX - portalPos.left; // position relative to popover
        arrowStyle = {
          left: `${Math.max(8, Math.min(popRect.width - 8, leftPx))}px`,
        };
      } else if (posName === "left" || posName === "right") {
        const topPx = anchorCenterY - portalPos.top;
        arrowStyle = {
          top: `${Math.max(8, Math.min(popRect.height - 8, topPx))}px`,
        };
      }
    }
  } catch {
    // ignore
  }

  const popoverNode = (
    <div
      ref={(node) => {
        // assign both refs
        if (typeof popoverRef === "function") popoverRef(node);
        else if (popoverRef) popoverRef.current = node;
        portalRef.current = node;
      }}
      onMouseEnter={() => {
        if (trigger === "hover") {
          if (timeoutRef?.current) clearTimeout(timeoutRef.current);
          handleOpenChange?.(true);
        }
      }}
      onMouseLeave={() => {
        if (trigger === "hover") {
          if (timeoutRef?.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => handleOpenChange?.(false), 100);
        }
      }}
      className={cn(
        popoverBaseVariants(popoverVariantsProps),
        open ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "origin-center",
        popoverClassName,
        className
      )}
      style={{
        position: "absolute",
        top: portalPos.top,
        left: portalPos.left,
        maxWidth,
        pointerEvents: interactive ? "auto" : "none",
      }}
      role="dialog"
      aria-modal="false"
      {...props}
    >
      {(title || showCloseButton) && (
        <div className="flex items-start justify-between mb-2 pb-2 border-b border-border/50">
          {title && (
            <div className="font-semibold text-base text-foreground">
              {title}
            </div>
          )}
          {showCloseButton && (
            <button
              onClick={() => onClose?.()}
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

      <div className="text-foreground/90">{content}</div>

      {footer && (
        <div className="mt-3 pt-3 border-t border-border/50">{footer}</div>
      )}

      {arrow && (
        <div
          className={cn(
            arrowVariants({
              variant: popoverVariantsProps.variant,
              position: popoverVariantsProps.position,
            }),
            arrowClassName
          )}
          style={arrowStyle}
        />
      )}
    </div>
  );

  if (disablePortal || !portalContainer) return popoverNode;
  return createPortal(popoverNode, portalContainer);
}
