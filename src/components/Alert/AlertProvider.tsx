"use client";

import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import Alert from "./Alert";
import {
  AlertProviderProps,
  AlertContextType,
  AlertItem,
  AlertProps,
} from "./Alert.types";
import {
  positionClasses,
  toastContainerClass,
  toastItemClass,
} from "./Alert.styles";
import { Spinner } from "./Alert.icons";

// Context
export const AlertContext = createContext<AlertContextType | null>(null);

// Generate unique ID
const generateId = (): string => {
  return `alert-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

// Provider Component
export const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  position = "top-right",
  maxAlerts = 5,
  spacing = 12,
  reverseOrder = false,
  containerClassName,
  defaultDuration = 5000,
  defaultAnimation = "slide-left",
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Handle SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show alert
  const show = useCallback(
    (props: Omit<AlertProps, "id">): string => {
      const id = generateId();

      const newAlert: AlertItem = {
        ...props,
        id,
        createdAt: Date.now(),
        duration: props.duration ?? defaultDuration,
        animation: props.animation ?? defaultAnimation,
        closeable: props.closeable ?? true,
        showProgress: props.showProgress ?? true,
      };

      setAlerts((prev) => {
        const updated = reverseOrder
          ? [newAlert, ...prev]
          : [...prev, newAlert];

        // Limit alerts
        return updated.slice(
          reverseOrder ? 0 : -maxAlerts,
          reverseOrder ? maxAlerts : undefined
        );
      });

      return id;
    },
    [maxAlerts, reverseOrder, defaultDuration, defaultAnimation]
  );

  // Update alert
  const update = useCallback((id: string, props: Partial<AlertProps>) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, ...props } : alert))
    );
  }, []);

  // Dismiss alert
  const dismiss = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  // Dismiss all
  const dismissAll = useCallback(() => {
    setAlerts([]);
  }, []);

  // Shorthand: success
  const success = useCallback(
    (message: string, options?: Partial<AlertProps>): string => {
      return show({
        status: "success",
        message,
        ...options,
      });
    },
    [show]
  );

  // Shorthand: error
  const error = useCallback(
    (message: string, options?: Partial<AlertProps>): string => {
      return show({
        status: "danger",
        message,
        duration: 8000,
        ...options,
      });
    },
    [show]
  );

  // Shorthand: warning
  const warning = useCallback(
    (message: string, options?: Partial<AlertProps>): string => {
      return show({
        status: "warning",
        message,
        duration: 6000,
        ...options,
      });
    },
    [show]
  );

  // Shorthand: info
  const info = useCallback(
    (message: string, options?: Partial<AlertProps>): string => {
      return show({
        status: "info",
        message,
        ...options,
      });
    },
    [show]
  );

  // Promise handler
  const promise = useCallback(
    async <T,>(
      promiseFn: Promise<T>,
      messages: { loading: string; success: string; error: string },
      options?: Partial<AlertProps>
    ): Promise<T> => {
      const id = show({
        status: "info",
        message: messages.loading,
        icon: <Spinner />,
        closeable: false,
        duration: undefined,
        showProgress: false,
        ...options,
      });

      try {
        const result = await promiseFn;
        dismiss(id);
        success(messages.success, options);
        return result;
      } catch (err) {
        dismiss(id);
        error(messages.error, options);
        throw err;
      }
    },
    [show, dismiss, success, error]
  );

  // Context value
  const contextValue = useMemo<AlertContextType>(
    () => ({
      show,
      update,
      dismiss,
      dismissAll,
      success,
      error,
      warning,
      info,
      promise,
      alerts,
    }),
    [
      show,
      update,
      dismiss,
      dismissAll,
      success,
      error,
      warning,
      info,
      promise,
      alerts,
    ]
  );

  // Check if position is bottom
  const isBottom = position.includes("bottom");

  return (
    <AlertContext.Provider value={contextValue}>
      {children}

      {/* Toast Container Portal */}
      {mounted &&
        createPortal(
          <div
            role="region"
            aria-label="Notifications"
            aria-live="polite"
            className={cn(
              toastContainerClass,
              positionClasses[position],
              containerClassName
            )}
            style={{ gap: spacing }}
          >
            {(isBottom ? [...alerts].reverse() : alerts).map((alert, index) => (
              <div
                key={alert.id}
                className={toastItemClass}
                style={{ zIndex: alerts.length - index }}
              >
                <Alert {...alert} onClose={() => dismiss(alert.id)} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
