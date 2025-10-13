import React from "react";

/**
 * Spinner variant types
 * Determines the visual style of the spinner
 */
export type SpinnerVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "glass"
  | "gradient";

/**
 * Spinner size types
 * Controls the dimensions of the spinner
 */
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Spinner animation types
 * Defines the animation style
 */
export type SpinnerAnimation = "spin" | "pulse" | "bounce" | "ping";

/**
 * Spinner type/style
 * Defines the visual structure of the spinner
 */
export type SpinnerType =
  | "ring" // Classic ring/border spinner (default)
  | "dots" // Rotating dots around a circle
  | "dashed" // Dashed ring spinner
  | "bars" // Rotating bars/lines
  | "dotRing" // Dots forming a ring
  | "orbit" // Orbiting dots around a center
  | "pulse" // Pulsing concentric circles
  | "square" // Rotating square corners
  | "triangle" // Rotating triangular pattern
  | "wave" // Wave-like bars
  | "spiral" // Spiral rotating pattern
  | "infinity" // Infinity symbol pattern
  | "flower" // Flower petal pattern
  | "grid" // Grid loading pattern
  | "bounce"; // Bouncing dots

/**
 * Props for the Spinner component
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the spinner
   * @default "primary"
   */
  variant?: SpinnerVariant;

  /**
   * Size of the spinner
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * Animation style
   * @default "spin"
   */
  animation?: SpinnerAnimation;

  /**
   * Spinner visual type/structure
   * @default "ring"
   */
  type?: SpinnerType;

  /**
   * Loading text to display below the spinner
   */
  label?: string;

  /**
   * Whether to show the spinner with a backdrop overlay
   * @default false
   */
  fullscreen?: boolean;

  /**
   * Custom speed multiplier for animation
   * @default 1
   */
  speed?: number;

  /**
   * Thickness of the spinner border
   * @default "default"
   */
  thickness?: "thin" | "default" | "thick";

  /**
   * Custom logo or icon to display in the center of the spinner
   * Can be an image URL (string) or a React component (ReactNode)
   */
  logo?: string | React.ReactNode;

  /**
   * Size of the logo relative to spinner size
   * @default "md"
   */
  logoSize?: "xs" | "sm" | "md" | "lg" | "xl";
}
