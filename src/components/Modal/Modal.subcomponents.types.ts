import { ReactNode } from "react";

/**
 * ModalHeader Component Props
 */
export interface ModalHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Show/hide close button */
  showCloseButton?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * ModalBody Component Props
 */
export interface ModalBodyProps {
  /** Body content */
  children: ReactNode;
  /** Enable scrolling */
  scrollable?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * ModalFooter Component Props
 */
export interface ModalFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Alignment of footer content */
  align?: "left" | "center" | "right";
  /** Custom class name */
  className?: string;
}

/**
 * ModalTitle Component Props
 */
export interface ModalTitleProps {
  /** Title text */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * ModalDescription Component Props
 */
export interface ModalDescriptionProps {
  /** Description text */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * ModalTrigger Component Props
 */
export interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Trigger button content */
  children: ReactNode;
}

/**
 * ModalOverlay Component Props
 */
export interface ModalOverlayProps {
  /** Backdrop style */
  backdrop?: "default" | "blur" | "transparent" | "dark";
  /** Is this a nested modal */
  nested?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Animation state */
  state: "open" | "closed";
  /** Custom class name */
  className?: string;
}

/**
 * ModalContent Component Props
 */
export interface ModalContentProps {
  /** Content */
  children: ReactNode;
  /** Variant */
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
  /** Size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  /** Border radius */
  rounded?: "default" | "lg" | "xl" | "2xl" | "full" | "none";
  /** Animation type */
  animation?:
    | "fade"
    | "scale"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom"
    | "bounce";
  /** Centered vertically */
  centered?: boolean;
  /** Full screen mode */
  fullScreen?: boolean;
  /** Scroll behavior */
  scrollBehavior?: "inside" | "outside";
  /** Animation state */
  state: "open" | "closed";
  /** Is nested modal */
  nested?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Ref */
  innerRef?: React.Ref<HTMLDivElement>;
  /** Role */
  role?: string;
  /** ARIA modal */
  "aria-modal"?: boolean;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** Custom class name */
  className?: string;
}

/**
 * ModalCloseButton Component Props
 */
export interface ModalCloseButtonProps {
  /** Click handler */
  onClick: () => void;
  /** Custom class name */
  className?: string;
}
