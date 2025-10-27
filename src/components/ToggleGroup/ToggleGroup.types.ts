import * as React from "react";
import type {
  ToggleGroupVariant,
  ToggleGroupSize,
  ToggleGroupSpacing,
  ToggleGroupOrientation,
} from "./ToggleGroup.styles";

// ============================================================================
// TOGGLE GROUP TYPES
// ============================================================================

export interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[] | undefined;
  onValueChange: (value: string | string[]) => void;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  spacing?: ToggleGroupSpacing;
  orientation?: ToggleGroupOrientation;
  disabled?: boolean;
}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant style of the toggle group
   * @default "default"
   */
  variant?: ToggleGroupVariant;

  /**
   * The size of the toggle buttons
   * @default "default"
   */
  size?: ToggleGroupSize;

  /**
   * The spacing between toggle buttons
   * @default 1
   */
  spacing?: ToggleGroupSpacing;

  /**
   * The orientation of the toggle group
   * @default "horizontal"
   */
  orientation?: ToggleGroupOrientation;

  /**
   * The type of selection: single (radio) or multiple (checkbox)
   * @default "single"
   */
  type?: "single" | "multiple";

  /**
   * The controlled value (single or array depending on type)
   */
  value?: string | string[];

  /**
   * The default value for uncontrolled usage
   */
  defaultValue?: string | string[];

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Whether the entire group is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The toggle items to render
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The unique value for this toggle item
   */
  value: string;

  /**
   * Whether this specific item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Content to render inside the toggle item
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Re-export style types
export type {
  ToggleGroupVariant,
  ToggleGroupSize,
  ToggleGroupSpacing,
  ToggleGroupOrientation,
};
