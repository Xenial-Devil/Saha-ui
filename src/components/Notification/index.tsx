"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";
import { notificationVariants, notificationContainerVariants } from "./Notification.styles";
import type { 
  NotificationItemType, 
  NotificationProps, 
  NotificationProviderProps, 
  NotificationContextType
} from "./Notification.types";

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};

export const Notification = ({
  id,
  title,
  description,
  variant = "info",
  icon,
  closable = true,
  duration = 5000,
  action,
  showTimestamp,
  timestamp,
  className,
  onDismiss,
}: NotificationProps) => {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, id, onDismiss]);

  return (
    <div className={cn(notificationVariants({ variant }), className)} role="alert">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex gap-3 items-start">
          {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
          <div className="flex flex-col gap-1">
            {title && <h4 className="text-sm font-semibold leading-none tracking-tight">{title}</h4>}
            {description && <div className="text-sm opacity-90">{description}</div>}
            {action && <div className="mt-2 flex items-center gap-2">{action}</div>}
          </div>
        </div>
        {closable && (
          <button
            onClick={() => onDismiss(id)}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-foreground/50 hover:bg-black/5 hover:text-foreground/80 dark:hover:bg-white/10"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        )}
      </div>
      {showTimestamp && timestamp && (
        <div className="mt-2 text-xs opacity-60">
          {timestamp.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
        </div>
      )}
    </div>
  );
};

export const NotificationProvider = ({
  children,
  position = "top-right",
  maxCount = 5,
  gap = 12,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationItemType, "id" | "timestamp">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: NotificationItemType = {
      ...notification,
      id,
      timestamp: new Date(),
    };

    setNotifications((prev) => {
      const updated = [...prev, newNotification];
      if (updated.length > maxCount) {
        return updated.slice(updated.length - maxCount);
      }
      return updated;
    });

    return id;
  }, [maxCount]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const item = prev.find(n => n.id === id);
      if (item?.onClose) item.onClose(id);
      return prev.filter((n) => n.id !== id);
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateNotification = useCallback((id: string, updates: Partial<NotificationItemType>) => {
    setNotifications((prev) => 
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        updateNotification,
      }}
    >
      {children}
      <div 
        className={notificationContainerVariants({ position })}
        style={{ gap: `${gap}px` }}
      >
        {notifications.map((n) => (
          <Notification key={n.id} {...n} onDismiss={removeNotification} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Also expose a default object or Container separately if requested, but provider encompasses it
export default Notification;
