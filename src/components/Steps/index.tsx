import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { StepsProps, StepStatus } from "./Steps.types";
import { Check, Circle, AlertCircle } from "lucide-react";

/**
 * CVA variants for Steps container
 */
const stepsVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "p-6 rounded-xl border-2 border-border bg-background",
      glass:
        "p-6 rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm shadow-lg",
      minimal: "p-2",
    },
    orientation: {
      horizontal: "flex items-start",
      vertical: "flex flex-col",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

/**
 * CVA variants for individual step
 */
const stepVariants = cva(
  "relative flex items-start transition-all duration-200",
  {
    variants: {
      orientation: {
        horizontal: "flex-col items-center flex-1",
        vertical: "flex-row pb-8 last:pb-0",
      },
      clickable: {
        true: "cursor-pointer hover:opacity-80",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      clickable: false,
      disabled: false,
    },
  }
);

/**
 * CVA variants for step icon container
 */
const stepIconVariants = cva(
  "flex items-center justify-center rounded-full font-semibold transition-all duration-200 border-2",
  {
    variants: {
      status: {
        completed:
          "bg-success border-success text-white shadow-lg shadow-success/20",
        current:
          "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110",
        pending: "bg-background border-border text-muted-foreground",
        error:
          "bg-destructive border-destructive text-white shadow-lg shadow-destructive/20",
      },
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
    },
  }
);

/**
 * CVA variants for connector line
 */
const connectorVariants = cva("transition-all duration-300", {
  variants: {
    orientation: {
      horizontal: "h-0.5 flex-1 mx-2 mt-5",
      vertical: "w-0.5 ml-5 flex-1",
    },
    status: {
      completed: "bg-success",
      current: "bg-gradient-to-r from-success to-primary",
      pending: "bg-border",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "pending",
  },
});

/**
 * Ultra-modern Steps component
 *
 * Display a sequence of steps in a process with various styles and orientations.
 * Perfect for multi-step forms, wizards, progress tracking, and onboarding flows.
 *
 * @example
 * ```tsx
 * <Steps
 *   steps={[
 *     { id: 1, title: 'Account', description: 'Create your account' },
 *     { id: 2, title: 'Profile', description: 'Fill in your details' },
 *     { id: 3, title: 'Complete', description: 'Review and submit' },
 *   ]}
 *   current={1}
 *   variant="glass"
 * />
 * ```
 */
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      steps,
      current = 0,
      variant = "default",
      size = "md",
      orientation = "horizontal",
      showNumbers = true,
      showConnector = true,
      clickable = false,
      showDescription = true,
      onStepClick,
      renderIcon,
      className,
      ...props
    },
    ref
  ) => {
    // Determine status for each step
    const getStepStatus = (index: number): StepStatus => {
      const step = steps[index];
      if (step.status) return step.status;
      if (index < current) return "completed";
      if (index === current) return "current";
      return "pending";
    };

    // Handle step click
    const handleStepClick = (index: number) => {
      const step = steps[index];
      if (!clickable || step.disabled) return;
      onStepClick?.(index);
    };

    // Default icon renderer
    const defaultRenderIcon = (index: number, status: StepStatus) => {
      const step = steps[index];

      if (step.icon) return step.icon;

      switch (status) {
        case "completed":
          return <Check className="w-5 h-5" />;
        case "error":
          return <AlertCircle className="w-5 h-5" />;
        case "current":
          return showNumbers ? (
            index + 1
          ) : (
            <Circle className="w-3 h-3 fill-current" />
          );
        case "pending":
          return showNumbers ? index + 1 : <Circle className="w-3 h-3" />;
        default:
          return index + 1;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(stepsVariants({ variant, orientation }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  stepVariants({
                    orientation,
                    clickable: clickable && !step.disabled,
                    disabled: step.disabled,
                  }),
                  step.className
                )}
                onClick={() => handleStepClick(index)}
              >
                {/* Step Icon/Number */}
                <div
                  className={cn(
                    stepIconVariants({ status, size }),
                    orientation === "vertical" && "shrink-0"
                  )}
                >
                  {renderIcon
                    ? renderIcon(step, index, status)
                    : defaultRenderIcon(index, status)}
                </div>

                {/* Step Content */}
                <div
                  className={cn(
                    "flex flex-col",
                    orientation === "horizontal"
                      ? "mt-3 text-center"
                      : "ml-4 text-left flex-1"
                  )}
                >
                  {/* Title */}
                  <h4
                    className={cn(
                      "font-semibold transition-colors",
                      status === "current" && "text-primary",
                      status === "completed" && "text-success",
                      status === "error" && "text-destructive",
                      status === "pending" && "text-muted-foreground",
                      size === "sm" && "text-sm",
                      size === "md" && "text-base",
                      size === "lg" && "text-lg"
                    )}
                  >
                    {step.title}
                  </h4>

                  {/* Description */}
                  {showDescription && step.description && (
                    <p
                      className={cn(
                        "mt-1 text-muted-foreground",
                        size === "sm" && "text-xs",
                        size === "md" && "text-sm",
                        size === "lg" && "text-base"
                      )}
                    >
                      {step.description}
                    </p>
                  )}

                  {/* Optional Content */}
                  {step.content && status === "current" && (
                    <div className="mt-3">{step.content}</div>
                  )}
                </div>

                {/* Vertical connector */}
                {orientation === "vertical" && !isLast && showConnector && (
                  <div className="absolute left-5 top-12 bottom-0">
                    <div
                      className={cn(connectorVariants({ orientation, status }))}
                    />
                  </div>
                )}
              </div>

              {/* Horizontal connector */}
              {orientation === "horizontal" && !isLast && showConnector && (
                <div
                  className={cn(connectorVariants({ orientation, status }))}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";

export default Steps;
