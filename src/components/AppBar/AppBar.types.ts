import type { VariantProps } from "class-variance-authority";
import { appBarVariants } from "./AppBar.styles";

/**
 * AppBar position types
 * Determines how the app bar is positioned
 */
export type AppBarPosition = "static" | "fixed" | "sticky" | "absolute";

/**
 * AppBar variant types
 * Determines the visual style of the app bar
 */
export type AppBarVariant = "default" | "elevated" | "outlined" | "transparent";

/**
 * AppBar color types
 * Defines the color scheme of the app bar
 */
export type AppBarColor = "default" | "primary" | "secondary" | "transparent";

/**
 * Props for the AppBar component
 *
 * @example
 * ```tsx
 * // Basic app bar
 * <AppBar>
 *   <div>My App</div>
 * </AppBar>
 *
 * // With position
 * <AppBar position="fixed">
 *   <div>Fixed Header</div>
 * </AppBar>
 *
 * // With color
 * <AppBar color="primary" variant="elevated">
 *   <div>Colored Header</div>
 * </AppBar>
 *
 * // Transparent
 * <AppBar variant="transparent">
 *   <div>Transparent Header</div>
 * </AppBar>
 *
 * // With navigation items
 * <AppBar>
 *   <div className="flex items-center justify-between w-full">
 *     <div>Logo</div>
 *     <nav>Menu Items</nav>
 *     <div>Actions</div>
 *   </div>
 * </AppBar>
 * ```
 */
export interface AppBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appBarVariants> {
  /**
   * The positioning type of the app bar
   * @default "static"
   */
  position?: AppBarPosition;

  /**
   * The visual style variant of the app bar
   * @default "default"
   */
  variant?: AppBarVariant;

  /**
   * The color scheme of the app bar
   * @default "default"
   */
  color?: AppBarColor;

  /**
   * Elevation level for the app bar shadow
   * Only applies when variant is "elevated"
   * @default 2
   */
  elevation?: 0 | 1 | 2 | 3 | 4;

  /**
   * Content to display in the app bar
   */
  children?: React.ReactNode;

  /**
   * Custom class name for the app bar
   */
  className?: string;

  /**
   * Whether to add blur effect to the background
   * Works well with transparent variant
   * @default false
   */
  blur?: boolean;

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
   * Whether to hide the app bar on scroll down
   * @default false
   */
  hideOnScroll?: boolean;

  /**
   * Z-index value for the app bar
   * @default 1100
   */
  zIndex?: number;

  /**
   * When true, the AppBar will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}
