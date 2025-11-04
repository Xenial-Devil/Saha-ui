import { ChartContainer } from "./components/ChartContainer";
import { ChartHeader } from "./components/ChartHeader";
import { ChartLegend } from "./components/ChartLegend";
import { ChartLoading } from "./components/ChartLoading";
import { useChartData } from "../../hooks/useChartData";
import { useChartColors } from "../../hooks/useChartColors";
import { LineChartComponent } from "./charts/LineChartComponent";
import { BarChartComponent } from "./charts/BarChartComponent";
import { AreaChartComponent } from "./charts/AreaChartComponent";
import { PieChartComponent } from "./charts/PieChartComponent";
import { RadarChartComponent } from "./charts/RadarChartComponent";
import { RadialBarChartComponent } from "./charts/RadialBarChartComponent";
import { ScatterChartComponent } from "./charts/ScatterChartComponent";
import { ComposedChartComponent } from "./charts/ComposedChartComponent";
import { FunnelChartComponent } from "./charts/FunnelChartComponent";
import { TreemapChartComponent } from "./charts/TreemapChartComponent";
import type { ChartProps } from "./Chart.types";
import { useMemo } from "react";

const CHART_COMPONENTS = {
  line: LineChartComponent,
  bar: BarChartComponent,
  area: AreaChartComponent,
  pie: PieChartComponent,
  donut: PieChartComponent, // Same as pie but with innerRadius
  radar: RadarChartComponent,
  radialBar: RadialBarChartComponent,
  scatter: ScatterChartComponent,
  composed: ComposedChartComponent,
  funnel: FunnelChartComponent,
  treemap: TreemapChartComponent,
} as const;

export function Chart({
  type,
  config,
  variant = "default",
  size = "md",
  title,
  description,
  loading = false,
  className,
  children,
}: ChartProps) {
  const { hiddenSeries, toggleSeries } = useChartData(config);
  const { getColor } = useChartColors(variant);

  // Prepare legend data
  const legendPayload = useMemo(
    () =>
      config.series.map((series, index) => ({
        value: series.name || series.dataKey,
        color: series.color || getColor(index),
        dataKey: series.dataKey,
      })),
    [config.series, getColor]
  );

  // Get chart component
  const ChartComponent = CHART_COMPONENTS[type];

  // Special handling for donut chart (pie with innerRadius)
  const chartConfig = useMemo(() => {
    if (type === "donut" && config.series[0]) {
      return {
        ...config,
        series: [
          {
            ...config.series[0],
            innerRadius: (config.series[0] as any).innerRadius || 60,
            outerRadius: (config.series[0] as any).outerRadius || 80,
          },
          ...config.series.slice(1),
        ],
      };
    }
    return config;
  }, [type, config]);

  return (
    <ChartContainer variant={variant} size={size} className={className}>
      <ChartHeader title={title} description={description} size={size} />

      {config.legend?.show !== false && config.legend?.position === "top" && (
        <ChartLegend
          payload={legendPayload}
          config={{ ...config.legend, onClick: toggleSeries }}
          disabled={hiddenSeries}
        />
      )}

      {loading ? (
        <ChartLoading size={size} />
      ) : (
        <ChartComponent
          config={chartConfig}
          variant={variant}
          size={size}
          hiddenSeries={hiddenSeries}
        />
      )}

      {config.legend?.show !== false && config.legend?.position !== "top" && (
        <ChartLegend
          payload={legendPayload}
          config={{ ...config.legend, onClick: toggleSeries }}
          disabled={hiddenSeries}
        />
      )}

      {children}
    </ChartContainer>
  );
}
