import * as React from "react";
import type { ToggleVariant, ToggleSize } from "./Toggle.styles";

// ============================================================================
// TOGGLE TYPES
// ============================================================================

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /**
   * The variant style of the toggle
   * @default "default"
   */
  variant?: ToggleVariant;

  /**
   * The size of the toggle
   * @default "default"
   */
  size?: ToggleSize;

  /**
   * The controlled pressed state of the toggle
   */
  pressed?: boolean;

  /**
   * The default pressed state when uncontrolled
   * @default false
   */
  defaultPressed?: boolean;

  /**
   * Callback when the pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void;

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Value for use in ToggleGroup
   */
  value?: string;

  /**
   * The content of the toggle
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * When true, the Toggle will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}

// ============================================================================
// TOGGLE GROUP TYPES
// ============================================================================

export interface ToggleGroupSingleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The type of selection
   */
  type: "single";

  /**
   * The controlled value of the toggle group
   */
  value?: string;

  /**
   * The default value when uncontrolled
   */
  defaultValue?: string;

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * The variant style for all toggles in the group
   */
  variant?: ToggleVariant;

  /**
   * The size for all toggles in the group
   */
  size?: ToggleSize;

  /**
   * Whether all toggles in the group are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The orientation of the toggle group
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The toggle elements
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ToggleGroupMultipleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The type of selection
   */
  type: "multiple";

  /**
   * The controlled value of the toggle group
   */
  value?: string[];

  /**
   * The default value when uncontrolled
   */
  defaultValue?: string[];

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string[]) => void;

  /**
   * The variant style for all toggles in the group
   */
  variant?: ToggleVariant;

  /**
   * The size for all toggles in the group
   */
  size?: ToggleSize;

  /**
   * Whether all toggles in the group are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The orientation of the toggle group
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The toggle elements
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export type ToggleGroupProps =
  | ToggleGroupSingleProps
  | ToggleGroupMultipleProps;

// Re-export types from styles
export type { ToggleVariant, ToggleSize };
