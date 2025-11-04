import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Area,
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
  LineSeriesConfig,
  BarSeriesConfig,
  AreaSeriesConfig,
} from "../Chart.types";

export function ComposedChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const visibleSeries = config.series.filter(
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide
  );

  const renderSeries = (series: any, index: number) => {
    const color = series.color || getColor(index);
    const name = series.name || series.dataKey;

    if ("barSize" in series || "stackId" in series) {
      const barSeries = series as BarSeriesConfig;
      return (
        <Bar
          key={series.dataKey}
          dataKey={series.dataKey}
          name={name}
          fill={color}
          radius={barSeries.radius || [10, 10, 0, 0]}
          stackId={barSeries.stackId}
          maxBarSize={barSeries.barSize || 48}
        />
      );
    }

    if ("fillOpacity" in series && series.fillOpacity !== undefined) {
      const areaSeries = series as AreaSeriesConfig;
      return (
        <Area
          key={series.dataKey}
          type={areaSeries.type || "monotone"}
          dataKey={series.dataKey}
          name={name}
          stroke={color}
          fill={color}
          fillOpacity={areaSeries.fillOpacity || 0.25}
          strokeWidth={areaSeries.strokeWidth || 2.2}
        />
      );
    }

    const lineSeries = series as LineSeriesConfig;
    return (
      <Line
        key={series.dataKey}
        type={lineSeries.type || "monotone"}
        dataKey={series.dataKey}
        name={name}
        stroke={color}
        strokeWidth={lineSeries.strokeWidth || 2.5}
        dot={{ fill: color, r: 3.5 }}
      />
    );
  };

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />

          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />

          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          {visibleSeries.map((series, index) => renderSeries(series, index))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
