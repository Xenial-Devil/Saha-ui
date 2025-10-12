import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Check, Circle } from "lucide-react";
import type { TimelineProps } from "./Timeline.types";

/**
 * Timeline component variants using CVA
 *
 * Provides 4 modern timeline variants with flexible positioning,
 * status indicators, icons, and responsive design.
 *
 * @variant default - Standard timeline with solid line
 * @variant outlined - Outlined style with border
 * @variant gradient - Gradient colored timeline
 * @variant minimal - Minimalist clean design
 *
 * @position left | right | alternate - Content position
 * @size sm | md | lg - Size variations
 */
 const timelineVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "",
      outlined: "",
      gradient: "",
      minimal: "",
    },
    position: {
      left: "",
      right: "",
      alternate: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "left",
    size: "md",
  },
});

/**
 * Timeline item variants
 */
const timelineItemVariants = cva("relative flex gap-4", {
  variants: {
    position: {
      left: "flex-row",
      right: "flex-row-reverse",
      alternate: "flex-row",
    },
    size: {
      sm: "pb-6",
      md: "pb-8",
      lg: "pb-10",
    },
  },
  defaultVariants: {
    position: "left",
    size: "md",
  },
});

/**
 * Timeline line variants
 */
const timelineLineVariants = cva(
  "absolute top-0 w-0.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-border dark:bg-gray-700",
        outlined: "bg-border dark:bg-gray-700",
        gradient:
          "bg-gradient-to-b from-primary via-accent to-secondary opacity-50",
        minimal: "bg-gray-300 dark:bg-gray-700",
      },
      position: {
        left: "left-3",
        right: "right-3",
        alternate: "left-1/2 -translate-x-1/2",
      },
      size: {
        sm: "left-2.5",
        md: "left-3",
        lg: "left-4",
      },
    },
    compoundVariants: [
      {
        position: "right",
        size: "sm",
        className: "right-2.5 left-auto",
      },
      {
        position: "right",
        size: "md",
        className: "right-3 left-auto",
      },
      {
        position: "right",
        size: "lg",
        className: "right-4 left-auto",
      },
    ],
    defaultVariants: {
      variant: "default",
      position: "left",
      size: "md",
    },
  }
);

/**
 * Timeline dot variants
 */
const timelineDotVariants = cva(
  "relative z-10 flex items-center justify-center border-4 border-background transition-all duration-300",
  {
    variants: {
      status: {
        default: "bg-gray-400 dark:bg-gray-600",
        primary: "bg-primary ring-2 ring-primary/20",
        success: "bg-green-500 ring-2 ring-green-500/20",
        warning: "bg-yellow-500 ring-2 ring-yellow-500/20",
        error: "bg-red-500 ring-2 ring-red-500/20",
        info: "bg-blue-500 ring-2 ring-blue-500/20",
      },
      size: {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
      active: {
        true: "scale-125 shadow-lg",
        false: "",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
        diamond: "rounded-md rotate-45",
        ring: "rounded-full bg-transparent border-8",
      },
    },
    compoundVariants: [
      {
        status: "primary",
        active: true,
        className: "shadow-primary/50",
      },
      {
        status: "success",
        active: true,
        className: "shadow-green-500/50",
      },
      {
        status: "warning",
        active: true,
        className: "shadow-yellow-500/50",
      },
      {
        status: "error",
        active: true,
        className: "shadow-red-500/50",
      },
      {
        status: "info",
        active: true,
        className: "shadow-blue-500/50",
      },
    ],
    defaultVariants: {
      status: "default",
      size: "md",
      active: false,
    },
  }
);

/**
 * Timeline content variants
 */
const timelineContentVariants = cva("flex-1 transition-all duration-300", {
  variants: {
    variant: {
      default: "",
      outlined: "p-4 border-2 border-border rounded-lg hover:border-primary/50",
      gradient:
        "p-4 rounded-lg bg-gradient-to-br from-background to-accent/5 border border-border/50",
      minimal: "",
    },
    position: {
      left: "text-left",
      right: "text-right",
      alternate: "",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "left",
    size: "md",
  },
});

export type TimelineVariantsProps = VariantProps<typeof timelineVariants>;

/**
 * Timeline Component
 *
 * A versatile timeline component for displaying chronological events, processes,
 * and historical data with multiple visual styles and positioning options.
 *
 * @example
 * ```tsx
 * // Basic timeline
 * const items = [
 *   { id: 1, title: 'Started', time: '2024-01-01', status: 'success' },
 *   { id: 2, title: 'In Progress', time: '2024-02-01', active: true }
 * ];
 * <Timeline items={items} />
 *
 * // Alternate positioning with gradient
 * <Timeline items={items} variant="gradient" position="alternate" />
 *
 * // With icons
 * import { Rocket, Code, CheckCircle } from "lucide-react";
 * const itemsWithIcons = [
 *   { id: 1, title: 'Launch', icon: <Rocket size={16} />, status: 'primary' },
 *   { id: 2, title: 'Development', icon: <Code size={16} />, active: true }
 * ];
 * <Timeline items={itemsWithIcons} />
 * ```
 */
const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      variant = "default",
      position = "left",
      size = "md",
      items,
      className,
      itemClassName,
      dotClassName,
      contentClassName,
      lineClassName,
      lineStyle = "solid",
      dotShape = "circle",
      lineColor,
      lineWidth = "2px",
      showTimeOnOppositeSide = false,
      hideIcons = false,
      animateOnScroll = false,
      renderItem,
      onItemClick,
      ...props
    },
    ref
  ) => {
    // Get line style classes
    const getLineStyleClasses = () => {
      if (lineStyle === "dashed")
        return "border-dashed border-l-2 bg-transparent";
      if (lineStyle === "dotted")
        return "border-dotted border-l-2 bg-transparent";
      if (lineStyle === "gradient")
        return "bg-gradient-to-b from-primary via-accent to-secondary";
      return ""; // solid (default)
    };

    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant, position, size }), className)}
        {...props}
      >
        {/* Timeline vertical line */}
        <div
          className={cn(
            timelineLineVariants({ variant, position, size }),
            getLineStyleClasses(),
            lineClassName,
            "h-full"
          )}
          style={{
            backgroundColor: lineColor,
            width: lineWidth,
          }}
        />

        {/* Timeline items */}
        <div className="relative">
          {items.map((item, index) => {
            const isAlternate = position === "alternate";
            const isEven = index % 2 === 0;
            const itemPosition = isAlternate
              ? isEven
                ? "left"
                : "right"
              : position;

            // Custom render if provided
            if (renderItem) {
              return renderItem(item, index);
            }

            return (
              <div
                key={item.id}
                className={cn(
                  timelineItemVariants({
                    position: itemPosition as "left" | "right",
                    size,
                  }),
                  index === items.length - 1 && "pb-0",
                  animateOnScroll && "opacity-0 animate-fade-in",
                  item.className,
                  itemClassName
                )}
                onClick={() => onItemClick?.(item, index)}
                style={{
                  cursor: onItemClick ? "pointer" : "default",
                }}
              >
                {/* Left spacer for alternate right items */}
                {isAlternate && !isEven && (
                  <div className="flex-1 hidden md:block" />
                )}

                {/* Timeline dot */}
                {!item.hideDot && (
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={cn(
                        timelineDotVariants({
                          status: item.status || "default",
                          size,
                          active: item.active,
                          shape: dotShape,
                        }),
                        item.dotClassName,
                        dotClassName
                      )}
                      style={{
                        backgroundColor: item.dotColor,
                      }}
                    >
                      {!hideIcons &&
                        (item.icon ? (
                          <span
                            className={cn(
                              "text-white scale-75",
                              dotShape === "diamond" && "-rotate-45"
                            )}
                          >
                            {item.icon}
                          </span>
                        ) : item.active ? (
                          <Circle
                            className="text-white fill-current"
                            size={size === "sm" ? 8 : size === "lg" ? 12 : 10}
                          />
                        ) : item.status === "success" ? (
                          <Check
                            className="text-white"
                            size={size === "sm" ? 10 : size === "lg" ? 14 : 12}
                          />
                        ) : null)}
                    </div>
                    {!item.hideLine && index !== items.length - 1 && (
                      <div className="w-0.5 h-full" />
                    )}
                  </div>
                )}

                {/* Timeline content */}
                <div
                  className={cn(
                    timelineContentVariants({
                      variant,
                      position: itemPosition as "left" | "right",
                      size,
                    }),
                    isAlternate && "md:max-w-[calc(50%-2rem)]",
                    item.contentClassName,
                    contentClassName
                  )}
                >
                  {/* Time - show on opposite side if enabled */}
                  {item.time && showTimeOnOppositeSide && isAlternate ? (
                    <div
                      className={cn(
                        "absolute text-xs text-muted-foreground font-medium",
                        size === "sm" && "text-[10px]",
                        size === "lg" && "text-sm",
                        itemPosition === "left"
                          ? "right-0 translate-x-[calc(100%+3rem)]"
                          : "left-0 -translate-x-[calc(100%+3rem)]",
                        "hidden md:block"
                      )}
                    >
                      {item.time}
                    </div>
                  ) : (
                    item.time && (
                      <div
                        className={cn(
                          "text-xs text-muted-foreground mb-1 font-medium",
                          size === "sm" && "text-[10px]",
                          size === "lg" && "text-sm"
                        )}
                      >
                        {item.time}
                      </div>
                    )
                  )}

                  {/* Title */}
                  <h4
                    className={cn(
                      "font-semibold text-foreground mb-1",
                      size === "sm" && "text-sm",
                      size === "md" && "text-base",
                      size === "lg" && "text-lg",
                      item.active && "text-primary"
                    )}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  {item.description && (
                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed",
                        size === "sm" && "text-xs",
                        size === "md" && "text-sm",
                        size === "lg" && "text-base"
                      )}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right spacer for alternate left items */}
                {isAlternate && isEven && (
                  <div className="flex-1 hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

export default Timeline;

// Export variants for external use
export {
  timelineVariants,
  timelineItemVariants,
  timelineLineVariants,
  timelineDotVariants,
  timelineContentVariants,
};
