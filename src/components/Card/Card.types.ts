import React from "react";

// Explicit types for better type safety
export type CardVariant =
  | "default"
  | "glass"
  | "glass-strong"
  | "glass-subtle"
  | "bordered";
export type CardPadding = "none" | "sm" | "md" | "lg" | "xl" | number | string;
export type CardRounded = "sm" | "md" | "lg" | "xl" | "2xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to be rendered inside the card
   */
  children: React.ReactNode;

  /**
   * Visual style variant of the card
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Padding size applied to the card
   * Accepts predefined tokens, numbers (px), or string with units
   * @default "md"
   * @example
   * <Card padding="lg">Token padding</Card>
   * <Card padding={24}>24px padding</Card>
   * <Card padding="2rem">Custom padding</Card>
   */
  padding?: CardPadding;

  /**
   * Border radius size
   * @default "lg"
   */
  rounded?: CardRounded;

  /**
   * Whether the card should have hover effects
   * @default false
   */
  hoverable?: boolean;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}
