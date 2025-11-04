import type { ChartConfig } from "../components/Chart/Chart.types";

export function createChartConfig(
  data: any[],
  options: Partial<ChartConfig>
): ChartConfig {
  return {
    data,
    series: [],
    xAxis: { dataKey: "name" },
    yAxis: {},
    grid: { show: true },
    tooltip: { show: true },
    legend: { show: true, position: "bottom" },
    ...options,
  };
}
