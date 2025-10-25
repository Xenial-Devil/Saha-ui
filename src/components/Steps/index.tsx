import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
  isValidElement,
  useEffect,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";
import type {
  StepsProps,
  StepsItemProps,
  StepStatus,
  StepsVariant,
  StepsSize,
  StepsOrientation,
} from "./Steps.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

interface StepsContextValue {
  value: string | number;
  onValueChange: (value: string | number) => void;
  variant: StepsVariant;
  size: StepsSize;
  orientation: StepsOrientation;
  clickable: boolean;
  allSteps: (string | number)[];
}

const StepsContext = createContext<StepsContextValue | undefined>(undefined);

const useStepsContext = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error("Steps components must be used within a Steps component");
  }
  return context;
};

const stepsVariants = cva("w-full transition-all duration-300", {
  variants: {
    variant: {
      default: "",
      bordered:
        "p-6 rounded-xl border-2 border-border bg-background hover:shadow-xl hover:border-primary/30 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:pointer-events-none",
      glass:
        "p-6 rounded-xl border border-border/30 bg-background/50 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-white/20 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:pointer-events-none",
      minimal: "p-2",
    },
    orientation: {
      horizontal: "flex items-start",
      vertical: "flex flex-col",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

const stepVariants = cva(
  "relative flex items-start transition-all duration-200",
  {
    variants: {
      orientation: {
        horizontal: "flex-col items-center flex-1",
        vertical: "flex-row pb-8 last:pb-0",
      },
    },
  }
);

const stepIconVariants = cva(
  "flex items-center justify-center rounded-full font-semibold transition-all duration-300 border-2 relative",
  {
    variants: {
      status: {
        completed:
          "bg-success border-success text-white shadow-lg shadow-success/30 hover:shadow-xl hover:shadow-success/40 hover:scale-110 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        current:
          "bg-primary border-primary text-white shadow-xl shadow-primary/40 scale-110 animate-pulse-glow before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:to-transparent",
        pending:
          "bg-background border-border text-muted-foreground hover:border-primary/30 hover:scale-105 hover:shadow-md transition-all",
        error:
          "bg-destructive border-destructive text-white shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 hover:scale-110",
      },
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
    },
  }
);

const connectorVariants = cva("transition-all duration-300 relative", {
  variants: {
    orientation: {
      horizontal: "h-0.5 flex-1 mx-2 mt-5",
      vertical: "w-0.5 ml-5 flex-1 absolute top-12 left-5",
    },
    status: {
      completed: "bg-success shadow-[0_0_8px_0] shadow-success/30",
      current:
        "bg-gradient-to-r from-success to-primary shadow-[0_0_8px_0] shadow-primary/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer",
      pending: "bg-border",
      error: "bg-destructive shadow-[0_0_8px_0] shadow-destructive/30",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "pending",
  },
});

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "md",
      orientation = "horizontal",
      clickable = false,
      className,
      children,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string | number>(
      () => {
        return defaultValue ?? "";
      }
    );

    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const allSteps: (string | number)[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement<StepsItemProps>(child) && child.props.value) {
        allSteps.push(child.props.value);
      }
    });

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Steps");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "bordered",
        "glass",
        "minimal",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate orientation
      validator.validateEnum("orientation", orientation, [
        "horizontal",
        "vertical",
      ] as const);

      // Validate boolean props
      validator.validateType("clickable", clickable, "boolean", isValidBoolean);

      // Validate children
      if (!children) {
        validator.warn("Steps should have StepItem children");
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, size, orientation, clickable, children, className]);

    const handleValueChange = useCallback(
      (newValue: string | number) => {
        if (onValueChange) {
          onValueChange(newValue);
        }
        if (controlledValue === undefined) {
          setUncontrolledValue(newValue);
        }
      },
      [onValueChange, controlledValue]
    );

    return (
      <StepsContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          variant,
          size,
          orientation,
          clickable,
          allSteps,
        }}
      >
        <div
          ref={ref}
          className={cn(stepsVariants({ variant, orientation }), className)}
        >
          {children}
        </div>
      </StepsContext.Provider>
    );
  }
);

Steps.displayName = "Steps";

export const StepsItem = React.forwardRef<HTMLDivElement, StepsItemProps>(
  (
    {
      value,
      title,
      description,
      status: providedStatus,
      icon,
      disabled = false,
      className,
      children,
    },
    ref
  ) => {
    const {
      value: currentValue,
      onValueChange,
      size,
      orientation,
      clickable,
      allSteps,
    } = useStepsContext();

    const stepIndex = allSteps.indexOf(value);
    const currentIndex = allSteps.indexOf(currentValue);

    const autoStatus: StepStatus = providedStatus
      ? providedStatus
      : stepIndex < currentIndex
      ? "completed"
      : stepIndex === currentIndex
      ? "current"
      : "pending";

    const handleClick = () => {
      if (clickable && !disabled) {
        onValueChange(value);
      }
    };

    const isLast = stepIndex === allSteps.length - 1;

    return (
      <div
        ref={ref}
        className={cn(
          stepVariants({ orientation }),
          clickable && !disabled && "cursor-pointer hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={handleClick}
      >
        <div
          className={cn(
            "flex items-center",
            orientation === "vertical" && "gap-4"
          )}
        >
          <div className={cn(stepIconVariants({ status: autoStatus, size }))}>
            {icon ? (
              icon
            ) : autoStatus === "completed" ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{stepIndex + 1}</span>
            )}
          </div>

          {!isLast && (
            <div
              className={cn(
                connectorVariants({
                  orientation,
                  status: stepIndex < currentIndex ? "completed" : "pending",
                })
              )}
            />
          )}
        </div>

        <div
          className={cn(
            "mt-2 text-center",
            orientation === "vertical" && "flex-1 mt-0 text-left"
          )}
        >
          <div
            className={cn(
              "font-medium transition-colors",
              autoStatus === "current" && "text-primary",
              autoStatus === "completed" && "text-foreground",
              autoStatus === "pending" && "text-muted-foreground"
            )}
          >
            {title}
          </div>
          {description && (
            <div className="text-sm text-muted-foreground mt-1">
              {description}
            </div>
          )}
          {children && orientation === "vertical" && (
            <div className="mt-4 text-sm">{children}</div>
          )}
        </div>
      </div>
    );
  }
);

StepsItem.displayName = "StepsItem";
