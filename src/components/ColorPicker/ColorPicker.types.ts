import type { VariantProps } from "class-variance-authority";
import { colorPickerVariants } from "./ColorPicker.styles";

/**
 * Color format types
 */
export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv";

/**
 * Preset color definition
 */
export interface PresetColor {
  /**
   * Color value
   */
  color: string;

  /**
   * Optional label for the color
   */
  label?: string;
}

/**
 * ColorPicker size types
 */
export type ColorPickerSize = "sm" | "md" | "lg";

/**
 * Props for the ColorPicker component
 *
 * @example
 * ```tsx
 * // Basic color picker
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 * />
 *
 * // With presets
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   presets={[
 *     { color: '#1890ff', label: 'Primary' },
 *     { color: '#52c41a', label: 'Success' },
 *   ]}
 * />
 *
 * // With format selector
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   showFormatSwitch
 *   format="rgb"
 * />
 *
 * // Without alpha channel
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   disableAlpha
 * />
 * ```
 */
export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof colorPickerVariants> {
  /**
   * Current color value
   */
  value?: string;

  /**
   * Default color value (uncontrolled mode)
   * @default "#000000"
   */
  defaultValue?: string;

  /**
   * Callback when color changes
   */
  onChange?: (color: string) => void;

  /**
   * Color format
   * @default "hex"
   */
  format?: ColorFormat;

  /**
   * Whether to show format switch button
   * @default false
   */
  showFormatSwitch?: boolean;

  /**
   * Whether to disable alpha channel
   * @default false
   */
  disableAlpha?: boolean;

  /**
   * Array of preset colors
   */
  presets?: PresetColor[] | PresetColor[][];

  /**
   * Whether to show preset colors
   * @default true
   */
  showPresets?: boolean;

  /**
   * Size of the color picker
   * @default "md"
   */
  size?: ColorPickerSize;

  /**
   * Whether the color picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Placement of the popover
   * @default "bottom-start"
   */
  placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end";

  /**
   * Custom trigger content
   */
  trigger?: React.ReactNode;

  /**
   * Whether to show clear button
   * @default false
   */
  allowClear?: boolean;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the trigger
   */
  triggerClassName?: string;

  /**
   * Custom className for the popover
   */
  popoverClassName?: string;

  /**
   * When true, the ColorPicker will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

/**
 * Internal state for ColorPicker
 */
export interface ColorPickerState {
  hue: number;
  saturation: number;
  lightness: number;
  value: number;
  alpha: number;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
}
