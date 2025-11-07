import type { VariantProps } from "class-variance-authority";
import { tourVariants } from "./Tour.styles";

/**
 * Tour step type
 */
export interface TourStep {
  /**
   * Unique identifier for the step
   */
  id: string;

  /**
   * Target element selector or element
   */
  target: string | HTMLElement | (() => HTMLElement | null);

  /**
   * Title of the step
   */
  title: React.ReactNode;

  /**
   * Description/content of the step
   */
  description: React.ReactNode;

  /**
   * Optional image or media to display
   */
  cover?: React.ReactNode;

  /**
   * Custom placement for this step
   */
  placement?: TourPlacement;

  /**
   * Whether to show skip button for this step
   */
  showSkip?: boolean;

  /**
   * Custom next button text for this step
   */
  nextButtonText?: string;

  /**
   * Custom previous button text for this step
   */
  prevButtonText?: string;

  /**
   * Callback when this step is entered
   */
  onEnter?: () => void;

  /**
   * Callback when this step is left
   */
  onLeave?: () => void;
}

/**
 * Tour placement types
 */
export type TourPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "center";

/**
 * Tour mask style types
 */
export type TourMaskStyle = "default" | "rounded" | "rect";

/**
 * Props for the Tour component
 *
 * @example
 * ```tsx
 * // Basic tour
 * <Tour
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   steps={[
 *     {
 *       id: '1',
 *       target: '#welcome',
 *       title: 'Welcome',
 *       description: 'Get started with our app',
 *     },
 *     {
 *       id: '2',
 *       target: '#features',
 *       title: 'Features',
 *       description: 'Explore our amazing features',
 *     },
 *   ]}
 * />
 *
 * // With custom placement
 * <Tour
 *   open={isOpen}
 *   onClose={handleClose}
 *   steps={steps}
 *   placement="right"
 * />
 *
 * // With callbacks
 * <Tour
 *   open={isOpen}
 *   onClose={handleClose}
 *   onFinish={handleFinish}
 *   onChange={handleStepChange}
 *   steps={steps}
 * />
 * ```
 */
export interface TourProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tourVariants> {
  /**
   * Array of tour steps
   */
  steps: TourStep[];

  /**
   * Whether the tour is open
   */
  open: boolean;

  /**
   * Callback when tour is closed
   */
  onClose: () => void;

  /**
   * Current step index (controlled mode)
   */
  current?: number;

  /**
   * Callback when current step changes
   */
  onChange?: (current: number) => void;

  /**
   * Callback when tour is finished
   */
  onFinish?: () => void;

  /**
   * Default placement for all steps
   * @default "bottom"
   */
  placement?: TourPlacement;

  /**
   * Whether to show mask overlay
   * @default true
   */
  mask?: boolean;

  /**
   * Mask style
   * @default "default"
   */
  maskStyle?: TourMaskStyle;

  /**
   * Whether mask is closable
   * @default true
   */
  maskClosable?: boolean;

  /**
   * Whether to close tour on ESC key
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Whether to show progress dots
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to show step numbers
   * @default true
   */
  showStepNumbers?: boolean;

  /**
   * Whether to show arrow pointing to target
   * @default true
   */
  showArrow?: boolean;

  /**
   * Gap between popover and target
   * @default 8
   */
  gap?: number;

  /**
   * Offset from the placement position
   */
  offset?: { x?: number; y?: number };

  /**
   * Whether to scroll to target element
   * @default true
   */
  scrollToTarget?: boolean;

  /**
   * Custom z-index for tour components
   * @default 1000
   */
  zIndex?: number;

  /**
   * Custom className for the tour container
   */
  className?: string;

  /**
   * Custom className for the popover
   */
  popoverClassName?: string;

  /**
   * Custom className for the mask
   */
  maskClassName?: string;

  /**
   * Custom next button content
   */
  nextButtonContent?: React.ReactNode;

  /**
   * Custom previous button content
   */
  prevButtonContent?: React.ReactNode;

  /**
   * Custom skip button content
   */
  skipButtonContent?: React.ReactNode;

  /**
   * Custom finish button content
   */
  finishButtonContent?: React.ReactNode;
}

/**
 * Internal state for Tour component
 */
export interface TourState {
  currentStep: number;
  targetRect: DOMRect | null;
  popoverPosition: { top: number; left: number };
  arrowPosition: { top: number; left: number };
  placement: TourPlacement;
}
