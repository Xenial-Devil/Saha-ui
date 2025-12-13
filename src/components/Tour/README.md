# Tour

An interactive guided tour component for onboarding users and showcasing features. Creates step-by-step walkthroughs with spotlights and tooltips.

## Features

- 🎯 Element spotlighting
- 🎨 14 visual variants
- 📏 8 size options
- 🧭 Auto-positioning
- ⌨️ Keyboard navigation
- 🔢 Progress tracking
- 🎭 Smooth animations
- 📱 Mobile-friendly

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Tour } from "saha-ui";

function App() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const steps = [
    {
      target: "#welcome",
      title: "Welcome!",
      content: "Let us show you around",
    },
    {
      target: "#dashboard",
      title: "Dashboard",
      content: "View your analytics here",
    },
    {
      target: "#settings",
      title: "Settings",
      content: "Customize your experience",
    },
  ];

  return (
    <div>
      <button onClick={() => setIsTourOpen(true)}>Start Tour</button>

      <Tour
        open={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        steps={steps}
      />
    </div>
  );
}
```

## Variants

```tsx
<Tour variant="default" steps={steps} />
<Tour variant="primary" steps={steps} />
<Tour variant="gradient" steps={steps} />
<Tour variant="glass" steps={steps} />
<Tour variant="neon" steps={steps} />
```

## Sizes

```tsx
<Tour size="sm" steps={steps} />
<Tour size="md" steps={steps} />
<Tour size="lg" steps={steps} />
```

## Custom Navigation

```tsx
<Tour
  steps={steps}
  showProgress
  nextButton="Next →"
  prevButton="← Back"
  doneButton="Got it!"
  showSkip
/>
```

## Step Options

```tsx
const steps = [
  {
    target: "#element",
    title: "Step Title",
    content: "Step description",
    placement: "bottom", // top, bottom, left, right
    spotlightPadding: 8,
    disableBeacon: true,
    hideCloseButton: false,
    showSkipButton: true,
  },
];
```

## With Callbacks

```tsx
<Tour
  steps={steps}
  onStepChange={(step) => console.log("Step:", step)}
  onComplete={() => console.log("Tour completed")}
  onSkip={() => console.log("Tour skipped")}
/>
```

## Common Patterns

### Product Onboarding

```tsx
const [showTour, setShowTour] = useState(false);

useEffect(() => {
  const hasSeenTour = localStorage.getItem("hasSeenTour");
  if (!hasSeenTour) {
    setShowTour(true);
  }
}, []);

const onboardingSteps = [
  {
    target: "#create-button",
    title: "Create Your First Project",
    content: "Click here to start a new project and begin your journey.",
    placement: "bottom",
  },
  {
    target: "#templates",
    title: "Browse Templates",
    content: "Choose from our collection of professionally designed templates.",
    placement: "right",
  },
  {
    target: "#team-invite",
    title: "Invite Your Team",
    content: "Collaborate with your team members in real-time.",
    placement: "bottom",
  },
  {
    target: "#settings",
    title: "Customize Settings",
    content: "Personalize your workspace to match your preferences.",
    placement: "left",
  },
];

<Tour
  open={showTour}
  onClose={() => {
    setShowTour(false);
    localStorage.setItem("hasSeenTour", "true");
  }}
  steps={onboardingSteps}
  variant="gradient"
  showProgress
/>;
```

### Feature Announcement

```tsx
const newFeatureSteps = [
  {
    target: "#new-feature",
    title: "🎉 New Feature Alert!",
    content: "We just launched AI-powered suggestions. Try it now!",
    placement: "bottom",
  },
  {
    target: "#ai-button",
    title: "AI Assistant",
    content: "Click here to get intelligent recommendations.",
    placement: "right",
  },
];

<Tour
  open={showAnnouncement}
  onClose={() => setShowAnnouncement(false)}
  steps={newFeatureSteps}
  variant="neon"
  size="lg"
/>;
```

### Interactive Tutorial

```tsx
const [currentStep, setCurrentStep] = useState(0);
const [tourOpen, setTourOpen] = useState(true);

const tutorialSteps = [
  {
    target: "#step-1",
    title: "Step 1: Upload File",
    content: "Start by uploading your file here.",
    placement: "bottom",
  },
  {
    target: "#step-2",
    title: "Step 2: Configure Settings",
    content: "Adjust the settings according to your needs.",
    placement: "right",
  },
  {
    target: "#step-3",
    title: "Step 3: Preview",
    content: "Review your changes before publishing.",
    placement: "left",
  },
  {
    target: "#step-4",
    title: "Step 4: Publish",
    content: "Click publish when you're ready!",
    placement: "top",
  },
];

<Tour
  open={tourOpen}
  onClose={() => setTourOpen(false)}
  steps={tutorialSteps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  showProgress
  variant="glass"
/>;
```

### Contextual Help

```tsx
const helpSteps = [
  {
    target: '#dashboard-chart',
    title: 'Understanding Your Analytics',
    content: 'This chart shows your performance over time. Click any data point for details.',
    placement: 'top'
  },
  {
    target: '#filters',
    title: 'Filter Your Data',
    content: 'Use these filters to narrow down your results.',
    placement: 'bottom'
  },
  {
    target: '#export',
    title: 'Export Reports',
    content: 'Download your data in various formats.',
    placement: 'left'
  }
];

<Button onClick={() => setShowHelp(true)}>
  Need Help?
</Button>

<Tour
  open={showHelp}
  onClose={() => setShowHelp(false)}
  steps={helpSteps}
  variant="primary"
/>
```

## API Reference

### Tour Props

| Prop           | Type                     | Default     | Description             |
| -------------- | ------------------------ | ----------- | ----------------------- |
| `open`         | `boolean`                | `false`     | Tour visibility         |
| `onClose`      | `() => void`             | -           | Close handler           |
| `steps`        | `TourStep[]`             | -           | Tour steps              |
| `currentStep`  | `number`                 | `0`         | Current step index      |
| `onStepChange` | `(step: number) => void` | -           | Step change handler     |
| `onComplete`   | `() => void`             | -           | Completion handler      |
| `onSkip`       | `() => void`             | -           | Skip handler            |
| `variant`      | `TourVariant`            | `"default"` | Visual style            |
| `size`         | `TourSize`               | `"md"`      | Size preset             |
| `showProgress` | `boolean`                | `true`      | Show progress indicator |
| `showSkip`     | `boolean`                | `true`      | Show skip button        |
| `nextButton`   | `ReactNode`              | `"Next"`    | Next button content     |
| `prevButton`   | `ReactNode`              | `"Back"`    | Previous button content |
| `doneButton`   | `ReactNode`              | `"Done"`    | Done button content     |
| `skipButton`   | `ReactNode`              | `"Skip"`    | Skip button content     |
| `className`    | `string`                 | -           | Additional classes      |

### TourStep

| Property           | Type        | Default  | Description                     |
| ------------------ | ----------- | -------- | ------------------------------- |
| `target`           | `string`    | -        | CSS selector for target element |
| `title`            | `string`    | -        | Step title                      |
| `content`          | `ReactNode` | -        | Step content                    |
| `placement`        | `Placement` | `"auto"` | Tooltip position                |
| `spotlightPadding` | `number`    | `8`      | Spotlight padding (px)          |
| `disableBeacon`    | `boolean`   | `false`  | Disable beacon animation        |
| `hideCloseButton`  | `boolean`   | `false`  | Hide close button               |
| `showSkipButton`   | `boolean`   | `true`   | Show skip button                |

## Accessibility

- Keyboard navigation (Arrow keys, Escape)
- ARIA labels and descriptions
- Focus management
- Screen reader support
- Skip option for accessibility

## TypeScript

```typescript
import type { TourProps, TourStep } from "saha-ui";

type Placement = "top" | "bottom" | "left" | "right" | "auto";
```

## Related Components

- Tooltip
- Popover
- Dialog
