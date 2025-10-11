import React from "react";

// Explicit types for better type safety
export type LinkVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "underline"
  | "ghost"
  | "button"
  | "glass";

export type LinkSize = "sm" | "md" | "lg";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual style variant of the link
   * @default "default"
   */
  variant?: LinkVariant;

  /**
   * Size of the link
   * @default "md"
   */
  size?: LinkSize;

  /**
   * Whether to show an external link icon
   * @default false
   */
  external?: boolean;

  /**
   * Whether the link is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show an animated underline effect
   * @default false
   */
  showUnderline?: boolean;

  /**
   * Custom icon to display before the text
   */
  icon?: React.ReactNode;

  /**
   * Link content
   */
  children: React.ReactNode;
}
