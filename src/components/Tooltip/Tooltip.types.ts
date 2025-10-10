import React from "react";

// Explicit types for better type safety
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "default" | "dark" | "light" | "glass" | "primary";
export type TooltipSize = "sm" | "md" | "lg";

export interface TooltipProps {
  /**
   * Content to display in the tooltip
   */
  content: string | React.ReactNode;

  /**
   * Element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  position?: TooltipPosition;

  /**
   * Visual style variant of the tooltip
   * @default "default"
   */
  variant?: TooltipVariant;

  /**
   * Size of the tooltip
   * @default "md"
   */
  size?: TooltipSize;

  /**
   * Delay before showing tooltip (ms)
   * @default 200
   */
  delay?: number;

  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  arrow?: boolean;
}
