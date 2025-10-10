import React from "react";

// Explicit types for better type safety
export type LinkVariant = "default" | "primary" | "muted" | "underline" | "ghost" | "button";
export type LinkSize = "sm" | "md" | "lg";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
   * Link content
   */
  children: React.ReactNode;
}
