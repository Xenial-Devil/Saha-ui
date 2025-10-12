import React from "react";
import type { VariantProps } from "class-variance-authority";
import { tooltipVariants } from ".";

// Explicit types for better type safety
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipVariant =
  | "default"
  | "dark"
  | "light"
  | "glass"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type TooltipSize = "sm" | "md" | "lg";
export type TooltipTrigger = "hover" | "click" | "focus" | "manual";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
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

  /**
   * Trigger type for showing tooltip
   * @default "hover"
   */
  trigger?: TooltipTrigger;

  /**
   * Whether tooltip is open (for controlled mode)
   */
  open?: boolean;

  /**
   * Callback when tooltip visibility changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Custom class name for the tooltip content
   */
  tooltipClassName?: string;

  /**
   * Custom class name for the trigger wrapper
   */
  wrapperClassName?: string;

  /**
   * Maximum width of the tooltip
   * @default "320px"
   */
  maxWidth?: string;

  /**
   * Whether the tooltip content can be selected
   * @default false
   */
  interactive?: boolean;

  /**
   * Offset from the trigger element (px)
   * @default 8
   */
  offset?: number;

  /**
   * Whether to disable the tooltip
   * @default false
   */
  disabled?: boolean;
}
