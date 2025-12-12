import React from "react";

/**
 * Visual style variant for the link component.
 */
export type LinkVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "underline"
  | "ghost"
  | "button"
  | "glass";

/**
 * Size variant for the link component.
 */
export type LinkSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Props for the Link component.
 *
 * Link is a styled anchor element that provides various visual styles,
 * external link handling, and accessibility features. It can be used for
 * internal navigation, external links, or styled as a button.
 *
 * @example
 * // Basic link
 * <Link href="/about">About Us</Link>
 *
 * @example
 * // Primary variant with animated underline
 * <Link variant="primary" href="/docs">
 *   Documentation
 * </Link>
 *
 * @example
 * // External link with auto-detection
 * <Link href="https://example.com" external>
 *   Visit Example
 * </Link>
 *
 * @example
 * // Button-styled link
 * <Link variant="button" href="/get-started">
 *   Get Started
 * </Link>
 *
 * @example
 * // With custom icon
 * <Link icon={<StarIcon />} href="/featured">
 *   Featured Content
 * </Link>
 *
 * @example
 * // Disabled link
 * <Link href="/unavailable" disabled>
 *   Coming Soon
 * </Link>
 *
 * @example
 * // With Next.js Link composition
 * <Link asChild href="/products">
 *   <NextLink href="/products">Products</NextLink>
 * </Link>
 */
export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual style variant of the link.
   * - `default`: Standard link with underline on hover and scale effect
   * - `primary`: Bold link with animated gradient underline
   * - `secondary`: Secondary color with animated underline
   * - `accent`: Accent color with animated underline
   * - `muted`: Muted text that becomes prominent on hover
   * - `underline`: Always underlined with smooth hover transition
   * - `ghost`: Subtle background on hover with rounded corners
   * - `button`: Full button styling with gradient and shadow
   * - `glass`: Glassmorphism effect with backdrop blur
   *
   * @default 'default'
   *
   * @example
   * <Link variant="primary" href="/docs">
   *   Read Documentation
   * </Link>
   *
   * @example
   * <Link variant="button" href="/signup">
   *   Sign Up Now
   * </Link>
   */
  variant?: LinkVariant;

  /**
   * Size of the link text and spacing.
   * - `sm`: Small (text-sm, tight spacing)
   * - `md`: Medium (text-base, standard spacing) - default
   * - `lg`: Large (text-lg, comfortable spacing)
   *
   * @default 'md'
   *
   * @example
   * <Link size="lg" href="/hero">
   *   Large Hero Link
   * </Link>
   *
   * @example
   * <Link size="sm" href="/footnote">
   *   Small footer link
   * </Link>
   */
  size?: LinkSize;

  /**
   * Whether this is an external link.
   * When true:
   * - Displays an external link icon
   * - Automatically sets target="_blank"
   * - Adds rel="noopener noreferrer" for security
   *
   * @default false
   *
   * @example
   * <Link href="https://github.com" external>
   *   View on GitHub
   * </Link>
   */
  external?: boolean;

  /**
   * Whether the link is disabled.
   * When true:
   * - Removes href to prevent navigation
   * - Applies disabled styling (opacity, no pointer events)
   * - Sets aria-disabled="true"
   * - Prevents click events
   *
   * @default false
   *
   * @example
   * <Link href="/premium" disabled>
   *   Premium Feature (Coming Soon)
   * </Link>
   */
  disabled?: boolean;

  /**
   * Whether to show an animated underline effect on hover.
   * Adds a smooth animated underline that appears from left to right.
   * Note: Some variants (primary, secondary, accent) have built-in underlines.
   *
   * @default false
   *
   * @example
   * <Link href="/about" showUnderline>
   *   About Us
   * </Link>
   */
  showUnderline?: boolean;

  /**
   * Custom icon to display before the link text.
   * Can be any React element (typically an icon component).
   * The icon scales up slightly on hover for added interactivity.
   *
   * @example
   * <Link icon={<HomeIcon size={16} />} href="/">
   *   Home
   * </Link>
   *
   * @example
   * <Link icon={<DocumentIcon />} href="/docs">
   *   Documentation
   * </Link>
   */
  icon?: React.ReactNode;

  /**
   * Link content (text or elements).
   */
  children: React.ReactNode;

  /**
   * URL to navigate to.
   * Can be relative (internal) or absolute (external) URL.
   * When disabled, the href is removed to prevent navigation.
   *
   * @example
   * <Link href="/about">About</Link>
   *
   * @example
   * <Link href="https://example.com" external>Example</Link>
   */
  href?: string;

  /**
   * Where to open the linked document.
   * - `_self`: Same window/tab (default)
   * - `_blank`: New window/tab
   * - `_parent`: Parent frame
   * - `_top`: Full body of window
   *
   * When set to "_blank", automatically treated as external link.
   *
   * @example
   * <Link href="https://example.com" target="_blank">
   *   Open in New Tab
   * </Link>
   */
  target?: string;

  /**
   * Relationship between current document and linked document.
   * For external links, automatically set to "noopener noreferrer" for security.
   *
   * Common values:
   * - `noopener`: Prevents new page from accessing window.opener
   * - `noreferrer`: Prevents passing referrer information
   * - `nofollow`: Tells search engines not to follow
   *
   * @example
   * <Link href="https://untrusted.com" rel="nofollow noopener">
   *   External Link
   * </Link>
   */
  rel?: string;

  /**
   * When true, renders child element and merges props (Slot pattern).
   * Useful for composition with routing libraries like Next.js Link.
   *
   * @default false
   *
   * @example
   * // With Next.js Link
   * <Link asChild href="/products">
   *   <NextLink href="/products">Products</NextLink>
   * </Link>
   *
   * @example
   * // With React Router Link
   * <Link asChild variant="primary">
   *   <RouterLink to="/dashboard">Dashboard</RouterLink>
   * </Link>
   */
  asChild?: boolean;

  /**
   * Accessible label for the link.
   * Provides additional context for screen readers when the link text
   * is not descriptive enough.
   *
   * @example
   * <Link href="/docs" aria-label="Read the complete documentation">
   *   Docs
   * </Link>
   *
   * @example
   * <Link href="/download" icon={<DownloadIcon />} aria-label="Download application">
   *   Download
   * </Link>
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this link.
   * Alternative to aria-label when a visible label exists elsewhere.
   *
   * @example
   * <span id="download-label">Download our app</span>
   * <Link href="/download" aria-labelledby="download-label">
   *   Get it now
   * </Link>
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this link.
   * Provides additional context beyond the label.
   *
   * @example
   * <Link href="/beta" aria-describedby="beta-warning">
   *   Try Beta
   * </Link>
   * <span id="beta-warning">Warning: May contain bugs</span>
   */
  "aria-describedby"?: string;

  /**
   * Indicates current state in navigation.
   * - `page`: Current page in navigation
   * - `step`: Current step in a process
   * - `location`: Current location in breadcrumb
   * - `date`: Current date in calendar
   * - `time`: Current time
   * - `true`: Current item (generic)
   *
   * @example
   * <Link href="/dashboard" aria-current="page">
   *   Dashboard
   * </Link>
   */
  "aria-current"?:
    | boolean
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";

  /**
   * Click handler for the link.
   * Note: Not called when link is disabled.
   *
   * @example
   * <Link
   *   href="/products"
   *   onClick={(e) => {
   *     e.preventDefault();
   *     // Custom navigation logic
   *     router.push('/products');
   *   }}
   * >
   *   Products
   * </Link>
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Additional CSS classes to apply to the link.
   *
   * @example
   * <Link href="/special" className="font-bold text-xl">
   *   Special Link
   * </Link>
   */
  className?: string;
}
