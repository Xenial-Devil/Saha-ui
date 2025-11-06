"use client";

import { forwardRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
  isValidFunction,
} from "../../lib/validation";
import type { AspectRatioProps } from "./AspectRatio.types";
import { aspectRatioVariants, overlayVariants } from "./AspectRatio.styles";
import { useAspectRatio } from "../../hooks/useAspectRatio";

/**
 * AspectRatio Component
 *
 * Advanced aspect ratio component that maintains consistent proportions for any content.
 * Perfect for images, videos, iframes, embedded content, and responsive layouts.
 *
 * Features:
 * - 8 preset aspect ratios + custom ratio support
 * - 5 beautiful visual variants
 * - Optional overlay gradients
 * - Smooth hover effects and transitions
 * - Glass morphism support
 * - Fully responsive and accessible
 *
 * @example
 * ```tsx
 * // Basic usage with image
 * <AspectRatio ratio="16/9">
 *   <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
 * </AspectRatio>
 *
 * // Video with glass effect
 * <AspectRatio ratio="21/9" variant="glass" rounded="lg">
 *   <video src="/video.mp4" className="w-full h-full object-cover" />
 * </AspectRatio>
 *
 * // Custom ratio with overlay
 * <AspectRatio ratio="custom" customRatio={2.5} overlay overlayPosition="bottom">
 *   <iframe src="https://example.com" className="w-full h-full" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      children,
      ratio = "16/9",
      customRatio,
      variant = "default",
      rounded = "md",
      overlay = false,
      overlayPosition = "bottom",
      zoomOnHover = false,
      zoomScale = 1.1,
      lazy = false,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className,
      contentClassName,
      ...props
    },
    ref,
  ) => {
    // Use the custom hook for aspect ratio logic
    const {
      paddingBottom,
      safeZoomScale,
      contentRef,
      handleMouseEnter: handleZoomMouseEnter,
      handleMouseLeave: handleZoomMouseLeave,
    } = useAspectRatio({
      ratio,
      customRatio,
      zoomOnHover,
      zoomScale,
    });

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("AspectRatio");

      // Validate ratio
      validator.validateEnum("ratio", ratio, [
        "1/1",
        "4/3",
        "16/9",
        "21/9",
        "3/2",
        "2/3",
        "9/16",
        "3/4",
        "custom",
      ] as const);

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "bordered",
        "glass",
        "glass-strong",
        "gradient",
      ] as const);

      // Validate rounded
      validator.validateEnum("rounded", rounded, [
        "none",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "full",
      ] as const);

      // Validate overlayPosition
      if (overlayPosition) {
        validator.validateEnum("overlayPosition", overlayPosition, [
          "top",
          "bottom",
          "left",
          "right",
          "center",
        ] as const);
      }

      // Validate boolean props
      validator.validateType("overlay", overlay, "boolean", isValidBoolean);
      validator.validateType(
        "zoomOnHover",
        zoomOnHover,
        "boolean",
        isValidBoolean,
      );
      validator.validateType("lazy", lazy, "boolean", isValidBoolean);

      // Validate customRatio
      if (ratio === "custom") {
        if (!customRatio) {
          validator.error(
            '"customRatio" prop is required when ratio is set to "custom"',
          );
        } else {
          // customRatio can be either a number or a string
          const isValidCustomRatio =
            typeof customRatio === "number" || typeof customRatio === "string";
          if (!isValidCustomRatio) {
            validator.error(
              `"customRatio" must be a number or string. Received: ${typeof customRatio}`,
            );
          }
        }
      } else if (customRatio !== undefined) {
        validator.warn(
          `"customRatio" prop is ignored when ratio is "${ratio}". Only use customRatio when ratio="custom".`,
        );
      }

      // Validate zoomScale
      if (zoomScale !== undefined) {
        validator.validateType("zoomScale", zoomScale, "number", isValidNumber);
        if (isValidNumber(zoomScale)) {
          if (zoomScale < 1.0 || zoomScale > 2.0) {
            validator.warn(
              `"zoomScale" should be between 1.0 and 2.0. Received: ${zoomScale}. Value will be clamped.`,
            );
          }
        }
      }

      // Validate callbacks
      if (onClick) {
        validator.validateType("onClick", onClick, "function", isValidFunction);
      }
      if (onMouseEnter) {
        validator.validateType(
          "onMouseEnter",
          onMouseEnter,
          "function",
          isValidFunction,
        );
      }
      if (onMouseLeave) {
        validator.validateType(
          "onMouseLeave",
          onMouseLeave,
          "function",
          isValidFunction,
        );
      }

      // Validate children
      if (!children) {
        validator.warn("AspectRatio should have children content");
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [
      ratio,
      customRatio,
      variant,
      rounded,
      overlay,
      overlayPosition,
      zoomOnHover,
      zoomScale,
      lazy,
      onClick,
      onMouseEnter,
      onMouseLeave,
      children,
      className,
    ]);

    return (
      <div
        ref={ref}
        className={cn(aspectRatioVariants({ variant, rounded }), className)}
        style={{ paddingBottom }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {/* Content wrapper */}
        <div
          ref={contentRef}
          className={cn(
            "absolute inset-0 w-full h-full",
            "transition-transform duration-300",
            zoomOnHover
              ? `group-hover:scale-[${safeZoomScale}]`
              : "group-hover:scale-[1.02]",
            variant === "gradient" && "z-10",
            lazy && "[&_img]:lazy",
            contentClassName,
          )}
          style={
            zoomOnHover
              ? {
                  transform: `scale(1)`,
                  transition: "transform 0.3s ease-out",
                }
              : undefined
          }
          onMouseEnter={handleZoomMouseEnter}
          onMouseLeave={handleZoomMouseLeave}
        >
          {children}
        </div>

        {/* Optional overlay gradient */}
        {overlay && (
          <div
            className={cn(
              overlayVariants({ position: overlayPosition }),
              "group-hover:opacity-80",
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export default AspectRatio;

// Export types
export type { AspectRatioProps } from "./AspectRatio.types";
