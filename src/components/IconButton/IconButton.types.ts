import type { VariantProps } from "class-variance-authority";
import { iconButtonVariants } from "./IconButton.styles";

/**
 * IconButton variant types
 * Determines the visual style of the icon button
 */
export type IconButtonVariant =
  | "filled"
  | "outlined"
  | "soft"
  | "ghost"
  | "gradient"
  | "glass";

/**
 * IconButton color types
 * Defines the color scheme of the icon button
 */
export type IconButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * IconButton size types
 * Controls the dimensions of the icon button
 */
export type IconButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * IconButton shape types
 * Defines the shape of the icon button
 */
export type IconButtonShape = "square" | "rounded" | "circle";

/**
 * Props for the IconButton component
 *
 * @example
 * ```tsx
 * // Basic icon button
 * <IconButton icon={<Heart />} />
 *
 * // With color and variant
 * <IconButton icon={<Star />} color="primary" variant="filled" />
 *
 * // Different sizes
 * <IconButton icon={<Settings />} size="sm" />
 * <IconButton icon={<Search />} size="lg" />
 *
 * // Different shapes
 * <IconButton icon={<Plus />} shape="circle" />
 * <IconButton icon={<Menu />} shape="square" />
 *
 * // With loading state
 * <IconButton icon={<Save />} loading />
 *
 * // Disabled state
 * <IconButton icon={<Delete />} disabled />
 *
 * // With tooltip (external)
 * <Tooltip content="Delete">
 *   <IconButton icon={<Trash />} />
 * </Tooltip>
 * ```
 */
export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonVariants> {
  /**
   * The icon element to display
   */
  icon: React.ReactNode;

  /**
   * The visual style variant of the icon button
   * @default "ghost"
   */
  variant?: IconButtonVariant;

  /**
   * The color scheme of the icon button
   * @default "default"
   */
  color?: IconButtonColor;

  /**
   * The size of the icon button
   * @default "md"
   */
  size?: IconButtonSize;

  /**
   * The shape of the icon button
   * @default "rounded"
   */
  shape?: IconButtonShape;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading icon (replaces default spinner)
   */
  loadingIcon?: React.ReactNode;

  /**
   * Custom class name for the button
   */
  className?: string;

  /**
   * Custom class name for the icon wrapper
   */
  iconClassName?: string;

  /**
   * Accessible label for screen readers
   * Required for accessibility
   */
  "aria-label"?: string;

  /**
   * When true, the IconButton will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}
