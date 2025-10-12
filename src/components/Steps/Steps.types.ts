import React from "react";

/**
 * Status of a step
 */
export type StepStatus = "completed" | "current" | "pending" | "error";

/**
 * Variant options for Steps styling
 */
export type StepsVariant = "default" | "bordered" | "glass" | "minimal";

/**
 * Orientation of the steps
 */
export type StepsOrientation = "horizontal" | "vertical";

/**
 * Size variants
 */
export type StepsSize = "sm" | "md" | "lg";

/**
 * Props for individual step items
 */
export interface StepItem {
  /**
   * Unique identifier for the step
   */
  id: string | number;

  /**
   * Title of the step
   */
  title: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Status of the step
   * @default "pending"
   */
  status?: StepStatus;

  /**
   * Custom icon for the step
   */
  icon?: React.ReactNode;

  /**
   * Whether the step is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional content to display when step is expanded
   */
  content?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Steps component
 */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of step items
   */
  steps: StepItem[];

  /**
   * Current active step index
   * @default 0
   */
  current?: number;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: StepsVariant;

  /**
   * Size variant
   * @default "md"
   */
  size?: StepsSize;

  /**
   * Orientation of the steps
   * @default "horizontal"
   */
  orientation?: StepsOrientation;

  /**
   * Show step numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Show connector lines between steps
   * @default true
   */
  showConnector?: boolean;

  /**
   * Allow clicking on steps to navigate
   * @default false
   */
  clickable?: boolean;

  /**
   * Show step descriptions
   * @default true
   */
  showDescription?: boolean;

  /**
   * Callback when a step is clicked
   */
  onStepClick?: (stepIndex: number) => void;

  /**
   * Custom render function for step icon
   */
  renderIcon?: (
    step: StepItem,
    index: number,
    status: StepStatus
  ) => React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
