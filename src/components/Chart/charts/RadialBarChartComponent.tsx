import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

export function RadialBarChartComponent({
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

  const dataWithColors = visibleData.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="12%"
          outerRadius="88%"
          data={dataWithColors}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          <RadialBar
            dataKey={series.dataKey}
            cornerRadius={12}
            background={{ fill: "hsl(var(--muted))" }}
            label={{
              position: "insideStart",
              fill: "hsl(var(--background))",
              fontSize: 12,
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
