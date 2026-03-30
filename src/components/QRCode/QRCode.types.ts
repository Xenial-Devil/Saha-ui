import type { QRCodeCanvas } from "qrcode.react";

type QRCodeBaseProps = React.ComponentProps<typeof QRCodeCanvas>;

export interface QRCodeProps extends Omit<QRCodeBaseProps, "level" | "marginSize" | "imageSettings"> {
  /**
   * The value to encode in the QR code.
   */
  value: string;
  
  /**
   * Defines whether to render using Canvas or SVG
   * @default "svg"
   */
  renderAs?: "canvas" | "svg";
  
  /**
   * Error correction level
   * @default "M"
   */
  level?: "L" | "M" | "Q" | "H";
  
  /**
   * CSS class injected to the wrapper div
   */
  className?: string;

  /**
   * Logo image URL to center inside the QR code
   */
  logoUrl?: string;

  /**
   * Percentage of the QR code the logo should cover
   * @default 0.2
   */
  logoSize?: number;

  /**
   * Border around the logo
   * @default true
   */
  logoExcavate?: boolean;
}
