import React from "react";

// Variants
export type AlertVariant =
  | "solid"
  | "subtle"
  | "outline"
  | "left-accent"
  | "top-accent"
  | "glass"
  | "gradient"
  | "minimal";

// Status
export type AlertStatus = "info" | "success" | "warning" | "danger" | "neutral";

// Positions (for toast)
export type AlertPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

// Animations
export type AlertAnimation =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "bounce"
  | "none";

// Icon animations
export type IconAnimation = "none" | "pulse" | "spin" | "bounce" | "shake";

// Sizes
export type AlertSize = "sm" | "md" | "lg";

// Rounded
export type AlertRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

// Shadow
export type AlertShadow = "none" | "sm" | "md" | "lg" | "xl";

// Action
export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: "link" | "button";
}

// Main Props
export interface AlertProps {
  /** Unique identifier */
  id?: string;

  /** Visual variant */
  variant?: AlertVariant;

  /** Status/semantic color */
  status?: AlertStatus;

  /** Size */
  size?: AlertSize;

  /** Border radius */
  rounded?: AlertRounded;

  /** Shadow depth */
  shadow?: AlertShadow;

  /** Title text */
  title?: string;

  /** Message content */
  message?: React.ReactNode;

  /** Custom icon (null to hide) */
  icon?: React.ReactNode | null;

  /** Icon animation */
  iconAnimation?: IconAnimation;

  /** Show close button */
  closeable?: boolean;

  /** Close on Escape key */
  closeOnEscape?: boolean;

  /** Close on swipe (mobile) */
  closeOnSwipe?: boolean;

  /** Auto dismiss duration (ms) */
  duration?: number;

  /** Show progress bar */
  showProgress?: boolean;

  /** Pause timer on hover */
  pauseOnHover?: boolean;

  /** Pause timer on focus */
  pauseOnFocus?: boolean;

  /** Primary action */
  action?: AlertAction;

  /** Secondary action */
  secondaryAction?: AlertAction;

  /** Enter/exit animation */
  animation?: AlertAnimation;

  /** Callback when closed */
  onClose?: () => void;

  /** Callback when opened */
  onOpen?: () => void;

  /** Additional class names */
  className?: string;

  /** ARIA role */
  role?: "alert" | "status" | "log";

  /** Controlled open state */
  isOpen?: boolean;

  /** Controlled open change handler */
  onOpenChange?: (open: boolean) => void;
}

// Provider Props
export interface AlertProviderProps {
  children: React.ReactNode;
  position?: AlertPosition;
  maxAlerts?: number;
  spacing?: number;
  reverseOrder?: boolean;
  containerClassName?: string;
  defaultDuration?: number;
  defaultAnimation?: AlertAnimation;
}

// Context Type
export interface AlertContextType {
  show: (props: Omit<AlertProps, "id">) => string;
  update: (id: string, props: Partial<AlertProps>) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  success: (message: string, options?: Partial<AlertProps>) => string;
  error: (message: string, options?: Partial<AlertProps>) => string;
  warning: (message: string, options?: Partial<AlertProps>) => string;
  info: (message: string, options?: Partial<AlertProps>) => string;
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
    options?: Partial<AlertProps>
  ) => Promise<T>;
  alerts: AlertItem[];
}

// Alert Item (for provider)
export interface AlertItem extends AlertProps {
  id: string;
  createdAt: number;
}
