# Timeline

A vertical timeline component for displaying chronological events, processes, or steps with visual indicators and customizable styles.

## Features

- 🎨 5 visual variants (default, outlined, gradient, minimal, glass)
- 📍 3 position modes (left, right, alternate)
- 📏 8 size options (xs to 4xl)
- 🎯 Status indicators (success, error, warning, info, pending)
- 🎨 Custom icons
- ♿ Accessible and semantic HTML
- 📱 Responsive design

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Timeline, TimelineItem } from "saha-ui";

function MyTimeline() {
  return (
    <Timeline>
      <TimelineItem
        title="Event 1"
        description="Description of event 1"
        time="2 hours ago"
      />
      <TimelineItem
        title="Event 2"
        description="Description of event 2"
        time="1 day ago"
      />
      <TimelineItem
        title="Event 3"
        description="Description of event 3"
        time="1 week ago"
      />
    </Timeline>
  );
}
```

## Variants

```tsx
<Timeline variant="default">...</Timeline>
<Timeline variant="outlined">...</Timeline>
<Timeline variant="gradient">...</Timeline>
<Timeline variant="minimal">...</Timeline>
<Timeline variant="glass">...</Timeline>
```

## Positions

```tsx
<Timeline position="left">...</Timeline>
<Timeline position="right">...</Timeline>
<Timeline position="alternate">...</Timeline>
```

## Status Colors

```tsx
<TimelineItem
  title="Success"
  status="success"
  description="Operation completed"
/>
<TimelineItem
  title="Error"
  status="error"
  description="Operation failed"
/>
<TimelineItem
  title="Warning"
  status="warning"
  description="Needs attention"
/>
```

## With Icons

```tsx
import { Check, X, AlertCircle } from "lucide-react";

<Timeline>
  <TimelineItem icon={<Check />} title="Completed" status="success" />
  <TimelineItem icon={<X />} title="Failed" status="error" />
  <TimelineItem icon={<AlertCircle />} title="Pending" status="warning" />
</Timeline>;
```

## Common Patterns

### Order Tracking

```tsx
<Timeline variant="gradient">
  <TimelineItem
    title="Order Placed"
    description="Your order has been received"
    time="Dec 12, 2:30 PM"
    status="success"
    icon={<ShoppingCart />}
  />
  <TimelineItem
    title="Processing"
    description="Order is being processed"
    time="Dec 12, 3:15 PM"
    status="success"
    icon={<Package />}
    active
  />
  <TimelineItem
    title="Shipped"
    description="On the way to you"
    status="pending"
    icon={<Truck />}
  />
  <TimelineItem title="Delivered" status="pending" icon={<CheckCircle />} />
</Timeline>
```

### Activity Feed

```tsx
<Timeline position="left" size="sm">
  {activities.map((activity) => (
    <TimelineItem
      key={activity.id}
      title={activity.title}
      description={activity.description}
      time={activity.timestamp}
      icon={activity.icon}
    />
  ))}
</Timeline>
```

## API Reference

### Timeline Props

| Prop        | Type                                   | Default     | Description       |
| ----------- | -------------------------------------- | ----------- | ----------------- |
| `variant`   | `TimelineVariant`                      | `"default"` | Visual style      |
| `position`  | `"left"` \| `"right"` \| `"alternate"` | `"left"`    | Timeline position |
| `size`      | `TimelineSize`                         | `"md"`      | Size              |
| `className` | `string`                               | -           | CSS classes       |

### TimelineItem Props

| Prop          | Type             | Default     | Description           |
| ------------- | ---------------- | ----------- | --------------------- |
| `title`       | `ReactNode`      | -           | Item title (required) |
| `description` | `ReactNode`      | -           | Item description      |
| `time`        | `ReactNode`      | -           | Timestamp/date        |
| `icon`        | `ReactNode`      | -           | Custom icon           |
| `status`      | `TimelineStatus` | `"default"` | Status color          |
| `active`      | `boolean`        | `false`     | Active state          |
| `className`   | `string`         | -           | CSS classes           |

## TypeScript

```typescript
import type { TimelineProps, TimelineItemProps } from "saha-ui";
```
