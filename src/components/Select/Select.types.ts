import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  // Basic props
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;

  // Value props
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  // Options
  options: SelectOption[];

  // Behavior
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;

  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "outline"
    | "glass";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;

  // Advanced features
  maxHeight?: string;
  maxSelections?: number;
  closeOnSelect?: boolean;
  showCheckmarks?: boolean;
  virtualized?: boolean;
  creatable?: boolean;
  onCreateOption?: (inputValue: string) => void;

  // Custom rendering
  renderOption?: (option: SelectOption) => React.ReactNode;
  renderValue?: (value: string | string[]) => React.ReactNode;

  // Icons
  icon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;

  // HTML attributes
  name?: string;
  id?: string;
  className?: string;
  menuClassName?: string;
  optionClassName?: string;

  /**
   * Slot-Styling API: merge a class into each internal part.
   * Individual props (`menuClassName`, `optionClassName`) still win if both are set.
   */
  classNames?: SelectClassNames;
}

export interface SelectClassNames {
  /** The trigger button. */
  trigger?: string;
  /** The dropdown content / listbox container. */
  content?: string;
  /** Each option / item row. */
  item?: string;
  /** The search input (only rendered when `searchable`). */
  searchInput?: string;
}
