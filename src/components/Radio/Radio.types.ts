import { VariantProps } from "class-variance-authority";
import { radioVariants, radioGroupVariants } from "./Radio.styles";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {
  /**
   * Label text for the radio button
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
   * Helper text shown below the radio
   */
  helperText?: string;
  /**
   * Position of the label relative to the radio
   * @default "right"
   */
  labelPosition?: "left" | "right";
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof radioGroupVariants> {
  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
  /**
   * Label for the radio group
   */
  label?: string;
  /**
   * Error message for the group
   */
  error?: string;
  /**
   * Helper text for the group
   */
  helperText?: string;
  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Variant to apply to all radio buttons
   */
  variant?: RadioProps["variant"];
  /**
   * Size to apply to all radio buttons
   */
  size?: RadioProps["size"];
  /**
   * Card mode - renders radios as cards
   * @default false
   */
  card?: boolean;
  /**
   * Card hover effect
   * @default true
   */
  hoverEffect?: boolean;
  /**
   * Options for the radio group
   */
  options?: RadioOption[];
  /**
   * Children (Radio components)
   */
  children?: React.ReactNode;
}

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | React.ReactNode;
  image?: string;
  recommended?: boolean;
}

export interface RadioCardProps extends RadioProps {
  /**
   * Show as a card style radio
   */
  card?: boolean;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Badge to display (e.g., "Popular", "New")
   */
  badge?: string | React.ReactNode;
  /**
   * Image URL for card style
   */
  image?: string;
  /**
   * Show recommended badge
   */
  recommended?: boolean;
  /**
   * Card hover effect
   * @default true
   */
  hoverEffect?: boolean;
}
