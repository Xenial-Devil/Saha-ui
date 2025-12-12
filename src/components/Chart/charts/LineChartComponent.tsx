"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
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
      <LineChart
        data={config.data}
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
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
          <Tooltip
            content={<ChartTooltipContent indicator="dot" />}
            cursor={{ strokeDasharray: "3 3" }}
          />
        )}

        {visibleSeries.map((series, index) => {
          const color = series.color || getColor(index);
          return (
            <Line
              key={series.dataKey}
              type={series.type || "monotone"}
              dataKey={series.dataKey}
              name={series.name || series.dataKey}
              stroke={color}
              strokeWidth={series.strokeWidth || 2}
              strokeDasharray={series.strokeDasharray}
              dot={
                series.dot !== false
                  ? {
                      r: 3,
                      strokeWidth: 2,
                      ...(typeof series.dot === "object" && series.dot),
                    }
                  : false
              }
              activeDot={
                series.activeDot !== false
                  ? {
                      r: 4,
                      ...(typeof series.activeDot === "object" &&
                        series.activeDot),
                    }
                  : false
              }
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
