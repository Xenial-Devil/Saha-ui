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
  "flex items-center justify-center rounded-full transition-all duration-300 relative shadow-lg hover:shadow-xl",
  {
    variants: {
      status: {
        default:
          "bg-primary text-primary-foreground shadow-primary/30 hover:shadow-primary/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        success:
          "bg-green-500 text-white shadow-green-500/30 hover:shadow-green-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        error:
          "bg-red-500 text-white shadow-red-500/30 hover:shadow-red-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        warning:
          "bg-yellow-500 text-white shadow-yellow-500/30 hover:shadow-yellow-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        info: "bg-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        pending:
          "bg-gray-400 text-white shadow-gray-400/30 hover:shadow-gray-400/40",
      },
      size: {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
      },
      active: {
        true: "scale-125 shadow-2xl ring-2 ring-primary/20 animate-pulse-glow",
        false: "hover:scale-110",
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
      active: false,
    },
  }
);

const timelineLineVariants = cva(
  "absolute left-1/2 -translate-x-1/2 w-0.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-border shadow-[0_0_4px_0] shadow-border/20",
        outlined: "bg-border shadow-[0_0_4px_0] shadow-border/20",
        gradient:
          "bg-gradient-to-b from-primary/50 to-transparent shadow-[0_0_8px_0] shadow-primary/20",
        minimal: "bg-border/30",
        glass:
          "bg-white/20 backdrop-blur-sm shadow-[0_0_8px_0] shadow-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
