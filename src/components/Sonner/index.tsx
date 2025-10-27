import * as React from "react";
import { cn } from "../../lib/utils";
import {
  sonnerToastVariants,
  sonnerContainerVariants,
  sonnerIconVariants,
} from "./Sonner.styles";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
  Loader2,
} from "lucide-react";

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
export type SonnerPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type SonnerType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

// ============================================================================
// CONTEXT
// ============================================================================

interface Toast {
  id: string;
  type: SonnerType;
  title: string;
  description?: string;
  duration?: number;
  variant?: SonnerVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  dismissible?: boolean;
}

interface SonnerContextValue {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  loading: (title: string, description?: string) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const SonnerContext = React.createContext<SonnerContextValue | undefined>(
  undefined
);

export function useSonner() {
  const context = React.useContext(SonnerContext);
  if (!context) {
    throw new Error("useSonner must be used within SonnerProvider");
  }
  return context;
}

// ============================================================================
// SONNER PROVIDER
// ============================================================================

export interface SonnerProviderProps {
  children: React.ReactNode;
  position?: SonnerPosition;
  duration?: number;
  maxToasts?: number;
  variant?: SonnerVariant;
  expand?: boolean;
  richColors?: boolean;
}

export function SonnerProvider({
  children,
  position = "bottom-right",
  duration = 4000,
  maxToasts = 3,
  variant = "default",
  expand = false,
  richColors = true,
}: SonnerProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(
    (newToast: Omit<Toast, "id">): string => {
      const id = Math.random().toString(36).substring(2, 9);
      const toastWithId: Toast = {
        ...newToast,
        id,
        variant: newToast.variant || variant,
        duration: newToast.duration || duration,
      };

      setToasts((prev) => {
        const updated = [toastWithId, ...prev];
        return updated.slice(0, maxToasts);
      });

      if (
        toastWithId.duration &&
        toastWithId.duration > 0 &&
        toastWithId.type !== "loading"
      ) {
        setTimeout(() => {
          dismiss(id);
        }, toastWithId.duration);
      }

      return id;
    },
    [variant, duration, maxToasts]
  );

  const success = React.useCallback(
    (title: string, description?: string) => {
      return toast({ type: "success", title, description });
    },
    [toast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => {
      return toast({ type: "error", title, description });
    },
    [toast]
  );

  const warning = React.useCallback(
    (title: string, description?: string) => {
      return toast({ type: "warning", title, description });
    },
    [toast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => {
      return toast({ type: "info", title, description });
    },
    [toast]
  );

  const loading = React.useCallback(
    (title: string, description?: string) => {
      return toast({ type: "loading", title, description, duration: 0 });
    },
    [toast]
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: SonnerContextValue = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    dismissAll,
  };

  return (
    <SonnerContext.Provider value={contextValue}>
      {children}
      <SonnerContainer
        toasts={toasts}
        position={position}
        expand={expand}
        richColors={richColors}
        onDismiss={dismiss}
      />
    </SonnerContext.Provider>
  );
}

// ============================================================================
// SONNER CONTAINER
// ============================================================================

interface SonnerContainerProps {
  toasts: Toast[];
  position: SonnerPosition;
  expand: boolean;
  richColors: boolean;
  onDismiss: (id: string) => void;
}

function SonnerContainer({
  toasts,
  position,
  expand,
  richColors,
  onDismiss,
}: SonnerContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      data-slot="sonner-container"
      className={cn(sonnerContainerVariants({ position }))}
    >
      {toasts.map((toast, index) => (
        <SonnerToast
          key={toast.id}
          toast={toast}
          index={index}
          expand={expand}
          richColors={richColors}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

// ============================================================================
// SONNER TOAST
// ============================================================================

interface SonnerToastProps {
  toast: Toast;
  index: number;
  expand: boolean;
  richColors: boolean;
  onDismiss: (id: string) => void;
}

function SonnerToast({
  toast,
  index,
  expand,
  richColors,
  onDismiss,
}: SonnerToastProps) {
  const [isExiting, setIsExiting] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
      toast.onDismiss?.();
    }, 200);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5" />;
      case "error":
        return <XCircle className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      case "loading":
        return <Loader2 className="h-5 w-5 animate-spin" />;
      default:
        return null;
    }
  };

  const getTypeVariant = (): SonnerVariant => {
    if (!richColors) return toast.variant || "default";

    switch (toast.type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return toast.variant || "default";
    }
  };

  return (
    <div
      data-slot="sonner-toast"
      className={cn(
        sonnerToastVariants({ variant: getTypeVariant() }),
        "transform transition-all duration-200",
        isExiting && "opacity-0 scale-95 translate-x-full",
        !expand && index > 0 && "mt-2 scale-95 opacity-80",
        expand && "mt-2",
        isHovered && "scale-100 opacity-100"
      )}
      style={{
        zIndex: 1000 - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        {toast.type !== "default" && (
          <div className={cn(sonnerIconVariants({ type: toast.type }))}>
            {getIcon()}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="font-semibold text-sm">{toast.title}</div>
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}

          {/* Actions */}
          {(toast.action || toast.cancel) && (
            <div className="flex items-center gap-2 mt-3">
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action!.onClick();
                    handleDismiss();
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors"
                >
                  {toast.action.label}
                </button>
              )}
              {toast.cancel && (
                <button
                  onClick={() => {
                    toast.cancel!.onClick?.();
                    handleDismiss();
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-foreground/10 transition-colors"
                >
                  {toast.cancel.label}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {toast.dismissible !== false && (
          <button
            onClick={handleDismiss}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPACT API
// ============================================================================

export interface SonnerProps {
  position?: SonnerPosition;
  duration?: number;
  maxToasts?: number;
  variant?: SonnerVariant;
  expand?: boolean;
  richColors?: boolean;
}

export function Sonner(props: SonnerProps) {
  return <SonnerProvider {...props}>{null}</SonnerProvider>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { SonnerContainer };
export type { Toast, SonnerContextValue };
