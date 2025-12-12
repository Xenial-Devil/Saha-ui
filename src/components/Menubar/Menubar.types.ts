import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import {
  menubarTriggerVariants,
  menubarContentVariants,
  menubarItemVariants,
} from "./Menubar.styles";

/**
 * Menubar variant types
 */
export type MenubarVariant =
  | "default"
  | "bordered"
  | "filled"
  | "ghost"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "pink"
  | "indigo"
  | "cyan"
  | "teal"
  | "orange"
  | "glass";

/**
 * Menubar size types
 */
export type MenubarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Props for the Menubar component (root container)
 */
export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The menubar menus
   */
  children: ReactNode;

  /**
   * Visual style variant (includes colors)
   * @default "default"
   */
  variant?: MenubarVariant;

  /**
   * Size of the menubar
   * @default "md"
   */
  size?: MenubarSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarMenu component
 */
export interface MenubarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The menu trigger and content
   */
  children: ReactNode;

  /**
   * Whether the menu is open by default
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarTrigger component
 */
export interface MenubarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menubarTriggerVariants> {
  /**
   * The trigger button content
   */
  children: ReactNode;

  /**
   * Whether the trigger is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarContent component
 */
export interface MenubarContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menubarContentVariants> {
  /**
   * The menu items
   */
  children: ReactNode;

  /**
   * Alignment of the content
   * @default "start"
   */
  align?: "start" | "center" | "end";

  /**
   * Side of the trigger to align to
   * @default "bottom"
   */
  side?: "top" | "bottom" | "left" | "right";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarItem component
 */
export interface MenubarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menubarItemVariants> {
  /**
   * The item content
   */
  children: ReactNode;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to inset the item (for items with shortcuts)
   * @default false
   */
  inset?: boolean;

  /**
   * Click handler
   */
  onSelect?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarCheckboxItem component
 */
export interface MenubarCheckboxItemProps
  extends Omit<MenubarItemProps, "onSelect"> {
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Props for the MenubarRadioGroup component
 */
export interface MenubarRadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The radio items
   */
  children: ReactNode;

  /**
   * The selected value
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarRadioItem component
 */
export interface MenubarRadioItemProps
  extends Omit<MenubarItemProps, "onSelect"> {
  /**
   * The value of this radio item
   */
  value: string;
}

/**
 * Props for the MenubarSub component
 */
export interface MenubarSubProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The sub menu trigger and content
   */
  children: ReactNode;

  /**
   * Whether the submenu is open by default
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarSubTrigger component
 */
export interface MenubarSubTriggerProps extends MenubarItemProps {
  /**
   * The trigger content
   */
  children: ReactNode;
}

/**
 * Props for the MenubarSubContent component
 */
export interface MenubarSubContentProps extends MenubarContentProps {
  /**
   * The submenu items
   */
  children: ReactNode;
}

/**
 * Props for the MenubarSeparator component
 */
export interface MenubarSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarShortcut component
 */
export interface MenubarShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The shortcut text (e.g., "⌘T")
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the MenubarLabel component
 */
export interface MenubarLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label text
   */
  children: ReactNode;

  /**
   * Whether to inset the label
   * @default false
   */
  inset?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
