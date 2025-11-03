import { VariantProps } from "class-variance-authority";
import { fabVariants } from "./FloatingActionButton.styles";

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  /**
   * Icon to display in the FAB
   * Can be passed as `icon` prop or as children
   * @example
   * // Using icon prop
   * <FloatingActionButton icon={<Plus />} />
   * // Using children
   * <FloatingActionButton><Plus /></FloatingActionButton>
   */
  icon?: React.ReactNode;
  /**
   * Position of the FAB on the screen
   * @default "bottom-right"
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /**
   * Label text (optional, shows on hover)
   */
  label?: string;
  /**
   * Whether to show the label by default
   * @default false
   */
  showLabel?: boolean;
  /**
   * Extended variant - shows label alongside icon
   * @default false
   */
  extended?: boolean;
  /**
   * Custom offset from screen edge
   */
  offset?: {
    x?: number;
    y?: number;
  };
}
