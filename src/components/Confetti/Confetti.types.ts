import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { confettiVariants } from "./Confetti.styles";

export interface ConfettiProps
  extends
    HTMLAttributes<HTMLCanvasElement>,
    VariantProps<typeof confettiVariants> {
  /** The number of confetti particles */
  particleCount?: number;
  /** The colors of the confetti particles */
  colors?: string[];
  /** How long the animation runs in ms */
  duration?: number;
  /** Whether the animation should trigger automatically on mount */
  autoStart?: boolean;
}
