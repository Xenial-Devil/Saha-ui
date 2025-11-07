import type { VariantProps } from "class-variance-authority";
import { statCardVariants } from "./StatCard.styles";

/**
 * StatCard trend types
 * Indicates whether the statistic is increasing, decreasing, or neutral
 */
export type StatCardTrend = "up" | "down" | "neutral";

/**
 * StatCard color types
 * Defines the color scheme of the stat card
 */
export type StatCardColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * StatCard size types
 * Controls the dimensions of the stat card
 */
export type StatCardSize = "sm" | "md" | "lg";

/**
 * StatCard variant types
 * Determines the visual style of the stat card
 */
export type StatCardVariant =
  | "default"
  | "outlined"
  | "filled"
  | "gradient"
  | "glass";

/**
 * Props for the StatCard component
 *
 * @example
 * ```tsx
 * // Basic stat card
 * <StatCard
 *   title="Total Revenue"
 *   value="$45,231"
 *   icon={<DollarSign />}
 * />
 *
 * // With trend
 * <StatCard
 *   title="Active Users"
 *   value="2,543"
 *   trend="up"
 *   trendValue="+12.5%"
 *   icon={<Users />}
 * />
 *
 * // With custom colors
 * <StatCard
 *   title="Sales"
 *   value="$12,345"
 *   color="success"
 *   variant="filled"
 *   trend="up"
 *   trendValue="+23%"
 * />
 *
 * // With description
 * <StatCard
 *   title="Conversion Rate"
 *   value="3.24%"
 *   description="From last month"
 *   trend="down"
 *   trendValue="-2.1%"
 * />
 *
 * // With custom content
 * <StatCard
 *   title="Performance"
 *   value="98.5%"
 *   footer={<Button size="sm">View Details</Button>}
 * />
 * ```
 */
export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title">,
    VariantProps<typeof statCardVariants> {
  /**
   * The title/label of the statistic
   */
  title: React.ReactNode;

  /**
   * The main value to display
   */
  value: React.ReactNode;

  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;

  /**
   * Optional description or subtitle
   */
  description?: React.ReactNode;

  /**
   * Trend direction (up, down, or neutral)
   */
  trend?: StatCardTrend;

  /**
   * Trend value to display (e.g., "+12.5%", "-3.2%")
   */
  trendValue?: React.ReactNode;

  /**
   * Optional trend description
   */
  trendDescription?: React.ReactNode;

  /**
   * The visual style variant of the stat card
   * @default "default"
   */
  variant?: StatCardVariant;

  /**
   * The color scheme of the stat card
   * @default "default"
   */
  color?: StatCardColor;

  /**
   * The size of the stat card
   * @default "md"
   */
  size?: StatCardSize;

  /**
   * Custom footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether to show a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Whether to show an animated counter for numeric values
   * @default false
   */
  animateValue?: boolean;

  /**
   * Duration of the counter animation in milliseconds
   * @default 1000
   */
  animationDuration?: number;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the header section
   */
  headerClassName?: string;

  /**
   * Custom className for the value section
   */
  valueClassName?: string;

  /**
   * Custom className for the icon
   */
  iconClassName?: string;

  /**
   * Custom className for the trend section
   */
  trendClassName?: string;

  /**
   * Custom className for the footer section
   */
  footerClassName?: string;

  /**
   * When true, the StatCard will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;

  /**
   * Click handler for the entire card
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Whether the card should be clickable/interactive
   * @default false
   */
  clickable?: boolean;
}
