import React from "react";

/**
 * Visual style variants for the Button component
 * @example
 * <Button variant="primary">Primary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 */
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

/**
 * Size variants for the Button component
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

/**
 * Props for the Button component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and size
 * <Button variant="primary" size="lg">Large Primary</Button>
 *
 * // Loading state
 * <Button loading>Loading...</Button>
 *
 * // With accessibility
 * <Button aria-label="Submit form">Submit</Button>
 * ```
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default "primary"
   * @example
   * ```tsx
   * <Button variant="primary">Primary Button</Button>
   * <Button variant="outline">Outline Button</Button>
   * <Button variant="ghost">Ghost Button</Button>
   * ```
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default "md"
   * @example
   * ```tsx
   * <Button size="sm">Small</Button>
   * <Button size="md">Medium</Button>
   * <Button size="lg">Large</Button>
   * ```
   */
  size?: ButtonSize;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Show loading spinner and disable button
   * When true, the button will be disabled and show a loading spinner
   * @default false
   * @example
   * ```tsx
   * <Button loading>Saving...</Button>
   * ```
   */
  loading?: boolean;

  /**
   * Render as child element, passing props to the child
   * Uses the Slot pattern to merge props with the child element
   * @default false
   * @example
   * ```tsx
   * <Button asChild>
   *   <a href="/home">Home</a>
   * </Button>
   * ```
   */
  asChild?: boolean;

  /**
   * Accessible label for the button
   * Provides an accessible name for screen readers when button content is not descriptive
   * @example
   * ```tsx
   * <Button aria-label="Close dialog">
   *   <XIcon />
   * </Button>
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this button
   * @example
   * ```tsx
   * <span id="submit-label">Submit Form</span>
   * <Button aria-labelledby="submit-label">→</Button>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this button
   * @example
   * ```tsx
   * <Button aria-describedby="btn-help">Delete</Button>
   * <span id="btn-help">This action cannot be undone</span>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * Indicates the button is pressed (for toggle buttons)
   * @example
   * ```tsx
   * <Button aria-pressed={isActive}>Toggle</Button>
   * ```
   */
  "aria-pressed"?: boolean | "true" | "false" | "mixed";

  /**
   * Indicates the element controlled by this button is expanded
   * @example
   * ```tsx
   * <Button aria-expanded={isOpen}>Menu</Button>
   * ```
   */
  "aria-expanded"?: boolean | "true" | "false";

  /**
   * Indicates this button controls another element
   * @example
   * ```tsx
   * <Button aria-controls="menu-panel">Open Menu</Button>
   * <div id="menu-panel">...</div>
   * ```
   */
  "aria-controls"?: string;

  /**
   * Indicates this button opens a popup menu or dialog
   * @example
   * ```tsx
   * <Button aria-haspopup="menu">Options</Button>
   * <Button aria-haspopup="dialog">Open Dialog</Button>
   * ```
   */
  "aria-haspopup"?:
    | boolean
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog";
}
