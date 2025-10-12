import React from "react";

/**
 * Visual style variant of the divider
 */
export type DividerVariant =
  | "solid"
  | "dashed"
  | "dotted"
  | "gradient"
  | "glass";

/**
 * Orientation of the divider
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Thickness of the divider
 */
export type DividerThickness = "thin" | "medium" | "thick";

/**
 * Spacing around the divider
 */
export type DividerSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Props for the Divider component
 */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default "solid"
   */
  variant?: DividerVariant;

  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * Thickness of the divider line
   * @default "thin"
   */
  thickness?: DividerThickness;

  /**
   * Spacing around the divider
   * @default "md"
   */
  spacing?: DividerSpacing;

  /**
   * Optional label to display in the divider
   */
  label?: React.ReactNode;

  /**
   * Position of the label
   * @default "center"
   */
  labelPosition?: "left" | "center" | "right";

  /**
   * Whether to add decorative icons around the label
   * @default false
   */
  decorative?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
