import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
} from "recharts";
import { chartCanvasVariants } from "../Chart.styles";
import { ChartTooltip } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps } from "../Chart.types";

export function FunnelChartComponent({
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
        <FunnelChart>
          {config.tooltip?.show !== false && (
            <Tooltip content={<ChartTooltip config={config.tooltip} />} />
          )}

          <Funnel
            dataKey={series.dataKey}
            data={dataWithColors}
            isAnimationActive
          >
            <LabelList
              position="right"
              fill="hsl(var(--foreground))"
              stroke="none"
              dataKey={config.xAxis?.dataKey || "name"}
              fontSize={13}
              offset={8}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
