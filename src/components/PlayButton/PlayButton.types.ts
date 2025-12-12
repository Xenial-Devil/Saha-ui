import React from "react";

/**
 * PlayButton variant types
 */
export type PlayButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "glass";

/**
 * PlayButton size types
 */
export type PlayButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Props for the PlayButton component
 *
 * @example
 * ```tsx
 * <PlayButton variant="primary" size="lg" />
 * <PlayButton variant="glass" isPlaying={true} onToggle={() => {}} />
 * ```
 */
export interface PlayButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onToggle"
  > {
  /**
   * Visual style variant of the play button
   * @default "default"
   */
  variant?: PlayButtonVariant;

  /**
   * Size of the play button
   * @default "md"
   */
  size?: PlayButtonSize;

  /**
   * Whether the button is in playing state
   * @default false
   */
  isPlaying?: boolean;

  /**
   * Callback when play/pause is toggled
   */
  onToggle?: (isPlaying: boolean) => void;

  /**
   * Show pulsing animation
   * @default false
   */
  pulse?: boolean;

  /**
   * Show glow effect
   * @default true
   */
  glow?: boolean;
}
