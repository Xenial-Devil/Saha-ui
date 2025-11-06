import React from "react";

// Explicit types for better type safety
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "outline"
  | "ghost"
  | "glass";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Show loading spinner and disable button
   * @default false
   */
  loading?: boolean;

  /**
   * Render as child element, passing props to the child
   * @default false
   */
  asChild?: boolean;
}
