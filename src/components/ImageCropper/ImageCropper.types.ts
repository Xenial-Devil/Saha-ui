import * as React from "react";

export interface Point {
  x: number;
  y: number;
}

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCropperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image URL to crop.
   */
  image: string;
  
  /**
   * Callback fired when cropping is complete.
   * Receives the cropped image as a data URL, and the blob.
   */
  onCropComplete?: (croppedDataUrl: string, blob: Blob | null) => void;
  
  /**
   * Callback fired when cancel button is clicked.
   */
  onCancel?: () => void;
  
  /**
   * Aspect ratio for the crop area (width / height).
   * @default 1 (square)
   */
  aspect?: number;
  
  /**
   * Shape of the crop area.
   * @default "rect"
   */
  shape?: "rect" | "round";
  
  /**
   * Disable interaction
   */
  disabled?: boolean;
}
