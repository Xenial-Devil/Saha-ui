export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastVariant = "solid" | "subtle" | "outline" | "glass";

export type ToastStatus = "info" | "success" | "warning" | "danger";

export type ToastAnimation = "slide" | "fade" | "scale" | "bounce";

export interface ToastProps {
  /** Toast ID (auto-generated if not provided) */
  id?: string;

  /** Toast title */
  title?: string;

  /** Toast description/message */
  description?: string;

  /** Status type affecting color scheme */
  status?: ToastStatus;

  /** Visual variant style */
  variant?: ToastVariant;

  /** Position on screen */
  position?: ToastPosition;

  /** Animation type */
  animation?: ToastAnimation;

  /** Auto dismiss duration in milliseconds (0 to disable) */
  duration?: number;

  /** Show close button */
  closable?: boolean;

  /** Show icon based on status */
  showIcon?: boolean;

  /** Custom icon element */
  icon?: React.ReactNode;

  /** Show progress bar */
  showProgress?: boolean;

  /** Action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** Callback when toast is closed */
  onClose?: () => void;

  /** Additional CSS classes */
  className?: string;

  /** Custom content (overrides title/description) */
  children?: React.ReactNode;

  /** Pause auto-dismiss on hover */
  pauseOnHover?: boolean;

  /** Enable sound notification */
  playSound?: boolean;

  /** Custom z-index */
  zIndex?: number;
}

export interface ToastContextValue {
  /** Add a new toast */
  toast: (options: Omit<ToastProps, "id">) => string;

  /** Add info toast with flexible parameters:
   * - info(description)
   * - info(description, title)
   * - info(description, options)
   * - info(description, title, options)
   */
  info: (
    description: string,
    titleOrOptions?: string | Partial<ToastProps>,
    options?: Partial<ToastProps>
  ) => string;

  /** Add success toast with flexible parameters:
   * - success(description)
   * - success(description, title)
   * - success(description, options)
   * - success(description, title, options)
   */
  success: (
    description: string,
    titleOrOptions?: string | Partial<ToastProps>,
    options?: Partial<ToastProps>
  ) => string;

  /** Add warning toast with flexible parameters:
   * - warning(description)
   * - warning(description, title)
   * - warning(description, options)
   * - warning(description, title, options)
   */
  warning: (
    description: string,
    titleOrOptions?: string | Partial<ToastProps>,
    options?: Partial<ToastProps>
  ) => string;

  /** Add error toast with flexible parameters:
   * - error(description)
   * - error(description, title)
   * - error(description, options)
   * - error(description, title, options)
   */
  error: (
    description: string,
    titleOrOptions?: string | Partial<ToastProps>,
    options?: Partial<ToastProps>
  ) => string;

  /** Close specific toast */
  close: (id: string) => void;

  /** Close all toasts */
  closeAll: () => void;

  /** Update existing toast */
  update: (id: string, options: Partial<ToastProps>) => void;
}

export interface ToastProviderProps {
  /** Default position for all toasts */
  position?: ToastPosition;

  /** Default duration for all toasts */
  duration?: number;

  /** Maximum number of toasts to show */
  max?: number;

  /** Gap between toasts in pixels */
  gap?: number;

  /** Offset from screen edges in pixels */
  offset?: number;

  /** Children components */
  children: React.ReactNode;

  /** Default variant */
  variant?: ToastVariant;

  /** Default animation */
  animation?: ToastAnimation;
}

export interface ToastItemProps extends ToastProps {
  /** Required ID for toast item */
  id: string;

  /** Remove handler */
  onRemove: (id: string) => void;

  /** Index in stack */
  index?: number;
}
