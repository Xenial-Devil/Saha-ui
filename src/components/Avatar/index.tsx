import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { AvatarProps } from "./Avatar.types";

// CVA variants for Avatar
const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden font-semibold transition-all duration-300 ease-out select-none",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-[10px]",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
        "2xl": "w-20 h-20 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
      },
      bordered: {
        true: "ring-2 ring-border ring-offset-2 ring-offset-background",
        false: "",
      },
      ring: {
        true: "ring-4 ring-primary/30 ring-offset-2 ring-offset-background shadow-lg shadow-primary/20",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      bordered: false,
      ring: false,
    },
  }
);

// Status indicator variants
const statusVariants = cva(
  "absolute bottom-0 right-0 rounded-full border-2 border-background transition-all duration-200",
  {
    variants: {
      size: {
        xs: "w-1.5 h-1.5",
        sm: "w-2 h-2",
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3",
        xl: "w-3.5 h-3.5",
        "2xl": "w-4 h-4",
      },
      status: {
        online: "bg-success shadow-[0_0_8px_0] shadow-success/50",
        offline: "bg-muted",
        away: "bg-warning shadow-[0_0_8px_0] shadow-warning/50",
        busy: "bg-destructive shadow-[0_0_8px_0] shadow-destructive/50",
        none: "hidden",
      },
    },
    defaultVariants: {
      size: "md",
      status: "none",
    },
  }
);

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
