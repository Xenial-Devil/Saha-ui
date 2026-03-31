import type { HTMLAttributes } from "react";

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** The magnification ratio on hover */
  magnification?: number;
  /** Distance around the icon where magnification starts */
  distance?: number;
  /** Base size of the icons */
  baseSize?: number;
}

export interface DockIconProps extends HTMLAttributes<HTMLDivElement> {
  mouseX?: number | null;
  magnification?: number;
  distance?: number;
  baseSize?: number;
}
