"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ChartConfig {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
}

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig;
  children: React.ReactNode;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ config, children, className, ...props }, ref) => {
  const chartId = React.useId();

  return (
    <div
      ref={ref}
      data-chart={chartId}
      className={cn(
        "flex aspect-auto justify-center text-xs",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
        "[&_.recharts-layer]:outline-none",
        "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-radial-bar-background-sector]:fill-muted",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
        "[&_.recharts-sector]:outline-none",
        "[&_.recharts-surface]:outline-none",
        className,
      )}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      {children}
    </div>
  );
});

ChartContainer.displayName = "ChartContainer";

interface ChartStyleProps {
  id: string;
  config?: ChartConfig;
}

const ChartStyle = ({ id, config }: ChartStyleProps) => {
  const colorConfig = React.useMemo(() => {
    if (!config) return null;

    return Object.entries(config).map(([key, value]) => {
      if (!value.color && !value.theme) return null;

      const cssVariable = `--color-${key}`;

      if (value.color) {
        return `${cssVariable}: ${value.color};`;
      }

      if (value.theme?.light && value.theme?.dark) {
        return `
          ${cssVariable}: ${value.theme.light};
          .dark ${cssVariable}: ${value.theme.dark};
        `;
      }

      return null;
    });
  }, [config]);

  if (!colorConfig) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-chart="${id}"] {
            ${colorConfig.join("\n")}
          }
        `,
      }}
    />
  );
};
