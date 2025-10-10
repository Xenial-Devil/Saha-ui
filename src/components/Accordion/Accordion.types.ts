// Explicit types for better type safety
export type AccordionVariant =
  | "default"
  | "controlled"
  | "allopen"
  | "toggle"
  | "firstopen";

export interface AccordionItem {
  /**
   * The title/heading of the accordion item
   */
  title: string;

  /**
   * The content displayed when the item is expanded
   */
  content: string;
}

export interface AccordionProps {
  /**
   * Behavior variant that controls how accordion items expand/collapse
   * - default: Independent toggle for each item
   * - controlled: Only one item can be open at a time
   * - allopen: All items can be toggled independently (all open by default)
   * - toggle: Only one item open, clicking open item closes it
   * - firstopen: First item open by default, only one can be open
   */
  variant: AccordionVariant;

  /**
   * Array of accordion items to display
   */
  items: AccordionItem[];
}

export interface AccordionItemProps {
  /**
   * The title/heading of the accordion item
   */
  title: string;

  /**
   * The content displayed when expanded
   */
  content: string;

  /**
   * Whether this item is currently open
   */
  isOpen: boolean;

  /**
   * The variant inherited from parent Accordion
   */
  variant: AccordionVariant;

  /**
   * Callback fired when the item is clicked
   */
  onClick: () => void;
}
