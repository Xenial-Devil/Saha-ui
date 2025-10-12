import React from "react";

/**
 * Input variant types - matches standard library variants
 */
export type InputVariant =
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

/**
 * Input size types
 */
export type InputSize = "sm" | "md" | "lg" | "xl";

/**
 * Valid HTML input types (excluding file)
 */
export type InputType = Exclude<React.HTMLInputTypeAttribute, "file">;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Visual style variant of the input
   * @default "outline"
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @default "md"
   */
  size?: InputSize;

  /**
   * HTML input type (file type is not supported)
   * @default "text"
   */
  type?: InputType;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message (overrides helperText when present)
   */
  error?: string;

  /**
   * Icon to display on the left side
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  endIcon?: React.ReactNode;

  /**
   * Whether to show a character counter
   */
  showCounter?: boolean;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether to apply full width styling
   */
  fullWidth?: boolean;

  /**
   * Custom class for the container wrapper
   */
  containerClassName?: string;

  /**
   * Custom class for the label
   */
  labelClassName?: string;
}
