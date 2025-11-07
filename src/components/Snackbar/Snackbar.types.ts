import type { VariantProps } from "class-variance-authority";
import { snackbarVariants } from "./Snackbar.styles";

/**
 * Variant props for Snackbar derived from `snackbarVariants`.
 * We omit the `open` variant here to avoid a type conflict with the
 * boolean `open` prop on `SnackbarProps`.
 */
type SnackbarVariantProps = Omit<VariantProps<typeof snackbarVariants>, "open">;

/**
 * Snackbar position types
 * Determines where the snackbar appears on screen
 */
export type SnackbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Snackbar variant types
 * Determines the visual style of the snackbar
 */
export type SnackbarVariant = "default" | "filled" | "outlined" | "soft";

/**
 * Snackbar severity types
 * Indicates the type of message
 */
export type SnackbarSeverity =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Props for the Snackbar component
 *
 * @example
 * ```tsx
 * // Basic snackbar
 * <Snackbar open message="Item saved successfully" />
 *
 * // With severity
 * <Snackbar
 *   open
 *   message="Action completed"
 *   severity="success"
 * />
 *
 * // With action button
 * <Snackbar
 *   open
 *   message="Item deleted"
 *   action={<Button size="sm">Undo</Button>}
 * />
 *
 * // Auto-hide
 * <Snackbar
 *   open={open}
 *   message="Notification"
 *   autoHideDuration={3000}
 *   onClose={() => setOpen(false)}
 * />
 *
 * // Custom position
 * <Snackbar
 *   open
 *   message="Message"
 *   position="top-right"
 * />
 *
 * // With icon
 * <Snackbar
 *   open
 *   message="Success!"
 *   severity="success"
 *   showIcon
 * />
 * ```
 */
export interface SnackbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "action">,
    SnackbarVariantProps {
  /**
   * Whether the snackbar is visible
   * @default false
   */
  open: boolean;

  /**
   * The message to display
   */
  message: React.ReactNode;

  /**
   * The visual style variant of the snackbar
   * @default "filled"
   */
  variant?: SnackbarVariant;

  /**
   * The severity level (affects color and icon)
   * @default "default"
   */
  severity?: SnackbarSeverity;

  /**
   * Position of the snackbar on screen
   * @default "bottom-center"
   */
  position?: SnackbarPosition;

  /**
   * Optional action button or element
   */
  action?: React.ReactNode;

  /**
   * Optional custom icon
   */
  icon?: React.ReactNode;

  /**
   * Whether to show the default severity icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Whether to show a close button
   * @default true
   */
  showClose?: boolean;

  /**
   * Auto-hide duration in milliseconds
   * Set to null to disable auto-hide
   * @default 6000
   */
  autoHideDuration?: number | null;

  /**
   * Callback when the snackbar is closed
   */
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;

  /**
   * Transition duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Whether to disable clicking outside to close
   * @default false
   */
  disableClickAway?: boolean;

  /**
   * Custom class name for the snackbar
   */
  className?: string;

  /**
   * Custom class name for the message
   */
  messageClassName?: string;

  /**
   * Custom class name for the action
   */
  actionClassName?: string;

  /**
   * Z-index value for the snackbar
   * @default 1400
   */
  zIndex?: number;

  /**
   * Whether to pause auto-hide on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Whether to pause auto-hide on focus within
   * @default true
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Callback when entering (before transition)
   */
  onEnter?: () => void;

  /**
   * Callback when entered (after transition)
   */
  onEntered?: () => void;

  /**
   * Callback when exiting (before transition)
   */
  onExit?: () => void;

  /**
   * Callback when exited (after transition)
   */
  onExited?: () => void;
}
