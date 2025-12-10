import React from "react";

/**
 * Variant options for Image component
 */
export type ImageVariant =
  | "default"
  | "rounded"
  | "circular"
  | "bordered"
  | "glass";

/**
 * Fit options for Image component
 */
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/**
 * Size presets for Image component
 */
export type ImageSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "full";

/**
 * Props for the Image component
 */
export interface ImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "onLoad" | "onError"
  > {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alt text for the image
   */
  alt: string;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: ImageVariant;

  /**
   * Object-fit behavior
   * @default "cover"
   */
  fit?: ImageFit;

  /**
   * Preset size (can be overridden by width/height props)
   */
  size?: ImageSize;

  /**
   * Aspect ratio (e.g., "16/9", "4/3", "1/1")
   */
  aspectRatio?: string;

  /**
   * Enable zoom effect on hover
   * @default false
   */
  zoomOnHover?: boolean;

  /**
   * Show loading skeleton
   * @default true
   */
  showSkeleton?: boolean;

  /**
   * Fallback image URL if main image fails to load
   */
  fallbackSrc?: string;

  /**
   * Fallback content (JSX) if image fails to load
   */
  fallbackContent?: React.ReactNode;

  /**
   * Enable lazy loading
   * @default true
   */
  lazy?: boolean;

  /**
   * Custom loading priority
   * @default "auto"
   */
  priority?: "high" | "low" | "auto";

  /**
   * Callback when image loads successfully
   */
  onLoadSuccess?: (e: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when image fails to load
   */
  onLoadError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;

  /**
   * Additional CSS classes for the image
   */
  className?: string;
}
