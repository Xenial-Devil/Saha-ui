import React from "react";

/**
 * Visual style variant of the Separator
 */
export type SeparatorVariant =
  | "default"
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
 * Accepts predefined tokens, numbers (px), or string with units
 * @example
 * <Separator spacing="md" />
 * <Separator spacing={16} />
 * <Separator spacing="1rem" />
 */
export type SeparatorSpacing =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | number
  | string;

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
   * Accepts predefined tokens, numbers (px), or string with units
   * @default "md"
   * @example
   * <Separator spacing="lg" />
   * <Separator spacing={20} />
   * <Separator spacing="1.5rem" />
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
