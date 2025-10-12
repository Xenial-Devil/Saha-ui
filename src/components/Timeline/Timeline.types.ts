import { ReactNode } from "react";

export type TimelineVariant =
  | "default"
  | "outlined"
  | "gradient"
  | "minimal"
  | "glass";
export type TimelinePosition = "left" | "right" | "alternate";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineStatus =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "pending";

export interface TimelineProps {
  variant?: TimelineVariant;
  position?: TimelinePosition;
  size?: TimelineSize;
  className?: string;
  children: ReactNode;
}

export interface TimelineItemProps {
  title: ReactNode;
  description?: ReactNode;
  time?: ReactNode;
  icon?: ReactNode;
  status?: TimelineStatus;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}
