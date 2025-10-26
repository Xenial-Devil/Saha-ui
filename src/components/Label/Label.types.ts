import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { labelVariants } from "./Label.styles";

/**
 * Label variant types
 * Determines the visual style of the label
 */
export type LabelVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  | "outline"
  | "glass";

/**
 * Label size types
 * Controls the dimensions and font size
 */
export type LabelSize = "sm" | "md" | "lg";

/**
 * Label position for floating labels
 */
export type LabelPosition = "top" | "left" | "right" | "floating";

/**
 * Props for the Label component
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 *
 * // With variant
 * <Label variant="primary" required>Username</Label>
 *
 * // Floating label
 * <Label position="floating" htmlFor="input">Floating Label</Label>
 *
 * // With description
 * <Label>
 *   Email
 *   <LabelDescription>We'll never share your email</LabelDescription>
 * </Label>
 * ```
 */
export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
    VariantProps<typeof labelVariants> {
  /**
   * The label text or content
   */
  children: ReactNode;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: LabelVariant;

  /**
   * Size of the label
   * @default "md"
   */
  size?: LabelSize;

  /**
   * Position of the label (for floating labels)
   * @default "top"
   */
  position?: LabelPosition;

  /**
   * Whether the field is required
   * Adds a required indicator (*)
   * @default false
   */
  required?: boolean;

  /**
   * Whether the field is optional
   * Adds an optional indicator
   * @default false
   */
  optional?: boolean;

  /**
   * Whether the label is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * ID of the form element this label is for
   */
  htmlFor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom required indicator text
   * @default "*"
   */
  requiredIndicator?: ReactNode;

  /**
   * Custom optional indicator text
   * @default "(optional)"
   */
  optionalIndicator?: ReactNode;

  /**
   * Whether to show a help icon
   * @default false
   */
  showHelp?: boolean;

  /**
   * Help text to display in tooltip
   */
  helpText?: string;

  /**
   * Error state
   * @default false
   */
  error?: boolean;
}

/**
 * Props for the LabelGroup component
 *
 * @example
 * ```tsx
 * <LabelGroup>
 *   <Label htmlFor="firstName">First Name</Label>
 *   <Label htmlFor="lastName">Last Name</Label>
 * </LabelGroup>
 * ```
 */
export interface LabelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The labels in the group
   */
  children: ReactNode;

  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Spacing between labels
   * @default "md"
   */
  spacing?: "sm" | "md" | "lg";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the LabelDescription component (sub-component)
 */
export interface LabelDescriptionProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The description text
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the LabelError component (sub-component)
 */
export interface LabelErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The error text
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the LabelRequired component (sub-component)
 */
export interface LabelRequiredProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom indicator (default: *)
   */
  children?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the LabelOptional component (sub-component)
 */
export interface LabelOptionalProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom indicator (default: (optional))
   */
  children?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
