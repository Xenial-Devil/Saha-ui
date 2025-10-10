export type AccordionVariant =
  | "default"
  | "controlled"
  | "allopen"
  | "toggle"
  | "firstopen";

export interface AccordionProps {
  variant: AccordionVariant;
  items: { title: string; content: string }[];
}

export interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  variant: AccordionVariant;
  onClick: () => void;
}
