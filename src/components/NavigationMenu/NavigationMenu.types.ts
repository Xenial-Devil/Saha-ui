import type React from "react";

/**
 * Visual style variant for the navigation menu.
 */
export type NavVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "glass"
  | "filled"
  | "outlined"
  | "minimal";

/**
 * Size variant for navigation menu items.
 */
export type NavSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Orientation/layout direction for the navigation menu.
 */
export type NavOrientation = "vertical" | "horizontal";

/**
 * Base properties for a navigation item.
 */
export interface NavigationItemBase {
  /**
   * Unique identifier for the navigation item.
   */
  id: string;

  /**
   * Label text or element to display.
   */
  label: React.ReactNode;

  /**
   * Optional icon to display before the label.
   */
  icon?: React.ReactNode;

  /**
   * URL to navigate to when item is clicked.
   */
  href?: string;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional badge to display (e.g., notification count).
   */
  badge?: React.ReactNode;

  /**
   * Click handler for the navigation item.
   */
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Navigation item with support for nested sub-items.
 */
export interface NavigationItem extends NavigationItemBase {
  /**
   * Nested navigation items for sub-menus.
   */
  items?: NavigationItem[];
}

/**
 * Props for the NavigationMenu component.
 *
 * NavigationMenu provides a complex navigation system with support for
 * nested menus, dropdowns, and multiple layout options.
 *
 * @example
 * // Basic navigation menu
 * <NavigationMenu>
 *   <NavigationMenuItem>
 *     <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *     <NavigationMenuContent>
 *       <NavigationMenuLink href="/products/software">
 *         Software
 *       </NavigationMenuLink>
 *       <NavigationMenuLink href="/products/hardware">
 *         Hardware
 *       </NavigationMenuLink>
 *     </NavigationMenuContent>
 *   </NavigationMenuItem>
 * </NavigationMenu>
 *
 * @example
 * // With items prop (compact API)
 * <NavigationMenu
 *   items={[
 *     { id: '1', label: 'Home', href: '/' },
 *     { id: '2', label: 'About', href: '/about' },
 *     {
 *       id: '3',
 *       label: 'Products',
 *       items: [
 *         { id: '3-1', label: 'Software', href: '/products/software' },
 *         { id: '3-2', label: 'Hardware', href: '/products/hardware' },
 *       ],
 *     },
 *   ]}
 * />
 */
export interface NavigationMenuProps {
  /**
   * Navigation items (compact API).
   * Alternative to using children components.
   */
  items?: NavigationItem[];

  /**
   * Visual style variant.
   * @default 'default'
   */
  variant?: NavVariant;

  /**
   * Size of navigation items.
   * @default 'md'
   */
  size?: NavSize;

  /**
   * Orientation/layout direction.
   * @default 'horizontal'
   */
  orientation?: NavOrientation;

  /**
   * Navigation menu items (composable API).
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Use compact visual style.
   * @default false
   */
  compact?: boolean;

  /**
   * Enable responsive layout.
   * Changes orientation based on screen size.
   * @default false
   */
  responsive?: boolean;

  /**
   * IDs of menus to open by default.
   */
  defaultOpenIds?: string[];

  /**
   * Callback when a navigation item is selected.
   */
  onSelect?: (item: NavigationItem) => void;
}

/**
 * Props for individual navigation items (composable API).
 *
 * @example
 * <NavItem id="home" label="Home" href="/" icon={<HomeIcon />} />
 */
export interface NavItemProps extends NavigationItemBase {
  /**
   * Additional content or nested items.
   */
  children?: React.ReactNode;

  /**
   * Render as child element (Slot pattern).
   * @default false
   */
  asChild?: boolean;

  /**
   * Nested navigation items.
   */
  items?: NavigationItem[];
}

/**
 * Props for navigation sections/groups.
 *
 * @example
 * <NavSection title="Main Navigation">
 *   <NavItem label="Home" href="/" />
 *   <NavItem label="About" href="/about" />
 * </NavSection>
 */
export interface NavSectionProps {
  /**
   * Section title/heading.
   */
  title?: React.ReactNode;

  /**
   * Navigation items in this section.
   */
  children?: React.ReactNode;
}

/**
 * Props for the navigation menu list container.
 */
export interface NavigationMenuListProps {
  /**
   * Menu items to display.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Props for navigation menu triggers (dropdown buttons).
 *
 * @example
 * <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 */
export interface NavigationMenuTriggerProps {
  /**
   * Trigger button content.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Render as child element.
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for navigation menu dropdown content.
 *
 * @example
 * <NavigationMenuContent>
 *   <NavigationMenuLink href="/option1">Option 1</NavigationMenuLink>
 *   <NavigationMenuLink href="/option2">Option 2</NavigationMenuLink>
 * </NavigationMenuContent>
 */
export interface NavigationMenuContentProps {
  /**
   * Dropdown menu items.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * Props for navigation menu links.
 *
 * @example
 * <NavigationMenuLink href="/products" active>
 *   Products
 * </NavigationMenuLink>
 */
export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link content.
   */
  children?: React.ReactNode;

  /**
   * Render as child element.
   * @default false
   */
  asChild?: boolean;

  /**
   * Whether this link represents the current page.
   * @default false
   */
  active?: boolean;
}

export default {};
