import React from "react";

// ===========================
// Variant & Size Types
// ===========================

export type ContextMenuVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

export type ContextMenuSize = "sm" | "md" | "lg";

// ===========================
// Main Component Props
// ===========================

export interface ContextMenuProps {
  children: React.ReactNode;

  // State control
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Behavior
  modal?: boolean;
  dir?: "ltr" | "rtl";

  // Styling
  variant?: ContextMenuVariant;
  size?: ContextMenuSize;
  className?: string;
}

// ===========================
// Trigger Props
// ===========================

export interface ContextMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
}

// ===========================
// Content Props
// ===========================

export interface ContextMenuContentProps {
  children: React.ReactNode;
  className?: string;

  // Positioning
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
  collisionPadding?: number;

  // Behavior
  avoidCollisions?: boolean;
  loop?: boolean;

  // Styling
  width?: string | number;
  maxHeight?: string | number;
}

// ===========================
// Item Props
// ===========================

export interface ContextMenuItemProps {
  children: React.ReactNode;

  // State
  disabled?: boolean;
  inset?: boolean;

  // Actions
  onSelect?: (event: Event) => void;

  // Styling
  variant?: "default" | "destructive" | "success" | "warning";
  className?: string;

  // Icon & shortcuts
  icon?: React.ReactNode;
  shortcut?: string;
}

// ===========================
// Checkbox Item Props
// ===========================

export interface ContextMenuCheckboxItemProps {
  children: React.ReactNode;

  // State
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  inset?: boolean;

  // Actions
  onSelect?: (event: Event) => void;

  // Styling
  className?: string;
  icon?: React.ReactNode;
}

// ===========================
// Radio Group Props
// ===========================

export interface ContextMenuRadioGroupProps {
  children: React.ReactNode;

  // State
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  // Styling
  className?: string;
}

// ===========================
// Radio Item Props
// ===========================

export interface ContextMenuRadioItemProps {
  children: React.ReactNode;
  value: string;

  // State
  disabled?: boolean;
  inset?: boolean;

  // Actions
  onSelect?: (event: Event) => void;

  // Styling
  className?: string;
  icon?: React.ReactNode;
}

// ===========================
// Sub Menu Props
// ===========================

export interface ContextMenuSubProps {
  children: React.ReactNode;

  // State
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ContextMenuSubTriggerProps {
  children: React.ReactNode;
  disabled?: boolean;
  inset?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export interface ContextMenuSubContentProps {
  children: React.ReactNode;
  className?: string;

  // Positioning
  alignOffset?: number;
  sideOffset?: number;
  collisionPadding?: number;

  // Behavior
  avoidCollisions?: boolean;
  loop?: boolean;

  // Styling
  width?: string | number;
  maxHeight?: string | number;
}

// ===========================
// Separator Props
// ===========================

export interface ContextMenuSeparatorProps {
  className?: string;
  decorative?: boolean;
}

// ===========================
// Label Props
// ===========================

export interface ContextMenuLabelProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

// ===========================
// Shortcut Props
// ===========================

export interface ContextMenuShortcutProps {
  children: React.ReactNode;
  className?: string;
}

// ===========================
// Group Props
// ===========================

export interface ContextMenuGroupProps {
  children: React.ReactNode;
  className?: string;
}
