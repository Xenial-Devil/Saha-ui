import * as React from "react";

/**
 * Sonner variant types
 * Determines the visual style of the toast
 */
export type SonnerVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * Sonner position types
 * Determines where toasts appear on screen
 */
export type SonnerPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Sonner toast types
 * Determines the type and icon of the toast
 */
export type SonnerType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

/**
 * Toast data structure
 */
export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Toast type
   * @default "default"
   */
  type: SonnerType;

  /**
   * Toast title/main message
   */
  title: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * Duration in milliseconds
   * @default 4000
   */
  duration?: number;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: SonnerVariant;

  /**
   * Custom action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Custom cancel button
   */
  cancel?: {
    label: string;
    onClick?: () => void;
  };

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: () => void;

  /**
   * Whether the toast can be dismissed
   * @default true
   */
  dismissible?: boolean;
}

/**
 * Props for the SonnerProvider component
 */
export interface SonnerProviderProps {
  /**
   * Children components wrapped by provider
   */
  children: React.ReactNode;

  /**
   * Default position for toasts
   * @default "bottom-right"
   */
  position?: SonnerPosition;

  /**
   * Default duration for toasts (ms)
   * @default 4000
   */
  duration?: number;

  /**
   * Maximum number of toasts to show
   * @default 3
   */
  maxToasts?: number;

  /**
   * Default variant for toasts
   * @default "default"
   */
  variant?: SonnerVariant;

  /**
   * Expand toasts on hover
   * @default false
   */
  expand?: boolean;

  /**
   * Use rich colors for toast types
   * @default true
   */
  richColors?: boolean;
}

/**
 * Toast function options
 */
export interface ToastOptions extends Omit<Toast, "id"> {
  /**
   * Custom ID for the toast
   */
  id?: string;
}

/**
 * Toast function return type
 */
export type ToastFunction = (title: string, description?: string) => string;

/**
 * Sonner context value
 */
export interface SonnerContextValue {
  /**
   * All active toasts
   */
  toasts: Toast[];

  /**
   * Add a new toast
   */
  toast: (toast: Omit<Toast, "id">) => string;

  /**
   * Show success toast
   */
  success: ToastFunction;

  /**
   * Show error toast
   */
  error: ToastFunction;

  /**
   * Show warning toast
   */
  warning: ToastFunction;

  /**
   * Show info toast
   */
  info: ToastFunction;

  /**
   * Show loading toast
   */
  loading: ToastFunction;

  /**
   * Dismiss a specific toast
   */
  dismiss: (id: string) => void;

  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;

  /**
   * Update an existing toast
   */
  update: (id: string, toast: Partial<Toast>) => void;
}

/**
 * Props for individual toast item
 */
export interface ToastItemProps {
  /**
   * Toast data
   */
  toast: Toast;

  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void;

  /**
   * Toast position
   */
  position: SonnerPosition;
}
