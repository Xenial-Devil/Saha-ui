import React from "react";

// Explicit types for better type safety
export type AlertVariant =
  | "default"
  | "solid"
  | "subtle"
  | "left-accent"
  | "top-accent"
  | "outline"
  | "glass";
export type AlertStatus = "success" | "danger" | "warning" | "info";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the alert
   * @default "default"
   */
  variant?: AlertVariant;

  /**
   * The main message content of the alert
   */
  message?: string;

  /**
   * Optional title displayed above the message
   */
  title?: string;

  /**
   * Semantic status that determines color and icon
   * @default "info"
   */
  status?: AlertStatus;

  /**
   * Whether the alert should have rounded corners
   * @default true
   */
  rounded?: boolean;

  /**
   * Whether the alert can be dismissed with a close button
   * @default false
   */
  closeable?: boolean;
}
