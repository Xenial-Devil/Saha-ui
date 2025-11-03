import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ImageProps } from "./Image.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import {
  imageContainerVariants,
  imageVariants,
  skeletonVariants,
} from "./Image.styles";

/**
 * Ultra-modern Image component
 *
 * Advanced image component with lazy loading, skeleton states, error fallbacks,
 * zoom effects, and multiple visual variants. Handles loading and error states
 * gracefully with beautiful transitions.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/photo.jpg"
 *   alt="Beautiful photo"
 *   variant="rounded"
 *   size="lg"
 *   zoomOnHover
 *   aspectRatio="16/9"
 * />
 * ```
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      variant = "default",
      fit = "cover",
      size,
      aspectRatio,
      zoomOnHover = false,
      showSkeleton = true,
      fallbackSrc,
      fallbackContent,
      lazy = true,
      priority = "auto",
      onLoadSuccess,
      onLoadError,
      containerClassName,
      className,
      width,
      height,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Image");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "rounded",
        "circular",
        "bordered",
        "glass",
      ] as const);

      // Validate fit
      validator.validateEnum("fit", fit, [
        "cover",
        "contain",
        "fill",
        "none",
        "scale-down",
      ] as const);

      // Validate size if provided
      if (size !== undefined) {
        validator.validateEnum("size", size, [
          "xs",
          "sm",
          "md",
          "lg",
          "xl",
          "2xl",
          "full",
        ] as const);
      }

      // Validate priority if provided
      if (priority !== undefined) {
        validator.validateEnum("priority", priority, [
          "auto",
          "high",
          "low",
        ] as const);
      }

      // Validate boolean props
      validator.validateType(
        "zoomOnHover",
        zoomOnHover,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "showSkeleton",
        showSkeleton,
        "boolean",
        isValidBoolean
      );
      validator.validateType("lazy", lazy, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      fit,
      size,
      priority,
      zoomOnHover,
      showSkeleton,
      lazy,
      className,
    ]);

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Handle image load
    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(false);
      onLoadSuccess?.(e);
    };

    // Handle image error
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);

      // Try fallback src if available and not already tried
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        return;
      }

      setHasError(true);
      onLoadError?.(e);
    };

    // Render fallback content
    const renderFallback = () => {
      if (fallbackContent) {
        return fallbackContent;
      }

      return (
        <div className="flex flex-col items-center justify-center h-full bg-muted text-muted-foreground p-4">
          <svg
            className="w-12 h-12 mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-center">Image unavailable</span>
        </div>
      );
    };

    // Container styles
    const containerStyle: React.CSSProperties = {
      ...(aspectRatio && { aspectRatio }),
      ...(width && !size && { width }),
      ...(height && !size && { height }),
    };

    return (
      <div
        className={cn(
          imageContainerVariants({ variant, size }),
          containerClassName
        )}
        style={containerStyle}
      >
        {/* Loading skeleton */}
        {isLoading && showSkeleton && (
          <div className={skeletonVariants({ variant })} />
        )}

        {/* Error fallback */}
        {hasError ? (
          renderFallback()
        ) : (
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            fetchPriority={priority}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              imageVariants({ fit, zoom: zoomOnHover }),
              isLoading && "opacity-0",
              !isLoading && "opacity-100",
              className
            )}
            width={width}
            height={height}
            {...props}
          />
        )}
      </div>
    );
  }
);

Image.displayName = "Image";

export default Image;
