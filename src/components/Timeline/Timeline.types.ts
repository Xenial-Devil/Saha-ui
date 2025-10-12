import type { VariantProps } from "class-variance-authority";
import { timelineVariants } from ".";

/**
 * Timeline variant types
 * Determines the visual style of the timeline
 */
export type TimelineVariant = "default" | "outlined" | "gradient" | "minimal";

/**
 * Timeline position types
 * Defines the position of content relative to the line
 */
export type TimelinePosition = "left" | "right" | "alternate";

/**
 * Timeline size types
 * Controls the dimensions of the timeline elements
 */
export type TimelineSize = "sm" | "md" | "lg";

/**
 * Timeline item status types
 * Determines the color and style of timeline items
 */
export type TimelineStatus =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Timeline line style types
 */
export type TimelineLineStyle = "solid" | "dashed" | "dotted" | "gradient";

/**
 * Timeline dot shape types
 */
export type TimelineDotShape = "circle" | "square" | "diamond" | "ring";

/**
 * Props for a single timeline item
 */
export interface TimelineItem {
  /**
   * Unique identifier for the item
   */
  id: string | number;

  /**
   * Title of the timeline item
   */
  title: React.ReactNode;

  /**
   * Description or content of the item
   */
  description?: React.ReactNode;

  /**
   * Timestamp or date for the item
   */
  time?: React.ReactNode;

  /**
   * Optional icon for the timeline dot
   */
  icon?: React.ReactNode;

  /**
   * Status/color of the timeline item
   * @default "default"
   */
  status?: TimelineStatus;

  /**
   * Whether this is the active/current item
   * @default false
   */
  active?: boolean;

  /**
   * Custom dot color (overrides status color)
   */
  dotColor?: string;

  /**
   * Custom class name for this item
   */
  className?: string;

  /**
   * Custom class name for the dot
   */
  dotClassName?: string;

  /**
   * Custom class name for the content
   */
  contentClassName?: string;

  /**
   * Whether to hide the dot for this item
   */
  hideDot?: boolean;

  /**
   * Whether to hide the line after this item
   */
  hideLine?: boolean;
}

/**
 * Props for the Timeline component
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: 1,
 *     title: 'Project Started',
 *     description: 'Initial commit and setup',
 *     time: '2024-01-01',
 *     status: 'success'
 *   },
 *   {
 *     id: 2,
 *     title: 'Development',
 *     description: 'Building core features',
 *     time: '2024-02-15',
 *     active: true
 *   }
 * ];
 *
 * <Timeline items={items} variant="gradient" position="alternate" />
 * ```
 */
export interface TimelineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof timelineVariants> {
  /**
   * The visual style variant of the timeline
   * @default "default"
   */
  variant?: TimelineVariant;

  /**
   * The position of content relative to the timeline line
   * @default "left"
   */
  position?: TimelinePosition;

  /**
   * The size of timeline elements
   * @default "md"
   */
  size?: TimelineSize;

  /**
   * Array of timeline items to display
   */
  items: TimelineItem[];

  /**
   * Custom class name for the timeline container
   */
  className?: string;

  /**
   * Custom class name for all timeline items
   */
  itemClassName?: string;

  /**
   * Custom class name for all timeline dots
   */
  dotClassName?: string;

  /**
   * Custom class name for all timeline content
   */
  contentClassName?: string;

  /**
   * Custom class name for the timeline line
   */
  lineClassName?: string;

  /**
   * Style of the timeline line
   * @default "solid"
   */
  lineStyle?: TimelineLineStyle;

  /**
   * Shape of the timeline dots
   * @default "circle"
   */
  dotShape?: TimelineDotShape;

  /**
   * Custom line color
   */
  lineColor?: string;

  /**
   * Line width
   * @default "2px"
   */
  lineWidth?: string;

  /**
   * Whether to show time on the opposite side in alternate mode
   * @default false
   */
  showTimeOnOppositeSide?: boolean;

  /**
   * Whether to hide all icons
   * @default false
   */
  hideIcons?: boolean;

  /**
   * Whether to animate items on scroll
   * @default false
   */
  animateOnScroll?: boolean;

  /**
   * Custom render function for timeline items
   */
  renderItem?: (item: TimelineItem, index: number) => React.ReactNode;

  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: TimelineItem, index: number) => void;
}
