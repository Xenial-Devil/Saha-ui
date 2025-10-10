import { AvatarProps } from "../Avatar/Avatar.types";

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
   * Array of avatar configurations to display
   */
  avatars: Omit<AvatarProps, "size" | "shape">[];

  /**
   * Maximum number of avatars to display before showing "+X more"
   * @default avatars.length
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
   * Custom spacing between avatars (overrides variant defaults)
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
