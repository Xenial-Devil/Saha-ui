import { HTMLAttributes } from "react";

/**
 * Chart variant types
 */
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

/**
 * Chart size types
 */
export type ChartSize = "sm" | "md" | "lg" | "xl";

/**
 * Chart data point structure
 */
export interface ChartDataPoint {
  /** Label for the data point */
  label: string;
  /** Value for the data point */
  value: number;
  /** Optional color override for this specific point */
  color?: string;
  /** Optional series name for multi-series charts */
  series?: string;
}

/**
 * Chart dataset for multi-series charts
 */
export interface ChartDataset {
  /** Dataset label */
  label: string;
  /** Array of data values */
  data: number[];
  /** Optional color for the entire dataset */
  color?: string;
  /** Fill area under line (for line/area charts) */
  fill?: boolean;
}

/**
 * Chart axis configuration
 */
export interface ChartAxis {
  /** Show axis */
  show?: boolean;
  /** Axis label */
  label?: string;
  /** Show grid lines */
  grid?: boolean;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
}

/**
 * Chart legend configuration
 */
export interface ChartLegend {
  /** Show legend */
  show?: boolean;
  /** Legend position */
  position?: "top" | "bottom" | "left" | "right";
  /** Legend alignment */
  align?: "start" | "center" | "end";
}

/**
 * Chart tooltip configuration
 */
export interface ChartTooltip {
  /** Enable tooltips */
  enabled?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, label: string) => string;
}

/**
 * Chart animation configuration
 */
export interface ChartAnimation {
  /** Enable animations */
  enabled?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Animation easing function */
  easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
}

/**
 * Props for the Chart component
 */
export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Chart type */
  type?: "line" | "bar" | "area" | "pie" | "donut" | "radar";

  /** Chart data (simple format) */
  data?: ChartDataPoint[];

  /** Chart datasets (multi-series format) */
  datasets?: ChartDataset[];

  /** Labels for multi-series charts */
  labels?: string[];

  /** Chart variant/color scheme */
  variant?:
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

  /** Chart size */
  size?: "sm" | "md" | "lg" | "xl";

  /** Chart height (CSS value) */
  height?: string | number;

  /** Chart width (CSS value) */
  width?: string | number;

  /** Show chart title */
  title?: string;

  /** Chart description */
  description?: string;

  /** Show legend */
  showLegend?: boolean;

  /** Legend position */
  legendPosition?: "top" | "bottom" | "left" | "right";

  /** Show grid */
  showGrid?: boolean;

  /** Show tooltip */
  showTooltip?: boolean;

  /** Show animation */
  showAnimation?: boolean;

  /** X-axis configuration */
  xAxis?: ChartAxis;

  /** Y-axis configuration */
  yAxis?: ChartAxis;

  /** Legend configuration */
  legend?: ChartLegend;

  /** Tooltip configuration */
  tooltip?: ChartTooltip;

  /** Animation configuration */
  animation?: ChartAnimation;

  /** Enable glass morphism effect */
  glass?: boolean;

  /** Enable glow effect on hover */
  glow?: boolean;

  /** Enable smooth curves (for line/area charts) */
  smooth?: boolean;

  /** Enable stacked mode (for bar/area charts) */
  stacked?: boolean;

  /** Enable zoom functionality */
  zoom?: boolean;

  /** Show data labels on chart */
  showLabels?: boolean;

  /** Custom color palette (array of colors) */
  colors?: string[];

  /** Loading state */
  loading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Custom className for the chart container */
  className?: string;

  /** Custom className for the chart canvas */
  canvasClassName?: string;

  /** Callback when a data point is clicked */
  onDataPointClick?: (dataPoint: ChartDataPoint, index: number) => void;
}
