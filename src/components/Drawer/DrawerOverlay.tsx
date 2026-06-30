"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type {
  DrawerOverlayProps,
  DrawerContentProps,
} from "./Drawer.subcomponents.types";
import { contentVariants, overlayVariants } from "./Drawer.styles";

// Neutralizes transitions/animations when the user prefers reduced motion
const REDUCED_MOTION = "!transition-none !animate-none !duration-0";

/**
 * DrawerOverlay - Backdrop overlay component
 */
export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  (
    { backdrop = "default", nested = false, onClick, state, className },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    return (
      <div
        ref={ref}
        className={cn(
          overlayVariants({ backdrop, state }),
          nested && "bg-black/20 backdrop-blur-sm",
          prefersReducedMotion && REDUCED_MOTION,
          className
        )}
        onClick={onClick}
        aria-hidden="true"
        style={nested ? { zIndex: 60 } : undefined}
      />
    );
  }
);

DrawerOverlay.displayName = "DrawerOverlay";


/**
 * DrawerContent - Main content container with animations
 */
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      children,
      position = "right",
      size = "md",
      animation = "slide",
      state = "closed",
      nested = false,
      onClick,
      innerRef,
      role,
      "aria-modal": ariaModal,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    return (
      <div
        ref={innerRef || ref}
        role={role}
        aria-modal={ariaModal}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={cn(
          contentVariants({
            position,
            size,
            animation,
            state,
          }),
          prefersReducedMotion && REDUCED_MOTION,
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

DrawerContent.displayName = "DrawerContent";
