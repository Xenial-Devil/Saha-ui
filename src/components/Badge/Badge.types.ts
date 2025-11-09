import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from ".";

/**
 * Badge variant types
 * Determines the visual style of the badge
 * @example
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="glass">Glass</Badge>
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
 * Fully accessible badge component with support for status indicators,
 * removable badges, and ARIA attributes for screen readers.
 *
 * @component
 * @example
 * ```tsx
 * // Basic badge
 * <Badge variant="primary" size="md">New</Badge>
 *
 * // Status badge with dot
 * <Badge variant="success" dot>Active</Badge>
 *
 * // Removable badge
 * <Badge variant="glass" removable onRemove={() => console.log('removed')}>
 *   Tag
 * </Badge>
 *
 * // Accessible badge
 * <Badge aria-label="3 new notifications" variant="error">3</Badge>
 * ```
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual style variant of the badge
   * @default "default"
   * @example
   * ```tsx
   * <Badge variant="primary">Primary</Badge>
   * <Badge variant="success">Success</Badge>
   * ```
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge
   * @default "md"
   * @example
   * ```tsx
   * <Badge size="sm">Small</Badge>
   * <Badge size="lg">Large</Badge>
   * ```
   */
  size?: BadgeSize;

  /**
   * The shape/border radius style
   * @default "rounded"
   * @example
   * ```tsx
   * <Badge shape="pill">Pill</Badge>
   * <Badge shape="square">Square</Badge>
   * ```
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
   * @example
   * ```tsx
   * <Badge dot variant="success">Online</Badge>
   * ```
   */
  dot?: boolean;

  /**
   * Make the badge removable with a close button
   * @default false
   * @example
   * ```tsx
   * <Badge removable onRemove={() => handleRemove()}>
   *   Removable
   * </Badge>
   * ```
   */
  removable?: boolean;

  /**
   * Callback fired when the remove button is clicked
   * Only works when removable is true
   * @example
   * ```tsx
   * <Badge removable onRemove={() => console.log('Badge removed')}>
   *   Click X to remove
   * </Badge>
   * ```
   */
  onRemove?: () => void;

  /**
   * Custom icon to display before the text
   * Takes precedence over dot if both are provided
   * @example
   * ```tsx
   * <Badge icon={<CheckIcon />}>Verified</Badge>
   * ```
   */
  icon?: React.ReactNode;

  /**
   * Add a subtle pulse animation
   * Useful for notifications or live status
   * @default false
   * @example
   * ```tsx
   * <Badge pulse variant="error">Live</Badge>
   * ```
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
   * @example
   * ```tsx
   * <Badge asChild>
   *   <span>Custom Element</span>
   * </Badge>
   * ```
   */
  asChild?: boolean;

  /**
   * Accessible label for the badge
   * Provides a descriptive label for screen readers
   * @example
   * ```tsx
   * <Badge aria-label="3 unread messages" variant="error">3</Badge>
   * <Badge aria-label="Premium user status" variant="primary">Pro</Badge>
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this badge
   * @example
   * ```tsx
   * <span id="status-label">User Status</span>
   * <Badge aria-labelledby="status-label" variant="success">Active</Badge>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this badge
   * @example
   * ```tsx
   * <Badge aria-describedby="badge-help" variant="info">Beta</Badge>
   * <span id="badge-help">This feature is in beta testing</span>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * Indicates the current state of the badge
   * Useful for live status indicators
   * @example
   * ```tsx
   * <Badge aria-live="polite" pulse>Updating...</Badge>
   * ```
   */
  "aria-live"?: "off" | "polite" | "assertive";

  /**
   * Indicates whether the badge content is relevant
   * @example
   * ```tsx
   * <Badge aria-atomic="true">5</Badge>
   * ```
   */
  "aria-atomic"?: boolean | "true" | "false";
}
