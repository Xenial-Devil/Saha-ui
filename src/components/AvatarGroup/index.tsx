import React, { Children, isValidElement } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
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
        xs: "ring-0",
        sm: "ring-0",
        md: "ring-0",
        lg: "ring-0",
        xl: "ring-0",
        "2xl": "ring-0",
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
 * Displays a collection of Avatar components in various layouts with smart overflow handling.
 * Features include stacking, grid layouts, hover effects, and "+X more" indicators.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3} variant="stack" size="md">
 *   <Avatar src="/user1.jpg" alt="User 1" />
 *   <Avatar src="/user2.jpg" alt="User 2" />
 *   <Avatar src="/user3.jpg" alt="User 3" />
 *   <Avatar src="/user4.jpg" alt="User 4" />
 * </AvatarGroup>
 * ```
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      size = "md",
      variant = "stack",
      showCount = false,
      reverse = false,
      gap = false,
      withRing = false,
      spacing,
      onMoreClick,
      className,
      ...props
    },
    ref
  ) => {
    // Convert children to array and filter valid Avatar elements
    const childrenArray = Children.toArray(children).filter((child) =>
      isValidElement(child)
    );

    const totalCount = childrenArray.length;
    const maxToShow = max ?? totalCount;

    // Calculate displayed and remaining avatars
    const displayedChildren = reverse
      ? childrenArray.slice(0, maxToShow).reverse()
      : childrenArray.slice(0, maxToShow);
    const remainingCount = Math.max(0, totalCount - maxToShow);

    // Clone children and inject size prop
    const renderAvatar = (child: React.ReactNode, index: number) => {
      if (!isValidElement(child)) return null;

      const isStackMode = variant === "stack" || variant === "row";
      const isGridMode = variant === "grid" || variant === "grid-dense";

      return (
        <div
          key={index}
          className={cn(
            isStackMode && avatarWrapperVariants({ size }),
            isStackMode && withRing && "ring-background",
            isStackMode &&
              index > 0 &&
              !gap &&
              !spacing &&
              getStackOverlap(size),
            isGridMode && "transition-transform duration-200 hover:scale-105"
          )}
          style={spacing ? { marginLeft: index > 0 ? `-${spacing}px` : 0 } : {}}
        >
          {React.cloneElement(
            child as React.ReactElement,
            {
              size: size,
              shape: isGridMode ? "rounded" : "circle",
            } as any
          )}
        </div>
      );
    };

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
          <span className="font-medium">{totalCount}</span>
          <span>member{totalCount !== 1 ? "s" : ""}</span>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ variant }), className)}
        {...props}
      >
        {displayedChildren.map((child, index) => renderAvatar(child, index))}
        {renderMoreIndicator()}
        {renderCountBadge()}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
