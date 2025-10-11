import React from "react";

/**
 * Orientation of the button group
 */
export type ButtonGroupOrientation = "horizontal" | "vertical";

/**
 * Variant style for the button group
 */
export type ButtonGroupVariant = "default" | "outline" | "ghost" | "glass";

/**
 * Size of buttons in the group
 */
export type ButtonGroupSize = "sm" | "md" | "lg" | "xl";

/**
 * Props for the ButtonGroup component
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the button group
   * @default "default"
   */
  variant?: ButtonGroupVariant;

  /**
   * Size of buttons in the group
   * @default "md"
   */
  size?: ButtonGroupSize;

  /**
   * Orientation of the button group
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation;

  /**
   * Whether the button group should be fully rounded (pill style)
   * @default false
   */
  fullRounded?: boolean;

  /**
   * Whether the buttons should fill the container width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether to attach buttons together (no gap)
   * @default true
   */
  attached?: boolean;

  /**
   * Button elements to group together
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
