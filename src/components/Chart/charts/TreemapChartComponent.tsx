import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  colors: string[];
  index?: number;
}

function CustomContent({
  x,
  y,
  width,
  height,
  name,
  value,
  colors,
  index = 0,
}: CustomContentProps) {
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
          strokeWidth: 1,
        }}
        className="transition-all hover:opacity-80"
      />
      {width && height && width > 60 && height > 40 && (
        <>
          <text
            x={(x || 0) + (width || 0) / 2}
            y={(y || 0) + (height || 0) / 2 - 7}
            textAnchor="middle"
            fill="hsl(var(--background))"
            fontSize={14}
            fontWeight="bold"
            opacity={0.95}
          >
            {name}
          </text>
          <text
            x={(x || 0) + (width || 0) / 2}
            y={(y || 0) + (height || 0) / 2 + 10}
            textAnchor="middle"
            fill="hsl(var(--background))"
            fontSize={12}
            opacity={0.9}
          >
            {value?.toLocaleString()}
          </text>
        </>
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
  const { colors } = useChartColors(variant);

  const series = config.series[0];
  if (!series) return null;

  const visibleData = config.data.filter(
    (item) => !hiddenSeries.has(String(item[series.dataKey]))
  );

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={visibleData}
          dataKey={series.dataKey}
          aspectRatio={4 / 3}
          stroke="hsl(var(--background))"
          content={<CustomContent colors={colors} />}
        >
          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
