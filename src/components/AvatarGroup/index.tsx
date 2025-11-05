"use client";

import React, { Children, isValidElement, useEffect } from "react";
import { cn } from "../../lib/utils";
import { AvatarGroupProps, AvatarGroupSize } from "./AvatarGroup.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import {
  avatarGroupVariants,
  avatarWrapperVariants,
  moreIndicatorVariants,
} from "./AvatarGroup.styles";

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
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("AvatarGroup");

      // Validate size
      validator.validateEnum("size", size, [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
      ] as const);

      // Validate variant
      validator.validateEnum("variant", variant, [
        "stack",
        "row",
        "grid",
        "grid-dense",
      ] as const);

      // Validate numeric props
      if (max !== undefined) {
        validator.validateType("max", max, "number", isValidNumber);
        if (max <= 0) {
          validator.error("max must be greater than 0");
        }
      }

      if (spacing !== undefined) {
        validator.validateType("spacing", spacing, "number", isValidNumber);
        if (spacing < 0) {
          validator.error("spacing must be non-negative");
        }
      }

      // Validate boolean props
      validator.validateType("showCount", showCount, "boolean", isValidBoolean);
      validator.validateType("reverse", reverse, "boolean", isValidBoolean);
      validator.validateType("gap", gap, "boolean", isValidBoolean);
      validator.validateType("withRing", withRing, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [
      size,
      variant,
      max,
      spacing,
      showCount,
      reverse,
      gap,
      withRing,
      className,
    ]);

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
