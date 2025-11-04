import React from "react";
import { cva } from "class-variance-authority";

const legendVariants = cva("flex items-center gap-4 flex-wrap", {
  variants: {
    position: {
      top: "justify-center mb-4",
      bottom: "justify-center mt-4",
      left: "flex-col items-start mr-4",
      right: "flex-col items-start ml-4",
    },
    size: {
      sm: "text-xs gap-2",
      md: "text-sm gap-4",
      lg: "text-base gap-6",
    },
  },
  defaultVariants: {
    position: "bottom",
    size: "md",
  },
});

const legendItemVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const legendColorVariants = cva("rounded-sm", {
  variants: {
    size: {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ChartLegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChartLegendItem[];
  position?: "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg";
}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ className, items, position, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={legendVariants({ position, size, className })}
        {...props}
      >
        {items.map((item, index) => (
          <div key={index} className={legendItemVariants({ size })}>
            <div
              className={legendColorVariants({ size })}
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
);

ChartLegend.displayName = "ChartLegend";

export default ChartLegend;
