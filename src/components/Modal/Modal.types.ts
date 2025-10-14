import React from "react";

export interface ModalProps {
  // Visibility
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;

  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  rounded?: "default" | "lg" | "xl" | "2xl" | "full" | "none";

  // Content
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;

  // Header Options
  showHeader?: boolean;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;

  // Animations
  animation?:
    | "fade"
    | "scale"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "bounce";

  // Layout
  centered?: boolean;
  scrollBehavior?: "inside" | "outside";
  fullScreen?: boolean;

  // Backdrop
  backdrop?: "default" | "blur" | "transparent" | "dark";
  preventClose?: boolean;

  // Callbacks
  onClose?: () => void;
  onOpen?: () => void;
  onAnimationComplete?: () => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;

  // Advanced Features
  lockScroll?: boolean;
  focusTrap?: boolean;
  returnFocus?: boolean;
  portalTarget?: HTMLElement | null;
  nested?: boolean; // For nested modals

  // Custom Classes
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export interface ModalContextValue {
  open: boolean;
  onClose: () => void;
}
