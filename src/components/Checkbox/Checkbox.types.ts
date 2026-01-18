import { VariantProps } from "class-variance-authority";
import { checkboxVariants } from "./Checkbox.styles";

/**
 * Checkbox check/tick style variants
 */
export type CheckboxCheckStyle =
  | "check"
  | "cross"
  | "dot"
  | "dash"
  | "plus"
  | "star"
  | "heart"
  // New check styles
  | "diamond"
  | "square"
  | "ring"
  | "shield"
  | "thumbsUp"
  | "lightning"
  | "fire"
  | "leaf"
  | "eye"
  | "lock"
  | "unlock"
  | "bookmark"
  | "flag"
  | "bell"
  | "crown"
  | "zap"
  | "target"
  | "award"
  | "checkCircle"
  | "checkDouble";

/**
 * Checkbox shape variants
 */
export type CheckboxShape =
  | "square"
  | "rounded"
  | "circle"
  | "pill"
  // New shapes
  | "roundedSm"
  | "roundedLg"
  | "roundedXl"
  | "diamond"
  | "hexagon"
  | "octagon"
  | "shield"
  | "leaf"
  | "blob"
  | "squircle";

/**
 * Checkbox animation variants
 */
export type CheckboxAnimation =
  | "none"
  | "scale"
  | "bounce"
  | "slide"
  | "fade"
  | "spin"
  // New animations
  | "pulse"
  | "shake"
  | "flip"
  | "jelly"
  | "rubberBand"
  | "swing"
  | "tada"
  | "heartbeat";

/**
 * Checkbox fill style
 */
export type CheckboxFillStyle =
  | "filled"
  | "outline"
  | "soft"
  | "ghost"
  // New fill styles
  | "gradient"
  | "striped"
  | "glass"
  | "neon"
  | "glow"
  | "shadow"
  | "dotted"
  | "dashed"
  | "double"
  | "3d"
  | "inset"
  | "raised";

/**
 * Predefined color schemes
 */
export type CheckboxColorScheme =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  // Extended colors
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  // New gradient schemes
  | "gradientSunset"
  | "gradientOcean"
  | "gradientForest"
  | "gradientFire"
  | "gradientNight"
  | "gradientRainbow"
  | "gradientNeon"
  | "gradientPastel"
  | "gradientMetallic"
  | "gradientAurora";

/**
 * Checkbox component props
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text for the checkbox
   */
  label?: React.ReactNode;

  /**
   * Description text shown below the label
   */
  description?: React.ReactNode;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text shown below the checkbox
   */
  helperText?: string;

  /**
   * Position of the label relative to the checkbox
   * @default "right"
   */
  labelPosition?: "left" | "right" | "top" | "bottom";

  /**
   * Custom icon to display when checked
   */
  icon?: React.ReactNode;

  /**
   * Predefined check style
   * @default "check"
   */
  checkStyle?: CheckboxCheckStyle;

  /**
   * Shape of the checkbox
   * @default "rounded"
   */
  shape?: CheckboxShape;

  /**
   * Animation when toggling
   * @default "scale"
   */
  animation?: CheckboxAnimation;

  /**
   * Fill style of the checkbox
   * @default "filled"
   */
  fillStyle?: CheckboxFillStyle;

  /**
   * Predefined color scheme
   * @default "primary"
   */
  colorScheme?: CheckboxColorScheme;

  /**
   * Custom checked background color (overrides colorScheme)
   */
  checkedColor?: string;

  /**
   * Custom border color
   */
  borderColor?: string;

  /**
   * Custom check icon color
   */
  checkColor?: string;

  /**
   * Custom unchecked background color
   */
  uncheckedColor?: string;

  /**
   * Custom hover color
   */
  hoverColor?: string;

  /**
   * Custom focus ring color
   */
  focusColor?: string;

  /**
   * Indeterminate state (partial selection)
   */
  indeterminate?: boolean;

  /**
   * Badge to display
   */
  badge?: string | React.ReactNode;

  /**
   * Show in card style
   */
  card?: boolean;

  /**
   * Card hover effect
   * @default true
   */
  hoverEffect?: boolean;

  /**
   * Recommended flag (shows indicator)
   */
  recommended?: boolean;

  /**
   * Image URL for card style
   */
  image?: string;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Read-only state (non-interactive but visible)
   */
  readOnly?: boolean;

  /**
   * Required indicator
   */
  required?: boolean;

  /**
   * Show required asterisk
   * @default true when required
   */
  showRequiredIndicator?: boolean;

  /**
   * Tooltip text
   */
  tooltip?: string;

  /**
   * Ring/glow effect on focus
   * @default true
   */
  ringEffect?: boolean;

  /**
   * Callback when checkbox state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Additional class for the wrapper
   */
  wrapperClassName?: string;

  /**
   * Additional class for the label
   */
  labelClassName?: string;

  /**
   * Additional class for the checkbox box
   */
  boxClassName?: string;

  /**
   * Custom gradient for gradient fill styles
   */
  gradient?: string;

  /**
   * Shadow intensity for shadow/3d fill styles
   */
  shadowIntensity?: "sm" | "md" | "lg" | "xl";

  /**
   * Glow intensity for neon/glow fill styles
   */
  glowIntensity?: "sm" | "md" | "lg" | "xl";
}

/**
 * CheckboxGroup component props
 */
export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Name for the checkbox group
   */
  name?: string;

  /**
   * Label for the group
   */
  label?: React.ReactNode;

  /**
   * Description for the group
   */
  description?: React.ReactNode;

  /**
   * Error message for the group
   */
  error?: string;

  /**
   * Helper text for the group
   */
  helperText?: string;

  /**
   * Selected values (controlled)
   */
  value?: string[];

  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Callback when selection changes
   */
  onChange?: (values: string[]) => void;

  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Number of columns (for grid layout)
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Variant to apply to all checkboxes
   */
  variant?: CheckboxProps["variant"];

  /**
   * Size to apply to all checkboxes
   */
  size?: CheckboxProps["size"];

  /**
   * Color scheme for all checkboxes
   */
  colorScheme?: CheckboxColorScheme;

  /**
   * Shape for all checkboxes
   */
  shape?: CheckboxShape;

  /**
   * Check style for all checkboxes
   */
  checkStyle?: CheckboxCheckStyle;

  /**
   * Fill style for all checkboxes
   */
  fillStyle?: CheckboxFillStyle;

  /**
   * Animation for all checkboxes
   */
  animation?: CheckboxAnimation;

  /**
   * Card mode
   */
  card?: boolean;

  /**
   * Options for the checkbox group
   */
  options?: CheckboxOption[];

  /**
   * Children (Checkbox components)
   */
  children?: React.ReactNode;

  /**
   * Show select all checkbox
   */
  showSelectAll?: boolean;

  /**
   * Select all label
   * @default "Select All"
   */
  selectAllLabel?: string;

  /**
   * Minimum required selections
   */
  minSelection?: number;

  /**
   * Maximum allowed selections
   */
  maxSelection?: number;

  /**
   * Show selection count
   */
  showCount?: boolean;

  /**
   * Required field
   */
  required?: boolean;

  /**
   * Gap between items
   * @default "md"
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Disabled state for entire group
   */
  disabled?: boolean;
}

/**
 * Options for individual checkbox in a CheckboxGroup
 */
export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | React.ReactNode;
  image?: string;
  recommended?: boolean;
  tooltip?: string;
}
