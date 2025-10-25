import type React from "react";

export type NavVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "glass"
  | "filled"
  | "outlined"
  | "minimal";

export type NavSize = "sm" | "md" | "lg";

export type NavOrientation = "vertical" | "horizontal";

export interface NavigationItemBase {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  badge?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavigationItem extends NavigationItemBase {
  items?: NavigationItem[]; // nested
}

export interface NavigationMenuProps {
  items?: NavigationItem[]; // compact prop API
  variant?: NavVariant;
  size?: NavSize;
  orientation?: NavOrientation;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean; // compact visual
  responsive?: boolean; // responsive layout: mobile (vertical), tablet (horizontal), desktop (vertical)
  defaultOpenIds?: string[]; // pre-open nested menus
  onSelect?: (item: NavigationItem) => void;
}

// Composable API subcomponent props
export interface NavItemProps extends NavigationItemBase {
  children?: React.ReactNode;
  asChild?: boolean;
  items?: NavigationItem[]; // support nested items in composable API too
}

export interface NavSectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

// Radix-style API components
export interface NavigationMenuListProps {
  children?: React.ReactNode;
  className?: string;
}

export interface NavigationMenuTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface NavigationMenuContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  asChild?: boolean;
  active?: boolean;
}

export default {};
