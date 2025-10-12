/**
 * Progress variant types
 * Determines the visual style of the progress bar
 */
export type ProgressVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "gradient"
  | "striped"
  | "glass";

/**
 * Progress size types
 * Controls the height of the progress bar
 */
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Progress shape types
 * Defines the border radius style
 */
export type ProgressShape = "rounded" | "pill" | "square";

/**
 * Progress animation types
 * Controls the animation style
 */
export type ProgressAnimation = "none" | "pulse" | "shimmer" | "indeterminate";

/**
 * Props for the Progress component
 *
 * @example
 * ```tsx
 * <Progress value={75} variant="primary" />
 * <Progress value={50} size="lg" showValue />
 * <Progress value={100} variant="success" animation="pulse" />
 * ```
 */
export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * The visual style variant of the progress bar
   * @default "default"
   */
  variant?: ProgressVariant;

  /**
   * The size of the progress bar
   * @default "md"
   */
  size?: ProgressSize;

  /**
   * The shape of the progress bar
   * @default "rounded"
   */
  shape?: ProgressShape;

  /**
   * The animation style
   * @default "none"
   */
  animation?: ProgressAnimation;

  /**
   * The current progress value (0-100)
   * @default 0
   */
  value?: number;

  /**
   * The maximum value
   * @default 100
   */
  max?: number;

  /**
   * Whether to show the percentage value
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom label to display instead of percentage
   */
  label?: string;

  /**
   * Position of the label
   * @default "inside"
   */
  labelPosition?: "inside" | "outside" | "top";

  /**
   * Custom color for the progress bar
   */
  color?: string;

  /**
   * Custom background color for the track
   */
  trackColor?: string;

  /**
   * Whether to show a striped pattern
   * @default false
   */
  striped?: boolean;

  /**
   * Whether to animate the stripes
   * @default false
   */
  stripedAnimated?: boolean;

  /**
   * Whether to show a glow effect
   * @default false
   */
  glow?: boolean;

  /**
   * Custom value formatter function
   */
  valueFormat?: (value: number, max: number) => string;

  /**
   * Custom className for the progress bar (not the container)
   */
  barClassName?: string;

  /**
   * Custom className for the label
   */
  labelClassName?: string;

  /**
   * Whether the progress bar is indeterminate (loading state)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Accessibility label
   */
  "aria-label"?: string;
}
