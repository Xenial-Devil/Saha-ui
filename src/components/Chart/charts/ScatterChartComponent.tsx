"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
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

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <ScatterChart
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
          type="number"
          dataKey={config.xAxis?.dataKey || "x"}
          name={config.xAxis?.label || "X"}
          hide={config.xAxis?.hide}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={config.xAxis?.tickFormatter}
          domain={config.xAxis?.domain as [number, number] | undefined}
        />

        <YAxis
          type="number"
          dataKey={config.yAxis?.dataKey || "y"}
          name={config.yAxis?.label || "Y"}
          hide={config.yAxis?.hide}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={config.yAxis?.tickFormatter}
          domain={config.yAxis?.domain as [number, number] | undefined}
        />

        <ZAxis range={[50, 400]} />

        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
        )}

        {visibleSeries.map((series, index) => {
          const color = series.color || getColor(index);
          return (
            <Scatter
              key={series.dataKey}
              name={series.name || series.dataKey}
              data={config.data}
              fill={color}
              shape={series.shape || "circle"}
            />
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
