# Stepper

A step-by-step navigation component for multi-step processes, forms, and workflows. Guides users through sequential tasks with visual progress tracking.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 🧭 Horizontal & vertical layouts
- ✅ Completion indicators
- 🎯 Click navigation
- 🔢 Step numbering
- 📝 Description support
- 🎭 Smooth animations

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Stepper, Step } from "saha-ui";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Stepper activeStep={currentStep}>
      <Step label="Account Details" />
      <Step label="Personal Information" />
      <Step label="Preferences" />
      <Step label="Review & Submit" />
    </Stepper>
  );
}
```

## Variants

```tsx
<Stepper variant="default">...</Stepper>
<Stepper variant="primary">...</Stepper>
<Stepper variant="secondary">...</Stepper>
<Stepper variant="gradient">...</Stepper>
<Stepper variant="glass">...</Stepper>
<Stepper variant="minimal">...</Stepper>
<Stepper variant="neon">...</Stepper>
```

## Sizes

```tsx
<Stepper size="sm">...</Stepper>
<Stepper size="md">...</Stepper>
<Stepper size="lg">...</Stepper>
<Stepper size="xl">...</Stepper>
```

## Vertical Orientation

```tsx
<Stepper orientation="vertical" activeStep={currentStep}>
  <Step label="Step 1" description="Complete your profile" />
  <Step label="Step 2" description="Add payment method" />
  <Step label="Step 3" description="Verify email" />
</Stepper>
```

## With Descriptions

```tsx
<Stepper activeStep={currentStep}>
  <Step label="Create Account" description="Enter your email and password" />
  <Step
    label="Verify Email"
    description="Check your inbox for verification link"
  />
  <Step label="Complete Profile" description="Add your personal information" />
</Stepper>
```

## With Icons

```tsx
import { User, Mail, CreditCard, CheckCircle } from "lucide-react";

<Stepper activeStep={currentStep}>
  <Step label="Account" icon={User} />
  <Step label="Email" icon={Mail} />
  <Step label="Payment" icon={CreditCard} />
  <Step label="Complete" icon={CheckCircle} />
</Stepper>;
```

## Clickable Steps

```tsx
<Stepper activeStep={currentStep} onStepClick={(step) => setCurrentStep(step)}>
  <Step label="Step 1" />
  <Step label="Step 2" />
  <Step label="Step 3" />
</Stepper>
```

## Error State

```tsx
<Stepper activeStep={currentStep}>
  <Step label="Account" />
  <Step label="Details" error />
  <Step label="Review" />
</Stepper>
```

## Common Patterns

### Multi-Step Form

```tsx
const [activeStep, setActiveStep] = useState(0);

const steps = [
  { label: "Account Details", component: AccountForm },
  { label: "Personal Info", component: PersonalForm },
  { label: "Preferences", component: PreferencesForm },
  { label: "Review", component: ReviewForm },
];

<div>
  <Stepper activeStep={activeStep} variant="gradient">
    {steps.map((step) => (
      <Step key={step.label} label={step.label} />
    ))}
  </Stepper>

  <div className="mt-8">{React.createElement(steps[activeStep].component)}</div>

  <div className="flex justify-between mt-8">
    <Button
      variant="outline"
      onClick={() => setActiveStep(activeStep - 1)}
      disabled={activeStep === 0}
    >
      Back
    </Button>

    <Button
      onClick={() => setActiveStep(activeStep + 1)}
      disabled={activeStep === steps.length - 1}
    >
      {activeStep === steps.length - 1 ? "Submit" : "Next"}
    </Button>
  </div>
</div>;
```

### Order Tracking

```tsx
<Stepper activeStep={2} orientation="vertical" variant="primary">
  <Step label="Order Placed" description="March 15, 2024 at 10:30 AM" />
  <Step label="Processing" description="March 15, 2024 at 11:15 AM" />
  <Step label="Shipped" description="March 16, 2024 at 9:00 AM" />
  <Step label="Out for Delivery" description="Expected today" />
  <Step label="Delivered" description="Not yet delivered" />
</Stepper>
```

### Onboarding Flow

```tsx
<Stepper activeStep={activeStep} variant="glass" size="lg">
  <Step
    label="Welcome"
    icon={HandWave}
    description="Get started with your account"
  />
  <Step
    label="Import Data"
    icon={Upload}
    description="Upload your existing data"
  />
  <Step
    label="Customize"
    icon={Settings}
    description="Set up your preferences"
  />
  <Step label="Invite Team" icon={Users} description="Add your team members" />
  <Step label="Launch" icon={Rocket} description="You're all set!" />
</Stepper>
```

## API Reference

### Stepper Props

| Prop          | Type                           | Default        | Description               |
| ------------- | ------------------------------ | -------------- | ------------------------- |
| `activeStep`  | `number`                       | `0`            | Current active step index |
| `variant`     | `StepperVariant`               | `"default"`    | Visual style              |
| `size`        | `StepperSize`                  | `"md"`         | Size preset               |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Layout direction          |
| `onStepClick` | `(step: number) => void`       | -              | Step click handler        |
| `className`   | `string`                       | -              | Additional classes        |

### Step Props

| Prop          | Type         | Default | Description          |
| ------------- | ------------ | ------- | -------------------- |
| `label`       | `string`     | -       | Step label           |
| `description` | `string`     | -       | Optional description |
| `icon`        | `LucideIcon` | -       | Optional icon        |
| `error`       | `boolean`    | `false` | Error state          |
| `disabled`    | `boolean`    | `false` | Disabled state       |
| `className`   | `string`     | -       | Additional classes   |

## Accessibility

- Keyboard navigation (Arrow keys, Enter)
- ARIA labels for step status
- Focus management
- Screen reader announcements
- Progress indication

## TypeScript

```typescript
import type { StepperProps, StepProps } from "saha-ui";
```

## Related Components

- Progress
- Breadcrumb
- Wizard
