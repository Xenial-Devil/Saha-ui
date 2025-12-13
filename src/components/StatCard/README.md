# StatCard

A versatile statistics display card for dashboards and analytics. Showcases key metrics with trends, comparisons, and visual indicators.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 📊 Trend indicators
- 🎯 Icon support
- 📈 Comparison values
- 🌈 Color-coded changes
- ⚡ Loading states
- 🎭 Hover effects

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { StatCard } from "saha-ui";
import { Users } from "lucide-react";

function App() {
  return (
    <StatCard
      title="Total Users"
      value="12,345"
      icon={Users}
      trend="up"
      change="+12.5%"
      description="vs last month"
    />
  );
}
```

## Variants

```tsx
<StatCard variant="default" {...props} />
<StatCard variant="primary" {...props} />
<StatCard variant="secondary" {...props} />
<StatCard variant="success" {...props} />
<StatCard variant="warning" {...props} />
<StatCard variant="destructive" {...props} />
<StatCard variant="gradient" {...props} />
<StatCard variant="glass" {...props} />
<StatCard variant="neon" {...props} />
<StatCard variant="minimal" {...props} />
```

## Sizes

```tsx
<StatCard size="sm" {...props} />
<StatCard size="md" {...props} />
<StatCard size="lg" {...props} />
<StatCard size="xl" {...props} />
```

## With Trends

```tsx
<StatCard
  title="Revenue"
  value="$45,231"
  trend="up"
  change="+20.1%"
  description="from last month"
/>

<StatCard
  title="Bounce Rate"
  value="32.4%"
  trend="down"
  change="-5.2%"
  description="vs last week"
/>

<StatCard
  title="Conversion"
  value="3.24%"
  trend="neutral"
  description="unchanged"
/>
```

## With Icons

```tsx
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

<StatCard
  title="Total Revenue"
  value="$45,231"
  icon={DollarSign}
  iconColor="text-green-500"
/>

<StatCard
  title="Active Users"
  value="2,845"
  icon={Users}
  iconColor="text-blue-500"
/>
```

## Loading State

```tsx
<StatCard title="Sales" value="Loading..." loading={true} />
```

## Clickable

```tsx
<StatCard
  title="View Details"
  value="123"
  onClick={() => navigate("/details")}
  className="cursor-pointer"
/>
```

## Common Patterns

### Dashboard Stats Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatCard
    title="Total Revenue"
    value="$45,231.89"
    trend="up"
    change="+20.1%"
    description="from last month"
    icon={DollarSign}
    variant="gradient"
  />

  <StatCard
    title="Subscriptions"
    value="+2,350"
    trend="up"
    change="+180.1%"
    description="from last month"
    icon={Users}
    variant="primary"
  />

  <StatCard
    title="Sales"
    value="+12,234"
    trend="up"
    change="+19%"
    description="from last month"
    icon={ShoppingCart}
    variant="secondary"
  />

  <StatCard
    title="Active Now"
    value="+573"
    trend="up"
    change="+201"
    description="since last hour"
    icon={Activity}
    variant="success"
  />
</div>
```

### Comparison Stats

```tsx
<StatCard
  title="Website Traffic"
  value="142,845"
  change="+12.5%"
  trend="up"
  description="vs last month"
  footer={
    <div className="flex gap-4 mt-4 text-sm">
      <div>
        <span className="text-muted-foreground">Desktop:</span>
        <span className="ml-2 font-medium">98,234</span>
      </div>
      <div>
        <span className="text-muted-foreground">Mobile:</span>
        <span className="ml-2 font-medium">44,611</span>
      </div>
    </div>
  }
/>
```

### Multi-Metric Card

```tsx
<StatCard
  title="E-commerce Overview"
  value="$125,430"
  icon={ShoppingCart}
  variant="glass"
  footer={
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Orders</span>
        <span className="font-medium">1,234</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Avg Order Value</span>
        <span className="font-medium">$101.64</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Conversion Rate</span>
        <span className="font-medium">3.24%</span>
      </div>
    </div>
  }
/>
```

## API Reference

### StatCard Props

| Prop          | Type                              | Default     | Description          |
| ------------- | --------------------------------- | ----------- | -------------------- |
| `title`       | `string`                          | -           | Card title           |
| `value`       | `string` \| `number`              | -           | Main statistic value |
| `icon`        | `LucideIcon`                      | -           | Optional icon        |
| `iconColor`   | `string`                          | -           | Icon color class     |
| `trend`       | `"up"` \| `"down"` \| `"neutral"` | -           | Trend direction      |
| `change`      | `string`                          | -           | Change value         |
| `description` | `string`                          | -           | Additional context   |
| `footer`      | `ReactNode`                       | -           | Footer content       |
| `variant`     | `StatCardVariant`                 | `"default"` | Visual style         |
| `size`        | `StatCardSize`                    | `"md"`      | Size preset          |
| `loading`     | `boolean`                         | `false`     | Loading state        |
| `onClick`     | `() => void`                      | -           | Click handler        |
| `className`   | `string`                          | -           | Additional classes   |

## Accessibility

- Semantic HTML structure
- ARIA labels for trends
- Keyboard navigation support
- Screen reader optimized
- Color-blind friendly indicators

## TypeScript

```typescript
import type { StatCardProps } from "saha-ui";
```

## Related Components

- Card
- Paper
- Badge
