import React from "react";
import type { VariantProps } from "class-variance-authority";
import { popoverVariants } from "./Popover.styles";

/**
 * Position of the popover relative to the trigger
 */
export type PopoverPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/**
 * Visual style variant of the popover
 */
export type PopoverVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "glass"
  | "bordered"
  | "elevated"
  | "flat";

/**
 * Size of the popover
 */
export type PopoverSize = "sm" | "md" | "lg" | "xl";

/**
 * Trigger type for showing popover
 */
export type PopoverTrigger = "click" | "hover" | "focus" | "manual";

/**
 * Props for the Popover component
 */
export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "title">,
    VariantProps<typeof popoverVariants> {
  /**
   * Content to display in the popover
   */
  content: React.ReactNode;

  /**
   * Element that triggers the popover
   */
  children: React.ReactNode;

  /**
   * Position of the popover relative to the trigger
   * @default "bottom"
   */
  position?: PopoverPosition;

  /**
   * Visual style variant of the popover
   * @default "default"
   */
  variant?: PopoverVariant;

  /**
   * Size of the popover
   * @default "md"
   */
  size?: PopoverSize;

  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  arrow?: boolean;

  /**
   * Trigger type for showing popover
   * @default "click"
   */
  trigger?: PopoverTrigger;

  /**
   * Whether popover is open (for controlled mode)
   */
  open?: boolean;

  /**
   * Callback when popover visibility changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Custom class name for the popover content
   */
  popoverClassName?: string;

  /**
   * Custom class name for the wrapper
   */
  wrapperClassName?: string;

  /**
   * Custom class name for the arrow
   */
  arrowClassName?: string;

  /**
   * Maximum width of the popover
   * @default "320px"
   */
  maxWidth?: string;

  /**
   * Offset distance from trigger (in pixels)
   * @default 12
   */
  offset?: number;

  /**
   * Whether to close when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether to close when pressing Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show close button
   * @default false
   */
  showCloseButton?: boolean;

  /**
   * Optional title for the popover
   */
  title?: React.ReactNode;

  /**
   * Optional footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether the popover content is interactive
   * @default true
   */
  interactive?: boolean;

  /**
   * Delay before showing popover (ms, for hover trigger)
   * @default 0
   */
  delay?: number;

  /**
   * Whether to disable portal rendering
   * @default false
   */
  disablePortal?: boolean;
}
