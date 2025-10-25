import React from "react";

export type CommandSize = "sm" | "md" | "lg";

export type CommandVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost"
  | "glass"
  | "outline";

export interface CommandItem {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  shortcut?: string | string[];
  disabled?: boolean;
  onSelect?: () => void;
  metadata?: Record<string, any>;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

// Base props shared between both APIs
export interface CommandPropsBase {
  /** Items (props-based API) */
  items?: CommandItem[] | CommandGroup[];

  /** Children (component-based API) */
  children?: React.ReactNode;

  /** Search input value (controlled) */
  value?: string;

  /** Callback when search value changes */
  onValueChange?: (value: string) => void;

  /** Placeholder text for search input */
  placeholder?: string;

  /** Empty state message */
  emptyMessage?: string | React.ReactNode;

  /** Loading state */
  loading?: boolean;

  /** Loading message */
  loadingMessage?: string;

  /** Component size */
  size?: CommandSize;

  /** Visual variant */
  variant?: CommandVariant;

  /** Custom className */
  className?: string;

  /** Filter function for search */
  filter?: (items: CommandItem[], search: string) => CommandItem[];

  /** Disable default filtering */
  shouldFilter?: boolean;

  /** Loop keyboard navigation */
  loop?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Maximum items to display */
  maxItems?: number;

  /** Custom empty component */
  renderEmpty?: (search: string) => React.ReactNode;

  /** Custom loading component */
  renderLoading?: () => React.ReactNode;

  /** Callback when item is selected */
  onSelect?: (value: string) => void;

  /** ARIA label */
  ariaLabel?: string;

  /** Additional props */
  [key: string]: any;
}

// Props-based API
export interface CommandPropsItems extends CommandPropsBase {
  items: CommandItem[] | CommandGroup[];
  children?: never;
}

// Component-based API
export interface CommandPropsComponent extends CommandPropsBase {
  children: React.ReactNode;
  items?: never;
}

// Discriminated union
export type CommandProps = CommandPropsItems | CommandPropsComponent;

// Sub-component props
export interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export interface CommandListProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export interface CommandEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CommandLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CommandGroupProps {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}

export interface CommandItemProps {
  value: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string | string[];
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
  children?: React.ReactNode;
  forceMount?: boolean;
}

export interface CommandSeparatorProps {
  className?: string;
}

export interface CommandShortcutProps {
  keys: string | string[];
  className?: string;
}

export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}
