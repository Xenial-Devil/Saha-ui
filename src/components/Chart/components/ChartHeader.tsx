import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ChartHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export const ChartHeader = React.forwardRef<HTMLDivElement, ChartHeaderProps>(
  ({ title, description, className, ...props }, ref) => {
    if (!title && !description) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
      >
        {title && (
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    );
  },
);

ChartHeader.displayName = "ChartHeader";
