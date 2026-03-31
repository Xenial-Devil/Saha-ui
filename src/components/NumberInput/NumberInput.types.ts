import React from "react";

/**
 * Props for the NumberInput component
 */
export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value" | "defaultValue" | "size"
  > {
  /** Current value (controlled) */
  value?: number | null;

  /** Default value (uncontrolled) */
  defaultValue?: number;

  /** Callback when value changes */
  onChange?: (value: number | null) => void;

  /** Minimum allowed value */
  min?: number;

  /** Maximum allowed value */
  max?: number;

  /** Step increment/decrement amount @default 1 */
  step?: number;

  /** Number of decimal places to support @default 0 */
  precision?: number;

  /** Visual style variant @default "default" */
  variant?: "default" | "filled" | "outline" | "glass";

  /** Size of the input @default "md" */
  size?: "sm" | "md" | "lg";

  /** Show increment/decrement buttons @default true */
  showControls?: boolean;

  /** Position of control buttons @default "right" */
  controlsPosition?: "right" | "sides";

  /** Label text */
  label?: string;

  /** Helper text shown below input */
  helperText?: string;

  /** Error message (replaces helperText when present) */
  error?: string;

  /** Allow empty input (null value) @default true */
  allowEmpty?: boolean;

  /** Clamp value to min/max on blur @default true */
  clampOnBlur?: boolean;

  /** Format the displayed value */
  formatter?: (value: number) => string;

  /** Parse the displayed value back to number */
  parser?: (value: string) => number;

  /** Full width mode */
  fullWidth?: boolean;

  /** Additional class for container */
  containerClassName?: string;

  /** Additional class for label */
  labelClassName?: string;

  /** Custom increment icon */
  incrementIcon?: React.ReactNode;

  /** Custom decrement icon */
  decrementIcon?: React.ReactNode;
}
