"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import { cn } from "../../lib/utils";
import { AlertProps } from "./Alert.types";
import {
  alertVariants,
  getAnimationClasses,
  getIconAnimationClass,
  closeButtonClass,
  actionButtonClasses,
  secondaryActionClass,
  progressTrackClass,
  progressBarClass,
  progressTrackColors,
  progressBarColors,
} from "./Alert.styles";
import { StatusIcon, Icon } from "./Alert.icons";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      id,
      variant = "subtle",
      status = "info",
      size = "md",
      rounded = "lg",
      shadow = "sm",
      title,
      message,
      icon,
      iconAnimation = "none",
      closeable = false,
      closeOnEscape = true,
      closeOnSwipe = true,
      duration,
      showProgress = false,
      pauseOnHover = true,
      pauseOnFocus = true,
      action,
      secondaryAction,
      animation = "fade",
      onClose,
      onOpen,
      className,
      role = "alert",
      isOpen: controlledIsOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    // ============================================
    // STATE
    // ============================================
    const isControlled = controlledIsOpen !== undefined;
    const [internalIsOpen, setInternalIsOpen] = useState(true);
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const [animationState, setAnimationState] = useState<
      "initial" | "enter" | "exit"
    >("initial");
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    // ============================================
    // REFS
    // ============================================
    const alertRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingRef = useRef<number>(duration || 0);
    const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Merge refs
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        alertRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // ============================================
    // HANDLERS
    // ============================================

    // Close handler
    const handleClose = useCallback(() => {
      setAnimationState("exit");

      const exitDuration = animation === "none" ? 0 : 300;

      setTimeout(() => {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setInternalIsOpen(false);
        }
        onClose?.();
      }, exitDuration);
    }, [animation, isControlled, onOpenChange, onClose]);

    // Pause timer
    const handlePause = useCallback(() => {
      if ((pauseOnHover || pauseOnFocus) && duration) {
        setIsPaused(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        remainingRef.current = (progress / 100) * duration;
      }
    }, [pauseOnHover, pauseOnFocus, duration, progress]);

    // Resume timer
    const handleResume = useCallback(() => {
      if ((pauseOnHover || pauseOnFocus) && duration) {
        setIsPaused(false);
      }
    }, [pauseOnHover, pauseOnFocus, duration]);

    // Touch start
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (!closeOnSwipe) return;
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      },
      [closeOnSwipe]
    );

    // Touch end
    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (!closeOnSwipe) return;

        const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
        const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

        // Swipe horizontally more than vertically, and distance > 80px
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 80) {
          handleClose();
        }
      },
      [closeOnSwipe, handleClose]
    );

    // ============================================
    // EFFECTS
    // ============================================

    // Mount animation
    useEffect(() => {
      if (isOpen) {
        // Start with initial state, then animate to enter
        setAnimationState("initial");

        // Small delay for initial render
        const timer = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimationState("enter");
          });
        });

        onOpen?.();
        remainingRef.current = duration || 0;
        setProgress(100);

        return () => cancelAnimationFrame(timer);
      }
    }, [isOpen, onOpen, duration]);

    // Auto dismiss timer
    useEffect(() => {
      if (!duration || !isOpen || isPaused || animationState !== "enter")
        return;

      startTimeRef.current = Date.now();

      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = remainingRef.current - elapsed;

        if (remaining <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          handleClose();
        } else if (showProgress) {
          setProgress((remaining / duration) * 100);
        }
      }, 16); // ~60fps

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [duration, isOpen, isPaused, showProgress, handleClose, animationState]);

    // Keyboard dismiss (Escape)
    useEffect(() => {
      if (!closeOnEscape || !closeable || !isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEscape, closeable, isOpen, handleClose]);

    // ============================================
    // RENDER HELPERS
    // ============================================

    // Icon
    const renderedIcon = useMemo(() => {
      if (icon === null) return null;

      if (icon) {
        return (
          <span
            className={cn(
              "shrink-0 mt-0.5",
              getIconAnimationClass(iconAnimation)
            )}
          >
            {icon}
          </span>
        );
      }

      return (
        <span className="shrink-0 mt-0.5">
          <StatusIcon status={status} animation={iconAnimation} />
        </span>
      );
    }, [icon, status, iconAnimation]);

    // Animation classes
    const animationClasses = useMemo(() => {
      if (animation === "none") return "";
      return getAnimationClasses(animation, animationState);
    }, [animation, animationState]);

    // ============================================
    // RENDER
    // ============================================

    // Don't render if closed and exit animation complete
    if (!isOpen && animationState !== "exit") return null;

    return (
      <div
        ref={mergedRef}
        id={id}
        role={role}
        aria-live={status === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
        tabIndex={-1}
        onMouseEnter={pauseOnHover ? handlePause : undefined}
        onMouseLeave={pauseOnHover ? handleResume : undefined}
        onFocus={pauseOnFocus ? handlePause : undefined}
        onBlur={pauseOnFocus ? handleResume : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          alertVariants({ variant, status, rounded, shadow, size }),
          animationClasses,
          className
        )}
        {...props}
      >
        {/* Icon */}
        {renderedIcon}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-sm leading-5">{title}</p>}

          {message && (
            <div
              className={cn(
                "text-sm leading-relaxed",
                title && "mt-1 opacity-90"
              )}
            >
              {message}
            </div>
          )}

          {/* Actions */}
          {(action || secondaryAction) && (
            <div className="flex items-center gap-3 mt-3">
              {action && (
                <button
                  type="button"
                  onClick={action.onClick}
                  className={actionButtonClasses[action.variant || "link"]}
                >
                  {action.label}
                </button>
              )}

              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className={secondaryActionClass}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        {closeable && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss alert"
            className={closeButtonClass}
          >
            <Icon name="close" className="w-4 h-4" />
          </button>
        )}

        {/* Progress Bar */}
        {showProgress && duration && (
          <div className={cn(progressTrackClass, progressTrackColors[status])}>
            <div
              className={cn(progressBarClass, progressBarColors[status])}
              style={{
                width: `${progress}%`,
                transition: isPaused ? "none" : "width 100ms linear",
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
