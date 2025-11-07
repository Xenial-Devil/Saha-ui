import React from "react";

/**
 * Visual style variant for the breadcrumb component.
 */
export type BreadcrumbVariant =
  | "default"
  | "ghost"
  | "bordered"
  | "pills"
  | "underline"
  | "glass";

/**
 * Size variant for breadcrumb items and spacing.
 */
export type BreadcrumbSize = "sm" | "md" | "lg";

/**
 * Type of separator to display between breadcrumb items.
 */
export type BreadcrumbSeparatorType =
  | "slash"
  | "chevron"
  | "dot"
  | "arrow"
  | "custom";

/**
 * Props for the Breadcrumb component.
 *
 * Breadcrumb provides navigation that shows the user's location within a
 * site hierarchy. It implements the WAI-ARIA Breadcrumb pattern for
 * accessibility and supports multiple visual styles.
 *
 * @example
 * // Basic breadcrumb
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem isCurrentPage>Current Page</BreadcrumbItem>
 * </Breadcrumb>
 *
 * @example
 * // Breadcrumb with custom separator
 * <Breadcrumb separator="arrow" variant="pills">
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem isCurrentPage>Article</BreadcrumbItem>
 * </Breadcrumb>
 *
 * @example
 * // Breadcrumb with icons
 * <Breadcrumb variant="bordered" size="lg">
 *   <BreadcrumbItem href="/" icon={<HomeIcon />}>
 *     Home
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem href="/settings" icon={<SettingsIcon />}>
 *     Settings
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem isCurrentPage icon={<UserIcon />}>
 *     Profile
 *   </BreadcrumbItem>
 * </Breadcrumb>
 *
 * @example
 * // Breadcrumb with custom ARIA label
 * <Breadcrumb aria-label="Page navigation">
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
 * </Breadcrumb>
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual style variant for the breadcrumb.
   * - `default`: Simple text links with hover effects
   * - `ghost`: Subtle background on hover
   * - `bordered`: Items with borders and shadows
   * - `pills`: Rounded pill-shaped items
   * - `underline`: Animated underline on hover
   * - `glass`: Glassmorphism effect with backdrop blur
   *
   * @default 'default'
   *
   * @example
   * <Breadcrumb variant="pills">
   *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
   *   <BreadcrumbSeparator />
   *   <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
   * </Breadcrumb>
   */
  variant?: BreadcrumbVariant;

  /**
   * Size of the breadcrumb items and spacing.
   * - `sm`: Extra small (text-xs, tight spacing)
   * - `md`: Medium (text-sm, standard spacing) - default
   * - `lg`: Large (text-base, comfortable spacing)
   *
   * @default 'md'
   *
   * @example
   * <Breadcrumb size="lg">
   *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
   *   <BreadcrumbSeparator />
   *   <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
   * </Breadcrumb>
   */
  size?: BreadcrumbSize;

  /**
   * Type of separator icon to display between breadcrumb items.
   * - `chevron`: Right-pointing chevron (default)
   * - `slash`: Forward slash (/)
   * - `dot`: Small dot separator
   * - `arrow`: Right-pointing arrow
   * - `custom`: Use custom separator via BreadcrumbSeparator children
   *
   * @default 'chevron'
   *
   * @example
   * <Breadcrumb separator="slash">
   *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
   *   <BreadcrumbSeparator />
   *   <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
   * </Breadcrumb>
   */
  separator?: BreadcrumbSeparatorType;

  /**
   * Accessible label for the breadcrumb navigation.
   * Provides context for screen reader users.
   *
   * @default 'Breadcrumb'
   *
   * @example
   * <Breadcrumb aria-label="Page hierarchy navigation">
   *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
   *   <BreadcrumbSeparator />
   *   <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
   * </Breadcrumb>
   */
  "aria-label"?: string;

  /**
   * Breadcrumb items and separators.
   * Should contain BreadcrumbItem and BreadcrumbSeparator components.
   */
  children?: React.ReactNode;
}

/**
 * Props for individual breadcrumb items (links or text).
 *
 * BreadcrumbItem represents a single location in the navigation hierarchy.
 * It can be a clickable link (when href is provided) or static text
 * (typically for the current page).
 *
 * @example
 * // Link item
 * <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *
 * @example
 * // Current page item
 * <BreadcrumbItem isCurrentPage>Current Page</BreadcrumbItem>
 *
 * @example
 * // Item with icon
 * <BreadcrumbItem href="/" icon={<HomeIcon />}>
 *   Home
 * </BreadcrumbItem>
 *
 * @example
 * // Item with custom ARIA label
 * <BreadcrumbItem href="/settings" aria-label="Navigate to settings page">
 *   Settings
 * </BreadcrumbItem>
 */
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
  /**
   * URL to navigate to when the breadcrumb item is clicked.
   * If not provided or if isCurrentPage is true, renders as static text.
   *
   * @example
   * <BreadcrumbItem href="/products">Products</BreadcrumbItem>
   */
  href?: string;

  /**
   * Icon to display before the breadcrumb item text.
   * Can be any React element (typically an icon component).
   *
   * @example
   * <BreadcrumbItem icon={<HomeIcon />} href="/">
   *   Home
   * </BreadcrumbItem>
   *
   * @example
   * <BreadcrumbItem icon={<FolderIcon />} href="/documents">
   *   Documents
   * </BreadcrumbItem>
   */
  icon?: React.ReactNode;

  /**
   * Indicates if this item represents the current page.
   * When true:
   * - Renders as static text (not a link)
   * - Sets aria-current="page" for accessibility
   * - Applies current page styling (highlighted, bold)
   * - Disables pointer events
   *
   * Only the last item in a breadcrumb should have this set to true.
   *
   * @default false
   *
   * @example
   * <BreadcrumbItem isCurrentPage>
   *   Current Page
   * </BreadcrumbItem>
   */
  isCurrentPage?: boolean;

  /**
   * Accessible label for the breadcrumb item.
   * Useful when the item text is abbreviated or needs additional context.
   *
   * @example
   * <BreadcrumbItem href="/docs" aria-label="Documentation">
   *   Docs
   * </BreadcrumbItem>
   */
  "aria-label"?: string;

  /**
   * Text content or elements to display in the breadcrumb item.
   */
  children?: React.ReactNode;

  /**
   * Click handler for the breadcrumb item.
   * Note: Not called when isCurrentPage is true.
   *
   * @example
   * <BreadcrumbItem
   *   href="/products"
   *   onClick={(e) => {
   *     e.preventDefault();
   *     // Custom navigation logic
   *   }}
   * >
   *   Products
   * </BreadcrumbItem>
   */
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>,
  ) => void;
}

/**
 * Props for the breadcrumb separator element.
 *
 * BreadcrumbSeparator displays a visual separator between breadcrumb items.
 * The separator type is controlled by the parent Breadcrumb component,
 * but can be overridden with custom children.
 *
 * @example
 * // Default separator (uses parent's separator type)
 * <BreadcrumbSeparator />
 *
 * @example
 * // Custom separator
 * <BreadcrumbSeparator>→</BreadcrumbSeparator>
 *
 * @example
 * // Custom separator with icon
 * <BreadcrumbSeparator>
 *   <ChevronRightIcon />
 * </BreadcrumbSeparator>
 */
export interface BreadcrumbSeparatorProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Custom separator content.
   * If not provided, uses the separator type from the parent Breadcrumb.
   *
   * @example
   * <BreadcrumbSeparator>|</BreadcrumbSeparator>
   *
   * @example
   * <BreadcrumbSeparator>
   *   <ArrowRightIcon size={12} />
   * </BreadcrumbSeparator>
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes for the separator.
   * Useful for custom styling or animations.
   *
   * @example
   * <BreadcrumbSeparator className="animate-pulse">
   *   →
   * </BreadcrumbSeparator>
   */
  className?: string;
}
