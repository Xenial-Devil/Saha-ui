import { ReactNode } from "react";

/**
 * DialogHeader Component Props
 */
export interface DialogHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Show/hide close button */
  showCloseButton?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * DialogBody Component Props
 */
export interface DialogBodyProps {
  /** Body content */
  children: ReactNode;
  /** Enable scrolling */
  scrollable?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * DialogFooter Component Props
 */
export interface DialogFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Alignment of footer content */
  align?: "left" | "center" | "right";
  /** Custom class name */
  className?: string;
}

/**
 * DialogTitle Component Props
 */
export interface DialogTitleProps {
  /** Title text */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * DialogDescription Component Props
 */
export interface DialogDescriptionProps {
  /** Description text */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * DialogTrigger Component Props
 */
export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Trigger button content */
  children: ReactNode;
}

/**
 * DialogOverlay Component Props
 */
export interface DialogOverlayProps {
  /** Backdrop style */
  backdrop?: "default" | "blur" | "transparent" | "dark";
  /** Is this a nested Dialog */
  nested?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Animation state */
  state: "open" | "closed";
  /** Custom class name */
  className?: string;
}

/**
 * DialogContent Component Props
 */
export interface DialogContentProps {
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
  /** Is nested Dialog */
  nested?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Ref */
  innerRef?: React.Ref<HTMLDivElement>;
  /** Role */
  role?: string;
  /** ARIA Dialog */
  "aria-Dialog"?: boolean;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** Custom class name */
  className?: string;
}

/**
 * DialogCloseButton Component Props
 */
export interface DialogCloseButtonProps {
  /** Click handler */
  onClick: () => void;
  /** Custom class name */
  className?: string;
}
