"use client";

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Check, AlertCircle } from "lucide-react";
import type {
  StepperProps,
  StepLabelProps,
  StepIconProps,
  StepConnectorProps,
  StepStatus,
  Step,
} from "./Stepper.types";
import {
  stepperVariants,
  stepItemVariants,
  stepIconContainerVariants,
  stepLabelVariants,
  stepDescriptionVariants,
  stepConnectorVariants,
} from "./Stepper.styles";

export type StepperVariantsProps = VariantProps<typeof stepperVariants>;

/**
 * StepIcon Component
 * Renders the icon or number for each step
 */
const StepIcon: React.FC<StepIconProps> = ({
  icon,
  stepNumber,
  active: _active = false,
  completed = false,
  error = false,
  showCheckmark = true,
  className: _className,
}) => {
  // Show checkmark for completed steps
  if (completed && showCheckmark) {
    return <Check className="h-5 w-5" />;
  }

  // Show error icon
  if (error) {
    return <AlertCircle className="h-5 w-5" />;
  }

  // Show custom icon if provided
  if (icon) {
    return <>{icon}</>;
  }

  // Show step number
  return <>{stepNumber}</>;
};

/**
 * StepLabel Component
 * Renders the label and description for each step
 */
const StepLabel: React.FC<StepLabelProps> = ({
  label,
  description,
  active = false,
  completed = false,
  error = false,
  optional = false,
  className,
}) => {
  const status: StepStatus = error
    ? "error"
    : active
      ? "active"
      : completed
        ? "complete"
        : "inactive";

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className={cn(stepLabelVariants({ status }))}>{label}</span>
        {optional && (
          <span className="text-xs text-muted-foreground">(Optional)</span>
        )}
      </div>
      {description && (
        <p className={cn(stepDescriptionVariants({ status }), "mt-1")}>
          {description}
        </p>
      )}
    </div>
  );
};

/**
 * StepConnector Component
 * Renders the line connecting steps
 */
const StepConnector: React.FC<
  StepConnectorProps & { color?: "primary" | "secondary" | "success" | "error" }
> = ({
  active = false,
  completed = false,
  orientation = "horizontal",
  color = "primary",
  className,
}) => {
  const status: StepStatus = active
    ? "active"
    : completed
      ? "complete"
      : "inactive";

  return (
    <div
      className={cn(
        stepConnectorVariants({
          orientation,
          status,
          color,
        }),
        className,
      )}
    />
  );
};

/**
 * Stepper Component
 *
 * A component for displaying multi-step processes and wizards.
 * Shows progress through a series of logical and numbered steps.
 *
 * @example
 * ```tsx
 * // Basic stepper
 * const steps = [
 *   { label: 'Account' },
 *   { label: 'Profile' },
 *   { label: 'Finish' }
 * ];
 * <Stepper steps={steps} activeStep={1} />
 *
 * // With descriptions
 * const stepsWithDesc = [
 *   { label: 'Account', description: 'Create your account' },
 *   { label: 'Profile', description: 'Set up your profile' },
 *   { label: 'Finish', description: 'Review and complete' }
 * ];
 * <Stepper steps={stepsWithDesc} activeStep={0} />
 *
 * // Vertical orientation
 * <Stepper
 *   orientation="vertical"
 *   steps={steps}
 *   activeStep={activeStep}
 * />
 *
 * // Interactive (clickable steps)
 * <Stepper
 *   steps={steps}
 *   activeStep={activeStep}
 *   interactive
 *   onStepClick={(index) => setActiveStep(index)}
 * />
 *
 * // With custom icons
 * const stepsWithIcons = [
 *   { label: 'Account', icon: <User /> },
 *   { label: 'Profile', icon: <Settings /> },
 *   { label: 'Finish', icon: <Check /> }
 * ];
 * <Stepper steps={stepsWithIcons} activeStep={0} />
 *
 * // With error state
 * <Stepper steps={steps} activeStep={1} error />
 * ```
 */
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      variant = "default",
      orientation = "horizontal",
      interactive = false,
      showNumbers = true,
      showConnectors = true,
      error = false,
      color = "primary",
      onStepClick,
      onChange,
      className,
      stepClassName,
      connectorClassName,
      alternativeLabel: _alternativeLabel = false,
      showCheckmark = true,
      ...props
    },
    ref,
  ) => {
    const handleStepClick = (stepIndex: number, step: Step) => {
      if (!interactive || step.disabled) return;

      onStepClick?.(stepIndex);
      onChange?.(stepIndex);
    };

    const getStepStatus = (stepIndex: number, step: Step): StepStatus => {
      // Use custom status if provided
      if (step.status) return step.status;

      // Error state
      if (error && stepIndex === activeStep) return "error";

      // Completed steps
      if (stepIndex < activeStep) return "complete";

      // Active step
      if (stepIndex === activeStep) return "active";

      // Future steps
      return "inactive";
    };

    return (
      <div
        ref={ref}
        className={cn(
          stepperVariants({
            orientation,
            variant,
          }),
          className,
        )}
        {...props}
      >
        {steps.map((step: Step, index: number) => {
          const status = getStepStatus(index, step);
          const isLast = index === steps.length - 1;
          const isClickable = interactive && !step.disabled;

          return (
            <React.Fragment key={step.id || index}>
              {/* Step Item */}
              <div
                className={cn(
                  stepItemVariants({
                    orientation,
                    interactive: isClickable,
                  }),
                  stepClassName,
                )}
                onClick={() => handleStepClick(index, step)}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleStepClick(index, step);
                  }
                }}
              >
                {/* Icon and Label Container */}
                <div
                  className={cn(
                    "flex items-start",
                    orientation === "horizontal"
                      ? "flex-col items-center"
                      : "flex-row w-full",
                  )}
                >
                  {/* Step Icon */}
                  <div
                    className={cn(
                      stepIconContainerVariants({
                        variant,
                        status,
                        color,
                        size: "md",
                      }),
                      step.disabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <StepIcon
                      icon={step.icon}
                      stepNumber={showNumbers ? index + 1 : index}
                      active={status === "active"}
                      completed={status === "complete"}
                      error={status === "error"}
                      showCheckmark={showCheckmark}
                    />
                  </div>

                  {/* Step Label */}
                  <StepLabel
                    label={step.label}
                    description={step.description}
                    active={status === "active"}
                    completed={status === "complete"}
                    error={status === "error"}
                    optional={step.optional}
                    className={cn(
                      orientation === "horizontal" ? "mt-2" : "ml-4 flex-1",
                      step.disabled && "opacity-50",
                    )}
                  />
                </div>
              </div>

              {/* Connector */}
              {showConnectors && !isLast && (
                <StepConnector
                  active={status === "active" || status === "complete"}
                  completed={index < activeStep - 1}
                  orientation={orientation}
                  color={color}
                  className={connectorClassName}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export { Stepper, StepIcon, StepLabel, StepConnector };
export default Stepper;
export type { StepperProps };
