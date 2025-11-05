"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { ComponentValidator, isValidBoolean } from "../../lib/validation";
import type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleCompactProps,
  CollapsibleContextValue,
  CollapsibleVariant,
  CollapsibleAnimation,
} from "./Collapsible.types";
import {
  collapsibleVariants,
  collapsibleTriggerVariants,
  collapsibleContentVariants,
  collapsibleIconVariants,
} from "./Collapsible.styles";

// ===========================
// Validation Constants
// ===========================

const VALID_VARIANTS: CollapsibleVariant[] = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "outline",
  "glass",
];

const VALID_ANIMATIONS: CollapsibleAnimation[] = [
  "smooth",
  "spring",
  "bounce",
  "none",
];

// ===========================
// Context
// ===========================

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(
  undefined
);

const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "Collapsible compound components must be used within a Collapsible component"
    );
  }
  return context;
};

// ===========================
// Collapsible Component
// ===========================

/**
 * Collapsible - A component that can expand and collapse content
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - 10 visual variants (including glass)
 * - Multiple animation styles
 * - Keyboard accessible
 * - Customizable trigger and content
 * - Compile-time and runtime validation
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Collapsible>
 *   <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content here</CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen} variant="primary">
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 *
 * // With custom trigger
 * <Collapsible variant="glass">
 *   <CollapsibleTrigger asChild>
 *     <Button>Custom Trigger</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      variant = "default",
      animation = "smooth",
      disabled = false,
      className,
      onAnimationStart,
      onAnimationEnd,
      preserveContent = false,
      animationDelay = 0,
      animationDuration = 500,
      ...props
    },
    ref
  ) => {
    // Runtime validation
    const validator = new ComponentValidator("Collapsible");

    React.useEffect(() => {
      validator.validateEnum("variant", variant, VALID_VARIANTS);
      validator.validateEnum("animation", animation, VALID_ANIMATIONS);
      if (controlledOpen !== undefined) {
        validator.validateType(
          "open",
          controlledOpen,
          "boolean",
          isValidBoolean
        );
      }
      if (defaultOpen !== undefined) {
        validator.validateType(
          "defaultOpen",
          defaultOpen,
          "boolean",
          isValidBoolean
        );
      }
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      if (animationDuration !== undefined) {
        validator.validateType(
          "animationDuration",
          animationDuration,
          "number",
          (val: any) => typeof val === "number" && val >= 0
        );
      }
    }, [
      variant,
      animation,
      controlledOpen,
      defaultOpen,
      disabled,
      animationDuration,
    ]);

    // State management
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (disabled) return;

        if (!isControlled) {
          setInternalOpen(newOpen);
        }

        onOpenChange?.(newOpen);
      },
      [disabled, isControlled, onOpenChange]
    );

    const contextValue: CollapsibleContextValue = {
      open,
      setOpen: handleOpenChange,
      disabled,
      variant,
      animation,
      animationDuration,
    };

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(collapsibleVariants({ variant, disabled }), className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

// ===========================
// CollapsibleTrigger Component
// ===========================

/**
 * CollapsibleTrigger - Clickable element that toggles the collapsible
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger>Click me</CollapsibleTrigger>
 *
 * // With custom element
 * <CollapsibleTrigger asChild>
 *   <Button variant="outline">Toggle</Button>
 * </CollapsibleTrigger>
 *
 * // Without icon
 * <CollapsibleTrigger showIcon={false}>
 *   Custom trigger
 * </CollapsibleTrigger>
 * ```
 */
const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(
  (
    {
      asChild = false,
      children,
      className,
      showIcon = true,
      icon,
      iconPosition = "right",
      onClick,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, disabled, variant } = useCollapsibleContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setOpen(!open);
      onClick?.(e);
    };

    // Use ChevronsUpDown icon - shows both arrows, no rotation needed
    const iconElement = icon || <ChevronsUpDown className="h-4 w-4" />;
    const iconWithStyles = (
      <span className={cn(collapsibleIconVariants({ open, variant }))}>
        {iconElement}
      </span>
    );

    // If asChild, merge props into child
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ...child.props,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        disabled: disabled || child.props.disabled,
        "aria-expanded": open,
        "aria-controls": "collapsible-content",
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-expanded={open}
        aria-controls="collapsible-content"
        className={cn(collapsibleTriggerVariants({ variant, open }), className)}
        {...props}
      >
        {showIcon && iconPosition === "left" && iconWithStyles}
        <span className="flex-1">{children}</span>
        {showIcon && iconPosition === "right" && iconWithStyles}
      </button>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ===========================
// CollapsibleContent Component
// ===========================

/**
 * CollapsibleContent - Content that expands/collapses
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <div className="p-4">
 *     Your content here
 *   </div>
 * </CollapsibleContent>
 *
 * // Force mount (keep in DOM)
 * <CollapsibleContent forceMount>
 *   Content that stays in DOM
 * </CollapsibleContent>
 * ```
 */
const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, className, forceMount = false, ...props }, ref) => {
  const { open, variant, animation, animationDuration } =
    useCollapsibleContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(open ? "auto" : 0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    if (open) {
      setIsAnimating(true);
      // Get the height before animation
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // Set to auto after animation completes
      const timer = setTimeout(() => {
        setHeight("auto");
        setIsAnimating(false);
      }, animationDuration);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);

      // First, ensure we have an explicit height
      if (height === "auto") {
        const currentHeight = contentRef.current.scrollHeight;
        setHeight(currentHeight);
      }

      // Then animate to 0 after the browser has rendered with explicit height
      const timer = setTimeout(() => {
        setHeight(0);
      }, 10); // Small delay to ensure the browser has painted

      const animTimer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration + 10);

      return () => {
        clearTimeout(timer);
        clearTimeout(animTimer);
      };
    }
  }, [open, animationDuration, height]);

  // Render with height 0 when closed instead of not rendering at all
  // This allows smooth animation on first open
  const shouldRender = open || forceMount || isAnimating;

  // Get transition timing function based on animation type
  const getTimingFunction = () => {
    switch (animation) {
      case "smooth":
        return "ease-in-out";
      case "spring":
        return "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      case "bounce":
        return "cubic-bezier(0.68, -0.6, 0.32, 1.6)";
      case "none":
        return "linear";
      default:
        return "ease-in-out";
    }
  };

  return (
    <div
      ref={ref}
      id="collapsible-content"
      data-state={open ? "open" : "closed"}
      style={{
        height: shouldRender ? height : 0,
        overflow: "hidden",
        transition:
          animation === "none"
            ? "none"
            : `height ${animationDuration}ms ${getTimingFunction()}`,
      }}
      className={cn(
        collapsibleContentVariants({ variant, animation }),
        !shouldRender && "hidden",
        className
      )}
      {...props}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

// ===========================
// Compact API Component
// ===========================

/**
 * Collapsible.Compact - Single component with all props (no composition)
 *
 * @example
 * ```tsx
 * <Collapsible.Compact
 *   title="Click to expand"
 *   content="Hidden content"
 *   variant="primary"
 *   defaultOpen
 * />
 *
 * <Collapsible.Compact
 *   title={<h3>Custom Title</h3>}
 *   content={<div className="p-4">Complex content</div>}
 *   showIcon={false}
 *   variant="glass"
 * />
 * ```
 */
const CollapsibleCompact = React.forwardRef<
  HTMLDivElement,
  CollapsibleCompactProps
>(
  (
    {
      title,
      content,
      open,
      defaultOpen,
      onOpenChange,
      variant = "default",
      animation = "smooth",
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      showIcon = true,
      iconPosition = "right",
      icon,
      animationDuration = 500,
      ...props
    },
    ref
  ) => {
    return (
      <Collapsible
        ref={ref}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        variant={variant}
        animation={animation}
        disabled={disabled}
        className={className}
        animationDuration={animationDuration}
        {...props}
      >
        <CollapsibleTrigger
          className={triggerClassName}
          showIcon={showIcon}
          icon={icon}
          iconPosition={iconPosition}
        >
          {title}
        </CollapsibleTrigger>
        <CollapsibleContent className={contentClassName}>
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

CollapsibleCompact.displayName = "Collapsible.Compact";

// ===========================
// Exports
// ===========================

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleCompact,
  CollapsibleContext,
  useCollapsibleContext,
};
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleCompactProps,
  CollapsibleVariant,
  CollapsibleAnimation,
};
