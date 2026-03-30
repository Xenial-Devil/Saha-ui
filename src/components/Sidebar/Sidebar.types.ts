import * as React from "react";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  collapsed?: boolean;

  /**
   * Callback when collapsed state changes
   */
  onCollapsedChange?: (collapsed: boolean) => void;

  /**
   * Main visual variant
   * @default "default"
   */
  variant?: "default" | "glass" | "outline" | "floating";

  /**
   * Theme mode
   * @default "light"
   */
  theme?: "light" | "dark" | "system";

  /**
   * Fixed positioning relative to viewport
   * @default true
   */
  fixed?: boolean;
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element shown when expanded */
  children?: React.ReactNode;
  /** Element shown when collapsed (e.g. mini logo) */
  miniIcon?: React.ReactNode;
}

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode | string;
  tooltipText?: string;
  isNested?: boolean;
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}
