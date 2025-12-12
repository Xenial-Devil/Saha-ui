"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type {
  BaseChartComponentProps,
  BarSeriesConfig,
  LineSeriesConfig,
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

  const heightMap = {
    xs: 150,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
    "2xl": 600,
    "3xl": 700,
    "4xl": 800,
  };

  const renderSeries = (series: any, index: number) => {
    const color = series.color || getColor(index);
    const seriesType = (series as any).type || "bar";

    switch (seriesType) {
      case "line": {
        const lineSeries = series as LineSeriesConfig;
        return (
          <Line
            key={series.dataKey}
            type={lineSeries.type || "monotone"}
            dataKey={series.dataKey}
            name={series.name || series.dataKey}
            stroke={color}
            strokeWidth={lineSeries.strokeWidth || 2}
            dot={lineSeries.dot !== false ? { r: 3, strokeWidth: 2 } : false}
            activeDot={lineSeries.activeDot !== false ? { r: 4 } : false}
          />
        );
      }

      case "area": {
        const areaSeries = series as AreaSeriesConfig;
        return (
          <Area
            key={series.dataKey}
            type={areaSeries.type || "monotone"}
            dataKey={series.dataKey}
            name={series.name || series.dataKey}
            stroke={color}
            fill={color}
            strokeWidth={areaSeries.strokeWidth || 2}
            fillOpacity={areaSeries.fillOpacity ?? 0.6}
            stackId={areaSeries.stackId}
          />
        );
      }

      case "bar":
      default: {
        const barSeries = series as BarSeriesConfig;
        return (
          <Bar
            key={series.dataKey}
            dataKey={series.dataKey}
            name={series.name || series.dataKey}
            fill={color}
            stackId={barSeries.stackId}
            radius={barSeries.radius || [4, 4, 0, 0]}
            maxBarSize={barSeries.barSize || 60}
          />
        );
      }
    }
  };

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <ComposedChart
        data={config.data}
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        accessibilityLayer
      >
        {config.grid?.show !== false && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={config.grid?.vertical ?? false}
            horizontal={config.grid?.horizontal ?? true}
          />
        )}

        <XAxis
          dataKey={config.xAxis?.dataKey}
          hide={config.xAxis?.hide}
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
                }
              : undefined
          }
        />

        <YAxis
          hide={config.yAxis?.hide}
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
                }
              : undefined
          }
        />

        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent />} />
        )}

        {visibleSeries.map((series, index) => renderSeries(series, index))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
