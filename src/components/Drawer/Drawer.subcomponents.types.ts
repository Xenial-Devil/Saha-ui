import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

/**
 * DrawerTrigger Props
 */
export interface DrawerTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Trigger button content */
  children: ReactNode;
  /** Custom className */
  className?: string;
  /** Whether trigger is disabled */
  disabled?: boolean;
  /** If true, the trigger will not render its own button but will pass props to its child */
  asChild?: boolean;
}

/**
 * DrawerContent Props
 */
export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content children */
  children: ReactNode;
  /** Drawer position */
  position?: "left" | "right" | "top" | "bottom";
  /** Drawer size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Animation variant */
  animation?: "slide" | "fade" | "scale" | "none";
  /** Animation state */
  state?: "open" | "closed";
  /** Whether drawer is nested */
  nested?: boolean;
  /** Custom className */
  className?: string;
  /** Internal ref for focus management */
  innerRef?: React.RefObject<HTMLDivElement>;
  /** ARIA role */
  role?: string;
  /** ARIA modal attribute */
  "aria-modal"?: boolean;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
}

/**
 * DrawerOverlay Props
 */
export interface DrawerOverlayProps {
  /** Backdrop variant */
  backdrop?: "default" | "blur" | "transparent" | "dark";
  /** Animation state */
  state: "open" | "closed";
  /** Whether drawer is nested */
  nested?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

/**
 * DrawerHeader Props
 */
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header content */
  children: ReactNode;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * DrawerBody Props
 */
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Body content */
  children: ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * DrawerFooter Props
 */
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content */
  children: ReactNode;
  /** Alignment of footer content */
  align?: "left" | "center" | "right" | "between";
  /** Custom className */
  className?: string;
}

/**
 * DrawerTitle Props
 */
export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Title text */
  children: ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * DrawerDescription Props
 */
export interface DrawerDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  /** Description text */
  children: ReactNode;
  /** Custom className */
  className?: string;
}

/**
 * DrawerClose Props
 */
export interface DrawerCloseProps {
  /** Close button content */
  children?: ReactNode;
  /** Custom className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * DrawerCloseButton Props (X button)
 */
export interface DrawerCloseButtonProps {
  /** Click handler */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}
