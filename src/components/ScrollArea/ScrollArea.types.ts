import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { scrollAreaRootVariants } from "./ScrollArea.styles";

export type ScrollAreaVariant = VariantProps<
  typeof scrollAreaRootVariants
>["variant"];
export type ScrollOrientation = "vertical" | "horizontal" | "both";

/**
 * Props for the ScrollArea root component
 */
export interface ScrollAreaRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default "default"
   */
  variant?: ScrollAreaVariant;

  /**
   * Scroll orientation
   * @default "vertical"
   */
  orientation?: ScrollOrientation;

  /**
   * Whether to hide the scrollbar
   * @default false
   */
  hideScrollbar?: boolean;

  /**
   * Enable smooth scrolling behavior
   * @default true
   */
  smoothScroll?: boolean;

  /**
   * Auto-hide scrollbar when not scrolling
   * @default true
   */
  autoHide?: boolean;

  /**
   * Delay before auto-hiding scrollbar (ms)
   * @default 1000
   */
  autoHideDelay?: number;

  /**
   * Content to be scrolled
   */
  children?: React.ReactNode;
}

/**
 * Props for the ScrollArea viewport component
 */
export interface ScrollAreaViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to be scrolled
   */
  children?: React.ReactNode;
}

/**
 * Props for the ScrollArea scrollbar component
 */
export interface ScrollAreaScrollbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Scrollbar orientation
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Whether to force show the scrollbar
   * @default false
   */
  forceMount?: boolean;
}

/**
 * Props for the ScrollArea thumb component
 */
export interface ScrollAreaThumbProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Props for the ScrollArea corner component
 */
export interface ScrollAreaCornerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom className
   */
  className?: string;
}
