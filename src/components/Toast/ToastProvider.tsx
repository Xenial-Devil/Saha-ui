"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type {
  ToastProviderProps,
  ToastContextValue,
  ToastProps,
  ToastPosition,
} from "./Toast.types";
import { ToastItem } from "./ToastItem";
import { cn } from "../../lib/utils";

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

interface ToastWithId extends ToastProps {
  id: string;
}

// Position classes for toast containers
const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  duration = 5000,
  max = 5,
  gap = 12,
  offset = 16,
  variant = "solid",
  animation = "slide",
}) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const generateId = () =>
    `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const toast = useCallback(
    (options: Omit<ToastProps, "id">): string => {
      const id = generateId();
      const newToast: ToastWithId = {
        id,
        position: options.position || position,
        duration: options.duration ?? duration,
        variant: options.variant || variant,
        animation: options.animation || animation,
        ...options,
      };

      setToasts((prev) => {
        // Limit max toasts
        const updated = [...prev, newToast];
        if (updated.length > max) {
          return updated.slice(-max);
        }
        return updated;
      });

      return id;
    },
    [position, duration, max, variant, animation]
  );

  const close = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setToasts([]);
  }, []);

  const update = useCallback((id: string, options: Partial<ToastProps>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...options } : t))
    );
  }, []);

  // Shorthand methods with flexible parameters
  // 1 param: description
  // 2 params: description, title
  // 3 params: description, title, options
  const info = useCallback(
    (
      description: string,
      titleOrOptions?: string | Partial<ToastProps>,
      options?: Partial<ToastProps>
    ) => {
      if (typeof titleOrOptions === "string") {
        return toast({
          description,
          title: titleOrOptions,
          status: "info",
          ...options,
        });
      }
      return toast({ description, status: "info", ...titleOrOptions });
    },
    [toast]
  );

  const success = useCallback(
    (
      description: string,
      titleOrOptions?: string | Partial<ToastProps>,
      options?: Partial<ToastProps>
    ) => {
      if (typeof titleOrOptions === "string") {
        return toast({
          description,
          title: titleOrOptions,
          status: "success",
          ...options,
        });
      }
      return toast({ description, status: "success", ...titleOrOptions });
    },
    [toast]
  );

  const warning = useCallback(
    (
      description: string,
      titleOrOptions?: string | Partial<ToastProps>,
      options?: Partial<ToastProps>
    ) => {
      if (typeof titleOrOptions === "string") {
        return toast({
          description,
          title: titleOrOptions,
          status: "warning",
          ...options,
        });
      }
      return toast({ description, status: "warning", ...titleOrOptions });
    },
    [toast]
  );

  const error = useCallback(
    (
      description: string,
      titleOrOptions?: string | Partial<ToastProps>,
      options?: Partial<ToastProps>
    ) => {
      if (typeof titleOrOptions === "string") {
        return toast({
          description,
          title: titleOrOptions,
          status: "danger",
          ...options,
        });
      }
      return toast({ description, status: "danger", ...titleOrOptions });
    },
    [toast]
  );

  const contextValue: ToastContextValue = {
    toast,
    info,
    success,
    warning,
    error,
    close,
    closeAll,
    update,
  };

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const pos = toast.position || position;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastWithId[]>);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {Object.entries(toastsByPosition).map(([pos, posToasts]) => (
              <div
                key={pos}
                className={cn(
                  "fixed z-[9999] flex flex-col pointer-events-none",
                  positionClasses[pos as ToastPosition]
                )}
                style={{
                  padding: `${offset}px`,
                  gap: `${gap}px`,
                }}
              >
                {posToasts.map((toast, index) => (
                  <ToastItem
                    key={toast.id}
                    {...toast}
                    onRemove={close}
                    index={index}
                  />
                ))}
              </div>
            ))}
          </>,
          document.body
        )}
    </ToastContext.Provider>
  );
};
