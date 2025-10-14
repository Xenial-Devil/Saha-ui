import type { ReactNode } from "react";

/**
 * Drawer Props - Main drawer component props
 */
export interface DrawerProps {
  /** Children components (DrawerTrigger, DrawerContent, etc.) */
  children: ReactNode;
  /** Whether the drawer is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Drawer position */
  position?: "left" | "right" | "top" | "bottom";
  /** Drawer size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Whether to show backdrop overlay */
  showOverlay?: boolean;
  /** Backdrop variant */
  backdrop?: "default" | "blur" | "transparent" | "dark";
  /** Whether clicking overlay closes drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes drawer */
  closeOnEscape?: boolean;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
  /** Portal target element */
  portalTarget?: HTMLElement;
  /** Animation variant */
  animation?: "slide" | "fade" | "scale" | "none";
  /** Custom className for drawer content */
  className?: string;
  /** Z-index for drawer */
  zIndex?: number;
  /** Whether drawer is nested (for multiple drawers) */
  nested?: boolean;
}

/**
 * Drawer Context Value
 */
export interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: "left" | "right" | "top" | "bottom";
  size: "sm" | "md" | "lg" | "xl" | "full";
  backdrop: "default" | "blur" | "transparent" | "dark";
  animation: "slide" | "fade" | "scale" | "none";
  closeOnOverlayClick: boolean;
  showOverlay: boolean;
  nested: boolean;
  zIndex: number;
}
