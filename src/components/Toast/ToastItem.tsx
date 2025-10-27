import React, { useEffect, useState, useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { ToastItemProps } from "./Toast.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

// CVA variants for Toast - Clean, Thin, and Beautiful Design
const toastVariants = cva(
  "relative flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-[450px] shadow-lg transition-all duration-300 ease-out overflow-hidden pointer-events-auto rounded-xl border-2",
  {
    variants: {
      variant: {
        solid: "shadow-md border-transparent",
        subtle: "backdrop-blur-md border-current/30 shadow-md",
        outline: "bg-card backdrop-blur-sm shadow-xl dark:bg-card",
        glass: "bg-background/40 backdrop-blur-xl border-white/20 shadow-xl",
      },
      status: {
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      animation: {
        slide: "",
        fade: "",
        scale: "",
        bounce: "",
      },
    },
    compoundVariants: [
      // Solid variant - clean solid colors
      {
        variant: "solid",
        status: "info",
        className: "bg-info text-info-foreground border-info",
      },
      {
        variant: "solid",
        status: "success",
        className: "bg-success text-success-foreground border-success",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning text-warning-foreground border-warning",
      },
      {
        variant: "solid",
        status: "danger",
        className: "bg-danger text-danger-foreground border-danger",
      },
      // Subtle variant - Better contrast
      {
        variant: "subtle",
        status: "info",
        className:
          "bg-info/15 text-info border-info/40 dark:bg-info/25 dark:text-info-foreground dark:border-info/50",
      },
      {
        variant: "subtle",
        status: "success",
        className:
          "bg-success/15 text-success border-success/40 dark:bg-success/25 dark:text-success-foreground dark:border-success/50",
      },
      {
        variant: "subtle",
        status: "warning",
        className:
          "bg-warning/15 text-warning border-warning/40 dark:bg-warning/25 dark:text-warning-foreground dark:border-warning/50",
      },
      {
        variant: "subtle",
        status: "danger",
        className:
          "bg-danger/15 text-danger border-danger/40 dark:bg-danger/25 dark:text-danger-foreground dark:border-danger/50",
      },
      // Outline variant - Much better visibility with strong borders
      {
        variant: "outline",
        status: "info",
        className:
          "border-info/90 text-info bg-info/5 dark:bg-info/15 dark:border-info dark:text-info-foreground shadow-info/20",
      },
      {
        variant: "outline",
        status: "success",
        className:
          "border-success/90 text-success bg-success/5 dark:bg-success/15 dark:border-success dark:text-success-foreground shadow-success/20",
      },
      {
        variant: "outline",
        status: "warning",
        className:
          "border-warning/90 text-warning bg-warning/5 dark:bg-warning/15 dark:border-warning dark:text-warning-foreground shadow-warning/20",
      },
      {
        variant: "outline",
        status: "danger",
        className:
          "border-danger/90 text-danger bg-danger/5 dark:bg-danger/15 dark:border-danger dark:text-danger-foreground shadow-danger/20",
      },
      // Glass variant - Better visibility with stronger borders and backgrounds
      {
        variant: "glass",
        status: "info",
        className:
          "text-info border-info/40 bg-info/10 dark:border-info/50 dark:bg-info/15",
      },
      {
        variant: "glass",
        status: "success",
        className:
          "text-success border-success/40 bg-success/10 dark:border-success/50 dark:bg-success/15",
      },
      {
        variant: "glass",
        status: "warning",
        className:
          "text-warning border-warning/40 bg-warning/10 dark:border-warning/50 dark:bg-warning/15",
      },
      {
        variant: "glass",
        status: "danger",
        className:
          "text-danger border-danger/40 bg-danger/10 dark:border-danger/50 dark:bg-danger/15",
      },
    ],
    defaultVariants: {
      variant: "solid",
      status: "info",
      animation: "slide",
    },
  }
);

// Icon components for each status
const StatusIcons = {
  info: (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  danger: (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export const ToastItem: React.FC<ToastItemProps> = ({
  id,
  title,
  description,
  status = "info",
  variant = "solid",
  animation = "slide",
  duration = 5000,
  closable = true,
  showIcon = true,
  icon,
  showProgress = true,
  action,
  onClose,
  onRemove,
  className,
  children,
  pauseOnHover = true,
  position = "top-right",
}) => {
  // Development-only validation
  useEffect(() => {
    const validator = createValidator("ToastItem");

    // Validate status
    validator.validateEnum("status", status, [
      "info",
      "success",
      "warning",
      "danger",
    ] as const);

    // Validate variant
    validator.validateEnum("variant", variant, [
      "solid",
      "subtle",
      "outline",
      "glass",
    ] as const);

    // Validate animation
    validator.validateEnum("animation", animation, [
      "slide",
      "fade",
      "scale",
      "bounce",
    ] as const);

    // Validate position
    validator.validateEnum("position", position, [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ] as const);

    // Validate duration
    validator.validateType("duration", duration, "number", isValidNumber);
    if (duration !== undefined && duration < 0) {
      validator.error("duration must be a positive number");
    }

    // Validate boolean props
    validator.validateType("closable", closable, "boolean", isValidBoolean);
    validator.validateType("showIcon", showIcon, "boolean", isValidBoolean);
    validator.validateType(
      "showProgress",
      showProgress,
      "boolean",
      isValidBoolean
    );
    validator.validateType(
      "pauseOnHover",
      pauseOnHover,
      "boolean",
      isValidBoolean
    );

    // Validate content
    if (!title && !description && !children) {
      validator.warn(
        "ToastItem should have title, description, or children for accessibility"
      );
    }

    // Common validators
    commonValidators.className(validator, className);
  }, [
    status,
    variant,
    animation,
    position,
    duration,
    closable,
    showIcon,
    showProgress,
    pauseOnHover,
    title,
    description,
    children,
    className,
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  // Animation classes based on position and animation type
  const getAnimationClasses = () => {
    if (!isVisible && !isExiting) {
      // Initial state (entering)
      switch (animation) {
        case "slide":
          if (position.includes("right")) return "translate-x-full opacity-0";
          if (position.includes("left")) return "-translate-x-full opacity-0";
          if (position.includes("top")) return "-translate-y-full opacity-0";
          return "translate-y-full opacity-0";
        case "fade":
          return "opacity-0";
        case "scale":
          return "scale-95 opacity-0";
        case "bounce":
          return "scale-50 opacity-0";
        default:
          return "translate-x-full opacity-0";
      }
    }

    if (isExiting) {
      // Exiting state
      switch (animation) {
        case "slide":
          if (position.includes("right")) return "translate-x-full opacity-0";
          if (position.includes("left")) return "-translate-x-full opacity-0";
          if (position.includes("top")) return "-translate-y-full opacity-0";
          return "translate-y-full opacity-0";
        case "fade":
          return "opacity-0";
        case "scale":
          return "scale-95 opacity-0";
        case "bounce":
          return "scale-50 opacity-0";
        default:
          return "translate-x-full opacity-0";
      }
    }

    // Visible state
    return "translate-x-0 translate-y-0 scale-100 opacity-100";
  };

  const startTimer = () => {
    if (duration === 0) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTimeRef.current);

    // Update progress
    const interval = setInterval(() => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(newProgress);
        if (newProgress === 0) clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current -= elapsed;
    }
  };

  const resumeTimer = () => {
    startTimer();
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
      onRemove(id);
    }, 300);
  };

  useEffect(() => {
    // Enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 50);

    // Auto dismiss timer
    const cleanup = startTimer();

    return () => {
      clearTimeout(enterTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      pauseTimer();
    } else if (isVisible && !isExiting) {
      resumeTimer();
    }
  }, [isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className={cn(
        toastVariants({ variant, status, animation }),
        "rounded-xl",
        getAnimationClasses(),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
    >
      {/* Thin, clean progress bar */}
      {showProgress && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current/15 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-current/80 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Clean icon with simple background */}
      {(showIcon || icon) && (
        <div className="flex-shrink-0">{icon || StatusIcons[status]}</div>
      )}

      {/* Clean content */}
      <div className="flex-1 min-w-0">
        {children ? (
          children
        ) : (
          <>
            {title && (
              <div className="font-semibold text-sm leading-tight">{title}</div>
            )}
            {description && (
              <div className="text-xs opacity-90 leading-snug mt-0.5">
                {description}
              </div>
            )}
          </>
        )}

        {/* Simple action button */}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs font-medium px-2 py-1 rounded-md bg-current/10 hover:bg-current/20 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Simple close button */}
      {closable && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-md hover:bg-current/10 transition-colors"
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
