"use client";

import React, { useEffect, useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  BottomNavigationProps,
  BottomNavigationActionProps,
  BottomNavigationItem,
} from "./BottomNavigation.types";
import {
  bottomNavigationVariants,
  bottomNavigationContainerVariants,
  bottomNavigationActionVariants,
  bottomNavigationIconVariants,
  bottomNavigationLabelVariants,
  bottomNavigationBadgeVariants,
} from "./BottomNavigation.styles";

export type BottomNavigationVariantsProps = VariantProps<
  typeof bottomNavigationVariants
>;

/**
 * BottomNavigationAction Component
 * Represents a single action/item in the bottom navigation
 */
const BottomNavigationAction = React.forwardRef<
  HTMLButtonElement,
  BottomNavigationActionProps
>(
  (
    {
      label,
      icon,
      selected = false,
      showLabel = true,
      badge,
      color = "primary",
      value: _value,
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          bottomNavigationActionVariants({
            selected,
            showLabel,
            color,
            disabled,
          }),
          className,
        )}
        onClick={handleClick}
        disabled={disabled}
        aria-label={label}
        aria-current={selected ? "page" : undefined}
        type="button"
        {...props}
      >
        {/* Badge */}
        {badge !== undefined && badge !== null && (
          <span
            className={cn(
              bottomNavigationBadgeVariants({
                variant: typeof badge === "boolean" ? "dot" : "standard",
              }),
            )}
          >
            {typeof badge === "boolean" ? "" : badge}
          </span>
        )}

        {/* Icon */}
        <span
          className={cn(
            bottomNavigationIconVariants({
              selected,
              size: "md",
            }),
          )}
        >
          {icon}
        </span>

        {/* Label */}
        <span
          className={cn(
            bottomNavigationLabelVariants({
              selected,
              show: selected || showLabel,
            }),
          )}
        >
          {label}
        </span>
      </button>
    );
  },
);

BottomNavigationAction.displayName = "BottomNavigationAction";

/**
 * BottomNavigation Component
 *
 * A navigation component that appears at the bottom of the screen.
 * Ideal for mobile applications with 3-5 top-level destinations.
 *
 * @example
 * ```tsx
 * // Basic bottom navigation
 * const items = [
 *   { label: 'Home', icon: <Home /> },
 *   { label: 'Search', icon: <Search /> },
 *   { label: 'Profile', icon: <User /> }
 * ];
 * <BottomNavigation items={items} value={0} />
 *
 * // With state management
 * const [active, setActive] = useState(0);
 * <BottomNavigation
 *   items={items}
 *   value={active}
 *   onChange={(value) => setActive(value)}
 * />
 *
 * // With badges
 * const itemsWithBadges = [
 *   { label: 'Home', icon: <Home /> },
 *   { label: 'Messages', icon: <Mail />, badge: 5 },
 *   { label: 'Notifications', icon: <Bell />, badge: '!' }
 * ];
 * <BottomNavigation items={itemsWithBadges} value={active} />
 *
 * // Without labels on inactive items
 * <BottomNavigation
 *   items={items}
 *   value={active}
 *   showLabels={false}
 * />
 *
 * // Different color
 * <BottomNavigation
 *   items={items}
 *   value={active}
 *   color="secondary"
 * />
 *
 * // Shifting variant (animated)
 * <BottomNavigation
 *   variant="shifting"
 *   items={items}
 *   value={active}
 * />
 *
 * // Hide on scroll
 * <BottomNavigation
 *   items={items}
 *   value={active}
 *   hideOnScroll
 * />
 * ```
 */
const BottomNavigation = React.forwardRef<
  HTMLDivElement,
  BottomNavigationProps
>(
  (
    {
      items,
      value,
      variant = "default",
      showLabels = true,
      color = "primary",
      onChange,
      className,
      itemClassName,
      zIndex = 1000,
      hideOnScroll = false,
      elevation = 3,
      bordered = true,
      style,
      hidden: _unusedHidden,
      ...props
    },
    ref,
  ) => {
    const [isHidden, setIsHidden] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // Handle hide on scroll
    useEffect(() => {
      if (!hideOnScroll) return;

      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const scrollingDown = currentScrollPos > prevScrollPos;
        const scrolledPastThreshold = currentScrollPos > 100;

        // Hide when scrolling down past threshold
        setIsHidden(scrollingDown && scrolledPastThreshold);

        setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [hideOnScroll, prevScrollPos]);

    const handleItemClick = (item: BottomNavigationItem, index: number) => {
      if (item.disabled) return;

      const itemValue = item.value !== undefined ? item.value : index;

      // Call item's onClick if provided
      if (item.onClick) {
        item.onClick(itemValue);
      }

      // Call navigation's onChange
      if (onChange) {
        onChange(itemValue);
      }

      // Handle href navigation
      if (item.href) {
        window.location.href = item.href;
      }
    };

    const isSelected = (item: BottomNavigationItem, index: number): boolean => {
      if (value === undefined) return false;

      if (item.value !== undefined) {
        return item.value === value;
      }

      return index === value;
    };

    return (
      <div
        ref={ref}
        className={cn(
          bottomNavigationVariants({
            variant,
            elevation,
            bordered,
            hidden: !!isHidden,
          }),
          className,
        )}
        style={{ zIndex, ...style }}
        role="navigation"
        aria-label="Bottom navigation"
        {...props}
      >
        <div
          className={cn(
            bottomNavigationContainerVariants({
              variant,
            }),
          )}
        >
          {items.map((item: BottomNavigationItem, index: number) => {
            const selected = isSelected(item, index);
            const shouldShowLabel =
              variant === "shifting" ? selected : showLabels || selected;

            return (
              <BottomNavigationAction
                key={item.id || index}
                label={item.label}
                icon={item.icon}
                selected={selected}
                showLabel={shouldShowLabel}
                badge={item.badge}
                color={color}
                value={item.value !== undefined ? item.value : index}
                disabled={item.disabled}
                onClick={() => handleItemClick(item, index)}
                className={itemClassName}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

BottomNavigation.displayName = "BottomNavigation";

export { BottomNavigation, BottomNavigationAction };
export default BottomNavigation;
export type { BottomNavigationProps, BottomNavigationActionProps };
