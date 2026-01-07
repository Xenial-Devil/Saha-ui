import type { LucideIcon } from "lucide-react";

/**
 * Rating variant types
 */
export type RatingVariant =
  | "default"
  | "primary"
  | "secondary"
  | "gradient"
  | "glass"
  | "outline"
  | "neon"
  | "soft";

/**
 * Rating size types
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
 * Built-in icon types - 80+ icons
 */
export type RatingIcon =
  // Basic shapes
  | "star"
  | "heart"
  | "circle"
  | "square"
  | "diamond"
  | "triangle"
  | "hexagon"
  | "octagon"
  | "pentagon"
  // Expressions & Emotions
  | "smile"
  | "frown"
  | "meh"
  | "laugh"
  | "angry"
  | "thumbsUp"
  | "thumbsDown"
  // Nature & Weather
  | "sun"
  | "moon"
  | "cloud"
  | "snowflake"
  | "droplet"
  | "flame"
  | "leaf"
  | "flower"
  | "tree"
  // Awards & Achievements
  | "award"
  | "trophy"
  | "medal"
  | "crown"
  | "gem"
  | "badge"
  | "ribbon"
  // Energy & Power
  | "zap"
  | "bolt"
  | "sparkle"
  | "sparkles"
  | "rocket"
  | "target"
  // Food & Drinks
  | "coffee"
  | "pizza"
  | "cake"
  | "cookie"
  | "apple"
  | "cherry"
  | "iceCream"
  | "beer"
  | "wine"
  // Animals
  | "cat"
  | "dog"
  | "bird"
  | "fish"
  | "bug"
  | "rabbit"
  | "pawPrint"
  // Entertainment
  | "music"
  | "headphones"
  | "gamepad"
  | "dice"
  | "puzzle"
  | "palette"
  // Communication
  | "messageCircle"
  | "bell"
  | "mail"
  | "send"
  // Objects
  | "gift"
  | "bookmark"
  | "flag"
  | "key"
  | "lock"
  | "lightbulb"
  | "umbrella"
  | "glasses"
  | "watch"
  | "compass"
  // Status
  | "check"
  | "checkCircle"
  | "x"
  | "xCircle"
  | "alertCircle"
  | "info"
  | "help"
  // Misc
  | "ghost"
  | "skull"
  | "anchor"
  | "plane"
  | "car"
  | "home"
  | "building"
  | "mountain"
  | "waves"
  | "infinity"
  | "percent"
  | "dollarSign"
  | "euro"
  | "bitcoin";

/**
 * Predefined color schemes - 25+ options
 */
export type RatingColorScheme =
  // Warm colors
  | "yellow"
  | "amber"
  | "orange"
  | "red"
  | "rose"
  | "pink"
  | "fuchsia"
  // Cool colors
  | "purple"
  | "violet"
  | "indigo"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  // Nature colors
  | "green"
  | "emerald"
  | "lime"
  // Neutral colors
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  // Special
  | "gold"
  | "bronze"
  | "silver"
  | "rainbow";

/**
 * Rating precision types
 */
export type RatingPrecision = "full" | "half";

/**
 * Icon props interface
 */
export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
}

/**
 * Custom icon type - supports various icon libraries
 * Can be:
 * - A React component (Lucide, custom SVG component)
 * - A rendered React element (Iconify, emoji span, etc.)
 */
export type CustomIconComponent =
  | LucideIcon
  | React.ComponentType<IconProps>
  | React.ReactElement<IconProps>;

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
   * Built-in icon type to display (80+ options)
   * @default "star"
   */
  icon?: RatingIcon;

  /**
   * Rating precision (full or half stars)
   * @default "full"
   */
  precision?: RatingPrecision;

  /**
   * Predefined color scheme (25+ options)
   * @default "yellow"
   */
  colorScheme?: RatingColorScheme;

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
   * Custom filled color (overrides colorScheme)
   * Accepts any valid CSS color: hex, rgb, hsl, named colors
   */
  color?: string;

  /**
   * Custom empty color (overrides colorScheme)
   * Accepts any valid CSS color: hex, rgb, hsl, named colors
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
   * Custom icon component (Lucide, Iconify, or any React component)
   */
  customIcon?: CustomIconComponent;

  /**
   * Custom empty icon component
   */
  customEmptyIcon?: CustomIconComponent;

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

  /**
   * Highlight effect on hover
   * @default false
   */
  highlightOnHover?: boolean;

  /**
   * Direction of the rating
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Gap between icons
   * @default "sm"
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}
