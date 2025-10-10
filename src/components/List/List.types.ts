export type ListType =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "decimal-leading-zero"
  | "lower-roman"
  | "upper-roman"
  | "lower-alpha"
  | "upper-alpha"
  | "none";

export interface ListProps {
  children: React.ReactNode;
  listType: ListType;
  className?: string;
}

export interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}
