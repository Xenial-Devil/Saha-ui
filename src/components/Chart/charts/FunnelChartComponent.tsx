"use client";

import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

export function FunnelChartComponent({
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
      <FunnelChart>
        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent hideLabel />} />
        )}

        <Funnel dataKey={series.dataKey} data={visibleData} isAnimationActive>
          <LabelList
            position="right"
            fill="#000"
            stroke="none"
            dataKey={series.dataKey}
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
