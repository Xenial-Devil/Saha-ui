import type { TypographyProps } from "../Typography";

export interface TypewriterTextProps extends TypographyProps {
  /** The text to type out */
  text: string;
  /** Delay between each character in milliseconds */
  speed?: number;
  /** Whether to loop the animation continuously */
  loop?: boolean;
  /** Delay before restarting the loop in milliseconds */
  loopDelay?: number;
  /** Whether to show a blinking cursor */
  cursor?: boolean;
}
