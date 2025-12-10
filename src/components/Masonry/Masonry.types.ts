import type { VariantProps } from "class-variance-authority";
import { masonryVariants } from "./Masonry.styles";

/**
 * Masonry column configuration
 * Can be a number or an object with responsive breakpoints
 */
export type MasonryColumns =
  | number
  | {
      default?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      "2xl"?: number;
    };

/**
 * Masonry gap types
 * Defines the spacing between masonry items
 * Accepts predefined tokens, numbers (px), or string with units
 * @example
 * <Masonry gap="md">Token-based gap</Masonry>
 * <Masonry gap={24}>24px gap</Masonry>
 * <Masonry gap="2rem">Custom gap</Masonry>
 */
export type MasonryGap =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | number
  | string;

/**
 * Props for the Masonry component
 *
 * @example
 * ```tsx
 * // Basic masonry layout
 * <Masonry columns={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Masonry>
 *
 * // Responsive columns
 * <Masonry
 *   columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
 *   gap="lg"
 * >
 *   {items.map((item) => (
 *     <Card key={item.id}>{item.content}</Card>
 *   ))}
 * </Masonry>
 *
 * // Pinterest-style image gallery
 * <Masonry columns={4} gap="sm">
 *   {images.map((img) => (
 *     <img key={img.id} src={img.url} alt={img.alt} />
 *   ))}
 * </Masonry>
 *
 * // With custom className
 * <Masonry
 *   columns={3}
 *   gap="md"
 *   className="max-w-7xl mx-auto"
 * >
 *   {children}
 * </Masonry>
 * ```
 */
export interface MasonryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof masonryVariants> {
  /**
   * The number of columns in the masonry layout
   * Can be a single number or an object with responsive breakpoints
   * @default 3
   */
  columns?: MasonryColumns;

  /**
   * The gap between masonry items
   * @default "md"
   */
  gap?: MasonryGap;

  /**
   * Children elements to be arranged in masonry layout
   */
  children: React.ReactNode;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for each column
   */
  columnClassName?: string;

  /**
   * Custom className for each item wrapper
   */
  itemClassName?: string;

  /**
   * Whether to use CSS Grid masonry (experimental) or JavaScript-based layout
   * @default "css"
   */
  mode?: "css" | "js";

  /**
   * Custom render function for each item
   * Useful for adding animation or custom wrappers
   */
  renderItem?: (child: React.ReactNode, index: number) => React.ReactNode;

  /**
   * Whether to animate items on mount
   * @default false
   */
  animate?: boolean;

  /**
   * Animation delay between items in milliseconds
   * @default 50
   */
  animationDelay?: number;

  /**
   * When true, the Masonry will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

/**
 * Internal props for MasonryColumn
 */
export interface MasonryColumnProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gap?: MasonryGap;
  animate?: boolean;
  animationDelay?: number;
  columnIndex?: number;
}
