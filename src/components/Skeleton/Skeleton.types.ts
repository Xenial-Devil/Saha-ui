import React from "react";

/**
 * Skeleton variant types
 *
 * - default: Simple pulse animation
 * - pulse: Enhanced pulse with custom timing
 * - wave: Sweeping wave effect from left to right
 * - shimmer: Fast shimmer with primary color accent
 * - gradient: Gradient flow animation
 * - glass: Glass morphism effect with backdrop blur
 * - glow: Glowing effect with shadow
 */
export type SkeletonVariant =
  | "default"
  | "pulse"
  | "wave"
  | "shimmer"
  | "gradient"
  | "glass"
  | "glow";

/**
 * Skeleton shape types
 *
 * - rectangle: Standard rectangular shape with medium rounded corners
 * - circle: Perfect circle shape (aspect-square)
 * - rounded: Rounded rectangle with larger border radius
 * - text: Small height for text line simulation
 * - card: Card-like shape with extra large rounded corners
 * - button: Button-sized shape
 * - input: Input field sized shape
 * - avatar: Circle avatar shape
 */
export type SkeletonShape =
  | "rectangle"
  | "circle"
  | "rounded"
  | "text"
  | "card"
  | "button"
  | "input"
  | "avatar";

/**
 * Skeleton animation speed types
 *
 * - slow: 3s duration - subtle, calm loading
 * - normal: 1.5s duration - balanced loading
 * - fast: 1s duration - energetic loading
 * - ultra-fast: 0.6s duration - very quick loading
 */
export type SkeletonSpeed = "slow" | "normal" | "fast" | "ultra-fast";

/**
 * Skeleton container spacing types
 * Accepts predefined tokens, numbers (px), or string with units
 * @example
 * <Skeleton spacing="tight" />
 * <Skeleton spacing={16} />
 * <Skeleton spacing="1rem" />
 */
export type SkeletonSpacing =
  | "tight"
  | "normal"
  | "loose"
  | "relaxed"
  | number
  | string;

/**
 * Props for the Skeleton component
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * ```
 *
 * @example
 * Avatar skeleton:
 * ```tsx
 * <Skeleton variant="shimmer" shape="circle" width="48px" height="48px" />
 * ```
 *
 * @example
 * Multiple text lines:
 * ```tsx
 * <Skeleton variant="pulse" shape="text" count={3} />
 * ```
 *
 * @example
 * Card skeleton:
 * ```tsx
 * <Skeleton variant="wave" shape="card" height="200px" />
 * ```
 */
export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Visual style variant of the skeleton
   * @default "default"
   */
  variant?: SkeletonVariant;

  /**
   * Shape of the skeleton
   * @default "rectangle"
   */
  shape?: SkeletonShape;

  /**
   * Width of the skeleton (CSS value)
   * Can be a number (converted to px) or a string with units
   * @default "100%"
   */
  width?: string | number;

  /**
   * Height of the skeleton (CSS value)
   * Can be a number (converted to px) or a string with units
   * @default "20px"
   */
  height?: string | number;

  /**
   * Number of skeleton lines to render
   * When count > 1, skeletons are stacked vertically with gap
   * @default 1
   */
  count?: number;

  /**
   * Animation speed
   * @default "normal"
   */
  speed?: SkeletonSpeed;

  /**
   * Disable animation completely
   * Useful for reducing motion for accessibility
   * @default false
   */
  noAnimation?: boolean;

  /**
   * Custom border radius (only for rectangle shape)
   * Overrides the default border radius for the shape
   */
  borderRadius?: string;

  /**
   * Spacing between multiple skeletons when count > 1
   * @default "normal"
   */
  spacing?: SkeletonSpacing;

  /**
   * Custom CSS class names for additional styling
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Props for preset skeleton components
 */
export interface SkeletonPresetProps
  extends Omit<
    SkeletonProps,
    "width" | "height" | "shape" | "count" | "spacing"
  > {
  /**
   * Custom CSS class names
   */
  className?: string;
}

/**
 * Props for Card Skeleton component
 */
export interface SkeletonCardProps extends SkeletonPresetProps {
  /**
   * Show image skeleton at the top
   * @default true
   */
  showImage?: boolean;

  /**
   * Image height
   * @default "200px"
   */
  imageHeight?: string;

  /**
   * Number of text lines
   * @default 3
   */
  lines?: number;

  /**
   * Show action button skeleton
   * @default true
   */
  showActions?: boolean;
}

/**
 * Props for Avatar Skeleton component
 */
export interface SkeletonAvatarProps extends SkeletonPresetProps {
  /**
   * Size of the avatar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Show name text skeleton next to avatar
   * @default false
   */
  showText?: boolean;

  /**
   * Number of text lines when showText is true
   * @default 2
   */
  lines?: number;
}

/**
 * Props for List Skeleton component
 */
export interface SkeletonListProps extends SkeletonPresetProps {
  /**
   * Number of list items
   * @default 3
   */
  items?: number;

  /**
   * Show avatar in each list item
   * @default true
   */
  showAvatar?: boolean;

  /**
   * Avatar size
   * @default "md"
   */
  avatarSize?: "sm" | "md" | "lg";

  /**
   * Number of text lines per item
   * @default 2
   */
  lines?: number;
}

/**
 * Props for Table Skeleton component
 */
export interface SkeletonTableProps extends SkeletonPresetProps {
  /**
   * Number of rows
   * @default 5
   */
  rows?: number;

  /**
   * Number of columns
   * @default 4
   */
  columns?: number;

  /**
   * Show table header
   * @default true
   */
  showHeader?: boolean;
}

/**
 * Props for Form Skeleton component
 */
export interface SkeletonFormProps extends SkeletonPresetProps {
  /**
   * Number of form fields
   * @default 4
   */
  fields?: number;

  /**
   * Show submit button skeleton
   * @default true
   */
  showButton?: boolean;
}

/**
 * Props for Text Skeleton component
 */
export interface SkeletonTextProps extends SkeletonPresetProps {
  /**
   * Number of text lines
   * @default 3
   */
  lines?: number;

  /**
   * Last line width percentage
   * @default 60
   */
  lastLineWidth?: number;
}
