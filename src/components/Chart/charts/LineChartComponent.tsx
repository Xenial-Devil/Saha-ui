import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps, LineSeriesConfig } from "../Chart.types";

export function LineChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  ) as LineSeriesConfig[];

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={config.data}
          margin={{ top: 8, right: 12, left: 8, bottom: 8 }}
        >
          {config.grid?.show !== false && (
            <CartesianGrid
              strokeDasharray={config.grid?.strokeDasharray || "3 4"}
              className="stroke-border/40"
              vertical={config.grid?.vertical ?? true}
              horizontal={config.grid?.horizontal ?? true}
            />
          )}

          <XAxis
            dataKey={config.xAxis?.dataKey}
            hide={config.xAxis?.hide}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={config.xAxis?.tickFormatter}
            label={
              config.xAxis?.label
                ? {
                    value: config.xAxis.label,
                    position: "insideBottom",
                    offset: -5,
                    style: {
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    },
                  }
                : undefined
            }
          />

          <YAxis
            hide={config.yAxis?.hide}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={config.yAxis?.tickFormatter}
            domain={config.yAxis?.domain}
            scale={config.yAxis?.scale}
            label={
              config.yAxis?.label
                ? {
                    value: config.yAxis.label,
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    },
                  }
                : undefined
            }
          />

          {config.tooltip?.show !== false && (
            <Tooltip
              content={<ChartTooltip config={config.tooltip} />}
              cursor={
                config.tooltip?.cursor !== false
                  ? {
                      stroke: "hsl(var(--border))",
                      strokeWidth: 1,
                      strokeDasharray: "3 3",
                    }
                  : false
              }
            />
          )}

          <defs>
            {visibleSeries.map((series, index) => {
              const id = `lineGradient-${index}`;
              const color = series.color || getColor(index);
              return (
                <linearGradient key={id} id={id} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>

          {visibleSeries.map((series, index) => {
            const color = series.color || getColor(index);
            return (
              <Line
                key={series.dataKey}
                type={series.type || "monotone"}
                dataKey={series.dataKey}
                name={series.name || series.dataKey}
                stroke={color}
                strokeWidth={series.strokeWidth || 2.5}
                strokeDasharray={series.strokeDasharray}
                dot={
                  series.dot !== false
                    ? {
                        fill: color,
                        r: 3.5,
                        strokeWidth: 0,
                        ...(typeof series.dot === "object" && series.dot),
                      }
                    : false
                }
                activeDot={
                  series.activeDot !== false
                    ? {
                        r: 5,
                        strokeWidth: 0,
                        ...(typeof series.activeDot === "object" &&
                          series.activeDot),
                      }
                    : false
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
