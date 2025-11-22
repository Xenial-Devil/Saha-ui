"use client";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import usePortalPosition from "../../lib/usePortalPosition";
import { createPortal } from "react-dom";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  TooltipProps,
  TooltipContentProps,
  TooltipTriggerProps,
  TooltipContextValue,
} from "./Tooltip.types";
// validation removed
import {
  tooltipVariants,
  tooltipBaseVariants,
  arrowVariants,
} from "./Tooltip.styles";

export type TooltipVariantsProps = VariantProps<typeof tooltipVariants>;

// Create Tooltip Context
const TooltipContext = createContext<TooltipContextValue | undefined>(
  undefined
);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip");
  }
  return context;
};

/**
 * Tooltip Component
 *
 * A composable tooltip component for displaying contextual information,
 * hints, and descriptions with multiple visual styles and positioning options.
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>This is a tooltip</TooltipContent>
 * </Tooltip>
 *
 * // Variant with position
 * <Tooltip variant="success" position="right">
 *   <TooltipTrigger>
 *     <span>✓</span>
 *   </TooltipTrigger>
 *   <TooltipContent>Success message</TooltipContent>
 * </Tooltip>
 *
 * // Interactive tooltip
 * <Tooltip interactive trigger="click">
 *   <TooltipTrigger>
 *     <Button>Click for info</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <div>Click <a href="#">here</a></div>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      position = "top",
      variant = "default",
      size = "md",
      delay = 200,
      arrow = true,
      trigger = "hover",
      open: controlledOpen,
      onOpenChange,
      className,
      maxWidth = "320px",
      interactive = false,
      offset = 8,
      disabled = false,
      ...props
    },
    _ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // development-only validation removed

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (disabled) return;

        if (controlledOpen === undefined) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [disabled, controlledOpen, onOpenChange]
    );

    const handleMouseEnter = () => {
      if (trigger !== "hover" || disabled) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setOpen(true), delay);
    };

    const handleMouseLeave = () => {
      if (trigger !== "hover" || disabled) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
        const target = event.target as Node;
        const insideWrapper = wrapperRef.current?.contains(target);
        // if content is portaled, we won't have its ref here; TooltipContent will guard closing
        if (!insideWrapper) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [interactive, isOpen, trigger, setOpen]);

    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const contextValue: TooltipContextValue = {
      isOpen,
      setOpen,
      position,
      variant,
      size,
      arrow,
      interactive,
      maxWidth,
      offset,
      trigger,
      delay,
      disabled,
      anchorRef: wrapperRef,
      timeoutRef,
    };

    return (
      <TooltipContext.Provider value={contextValue}>
        <div
          ref={wrapperRef}
          className={cn("relative inline-flex group", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {children}
        </div>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

/**
 * TooltipTrigger Component
 *
 * The element that triggers the tooltip display
 */
export const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  TooltipTriggerProps
>(({ children, className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "div";
  const childProps = asChild ? {} : { ref, className, ...props };

  return <Comp {...childProps}>{children}</Comp>;
});

TooltipTrigger.displayName = "TooltipTrigger";

/**
 * TooltipContent Component
 *
 * The content displayed in the tooltip
 */
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ children, className, ...props }, ref) => {
  const {
    isOpen,
    position,
    variant,
    size,
    arrow,
    interactive,
    maxWidth,
    offset,
    disabled,
  } = useTooltip();
  const { anchorRef, timeoutRef, trigger, setOpen } = useTooltip() as any;

  // do not early-return here because hooks must be called in same order

  const { portalContainer, portalRef, portalPos } = usePortalPosition(
    anchorRef as React.RefObject<HTMLElement>,
    isOpen,
    { position, offset }
  );

  const [positionReady, setPositionReady] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setPositionReady(false);
      return;
    }
    // enable transitions after the portal position has a chance to settle
    const t = setTimeout(() => setPositionReady(true), 20);
    return () => clearTimeout(t);
  }, [isOpen, portalPos.left, portalPos.top]);

  // Close on outside click when interactive and using click trigger
  useEffect(() => {
    if (!interactive || !isOpen || trigger !== "click") return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideWrapper = (
        anchorRef as React.RefObject<HTMLElement>
      )?.current?.contains(target);
      const insidePortal = portalRef?.current?.contains(target);
      if (!insideWrapper && !insidePortal) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [interactive, isOpen, trigger, setOpen, anchorRef, portalRef]);

  // compute arrow inline style similar to Popover
  let arrowStyle: React.CSSProperties | undefined = undefined;
  try {
    const anchorEl = (anchorRef as React.RefObject<HTMLElement>)
      ?.current as HTMLElement | null;
    const popEl = portalRef?.current as HTMLElement | null;
    if (anchorEl && popEl) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popRect = popEl.getBoundingClientRect();
      const anchorCenterX =
        anchorRect.left + anchorRect.width / 2 + window.scrollX;
      const anchorCenterY =
        anchorRect.top + anchorRect.height / 2 + window.scrollY;
      const posName = (position || "top").split("-")[0];
      if (posName === "top" || posName === "bottom") {
        const leftPx = anchorCenterX - portalPos.left;
        arrowStyle = {
          left: `${Math.max(6, Math.min(popRect.width - 6, leftPx))}px`,
        };
      } else {
        const topPx = anchorCenterY - portalPos.top;
        arrowStyle = {
          top: `${Math.max(6, Math.min(popRect.height - 6, topPx))}px`,
        };
      }
    }
  } catch {
    // ignore
  }

  if (disabled) return null;

  const contentNode = (
    <div
      ref={(node) => {
        if (typeof ref === "function") ref(node as any);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            node as HTMLDivElement | null;
        portalRef.current = node as HTMLDivElement | null;
      }}
      onMouseEnter={() => {
        if (trigger === "hover") {
          if (timeoutRef?.current) clearTimeout(timeoutRef.current);
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (trigger === "hover") {
          if (timeoutRef?.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setOpen(false);
          }, 100);
        }
      }}
      className={cn(
        tooltipBaseVariants({ variant, size, interactive }),
        isOpen
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible",
        positionReady ? undefined : "transition-none",
        className
      )}
      style={{
        maxWidth,
        position: "absolute",
        top: portalPos.top,
        left: portalPos.left,
      }}
      role="tooltip"
      aria-hidden={!isOpen}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {arrow && (
        <div
          className={cn(arrowVariants({ variant, position }))}
          style={arrowStyle}
        />
      )}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );

  if (!portalContainer) return contentNode;
  return createPortal(contentNode, portalContainer);
});

TooltipContent.displayName = "TooltipContent";

export default Tooltip;
