import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps, PieSeriesConfig } from "../Chart.types";

export function PieChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { colors } = useChartColors(variant);

  const series = config.series[0] as PieSeriesConfig;
  if (!series) return null;

  const visibleData = config.data.filter(
    (item) => !hiddenSeries.has(String(item[series.dataKey]))
  );

  return (
    <div className={chartCanvasVariants({ size })}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          <Pie
            data={visibleData}
            dataKey={series.dataKey}
            nameKey={config.xAxis?.dataKey || "name"}
            cx="50%"
            cy="50%"
            innerRadius={(series.innerRadius as any) || 0}
            outerRadius={(series.outerRadius as any) || 90}
            paddingAngle={series.paddingAngle || 2}
            startAngle={series.startAngle || 0}
            endAngle={series.endAngle || 360}
            label={series.labelLine ? true : false}
            labelLine={series.labelLine ? true : false}
          >
            {visibleData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={series.color || colors[index % colors.length]}
                className="transition-all hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
