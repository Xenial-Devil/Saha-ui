import type { VariantProps } from "class-variance-authority";
import { segmentedVariants } from "./Segmented.styles";

/**
 * Segmented option type
 */
export interface SegmentedOption {
  /**
   * Unique identifier for the option
   */
  value: string;

  /**
   * Display label for the option
   */
  label: React.ReactNode;

  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;

  /**
   * Whether the option is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom className for this option
   */
  className?: string;
}

/**
 * Segmented size types
 */
export type SegmentedSize = "sm" | "md" | "lg";

/**
 * Segmented variant types
 */
export type SegmentedVariant = "default" | "outlined" | "filled";

/**
 * Props for the Segmented component
 *
 * @example
 * ```tsx
 * // Basic segmented control
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List' },
 *     { value: 'grid', label: 'Grid' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 *
 * // With icons
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List', icon: <List /> },
 *     { value: 'grid', label: 'Grid', icon: <Grid /> },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 *
 * // Different sizes
 * <Segmented
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   size="lg"
 * />
 *
 * // Block (full width)
 * <Segmented
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   block
 * />
 * ```
 */
export interface SegmentedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof segmentedVariants> {
  /**
   * Array of options to display
   */
  options: SegmentedOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Default value (uncontrolled mode)
   */
  defaultValue?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * The visual style variant
   * @default "default"
   */
  variant?: SegmentedVariant;

  /**
   * The size of the segmented control
   * @default "md"
   */
  size?: SegmentedSize;

  /**
   * Whether to take up full width
   * @default false
   */
  block?: boolean;

  /**
   * Whether the segmented control is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for options
   */
  optionClassName?: string;

  /**
   * Custom className for the active indicator
   */
  indicatorClassName?: string;

  /**
   * Whether to show animated transition
   * @default true
   */
  animated?: boolean;

  /**
   * When true, the Segmented will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}
