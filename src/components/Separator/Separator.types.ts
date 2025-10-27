import React from "react";

/**
 * Visual style variant of the Separator
 */
export type SeparatorVariant =
  | "solid"
  | "dashed"
  | "dotted"
  | "gradient"
  | "glass";

/**
 * Orientation of the Separator
 */
export type SeparatorOrientation = "horizontal" | "vertical";

/**
 * Thickness of the Separator
 */
export type SeparatorThickness = "thin" | "medium" | "thick";

/**
 * Spacing around the Separator
 */
export type SeparatorSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Props for the Separator component
 */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default "solid"
   */
  variant?: SeparatorVariant;

  /**
   * Orientation of the Separator
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation;

  /**
   * Thickness of the Separator line
   * @default "thin"
   */
  thickness?: SeparatorThickness;

  /**
   * Spacing around the Separator
   * @default "md"
   */
  spacing?: SeparatorSpacing;

  /**
   * Optional label to display in the Separator
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
