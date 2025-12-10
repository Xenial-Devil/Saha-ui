import { ReactNode } from "react";

export type TabVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "glass"
  | "bordered"
  | "elevated"
  | "flat"
  | "outlined"
  | "minimal";

export type TabSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

// Root Tabs component props
export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

// TabsList component props
export interface TabsListProps {
  variant?: TabVariant;
  size?: TabSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

// TabsTrigger component props
export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  className?: string;
  iconClassName?: string;
  badgeClassName?: string;
  children: ReactNode;
}

// TabsContent component props
export interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}
