"use client";

import React, { createContext, useContext } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import { Slot } from "../../lib/Slot";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionVariant,
} from "./Accordion.types";
import {
  accordionContentVariants,
  accordionHeaderVariants,
  accordionItemVariants,
  accordionVariants,
} from "./Accordion.styles";
import { useAccordion } from "../../hooks/useAccordion";

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  variant: AccordionVariant;
  type: "single" | "multiple";
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined,
);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within an Accordion component",
    );
  }
  return context;
};

interface AccordionItemContextValue {
  isOpen: boolean;
  disabled: boolean;
  value: string;
}

const AccordionItemContext = createContext<
  AccordionItemContextValue | undefined
>(undefined);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within an AccordionItem component",
    );
  }
  return context;
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      className,
      collapsible = false,
      children,
    },
    ref,
  ) => {
    // Use the custom hook for accordion state management
    const {
      value,
      handleValueChange,
      type: accordionType,
      collapsible: isCollapsible,
    } = useAccordion({
      type,
      value: controlledValue,
      defaultValue,
      onValueChange,
      collapsible,
    });

    return (
      <AccordionContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          variant,
          type: accordionType,
          collapsible: isCollapsible,
        }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, className, disabled = false, children }, ref) => {
  const { value: openValue, type } = useAccordionContext();

  const isOpen =
    type === "multiple"
      ? Array.isArray(openValue) && openValue.includes(value)
      : openValue === value;

  return (
    <AccordionItemContext.Provider value={{ isOpen, disabled, value }}>
      <div
        ref={ref}
        className={cn(accordionItemVariants({ isOpen, disabled }), className)}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, icon, asChild = false }, ref) => {
  const { onValueChange } = useAccordionContext();
  const { isOpen, disabled, value } = useAccordionItemContext();

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type="button"
      className={cn(accordionHeaderVariants({ isOpen }), className)}
      onClick={handleClick}
      aria-expanded={isOpen}
      disabled={disabled}
    >
      {asChild ? (
        children
      ) : (
        <>
          <h3 className="text-base font-semibold text-foreground tracking-wide flex-1 text-left">
            {children}
          </h3>
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-md opacity-0 transition-opacity duration-300",
                isOpen && "opacity-100",
              )}
            />
            {icon || (
              <ChevronDown
                className={cn(
                  "relative h-5 w-5 transition-all duration-500 ease-out",
                  isOpen
                    ? "rotate-180 text-primary"
                    : "rotate-0 text-muted-foreground group-hover:text-foreground",
                )}
              />
            )}
          </div>
        </>
      )}
    </Comp>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className }, ref) => {
  const { isOpen } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      className={cn(accordionContentVariants({ isOpen }), className)}
      data-state={isOpen ? "open" : "closed"}
    >
      <div
        className={cn(
          "text-muted-foreground leading-relaxed transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";
