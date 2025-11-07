# Progress

A flexible progress bar component for displaying task completion, loading states, and percentage values. Supports multiple variants, animations, and customization options.

## Features

- 🎨 Multiple visual variants (default, primary, secondary, accent, success, warning, error, info, gradient, striped, glass)
- 📏 Five sizes (xs, sm, md, lg, xl)
- 🔷 Three shapes (rounded, pill, square)
- ✨ Four animation types (none, pulse, shimmer, indeterminate)
- 📊 Value display options (inside, outside, top)
- 🌈 Striped and animated patterns
- 💫 Glow effects
- ♿ Fully accessible with ARIA attributes
- 🎭 Custom colors and formatters
- 🔄 Indeterminate/loading state

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Progress } from '@saha-ui/core';

function MyComponent() {
  return (
    <Progress value={75} variant="primary" />
  );
}
```

## Variants

### Default

```tsx
<Progress value={60} variant="default" />
```

### Primary

```tsx
<Progress value={75} variant="primary" />
```

### Success

```tsx
<Progress value={100} variant="success" />
```

### Warning

```tsx
<Progress value={50} variant="warning" />
```

### Error

```tsx
<Progress value={30} variant="error" />
```

### Gradient

```tsx
<Progress value={80} variant="gradient" />
```

### Striped

```tsx
<Progress value={70} variant="striped" />
```

### Glass

```tsx
<Progress value={65} variant="glass" />
```

## Sizes

```tsx
<Progress value={50} size="xs" />
<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />
<Progress value={50} size="xl" />
```

## Shapes

### Rounded (Default)

```tsx
<Progress value={60} shape="rounded" />
```

### Pill

```tsx
<Progress value={60} shape="pill" />
```

### Square

```tsx
<Progress value={60} shape="square" />
```

## With Value Display

### Inside Label (Default)

```tsx
<Progress value={75} showValue />
```

### Outside Label

```tsx
<Progress value={75} showValue labelPosition="outside" />
```

### Top Label

```tsx
<Progress value={75} showValue labelPosition="top" />
```

### Custom Label

```tsx
<Progress value={45} label="45 of 100 tasks completed" />
```

## Animations

### Pulse

```tsx
<Progress value={60} animation="pulse" />
```

### Shimmer

```tsx
<Progress value={70} animation="shimmer" />
```

### Indeterminate

Loading state with continuous animation:

```tsx
<Progress animation="indeterminate" />
```

## Striped Pattern

### Static Stripes

```tsx
<Progress value={70} striped />
```

### Animated Stripes

```tsx
<Progress value={70} striped stripedAnimated />
```

## Glow Effect

```tsx
<Progress value={80} variant="primary" glow />
```

## Custom Colors

```tsx
<Progress 
  value={60} 
  color="#8b5cf6" 
  trackColor="#e9d5ff"
/>
```

## Custom Value Formatter

```tsx
<Progress
  value={45}
  max={100}
  showValue
  valueFormat={(value, max) => `${value}/${max} MB`}
/>
```

## Indeterminate State

For unknown progress duration:

```tsx
<Progress indeterminate variant="primary" />
```

## API Reference

### Progress Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'gradient' \| 'striped' \| 'glass'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height of progress bar |
| `shape` | `'rounded' \| 'pill' \| 'square'` | `'rounded'` | Border radius style |
| `animation` | `'none' \| 'pulse' \| 'shimmer' \| 'indeterminate'` | `'none'` | Animation style |
| `showValue` | `boolean` | `false` | Whether to show percentage |
| `label` | `string` | - | Custom label text |
| `labelPosition` | `'inside' \| 'outside' \| 'top'` | `'inside'` | Label position |
| `color` | `string` | - | Custom progress bar color |
| `trackColor` | `string` | - | Custom track background color |
| `striped` | `boolean` | `false` | Show striped pattern |
| `stripedAnimated` | `boolean` | `false` | Animate stripes |
| `glow` | `boolean` | `false` | Show glow effect |
| `indeterminate` | `boolean` | `false` | Indeterminate loading state |
| `valueFormat` | `(value: number, max: number) => string` | - | Custom value formatter |
| `className` | `string` | - | Additional CSS classes |
| `barClassName` | `string` | - | Classes for progress bar |
| `labelClassName` | `string` | - | Classes for label |
| `aria-label` | `string` | - | Accessible label |

## Common Patterns

### File Upload Progress

```tsx
function FileUpload() {
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  return (
    <div className="space-y-2">
      <p>Uploading file...</p>
      <Progress 
        value={progress} 
        variant="primary"
        showValue
        size="lg"
      />
    </div>
  );
}
```

### Multi-Step Form

```tsx
function MultiStepForm({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress 
        value={progress}
        variant="gradient"
        size="md"
      />
    </div>
  );
}
```

### Task Completion

```tsx
function TaskList({ tasks }) {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const progress = (completed / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">Tasks Progress</span>
        <span className="text-sm text-muted-foreground">
          {completed} / {total} completed
        </span>
      </div>
      <Progress
        value={progress}
        variant={progress === 100 ? 'success' : 'primary'}
        showValue
        glow
      />
    </div>
  );
}
```

### Loading State

```tsx
function LoadingData() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Loading data...</p>
          <Progress 
            indeterminate 
            variant="primary"
            animation="shimmer"
          />
        </div>
      ) : (
        <div>Data loaded!</div>
      )}
    </div>
  );
}
```

### Skill Level Indicator

```tsx
function SkillLevel({ skill, level }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{skill}</span>
        <span className="text-sm">{level}%</span>
      </div>
      <Progress
        value={level}
        variant={level >= 80 ? 'success' : level >= 50 ? 'primary' : 'warning'}
        size="sm"
        glow
      />
    </div>
  );
}
```

### Storage Usage

```tsx
function StorageIndicator({ used, total }) {
  const percentage = (used / total) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Storage Used</span>
        <span>{used} GB / {total} GB</span>
      </div>
      <Progress
        value={percentage}
        variant={isNearLimit ? 'error' : 'primary'}
        showValue
        size="lg"
        glow={isNearLimit}
      />
      {isNearLimit && (
        <p className="text-xs text-error">
          You're running out of storage space
        </p>
      )}
    </div>
  );
}
```

### Download Progress

```tsx
function DownloadManager({ downloads }) {
  return (
    <div className="space-y-4">
      {downloads.map(download => (
        <div key={download.id} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{download.name}</span>
            <span className="text-xs text-muted-foreground">
              {download.speed} MB/s
            </span>
          </div>
          <Progress
            value={download.progress}
            variant="primary"
            size="sm"
            showValue
            striped
            stripedAnimated
          />
        </div>
      ))}
    </div>
  );
}
```

## Accessibility

The Progress component follows accessibility best practices:

- **ARIA Attributes:**
  - `role="progressbar"` automatically applied
  - `aria-valuenow` indicates current value
  - `aria-valuemin` indicates minimum value (0)
  - `aria-valuemax` indicates maximum value
  - `aria-label` for descriptive text

- **Screen Readers:**
  - Progress value is announced
  - Label text is accessible
  - State changes are communicated

### Accessible Examples

```tsx
// With descriptive label
<Progress
  value={75}
  aria-label="File upload progress: 75% complete"
/>

// Indeterminate with label
<Progress
  indeterminate
  aria-label="Loading content, please wait"
/>
```

## Best Practices

1. **Choose Appropriate Variants:** Use semantic variants (success for completed, error for failed, warning for attention needed)
2. **Show Values for Long Operations:** Display percentage or time remaining for operations longer than a few seconds
3. **Use Indeterminate Wisely:** Use for unknown duration tasks like network requests
4. **Provide Context:** Add labels to explain what's progressing
5. **Size Appropriately:** Larger sizes for primary progress indicators, smaller for secondary
6. **Animate Sparingly:** Too many animations can be distracting
7. **Consider Color Blindness:** Don't rely solely on color to convey meaning

## Styling

### Custom Styles

```tsx
<Progress
  value={70}
  className="shadow-lg"
  barClassName="bg-gradient-to-r from-blue-500 to-purple-600"
/>
```

### Responsive Sizing

```tsx
<Progress
  value={50}
  className="h-2 sm:h-3 md:h-4"
/>
```

## Related Components

- **Spinner** - For indeterminate loading states
- **Skeleton** - For content loading placeholders
- **Stepper** - For step-by-step progress
- **LinearProgress** - Alternative linear progress implementation

## Changelog

- **v1.0.0** - Initial release with all features