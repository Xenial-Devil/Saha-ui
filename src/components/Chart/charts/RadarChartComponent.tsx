import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type {
  BaseChartComponentProps,
  RadarSeriesConfig,
} from "../Chart.types";

export function RadarChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  ) as RadarSeriesConfig[];

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={config.data}>
          <PolarGrid className="stroke-border/40" />
          <PolarAngleAxis
            dataKey={config.xAxis?.dataKey || "subject"}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={config.yAxis?.tickFormatter}
          />

          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          {visibleSeries.map((series, index) => (
            <Radar
              key={series.dataKey}
              name={series.name || series.dataKey}
              dataKey={series.dataKey}
              stroke={series.color || getColor(index)}
              fill={series.color || getColor(index)}
              fillOpacity={series.fillOpacity || 0.35}
              strokeWidth={series.strokeWidth || 2.5}
              dot={series.dot !== false}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
