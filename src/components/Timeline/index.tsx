import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Check, Circle } from "lucide-react";
import type {
  TimelineProps,
  TimelineItemProps,
  TimelineVariant,
  TimelinePosition,
  TimelineSize,
} from "./Timeline.types";

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

const timelineVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      default: "space-y-4",
      outlined: "space-y-4",
      gradient: "space-y-4",
      minimal: "space-y-2",
      glass: "space-y-4",
    },
    position: {
      left: "items-start",
      right: "items-end",
      alternate: "items-center",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "left",
  },
});

const timelineItemVariants = cva("relative flex gap-4", {
  variants: {
    position: {
      left: "flex-row",
      right: "flex-row-reverse",
      alternate: "flex-row even:flex-row-reverse",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

const timelineDotVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      status: {
        default: "bg-primary text-primary-foreground",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
        pending: "bg-gray-400 text-white",
      },
      size: {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
      },
      active: {
        true: "scale-110 shadow-lg",
        false: "",
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
      active: false,
    },
  }
);

const timelineLineVariants = cva("absolute left-1/2 -translate-x-1/2 w-0.5", {
  variants: {
    variant: {
      default: "bg-border",
      outlined: "bg-border",
      gradient: "bg-gradient-to-b from-primary/50 to-transparent",
      minimal: "bg-border/30",
      glass: "bg-white/20 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

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
