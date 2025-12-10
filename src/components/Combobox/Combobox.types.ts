import React from "react";

export type ComboboxSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type ComboboxVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost"
  | "glass"
  | "outline";

export type ComboboxPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

// Conditional types based on multiple selection
export interface ComboboxPropsBase {
  /** Options (props-based API) */
  options?: ComboboxOption[] | ComboboxGroup[];

  /** Children (component-based API) */
  children?: React.ReactNode;

  /** Placeholder text */
  placeholder?: string;

  /** Label */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Visual variant */
  variant?: ComboboxVariant;

  /** Size */
  size?: ComboboxSize;

  /** Searchable/filterable */
  searchable?: boolean;

  /** Search placeholder */
  searchPlaceholder?: string;

  /** Clearable */
  clearable?: boolean;

  /** Disabled */
  disabled?: boolean;

  /** Read-only */
  readOnly?: boolean;

  /** Required */
  required?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Create new options on the fly */
  creatable?: boolean;

  /** Create option text template */
  createText?: string | ((inputValue: string) => string);

  /** Allow deselection */
  allowDeselect?: boolean;

  /** Auto-complete behavior */
  autoComplete?: boolean;

  /** Auto-highlight first option */
  autoHighlight?: boolean;

  /** Close on select (default: true for single, false for multiple) */
  closeOnSelect?: boolean;

  /** Open on focus */
  openOnFocus?: boolean;

  /** Dropdown placement */
  placement?: ComboboxPlacement;

  /** Disable portaling (render inline) */
  disablePortal?: boolean;

  /** Max dropdown height */
  maxHeight?: string;

  /** Show checkmarks in options */
  showCheckmarks?: boolean;

  /** Show option avatars */
  showAvatars?: boolean;

  /** Show option descriptions */
  showDescriptions?: boolean;

  /** Empty message */
  emptyMessage?: string | React.ReactNode;

  /** Loading message */
  loadingMessage?: string | React.ReactNode;

  /** Max selected display (for multiple) */
  maxDisplay?: number;

  /** Filter function */
  filterOptions?: (
    options: ComboboxOption[],
    inputValue: string
  ) => ComboboxOption[];

  /** Custom option renderer */
  renderOption?: (option: ComboboxOption) => React.ReactNode;

  /** Custom value renderer */
  renderValue?: (value: string | string[]) => React.ReactNode;

  /** Custom trigger renderer */
  renderTrigger?: (props: {
    value: string | string[];
    placeholder: string;
    open: boolean;
    disabled: boolean;
  }) => React.ReactNode;

  /** Handlers */
  onOpen?: () => void;
  onClose?: () => void;
  onSearch?: (value: string) => void;
  onCreateOption?: (inputValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  /** Styling */
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;

  /** Input props */
  name?: string;
  id?: string;

  /** Accessibility */
  "aria-label"?: string;
  "aria-describedby"?: string;
}

// Single selection props
export interface ComboboxSingleProps extends ComboboxPropsBase {
  /** Multiple selection disabled */
  multiple?: false;

  /** Controlled value */
  value?: string;

  /** Default value (uncontrolled) */
  defaultValue?: string;

  /** Change handler */
  onChange?: (value: string) => void;
}

// Multiple selection props
export interface ComboboxMultipleProps extends ComboboxPropsBase {
  /** Multiple selection enabled */
  multiple: true;

  /** Controlled value */
  value?: string[];

  /** Default value (uncontrolled) */
  defaultValue?: string[];

  /** Change handler */
  onChange?: (value: string[]) => void;
}

// Union type for component props
export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

// Component API types
export interface ComboboxTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface ComboboxContentProps {
  children?: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export interface ComboboxSearchProps {
  placeholder?: string;
  className?: string;
}

export interface ComboboxEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ComboboxLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ComboboxGroupProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface ComboboxItemProps {
  value: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface ComboboxSeparatorProps {
  className?: string;
}

export interface ComboboxCreateProps {
  children?: React.ReactNode;
  className?: string;
}
