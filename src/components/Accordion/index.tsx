import React, { createContext, useContext, useState, useCallback } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import "./index.scss";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionVariant,
} from "./Accordion.types";

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  variant: AccordionVariant;
  type: "single" | "multiple";
  collapsible: boolean;
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
      "AccordionTrigger and AccordionContent must be used within an AccordionItem component"
    );
  }
  return context;
};

const accordionVariants = cva(
  "w-full space-y-0 rounded-2xl overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        controlled:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        allopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        toggle: "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        firstopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionItemVariants = cva(
  "group relative w-full overflow-hidden transition-all duration-300 ease-out border-b border-border/30 last:border-b-0 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow",
  {
    variants: {
      isOpen: {
        true: "bg-card/50",
        false: "bg-card/30 hover:bg-card/40",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      isOpen: false,
      disabled: false,
    },
  }
);

const accordionHeaderVariants = cva(
  "w-full flex justify-between items-center cursor-pointer transition-all duration-300 px-6 py-4 gap-4",
  {
    variants: {
      isOpen: {
        true: "bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-border/50",
        false: "hover:bg-muted/30 active:scale-[0.99]",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

const accordionContentVariants = cva(
  "w-full px-6 overflow-hidden transition-all duration-500 ease-in-out bg-card/20",
  {
    variants: {
      isOpen: {
        true: "max-h-[500px] opacity-100 py-4",
        false: "max-h-0 opacity-0 py-0",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

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
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(() => {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return type === "multiple" ? [] : "";
    });

    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const handleValueChange = useCallback(
      (itemValue: string) => {
        let newValue: string | string[];

        if (type === "multiple") {
          const currentValue = Array.isArray(value) ? value : [];
          if (currentValue.includes(itemValue)) {
            newValue = currentValue.filter((v) => v !== itemValue);
          } else {
            newValue = [...currentValue, itemValue];
          }
        } else {
          if (collapsible && value === itemValue) {
            newValue = "";
          } else {
            newValue = itemValue;
          }
        }

        if (onValueChange) {
          onValueChange(newValue);
        }

        if (controlledValue === undefined) {
          setUncontrolledValue(newValue);
        }
      },
      [type, value, collapsible, onValueChange, controlledValue]
    );

    return (
      <AccordionContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          variant,
          type,
          collapsible,
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
  }
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
>(({ children, className, icon }, ref) => {
  const { onValueChange } = useAccordionContext();
  const { isOpen, disabled, value } = useAccordionItemContext();

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(accordionHeaderVariants({ isOpen }), className)}
      onClick={handleClick}
      aria-expanded={isOpen}
      disabled={disabled}
    >
      <h3 className="text-base font-semibold text-foreground tracking-wide flex-1 text-left">
        {children}
      </h3>
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-md opacity-0 transition-opacity duration-300",
            isOpen && "opacity-100"
          )}
        />
        {icon || (
          <ChevronDown
            className={cn(
              "relative h-5 w-5 transition-all duration-500 ease-out",
              isOpen
                ? "rotate-180 text-primary"
                : "rotate-0 text-muted-foreground group-hover:text-foreground"
            )}
          />
        )}
      </div>
    </button>
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
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";
