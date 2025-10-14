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
  size?: "sm" | "md" | "lg";
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
  spacing?: "sm" | "md" | "lg";
  wrap?: boolean;
  max?: number;
  onMaxReached?: (hiddenCount: number) => void;
}
