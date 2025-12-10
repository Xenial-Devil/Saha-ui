import React from "react";

export interface TagProps {
  // Content
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  avatar?: string;

  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"
    | "ghost"
    | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  rounded?: "default" | "full" | "none";

  // Interaction
  removable?: boolean;
  onRemove?: () => void;
  clickable?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;

  // Advanced Features
  dot?: boolean;
  dotPosition?: "left" | "right";
  dotColor?: string;
  badge?: string | number;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "error";
  animated?: boolean;
  loading?: boolean;

  // HTML Props
  className?: string;
  as?: "span" | "div" | "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Spacing between tags
   * Accepts predefined tokens, numbers (px), or string with units
   * @default "md"
   * @example
   * <TagGroup spacing="sm">Small spacing</TagGroup>
   * <TagGroup spacing={16}>16px spacing</TagGroup>
   * <TagGroup spacing="1rem">Custom spacing</TagGroup>
   */
  spacing?: "sm" | "md" | "lg" | number | string;
  wrap?: boolean;
  max?: number;
  onMaxReached?: (hiddenCount: number) => void;
}
