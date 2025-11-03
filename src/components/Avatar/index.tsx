import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { AvatarProps } from "./Avatar.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import { avatarVariants, statusVariants } from "./Avatar.styles";



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
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Avatar");

      // Validate size
      validator.validateEnum("size", size, [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
      ] as const);

      // Validate shape
      validator.validateEnum("shape", shape, [
        "circle",
        "square",
        "rounded",
      ] as const);

      // Validate status
      validator.validateEnum("status", status, [
        "online",
        "offline",
        "away",
        "busy",
        "none",
      ] as const);

      // Validate boolean props
      validator.validateType("bordered", bordered, "boolean", isValidBoolean);
      validator.validateType("ring", ring, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [size, shape, status, bordered, ring, className]);

    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Generate background color from initials or alt text
    const getBackgroundColor = (text: string) => {
      const colors = [
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-red-500",
        "bg-indigo-500",
        "bg-teal-500",
      ];
      const index = text.charCodeAt(0) % colors.length;
      return colors[index];
    };

    // Extract initials from alt text
    const getInitials = () => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      const words = alt.split(" ");
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return alt.slice(0, 2).toUpperCase();
    };

    const showInitials = imageError || !src;
    const bgColor = getBackgroundColor(initials || alt);

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
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
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
            {getInitials()}
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
