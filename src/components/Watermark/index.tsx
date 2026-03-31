"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { WatermarkProps } from "./Watermark.types";
import {
  watermarkContainerVariants,
  watermarkOverlayVariants,
  watermarkAbsoluteVariants,
} from "./Watermark.styles";

/**
 * Watermark component
 *
 * A watermark overlay component that creates a repeating, rotated text background
 * over any content, often used to indicate confidential or draft status.
 *
 * @component
 * @example
 * // Wrapping content
 * <Watermark text="CONFIDENTIAL" opacity={0.1}>
 *   <div className="p-8">My Document</div>
 * </Watermark>
 *
 * @example
 * // As an absolute overlay inside a relative container
 * <div className="relative h-64">
 *   <Watermark text="DRAFT" />
 *   <p>Content</p>
 * </div>
 */
export const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(
  (
    {
      text = "CONFIDENTIAL",
      width = 240,
      height = 240,
      fontFamily = "sans-serif",
      fontSize = 24,
      color = "currentColor",
      rotate = -30,
      opacity = 0.05,
      zIndex = 10,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Generate an SVG data URI for the background pattern
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="${color}" 
        opacity="${opacity}" 
        font-family="${fontFamily}" 
        font-size="${fontSize}" 
        transform="rotate(${rotate}, ${width / 2}, ${height / 2})"
      >${text}</text>
    </svg>`;

    // We encode keeping some valid characters to avoid huge payload size compared to base64
    const bgUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}")`;

    if (!children) {
      // Act as an overlay
      return (
        <div
          ref={ref}
          className={cn(watermarkAbsoluteVariants(), className)}
          style={{ backgroundImage: bgUrl, zIndex, ...props.style }}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(watermarkContainerVariants(), className)}
        {...props}
      >
        {children}
        <div
          className={watermarkOverlayVariants()}
          style={{ backgroundImage: bgUrl, zIndex }}
        />
      </div>
    );
  },
);
Watermark.displayName = "Watermark";
