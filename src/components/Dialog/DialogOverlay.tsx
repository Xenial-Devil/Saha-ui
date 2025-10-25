import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  DialogOverlayProps,
  DialogContentProps,
} from "./Dialog.subcomponents.types";

/**
 * Overlay variants with SMOOTH animations
 */
const overlayVariants = cva(
  [
    "fixed inset-0 z-50",
    // Smooth transitions
    "transition-all duration-300 ease-in-out",
  ],
  {
    variants: {
      backdrop: {
        default: "bg-black/50",
        blur: "bg-black/30 backdrop-blur-md",
        transparent: "bg-transparent",
        dark: "bg-black/80",
      },
      state: {
        open: "opacity-100",
        closed: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      backdrop: "default",
      state: "closed",
    },
  }
);

/**
 * DialogOverlay - Backdrop overlay component
 */
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (
    { backdrop = "default", nested = false, onClick, state, className },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          overlayVariants({ backdrop, state }),
          nested && "bg-black/20 backdrop-blur-sm",
          className
        )}
        onClick={onClick}
        aria-hidden="true"
        style={nested ? { zIndex: 60 } : undefined}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

/**
 * Content variants with SMOOTH animations
 * Slide animations use longer duration for smoother effect
 */
const contentVariants = cva(
  [
    "fixed z-50 w-full",
    "flex flex-col",
    "shadow-2xl",
    // Smooth transitions - slide animations override this
    "transition-all duration-300 ease-in-out",
  ],
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        primary: "bg-primary/5 border-2 border-primary/30",
        secondary: "bg-secondary/5 border-2 border-secondary/30",
        accent: "bg-accent/5 border-2 border-accent/30",
        success: "bg-success/5 border-2 border-success/30",
        warning: "bg-warning/5 border-2 border-warning/30",
        error: "bg-destructive/5 border-2 border-destructive/30",
        info: "bg-info/5 border-2 border-info/30",
        glass: "bg-background/80 backdrop-blur-xl border border-white/20",
      },
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        full: "max-w-full w-full h-full",
      },
      rounded: {
        default: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        "2xl": "rounded-3xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      centered: {
        true: "top-1/2 left-1/2",
        false: "top-20 left-1/2",
      },
      fullScreen: {
        true: "!max-w-full !w-screen !h-screen !rounded-none top-0 left-0 !translate-x-0 !translate-y-0",
        false: "",
      },
      // Animation variants with smooth transitions
      animation: {
        fade: "",
        scale: "",
        "slide-up": "",
        "slide-down": "",
        "slide-left": "",
        "slide-right": "",
        zoom: "",
        bounce: "",
      },
      state: {
        open: "",
        closed: "opacity-0 pointer-events-none",
      },
    },
    compoundVariants: [
      // Fade animation
      {
        animation: "fade",
        state: "open",
        className: "opacity-100 -translate-x-1/2 -translate-y-1/2",
      },
      {
        animation: "fade",
        state: "closed",
        className: "opacity-0 -translate-x-1/2 -translate-y-1/2",
      },
      // Scale animation
      {
        animation: "scale",
        state: "open",
        className: "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2",
      },
      {
        animation: "scale",
        state: "closed",
        className: "opacity-0 scale-95 -translate-x-1/2 -translate-y-1/2",
      },
      // Slide-up animation - starts from bottom of screen, ends at center
      {
        animation: "slide-up",
        state: "open",
        className:
          "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
      },
      {
        animation: "slide-up",
        state: "closed",
        className:
          "opacity-0 -translate-x-1/2 !translate-y-[100vh] transition-all duration-400 ease-in",
      },
      // Slide-down animation - starts from top of screen, ends at center
      {
        animation: "slide-down",
        state: "open",
        className:
          "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
      },
      {
        animation: "slide-down",
        state: "closed",
        className:
          "opacity-0 -translate-x-1/2 !-translate-y-[100vh] transition-all duration-400 ease-in",
      },
      // Slide-left animation - starts from right of screen, ends at center
      {
        animation: "slide-left",
        state: "open",
        className:
          "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
      },
      {
        animation: "slide-left",
        state: "closed",
        className:
          "opacity-0 !translate-x-[100vw] -translate-y-1/2 transition-all duration-400 ease-in",
      },
      // Slide-right animation - starts from left of screen, ends at center
      {
        animation: "slide-right",
        state: "open",
        className:
          "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
      },
      {
        animation: "slide-right",
        state: "closed",
        className:
          "opacity-0 !-translate-x-[100vw] -translate-y-1/2 transition-all duration-400 ease-in",
      },
      // Zoom animation
      {
        animation: "zoom",
        state: "open",
        className: "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2",
      },
      {
        animation: "zoom",
        state: "closed",
        className: "opacity-0 scale-75 -translate-x-1/2 -translate-y-1/2",
      },
      // Bounce animation (only on open)
      {
        animation: "bounce",
        state: "open",
        className:
          "opacity-100 scale-100 animate-bounce-in -translate-x-1/2 -translate-y-1/2",
      },
      {
        animation: "bounce",
        state: "closed",
        className: "opacity-0 scale-95 -translate-x-1/2 -translate-y-1/2",
      },
      // Non-centered overrides (when centered=false)
      {
        centered: false,
        animation: "fade",
        state: "open",
        className: "opacity-100 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "fade",
        state: "closed",
        className: "opacity-0 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "scale",
        state: "open",
        className: "opacity-100 scale-100 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "scale",
        state: "closed",
        className: "opacity-0 scale-95 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "zoom",
        state: "open",
        className: "opacity-100 scale-100 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "zoom",
        state: "closed",
        className: "opacity-0 scale-75 -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "bounce",
        state: "open",
        className:
          "opacity-100 scale-100 animate-bounce-in -translate-x-1/2 translate-y-0",
      },
      {
        centered: false,
        animation: "bounce",
        state: "closed",
        className: "opacity-0 scale-95 -translate-x-1/2 translate-y-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      animation: "scale",
      centered: true,
      fullScreen: false,
      state: "closed",
    },
  }
);

/**
 * DialogContent - Main content container with animations
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      rounded = "default",
      animation = "scale",
      centered = true,
      fullScreen = false,
      scrollBehavior = "inside",
      state,
      nested = false,
      onClick,
      innerRef,
      role,
      "aria-Dialog": ariaDialog,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={innerRef || ref}
        role={role}
        aria-Dialog={ariaDialog}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={cn(
          contentVariants({
            variant,
            size,
            rounded,
            animation,
            centered: fullScreen ? false : centered,
            fullScreen,
            state,
          }),
          scrollBehavior === "outside" && "max-h-[90vh] overflow-y-auto",
          scrollBehavior === "inside" && "max-h-[90vh]",
          className
        )}
        onClick={onClick}
        style={nested ? { zIndex: 60 } : undefined}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";
