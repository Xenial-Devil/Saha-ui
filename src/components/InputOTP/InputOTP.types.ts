import React from "react";

/**
 * Input OTP variant types - matches standard library variants
 */
export type InputOTPVariant =
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
 * Input OTP size types
 */
export type InputOTPSize = "sm" | "md" | "lg" | "xl";

/**
 * Input type for OTP (numeric or alphanumeric)
 */
export type InputOTPType = "numeric" | "alphanumeric" | "text";

/**
 * Props for individual OTP slot (composable API)
 */
export interface InputOTPSlotProps {
  /**
   * Index of the slot
   */
  index: number;

  /**
   * Whether the slot is active (focused)
   */
  isActive?: boolean;

  /**
   * Whether the slot has a value
   */
  hasValue?: boolean;

  /**
   * Custom className for the slot
   */
  className?: string;
}

/**
 * Props for OTP separator (composable API)
 */
export interface InputOTPSeparatorProps {
  /**
   * Custom className for the separator
   */
  className?: string;

  /**
   * Custom separator content
   */
  children?: React.ReactNode;
}

/**
 * Props for OTP group (composable API)
 */
export interface InputOTPGroupProps {
  /**
   * Custom className for the group
   */
  className?: string;

  /**
   * Children slots
   */
  children: React.ReactNode;
}

/**
 * Main InputOTP component props (compact props-based API)
 */
export interface InputOTPProps {
  /**
   * Number of OTP digits
   * @default 6
   */
  length?: number;

  /**
   * Visual style variant
   * @default "outline"
   */
  variant?: InputOTPVariant;

  /**
   * Size of the OTP inputs
   * @default "md"
   */
  size?: InputOTPSize;

  /**
   * Type of OTP input (numeric, alphanumeric, or text)
   * @default "numeric"
   */
  type?: InputOTPType;

  /**
   * Current value of the OTP
   */
  value?: string;

  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Callback when OTP value changes
   */
  onChange?: (value: string) => void;

  /**
   * Callback when OTP is complete
   */
  onComplete?: (value: string) => void;

  /**
   * Whether to mask the input (show dots instead of characters)
   */
  mask?: boolean;

  /**
   * Custom mask character
   * @default "•"
   */
  maskChar?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether to auto-focus the first input on mount
   */
  autoFocus?: boolean;

  /**
   * Pattern to validate each character
   */
  pattern?: RegExp;

  /**
   * Label text
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
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Custom class for the container
   */
  containerClassName?: string;

  /**
   * Custom class for the label
   */
  labelClassName?: string;

  /**
   * Custom class for the OTP input group
   */
  className?: string;

  /**
   * Callback when blur event occurs
   */
  onBlur?: (e: React.FocusEvent) => void;

  /**
   * Callback when focus event occurs
   */
  onFocus?: (e: React.FocusEvent) => void;

  /**
   * Whether to show separator between groups
   */
  showSeparator?: boolean;

  /**
   * Number of digits per group (for visual separation)
   */
  groupSize?: number;

  /**
   * Custom separator content
   */
  separator?: React.ReactNode;

  /**
   * Whether to allow paste
   * @default true
   */
  allowPaste?: boolean;

  /**
   * Children for composable API (InputOTPGroup, InputOTPSlot, InputOTPSeparator)
   */
  children?: React.ReactNode;
}

/**
 * Context value for InputOTP
 */
export interface InputOTPContextValue {
  value: string;
  variant: InputOTPVariant;
  size: InputOTPSize;
  type: InputOTPType;
  disabled?: boolean;
  mask?: boolean;
  maskChar: string;
  activeIndex: number;
  handleChange: (index: number, char: string) => void;
  handleKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
}
