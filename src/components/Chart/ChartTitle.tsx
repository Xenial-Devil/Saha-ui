import React from "react";
import { cva } from "class-variance-authority";

const titleVariants = cva("font-semibold", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "md",
    align: "center",
  },
});

export interface ChartTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right";
}

const ChartTitle = React.forwardRef<HTMLDivElement, ChartTitleProps>(
  ({ className, size, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={titleVariants({ size, align, className })}
        {...props}
      />
    );
  }
);

ChartTitle.displayName = "ChartTitle";

export default ChartTitle;
