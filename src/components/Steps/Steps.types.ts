import { ReactNode } from "react";

/**
 * Status of an individual step in the process.
 */
export type StepStatus = "completed" | "current" | "pending" | "error";

/**
 * Visual style variant for the steps component.
 */
export type StepsVariant = "default" | "bordered" | "glass" | "minimal";

/**
 * Orientation/layout direction for the steps.
 */
export type StepsOrientation = "horizontal" | "vertical";

/**
 * Size variant for step indicators and text.
 */
export type StepsSize = "sm" | "md" | "lg";

/**
 * Props for the Steps component.
 *
 * Steps provides a visual indicator for multi-step processes, showing
 * progress through a sequence of steps with support for completed, current,
 * and pending states.
 *
 * @example
 * // Basic horizontal steps
 * <Steps value="shipping" onValueChange={setStep}>
 *   <StepsItem value="cart" title="Shopping Cart" />
 *   <StepsItem value="shipping" title="Shipping Info" />
 *   <StepsItem value="payment" title="Payment" />
 *   <StepsItem value="confirm" title="Confirmation" />
 * </Steps>
 *
 * @example
 * // Vertical steps with descriptions
 * <Steps value={currentStep} orientation="vertical" onValueChange={handleStepChange}>
 *   <StepsItem value="1" title="Account" description="Create your account" />
 *   <StepsItem value="2" title="Profile" description="Complete your profile" />
 *   <StepsItem value="3" title="Verify" description="Verify your email" />
 * </Steps>
 *
 * @example
 * // Clickable steps with custom variant
 * <Steps value={step} variant="bordered" clickable onValueChange={setStep}>
 *   <StepsItem value="1" title="Step 1" />
 *   <StepsItem value="2" title="Step 2" />
 *   <StepsItem value="3" title="Step 3" />
 * </Steps>
 *
 * @example
 * // With custom icons
 * <Steps value={current}>
 *   <StepsItem value="1" title="Login" icon={<UserIcon />} />
 *   <StepsItem value="2" title="Security" icon={<ShieldIcon />} />
 *   <StepsItem value="3" title="Done" icon={<CheckIcon />} />
 * </Steps>
 */
export interface StepsProps {
  /**
   * Current active step value (controlled).
   * When provided, the Steps component operates in controlled mode.
   *
   * @example
   * const [step, setStep] = useState("shipping");
   * <Steps value={step} onValueChange={setStep}>
   *   <StepsItem value="cart" title="Cart" />
   *   <StepsItem value="shipping" title="Shipping" />
   * </Steps>
   */
  value?: string | number;

  /**
   * Default active step value (uncontrolled).
   * Used when Steps operates in uncontrolled mode.
   *
   * @default undefined
   *
   * @example
   * <Steps defaultValue="step1">
   *   <StepsItem value="step1" title="First Step" />
   *   <StepsItem value="step2" title="Second Step" />
   * </Steps>
   */
  defaultValue?: string | number;

  /**
   * Callback fired when the active step changes.
   * Receives the new step value as an argument.
   *
   * @example
   * <Steps
   *   value={currentStep}
   *   onValueChange={(newStep) => {
   *     setCurrentStep(newStep);
   *     console.log('Moving to step:', newStep);
   *   }}
   * >
   *   <StepsItem value="1" title="Step 1" />
   *   <StepsItem value="2" title="Step 2" />
   * </Steps>
   */
  onValueChange?: (value: string | number) => void;

  /**
   * Visual style variant for the steps.
   * - `default`: Standard styling with solid backgrounds
   * - `bordered`: Steps with borders and outlined style
   * - `glass`: Glassmorphism effect with backdrop blur
   * - `minimal`: Minimal styling without backgrounds
   *
   * @default 'default'
   *
   * @example
   * <Steps variant="bordered" value="2">
   *   <StepsItem value="1" title="Step 1" />
   *   <StepsItem value="2" title="Step 2" />
   * </Steps>
   */
  variant?: StepsVariant;

  /**
   * Size of the step indicators and text.
   * - `sm`: Small (compact spacing, smaller icons)
   * - `md`: Medium (standard spacing) - default
   * - `lg`: Large (comfortable spacing, larger icons)
   *
   * @default 'md'
   *
   * @example
   * <Steps size="lg" value="1">
   *   <StepsItem value="1" title="Large Step" />
   * </Steps>
   */
  size?: StepsSize;

  /**
   * Orientation/layout direction of the steps.
   * - `horizontal`: Steps arranged in a row (default)
   * - `vertical`: Steps arranged in a column
   *
   * @default 'horizontal'
   *
   * @example
   * <Steps orientation="vertical" value="2">
   *   <StepsItem value="1" title="First" />
   *   <StepsItem value="2" title="Second" />
   *   <StepsItem value="3" title="Third" />
   * </Steps>
   */
  orientation?: StepsOrientation;

  /**
   * Whether steps can be clicked to navigate between them.
   * When true, users can click on any non-disabled step to navigate.
   *
   * @default false
   *
   * @example
   * <Steps value={step} clickable onValueChange={setStep}>
   *   <StepsItem value="1" title="Step 1" />
   *   <StepsItem value="2" title="Step 2" />
   *   <StepsItem value="3" title="Step 3" />
   * </Steps>
   */
  clickable?: boolean;

  /**
   * Additional CSS classes for the steps container.
   *
   * @example
   * <Steps value="1" className="my-8">
   *   <StepsItem value="1" title="Step 1" />
   * </Steps>
   */
  className?: string;

  /**
   * Step items to display.
   * Should be StepsItem components.
   */
  children: ReactNode;
}

/**
 * Props for individual step items within a Steps component.
 *
 * StepsItem represents a single step in a multi-step process, displaying
 * its status (completed, current, pending, error) and associated content.
 *
 * @example
 * <StepsItem value="shipping" title="Shipping Information" />
 *
 * @example
 * <StepsItem
 *   value="payment"
 *   title="Payment"
 *   description="Enter your payment details"
 *   icon={<CreditCardIcon />}
 * />
 *
 * @example
 * <StepsItem
 *   value="error-step"
 *   title="Verification Failed"
 *   description="Please check your information"
 *   status="error"
 * />
 */
export interface StepsItemProps {
  /**
   * Unique identifier for this step.
   * Used to determine which step is active and calculate status.
   *
   * @example
   * <StepsItem value="step1" title="First Step" />
   * <StepsItem value={2} title="Second Step" />
   */
  value: string | number;

  /**
   * Main title/label for the step.
   * Displayed prominently below or beside the step indicator.
   *
   * @example
   * <StepsItem value="1" title="Account Setup" />
   */
  title: string;

  /**
   * Optional description text for the step.
   * Provides additional context about what happens in this step.
   *
   * @example
   * <StepsItem
   *   value="1"
   *   title="Create Account"
   *   description="Enter your email and password"
   * />
   */
  description?: string;

  /**
   * Manually override the step status.
   * When not provided, status is automatically calculated based on
   * the step's position relative to the current step.
   *
   * - `completed`: Step has been completed
   * - `current`: Step is currently active
   * - `pending`: Step has not been reached yet
   * - `error`: Step has an error state
   *
   * @example
   * <StepsItem
   *   value="verify"
   *   title="Email Verification"
   *   status="error"
   *   description="Verification failed"
   * />
   */
  status?: StepStatus;

  /**
   * Custom icon to display in the step indicator.
   * When not provided, shows step number or checkmark for completed steps.
   *
   * @example
   * <StepsItem
   *   value="1"
   *   title="Login"
   *   icon={<UserIcon size={16} />}
   * />
   *
   * @example
   * <StepsItem
   *   value="2"
   *   title="Security"
   *   icon={<ShieldCheckIcon size={16} />}
   * />
   */
  icon?: ReactNode;

  /**
   * Whether this step is disabled.
   * Disabled steps cannot be clicked even when clickable prop is true.
   *
   * @default false
   *
   * @example
   * <StepsItem
   *   value="3"
   *   title="Premium Feature"
   *   description="Upgrade to unlock"
   *   disabled
   * />
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for the step item.
   *
   * @example
   * <StepsItem
   *   value="1"
   *   title="Important Step"
   *   className="border-2 border-primary"
   * />
   */
  className?: string;

  /**
   * Additional content to display for this step (vertical layout only).
   * Can include forms, instructions, or any custom content.
   *
   * @example
   * <StepsItem value="1" title="Enter Details">
   *   <form>
   *     <Input label="Name" />
   *     <Input label="Email" />
   *   </form>
   * </StepsItem>
   */
  children?: ReactNode;
}
