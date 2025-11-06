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

export interface AccordionProps {
  /**
   * Behavior type that controls how accordion items expand/collapse
   * - single: Only one item can be open at a time
   * - multiple: Multiple items can be toggled independently
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
   */
  variant?: AccordionVariant;

  /**
   * Custom className for the accordion container
   */
  className?: string;

  /**
   * Whether collapsible when type="single" (allows closing the open item)
   */
  collapsible?: boolean;

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
   */
  disabled?: boolean;

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
   * Custom icon to display (default: ChevronDown)
   */
  icon?: ReactNode;

  /**
   * When true, the AccordionTrigger will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
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
}
