"use client";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

export function RadialBarChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const series = config.series[0];
  if (!series) return null;

  const visibleData = config.data
    .filter((item) => !hiddenSeries.has(item[series.dataKey] as string))
    .map((item, index) => ({
      ...item,
      fill: series.color || getColor(index),
    }));

  const heightMap = {
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  };

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        data={visibleData}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />

        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent hideLabel />} />
        )}

        {config.legend?.show !== false && <Legend />}

        <RadialBar
          dataKey={series.dataKey}
          background
          cornerRadius={10}
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: 12,
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
