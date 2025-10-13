import { ReactNode } from "react";

/**
 * Size options for AvatarGroup
 */
export type AvatarGroupSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Variant options for AvatarGroup layout
 */
export type AvatarGroupVariant = "stack" | "grid" | "grid-dense" | "row";

/**
 * Props for the AvatarGroup component
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar components as children
   */
  children: ReactNode;

  /**
   * Maximum number of avatars to display before showing "+X more"
   * If not specified, all avatars will be shown
   */
  max?: number;

  /**
   * Size for all avatars in the group
   * @default "md"
   */
  size?: AvatarGroupSize;

  /**
   * Layout variant
   * @default "stack"
   */
  variant?: AvatarGroupVariant;

  /**
   * Show total count of avatars (including hidden ones)
   * @default false
   */
  showCount?: boolean;

  /**
   * Render avatars in reverse order (last avatar on top in stack)
   * @default false
   */
  reverse?: boolean;

  /**
   * If true, avatars will have space between them. If false, they will overlap.
   * Only applies to 'stack' variant.
   * @default false
   */
  gap?: boolean;

  /**
   * Show ring/border around each avatar (useful for overlapping avatars)
   * @default false
   */
  withRing?: boolean;

  /**
   * Custom spacing between avatars in pixels (overrides gap and variant defaults)
   * Use negative values for custom overlap amount.
   */
  spacing?: number;

  /**
   * Callback when the "+X more" indicator is clicked
   */
  onMoreClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
