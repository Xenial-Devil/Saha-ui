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

export interface SelectProps {
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
}
