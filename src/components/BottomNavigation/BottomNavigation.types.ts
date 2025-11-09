import type { VariantProps } from "class-variance-authority";
import { bottomNavigationVariants } from "./BottomNavigation.styles";

/**
 * BottomNavigation variant types
 * Determines the visual style of the bottom navigation
 */
export type BottomNavigationVariant = "default" | "filled" | "shifting";

/**
 * BottomNavigation item
 */
export interface BottomNavigationItem {
  /**
   * Unique identifier for the item
   */
  id?: string | number;

  /**
   * Label text for the item
   */
  label: string;

  /**
   * Icon for the item
   */
  icon: React.ReactNode;

  /**
   * Optional badge content (number or text)
   */
  badge?: React.ReactNode;

  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Value associated with this item
   */
  value?: string | number;

  /**
   * Custom click handler for the item
   */
  onClick?: (value: string | number) => void;

  /**
   * Optional href for navigation
   */
  href?: string;
}

/**
 * Props for the BottomNavigation component
 *
 * @example
 * ```tsx
 * // Basic bottom navigation
 * <BottomNavigation
 *   items={[
 *     { label: 'Home', icon: <Home /> },
 *     { label: 'Search', icon: <Search /> },
 *     { label: 'Profile', icon: <User /> }
 *   ]}
 *   value={0}
 * />
 *
 * // With onChange handler
 * <BottomNavigation
 *   items={items}
 *   value={activeTab}
 *   onChange={(value) => setActiveTab(value)}
 * />
 *
 * // With badges
 * <BottomNavigation
 *   items={[
 *     { label: 'Home', icon: <Home /> },
 *     { label: 'Messages', icon: <Mail />, badge: 5 },
 *     { label: 'Notifications', icon: <Bell />, badge: '!' }
 *   ]}
 * />
 *
 * // Shifting variant
 * <BottomNavigation
 *   variant="shifting"
 *   items={items}
 *   value={activeTab}
 * />
 * ```
 */
export interface BottomNavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "hidden">,
    VariantProps<typeof bottomNavigationVariants> {
  /**
   * Array of navigation items
   */
  items: BottomNavigationItem[];

  /**
   * Currently selected item value or index
   */
  value?: string | number;

  /**
   * The visual style variant of the bottom navigation
   * @default "default"
   */
  variant?: BottomNavigationVariant;

  /**
   * Whether to show labels on inactive items
   * @default true
   */
  showLabels?: boolean;

  /**
   * Color scheme for active items
   * @default "primary"
   */
  color?: "primary" | "secondary" | "success" | "error" | "info";

  /**
   * Callback when the selected value changes
   */
  onChange?: (value: string | number) => void;

  /**
   * Custom class name for the container
   */
  className?: string;

  /**
   * Custom class name for individual items
   */
  itemClassName?: string;

  /**
   * Z-index value for the bottom navigation
   * @default 1000
   */
  zIndex?: number;

  /**
   * Whether to hide on scroll down
   * @default false
   */
  hideOnScroll?: boolean;

  /**
   * Elevation level for shadow
   * @default 3
   */
  elevation?: 0 | 1 | 2 | 3 | 4;

  /**
   * Whether to add a border at the top
   * @default true
   */
  bordered?: boolean;
}

/**
 * Props for BottomNavigationAction component
 */
export interface BottomNavigationActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /**
   * Label text
   */
  label: string;

  /**
   * Icon element
   */
  icon: React.ReactNode;

  /**
   * Whether this item is selected
   */
  selected?: boolean;

  /**
   * Whether to show the label
   */
  showLabel?: boolean;

  /**
   * Optional badge content
   */
  badge?: React.ReactNode;

  /**
   * Color scheme
   */
  color?: "primary" | "secondary" | "success" | "error" | "info";

  /**
   * Value associated with this action
   */
  value?: string | number;

  /**
   * Custom class name
   */
  className?: string;
}
