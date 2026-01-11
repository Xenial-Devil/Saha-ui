"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { cn } from "../../lib/utils";
import type {
  AspectRatioProps,
  LoadingState,
  SkeletonConfig,
} from "./AspectRatio.types";
import {
  aspectRatioVariants,
  overlayVariants,
  skeletonVariants,
  contentWrapperStyles,
  glareStyles,
} from "./AspectRatio.styles";
import { useAspectRatio } from "../../hooks/useAspectRatio";
import { LoadingIndicator } from "./LoadingIndicator";

/**
 * Props interface for media elements (img, video, iframe)
 */
interface MediaElementProps {
  onLoad?: React.ReactEventHandler<HTMLElement>;
  onError?: React.ReactEventHandler<HTMLElement>;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
}

/**
 * Fallback content component
 */
const FallbackContent = ({
  message = "Failed to load content",
}: {
  message?: string;
}) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/80 text-muted-foreground">
    <svg
      className="w-12 h-12 opacity-50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <p className="text-sm font-medium">{message}</p>
  </div>
);

/**
 * Blur placeholder component
 */
const BlurPlaceholder = ({ src }: { src: string }) => (
  <div
    className="absolute inset-0 scale-110 blur-2xl opacity-70"
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    aria-hidden="true"
  />
);

/**
 * Skeleton component
 */
const Skeleton = ({ config }: { config: SkeletonConfig | boolean }) => {
  const skeletonConfig: SkeletonConfig =
    typeof config === "boolean"
      ? { enabled: config, animation: "pulse" }
      : config;

  if (!skeletonConfig.enabled) return null;

  return (
    <div
      className={cn(
        skeletonVariants({ animation: skeletonConfig.animation }),
        "z-5"
      )}
      style={{
        backgroundColor: skeletonConfig.color,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * AspectRatio Component
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, ref) => {
    const {
      children,
      ratio = "16/9",
      customRatio,
      variant = "default",
      rounded = "md",
      overlay = false,
      overlayPosition = "bottom",
      overlayColor,
      overlayOpacity = 0.5,
      zoomOnHover = false,
      zoomScale = 1.05,
      lazy = false,
      lazyThreshold = 0.1,
      lazyRootMargin = "50px",
      skeleton = false,
      blurPlaceholder,
      fallback,
      objectFit = "cover",
      objectPosition = "center",
      animation = "fade",
      animationDuration = 300,
      parallax = false,
      parallaxIntensity = 0.1,
      tilt = false,
      maxTilt = 10,
      glare = false,
      maxGlare = 0.35,
      interactive = false,
      loadingState: controlledLoadingState,
      onLoad,
      onLoadError,
      onInView,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className,
      contentClassName,
      overlayClassName,
      style,
      "aria-label": ariaLabel,
      role,
      tabIndex,
      ...restProps
    } = props;

    // Use the custom hook for aspect ratio logic
    const {
      containerRef,
      contentRef,
      paddingBottom,
      isInView,
      isHovered,
      loadingState: hookLoadingState,
      tiltStyle,
      glareStyle,
      contentStyle,
      handleMouseEnter: handleZoomMouseEnter,
      handleMouseLeave: handleZoomMouseLeave,
      handleMouseMove,
      handleLoad,
      handleError,
    } = useAspectRatio({
      ratio: ratio as "16/9" | "custom",
      customRatio,
      zoomOnHover,
      zoomScale,
      lazy,
      lazyThreshold,
      lazyRootMargin,
      parallax,
      parallaxIntensity,
      tilt,
      maxTilt,
      glare,
      maxGlare,
      animation,
      animationDuration,
      onInView,
      onLoad,
      onLoadError,
    });

    // Use controlled state if provided
    const loadingState: LoadingState =
      controlledLoadingState ?? hookLoadingState;

    // Expose ref using useImperativeHandle
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, []);

    // Combined event handlers
    const handleCombinedMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      handleZoomMouseEnter(e);
      onMouseEnter?.(e);
    };

    const handleCombinedMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      handleZoomMouseLeave(e);
      onMouseLeave?.(e);
    };

    // Clone children to add load handlers if it's an img or video
    const enhancedChildren = useMemo(() => {
      return Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        const elementType = child.type;
        const isMediaElement =
          typeof elementType === "string" &&
          ["img", "video", "iframe"].includes(elementType);

        if (!isMediaElement) {
          return child;
        }

        // Get existing props safely
        const existingProps = child.props as MediaElementProps;
        const existingOnLoad = existingProps.onLoad;
        const existingOnError = existingProps.onError;
        const existingStyle = existingProps.style;

        // Create new props
        const newProps: MediaElementProps = {
          onLoad: (event) => {
            handleLoad();
            existingOnLoad?.(event);
          },
          onError: (event) => {
            const error = new Error("Failed to load media");
            handleError(error);
            existingOnError?.(event);
          },
          loading: lazy ? "lazy" : undefined,
          style: {
            ...existingStyle,
            objectFit,
            objectPosition,
            width: "100%",
            height: "100%",
          },
        };

        // Clone with proper typing
        return cloneElement(
          child as React.ReactElement<MediaElementProps>,
          newProps
        );
      });
    }, [children, handleLoad, handleError, lazy, objectFit, objectPosition]);

    // Determine what to show based on loading state and visibility
    const showSkeleton = skeleton && loadingState === "loading";
    const showBlurPlaceholder = blurPlaceholder && loadingState !== "loaded";
    const showFallback = loadingState === "error";
    const showContent = isInView && !showFallback;
    const showLoadingIndicator =
      loadingState === "loading" && !skeleton && !blurPlaceholder;

    return (
      <div
        ref={containerRef}
        className={cn(
          aspectRatioVariants({ variant, rounded, interactive }),
          className
        )}
        style={{
          paddingBottom,
          ...tiltStyle,
          ...style,
        }}
        onClick={onClick}
        onMouseEnter={handleCombinedMouseEnter}
        onMouseLeave={handleCombinedMouseLeave}
        onMouseMove={handleMouseMove}
        aria-label={ariaLabel}
        role={role || (interactive ? "button" : undefined)}
        tabIndex={interactive ? tabIndex ?? 0 : tabIndex}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }
            : undefined
        }
        {...restProps}
      >
        {/* Blur Placeholder */}
        {showBlurPlaceholder && <BlurPlaceholder src={blurPlaceholder} />}

        {/* Skeleton Loading */}
        {showSkeleton && <Skeleton config={skeleton} />}

        {/* Loading Indicator */}
        {showLoadingIndicator && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <LoadingIndicator variant="spinner" size="md" />
          </div>
        )}

        {/* Content wrapper */}
        {showContent && (
          <div
            ref={contentRef}
            className={cn(
              contentWrapperStyles({ objectFit }),
              "z-10",
              contentClassName
            )}
            style={{
              ...contentStyle,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {enhancedChildren}
          </div>
        )}

        {/* Fallback content */}
        {showFallback && (fallback || <FallbackContent />)}

        {/* Glare effect for tilt */}
        {glare && (
          <div
            className={cn(glareStyles)}
            style={glareStyle}
            aria-hidden="true"
          />
        )}

        {/* Optional overlay gradient */}
        {overlay && !showFallback && (
          <div
            className={cn(
              overlayVariants({ position: overlayPosition }),
              "group-hover:opacity-80",
              overlayClassName
            )}
            style={{
              ...(overlayColor && { background: overlayColor }),
              opacity: isHovered ? overlayOpacity * 0.8 : overlayOpacity,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export default AspectRatio;

export type { AspectRatioProps } from "./AspectRatio.types";
export { LoadingIndicator } from "./LoadingIndicator";
