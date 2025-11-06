"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
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
    (s) => !hiddenSeries.has(s.dataKey) && !s.hide,
  ) as BarSeriesConfig[];

  const heightMap = {
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  };

  // Function to generate gradient colors for single series
  const getGradientColor = (
    baseColor: string,
    index: number,
    total: number,
  ): string => {
    if (total === 1) return baseColor;

    // Parse OKLCH color
    const match = baseColor.match(
      /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/,
    );
    if (!match) return baseColor;

    const [, lightness, chroma, hue, alpha] = match;
    const L = parseFloat(lightness);
    const C = parseFloat(chroma);
    const H = parseFloat(hue);
    const A = alpha ? parseFloat(alpha) : 1;

    // Create gradient by adjusting lightness
    // Start from base lightness and go lighter
    const step = (0.85 - L) / (total - 1);
    const newLightness = Math.min(0.85, L + step * index);

    return `oklch(${newLightness.toFixed(3)} ${C} ${H}${A < 1 ? ` / ${A}` : ""})`;
  };

  // Check if single series (need gradient within bars)
  const isSingleSeries = visibleSeries.length === 1;

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <BarChart
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
        />

        <YAxis
          hide={config.yAxis?.hide}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={config.yAxis?.tickFormatter}
          domain={config.yAxis?.domain}
        />

        {config.tooltip?.show !== false && (
          <Tooltip
            content={<ChartTooltipContent indicator="line" />}
            cursor={false}
          />
        )}

        {visibleSeries.map((series, seriesIndex) => {
          // Get base color for this series
          const baseColor = series.color || getColor(seriesIndex);

          return (
            <Bar
              key={series.dataKey}
              dataKey={series.dataKey}
              name={series.name || series.dataKey}
              fill={baseColor}
              stackId={series.stackId}
              radius={series.radius || [4, 4, 0, 0]}
              maxBarSize={series.barSize || 60}
            >
              {isSingleSeries &&
                config.data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getGradientColor(
                      baseColor,
                      index,
                      config.data.length,
                    )}
                  />
                ))}
            </Bar>
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
