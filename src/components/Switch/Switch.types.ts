import { VariantProps } from "class-variance-authority";
import { switchVariants } from ".";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof switchVariants> {
  /**
   * Label text for the switch
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
   * Helper text shown below the switch
   */
  helperText?: string;
  /**
   * Position of the label relative to the switch
   * @default "right"
   */
  labelPosition?: "left" | "right";
  /**
   * Icon to display when switch is ON
   */
  onIcon?: React.ReactNode;
  /**
   * Icon to display when switch is OFF
   */
  offIcon?: React.ReactNode;
  /**
   * Show loading state
   */
  loading?: boolean;
  /**
   * Badge to display
   */
  badge?: string | React.ReactNode;
  /**
   * Callback when switch state changes
   */
  onCheckedChange?: (checked: boolean) => void;
}
