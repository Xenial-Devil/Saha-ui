import type { VariantProps } from "class-variance-authority";
import { paperVariants } from "./Paper.styles";

/**
 * Paper elevation types
 * Defines the shadow depth of the paper surface
 */
export type PaperElevation = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Paper variant types
 * Determines the visual style of the paper
 */
export type PaperVariant = "filled" | "outlined" | "gradient" | "glass";

/**
 * Props for the Paper component
 *
 * @example
 * ```tsx
 * // Basic paper
 * <Paper>Content</Paper>
 *
 * // With elevation
 * <Paper elevation={3}>Elevated content</Paper>
 *
 * // Outlined variant
 * <Paper variant="outlined">Outlined content</Paper>
 *
 * // With padding
 * <Paper padding="lg">Padded content</Paper>
 *
 * // Rounded corners
 * <Paper rounded="xl">Rounded content</Paper>
 *
 * // Interactive/hoverable
 * <Paper hoverable onClick={() => console.log('clicked')}>
 *   Click me
 * </Paper>
 *
 * // Glass effect
 * <Paper variant="glass">Glass morphism</Paper>
 *
 * // As different element
 * <Paper asChild>
 *   <article>Article content</article>
 * </Paper>
 * ```
 */
export interface PaperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof paperVariants>, "padding"> {
  /**
   * The elevation level (shadow depth) of the paper
   * Higher values create more prominent shadows
   * @default 1
   */
  elevation?: PaperElevation;

  /**
   * The visual style variant of the paper
   * @default "filled"
   */
  variant?: PaperVariant;

  /**
   * Padding inside the paper
   * Accepts predefined tokens, numbers (px), or string with units
   * @default "md"
   * @example
   * <Paper padding="lg">Token padding</Paper>
   * <Paper padding={24}>24px padding</Paper>
   * <Paper padding="2rem">Custom padding</Paper>
   */
  padding?: "none" | "sm" | "md" | "lg" | "xl" | number | string;

  /**
   * Border radius of the paper
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";

  /**
   * Whether the paper should have hover effects
   * Adds scale and shadow transitions on hover
   * @default false
   */
  hoverable?: boolean;

  /**
   * Whether the paper should be centered
   * @default false
   */
  centered?: boolean;

  /**
   * Maximum width of the paper
   * @default undefined
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  /**
   * Content to display in the paper
   */
  children?: React.ReactNode;

  /**
   * Custom class name for the paper
   */
  className?: string;

  /**
   * When true, the Paper will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}
