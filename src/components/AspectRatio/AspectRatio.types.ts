import React from "react";

/**
 * Common aspect ratio presets
 */
export type AspectRatioPreset =
  | "1/1" // Square
  | "4/3" // Standard
  | "16/9" // Widescreen
  | "21/9" // Ultrawide
  | "3/2" // Photo
  | "2/3" // Portrait photo
  | "9/16" // Portrait video
  | "3/4"; // Portrait standard

/**
 * Visual style variants
 */
export type AspectRatioVariant =
  | "default"
  | "bordered"
  | "glass"
  | "glass-strong"
  | "gradient";

/**
 * Rounding options
 */
export type AspectRatioRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

/**
 * Base props shared by all aspect ratio configurations
 */
interface AspectRatioBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Content to be rendered inside the aspect ratio container
   */
  children: React.ReactNode;

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: AspectRatioVariant;

  /**
   * Border radius size
   * @default "md"
   */
  rounded?: AspectRatioRounded;

  /**
   * Whether to show a subtle overlay gradient
   * @default false
   */
  overlay?: boolean;

  /**
   * Position of the overlay gradient
   * @default "bottom"
   */
  overlayPosition?: "top" | "bottom" | "left" | "right" | "center";

  /**
   * Enable zoom effect on hover
   * @default false
   */
  zoomOnHover?: boolean;

  /**
   * Zoom scale multiplier (clamped between 1.0 and 2.0)
   * @default 1.1
   */
  zoomScale?: number;

  /**
   * Enable lazy loading for images
   * @default false
   */
  lazy?: boolean;

  /**
   * Click event handler
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Mouse enter event handler
   */
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Mouse leave event handler
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
}

/**
 * Props when using a preset ratio
 */
interface AspectRatioPresetProps extends AspectRatioBaseProps {
  /**
   * Preset aspect ratio
   * @default "16/9"
   */
  ratio?: AspectRatioPreset;

  /**
   * Custom aspect ratio (not allowed when using preset)
   */
  customRatio?: never;
}

/**
 * Props when using a custom ratio
 */
interface AspectRatioCustomProps extends AspectRatioBaseProps {
  /**
   * Must be set to "custom" to use customRatio
   */
  ratio: "custom";

  /**
   * Custom aspect ratio value (REQUIRED when ratio is "custom")
   * Supports multiple formats:
   * - Number: 2.5 for 2.5:1 ratio
   * - String: "1.3:2.3", "16:9", "4:3"
   * @example 2.5 for 2.5:1 ratio
   * @example "1.3:2.3" for custom ratio
   * @example "16:9" for widescreen
   */
  customRatio: number | string;
}

/**
 * AspectRatio component props
 *
 * Type-safe union that ensures:
 * - When ratio is "custom", customRatio MUST be provided
 * - When ratio is a preset, customRatio CANNOT be provided
 *
 * @example
 * ```tsx
 * // ✅ Correct: Preset ratio
 * <AspectRatio ratio="16/9">
 *   <img src="/video-thumbnail.jpg" alt="Video" />
 * </AspectRatio>
 *
 * // ✅ Correct: Custom ratio with number
 * <AspectRatio ratio="custom" customRatio={2.5}>
 *   <video src="/movie.mp4" />
 * </AspectRatio>
 *
 * // ✅ Correct: Custom ratio with string
 * <AspectRatio ratio="custom" customRatio="1.3:2.3">
 *   <iframe src="https://example.com" />
 * </AspectRatio>
 *
 * // ❌ Error: customRatio provided without ratio="custom"
 * <AspectRatio ratio="16/9" customRatio={2.5}>
 *   <img src="/image.jpg" />
 * </AspectRatio>
 *
 * // ❌ Error: ratio="custom" without customRatio
 * <AspectRatio ratio="custom">
 *   <img src="/image.jpg" />
 * </AspectRatio>
 * ```
 */
export type AspectRatioProps = AspectRatioPresetProps | AspectRatioCustomProps;
