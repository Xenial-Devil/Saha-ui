"use client";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  TooltipProps,
  TooltipContentProps,
  TooltipTriggerProps,
  TooltipContextValue,
} from "./Tooltip.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import { tooltipVariants, arrowVariants } from "./Tooltip.styles";

export type TooltipVariantsProps = VariantProps<typeof tooltipVariants>;

// Create Tooltip Context
const TooltipContext = createContext<TooltipContextValue | undefined>(
  undefined,
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
    _ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Tooltip");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "dark",
        "light",
        "glass",
        "primary",
        "success",
        "warning",
        "error",
        "info",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate position
      validator.validateEnum("position", position, [
        "top",
        "bottom",
        "left",
        "right",
      ] as const);

      // Validate trigger
      validator.validateEnum("trigger", trigger, [
        "hover",
        "click",
        "focus",
      ] as const);

      // Validate boolean props
      validator.validateType("arrow", arrow, "boolean", isValidBoolean);
      validator.validateType(
        "interactive",
        interactive,
        "boolean",
        isValidBoolean,
      );
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);

      // Validate numeric props
      validator.validateType("delay", delay, "number", isValidNumber);
      validator.validateType("offset", offset, "number", isValidNumber);

      // Validate children
      if (!children) {
        validator.warn("Tooltip should have children (trigger element)");
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [
      variant,
      size,
      position,
      trigger,
      arrow,
      interactive,
      disabled,
      delay,
      offset,
      children,
      className,
    ]);

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (disabled) return;

        if (controlledOpen === undefined) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [disabled, controlledOpen, onOpenChange],
    );

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
    }, [interactive, isOpen, trigger, setOpen]);

    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [timeoutId]);

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
  },
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

  if (disabled) return null;

  return (
    <div
      ref={ref}
      className={cn(
        tooltipVariants({ variant, size, position, interactive }),
        isOpen
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible",
        className,
      )}
      style={{
        maxWidth,
        ...getOffsetStyle(),
      }}
      role="tooltip"
      aria-hidden={!isOpen}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Arrow */}
      {arrow && <div className={cn(arrowVariants({ variant, position }))} />}

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
});

TooltipContent.displayName = "TooltipContent";

export default Tooltip;
