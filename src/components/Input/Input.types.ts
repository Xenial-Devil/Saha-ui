import React from "react";

/**
 * Input variant types - matches standard library variants
 * @example
 * <Input variant="default" />
 * <Input variant="outline" />
 * <Input variant="ghost" />
 * <Input variant="primary" />
 */
export type InputVariant =
  | "default"
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
 * @example
 * <Input size="sm" />
 * <Input size="md" />
 * <Input size="lg" />
 */
export type InputSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Valid HTML input types (excluding file)
 */
export type InputType = Exclude<React.HTMLInputTypeAttribute, "file">;

/**
 * Props for the Input component
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter text" />
 *
 * // With label and helper text
 * <Input label="Email" helperText="We'll never share your email" />
 *
 * // With error state
 * <Input label="Username" error="Username is required" />
 *
 * // With icons
 * <Input startIcon={<SearchIcon />} placeholder="Search..." />
 *
 * // With accessibility
 * <Input aria-label="Search" aria-describedby="search-help" />
 * ```
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Visual style variant of the input
   * @default "default"
   * @example
   * ```tsx
   * <Input variant="default" />
   * <Input variant="outline" />
   * <Input variant="ghost" />
   * <Input variant="primary" />
   * ```
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @default "md"
   * @example
   * ```tsx
   * <Input size="sm" placeholder="Small input" />
   * <Input size="md" placeholder="Medium input" />
   * <Input size="lg" placeholder="Large input" />
   * ```
   */
  size?: InputSize;

  /**
   * HTML input type (file type is not supported)
   * @default "text"
   * @example
   * ```tsx
   * <Input type="text" />
   * <Input type="email" />
   * <Input type="password" />
   * <Input type="number" />
   * ```
   */
  type?: InputType;

  /**
   * Label text for the input
   * Automatically creates an accessible label element
   * @example
   * ```tsx
   * <Input label="Email Address" />
   * <Input label="Password" type="password" />
   * ```
   */
  label?: string;

  /**
   * Helper text displayed below the input
   * Provides additional context or instructions
   * @example
   * ```tsx
   * <Input
   *   label="Password"
   *   helperText="Must be at least 8 characters"
   * />
   * ```
   */
  helperText?: string;

  /**
   * Error message (overrides helperText when present)
   * Displays error state and message
   * @example
   * ```tsx
   * <Input
   *   label="Email"
   *   error="Please enter a valid email address"
   * />
   * ```
   */
  error?: string;

  /**
   * Icon to display on the left side of the input
   * @example
   * ```tsx
   * <Input startIcon={<SearchIcon />} placeholder="Search..." />
   * <Input startIcon={<UserIcon />} placeholder="Username" />
   * ```
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   * @example
   * ```tsx
   * <Input endIcon={<EyeIcon />} type="password" />
   * <Input endIcon={<CheckIcon />} value={validatedValue} />
   * ```
   */
  endIcon?: React.ReactNode;

  /**
   * Whether to show a character counter
   * Displays current length / maxLength
   * @default false
   * @example
   * ```tsx
   * <Input maxLength={100} showCounter />
   * ```
   */
  showCounter?: boolean;

  /**
   * Whether the field is required
   * Adds required indicator and HTML validation
   * @default false
   * @example
   * ```tsx
   * <Input label="Email" required />
   * ```
   */
  required?: boolean;

  /**
   * Whether to apply full width styling
   * Makes input take 100% of container width
   * @default false
   * @example
   * ```tsx
   * <Input fullWidth />
   * ```
   */
  fullWidth?: boolean;

  /**
   * Custom class for the container wrapper
   * Applied to the outermost container div
   * @example
   * ```tsx
   * <Input containerClassName="mb-4" />
   * ```
   */
  containerClassName?: string;

  /**
   * Custom class for the label element
   * @example
   * ```tsx
   * <Input label="Name" labelClassName="font-bold" />
   * ```
   */
  labelClassName?: string;

  /**
   * Accessible label for the input
   * Use when label prop is not provided
   * @example
   * ```tsx
   * <Input aria-label="Search articles" placeholder="Search..." />
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this input
   * @example
   * ```tsx
   * <span id="email-label">Email Address</span>
   * <Input aria-labelledby="email-label" />
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this input
   * Automatically set when helperText or error is provided
   * @example
   * ```tsx
   * <Input aria-describedby="email-help" />
   * <span id="email-help">We'll never share your email</span>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * Indicates the input has an error
   * Automatically set to true when error prop is provided
   * @example
   * ```tsx
   * <Input aria-invalid={hasError} />
   * ```
   */
  "aria-invalid"?: boolean | "true" | "false";

  /**
   * Indicates the input value is required
   * Automatically set when required prop is true
   * @example
   * ```tsx
   * <Input aria-required={true} />
   * ```
   */
  "aria-required"?: boolean | "true" | "false";

  /**
   * Provides error message for screen readers
   * @example
   * ```tsx
   * <Input aria-errormessage="email-error" />
   * <span id="email-error" role="alert">Invalid email format</span>
   * ```
   */
  "aria-errormessage"?: string;
}
