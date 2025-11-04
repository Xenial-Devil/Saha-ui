import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type {
  BaseChartComponentProps,
  ScatterSeriesConfig,
} from "../Chart.types";

export function ScatterChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  ) as ScatterSeriesConfig[];

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
          {config.grid?.show !== false && (
            <CartesianGrid
              strokeDasharray={config.grid?.strokeDasharray || "3 4"}
              className="stroke-border/40"
            />
          )}

          <XAxis
            type="number"
            dataKey="x"
            name={config.xAxis?.label}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={config.xAxis?.tickFormatter}
          />

          <YAxis
            type="number"
            dataKey="y"
            name={config.yAxis?.label}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={config.yAxis?.tickFormatter}
          />

          {config.tooltip?.show !== false && (
            <Tooltip
              content={<ChartTooltip config={config.tooltip} />}
              cursor={{ strokeDasharray: "3 3" }}
            />
          )}

          {visibleSeries.map((series, index) => (
            <Scatter
              key={series.dataKey}
              name={series.name || series.dataKey}
              data={config.data}
              fill={series.color || getColor(index)}
              shape={series.shape || "circle"}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
