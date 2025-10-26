import React from "react";

/**
 * HoverCard variant types
 */
export type HoverCardVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * HoverCard size types
 */
export type HoverCardSize = "sm" | "md" | "lg" | "xl";

/**
 * HoverCard position types
 */
export type HoverCardPosition =
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
 * HoverCard animation types
 */
export type HoverCardAnimation = "fade" | "scale" | "slide" | "none";

/**
 * HoverCard context value
 */
export interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  variant?: HoverCardVariant;
  size?: HoverCardSize;
  position?: HoverCardPosition;
  openDelay?: number;
  closeDelay?: number;
}

/**
 * Main HoverCard component props
 */
export interface HoverCardProps {
  /**
   * Visual variant of the hover card
   * @default "default"
   */
  variant?: HoverCardVariant;

  /**
   * Size of the hover card content
   * @default "md"
   */
  size?: HoverCardSize;

  /**
   * Position of the hover card relative to trigger
   * @default "bottom"
   */
  position?: HoverCardPosition;

  /**
   * Delay before opening (in milliseconds)
   * @default 200
   */
  openDelay?: number;

  /**
   * Delay before closing (in milliseconds)
   * @default 300
   */
  closeDelay?: number;

  /**
   * Animation type
   * @default "fade"
   */
  animation?: HoverCardAnimation;

  /**
   * Whether the hover card is controlled
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean;

  /**
   * Children elements (HoverCardTrigger and HoverCardContent)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HoverCardTrigger component props
 */
export interface HoverCardTriggerProps {
  /**
   * Render as child element (passes props to child)
   */
  asChild?: boolean;

  /**
   * Children elements
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HoverCardContent component props
 */
export interface HoverCardContentProps {
  /**
   * Children elements
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to show arrow
   * @default true
   */
  showArrow?: boolean;

  /**
   * Custom width
   */
  width?: string | number;

  /**
   * Whether content should avoid collisions with viewport edges
   * @default true
   */
  avoidCollisions?: boolean;

  /**
   * Padding from viewport edges when avoiding collisions
   * @default 8
   */
  collisionPadding?: number;

  /**
   * Whether the content should align with the trigger
   * @default true
   */
  align?: "start" | "center" | "end";

  /**
   * Side offset from trigger
   * @default 8
   */
  sideOffset?: number;
}

/**
 * HoverCardCompact component props (simplified API)
 */
export interface HoverCardCompactProps {
  /**
   * Trigger element
   */
  trigger: React.ReactNode;

  /**
   * Content to display in hover card
   */
  content: React.ReactNode;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: HoverCardVariant;

  /**
   * Size of the hover card
   * @default "md"
   */
  size?: HoverCardSize;

  /**
   * Position relative to trigger
   * @default "bottom"
   */
  position?: HoverCardPosition;

  /**
   * Animation type
   * @default "fade"
   */
  animation?: HoverCardAnimation;

  /**
   * Delay before opening (ms)
   * @default 200
   */
  openDelay?: number;

  /**
   * Delay before closing (ms)
   * @default 300
   */
  closeDelay?: number;

  /**
   * Whether to show arrow
   * @default true
   */
  showArrow?: boolean;

  /**
   * Custom width
   */
  width?: string | number;

  /**
   * Additional CSS classes for content
   */
  className?: string;

  /**
   * Additional CSS classes for trigger
   */
  triggerClassName?: string;

  /**
   * Whether trigger should render as child
   * @default false
   */
  asChild?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
