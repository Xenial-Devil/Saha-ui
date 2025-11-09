import type { VariantProps } from "class-variance-authority";
import { backdropVariants } from "./Backdrop.styles";

/**
 * Backdrop blur types
 * Defines the blur intensity of the backdrop
 */
export type BackdropBlur = "none" | "sm" | "md" | "lg" | "xl";

/**
 * Backdrop variant types
 * Determines the visual style of the backdrop
 */
export type BackdropVariant = "solid" | "blur" | "gradient";

/**
 * Props for the Backdrop component
 *
 * @example
 * ```tsx
 * // Basic backdrop
 * <Backdrop open />
 *
 * // With blur
 * <Backdrop open blur="lg" />
 *
 * // With click handler
 * <Backdrop open onClick={() => setOpen(false)} />
 *
 * // With custom opacity
 * <Backdrop open opacity={0.8} />
 *
 * // Invisible but clickable
 * <Backdrop open invisible onClick={handleClose} />
 *
 * // With children (loading spinner, etc)
 * <Backdrop open>
 *   <Spinner size="lg" />
 * </Backdrop>
 *
 * // Gradient variant
 * <Backdrop open variant="gradient" />
 *
 * // With custom z-index
 * <Backdrop open zIndex={1400} />
 * ```
 */
export interface BackdropProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof backdropVariants> {
  /**
   * Whether the backdrop is visible
   * @default false
   */
  open: boolean;

  /**
   * The visual style variant of the backdrop
   * @default "solid"
   */
  variant?: BackdropVariant;

  /**
   * Blur intensity applied to the backdrop
   * @default "none"
   */
  blur?: BackdropBlur;

  /**
   * Opacity of the backdrop (0 to 1)
   * @default 0.5
   */
  opacity?: number;

  /**
   * Whether the backdrop is invisible but still interactive
   * Useful for capturing clicks without visual overlay
   * @default false
   */
  invisible?: boolean;

  /**
   * Whether to disable pointer events
   * @default false
   */
  disablePointerEvents?: boolean;

  /**
   * Z-index value for the backdrop
   * @default 1000
   */
  zIndex?: number;

  /**
   * Content to display on top of the backdrop
   * Usually a loading spinner or message
   */
  children?: React.ReactNode;

  /**
   * Custom class name for the backdrop
   */
  className?: string;

  /**
   * Callback when the backdrop is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Whether to prevent scroll on body when backdrop is open
   * @default true
   */
  preventScroll?: boolean;

  /**
   * Transition duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;

  /**
   * Whether to unmount the component when closed
   * @default false
   */
  unmountOnExit?: boolean;
}
