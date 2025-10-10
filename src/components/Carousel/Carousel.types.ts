import React from "react";

/**
 * Transition effect for carousel slides
 */
export type CarouselEffect = "slide" | "fade" | "cube" | "flip";

/**
 * Variant options for Carousel styling
 */
export type CarouselVariant = "default" | "contained" | "bordered" | "glass";

/**
 * Autoplay direction
 */
export type CarouselDirection = "forward" | "backward";

/**
 * Props for individual carousel items
 */
export interface CarouselItemProps {
  /**
   * Image source URL
   */
  image: string;

  /**
   * Alt text for the image
   */
  alt: string;

  /**
   * Caption text displayed at the bottom
   */
  caption?: string;

  /**
   * Title overlay text
   */
  title?: string;

  /**
   * Description overlay text
   */
  description?: string;

  /**
   * Call-to-action link URL
   */
  link?: string;

  /**
   * Text for the CTA button
   */
  linkText?: string;

  /**
   * Click handler (alternative to link)
   */
  onClick?: () => void;

  /**
   * Link target attribute
   * @default "_blank"
   */
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * Additional CSS classes for the item
   */
  className?: string;

  /**
   * Custom icon component for the link button
   */
  LinkIcon?: React.ElementType | null;
}

/**
 * Props for the Carousel component
 */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of carousel items to display
   */
  items?: CarouselItemProps[];

  /**
   * Children elements (alternative to items prop)
   */
  children?: React.ReactNode;

  /**
   * Enable autoplay
   * @default false
   */
  autoplay?: boolean;

  /**
   * Autoplay interval in milliseconds
   * @default 5000
   */
  autoplayInterval?: number;

  /**
   * Autoplay direction
   * @default "forward"
   */
  direction?: CarouselDirection;

  /**
   * Show navigation arrows
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Show dot indicators
   * @default true
   */
  showIndicators?: boolean;

  /**
   * Show thumbnail preview
   * @default false
   */
  showThumbnails?: boolean;

  /**
   * Transition effect
   * @default "slide"
   */
  effect?: CarouselEffect;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: CarouselVariant;

  /**
   * Enable infinite loop
   * @default true
   */
  loop?: boolean;

  /**
   * Pause autoplay on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Enable swipe gestures
   * @default true
   */
  swipeable?: boolean;

  /**
   * Callback when slide changes
   */
  onSlideChange?: (index: number) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
