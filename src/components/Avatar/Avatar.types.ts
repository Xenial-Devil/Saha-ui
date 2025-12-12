import React from "react";

// Explicit types for better type safety
export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";
export type AvatarShape = "circle" | "square" | "rounded";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

/**
 * Avatar props - supports both compound component pattern and legacy props pattern
 *
 * Compound pattern:
 * <Avatar>
 *   <AvatarImage src="..." alt="..." />
 *   <AvatarFallback>JB</AvatarFallback>
 * </Avatar>
 *
 * Legacy pattern:
 * <Avatar src="..." alt="..." initials="JB" />
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image source URL (legacy pattern)
   */
  src?: string;

  /**
   * Alt text for accessibility (legacy pattern)
   * @default "Avatar"
   */
  alt?: string;

  /**
   * Fallback content (e.g., initials) to display when image fails to load (legacy pattern)
   */
  fallback?: string;

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
   * Whether to show a border
   * @default false
   */
  bordered?: boolean;

  /**
   * Whether to show a ring/glow effect
   * @default false
   */
  ring?: boolean;

  /**
   * Children elements (AvatarImage, AvatarFallback) for compound pattern
   */
  children?: React.ReactNode;
}

/**
 * Avatar image props
 */
export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for accessibility
   */
  alt?: string;

  /**
   * Callback when image fails to load
   */
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

/**
 * Avatar fallback props
 */
export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Delay before showing fallback (ms)
   * @default 0
   */
  delayMs?: number;

  /**
   * Children content (typically initials)
   */
  children?: React.ReactNode;
}
