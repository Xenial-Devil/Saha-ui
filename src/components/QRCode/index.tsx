"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { QRCodeProps } from "./QRCode.types";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

/**
 * QRCode Component
 *
 * Creates a high-fidelity QR Code using canvas or SVG.
 * Supports embedding center logos and configuring error correction.
 *
 * @example
 * ```tsx
 * <QRCode 
 *   value="https://saha-ui.isubroto.com.bd" 
 *   logoUrl="/brand-logo.png" 
 * />
 * ```
 */
export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value,
      renderAs = "svg",
      level = "M",
      size = 128,
      fgColor = "#000000",
      bgColor = "transparent",
      includeMargin = false,
      logoUrl,
      logoSize = 0.2, // 20%
      logoExcavate = true,
      className,
      ...props
    },
    ref
  ) => {
    const Component = renderAs === "canvas" ? QRCodeCanvas : QRCodeSVG;

    const imageSettings = logoUrl ? {
      src: logoUrl,
      height: size * logoSize,
      width: size * logoSize,
      excavate: logoExcavate,
    } : undefined;

    return (
      <div 
        ref={ref} 
        className={cn("inline-flex items-center justify-center p-2 rounded-xl bg-white shadow-sm border border-border/50", className)}
      >
        <Component
          value={value}
          size={size}
          level={level}
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={includeMargin}
          imageSettings={imageSettings}
          {...(props as any)}
        />
      </div>
    );
  }
);

QRCode.displayName = "QRCode";

export default QRCode;
