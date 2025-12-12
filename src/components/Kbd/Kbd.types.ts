import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { kbdVariants, kbdGroupVariants } from "./Kbd.styles";

/**
 * Kbd variant types
 * Determines the visual style of the keyboard key
 */
export type KbdVariant =
  | "default"
  | "bordered"
  | "solid"
  | "flat"
  | "ghost"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "glass";

/**
 * Kbd size types
 * Controls the dimensions and font size
 */
export type KbdSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Kbd color types for semantic colors
 */
export type KbdColor =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Props for the Kbd component
 *
 * @example
 * ```tsx
 * // Basic kbd
 * <Kbd>⌘</Kbd>
 *
 * // With variant and size
 * <Kbd variant="solid" size="lg">Ctrl</Kbd>
 *
 * // With description
 * <Kbd>
 *   <KbdKey>⌘</KbdKey>
 *   <KbdDescription>Command</KbdDescription>
 * </Kbd>
 * ```
 */
export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof kbdVariants> {
  /**
   * The keyboard key text or symbol
   */
  children: ReactNode;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: KbdVariant;

  /**
   * Size of the kbd
   * @default "md"
   */
  size?: KbdSize;

  /**
   * Color variant (semantic colors)
   */
  color?: KbdColor;

  /**
   * Whether the key is pressed/active
   * @default false
   */
  pressed?: boolean;

  /**
   * Whether the key is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Key abbreviation (for compact display)
   */
  abbr?: string;

  /**
   * Long form description
   */
  title?: string;

  /**
   * When true, the Kbd will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for the KbdGroup component
 *
 * @example
 * ```tsx
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 * ```
 */
export interface KbdGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kbdGroupVariants> {
  /**
   * The keyboard keys in the group
   */
  children: ReactNode;

  /**
   * Separator between keys
   * @default "+"
   */
  separator?: ReactNode;

  /**
   * Whether to show separator
   * @default true
   */
  showSeparator?: boolean;

  /**
   * Size of the kbd group (applies to all children)
   * @default "md"
   */
  size?: KbdSize;

  /**
   * Variant of the kbd group (applies to all children)
   */
  variant?: KbdVariant;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the KbdKey component (sub-component)
 */
export interface KbdKeyProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The key symbol or text
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the KbdDescription component (sub-component)
 */
export interface KbdDescriptionProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The description text
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Common keyboard symbols mapping
 */
export const KEYBOARD_SYMBOLS = {
  // Modifiers
  command: "⌘",
  cmd: "⌘",
  shift: "⇧",
  option: "⌥",
  opt: "⌥",
  alt: "⌥",
  control: "⌃",
  ctrl: "⌃",

  // Special keys
  enter: "↵",
  return: "↵",
  delete: "⌫",
  backspace: "⌫",
  escape: "⎋",
  esc: "⎋",
  tab: "⇥",
  capslock: "⇪",
  caps: "⇪",

  // Arrows
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",

  // Others
  space: "␣",
  pageup: "⇞",
  pagedown: "⇟",
  home: "⇱",
  end: "⇲",
} as const;

export type KeyboardSymbol = keyof typeof KEYBOARD_SYMBOLS;
