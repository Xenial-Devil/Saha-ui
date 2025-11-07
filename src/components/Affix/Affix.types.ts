import type { VariantProps } from "class-variance-authority";
import { affixVariants } from "./Affix.styles";

/**
 * Affix target type
 */
export type AffixTarget = Window | HTMLElement | (() => HTMLElement | Window);

/**
 * Props for the Affix component
 *
 * @example
 * ```tsx
 * // Basic affix
 * <Affix offsetTop={10}>
 *   <Button>Sticky Button</Button>
 * </Affix>
 *
 * // Affix to bottom
 * <Affix offsetBottom={20}>
 *   <Card>Sticky Card</Card>
 * </Affix>
 *
 * // With custom target
 * <Affix offsetTop={0} target={() => document.getElementById('container')}>
 *   <div>Sticky Content</div>
 * </Affix>
 *
 * // With callback
 * <Affix
 *   offsetTop={10}
 *   onChange={(affixed) => console.log('Affixed:', affixed)}
 * >
 *   <div>Content</div>
 * </Affix>
 * ```
 */
export interface AffixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof affixVariants> {
  /**
   * Children to be affixed
   */
  children: React.ReactNode;

  /**
   * Offset from the top of the viewport when affixed
   * If set, the component will be affixed to the top
   */
  offsetTop?: number;

  /**
   * Offset from the bottom of the viewport when affixed
   * If set, the component will be affixed to the bottom
   */
  offsetBottom?: number;

  /**
   * Target element or window to listen for scroll events
   * @default window
   */
  target?: AffixTarget;

  /**
   * Callback when affix state changes
   */
  onChange?: (affixed: boolean) => void;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the content wrapper
   */
  contentClassName?: string;

  /**
   * z-index value for the affixed element
   * @default 10
   */
  zIndex?: number;

  /**
   * Whether to use CSS position: sticky instead of fixed
   * @default false
   */
  useSticky?: boolean;

  /**
   * When true, the Affix will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

/**
 * Internal state for tracking affix status
 */
export interface AffixState {
  affixed: boolean;
  position: "top" | "bottom" | null;
  placeholderHeight: number;
  placeholderWidth: number;
}
