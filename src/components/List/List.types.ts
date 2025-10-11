import React from "react";

// Explicit types for better type safety
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

export type ListVariant =
  | "default"
  | "bordered"
  | "divided"
  | "striped"
  | "cards";
export type ListSize = "sm" | "md" | "lg";

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /**
   * List items
   */
  children: React.ReactNode;

  /**
   * List marker type
   * @default "disc"
   */
  listType?: ListType;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: ListVariant;

  /**
   * Size of the list items
   * @default "md"
   */
  size?: ListSize;

  /**
   * Whether to use ordered list (ol) instead of unordered (ul)
   * @default false
   */
  ordered?: boolean;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * List item content
   */
  children: React.ReactNode;

  /**
   * Optional icon before the content
   */
  icon?: React.ReactNode;

  /**
   * Visual style variant (should match parent List variant)
   * @default "default"
   */
  variant?: ListVariant;
}
