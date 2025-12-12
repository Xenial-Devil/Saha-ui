import type { ReactNode } from "react";
import type { CurveType } from "recharts/types/shape/Curve";

export type ChartVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost"
  | "glass";

export type ChartSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type ChartType =
  | "line"
  | "bar"
  | "area"
  | "pie"
  | "donut"
  | "radar"
  | "radialBar"
  | "scatter"
  | "composed"
  | "funnel"
  | "treemap";

export type LegendPosition = "top" | "bottom" | "left" | "right";

export type AxisOrientation = "left" | "right" | "top" | "bottom";

export interface ChartDataPoint {
  [key: string]: string | number | null | undefined;
}

export interface BaseSeriesConfig {
  dataKey: string;
  name?: string;
  color?: string;
  hide?: boolean;
}

export interface LineSeriesConfig extends BaseSeriesConfig {
  type?: CurveType;
  strokeWidth?: number;
  strokeDasharray?: string;
  dot?: boolean | object;
  activeDot?: boolean | object;
}

export interface BarSeriesConfig extends BaseSeriesConfig {
  stackId?: string;
  radius?: number | [number, number, number, number];
  barSize?: number;
}

export interface AreaSeriesConfig extends BaseSeriesConfig {
  type?: CurveType;
  strokeWidth?: number;
  fillOpacity?: number;
  stackId?: string;
}

export interface PieSeriesConfig extends BaseSeriesConfig {
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
  labelLine?: boolean;
}

export interface RadarSeriesConfig extends BaseSeriesConfig {
  fillOpacity?: number;
  strokeWidth?: number;
  dot?: boolean;
}

export interface ScatterSeriesConfig extends BaseSeriesConfig {
  shape?: "circle" | "cross" | "diamond" | "square" | "star" | "triangle";
  size?: number;
}

export type SeriesConfig =
  | LineSeriesConfig
  | BarSeriesConfig
  | AreaSeriesConfig
  | PieSeriesConfig
  | RadarSeriesConfig
  | ScatterSeriesConfig;

export interface AxisConfig {
  dataKey?: string;
  label?: string;
  hide?: boolean;
  tickFormatter?: (value: any) => string;
  domain?: [number | string, number | string];
  scale?: "auto" | "linear" | "log" | "sqrt" | "time";
}

export interface GridConfig {
  show?: boolean;
  strokeDasharray?: string;
  horizontal?: boolean;
  vertical?: boolean;
}

export interface TooltipConfig {
  show?: boolean;
  formatter?: (value: any, name: string) => [string, string];
  labelFormatter?: (label: string) => string;
  cursor?: boolean | object;
}

export interface LegendConfig {
  show?: boolean;
  position?: LegendPosition;
  onClick?: (dataKey: string) => void;
}

export interface ChartConfig {
  data: ChartDataPoint[];
  series: SeriesConfig[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  grid?: GridConfig;
  tooltip?: TooltipConfig;
  legend?: LegendConfig;
}

export interface ChartProps {
  type: ChartType;
  config: ChartConfig;
  variant?: ChartVariant;
  size?: ChartSize;
  title?: string;
  description?: string;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface BaseChartComponentProps {
  config: ChartConfig;
  variant: ChartVariant;
  size: ChartSize;
  hiddenSeries: Set<string>;
}
