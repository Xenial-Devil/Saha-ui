import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import {
  itemVariants,
  itemMediaVariants,
  itemGroupVariants,
} from "./Item.styles";

/**
 * Item variant types
 * Determines the visual style of the item
 */
export type ItemVariant =
  | "default"
  | "bordered"
  | "elevated"
  | "ghost"
  | "glass"
  | "soft"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Item size types
 * Controls the dimensions and spacing
 */
export type ItemSize = "sm" | "md" | "lg";

/**
 * Item media variant types
 */
export type ItemMediaVariant = "icon" | "avatar" | "image" | "thumbnail";

/**
 * Props for the Item component
 *
 * @example
 * ```tsx
 * // Basic item
 * <Item>Simple item</Item>
 *
 * // With asChild pattern
 * <Item asChild>
 *   <a href="/dashboard">Dashboard</a>
 * </Item>
 *
 * // Compact props-based API
 * <Item
 *   media={<Home />}
 *   title="Dashboard"
 *   description="Overview of your account"
 *   actions={<Button>View</Button>}
 * />
 * ```
 */
export interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof itemVariants> {
  /**
   * The visual style variant of the item
   * @default "default"
   */
  variant?: ItemVariant;

  /**
   * The size of the item
   * @default "md"
   */
  size?: ItemSize;

  /**
   * Whether the item is clickable/interactive
   * @default false
   */
  clickable?: boolean;

  /**
   * Whether the item is in a selected/active state
   * @default false
   */
  active?: boolean;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Render as a different element (asChild pattern)
   * @default false
   */
  asChild?: boolean;

  // Compact API props
  /**
   * Media element (icon, avatar, or image) - Compact API
   */
  media?: ReactNode;

  /**
   * Media variant for compact API
   */
  mediaVariant?: ItemMediaVariant;

  /**
   * Title text - Compact API
   */
  title?: ReactNode;

  /**
   * Description text - Compact API
   */
  description?: ReactNode;

  /**
   * Action buttons/elements - Compact API
   */
  actions?: ReactNode;

  /**
   * Header content - Compact API
   */
  header?: ReactNode;

  /**
   * Footer content - Compact API
   */
  footer?: ReactNode;

  /**
   * Badge or meta information - Compact API
   */
  badge?: ReactNode;

  /**
   * Children for component API
   */
  children?: ReactNode;
}

/**
 * Props for ItemMedia component
 */
export interface ItemMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemMediaVariants> {
  /**
   * The variant of the media container
   * @default "icon"
   */
  variant?: ItemMediaVariant;

  /**
   * Size of the media
   */
  size?: ItemSize;

  /**
   * Children (icon, avatar, or image)
   */
  children?: ReactNode;

  /**
   * Render as a different element
   */
  asChild?: boolean;
}

/**
 * Props for ItemContent component
 */
export interface ItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children content
   */
  children?: ReactNode;

  /**
   * Alignment of content
   */
  align?: "start" | "center" | "end";
}

/**
 * Props for ItemTitle component
 */
export interface ItemTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title text
   */
  children?: ReactNode;

  /**
   * Render as a different element
   */
  asChild?: boolean;
}

/**
 * Props for ItemDescription component
 */
export interface ItemDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description text
   */
  children?: ReactNode;

  /**
   * Render as a different element
   */
  asChild?: boolean;
}

/**
 * Props for ItemActions component
 */
export interface ItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action buttons or elements
   */
  children?: ReactNode;

  /**
   * Alignment of actions
   */
  align?: "start" | "center" | "end";
}

/**
 * Props for ItemHeader component
 */
export interface ItemHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header content
   */
  children?: ReactNode;
}

/**
 * Props for ItemFooter component
 */
export interface ItemFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children?: ReactNode;
}

/**
 * Props for ItemGroup component
 */
export interface ItemGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemGroupVariants> {
  /**
   * Visual variant of the group
   */
  variant?: "default" | "bordered" | "divided" | "cards";

  /**
   * Spacing between items
   * Accepts predefined tokens, numbers (px), or string with units
   * @example
   * <ItemGroup spacing="md">Token spacing</ItemGroup>
   * <ItemGroup spacing={12}>12px spacing</ItemGroup>
   * <ItemGroup spacing="1rem">Custom spacing</ItemGroup>
   */
  spacing?: "none" | "sm" | "md" | "lg" | number | string;

  /**
   * Children (Item components)
   */
  children?: ReactNode;
}

/**
 * Props for ItemSeparator component
 */
export interface ItemSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Orientation of separator
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Whether to show decorative elements
   */
  decorative?: boolean;
}

/**
 * Props for ItemBadge component
 */
export interface ItemBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content
   */
  children?: ReactNode;

  /**
   * Variant of the badge
   */
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
}
