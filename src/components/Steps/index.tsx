"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
  isValidElement,
  useEffect,
} from "react";
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
import {
  stepsVariants,
  stepVariants,
  stepIconVariants,
  connectorVariants,
} from "./Steps.styles";

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
