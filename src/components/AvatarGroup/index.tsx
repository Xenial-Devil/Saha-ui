import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import Avatar from "../Avatar";
import { AvatarGroupProps, AvatarGroupSize } from "./AvatarGroup.types";

/**
 * CVA variants for AvatarGroup container
 */
const avatarGroupVariants = cva("flex items-center", {
  variants: {
    variant: {
      stack: "flex-row",
      row: "flex-row gap-2",
      grid: "grid grid-cols-3 gap-2",
      "grid-dense": "grid grid-cols-4 gap-1",
    },
  },
  defaultVariants: {
    variant: "stack",
  },
});

/**
 * CVA variants for individual avatar wrapper in stack mode
 */
const avatarWrapperVariants = cva(
  "relative transition-all duration-200 hover:scale-110 hover:z-50",
  {
    variants: {
      size: {
        xs: "ring-1",
        sm: "ring-1",
        md: "ring-2",
        lg: "ring-2",
        xl: "ring-2",
        "2xl": "ring-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * CVA variants for the "+X more" indicator
 */
const moreIndicatorVariants = cva(
  "flex items-center justify-center font-semibold transition-all duration-200 hover:scale-110 cursor-pointer",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
      },
      variant: {
        stack:
          "rounded-full ring-2 ring-background bg-gradient-to-br from-primary/20 to-accent/20 text-foreground backdrop-blur-sm",
        row: "rounded-full ring-2 ring-background bg-gradient-to-br from-primary/20 to-accent/20 text-foreground backdrop-blur-sm",
        grid: "rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-foreground/80",
        "grid-dense":
          "rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-foreground/80",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "stack",
    },
  }
);

/**
 * Get size dimensions for more indicator
 */
const getMoreIndicatorSize = (size: AvatarGroupSize): string => {
  const sizes: Record<AvatarGroupSize, string> = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-14 h-14",
    "2xl": "w-16 h-16",
  };
  return sizes[size];
};

/**
 * Get negative margin for stack overlap
 */
const getStackOverlap = (size: AvatarGroupSize): string => {
  const overlaps: Record<AvatarGroupSize, string> = {
    xs: "-ml-2",
    sm: "-ml-2",
    md: "-ml-3",
    lg: "-ml-4",
    xl: "-ml-5",
    "2xl": "-ml-6",
  };
  return overlaps[size];
};

/**
 * Ultra-modern AvatarGroup component
 *
 * Displays a collection of avatars in various layouts with smart overflow handling.
 * Features include stacking, grid layouts, hover effects, and "+X more" indicators.
 *
 * @example
 * ```tsx
 * <AvatarGroup
 *   avatars={[
 *     { src: '/user1.jpg', alt: 'User 1' },
 *     { src: '/user2.jpg', alt: 'User 2' },
 *     { src: '/user3.jpg', alt: 'User 3' },
 *   ]}
 *   max={2}
 *   variant="stack"
 *   size="md"
 *   showCount
 * />
 * ```
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      max = avatars.length,
      size = "md",
      variant = "stack",
      showCount = false,
      reverse = false,
      spacing,
      onMoreClick,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate displayed and remaining avatars
    const displayedAvatars = reverse
      ? avatars.slice(0, max).reverse()
      : avatars.slice(0, max);
    const remainingCount = Math.max(0, avatars.length - max);

    // Render individual avatar in stack mode
    const renderStackAvatar = (avatar: (typeof avatars)[0], index: number) => (
      <div
        key={index}
        className={cn(
          avatarWrapperVariants({ size }),
          "ring-background",
          index > 0 && !spacing && getStackOverlap(size)
        )}
        style={spacing ? { marginLeft: index > 0 ? `-${spacing}px` : 0 } : {}}
      >
        <Avatar {...avatar} size={size} shape="circle" />
      </div>
    );

    // Render individual avatar in grid mode
    const renderGridAvatar = (avatar: (typeof avatars)[0], index: number) => (
      <div
        key={index}
        className="transition-transform duration-200 hover:scale-105"
      >
        <Avatar {...avatar} size={size} shape="rounded" />
      </div>
    );

    // Render "+X more" indicator
    const renderMoreIndicator = () => {
      if (remainingCount <= 0) return null;

      return (
        <div
          className={cn(
            moreIndicatorVariants({ size, variant }),
            getMoreIndicatorSize(size),
            variant === "stack" && getStackOverlap(size)
          )}
          onClick={onMoreClick}
          role={onMoreClick ? "button" : undefined}
          tabIndex={onMoreClick ? 0 : undefined}
          onKeyDown={
            onMoreClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onMoreClick();
                  }
                }
              : undefined
          }
        >
          +{remainingCount}
        </div>
      );
    };

    // Render total count badge
    const renderCountBadge = () => {
      if (!showCount) return null;

      return (
        <div className="ml-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="font-medium">{avatars.length}</span>
          <span>member{avatars.length !== 1 ? "s" : ""}</span>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ variant }), className)}
        {...props}
      >
        {variant === "stack" || variant === "row"
          ? displayedAvatars.map((avatar, index) =>
              renderStackAvatar(avatar, index)
            )
          : displayedAvatars.map((avatar, index) =>
              renderGridAvatar(avatar, index)
            )}
        {renderMoreIndicator()}
        {renderCountBadge()}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
