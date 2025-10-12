import { ReactNode } from "react";

export type StepStatus = "completed" | "current" | "pending" | "error";
export type StepsVariant = "default" | "bordered" | "glass" | "minimal";
export type StepsOrientation = "horizontal" | "vertical";
export type StepsSize = "sm" | "md" | "lg";

export interface StepsProps {
  value?: string | number;
  defaultValue?: string | number;
  onValueChange?: (value: string | number) => void;
  variant?: StepsVariant;
  size?: StepsSize;
  orientation?: StepsOrientation;
  clickable?: boolean;
  className?: string;
  children: ReactNode;
}

export interface StepsItemProps {
  value: string | number;
  title: string;
  description?: string;
  status?: StepStatus;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}
