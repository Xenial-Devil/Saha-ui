import React from "react";
import { cva } from "class-variance-authority";

const tooltipVariants = cva(
  "absolute pointer-events-none bg-popover text-popover-foreground border border-border rounded-md shadow-md px-3 py-2 text-sm transition-opacity duration-200",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

export interface ChartTooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  x?: number;
  y?: number;
  label?: string;
  value?: number | string;
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    { className, visible = false, x = 0, y = 0, label, value, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={tooltipVariants({ visible, className })}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        {...props}
      >
        {label && <div className="font-semibold">{label}</div>}
        {value !== undefined && <div>{value}</div>}
      </div>
    );
  }
);

ChartTooltip.displayName = "ChartTooltip";

export default ChartTooltip;
