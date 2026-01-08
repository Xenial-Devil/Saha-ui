"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import { Slot } from "../../lib/Slot";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionVariant,
  AccordionSize,
  AccordionOrientation,
  HeadingLevel,
} from "./Accordion.types";
import {
  accordionContentVariants,
  accordionContentInnerVariants,
  accordionHeaderVariants,
  accordionItemVariants,
  accordionVariants,
  accordionIconVariants,
} from "./Accordion.styles";
import { useAccordion } from "../../hooks/useAccordion";
import { useAnimatedHeight } from "../../hooks/useAnimatedHeight";
import { useLazyMount } from "../../hooks/useLazyMount";
import { useMergedRef } from "../../hooks/useMergedRef";

// ============================================================================
// Context Types
// ============================================================================

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  variant: AccordionVariant;
  size: AccordionSize;
  type: "single" | "multiple";
  collapsible: boolean;
  orientation: AccordionOrientation;
  disabled: boolean;
  lazyMount: boolean;
  unmountOnClose: boolean;
  animationDuration: number;
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void;
  handleKeyDown: (e: React.KeyboardEvent, currentValue: string) => void;
  generateTriggerId: (value: string) => string;
  generateContentId: (value: string) => string;
  onOpenEnd?: (value: string) => void;
  onCloseEnd?: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined
);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within an Accordion component"
    );
  }
  return context;
};

// ============================================================================
// Item Context
// ============================================================================

interface AccordionItemContextValue {
  isOpen: boolean;
  disabled: boolean;
  value: string;
  triggerId: string;
  contentId: string;
  headingLevel: HeadingLevel;
  onOpenChange?: (isOpen: boolean) => void;
}

const AccordionItemContext = createContext<
  AccordionItemContextValue | undefined
>(undefined);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within an AccordionItem component"
    );
  }
  return context;
};

// ============================================================================
// Accordion Root Component
// ============================================================================

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "md",
      className,
      collapsible = false,
      orientation = "vertical",
      loop = false,
      disabled = false,
      lazyMount = false,
      unmountOnClose = false,
      animationDuration = 300,
      onOpenStart,
      onOpenEnd,
      onCloseStart,
      onCloseEnd,
      children,
    },
    ref
  ) => {
    const {
      value,
      handleValueChange,
      type: accordionType,
      collapsible: isCollapsible,
      orientation: accordionOrientation,
      disabled: isDisabled,
      registerTrigger,
      handleKeyDown,
      generateTriggerId,
      generateContentId,
    } = useAccordion({
      type,
      value: controlledValue,
      defaultValue,
      onValueChange,
      collapsible,
      orientation,
      loop,
      disabled,
      onOpenStart,
      onOpenEnd,
      onCloseStart,
      onCloseEnd,
    });

    return (
      <AccordionContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          variant,
          size,
          type: accordionType,
          collapsible: isCollapsible,
          orientation: accordionOrientation,
          disabled: isDisabled,
          lazyMount,
          unmountOnClose,
          animationDuration,
          registerTrigger,
          handleKeyDown,
          generateTriggerId,
          generateContentId,
          onOpenEnd,
          onCloseEnd,
        }}
      >
        <div
          ref={ref}
          className={cn(
            accordionVariants({ variant, size, orientation }),
            className
          )}
          data-orientation={orientation}
          data-disabled={disabled || undefined}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

// ============================================================================
// Accordion Item Component
// ============================================================================

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(
  (
    {
      value,
      className,
      disabled = false,
      headingLevel = 3,
      onOpenChange,
      children,
    },
    ref
  ) => {
    const {
      value: openValue,
      type,
      orientation,
      disabled: accordionDisabled,
      generateTriggerId,
      generateContentId,
    } = useAccordionContext();

    const isOpen =
      type === "multiple"
        ? Array.isArray(openValue) && openValue.includes(value)
        : openValue === value;

    const isDisabled = disabled || accordionDisabled;

    const triggerId = generateTriggerId(value);
    const contentId = generateContentId(value);

    const prevIsOpenRef = useRef(isOpen);

    useEffect(() => {
      if (prevIsOpenRef.current !== isOpen) {
        onOpenChange?.(isOpen);
        prevIsOpenRef.current = isOpen;
      }
    }, [isOpen, onOpenChange]);

    return (
      <AccordionItemContext.Provider
        value={{
          isOpen,
          disabled: isDisabled,
          value,
          triggerId,
          contentId,
          headingLevel,
          onOpenChange,
        }}
      >
        <div
          ref={ref}
          className={cn(
            accordionItemVariants({
              isOpen,
              disabled: isDisabled,
              orientation,
            }),
            className
          )}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={isDisabled || undefined}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// ============================================================================
// Heading Wrapper Component
// ============================================================================

interface HeadingWrapperProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const HeadingWrapper: React.FC<HeadingWrapperProps> = ({
  level,
  children,
  className = "m-0 p-0",
}) => {
  switch (level) {
    case 1:
      return <h1 className={className}>{children}</h1>;
    case 2:
      return <h2 className={className}>{children}</h2>;
    case 3:
      return <h3 className={className}>{children}</h3>;
    case 4:
      return <h4 className={className}>{children}</h4>;
    case 5:
      return <h5 className={className}>{children}</h5>;
    case 6:
      return <h6 className={className}>{children}</h6>;
    default:
      return <h3 className={className}>{children}</h3>;
  }
};

// ============================================================================
// Accordion Trigger Component
// ============================================================================

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
  (
    {
      children,
      className,
      icon,
      openIcon,
      closedIcon,
      iconPosition = "right",
      hideIcon = false,
      asChild = false,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const { onValueChange, size, registerTrigger, handleKeyDown } =
      useAccordionContext();
    const { isOpen, disabled, value, triggerId, contentId, headingLevel } =
      useAccordionItemContext();

    const internalRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMergedRef(ref, internalRef);

    // Register trigger for keyboard navigation
    useEffect(() => {
      registerTrigger(value, internalRef.current);
      return () => registerTrigger(value, null);
    }, [value, registerTrigger]);

    const handleClick = useCallback(() => {
      if (!disabled) {
        onValueChange(value);
      }
    }, [disabled, onValueChange, value]);

    const handleKeyDownInternal = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        handleKeyDown(e, value);
      },
      [handleKeyDown, value]
    );

    // Determine which icon to render
    const renderIcon = () => {
      if (hideIcon) return null;

      if (icon) {
        return <span className="relative shrink-0">{icon}</span>;
      }

      if (isOpen && openIcon) {
        return <span className="relative shrink-0">{openIcon}</span>;
      }
      if (!isOpen && closedIcon) {
        return <span className="relative shrink-0">{closedIcon}</span>;
      }

      return (
        <div className="relative shrink-0">
          <div
            className={cn(
              "absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-md opacity-0 transition-opacity duration-300",
              isOpen && "opacity-100"
            )}
          />
          <ChevronDown
            className={cn(accordionIconVariants({ isOpen, size }))}
          />
        </div>
      );
    };

    const buttonProps = {
      id: triggerId,
      type: "button" as const,
      className: cn(
        accordionHeaderVariants({
          isOpen,
          size,
          iconPosition,
          disabled,
        }),
        className
      ),
      onClick: handleClick,
      onKeyDown: handleKeyDownInternal,
      onFocus,
      onBlur,
      "aria-expanded": isOpen,
      "aria-controls": contentId,
      "aria-disabled": disabled || undefined,
      disabled,
      "data-state": isOpen ? "open" : "closed",
      "data-disabled": disabled || undefined,
    };

    if (asChild) {
      return (
        <Slot ref={mergedRef} {...buttonProps}>
          {children}
        </Slot>
      );
    }

    const buttonElement = (
      <button ref={mergedRef} {...buttonProps}>
        <span className="font-semibold text-foreground tracking-wide flex-1 text-left">
          {children}
        </span>
        {renderIcon()}
      </button>
    );

    return (
      <HeadingWrapper level={headingLevel}>{buttonElement}</HeadingWrapper>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// ============================================================================
// Accordion Content Component
// ============================================================================

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(
  (
    {
      children,
      className,
      forceMount = false,
      onAnimationStart,
      onAnimationEnd,
    },
    ref
  ) => {
    const {
      size,
      lazyMount,
      unmountOnClose,
      animationDuration,
      onOpenEnd,
      onCloseEnd,
    } = useAccordionContext();
    const { isOpen, triggerId, contentId, value } = useAccordionItemContext();

    // Handle lazy mounting
    const { shouldMount, isUnmounting } = useLazyMount({
      isOpen,
      lazyMount,
      unmountOnClose: unmountOnClose && !forceMount,
      unmountDelay: animationDuration,
    });

    // Handle animated height
    const {
      contentRef,
      style: animatedStyle,
      isAnimating,
    } = useAnimatedHeight({
      isOpen,
      duration: animationDuration,
      onAnimationStart,
      onAnimationEnd: () => {
        onAnimationEnd?.();
        if (isOpen) {
          onOpenEnd?.(value);
        } else {
          onCloseEnd?.(value);
        }
      },
    });

    const mergedRef = useMergedRef(ref, contentRef);

    // Don't render if not mounted and not force mounted
    if (!shouldMount && !forceMount) {
      return null;
    }

    return (
      <div
        ref={mergedRef}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen && !isAnimating && !forceMount}
        style={animatedStyle}
        className={cn(accordionContentVariants({ size }), className)}
        data-state={isOpen ? "open" : "closed"}
        data-animating={isAnimating || undefined}
      >
        <div
          className={cn(
            accordionContentInnerVariants({
              isOpen: isOpen || isUnmounting,
              size,
            })
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

// ============================================================================
// Re-export hook for external use
// ============================================================================

export { useAccordion } from "../../hooks/useAccordion";
export type {
  UseAccordionProps,
  UseAccordionReturn,
} from "../../hooks/useAccordion";
