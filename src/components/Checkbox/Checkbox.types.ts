import { VariantProps } from "class-variance-authority";
import { checkboxVariants } from "./Checkbox.styles";

/**
 * Checkbox component props with full accessibility support.
 * Extends native input props with custom variants and ARIA attributes.
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text for the checkbox
   * @example "Accept terms and conditions"
   */
  label?: string;
  /**
   * Description text shown below the label
   * Automatically linked via aria-describedby
   * @example "You must accept to continue"
   */
  description?: string;
  /**
   * Error message to display
   * Automatically announced to screen readers with role="alert"
   * @example "This field is required"
   */
  error?: string;
  /**
   * Helper text shown below the checkbox
   * Automatically linked via aria-describedby
   * @example "Select this option to receive updates"
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
  /**
   * Accessible label for screen readers when visual label is not present
   * @example "Accept terms"
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this checkbox
   * @example "terms-label"
   */
  "aria-labelledby"?: string;
  /**
   * IDs of elements that describe this checkbox
   * Multiple IDs separated by spaces
   * @example "terms-description terms-helper"
   */
  "aria-describedby"?: string;
}

/**
 * CheckboxGroup component props with coordinated state management.
 * Manages multiple checkboxes as a single form control.
 */
export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Name for the checkbox group
   * Applied to all child checkboxes
   * @example "interests"
   */
  name?: string;
  /**
   * Label for the group
   * Automatically linked to group via aria-labelledby
   * @example "Select your interests"
   */
  label?: string;
  /**
   * Description for the group
   * Automatically linked via aria-describedby
   * @example "Choose all that apply"
   */
  description?: string;
  /**
   * Error message for the group
   * Automatically announced to screen readers with role="alert"
   * @example "Please select at least one option"
   */
  error?: string;
  /**
   * Helper text for the group
   * Automatically linked via aria-describedby
   * @example "You can select multiple options"
   */
  helperText?: string;
  /**
   * Selected values (controlled)
   * @example ["sports", "music"]
   */
  value?: string[];
  /**
   * Default selected values (uncontrolled)
   * @example ["sports"]
   */
  defaultValue?: string[];
  /**
   * Callback when selection changes
   * @param values - Array of selected checkbox values
   * @example (values) => console.log("Selected:", values)
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
  /**
   * ID of element that labels this group
   * @example "interests-label"
   */
  "aria-labelledby"?: string;
  /**
   * IDs of elements that describe this group
   * Multiple IDs separated by spaces
   * @example "interests-description interests-helper"
   */
  "aria-describedby"?: string;
  /**
   * Indicates whether the group is required
   * @example "true"
   */
  "aria-required"?: "true" | "false";
}

/**
 * Options for individual checkbox in a CheckboxGroup
 */
export interface CheckboxOption {
  /**
   * Display label for the checkbox
   * @example "Premium Plan"
   */
  label: string;
  /**
   * Unique value identifier
   * @example "premium"
   */
  value: string;
  /**
   * Additional descriptive text
   * @example "Includes all premium features"
   */
  description?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Custom icon to display when checked
   */
  icon?: React.ReactNode;
  /**
   * Badge to display on the checkbox
   * @example "Popular"
   */
  badge?: string | React.ReactNode;
  /**
   * Image URL for card-style checkboxes
   * @example "/images/premium.jpg"
   */
  image?: string;
  /**
   * Mark as recommended option
   */
  recommended?: boolean;
}
