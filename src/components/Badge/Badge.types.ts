import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from ".";

/**
 * Badge variant types
 * Determines the visual style of the badge
 */
export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * Badge size types
 * Controls the dimensions and text size of the badge
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Badge shape types
 * Defines the border radius style
 */
export type BadgeShape = "rounded" | "pill" | "square";

/**
 * Props for the Badge component
 *
 * @example
 * ```tsx
 * <Badge variant="primary" size="md">New</Badge>
 * <Badge variant="success" dot>Active</Badge>
 * <Badge variant="glass" removable onRemove={() => console.log('removed')}>
 *   Tag
 * </Badge>
 * ```
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual style variant of the badge
   * @default "default"
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * The shape/border radius style
   * @default "rounded"
   */
  shape?: BadgeShape;

  /**
   * Content to display inside the badge
   */
  children?: React.ReactNode;

  /**
   * Show a dot indicator before the text
   * Useful for status indicators
   * @default false
   */
  dot?: boolean;

  /**
   * Make the badge removable with a close button
   * @default false
   */
  removable?: boolean;

  /**
   * Callback fired when the remove button is clicked
   * Only works when removable is true
   */
  onRemove?: () => void;

  /**
   * Custom icon to display before the text
   * Takes precedence over dot if both are provided
   */
  icon?: React.ReactNode;

  /**
   * Add a subtle pulse animation
   * Useful for notifications or live status
   * @default false
   */
  pulse?: boolean;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * When true, the Badge will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}
