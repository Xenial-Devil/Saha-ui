import React from "react";

// Explicit types for better type safety
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square" | "rounded";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alt text for accessibility
   * @default "Avatar"
   */
  alt?: string;

  /**
   * Size of the avatar
   * @default "md"
   */
  size?: AvatarSize;

  /**
   * Shape of the avatar
   * @default "circle"
   */
  shape?: AvatarShape;

  /**
   * Status indicator
   * @default "none"
   */
  status?: AvatarStatus;

  /**
   * Initials to display when image fails to load
   */
  initials?: string;

  /**
   * Whether to show a border
   * @default false
   */
  bordered?: boolean;

  /**
   * Whether to show a ring/glow effect
   * @default false
   */
  ring?: boolean;
}
