"use client";

import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  depth?: number;
  name?: string;
  value?: number;
  colors?: string[];
}

function CustomContent({
  x,
  y,
  width,
  height,
  index = 0,
  name,
  colors = [],
}: CustomContentProps) {
  if (!width || !height || width < 10 || height < 10) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index % colors.length],
          stroke: "hsl(var(--background))",
          strokeWidth: 2,
        }}
      />
      {width > 50 && height > 30 && (
        <text
          x={(x || 0) + (width || 0) / 2}
          y={(y || 0) + (height || 0) / 2}
          textAnchor="middle"
          fill="hsl(var(--background))"
          fontSize={12}
          fontWeight={500}
        >
          {name}
        </text>
      )}
    </g>
  );
}

export function TreemapChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const series = config.series[0];
  if (!series) return null;

  const visibleData = config.data.filter(
    (item) => !hiddenSeries.has(item[series.dataKey] as string),
  );

  const colors = visibleData.map((_, index) =>
    series.color ? series.color : getColor(index),
  );

  const heightMap = {
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  };

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <Treemap
        data={visibleData}
        dataKey={series.dataKey}
        aspectRatio={4 / 3}
        stroke="hsl(var(--background))"
        content={<CustomContent colors={colors} />}
      >
        {config.tooltip?.show !== false && (
          <Tooltip content={<ChartTooltipContent hideLabel />} />
        )}
      </Treemap>
    </ResponsiveContainer>
  );
}
