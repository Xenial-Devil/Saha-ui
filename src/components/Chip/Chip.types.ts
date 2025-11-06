import type { VariantProps } from "class-variance-authority";
import { chipVariants } from "./Chip.styles";

/**
 * Chip variant types
 * Determines the visual style of the chip
 */
export type ChipVariant = "filled" | "outlined" | "soft" | "gradient" | "glass";

/**
 * Chip color types
 * Defines the color scheme of the chip
 */
export type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Chip size types
 * Controls the dimensions and text size of the chip
 */
export type ChipSize = "sm" | "md" | "lg";

/**
 * Props for the Chip component
 *
 * @example
 * ```tsx
 * <Chip>Default Chip</Chip>
 * <Chip color="primary" variant="filled">Primary</Chip>
 * <Chip onDelete={() => console.log('deleted')}>Deletable</Chip>
 * <Chip avatar={<Avatar size="xs" src="..." />}>With Avatar</Chip>
 * <Chip icon={<Tag size={14} />}>With Icon</Chip>
 * ```
 */
export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof chipVariants> {
  /**
   * The visual style variant of the chip
   * @default "filled"
   */
  variant?: ChipVariant;

  /**
   * The color scheme of the chip
   * @default "default"
   */
  color?: ChipColor;

  /**
   * The size of the chip
   * @default "md"
   */
  size?: ChipSize;

  /**
   * Content to display in the chip
   */
  children?: React.ReactNode;

  /**
   * Optional icon to display at the start of the chip
   */
  icon?: React.ReactNode;

  /**
   * Optional avatar to display at the start of the chip
   */
  avatar?: React.ReactNode;

  /**
   * Whether the chip can be deleted/removed
   * @default false
   */
  deletable?: boolean;

  /**
   * Callback when the delete button is clicked
   */
  onDelete?: () => void;

  /**
   * Whether the chip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the chip is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Custom class name for the chip
   */
  className?: string;

  /**
   * When true, the Chip will render its child element and merge props
   * Useful for composition with other components
   * @default false
   */
  asChild?: boolean;
}
