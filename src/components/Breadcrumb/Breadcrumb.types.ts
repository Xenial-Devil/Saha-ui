import React from "react";

/**
 * Visual style variant of the breadcrumb
 */
export type BreadcrumbVariant =
  | "default"
  | "ghost"
  | "bordered"
  | "pills"
  | "underline";

/**
 * Size of the breadcrumb items
 */
export type BreadcrumbSize = "sm" | "md" | "lg";

/**
 * Separator style
 */
export type BreadcrumbSeparator =
  | "slash"
  | "chevron"
  | "dot"
  | "arrow"
  | "custom";

/**
 * Individual breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Label text for the breadcrumb item
   */
  label: string;

  /**
   * URL/path for the breadcrumb item
   * If not provided, item will be non-clickable
   */
  href?: string;

  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Whether this is the current/active page
   */
  isCurrentPage?: boolean;
}

/**
 * Props for the Breadcrumb component
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItem[];

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: BreadcrumbVariant;

  /**
   * Size of breadcrumb items
   * @default "md"
   */
  size?: BreadcrumbSize;

  /**
   * Separator style between items
   * @default "chevron"
   */
  separator?: BreadcrumbSeparator;

  /**
   * Custom separator element (overrides separator prop)
   */
  customSeparator?: React.ReactNode;

  /**
   * Show home icon for first item
   * @default true
   */
  showHomeIcon?: boolean;

  /**
   * Maximum number of items to show before collapsing
   * Items in the middle will be collapsed with "..."
   */
  maxItems?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}
