import React from "react";

export interface CountdownTimerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onEnded"> {
  /**
   * The target date/time to countdown to
   */
  targetDate: string | Date;
  
  /**
   * Called when timer hits 0
   */
  onComplete?: () => void;
  
  /**
   * Whether to show days, hours, minutes, seconds explicitly
   * @default true
   */
  showLabels?: boolean;
  
  /**
   * Visual style variant
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary" | "glass" | "outline";
  
  /**
   * Component size
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
}
