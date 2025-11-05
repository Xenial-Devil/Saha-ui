"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardCompactProps,
  HoverCardContextValue,
} from "./HoverCard.types";
import {
  hoverCardContentVariants,
  hoverCardArrowVariants,
  hoverCardTriggerVariants,
} from "./HoverCard.styles";

/**
 * Context for HoverCard state
 */
const HoverCardContext = createContext<HoverCardContextValue | undefined>(
  undefined
);

/**
 * Hook to use HoverCard context
 */
const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error(
      "HoverCard components must be used within a HoverCard component"
    );
  }
  return context;
};

/**
 * Main HoverCard component
 * Provides context for trigger and content components
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  variant = "default",
  size = "md",
  position = "bottom",
  openDelay = 200,
  closeDelay = 300,
  animation: _animation = "fade",
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const contextValue: HoverCardContextValue = {
    open,
    setOpen,
    variant,
    size,
    position,
    openDelay,
    closeDelay,
  };

  return (
    <HoverCardContext.Provider value={contextValue}>
      <div className={`relative inline-block ${className || ""}`}>
        {children}
      </div>
    </HoverCardContext.Provider>
  );
};

/**
 * HoverCardTrigger component
 * Element that triggers the hover card on hover
 */
export const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({
  asChild = false,
  children,
  className,
}) => {
  const { setOpen, openDelay, closeDelay } = useHoverCardContext();
  const openTimeoutRef = useRef<number | undefined>(undefined);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = window.setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [setOpen, openDelay]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [setOpen, closeDelay]);

  useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any;
    return React.cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: `${childProps.className || ""} ${className || ""}`.trim(),
    } as any);
  }

  return (
    <div
      className={hoverCardTriggerVariants({ className })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

/**
 * HoverCardContent component
 * The content displayed when hovering over the trigger
 */
export const HoverCardContent: React.FC<HoverCardContentProps> = ({
  children,
  className,
  showArrow = true,
  width,
  avoidCollisions = true,
  collisionPadding = 8,
  align = "center",
  sideOffset = 8,
}) => {
  const { open, setOpen, variant, size, position, closeDelay } =
    useHoverCardContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [setOpen, closeDelay]);

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open || !contentRef.current || !avoidCollisions) return;

    const content = contentRef.current;
    const rect = content.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Adjust position to avoid viewport edges
    let adjustedLeft = rect.left;
    let adjustedTop = rect.top;

    if (rect.right > viewport.width - collisionPadding) {
      adjustedLeft = viewport.width - rect.width - collisionPadding;
    }
    if (rect.left < collisionPadding) {
      adjustedLeft = collisionPadding;
    }
    if (rect.bottom > viewport.height - collisionPadding) {
      adjustedTop = viewport.height - rect.height - collisionPadding;
    }
    if (rect.top < collisionPadding) {
      adjustedTop = collisionPadding;
    }

    if (adjustedLeft !== rect.left || adjustedTop !== rect.top) {
      content.style.left = `${adjustedLeft}px`;
      content.style.top = `${adjustedTop}px`;
    }
  }, [open, avoidCollisions, collisionPadding]);

  if (!open) return null;

  // Calculate position classes
  const positionClasses = getPositionClasses(
    position || "bottom",
    align,
    sideOffset
  );

  return (
    <div
      ref={contentRef}
      className={hoverCardContentVariants({
        variant,
        size,
        animation: "fade",
        className: `${positionClasses} ${className || ""}`,
      })}
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}px`
            : width
          : undefined,
      }}
      data-state={open ? "open" : "closed"}
      data-side={position?.split("-")[0] || "bottom"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showArrow && (
        <div className={`absolute ${getArrowClasses(position || "bottom")}`}>
          <svg
            width={
              position?.startsWith("left") || position?.startsWith("right")
                ? "32"
                : "20"
            }
            height={
              position?.startsWith("left") || position?.startsWith("right")
                ? "16"
                : "10"
            }
            viewBox="0 0 20 10"
            className={hoverCardArrowVariants({ variant })}
          >
            <path d="M0 10 L10 0 L20 10" />
          </svg>
        </div>
      )}
    </div>
  );
};

/**
 * HoverCardCompact component
 * Simplified API for quick hover card creation
 */
export const HoverCardCompact: React.FC<HoverCardCompactProps> = ({
  trigger,
  content,
  variant = "default",
  size = "md",
  position = "bottom",
  animation = "fade",
  openDelay = 200,
  closeDelay = 300,
  showArrow = true,
  width,
  className,
  triggerClassName,
  asChild = false,
  onOpenChange,
}) => {
  return (
    <HoverCard
      variant={variant}
      size={size}
      position={position}
      openDelay={openDelay}
      closeDelay={closeDelay}
      animation={animation}
      onOpenChange={onOpenChange}
    >
      <HoverCardTrigger asChild={asChild} className={triggerClassName}>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        showArrow={showArrow}
        width={width}
        className={className}
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Helper function to get position classes
 */
function getPositionClasses(
  position: string,
  _align: "start" | "center" | "end",
  _sideOffset: number
): string {
  const baseClasses = "absolute";

  const positionMap: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    "top-start": "bottom-full left-0 mb-2",
    "top-end": "bottom-full right-0 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    "bottom-start": "top-full left-0 mt-2",
    "bottom-end": "top-full right-0 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    "left-start": "right-full top-0 mr-2",
    "left-end": "right-full bottom-0 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    "right-start": "left-full top-0 ml-2",
    "right-end": "left-full bottom-0 ml-2",
  };

  return `${baseClasses} ${positionMap[position] || positionMap.bottom}`;
}

/**
 * Helper function to get arrow position classes
 */
function getArrowClasses(position: string): string {
  const arrowMap: Record<string, string> = {
    top: "bottom-[-10px] left-1/2 -translate-x-1/2 rotate-180",
    "top-start": "bottom-[-10px] left-4 rotate-180",
    "top-end": "bottom-[-10px] right-4 rotate-180",
    bottom: "top-[-10px] left-1/2 -translate-x-1/2",
    "bottom-start": "top-[-10px] left-4",
    "bottom-end": "top-[-10px] right-4",
    left: "right-[-16px] top-1/2 -translate-y-1/2 rotate-90",
    "left-start": "right-[-16px] top-4 rotate-90",
    "left-end": "right-[-16px] bottom-4 rotate-90",
    right: "left-[-16px] top-1/2 -translate-y-1/2 -rotate-90",
    "right-start": "left-[-16px] top-4 -rotate-90",
    "right-end": "left-[-16px] bottom-4 -rotate-90",
  };

  return arrowMap[position] || arrowMap.bottom;
}

HoverCard.displayName = "HoverCard";
HoverCardTrigger.displayName = "HoverCardTrigger";
HoverCardContent.displayName = "HoverCardContent";
HoverCardCompact.displayName = "HoverCardCompact";

export default HoverCard;
