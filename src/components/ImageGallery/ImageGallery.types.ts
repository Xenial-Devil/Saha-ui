import React from "react";
import type { ImageProps } from "../Image/Image.types";

export interface GalleryImage extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  caption?: string;
  id?: string;
}

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * List of images to display
   */
  images: GalleryImage[];

  /**
   * Defines grid layout columns (e.g. 2, 3, 4)
   * @default 3
   */
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };

  /**
   * The spacing between grid items
   * @default "md"
   */
  gap?: "sm" | "md" | "lg" | "xl";

  /**
   * Whether to click an image to open it in a lightbox Dialog
   * @default true
   */
  enableLightbox?: boolean;

  /**
   * Whether to show thumbnails inside the lightbox
   * @default true
   */
  showThumbnails?: boolean;
}
