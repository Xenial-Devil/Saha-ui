export type AutocompleteSize = "sm" | "md" | "lg";

export type AutocompleteVariant =
  | "default"
  | "filled"
  | "outlined"
  | "ghost"
  | "glass"
  | "primary"
  | "success"
  | "warning"
  | "error";

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}

export interface AutocompleteProps {
  /** Input value */
  value?: string;

  /** Selected option value */
  selectedValue?: string;

  /** Change handler for input */
  onChange?: (value: string) => void;

  /** Select handler for option selection */
  onSelect?: (option: AutocompleteOption) => void;

  /** Blur handler */
  onBlur?: () => void;

  /** Focus handler */
  onFocus?: () => void;

  /** Clear handler */
  onClear?: () => void;

  /** Available options */
  options?: AutocompleteOption[];

  /** Placeholder text */
  placeholder?: string;

  /** Label text */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Visual variant */
  variant?: AutocompleteVariant;

  /** Size */
  size?: AutocompleteSize;

  /** Disabled state */
  disabled?: boolean;

  /** Required field */
  required?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Show clear button */
  clearable?: boolean;

  /** Allow custom values (not in options) */
  freeSolo?: boolean;

  /** Filter options automatically */
  autoFilter?: boolean;

  /** Custom filter function */
  filterOptions?: (
    options: AutocompleteOption[],
    inputValue: string
  ) => AutocompleteOption[];

  /** Minimum characters to show suggestions */
  minChars?: number;

  /** Maximum options to display */
  maxOptions?: number;

  /** Show "No results" message */
  showNoResults?: boolean;

  /** Custom "No results" message */
  noResultsText?: string;

  /** Debounce delay in ms */
  debounce?: number;

  /** Group options by group property */
  groupBy?: boolean;

  /** Highlight matching text */
  highlightMatch?: boolean;

  /** Show option descriptions */
  showDescriptions?: boolean;

  /** Icon position */
  iconPosition?: "start" | "end";

  /** Start icon */
  startIcon?: React.ReactNode;

  /** End icon */
  endIcon?: React.ReactNode;

  /** Dropdown open state (controlled) */
  open?: boolean;

  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;

  /** Auto-select first option */
  autoSelectFirst?: boolean;

  /** Close on select */
  closeOnSelect?: boolean;

  /** Custom render option */
  renderOption?: (
    option: AutocompleteOption,
    inputValue: string
  ) => React.ReactNode;

  /** Custom render input */
  renderInput?: (props: any) => React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Dropdown className */
  dropdownClassName?: string;

  /** Input name attribute */
  name?: string;

  /** Input id attribute */
  id?: string;

  /** Custom children for composable API */
  children?: React.ReactNode;
}
