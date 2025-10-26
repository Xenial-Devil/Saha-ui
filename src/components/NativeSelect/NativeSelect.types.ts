import type { ReactNode } from "react";

/**
 * Native Select variant types
 */
export type NativeSelectVariant =
  | "default"
  | "bordered"
  | "filled"
  | "ghost"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "pink"
  | "indigo"
  | "cyan"
  | "teal"
  | "orange"
  | "glass";

/**
 * Native Select size types
 */
export type NativeSelectSize = "sm" | "md" | "lg";

/**
 * Native Select option type
 */
export interface NativeSelectOption {
  /**
   * Option value
   */
  value: string | number;

  /**
   * Option label
   */
  label: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Description text below the label
   */
  description?: string;
}

/**
 * Native Select option group type
 */
export interface NativeSelectOptionGroup {
  /**
   * Group label
   */
  label: string;

  /**
   * Options in this group
   */
  options: NativeSelectOption[];
}

/**
 * Props for the NativeSelect component (root)
 */
export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * The select options
   */
  children?: ReactNode;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: NativeSelectVariant;

  /**
   * Size of the select
   * @default "md"
   */
  size?: NativeSelectSize;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the select is in an error state
   */
  error?: boolean;

  /**
   * Whether the select is in a success state
   */
  success?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Value of the select
   */
  value?: string | number;

  /**
   * Default value
   */
  defaultValue?: string | number;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Whether the select allows multiple selections
   */
  multiple?: boolean;

  /**
   * Number of visible options (for multiple select)
   */
  visibleOptions?: number;
}

/**
 * Props for NativeSelectOption component
 */
export interface NativeSelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  /**
   * Option value
   */
  value: string | number;

  /**
   * Option label
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for NativeSelectGroup component
 */
export interface NativeSelectGroupProps
  extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {
  /**
   * Group label
   */
  label: string;

  /**
   * Group options
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for NativeSelectLabel component
 */
export interface NativeSelectLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label content
   */
  children: ReactNode;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * For attribute (id of the select)
   */
  htmlFor?: string;
}

/**
 * Props for NativeSelectDescription component
 */
export interface NativeSelectDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for NativeSelectError component
 */
export interface NativeSelectErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Error message
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for NativeSelectWrapper component
 */
export interface NativeSelectWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wrapper content (label, select, description, error)
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
