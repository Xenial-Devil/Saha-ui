"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { ComponentValidator } from "../../lib/validation";
import {
  itemVariants,
  itemMediaVariants,
  itemContentVariants,
  itemTitleVariants,
  itemDescriptionVariants,
  itemActionsVariants,
  itemHeaderVariants,
  itemFooterVariants,
  itemGroupVariants,
  itemSeparatorVariants,
  itemBadgeVariants,
} from "./Item.styles";
import type {
  ItemProps,
  ItemMediaProps,
  ItemContentProps,
  ItemTitleProps,
  ItemDescriptionProps,
  ItemActionsProps,
  ItemHeaderProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemSeparatorProps,
  ItemBadgeProps,
  ItemVariant,
  ItemSize,
  ItemMediaVariant,
} from "./Item.types";

// Validation constants
const VALID_VARIANTS: readonly ItemVariant[] = [
  "default",
  "bordered",
  "elevated",
  "ghost",
  "glass",
  "soft",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
] as const;

const VALID_SIZES: readonly ItemSize[] = ["sm", "md", "lg"] as const;

const VALID_MEDIA_VARIANTS: readonly ItemMediaVariant[] = [
  "icon",
  "avatar",
  "image",
  "thumbnail",
] as const;

// Validator instance
const validator = new ComponentValidator("Item");

/**
 * Item Component
 *
 * A flexible, composable component for displaying content with media, title,
 * description, and actions. Supports both compact props-based and component APIs.
 *
 * @example
 * ```tsx
 * // Compact API
 * <Item
 *   media={<Home />}
 *   title="Dashboard"
 *   description="View your overview"
 *   actions={<Button size="sm">View</Button>}
 * />
 *
 * // Component API
 * <Item asChild>
 *   <a href="/dashboard">
 *     <ItemMedia variant="icon"><Home /></ItemMedia>
 *     <ItemContent>
 *       <ItemTitle>Dashboard</ItemTitle>
 *       <ItemDescription>View your overview</ItemDescription>
 *     </ItemContent>
 *     <ItemActions><Button>View</Button></ItemActions>
 *   </a>
 * </Item>
 * ```
 */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      clickable = false,
      active = false,
      disabled = false,
      asChild = false,
      className,
      // Compact API props
      media,
      mediaVariant = "icon",
      title,
      description,
      actions,
      header,
      footer,
      badge,
      ...props
    },
    ref
  ) => {
    // Runtime validation (development mode only)
    React.useEffect(() => {
      validator.validateEnum("variant", variant, VALID_VARIANTS);
      validator.validateEnum("size", size, VALID_SIZES);
      validator.validateEnum(
        "mediaVariant",
        mediaVariant,
        VALID_MEDIA_VARIANTS
      );

      // Validate boolean props
      validator.validateType(
        "clickable",
        clickable,
        "boolean",
        (v) => typeof v === "boolean"
      );
      validator.validateType(
        "active",
        active,
        "boolean",
        (v) => typeof v === "boolean"
      );
      validator.validateType(
        "disabled",
        disabled,
        "boolean",
        (v) => typeof v === "boolean"
      );
      validator.validateType(
        "asChild",
        asChild,
        "boolean",
        (v) => typeof v === "boolean"
      );

      // Warn about conflicting states
      if (active && disabled) {
        validator.warn(
          "Item cannot be both 'active' and 'disabled'. 'disabled' will take precedence."
        );
      }

      // Warn about asChild usage
      if (asChild && !React.isValidElement(children)) {
        validator.error(
          "When 'asChild' is true, children must be a valid React element."
        );
      }

      // Warn about compact API + children usage
      const isCompactAPI = !!(
        media ||
        title ||
        description ||
        actions ||
        header ||
        footer
      );
      if (isCompactAPI && children && !asChild) {
        validator.warn(
          "Using both compact API props and children. Children will be appended after compact content."
        );
      }
    }, [
      variant,
      size,
      mediaVariant,
      clickable,
      active,
      disabled,
      asChild,
      children,
      media,
      title,
      description,
      actions,
      header,
      footer,
    ]);

    const Comp = asChild ? React.Fragment : "div";

    // If using compact API
    const isCompactAPI = !!(
      media ||
      title ||
      description ||
      actions ||
      header ||
      footer
    );

    // Render compact API
    if (isCompactAPI && !asChild) {
      return (
        <div
          ref={ref}
          className={cn(
            itemVariants({ variant, size, clickable, active, disabled }),
            "flex-col",
            className
          )}
          {...props}
        >
          {/* Header */}
          {header && <ItemHeader>{header}</ItemHeader>}

          {/* Main content */}
          <div className="flex items-start gap-3 w-full">
            {/* Media */}
            {media && (
              <ItemMedia variant={mediaVariant} size={size}>
                {media}
              </ItemMedia>
            )}

            {/* Content */}
            <ItemContent>
              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex-1 min-w-0">
                  {title && <ItemTitle>{title}</ItemTitle>}
                  {description && (
                    <ItemDescription>{description}</ItemDescription>
                  )}
                </div>
                {badge && <ItemBadge>{badge}</ItemBadge>}
              </div>
            </ItemContent>

            {/* Actions */}
            {actions && <ItemActions>{actions}</ItemActions>}
          </div>

          {/* Footer */}
          {footer && <ItemFooter>{footer}</ItemFooter>}

          {/* Children (additional content) */}
          {children}
        </div>
      );
    }

    // Render component API or asChild
    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, any>;
      return React.cloneElement(children, {
        ...childProps,
        className: cn(
          itemVariants({ variant, size, clickable, active, disabled }),
          childProps.className,
          className
        ),
        ref,
      } as any);
    }

    return (
      <Comp {...(asChild ? {} : { ref, ...props })}>
        <div
          {...(!asChild ? {} : { ref, ...props })}
          className={cn(
            !asChild &&
              itemVariants({ variant, size, clickable, active, disabled }),
            className
          )}
        >
          {children}
        </div>
      </Comp>
    );
  }
);

Item.displayName = "Item";

/**
 * ItemMedia Component
 *
 * Container for item media (icon, avatar, image, or thumbnail)
 */
export const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  (
    {
      children,
      variant = "icon",
      size = "md",
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Runtime validation
    React.useEffect(() => {
      validator.validateEnum("variant", variant, VALID_MEDIA_VARIANTS);
      validator.validateEnum("size", size, VALID_SIZES);

      if (asChild && !React.isValidElement(children)) {
        validator.error(
          "ItemMedia: When 'asChild' is true, children must be a valid React element."
        );
      }
    }, [variant, size, asChild, children]);

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, any>;
      return React.cloneElement(children, {
        ...childProps,
        className: cn(
          itemMediaVariants({ variant, size }),
          childProps.className,
          className
        ),
      } as any);
    }

    return (
      <div
        ref={ref}
        className={cn(itemMediaVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemMedia.displayName = "ItemMedia";

/**
 * ItemContent Component
 *
 * Container for item title and description
 */
export const ItemContent = React.forwardRef<HTMLDivElement, ItemContentProps>(
  ({ children, align = "start", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(itemContentVariants({ align }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemContent.displayName = "ItemContent";

/**
 * ItemTitle Component
 *
 * Title text for the item
 */
export const ItemTitle = React.forwardRef<HTMLHeadingElement, ItemTitleProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, any>;
      return React.cloneElement(children, {
        ...childProps,
        className: cn(itemTitleVariants(), childProps.className, className),
      } as any);
    }

    return (
      <h3 ref={ref} className={cn(itemTitleVariants(), className)} {...props}>
        {children}
      </h3>
    );
  }
);

ItemTitle.displayName = "ItemTitle";

/**
 * ItemDescription Component
 *
 * Description text for the item
 */
export const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  ItemDescriptionProps
>(({ children, asChild = false, className, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as Record<string, any>;
    return React.cloneElement(children, {
      ...childProps,
      className: cn(itemDescriptionVariants(), childProps.className, className),
    } as any);
  }

  return (
    <p
      ref={ref}
      className={cn(itemDescriptionVariants(), className)}
      {...props}
    >
      {children}
    </p>
  );
});

ItemDescription.displayName = "ItemDescription";

/**
 * ItemActions Component
 *
 * Container for action buttons or elements
 */
export const ItemActions = React.forwardRef<HTMLDivElement, ItemActionsProps>(
  ({ children, align = "center", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(itemActionsVariants({ align }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemActions.displayName = "ItemActions";

/**
 * ItemHeader Component
 *
 * Header section for the item
 */
export const ItemHeader = React.forwardRef<HTMLDivElement, ItemHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(itemHeaderVariants(), className)} {...props}>
        {children}
      </div>
    );
  }
);

ItemHeader.displayName = "ItemHeader";

/**
 * ItemFooter Component
 *
 * Footer section for the item
 */
export const ItemFooter = React.forwardRef<HTMLDivElement, ItemFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(itemFooterVariants(), className)} {...props}>
        {children}
      </div>
    );
  }
);

ItemFooter.displayName = "ItemFooter";

/**
 * ItemGroup Component
 *
 * Container for grouping multiple items
 */
export const ItemGroup = React.forwardRef<HTMLDivElement, ItemGroupProps>(
  (
    {
      children,
      variant = "default",
      spacing = "md",
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Handle numeric or custom string spacing values
    const isTokenSpacing =
      typeof spacing === "string" &&
      ["none", "sm", "md", "lg"].includes(spacing);

    const customStyle =
      !isTokenSpacing && spacing !== undefined
        ? {
            gap: typeof spacing === "number" ? `${spacing}px` : spacing,
            ...style,
          }
        : style;

    // Runtime validation
    React.useEffect(() => {
      const validGroupVariants = [
        "default",
        "bordered",
        "divided",
        "cards",
      ] as const;
      const validSpacing = ["none", "sm", "md", "lg"] as const;

      validator.validateEnum("variant", variant, validGroupVariants);
      if (isTokenSpacing) {
        validator.validateEnum("spacing", spacing, validSpacing);
      }
    }, [variant, spacing, isTokenSpacing]);

    return (
      <div
        ref={ref}
        className={cn(
          itemGroupVariants({
            variant,
            spacing: isTokenSpacing ? (spacing as any) : undefined,
          }),
          className
        )}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemGroup.displayName = "ItemGroup";

/**
 * ItemSeparator Component
 *
 * Separator between items in a group
 */
export const ItemSeparator = React.forwardRef<
  HTMLHRElement,
  ItemSeparatorProps
>(
  (
    { orientation = "horizontal", decorative = false, className, ...props },
    ref
  ) => {
    // Runtime validation
    React.useEffect(() => {
      const validOrientations = ["horizontal", "vertical"] as const;
      validator.validateEnum("orientation", orientation, validOrientations);
      validator.validateType(
        "decorative",
        decorative,
        "boolean",
        (v) => typeof v === "boolean"
      );
    }, [orientation, decorative]);

    return (
      <hr
        ref={ref}
        className={cn(
          itemSeparatorVariants({ orientation, decorative }),
          className
        )}
        {...props}
      />
    );
  }
);

ItemSeparator.displayName = "ItemSeparator";

/**
 * ItemBadge Component
 *
 * Badge for displaying meta information
 */
export const ItemBadge = React.forwardRef<HTMLSpanElement, ItemBadgeProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    // Runtime validation
    React.useEffect(() => {
      const validBadgeVariants = [
        "default",
        "primary",
        "success",
        "warning",
        "error",
        "info",
      ] as const;

      validator.validateEnum("variant", variant, validBadgeVariants);
    }, [variant]);

    return (
      <span
        ref={ref}
        className={cn(itemBadgeVariants({ variant }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

ItemBadge.displayName = "ItemBadge";

export default Item;
