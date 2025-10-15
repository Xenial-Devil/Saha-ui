/**
 * Slider component type definitions
 */

/**
 * Slider variant types
 */
export type SliderVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "gradient"
  | "glass";

/**
 * Slider size types
 */
export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Slider orientation types
 */
export type SliderOrientation = "horizontal" | "vertical";

/**
 * Mark configuration for slider
 */
export interface SliderMark {
  value: number;
  label?: string;
}

/**
 * Props for the Slider component
 *
 * @example
 * ```tsx
 * // Basic slider
 * <Slider value={50} onChange={(val) => console.log(val)} />
 *
 * // Range slider
 * <Slider value={[20, 80]} range onChange={(val) => console.log(val)} />
 *
 * // With marks
 * <Slider value={50} marks={[0, 25, 50, 75, 100]} />
 *
 * // Vertical slider
 * <Slider value={50} orientation="vertical" />
 * ```
 */
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The visual style variant of the slider
   * @default "primary"
   */
  variant?: SliderVariant;

  /**
   * The size of the slider
   * @default "md"
   */
  size?: SliderSize;

  /**
   * The orientation of the slider
   * @default "horizontal"
   */
  orientation?: SliderOrientation;

  /**
   * The current value (controlled)
   * Can be a single number or array of two numbers for range slider
   */
  value?: number | number[];

  /**
   * The default value (uncontrolled)
   * Can be a single number or array of two numbers for range slider
   */
  defaultValue?: number | number[];

  /**
   * Whether this is a range slider (two thumbs)
   * @default false
   */
  range?: boolean;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Whether to show value label
   * @default false
   */
  showValue?: boolean;

  /**
   * Whether to show tooltip on hover
   * @default true
   */
  showTooltip?: boolean;

  /**
   * Marks to display on the track
   * Can be an array of numbers or SliderMark objects
   */
  marks?: number[] | SliderMark[];

  /**
   * Whether to show marks
   * @default false
   */
  showMarks?: boolean;

  /**
   * Custom formatter for value display
   */
  valueFormatter?: (value: number) => string;

  /**
   * Callback when value changes
   */
  onChange?: (value: number | number[]) => void;

  /**
   * Callback when value change is committed (mouse up, touch end)
   */
  onChangeCommitted?: (value: number | number[]) => void;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom className for the track
   */
  trackClassName?: string;

  /**
   * Custom className for the filled track
   */
  filledTrackClassName?: string;

  /**
   * Custom className for the thumb
   */
  thumbClassName?: string;

  /**
   * Custom className for marks
   */
  marksClassName?: string;

  /**
   * Whether to show smooth animations
   * @default true
   */
  animated?: boolean;

  /**
   * Accessibility label
   */
  "aria-label"?: string;

  /**
   * Accessibility label for the slider
   */
  "aria-labelledby"?: string;

  /**
   * Accessibility description
   */
  "aria-describedby"?: string;
}
