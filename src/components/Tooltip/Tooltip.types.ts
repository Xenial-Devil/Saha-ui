import { ReactNode } from "react";

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
export type TooltipTriggerType = "hover" | "click" | "focus" | "manual";

// Context for Tooltip state sharing
export interface TooltipContextValue {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  position: TooltipPosition;
  variant: TooltipVariant;
  size: TooltipSize;
  arrow: boolean;
  interactive: boolean;
  maxWidth: string;
  offset: number;
  trigger: TooltipTriggerType;
  delay: number;
  disabled: boolean;
}

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Composable children (TooltipTrigger and TooltipContent)
   */
  children: ReactNode;

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
  trigger?: TooltipTriggerType;

  /**
   * Whether tooltip is open (for controlled mode)
   */
  open?: boolean;

  /**
   * Callback when tooltip visibility changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Maximum width of the tooltip
   * @default "320px"
   */
  maxWidth?: string;

  /**
   * Whether the tooltip content can be interactive
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

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the tooltip
   */
  children: ReactNode;

  /**
   * Custom class name for the tooltip content
   */
  className?: string;
}

export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element that triggers the tooltip
   */
  children: ReactNode;

  /**
   * Custom class name for the trigger wrapper
   */
  className?: string;

  /**
   * Make trigger element focusable
   * @default false
   */
  asChild?: boolean;
}
