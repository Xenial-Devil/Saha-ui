import type { VariantProps } from "class-variance-authority";
import { stepperVariants } from "./Stepper.styles";

/**
 * Stepper orientation types
 * Determines the direction of the stepper
 */
export type StepperOrientation = "horizontal" | "vertical";

/**
 * Stepper variant types
 * Determines the visual style of the stepper
 */
export type StepperVariant = "default" | "outlined" | "filled";

/**
 * Step status types
 * Represents the state of each step
 */
export type StepStatus = "complete" | "active" | "inactive" | "error";

/**
 * Props for individual Step
 */
export interface Step {
  /**
   * Unique identifier for the step
   */
  id?: string | number;

  /**
   * Label text for the step
   */
  label: string;

  /**
   * Optional description for the step
   */
  description?: string;

  /**
   * Optional icon for the step
   */
  icon?: React.ReactNode;

  /**
   * Whether this step is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether this step is optional
   * @default false
   */
  optional?: boolean;

  /**
   * Status of the step (overrides automatic calculation)
   */
  status?: StepStatus;

  /**
   * Custom click handler for the step
   */
  onClick?: () => void;
}

/**
 * Props for the Stepper component
 *
 * @example
 * ```tsx
 * // Basic stepper
 * <Stepper
 *   steps={[
 *     { label: 'Step 1' },
 *     { label: 'Step 2' },
 *     { label: 'Step 3' }
 *   ]}
 *   activeStep={0}
 * />
 *
 * // With descriptions
 * <Stepper
 *   steps={[
 *     { label: 'Account', description: 'Create your account' },
 *     { label: 'Profile', description: 'Set up your profile' },
 *     { label: 'Finish', description: 'Review and complete' }
 *   ]}
 *   activeStep={1}
 * />
 *
 * // Vertical stepper
 * <Stepper
 *   orientation="vertical"
 *   steps={steps}
 *   activeStep={activeStep}
 *   onStepClick={(step) => setActiveStep(step)}
 * />
 *
 * // With error state
 * <Stepper
 *   steps={steps}
 *   activeStep={1}
 *   error={true}
 * />
 * ```
 */
export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof stepperVariants> {
  /**
   * Array of step objects
   */
  steps: Step[];

  /**
   * Index of the currently active step
   * @default 0
   */
  activeStep?: number;

  /**
   * The visual style variant of the stepper
   * @default "default"
   */
  variant?: StepperVariant;

  /**
   * Orientation of the stepper
   * @default "horizontal"
   */
  orientation?: StepperOrientation;

  /**
   * Whether steps are clickable
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether to show step numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Whether to show connectors between steps
   * @default true
   */
  showConnectors?: boolean;

  /**
   * Whether the stepper is in an error state
   * @default false
   */
  error?: boolean;

  /**
   * Color scheme for the stepper
   * @default "primary"
   */
  color?: "primary" | "secondary" | "success" | "error";

  /**
   * Callback when a step is clicked
   */
  onStepClick?: (stepIndex: number) => void;

  /**
   * Callback when the active step changes
   */
  onChange?: (stepIndex: number) => void;

  /**
   * Custom class name for the stepper container
   */
  className?: string;

  /**
   * Custom class name for individual steps
   */
  stepClassName?: string;

  /**
   * Custom class name for connectors
   */
  connectorClassName?: string;

  /**
   * Whether to alternate labels in horizontal orientation
   * @default false
   */
  alternativeLabel?: boolean;

  /**
   * Whether completed steps should show a checkmark
   * @default true
   */
  showCheckmark?: boolean;
}

/**
 * Props for StepLabel component
 */
export interface StepLabelProps {
  label: string;
  description?: string;
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  optional?: boolean;
  className?: string;
}

/**
 * Props for StepIcon component
 */
export interface StepIconProps {
  icon?: React.ReactNode;
  stepNumber: number;
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  showCheckmark?: boolean;
  className?: string;
}

/**
 * Props for StepConnector component
 */
export interface StepConnectorProps {
  active?: boolean;
  completed?: boolean;
  orientation?: StepperOrientation;
  className?: string;
}
