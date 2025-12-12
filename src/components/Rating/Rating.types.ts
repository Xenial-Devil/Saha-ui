/**
 * Rating variant types
 * Determines the visual style of the rating component
 */
export type RatingVariant =
  | "default"
  | "primary"
  | "secondary"
  | "gradient"
  | "glass"
  | "outline";

/**
 * Rating size types
 * Controls the dimensions of the stars
 */
export type RatingSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Rating icon types
 * Defines which icon to use for rating display
 */
export type RatingIcon = "star" | "heart" | "circle" | "diamond";

/**
 * Rating precision types
 * Controls how ratings can be selected
 */
export type RatingPrecision = "full" | "half";

/**
 * Rating component props
 */
export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Current rating value (0 to max)
   * @default 0
   */
  value?: number;

  /**
   * Maximum rating value
   * @default 5
   */
  max?: number;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: RatingVariant;

  /**
   * Size of the rating icons
   * @default "md"
   */
  size?: RatingSize;

  /**
   * Icon type to display
   * @default "star"
   */
  icon?: RatingIcon;

  /**
   * Rating precision (full or half stars)
   * @default "full"
   */
  precision?: RatingPrecision;

  /**
   * Whether the rating is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether the rating is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Show the numeric value next to the rating
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom format for displaying the value
   */
  valueFormat?: (value: number, max: number) => string;

  /**
   * Show count/total text (e.g., "128 reviews")
   */
  count?: number;

  /**
   * Label for the count
   * @default "reviews"
   */
  countLabel?: string;

  /**
   * Color for filled icons
   */
  color?: string;

  /**
   * Color for empty icons
   */
  emptyColor?: string;

  /**
   * Enable hover effect
   * @default true (when not readOnly)
   */
  hoverable?: boolean;

  /**
   * Show tooltips on hover
   */
  showTooltip?: boolean;

  /**
   * Custom tooltip labels for each rating value
   */
  tooltipLabels?: string[];

  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;

  /**
   * Callback when hovering over a rating
   */
  onHover?: (value: number) => void;

  /**
   * Allow clearing the rating by clicking the same value
   * @default true
   */
  allowClear?: boolean;

  /**
   * Custom icon component
   */
  customIcon?: React.ReactNode;

  /**
   * Custom empty icon component
   */
  customEmptyIcon?: React.ReactNode;

  /**
   * Additional class names for the container
   */
  className?: string;

  /**
   * Additional class names for individual icons
   */
  iconClassName?: string;

  /**
   * Animation on change
   * @default true
   */
  animated?: boolean;
}
