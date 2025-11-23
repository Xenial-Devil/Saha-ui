import React from "react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  avatar?: string;
  description?: string;
  badge?: string;
  disabled?: boolean;
  shortcut?: string;
  color?: string;
  divider?: boolean;
  header?: boolean;
  children?: DropdownOption[];
}

export interface DropdownProps {
  // Trigger
  trigger?: React.ReactNode;
  triggerAsChild?: boolean;

  // Options
  options?: DropdownOption[];
  children?: React.ReactNode;

  // State
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Behavior
  multiple?: boolean;
  closeOnSelect?: boolean;
  modal?: boolean;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "glass";
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  width?: string | number;
  maxHeight?: string | number;

  // Labels
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;

  // Advanced
  commandPalette?: boolean;
  grouped?: boolean;
  checkmarks?: boolean;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;

  // Styling
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  /** Disable portaling and render content inline */
  disablePortal?: boolean;
}

export interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
}

export interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  width?: string | number;
  maxHeight?: string | number;
}

export interface DropdownItemProps {
  value?: string;
  icon?: React.ReactNode;
  avatar?: string;
  label?: string;
  description?: string;
  badge?: string;
  shortcut?: string;
  color?: string;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
  className?: string;
}

export interface DropdownGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export interface DropdownSeparatorProps {
  className?: string;
}

export interface DropdownSubProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
