import type { InputProps } from "../Input/Input.types";

/**
 * Strength level for the password strength indicator
 */
export type PasswordStrength = "weak" | "fair" | "good" | "strong";

/**
 * Props for the PasswordInput component
 *
 * Extends all Input props and adds password-specific features.
 *
 * @example
 * ```tsx
 * <PasswordInput label="Password" showToggle strengthIndicator />
 * ```
 */
export interface PasswordInputProps extends Omit<InputProps, "type" | "endIcon" | "size"> {
  /** Size of the input @default "md" */
  size?: "sm" | "md" | "lg";

  /**
   * Show the visibility toggle button (eye icon)
   * @default true
   */
  showToggle?: boolean;

  /**
   * Show a password strength indicator bar below the input
   * @default false
   */
  strengthIndicator?: boolean;

  /**
   * Override the auto-calculated strength level
   * When provided, the component uses this instead of computing internally.
   */
  strengthLevel?: PasswordStrength;

  /**
   * Custom function to compute password strength
   * Receives the current password value and returns a strength level.
   */
  strengthFn?: (value: string) => PasswordStrength;

  /**
   * Accessible label for the toggle button
   * @default "Toggle password visibility"
   */
  toggleAriaLabel?: string;
}
