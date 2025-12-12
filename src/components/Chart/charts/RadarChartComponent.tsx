"use client";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
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

  // Safety check: return null if data is empty or invalid
  if (!config.data || config.data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <RadarChart data={config.data} cx="50%" cy="50%">
        <PolarGrid />
        <PolarAngleAxis
          dataKey={config.xAxis?.dataKey || "subject"}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={config.yAxis?.domain as [number, number] | undefined}
          tickLine={false}
        />

        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
        )}

        {visibleSeries.map((series, index) => {
          const color = series.color || getColor(index);
          return (
            <Radar
              key={series.dataKey}
              dataKey={series.dataKey}
              name={series.name || series.dataKey}
              stroke={color}
              fill={color}
              fillOpacity={series.fillOpacity ?? 0.6}
              strokeWidth={series.strokeWidth || 2}
              dot={series.dot !== false}
            />
          );
        })}
      </RadarChart>
    </ResponsiveContainer>
  );
}
