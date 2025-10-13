import { VariantProps } from "class-variance-authority";
import { checkboxVariants } from ".";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Description text shown below the label
   */
  description?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text shown below the checkbox
   */
  helperText?: string;
  /**
   * Position of the label relative to the checkbox
   * @default "right"
   */
  labelPosition?: "left" | "right";
  /**
   * Icon to display when checked
   */
  icon?: React.ReactNode;
  /**
   * Indeterminate state (partial selection)
   */
  indeterminate?: boolean;
  /**
   * Badge to display
   */
  badge?: string | React.ReactNode;
  /**
   * Show in card style
   */
  card?: boolean;
  /**
   * Card hover effect
   * @default true
   */
  hoverEffect?: boolean;
  /**
   * Recommended flag
   */
  recommended?: boolean;
  /**
   * Image URL for card style
   */
  image?: string;
  /**
   * Callback when checkbox state changes
   */
  onCheckedChange?: (checked: boolean) => void;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Name for the checkbox group
   */
  name?: string;
  /**
   * Label for the group
   */
  label?: string;
  /**
   * Description for the group
   */
  description?: string;
  /**
   * Error message for the group
   */
  error?: string;
  /**
   * Helper text for the group
   */
  helperText?: string;
  /**
   * Selected values
   */
  value?: string[];
  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: string[];
  /**
   * Callback when selection changes
   */
  onChange?: (values: string[]) => void;
  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Variant to apply to all checkboxes
   */
  variant?: CheckboxProps["variant"];
  /**
   * Size to apply to all checkboxes
   */
  size?: CheckboxProps["size"];
  /**
   * Card mode
   */
  card?: boolean;
  /**
   * Options for the checkbox group
   */
  options?: CheckboxOption[];
  /**
   * Children (Checkbox components)
   */
  children?: React.ReactNode;
}

export interface CheckboxOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | React.ReactNode;
  image?: string;
  recommended?: boolean;
}
