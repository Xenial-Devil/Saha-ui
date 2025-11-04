# Chart Component - Complete Reference

## Overview

A comprehensive, beautiful, and optimized Chart component built with Canvas API. Supports multiple chart types, themes, animations, and offers both compact props-based and component API formats.

## Features

- ✅ **Multiple Chart Types**: Line, Bar, Area, Pie, Donut, Radar
- ✅ **11 Visual Variants**: Default, Primary, Secondary, Accent, Success, Warning, Error, Info, Outline, Ghost, Glass
- ✅ **4 Size Options**: sm, md, lg, xl
- ✅ **Advanced Features**: Smooth curves, glow effects, animations, tooltips, legends
- ✅ **Theme Integration**: Fully integrated with existing color system
- ✅ **TypeScript**: Complete type safety
- ✅ **Two API Formats**: Compact props-based and Component API
- ✅ **Responsive**: Automatically adapts to container width
- ✅ **Accessible**: Keyboard navigation and screen reader support

## Installation

```bash
npm install saha-ui
```

## Quick Start

### Compact Props-Based API (Recommended)

```tsx
import { Chart } from "saha-ui";

function MyChart() {
  const data = [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 190 },
    { label: "Mar", value: 150 },
    { label: "Apr", value: 220 },
  ];

  return (
    <Chart
      type="line"
      data={data}
      title="Monthly Sales"
      description="Sales performance over the last 4 months"
      variant="primary"
      size="md"
      smooth={true}
      glow={true}
    />
  );
}
```

### Component API Format

```tsx
import { Chart } from "saha-ui";

function MyDashboard() {
  return (
    <div className="space-y-4">
      <Chart.Title size="lg" align="center">
        Sales Dashboard
      </Chart.Title>

      <Chart type="line" data={data} variant="primary" smooth={true} />

      <Chart.Legend
        items={[
          { label: "Sales", color: "#3b82f6" },
          { label: "Target", color: "#10b981" },
        ]}
        position="bottom"
      />
    </div>
  );
}
```

## Chart Types

### Line Chart

```tsx
<Chart
  type="line"
  data={data}
  smooth={true} // Enable smooth curves
  glow={true} // Add glow effect
/>
```

### Bar Chart

```tsx
<Chart
  type="bar"
  data={data}
  showLabels={true} // Show value labels on bars
/>
```

### Area Chart

```tsx
<Chart type="area" data={data} smooth={true} glow={true} />
```

### Pie Chart

```tsx
<Chart type="pie" data={data} showLegend={true} legendPosition="right" />
```

### Donut Chart

```tsx
<Chart type="donut" data={data} showLegend={true} legendPosition="bottom" />
```

### Radar Chart

```tsx
<Chart
  type="radar"
  data={[
    { label: "Speed", value: 85 },
    { label: "Quality", value: 92 },
    { label: "Cost", value: 78 },
  ]}
  showGrid={true}
/>
```

## Variants

```tsx
// Default - clean and simple
<Chart variant="default" />

// Primary - blue gradient
<Chart variant="primary" />

// Secondary - purple gradient
<Chart variant="secondary" />

// Accent - pink gradient
<Chart variant="accent" />

// Success - green gradient
<Chart variant="success" />

// Warning - orange gradient
<Chart variant="warning" />

// Error - red gradient
<Chart variant="error" />

// Info - cyan gradient
<Chart variant="info" />

// Outline - transparent with border
<Chart variant="outline" />

// Ghost - minimal style
<Chart variant="ghost" />

// Glass - glassmorphism effect
<Chart variant="glass" />
```

## Sizes

```tsx
<Chart size="sm" />  // Small - 200px height
<Chart size="md" />  // Medium - 300px height (default)
<Chart size="lg" />  // Large - 400px height
<Chart size="xl" />  // Extra Large - 500px height
```

## Props Reference

### ChartProps

| Prop             | Type                                                       | Default     | Description                    |
| ---------------- | ---------------------------------------------------------- | ----------- | ------------------------------ |
| `type`           | `'line' \| 'bar' \| 'area' \| 'pie' \| 'donut' \| 'radar'` | `'line'`    | Chart type                     |
| `data`           | `ChartDataPoint[]`                                         | `[]`        | Chart data (simple format)     |
| `datasets`       | `ChartDataset[]`                                           | -           | Multi-series data              |
| `labels`         | `string[]`                                                 | -           | Labels for multi-series charts |
| `variant`        | `ChartVariant`                                             | `'default'` | Visual variant                 |
| `size`           | `'sm' \| 'md' \| 'lg' \| 'xl'`                             | `'md'`      | Chart size                     |
| `title`          | `string`                                                   | -           | Chart title                    |
| `description`    | `string`                                                   | -           | Chart description              |
| `showLegend`     | `boolean`                                                  | `true`      | Show legend                    |
| `legendPosition` | `'top' \| 'bottom' \| 'left' \| 'right'`                   | `'bottom'`  | Legend position                |
| `showGrid`       | `boolean`                                                  | `true`      | Show grid lines                |
| `showTooltip`    | `boolean`                                                  | `true`      | Show tooltips                  |
| `showAnimation`  | `boolean`                                                  | `true`      | Enable animations              |
| `smooth`         | `boolean`                                                  | `false`     | Smooth curves (line/area)      |
| `glow`           | `boolean`                                                  | `false`     | Add glow effect                |
| `stacked`        | `boolean`                                                  | `false`     | Stacked mode (bar/area)        |
| `showLabels`     | `boolean`                                                  | `false`     | Show data labels               |
| `colors`         | `string[]`                                                 | -           | Custom color palette           |
| `loading`        | `boolean`                                                  | `false`     | Loading state                  |
| `emptyMessage`   | `string`                                                   | `'No data'` | Empty state message            |

### ChartDataPoint

```typescript
interface ChartDataPoint {
  label: string;
  value: number;
  color?: string; // Optional color override
}
```

### ChartDataset

```typescript
interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
  fill?: boolean;
}
```

## Sub-Components

### Chart.Title

```tsx
<Chart.Title size="sm | md | lg | xl" align="left | center | right">
  My Chart Title
</Chart.Title>
```

### Chart.Legend

```tsx
<Chart.Legend
  items={[
    { label: "Series 1", color: "#3b82f6" },
    { label: "Series 2", color: "#10b981" },
  ]}
  position="top | bottom | left | right"
  size="sm | md | lg"
/>
```

### Chart.Tooltip

```tsx
<Chart.Tooltip visible={true} x={100} y={50} label="January" value={120} />
```

### Chart.Grid

```tsx
<Chart.Grid
  width={800}
  height={400}
  xLines={5}
  yLines={5}
  color="hsl(var(--border))"
  strokeWidth={1}
/>
```

## Advanced Examples

### Multi-Series Chart

```tsx
const multiSeriesData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 22000, 28000],
      color: "#3b82f6",
    },
    {
      label: "Expenses",
      data: [8000, 12000, 10000, 15000, 18000],
      color: "#ef4444",
    },
  ],
};

<Chart
  type="line"
  labels={multiSeriesData.labels}
  datasets={multiSeriesData.datasets}
  title="Revenue vs Expenses"
  variant="default"
  smooth={true}
  showLegend={true}
/>;
```

### Stacked Bar Chart

```tsx
<Chart
  type="bar"
  labels={labels}
  datasets={datasets}
  variant="secondary"
  stacked={true}
  showLegend={true}
/>
```

### Custom Colors

```tsx
<Chart
  type="pie"
  data={data}
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"]}
  showLegend={true}
/>
```

### With Custom Grid

```tsx
<div className="relative">
  <Chart.Grid
    width={800}
    height={300}
    xLines={6}
    yLines={5}
    color="hsl(var(--primary))"
  />
  <Chart
    type="area"
    data={data}
    variant="ghost"
    showGrid={false}
    smooth={true}
  />
</div>
```

## Theming

The Chart component fully integrates with your theme system using CSS custom properties:

```css
/* Your theme colors are automatically used */
--primary
--secondary
--accent
--success
--warning
--destructive
--info
--background
--foreground
--border
```

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus management
- Color contrast compliance

## Performance

- Canvas-based rendering for optimal performance
- Efficient animation system
- Automatic cleanup on unmount
- Responsive resize handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## TypeScript

Full TypeScript support with comprehensive type definitions:

```typescript
import { ChartProps, ChartDataPoint, ChartDataset } from "saha-ui";
```

## Examples

See the [ChartExamples.tsx](../examples/ChartExamples.tsx) file for comprehensive examples demonstrating all features and use cases.

## License

MIT
