import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ImageProps } from "./Image.types";

/**
 * CVA variants for Image container
 */
const imageContainerVariants = cva(
  "relative overflow-hidden transition-all duration-300 isolate group hover:scale-105 active:scale-95 shadow-md hover:shadow-2xl",
  {
    variants: {
      variant: {
        default:
          "rounded-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        rounded:
          "rounded-lg before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
        circular:
          "rounded-full before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-full ring-2 ring-border ring-offset-2 ring-offset-background hover:ring-primary/50",
        bordered:
          "rounded-lg border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
        glass:
          "rounded-lg border border-border/30 bg-background/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none before:rounded-lg",
      },
      size: {
        xs: "w-16 h-16",
        sm: "w-24 h-24",
        md: "w-32 h-32",
        lg: "w-48 h-48",
        xl: "w-64 h-64",
        "2xl": "w-96 h-96",
        full: "w-full h-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * CVA variants for the actual image element
 */
const imageVariants = cva(
  "w-full h-full transition-all duration-500 brightness-100 hover:brightness-110",
  {
    variants: {
      fit: {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        none: "object-none",
        "scale-down": "object-scale-down",
      },
      zoom: {
        true: "hover:scale-125 cursor-zoom-in hover:rotate-2",
        false: "hover:scale-105",
      },
    },
    defaultVariants: {
      fit: "cover",
      zoom: false,
    },
  }
);

/**
 * CVA variants for loading skeleton
 */
const skeletonVariants = cva(
  "absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-primary/10 to-muted before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_2s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        default: "rounded-none",
        rounded: "rounded-lg before:rounded-lg",
        circular: "rounded-full before:rounded-full",
        bordered: "rounded-lg before:rounded-lg",
        glass: "rounded-lg before:rounded-lg backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
