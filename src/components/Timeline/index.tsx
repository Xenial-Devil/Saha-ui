import React, { createContext, useContext, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Check, Circle } from "lucide-react";
import type {
  TimelineProps,
  TimelineItemProps,
  TimelineVariant,
  TimelinePosition,
  TimelineSize,
} from "./Timeline.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import {
  timelineVariants,
  timelineItemVariants,
  timelineDotVariants,
  timelineLineVariants,
} from "./Timeline.styles";

interface TimelineContextValue {
  variant: TimelineVariant;
  position: TimelinePosition;
  size: TimelineSize;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(
  undefined
);

const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("TimelineItem must be used within a Timeline");
  }
  return context;
};


const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      variant = "default",
      position = "left",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Timeline");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "outlined",
        "gradient",
        "minimal",
        "glass",
      ] as const);

      // Validate position
      validator.validateEnum("position", position, [
        "left",
        "right",
        "alternate",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, position, size, className]);

    const contextValue: TimelineContextValue = {
      variant,
      position,
      size,
    };

    return (
      <TimelineContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(timelineVariants({ variant, position }), className)}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);

Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      title,
      description,
      time,
      icon,
      status = "default",
      active = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { variant, position, size } = useTimeline();

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("TimelineItem");

      // Validate status
      validator.validateEnum("status", status, [
        "default",
        "success",
        "error",
        "warning",
        "info",
        "pending",
      ] as const);

      // Validate boolean props
      validator.validateType("active", active, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [status, active, className]);

    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ position }), className)}
        {...props}
      >
        <div className="relative flex flex-col items-center">
          <div className={cn(timelineDotVariants({ status, size, active }))}>
            {icon ||
              (status === "success" ? (
                <Check size={16} />
              ) : (
                <Circle size={16} />
              ))}
          </div>
          <div
            className={cn(timelineLineVariants({ variant }), "top-full h-full")}
          />
        </div>
        <div className="flex-1 pb-8">
          {title && (
            <div className="font-semibold text-foreground">{title}</div>
          )}
          {time && <div className="text-sm text-muted-foreground">{time}</div>}
          {description && (
            <div className="mt-2 text-sm text-muted-foreground">
              {description}
            </div>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
