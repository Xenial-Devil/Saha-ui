"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./Avatar.types";
import { avatarVariants, statusVariants } from "./Avatar.styles";
import { useAvatar } from "../../hooks/useAvatar";

// Avatar Context for compound component pattern
interface AvatarContextValue {
  imageLoadingStatus: "loading" | "loaded" | "error";
  setImageLoadingStatus: (status: "loading" | "loaded" | "error") => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  return context;
};

/**
 * Avatar Component
 * Supports both compound component pattern and legacy props pattern
 *
 * Compound pattern:
 * <Avatar>
 *   <AvatarImage src="..." alt="..." />
 *   <AvatarFallback>JB</AvatarFallback>
 * </Avatar>
 *
 * Legacy pattern:
 * <Avatar src="..." alt="..." initials="JB" />
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      fallback,
      size = "md",
      shape = "circle",
      status = "none",
      bordered = false,
      ring = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState<
      "loading" | "loaded" | "error"
    >("loading");

    // Check if using legacy pattern (src prop provided without children being AvatarImage/AvatarFallback)
    const isLegacyPattern =
      src !== undefined || (fallback !== undefined && !children);

    // Use the custom hook for legacy avatar logic
    const {
      showInitials,
      bgColor,
      initialsText,
      imageLoaded,
      handleImageLoad,
      handleImageError,
    } = useAvatar({
      src,
      alt,
      initials: fallback,
    });

    // Legacy pattern rendering
    if (isLegacyPattern) {
      return (
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size, shape, bordered, ring }),
            showInitials && bgColor,
            showInitials && "text-white",
            className
          )}
          {...props}
        >
          {/* Image */}
          {!showInitials && src && (
            <>
              <img
                src={src}
                alt={alt}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </>
          )}

          {/* Initials fallback */}
          {showInitials && (
            <span className="relative z-10 font-bold tracking-tight">
              {initialsText}
            </span>
          )}

          {/* Status indicator */}
          {status !== "none" && (
            <span className={cn(statusVariants({ size, status }))} />
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-black/0 group-hover:from-white/10 group-hover:to-black/5 transition-all duration-300 pointer-events-none" />
        </div>
      );
    }

    // Compound component pattern rendering
    return (
      <AvatarContext.Provider
        value={{ imageLoadingStatus, setImageLoadingStatus }}
      >
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size, shape, bordered, ring }),
            className
          )}
          {...props}
        >
          {children}

          {/* Status indicator */}
          {status !== "none" && (
            <span className={cn(statusVariants({ size, status }))} />
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-black/0 group-hover:from-white/10 group-hover:to-black/5 transition-all duration-300 pointer-events-none" />
        </div>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * AvatarImage Component
 * Displays the avatar image with loading state handling
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (
    { src, alt = "Avatar", className, onLoadingStatusChange, ...props },
    ref
  ) => {
    const context = useAvatarContext();
    const [loadStatus, setLoadStatus] = useState<
      "loading" | "loaded" | "error"
    >("loading");

    const handleLoad = () => {
      setLoadStatus("loaded");
      context?.setImageLoadingStatus("loaded");
      onLoadingStatusChange?.("loaded");
    };

    const handleError = () => {
      setLoadStatus("error");
      context?.setImageLoadingStatus("error");
      onLoadingStatusChange?.("error");
    };

    useEffect(() => {
      if (src) {
        setLoadStatus("loading");
        context?.setImageLoadingStatus("loading");
        onLoadingStatusChange?.("loading");
      } else {
        setLoadStatus("error");
        context?.setImageLoadingStatus("error");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    if (!src || loadStatus === "error") {
      return null;
    }

    return (
      <>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            loadStatus === "loaded" ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
        {/* Loading skeleton */}
        {loadStatus === "loading" && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </>
    );
  }
);

AvatarImage.displayName = "AvatarImage";

/**
 * AvatarFallback Component
 * Displays fallback content when image fails or is loading
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ delayMs = 0, className, children, ...props }, ref) => {
    const context = useAvatarContext();
    const [canRender, setCanRender] = useState(delayMs === 0);

    useEffect(() => {
      if (delayMs > 0) {
        const timer = setTimeout(() => setCanRender(true), delayMs);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [delayMs]);

    // Show fallback when image has error or when there's no context (standalone usage)
    const shouldShow =
      canRender && (!context || context.imageLoadingStatus === "error");

    if (!shouldShow) {
      return null;
    }

    // Generate background color from children content
    const getBackgroundColor = () => {
      if (!children) return "bg-muted";
      const text = String(children);
      const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-cyan-500",
        "bg-orange-500",
      ];
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };

    return (
      <span
        ref={ref}
        className={cn(
          "absolute inset-0 flex items-center justify-center font-bold tracking-tight text-white",
          getBackgroundColor(),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export default Avatar;
export { Avatar, AvatarImage, AvatarFallback };
