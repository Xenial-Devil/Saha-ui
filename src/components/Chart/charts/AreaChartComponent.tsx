import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps, AreaSeriesConfig } from "../Chart.types";

export function AreaChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  ) as AreaSeriesConfig[];

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          />

          <YAxis
            hide={config.yAxis?.hide}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={config.yAxis?.tickFormatter}
          />

          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          <defs>
            {visibleSeries.map((series, index) => {
              const id = `areaGradient-${index}`;
              const color = series.color || getColor(index);
              return (
                <linearGradient key={id} id={id} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              );
            })}
          </defs>

          {visibleSeries.map((series, index) => {
            const color = series.color || getColor(index);
            return (
              <Area
                key={series.dataKey}
                type={series.type || "monotone"}
                dataKey={series.dataKey}
                name={series.name || series.dataKey}
                stroke={color}
                fill={`url(#areaGradient-${index})`}
                strokeWidth={series.strokeWidth || 2.2}
                fillOpacity={series.fillOpacity ?? 1}
                stackId={series.stackId}
                strokeLinecap="round"
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
