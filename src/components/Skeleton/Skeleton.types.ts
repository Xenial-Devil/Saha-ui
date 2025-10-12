import React from "react";

/**
 * Skeleton variant types
 */
export type SkeletonVariant =
  | "default"
  | "pulse"
  | "wave"
  | "shimmer"
  | "gradient"
  | "glass";

/**
 * Skeleton shape types
 */
export type SkeletonShape = "rectangle" | "circle" | "rounded" | "text";

/**
 * Skeleton animation speed types
 */
export type SkeletonSpeed = "slow" | "normal" | "fast";

/**
 * Props for the Skeleton component
 *
 * @example
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * <Skeleton variant="pulse" shape="circle" width="48px" height="48px" />
 * <Skeleton variant="shimmer" count={3} />
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
   * @default "100%"
   */
  width?: string | number;

  /**
   * Height of the skeleton (CSS value)
   * @default "20px"
   */
  height?: string | number;

  /**
   * Number of skeleton lines to render
   * @default 1
   */
  count?: number;

  /**
   * Animation speed
   * @default "normal"
   */
  speed?: SkeletonSpeed;

  /**
   * Disable animation
   * @default false
   */
  noAnimation?: boolean;

  /**
   * Custom border radius (only for rectangle shape)
   */
  borderRadius?: string;
}
