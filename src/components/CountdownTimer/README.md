# CountdownTimer

Displays a live ticking countdown to a target date or timestamp. Uses `useEffect` and `setInterval` gracefully.

## Installation

```tsx
import { CountdownTimer } from 'saha-ui';
```

## Usage

### Countdown Widget

```tsx
import { CountdownTimer } from "saha-ui";

export default function Example() {
  // New Year target
  const target = new Date(new Date().getFullYear() + 1, 0, 1);

  return (
    <CountdownTimer 
      targetDate={target}
      onComplete={() => console.log("Happy New Year!")}
      size="lg"
      variant="outline"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetDate` | `Date \| string` | - | Final mathematical ceiling forcing absolute timer zero |
| `onComplete` | `() => void` | - | Dispatches function exactly once timestamp breaches local bounds perfectly |
| `showLabels` | `boolean` | `true` | Forces sub-caption metrics detailing unit dimensions below numeric scales |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Scales overall rendered digits maintaining font weight integrity perfectly |
| `variant` | `"default" \| "primary" \| "secondary" \| "glass" \| "outline"` | `"default"` | Applies background fill colors dynamically targeting container logic |
