"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { AvatarProps } from "./Avatar.types";
import { avatarVariants, statusVariants } from "./Avatar.styles";
import { useAvatar } from "../../hooks/useAvatar";

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      size = "md",
      shape = "circle",
      status = "none",
      initials,
      bordered = false,
      ring = false,
      className,
      ...props
    },
    ref
  ) => {

    // Use the custom hook for avatar logic
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
      initials,
    });

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
        {!showInitials && (
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
);

Avatar.displayName = "Avatar";

export default Avatar;
