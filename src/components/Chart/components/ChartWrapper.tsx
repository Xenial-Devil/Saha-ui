"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ChartWrapperProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const ChartWrapper = React.forwardRef<HTMLDivElement, ChartWrapperProps>(
  ({ children, title, description, footer, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col space-y-1.5 pb-2">
            {title && (
              <h3 className="font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="flex-1">{children}</div>
        {footer && (
          <div className="flex items-center pt-2 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);

ChartWrapper.displayName = "ChartWrapper";
