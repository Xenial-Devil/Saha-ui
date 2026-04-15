import { ReactNode } from "react";

export type NotificationVariant = "info" | "success" | "warning" | "error";
export type NotificationPosition = 
  | "top-left" | "top-center" | "top-right" 
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface NotificationItemType {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: NotificationVariant;
  icon?: ReactNode;
  closable?: boolean;
  duration?: number;
  onClose?: (id: string) => void;
  action?: ReactNode;
  showTimestamp?: boolean;
  timestamp?: Date;
  className?: string;
}

export interface NotificationProps extends NotificationItemType {
  onDismiss: (id: string) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
  position?: NotificationPosition;
  maxCount?: number;
  gap?: number;
}

export interface NotificationContextType {
  notifications: NotificationItemType[];
  addNotification: (notification: Omit<NotificationItemType, "id" | "timestamp">) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  updateNotification: (id: string, updates: Partial<NotificationItemType>) => void;
}
