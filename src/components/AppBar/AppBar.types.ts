import type { VariantProps } from "class-variance-authority";
import { appBarVariants } from "./AppBar.styles";

/**
 * AppBar position types
 */
export type AppBarPosition = "static" | "fixed" | "sticky" | "absolute";

/**
 * AppBar variant types
 */
export type AppBarVariant =
  | "default"
  | "elevated"
  | "outlined"
  | "transparent"
  | "glass";

/**
 * AppBar color types
 */
export type AppBarColor =
  | "default"
  | "primary"
  | "secondary"
  | "transparent"
  | "inherit";

/**
 * Animation types
 */
export type AppBarAnimation = "none" | "fade" | "slide" | "scale";

/**
 * Entrance animation types
 */
export type AppBarEntrance = "none" | "slideDown" | "fadeIn" | "slideUp";

/**
 * Easing types
 */
export type AppBarEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring";

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Responsive props per breakpoint
 */
export interface ResponsiveAppBarProps {
  size?: "sm" | "md" | "lg";
  hideOnScroll?: boolean;
  variant?: AppBarVariant;
  blur?: boolean;
}

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: () => void;
  description?: string;
}

/**
 * Props for the AppBar component
 */
export interface AppBarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof appBarVariants> {
  // === POSITION & LAYOUT ===
  /**
   * The positioning type of the app bar
   * @default "static"
   */
  position?: AppBarPosition;

  /**
   * Whether the app bar should be full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Whether to center the content
   * @default false
   */
  centered?: boolean;

  /**
   * Maximum width of the content container
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  /**
   * Height of the app bar
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Z-index value for the app bar
   * @default 1100
   */
  zIndex?: number;

  // === VISUAL STYLE ===
  /**
   * The visual style variant
   * @default "default"
   */
  variant?: AppBarVariant;

  /**
   * The color scheme
   * @default "default"
   */
  color?: AppBarColor;

  /**
   * Elevation level for shadow
   * @default 2
   */
  elevation?: 0 | 1 | 2 | 3 | 4;

  /**
   * Whether to add blur effect
   * @default false
   */
  blur?: boolean;

  /**
   * Glass morphism effect
   * @default false
   */
  glass?: boolean;

  /**
   * Glass morphism intensity
   * @default 0.7
   */
  glassIntensity?: number;

  /**
   * Gradient background
   */
  gradient?: string;

  /**
   * Gradient direction
   */
  gradientDirection?: "left" | "right" | "top" | "bottom" | "diagonal";

  /**
   * Custom shadow for light mode
   */
  lightShadow?: string;

  /**
   * Custom shadow for dark mode
   */
  darkShadow?: string;

  // === SCROLL BEHAVIOR ===
  /**
   * Hide app bar on scroll down
   * @default false
   */
  hideOnScroll?: boolean;

  /**
   * Change color on scroll
   * @default false
   */
  colorOnScroll?: boolean;

  /**
   * Scroll threshold for effects
   * @default 50
   */
  scrollThreshold?: number;

  /**
   * Shrink on scroll
   * @default false
   */
  shrinkOnScroll?: boolean;

  /**
   * Elevate on scroll
   * @default false
   */
  elevateOnScroll?: boolean;

  /**
   * Custom scroll container
   */
  scrollContainer?: React.RefObject<HTMLElement> | string;

  /**
   * Scroll debounce time in ms
   */
  scrollDebounce?: number;

  /**
   * Scroll throttle time in ms
   */
  scrollThrottle?: number;

  /**
   * Use Intersection Observer instead of scroll
   * @default false
   */
  useIntersectionObserver?: boolean;

  // === PROGRESS INDICATOR ===
  /**
   * Show progress bar
   * @default false
   */
  showProgress?: boolean;

  /**
   * Progress value (0-100)
   */
  progressValue?: number;

  /**
   * Progress bar variant
   * @default "indeterminate"
   */
  progressVariant?: "determinate" | "indeterminate";

  /**
   * Progress bar color
   */
  progressColor?: string;

  /**
   * Progress bar position
   * @default "bottom"
   */
  progressPosition?: "top" | "bottom";

  // === SLOTS & CONTENT ===
  /**
   * Content for the start/left section
   */
  startContent?: React.ReactNode;

  /**
   * Content for the center section
   */
  centerContent?: React.ReactNode;

  /**
   * Content for the end/right section
   */
  endContent?: React.ReactNode;

  /**
   * Secondary/bottom row content
   */
  secondaryContent?: React.ReactNode;

  /**
   * Bottom row content (tabs, breadcrumbs, etc.)
   */
  bottomContent?: React.ReactNode;

  /**
   * Main children content
   */
  children?: React.ReactNode;

  // === TITLE & NAVIGATION ===
  /**
   * Page title
   */
  title?: React.ReactNode;

  /**
   * Title truncation
   * @default true
   */
  titleTruncate?: boolean;

  /**
   * Maximum width for title
   */
  titleMaxWidth?: string | number;

  /**
   * Subtitle/description
   */
  subtitle?: React.ReactNode;

  /**
   * Breadcrumbs navigation
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Show back button
   * @default false
   */
  showBackButton?: boolean;

  /**
   * Back button click handler
   */
  onBack?: () => void;

  /**
   * Custom back icon
   */
  backIcon?: React.ReactNode;

  /**
   * Back button label
   */
  backLabel?: string;

  /**
   * Custom navigation icon
   */
  navigationIcon?: React.ReactNode;

  /**
   * Navigation icon click handler
   */
  onNavigationClick?: () => void;

  // === ANNOUNCEMENT BAR ===
  /**
   * Announcement content
   */
  announcement?: React.ReactNode;

  /**
   * Whether announcement can be dismissed
   * @default true
   */
  announcementDismissible?: boolean;

  /**
   * Announcement dismiss handler
   */
  onAnnouncementDismiss?: () => void;

  /**
   * Announcement background color
   */
  announcementColor?: string;

  /**
   * Announcement text color
   */
  announcementTextColor?: string;

  // === SEARCH ===
  /**
   * Enable search functionality
   * @default false
   */
  searchable?: boolean;

  /**
   * Search expanded state
   */
  searchExpanded?: boolean;

  /**
   * Search toggle handler
   */
  onSearchToggle?: () => void;

  /**
   * Search submit handler
   */
  onSearch?: (query: string) => void;

  /**
   * Search input change handler
   */
  onSearchChange?: (query: string) => void;

  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;

  /**
   * Default search value
   */
  defaultSearchValue?: string;

  /**
   * Custom search content/slot
   */
  searchContent?: React.ReactNode;

  /**
   * Search icon
   */
  searchIcon?: React.ReactNode;

  // === MOBILE ===
  /**
   * Safe area insets for mobile (notch, dynamic island)
   * @default false
   */
  safeAreaInsets?: boolean;

  /**
   * Mobile menu open state
   */
  mobileMenuOpen?: boolean;

  /**
   * Mobile menu toggle handler
   */
  onMobileMenuToggle?: () => void;

  /**
   * Lock body scroll when menu open
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Mobile breakpoint in pixels
   * @default 768
   */
  mobileBreakpoint?: number;

  /**
   * Whether app bar is collapsible on mobile
   * @default false
   */
  collapsible?: boolean;

  /**
   * Mobile collapsed state
   */
  collapsed?: boolean;

  /**
   * Mobile collapse toggle handler
   */
  onCollapseToggle?: () => void;

  // === RESPONSIVE ===
  /**
   * Responsive props per breakpoint
   */
  responsive?: {
    sm?: ResponsiveAppBarProps;
    md?: ResponsiveAppBarProps;
    lg?: ResponsiveAppBarProps;
    xl?: ResponsiveAppBarProps;
  };

  // === ACCESSIBILITY ===
  /**
   * Show skip to content link
   * @default true
   */
  skipToContent?: boolean;

  /**
   * Skip link label
   * @default "Skip to main content"
   */
  skipToContentLabel?: string;

  /**
   * Main content element ID
   * @default "main-content"
   */
  mainContentId?: string;

  /**
   * Trap focus within app bar
   * @default false
   */
  trapFocus?: boolean;

  /**
   * Restore focus when closed
   * @default true
   */
  restoreFocus?: boolean;

  /**
   * Accessible label
   */
  ariaLabel?: string;

  // === ANIMATION ===
  /**
   * Animation type
   * @default "slide"
   */
  animation?: AppBarAnimation;

  /**
   * Animation duration in ms
   * @default 300
   */
  animationDuration?: number;

  /**
   * Entrance animation
   * @default "none"
   */
  entrance?: AppBarEntrance;

  /**
   * Animation easing
   * @default "ease-out"
   */
  easing?: AppBarEasing;

  /**
   * Respect reduced motion preference
   * @default true
   */
  respectReducedMotion?: boolean;

  // === TABS ===
  /**
   * Tabs content
   */
  tabs?: React.ReactNode;

  /**
   * Tabs position
   * @default "bottom"
   */
  tabsPosition?: "bottom" | "inline";

  // === SECONDARY APP BAR ===
  /**
   * Is this a secondary app bar
   * @default false
   */
  secondary?: boolean;

  /**
   * Parent app bar offset
   */
  parentOffset?: number;

  // === KEYBOARD ===
  /**
   * Keyboard shortcuts
   */
  shortcuts?: KeyboardShortcut[];

  /**
   * Enable command palette
   * @default false
   */
  commandPalette?: boolean;

  /**
   * Command palette open handler
   */
  onCommandPaletteOpen?: () => void;

  /**
   * Command palette shortcut
   * @default "mod+k"
   */
  commandPaletteShortcut?: string;

  // === PORTAL & RENDERING ===
  /**
   * Render in portal
   * @default false
   */
  portal?: boolean;

  /**
   * Portal container element
   */
  portalContainer?: HTMLElement | null;

  /**
   * Conditional rendering
   */
  renderWhen?: boolean | (() => boolean);

  /**
   * Hide when printing
   * @default true
   */
  hideOnPrint?: boolean;

  // === RESIZE ===
  /**
   * Window resize handler
   */
  onResize?: (width: number, height: number) => void;

  /**
   * Height change handler
   */
  onHeightChange?: (height: number) => void;

  /**
   * Observe resize changes
   * @default false
   */
  observeResize?: boolean;

  // === COMPOSITION ===
  /**
   * Render as child element
   * @default false
   */
  asChild?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

/**
 * AppBar context value
 */
export interface AppBarContextValue {
  isScrolled: boolean;
  isVisible: boolean;
  isShrunk: boolean;
  height: number;
  variant: AppBarVariant;
  color: AppBarColor;
  mobileMenuOpen: boolean;
  searchExpanded: boolean;
  collapsed: boolean;
  isMobile: boolean;
  scrollProgress: number;
}

/**
 * AppBar progress props
 */
export interface AppBarProgressProps {
  value?: number;
  variant?: "determinate" | "indeterminate";
  color?: string;
  position?: "top" | "bottom";
  height?: number;
  className?: string;
}

/**
 * AppBar search props
 */
export interface AppBarSearchProps {
  expanded?: boolean;
  onToggle?: () => void;
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  className?: string;
  autoFocus?: boolean;
}

/**
 * AppBar announcement props
 */
export interface AppBarAnnouncementProps {
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * AppBar title props
 */
export interface AppBarTitleProps {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  truncate?: boolean;
  maxWidth?: string | number;
  className?: string;
}

/**
 * AppBar breadcrumbs props
 */
export interface AppBarBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

/**
 * Skip to content props
 */
export interface SkipToContentProps {
  label?: string;
  targetId?: string;
  className?: string;
}
