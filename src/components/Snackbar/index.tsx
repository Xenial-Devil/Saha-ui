"use client";

import React, { useEffect, useRef, useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { SnackbarProps } from "./Snackbar.types";
export type { SnackbarProps };
import {
  snackbarVariants,
  snackbarIconVariants,
  snackbarMessageVariants,
  snackbarActionVariants,
  snackbarCloseVariants,
} from "./Snackbar.styles";

export type SnackbarVariantsProps = VariantProps<typeof snackbarVariants>;

/**
 * Get default icon based on severity
 */
const getDefaultIcon = (severity: string) => {
  switch (severity) {
    case "success":
      return <CheckCircle />;
    case "warning":
      return <AlertTriangle />;
    case "error":
      return <AlertCircle />;
    case "info":
      return <Info />;
    default:
      return null;
  }
};

/**
 * Snackbar Component
 *
 * A brief notification message that appears at the edge of the screen.
 * Provides lightweight feedback about an operation without interrupting the user.
 * Auto-dismisses after a specified duration.
 *
 * @example
 * ```tsx
 * // Basic snackbar
 * <Snackbar open message="Item saved successfully" />
 *
 * // With severity
 * <Snackbar
 *   open
 *   message="Error occurred"
 *   severity="error"
 *   onClose={handleClose}
 * />
 *
 * // With action
 * <Snackbar
 *   open
 *   message="File deleted"
 *   action={<button>Undo</button>}
 * />
 * ```
 */
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      open = false,
      message,
      severity = "default",
      variant = "filled",
      position = "bottom-center",
      autoHideDuration = 6000,
      onClose,
      icon,
      showIcon = true,
      action,
      showClose = true,
      transitionDuration = 300,
      disableClickAway = false,
      className,
      messageClassName,
      actionClassName,
      zIndex = 1400,
      pauseOnHover = true,
      pauseOnFocusLoss = true,
      onEnter,
      onEntered,
      onExit,
      onExited,
      style,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Define handleClose before useEffect that uses it
    const handleClose = React.useCallback(
      (event: React.SyntheticEvent | Event | null, reason?: string) => {
        if (reason === "clickaway" && disableClickAway) {
          return;
        }

        onClose?.(event || undefined, reason);
      },
      [disableClickAway, onClose],
    );

    // Handle auto-hide
    useEffect(() => {
      if (!open || autoHideDuration === null) return;

      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Don't start timer if paused
      if ((pauseOnHover && isHovered) || (pauseOnFocusLoss && isFocused)) {
        return;
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        handleClose(null, "timeout");
      }, autoHideDuration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [
      open,
      autoHideDuration,
      isHovered,
      isFocused,
      pauseOnHover,
      pauseOnFocusLoss,
      handleClose,
    ]);

    // Handle enter/exit callbacks
    useEffect(() => {
      if (open) {
        onEnter?.();
        const timer = setTimeout(() => {
          onEntered?.();
        }, transitionDuration);
        return () => clearTimeout(timer);
      } else {
        onExit?.();
        const timer = setTimeout(() => {
          onExited?.();
        }, transitionDuration);
        return () => clearTimeout(timer);
      }
    }, [open, transitionDuration, onEnter, onEntered, onExit, onExited]);

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      handleClose(event, "closeButton");
    };

    // Get icon to display
    const displayIcon =
      icon ||
      (showIcon && severity !== "default" ? getDefaultIcon(severity) : null);

    // Don't render if not open (after animation)
    if (!open) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          snackbarVariants({ severity, variant, position }),
          className,
        )}
        style={{ zIndex, ...style }}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        onFocus={() => pauseOnFocusLoss && setIsFocused(true)}
        onBlur={() => pauseOnFocusLoss && setIsFocused(false)}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className={snackbarIconVariants({ severity })}>
            {displayIcon}
          </div>
        )}

        {/* Message */}
        <div
          className={cn(snackbarMessageVariants({ variant }), messageClassName)}
        >
          {message}
        </div>

        {/* Action */}
        {action && (
          <div
            className={cn(snackbarActionVariants({ variant }), actionClassName)}
          >
            {action}
          </div>
        )}

        {/* Close Button */}
        {showClose && (
          <button
            type="button"
            className={snackbarCloseVariants({ variant })}
            onClick={handleCloseClick}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

Snackbar.displayName = "Snackbar";
