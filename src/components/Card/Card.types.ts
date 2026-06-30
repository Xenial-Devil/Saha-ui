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

/**
 * Slot-styling map for the Card compound component.
 *
 * The top-level `Card` only renders the `root` slot (the outer card `<div>`).
 * The remaining slots (`header`, `title`, `description`, `content`, `footer`)
 * correspond to the dedicated sub-components (`CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent`, `CardFooter`) and are applied when you
 * forward the same `classNames` object to those sub-components.
 */
export interface CardClassNames {
  /** Outer card container rendered by `Card`. */
  root?: string;
  /** `CardHeader` wrapper. */
  header?: string;
  /** `CardTitle` heading. */
  title?: string;
  /** `CardDescription` text. */
  description?: string;
  /** `CardContent` body. */
  content?: string;
  /** `CardFooter` section. */
  footer?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to be rendered inside the card
   */
  children: React.ReactNode;

  /**
   * Slot-styling API. A single object mapping Card slots to class strings.
   *
   * `Card` itself only consumes `classNames.root` (its outer `<div>`). The
   * other keys (`header`, `title`, `description`, `content`, `footer`) are
   * applied by the matching sub-components — pass the same object to them.
   *
   * Precedence: the individual `className` prop WINS over `classNames.root`.
   *
   * @example
   * <Card classNames={{ root: "max-w-md", title: "text-2xl" }}>
   *   <CardHeader classNames={cardClassNames}>
   *     <CardTitle classNames={cardClassNames}>Title</CardTitle>
   *   </CardHeader>
   * </Card>
   */
  classNames?: CardClassNames;

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
   * Slot-styling API. Forward the same `classNames` object passed to `Card`;
   * `CardHeader` consumes `classNames.header`. The individual `className`
   * prop wins over `classNames.header`.
   */
  classNames?: CardClassNames;
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
   * Slot-styling API. Forward the same `classNames` object passed to `Card`;
   * `CardTitle` consumes `classNames.title`. The individual `className`
   * prop wins over `classNames.title`.
   */
  classNames?: CardClassNames;
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
   * Slot-styling API. Forward the same `classNames` object passed to `Card`;
   * `CardDescription` consumes `classNames.description`. The individual
   * `className` prop wins over `classNames.description`.
   */
  classNames?: CardClassNames;
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
   * Slot-styling API. Forward the same `classNames` object passed to `Card`;
   * `CardContent` consumes `classNames.content`. The individual `className`
   * prop wins over `classNames.content`.
   */
  classNames?: CardClassNames;
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
   * Slot-styling API. Forward the same `classNames` object passed to `Card`;
   * `CardFooter` consumes `classNames.footer`. The individual `className`
   * prop wins over `classNames.footer`.
   */
  classNames?: CardClassNames;
  /**
   * When true, will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}
