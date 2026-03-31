import type { HTMLAttributes } from "react";

export interface WatermarkProps extends HTMLAttributes<HTMLDivElement> {
  /** The text to display as a watermark */
  text?: string;
  /** Width of the watermark pattern cell */
  width?: number;
  /** Height of the watermark pattern cell */
  height?: number;
  /** Font family */
  fontFamily?: string;
  /** Font size */
  fontSize?: number;
  /** Font color (any CSS color string) */
  color?: string;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Opacity of the watermark (0 to 1) */
  opacity?: number;
  /** Z-index of the watermark container */
  zIndex?: number;
}
