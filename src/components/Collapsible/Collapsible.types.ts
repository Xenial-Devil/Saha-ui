import type { ReactNode } from "react";

/**
 * Collapsible variant types
 * Determines the visual style of the collapsible
 */
export type CollapsibleVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * Collapsible animation types
 * Controls the animation style when expanding/collapsing
 */
export type CollapsibleAnimation = "smooth" | "spring" | "bounce" | "none";

/**
 * Collapsible Props - Main collapsible component
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Click me</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content</CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export interface CollapsibleProps {
  /** Children components (CollapsibleTrigger, CollapsibleContent) */
  children: ReactNode;

  /** Whether the collapsible is open (controlled) */
  open?: boolean;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Visual variant for styling */
  variant?: CollapsibleVariant;

  /** Animation style */
  animation?: CollapsibleAnimation;

  /** Whether the collapsible is disabled */
  disabled?: boolean;

  /** Custom className for the collapsible container */
  className?: string;

  /** Callback when animation starts */
  onAnimationStart?: () => void;

  /** Callback when animation ends */
  onAnimationEnd?: () => void;

  /** Whether to preserve content in DOM when collapsed */
  preserveContent?: boolean;

  /** Delay before animation starts (ms) */
  animationDelay?: number;

  /** Duration of animation (ms) - default: 500 */
  animationDuration?: number;
}

/**
 * Collapsible Context Value
 */
export interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  variant: CollapsibleVariant;
  animation: CollapsibleAnimation;
  animationDuration: number;
}

/**
 * CollapsibleTrigger Props
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <Button>Toggle</Button>
 * </CollapsibleTrigger>
 * ```
 */
export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Merge props into child element instead of wrapping */
  asChild?: boolean;

  /** Custom className */
  className?: string;

  /** Children (button content or element when using asChild) */
  children?: ReactNode;

  /** Whether to show chevron icon */
  showIcon?: boolean;

  /** Custom icon to display */
  icon?: ReactNode;

  /** Icon position */
  iconPosition?: "left" | "right";
}

/**
 * CollapsibleContent Props
 *
 * @example
 * ```tsx
 * <CollapsibleContent className="p-4">
 *   <div>Your content here</div>
 * </CollapsibleContent>
 * ```
 */
export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to show/hide */
  children: ReactNode;

  /** Custom className */
  className?: string;

  /** Force mount (don't unmount when collapsed) */
  forceMount?: boolean;
}

/**
 * Compact API Props - Single component with all props
 *
 * @example
 * ```tsx
 * <Collapsible.Compact
 *   title="Click to expand"
 *   content="Hidden content"
 *   defaultOpen
 *   variant="primary"
 * />
 * ```
 */
export interface CollapsibleCompactProps {
  /** Trigger content (what to click) */
  title: ReactNode;

  /** Content to show/hide */
  content: ReactNode;

  /** Whether the collapsible is open (controlled) */
  open?: boolean;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Visual variant for styling */
  variant?: CollapsibleVariant;

  /** Animation style */
  animation?: CollapsibleAnimation;

  /** Whether the collapsible is disabled */
  disabled?: boolean;

  /** Custom className for container */
  className?: string;

  /** Custom className for trigger */
  triggerClassName?: string;

  /** Custom className for content */
  contentClassName?: string;

  /** Whether to show chevron icon */
  showIcon?: boolean;

  /** Icon position */
  iconPosition?: "left" | "right";

  /** Custom icon */
  icon?: ReactNode;

  /** Animation duration (ms) - default: 500 */
  animationDuration?: number;
}
