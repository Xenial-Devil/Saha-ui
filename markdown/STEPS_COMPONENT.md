# Steps Component Documentation

## Overview

The **Steps** component is a versatile progress indicator designed for multi-step processes, wizards, onboarding flows, and sequential workflows. It supports both horizontal and vertical layouts with beautiful glassmorphism effects.

## Features

- ✅ **Horizontal and Vertical** layouts
- 🎨 **4 Visual Variants** - default, bordered, glass, minimal
- 📏 **3 Size Options** - sm, md, lg
- 🔢 **Auto-numbered or Custom Icons**
- 📍 **Status Indicators** - completed, current, pending, error
- 🖱️ **Clickable Navigation** - optional interactive steps
- 📝 **Optional Descriptions** - additional context per step
- 🔗 **Connector Lines** - visual flow between steps
- 🎭 **Smooth Transitions** - CSS animations
- ♿ **Accessible** - keyboard navigation and screen readers

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Steps } from "saha-ui";

function MyComponent() {
  const steps = [
    { id: 1, title: 'Account', description: 'Create your account' },
    { id: 2, title: 'Profile', description: 'Fill in your details' },
    { id: 3, title: 'Complete', description: 'You're all set!' }
  ];

  return <Steps steps={steps} current={1} />;
}
```

## Props

### StepsProps

| Prop              | Type                                              | Default        | Description                   |
| ----------------- | ------------------------------------------------- | -------------- | ----------------------------- |
| `steps`           | `StepItem[]`                                      | **required**   | Array of step items           |
| `current`         | `number`                                          | `0`            | Current active step index     |
| `variant`         | `"default" \| "bordered" \| "glass" \| "minimal"` | `"default"`    | Visual variant                |
| `size`            | `"sm" \| "md" \| "lg"`                            | `"md"`         | Size variant                  |
| `orientation`     | `"horizontal" \| "vertical"`                      | `"horizontal"` | Layout orientation            |
| `showNumbers`     | `boolean`                                         | `true`         | Show step numbers             |
| `showConnector`   | `boolean`                                         | `true`         | Show connector lines          |
| `clickable`       | `boolean`                                         | `false`        | Enable step navigation        |
| `showDescription` | `boolean`                                         | `true`         | Show step descriptions        |
| `onStepClick`     | `(stepIndex: number) => void`                     | -              | Callback when step is clicked |
| `renderIcon`      | `(step, index, status) => ReactNode`              | -              | Custom icon renderer          |
| `className`       | `string`                                          | -              | Additional CSS classes        |

### StepItem

| Prop          | Type                                               | Default      | Description            |
| ------------- | -------------------------------------------------- | ------------ | ---------------------- |
| `id`          | `string \| number`                                 | **required** | Unique identifier      |
| `title`       | `string`                                           | **required** | Step title             |
| `description` | `string`                                           | -            | Optional description   |
| `status`      | `"completed" \| "current" \| "pending" \| "error"` | Auto         | Step status            |
| `icon`        | `ReactNode`                                        | -            | Custom icon            |
| `disabled`    | `boolean`                                          | `false`      | Disable the step       |
| `content`     | `ReactNode`                                        | -            | Expandable content     |
| `className`   | `string`                                           | -            | Additional CSS classes |

## Examples

### Horizontal Steps

```tsx
<Steps
  steps={[
    { id: 1, title: "Select Plan", description: "Choose a subscription" },
    { id: 2, title: "Payment", description: "Enter payment details" },
    { id: 3, title: "Confirm", description: "Review and confirm" },
  ]}
  current={1}
/>
```

### Vertical Steps

```tsx
<Steps
  steps={[
    { id: 1, title: "Step 1", description: "First step" },
    { id: 2, title: "Step 2", description: "Second step" },
    { id: 3, title: "Step 3", description: "Third step" },
  ]}
  orientation="vertical"
  variant="bordered"
/>
```

### Glass Variant

```tsx
<Steps steps={steps} current={2} variant="glass" size="lg" />
```

### Custom Icons

```tsx
import { User, CreditCard, Check } from "lucide-react";

<Steps
  steps={[
    {
      id: 1,
      title: "Personal",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Payment",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Done",
      icon: <Check className="w-5 h-5" />,
    },
  ]}
  current={1}
/>;
```

### Clickable Steps

```tsx
import { useState } from "react";

function Wizard() {
  const [current, setCurrent] = useState(0);

  return (
    <Steps
      steps={steps}
      current={current}
      clickable
      onStepClick={(index) => setCurrent(index)}
    />
  );
}
```

### With Status

```tsx
<Steps
  steps={[
    {
      id: 1,
      title: "Account",
      description: "Created",
      status: "completed",
    },
    {
      id: 2,
      title: "Verification",
      description: "In progress",
      status: "current",
    },
    {
      id: 3,
      title: "Setup",
      description: "Waiting",
      status: "pending",
    },
    {
      id: 4,
      title: "Payment",
      description: "Failed",
      status: "error",
    },
  ]}
/>
```

### Without Descriptions

```tsx
<Steps steps={steps} current={1} showDescription={false} />
```

### Without Numbers (Dots)

```tsx
<Steps steps={steps} current={1} showNumbers={false} />
```

### Small Size

```tsx
<Steps steps={steps} current={0} size="sm" variant="minimal" />
```

### With Expandable Content

```tsx
<Steps
  steps={[
    {
      id: 1,
      title: "Step 1",
      description: "First step",
      status: "completed",
    },
    {
      id: 2,
      title: "Step 2",
      description: "Current step",
      status: "current",
      content: (
        <div className="p-4 bg-background rounded-lg">
          <input placeholder="Enter your details..." />
        </div>
      ),
    },
    {
      id: 3,
      title: "Step 3",
      description: "Last step",
      status: "pending",
    },
  ]}
  orientation="vertical"
/>
```

### Custom Render Icon

```tsx
import { CheckCircle, Circle, XCircle } from "lucide-react";

<Steps
  steps={steps}
  current={1}
  renderIcon={(step, index, status) => {
    if (status === "completed") return <CheckCircle />;
    if (status === "error") return <XCircle />;
    return <Circle />;
  }}
/>;
```

## Variants

### Default

Clean, minimal design with subtle borders.

### Bordered

Container with rounded borders and padding.

### Glass

Beautiful glassmorphism effect with backdrop blur.

### Minimal

Ultra-minimal with reduced padding.

## Status Colors

- **Completed**: Green/Success color with check icon
- **Current**: Primary color with scale animation
- **Pending**: Muted/Gray color
- **Error**: Red/Destructive color with alert icon

## Accessibility

- ✅ Proper semantic HTML
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Meaningful status indicators

## TypeScript

Full TypeScript support with comprehensive types:

```tsx
import type {
  StepsProps,
  StepItem,
  StepStatus,
  StepsVariant,
  StepsOrientation,
  StepsSize,
} from "saha-ui";

const steps: StepItem[] = [{ id: 1, title: "Step 1", description: "First" }];

const variant: StepsVariant = "glass";
const orientation: StepsOrientation = "horizontal";
const size: StepsSize = "lg";
```

## Best Practices

### ✅ Do

- Use descriptive titles for each step
- Provide context with descriptions
- Use appropriate status indicators
- Match variant to your design system
- Use vertical layout for complex forms
- Provide meaningful step counts

### ❌ Don't

- Use too many steps (keep it 3-7)
- Make all steps clickable in linear workflows
- Mix numbered and custom icons inconsistently
- Forget to update `current` prop
- Disable steps without visual feedback

## Real-World Examples

### Checkout Flow

```tsx
import { Package, Truck, CreditCard, Check } from "lucide-react";

<Steps
  steps={[
    { id: 1, title: "Cart", icon: <Package />, status: "completed" },
    { id: 2, title: "Shipping", icon: <Truck />, status: "current" },
    { id: 3, title: "Payment", icon: <CreditCard />, status: "pending" },
    { id: 4, title: "Confirm", icon: <Check />, status: "pending" },
  ]}
  variant="glass"
/>;
```

### Onboarding

```tsx
<Steps
  steps={[
    { id: 1, title: 'Welcome', description: 'Get started' },
    { id: 2, title: 'Profile', description: 'Tell us about you' },
    { id: 3, title: 'Preferences', description: 'Customize' },
    { id: 4, title: 'Done', description: 'You're ready!' }
  ]}
  current={currentStep}
  clickable
  onStepClick={setCurrentStep}
  variant="bordered"
/>
```

### Form Wizard

```tsx
function FormWizard() {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Personal Info",
      content: <PersonalInfoForm />,
    },
    {
      id: 2,
      title: "Contact",
      content: <ContactForm />,
    },
    {
      id: 3,
      title: "Review",
      content: <ReviewForm />,
    },
  ];

  return (
    <>
      <Steps
        steps={steps}
        current={current}
        orientation="vertical"
        variant="glass"
      />
      <div className="mt-6">{steps[current].content}</div>
    </>
  );
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Lightweight component (~6.7KB gzipped)
- CSS transitions for smooth animations
- Optimized re-renders with React.memo
- Tree-shakeable imports

---

**Status:** ✅ Production Ready  
**Version:** 1.3.0+  
**Last Updated:** October 12, 2025
