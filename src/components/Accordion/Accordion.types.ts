import { ReactNode } from "react";

// Explicit types for better type safety
export type AccordionVariant =
  | "default"
  | "controlled"
  | "allopen"
  | "toggle"
  | "firstopen"
  | "glass";

export type AccordionType = "single" | "multiple";

export type AccordionSize = "sm" | "md" | "lg";

export type AccordionOrientation = "vertical" | "horizontal";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AccordionProps {
  /**
   * Behavior type that controls how accordion items expand/collapse
   * - single: Only one item can be open at a time
   * - multiple: Multiple items can be toggled independently
   * @default "single"
   */
  type?: AccordionType;

  /**
   * Controlled value(s) for which items are open
   * - For type="single": string value
   * - For type="multiple": string[] value
   */
  value?: string | string[];

  /**
   * Default value(s) for uncontrolled accordion
   */
  defaultValue?: string | string[];

  /**
   * Callback fired when the open items change
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Visual variant for styling
   * @default "default"
   */
  variant?: AccordionVariant;

  /**
   * Size variant for the accordion
   * @default "md"
   */
  size?: AccordionSize;

  /**
   * Custom className for the accordion container
   */
  className?: string;

  /**
   * Whether collapsible when type="single" (allows closing the open item)
   * @default false
   */
  collapsible?: boolean;

  /**
   * Orientation for keyboard navigation
   * @default "vertical"
   */
  orientation?: AccordionOrientation;

  /**
   * Loop navigation from last to first item
   * @default false
   */
  loop?: boolean;

  /**
   * Disable the entire accordion
   * @default false
   */
  disabled?: boolean;

  /**
   * Lazy load content only when first opened
   * @default false
   */
  lazyMount?: boolean;

  /**
   * Unmount content when closed
   * @default false
   */
  unmountOnClose?: boolean;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Callback when any item starts opening
   */
  onOpenStart?: (value: string) => void;

  /**
   * Callback when any item finishes opening
   */
  onOpenEnd?: (value: string) => void;

  /**
   * Callback when any item starts closing
   */
  onCloseStart?: (value: string) => void;

  /**
   * Callback when any item finishes closing
   */
  onCloseEnd?: (value: string) => void;

  /**
   * Child AccordionItem components
   */
  children: ReactNode;
}

export interface AccordionItemProps {
  /**
   * Unique value identifier for this item
   */
  value: string;

  /**
   * Custom className for the item container
   */
  className?: string;

  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Heading level for accessibility (h1-h6)
   * @default 3
   */
  headingLevel?: HeadingLevel;

  /**
   * Callback when this specific item's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Child components (AccordionTrigger and AccordionContent)
   */
  children: ReactNode;
}

export interface AccordionTriggerProps {
  /**
   * The content to display in the trigger (usually the title)
   */
  children: ReactNode;

  /**
   * Custom className for the trigger
   */
  className?: string;

  /**
   * Custom icon to display (overrides default)
   */
  icon?: ReactNode;

  /**
   * Custom icon for open state
   */
  openIcon?: ReactNode;

  /**
   * Custom icon for closed state
   */
  closedIcon?: ReactNode;

  /**
   * Position of the icon
   * @default "right"
   */
  iconPosition?: "left" | "right";

  /**
   * Hide the default icon
   * @default false
   */
  hideIcon?: boolean;

  /**
   * When true, the AccordionTrigger will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;

  /**
   * Callback when trigger receives focus
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  /**
   * Callback when trigger loses focus
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

export interface AccordionContentProps {
  /**
   * The content to display when expanded
   */
  children: ReactNode;

  /**
   * Custom className for the content
   */
  className?: string;

  /**
   * Force content to stay mounted in DOM even when closed
   * Useful for SEO or preserving form state
   * @default false
   */
  forceMount?: boolean;

  /**
   * Callback when content animation starts
   */
  onAnimationStart?: () => void;

  /**
   * Callback when content animation ends
   */
  onAnimationEnd?: () => void;
}
