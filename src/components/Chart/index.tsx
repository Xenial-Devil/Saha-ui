"use client";

// Main component
export { Chart } from "./Chart";

// Core Shadcn-style components
export { ChartContainer } from "./components/ChartContainer";
export { ChartWrapper } from "./components/ChartWrapper";
export { ChartHeader } from "./components/ChartHeader";
export { ChartTooltip, ChartTooltipContent } from "./components/ChartTooltip";
export { ChartLegend, ChartLegendContent } from "./components/ChartLegend";
export { ChartLoading } from "./components/ChartLoading";

// Chart type components (backward compatibility)
export { LineChartComponent } from "./charts/LineChartComponent";
export { BarChartComponent } from "./charts/BarChartComponent";
export { AreaChartComponent } from "./charts/AreaChartComponent";
export { PieChartComponent } from "./charts/PieChartComponent";
export { RadarChartComponent } from "./charts/RadarChartComponent";
export { RadialBarChartComponent } from "./charts/RadialBarChartComponent";
export { ScatterChartComponent } from "./charts/ScatterChartComponent";
export { ComposedChartComponent } from "./charts/ComposedChartComponent";
export { FunnelChartComponent } from "./charts/FunnelChartComponent";
export { TreemapChartComponent } from "./charts/TreemapChartComponent";

// Hooks
export { useChartColors } from "../../hooks/useChartColors";
export { useChartData } from "../../hooks/useChartData";

// Utils
export { formatters } from "../../lib/formatters";
export { createChartConfig } from "../../lib/chartConfig";

// Types
export type * from "./Chart.types";
export type {
  ChartConfig,
  ChartContainerProps,
} from "./components/ChartContainer";
export type { ChartWrapperProps } from "./components/ChartWrapper";
export type { ChartTooltipProps } from "./components/ChartTooltip";
export type { ChartLegendProps } from "./components/ChartLegend";
export type { ChartHeaderProps } from "./components/ChartHeader";

// Styles
export * from "./Chart.styles";
