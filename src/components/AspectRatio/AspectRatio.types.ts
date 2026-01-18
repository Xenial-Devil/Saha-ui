import type React from "react";

/**
 * Common aspect ratio presets with descriptive names
 */
export type AspectRatioPreset =
  | "1/1" // Square - Profile pictures, avatars
  | "4/3" // Standard - Classic photography
  | "16/9" // Widescreen - Videos, presentations
  | "21/9" // Ultra-wide - Cinema, banners
  | "3/2" // Photo - DSLR photography
  | "2/3" // Portrait photo
  | "9/16" // Portrait video - Stories, Reels
  | "3/4" // Portrait standard
  | "5/4" // Large format photography
  | "2/1" // Panoramic
  | "1/2"; // Tall portrait

/**
 * Visual style variants
 */
export type AspectRatioVariant =
  | "default"
  | "bordered"
  | "glass"
  | "glass-strong"
  | "gradient"
  | "elevated"
  | "minimal"
  | "neon"
  | "frosted";

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
  | "3xl"
  | "full";

/**
 * Object fit options for content
 */
export type ObjectFitOption =
  | "cover"
  | "contain"
  | "fill"
  | "none"
  | "scale-down";

/**
 * Loading state types
 */
export type LoadingState = "idle" | "loading" | "loaded" | "error";

/**
 * Animation presets
 */
export type AnimationPreset =
  | "none"
  | "fade"
  | "scale"
  | "slide-up"
  | "slide-down"
  | "blur"
  | "reveal";

/**
 * Responsive ratio configuration
 */
export interface ResponsiveRatio {
  base?: AspectRatioPreset | "custom";
  sm?: AspectRatioPreset | "custom";
  md?: AspectRatioPreset | "custom";
  lg?: AspectRatioPreset | "custom";
  xl?: AspectRatioPreset | "custom";
  "2xl"?: AspectRatioPreset | "custom";
}

/**
 * Skeleton configuration
 */
export interface SkeletonConfig {
  enabled?: boolean;
  animation?: "pulse" | "wave" | "shimmer";
  color?: string;
  highlightColor?: string;
}

/**
 * Base props shared by all aspect ratio configurations
 * Note: We omit 'onError' from HTMLAttributes to avoid conflict with our custom onLoadError
 */
interface AspectRatioBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onError"> {
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
  overlayPosition?: "top" | "bottom" | "left" | "right" | "center" | "full";

  /**
   * Custom overlay color (CSS gradient or color)
   */
  overlayColor?: string;

  /**
   * Overlay opacity (0-1)
   * @default 0.5
   */
  overlayOpacity?: number;

  /**
   * Enable zoom effect on hover
   * @default false
   */
  zoomOnHover?: boolean;

  /**
   * Zoom scale multiplier (clamped between 1.0 and 2.0)
   * @default 1.05
   */
  zoomScale?: number;

  /**
   * Enable lazy loading with intersection observer
   * @default false
   */
  lazy?: boolean;

  /**
   * Intersection observer threshold for lazy loading
   * @default 0.1
   */
  lazyThreshold?: number;

  /**
   * Root margin for intersection observer
   * @default "50px"
   */
  lazyRootMargin?: string;

  /**
   * Show skeleton while loading
   */
  skeleton?: boolean | SkeletonConfig;

  /**
   * Blur placeholder image URL
   */
  blurPlaceholder?: string;

  /**
   * Fallback content when loading fails
   */
  fallback?: React.ReactNode;

  /**
   * Object fit for content
   * @default "cover"
   */
  objectFit?: ObjectFitOption;

  /**
   * Object position for content
   * @default "center"
   */
  objectPosition?: string;

  /**
   * Animation preset for content reveal
   * @default "fade"
   */
  animation?: AnimationPreset;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Enable parallax effect on scroll
   * @default false
   */
  parallax?: boolean;

  /**
   * Parallax intensity (0-1)
   * @default 0.1
   */
  parallaxIntensity?: number;

  /**
   * Enable tilt effect on hover (3D)
   * @default false
   */
  tilt?: boolean;

  /**
   * Maximum tilt angle in degrees
   * @default 10
   */
  maxTilt?: number;

  /**
   * Enable shine/glare effect on tilt
   * @default false
   */
  glare?: boolean;

  /**
   * Maximum glare opacity
   * @default 0.35
   */
  maxGlare?: number;

  /**
   * Interactive - enables focus states and keyboard nav
   * @default false
   */
  interactive?: boolean;

  /**
   * Loading state (controlled)
   */
  loadingState?: LoadingState;

  /**
   * Callback when content loads successfully
   */
  onLoad?: () => void;

  /**
   * Callback when content fails to load
   * Named onLoadError to avoid conflict with native onError
   */
  onLoadError?: (error: Error) => void;

  /**
   * Callback when element enters viewport
   */
  onInView?: () => void;

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

  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;

  /**
   * Accessible label for the container
   */
  "aria-label"?: string;

  /**
   * Role for accessibility
   */
  role?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;
}

/**
 * Props when using a preset ratio
 */
interface AspectRatioPresetProps extends AspectRatioBaseProps {
  ratio?: AspectRatioPreset;
  customRatio?: never;
  responsiveRatio?: never;
}

/**
 * Props when using a custom ratio
 */
interface AspectRatioCustomProps extends AspectRatioBaseProps {
  ratio: "custom";
  customRatio: number | string;
  responsiveRatio?: never;
}

/**
 * Props when using responsive ratios
 */
interface AspectRatioResponsiveProps extends AspectRatioBaseProps {
  ratio?: never;
  customRatio?: never;
  responsiveRatio: ResponsiveRatio;
}

/**
 * Union type for all AspectRatio props
 */
export type AspectRatioProps =
  | AspectRatioPresetProps
  | AspectRatioCustomProps
  | AspectRatioResponsiveProps;

/**
 * Hook configuration
 */
export interface UseAspectRatioConfig {
  ratio?: AspectRatioPreset | "custom";
  customRatio?: number | string;
  zoomOnHover?: boolean;
  zoomScale?: number;
  lazy?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
  parallax?: boolean;
  parallaxIntensity?: number;
  tilt?: boolean;
  maxTilt?: number;
  glare?: boolean;
  maxGlare?: number;
  animation?: AnimationPreset;
  animationDuration?: number;
  onInView?: () => void;
  onLoad?: () => void;
  onLoadError?: (error: Error) => void;
}

/**
 * Hook return type
 * Note: Refs can be null, so we use RefObject<T | null>
 */
export interface UseAspectRatioReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  paddingBottom: string;
  isInView: boolean;
  isHovered: boolean;
  loadingState: LoadingState;
  tiltStyle: React.CSSProperties;
  glareStyle: React.CSSProperties;
  contentStyle: React.CSSProperties;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleLoad: () => void;
  handleError: (error: Error) => void;
  safeZoomScale: number;
}
