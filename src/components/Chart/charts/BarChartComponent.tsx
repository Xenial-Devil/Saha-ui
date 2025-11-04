import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps, BarSeriesConfig } from "../Chart.types";

export function BarChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  ) as BarSeriesConfig[];

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            domain={config.yAxis?.domain}
          />

          {config.tooltip?.show !== false && (
            <Tooltip
              content={<ChartTooltip config={config.tooltip} />}
              cursor={{ fill: "hsl(var(--accent) / 0.08)" }}
            />
          )}

          {visibleSeries.map((series, index) => (
            <Bar
              key={series.dataKey}
              dataKey={series.dataKey}
              name={series.name || series.dataKey}
              fill={series.color || getColor(index)}
              stackId={series.stackId}
              radius={series.radius || [10, 10, 0, 0]}
              maxBarSize={series.barSize || 48}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
