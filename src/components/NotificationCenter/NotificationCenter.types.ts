import React from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  timestamp?: Date | string;
  read?: boolean;
  avatar?: string;
  icon?: React.ReactNode;
  type?: "info" | "success" | "warning" | "error" | "default";
  action?: { label: string; onClick: () => void };
  onClick?: () => void;
}

export interface NotificationCenterProps {
  /** List of notifications */
  notifications: NotificationItem[];

  /** Callback when a notification is marked as read */
  onMarkAsRead?: (id: string) => void;

  /** Callback to mark all as read */
  onMarkAllAsRead?: () => void;

  /** Callback when a notification is dismissed */
  onDismiss?: (id: string) => void;

  /** Callback to clear all notifications */
  onClearAll?: () => void;

  /** Visual variant @default "default" */
  variant?: "default" | "glass" | "outline";

  /** Component size @default "md" */
  size?: "sm" | "md" | "lg";

  /** Title text @default "Notifications" */
  title?: string;

  /** Empty state message @default "No notifications" */
  emptyMessage?: string;

  /** Maximum number to show before scrolling @default 5 */
  maxVisible?: number;

  /** Custom trigger element (replaces default bell icon) */
  trigger?: React.ReactNode;

  /** Additional className */
  className?: string;

  /** Popover placement */
  align?: "start" | "center" | "end";

  /** Popover width */
  width?: number | string;
}
