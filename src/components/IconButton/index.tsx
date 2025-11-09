"use client";

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import type { IconButtonProps } from "./IconButton.types";
import { iconButtonVariants, iconWrapperVariants } from "./IconButton.styles";
import { Slot } from "../../lib/Slot";

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;

/**
 * IconButton Component
 *
 * A compact button component designed specifically for icons.
 * Perfect for toolbars, action menus, and compact UIs.
 * Supports multiple variants, colors, sizes, shapes, and loading states.
 *
 * @example
 * ```tsx
 * // Basic icon button
 * <IconButton icon={<Heart />} aria-label="Like" />
 *
 * // With color and variant
 * <IconButton
 *   icon={<Star />}
 *   color="primary"
 *   variant="filled"
 *   aria-label="Favorite"
 * />
 *
 * // Different sizes
 * <IconButton icon={<Settings />} size="sm" aria-label="Settings" />
 * <IconButton icon={<Search />} size="lg" aria-label="Search" />
 *
 * // Different shapes
 * <IconButton icon={<Plus />} shape="circle" aria-label="Add" />
 * <IconButton icon={<Menu />} shape="square" aria-label="Menu" />
 *
 * // With loading state
 * <IconButton icon={<Save />} loading aria-label="Save" />
 *
 * // Disabled state
 * <IconButton icon={<Delete />} disabled aria-label="Delete" />
 *
 * // Ghost variant (minimal style)
 * <IconButton icon={<MoreVertical />} variant="ghost" aria-label="More options" />
 *
 * // With custom onClick
 * <IconButton
 *   icon={<Trash />}
 *   onClick={() => console.log('Delete clicked')}
 *   aria-label="Delete item"
 * />
 * ```
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "ghost",
      color = "default",
      size = "md",
      shape = "rounded",
      disabled = false,
      loading = false,
      loadingIcon,
      className,
      iconClassName,
      asChild = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Determine which icon to display
    const displayIcon = loading
      ? loadingIcon || <Loader2 className="h-4 w-4" />
      : icon;

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          iconButtonVariants({
            variant,
            color,
            size,
            shape,
            loading,
          }),
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? (
          displayIcon
        ) : (
          <span
            className={cn(
              iconWrapperVariants({ loading }),
              iconClassName,
            )}
            aria-hidden="true"
          >
            {displayIcon}
          </span>
        )}
      </Comp>
    );
  },
);

IconButton.displayName = "IconButton";

export { IconButton };
export default IconButton;
export type { IconButtonProps };
