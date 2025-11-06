# Chart Component Update - Shadcn Style

## Overview

The Chart component has been completely updated to follow **Shadcn UI's compositional approach** while maintaining full backward compatibility with the existing API. This update provides a more flexible, customizable, and modern charting solution.

## What Changed?

### 1. **New Compositional API (Shadcn Style)**

Build charts directly using Recharts components with our styled wrappers:

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
```

### 2. **Updated Components**

#### ChartContainer
- Now accepts a `ChartConfig` object for theming
- Automatically generates CSS variables for colors (e.g., `var(--color-desktop)`)
- Supports light/dark theme colors
- Minimal, clean styling matching Shadcn UI

#### ChartTooltipContent
- New customizable tooltip with indicator styles: `dot`, `line`, `dashed`
- Better typography and spacing
- Support for custom formatters
- Props: `indicator`, `hideLabel`, `hideIndicator`, `labelKey`, `nameKey`, `formatter`, `labelFormatter`

#### ChartLegendContent
- Simplified legend component
- Cleaner design matching Shadcn aesthetics
- Support for custom name keys

#### ChartWrapper
- New card-style wrapper for charts
- Includes header (title/description) and footer sections
- Perfect for dashboard layouts

#### ChartHeader
- Standalone header component for charts
- Supports custom title and description

### 3. **Updated Styling**

- Removed heavy gradients and shadows
- Cleaner, more minimal appearance
- Better integration with design system
- Improved dark mode support
- CSS classes for Recharts components customization

### 4. **Chart Color Variables**

Already available in your CSS:

```css
:root {
  --chart-1: oklch(0.60 0.18 275);  /* Purple */
  --chart-2: oklch(0.60 0.15 145);  /* Green */
  --chart-3: oklch(0.60 0.15 250);  /* Blue */
  --chart-4: oklch(0.65 0.25 340);  /* Pink */
  --chart-5: oklch(0.65 0.12 185);  /* Teal */
}

.dark {
  --chart-1: oklch(0.68 0.20 275);
  --chart-2: oklch(0.65 0.18 145);
  --chart-3: oklch(0.65 0.18 250);
  --chart-4: oklch(0.70 0.25 340);
  --chart-5: oklch(0.70 0.15 185);
}
```

## Quick Start

### Basic Bar Chart

```tsx
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "saha-ui";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
];

const config = {
  value: { label: "Value", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export function Example() {
  return (
    <ChartContainer config={config} className="min-h-[300px] w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
```

### With Card Wrapper

```tsx
import { ChartWrapper, ChartContainer } from "saha-ui";

export function Example() {
  return (
    <ChartWrapper
      title="Monthly Sales"
      description="Showing total sales for the last 6 months"
      footer={<div>Updated 2 hours ago</div>}
    >
      <ChartContainer config={config} className="min-h-[300px] w-full">
        {/* Your chart */}
      </ChartContainer>
    </ChartWrapper>
  );
}
```

## Backward Compatibility

The old API still works perfectly:

```tsx
import { Chart } from "saha-ui";

export function LegacyChart() {
  return (
    <Chart
      type="bar"
      title="Sales Chart"
      config={{
        data: myData,
        series: [{ dataKey: "sales", name: "Sales" }],
        xAxis: { dataKey: "month" },
        grid: { show: true },
      }}
    />
  );
}
```

## Key Features

### 1. Theming
- CSS variable support: `hsl(var(--chart-1))`
- Direct colors: `#3b82f6`
- Light/dark mode: `{ theme: { light: "#3b82f6", dark: "#60a5fa" } }`

### 2. Accessibility
- Use `accessibilityLayer` prop on chart components
- Keyboard navigation
- Screen reader support

### 3. Customization
- Full access to Recharts API
- Custom tooltips and legends
- Flexible styling with Tailwind classes

### 4. Responsive
- Works with all screen sizes
- Use `min-h-[XXXpx]` for responsive height

## New Exports

```tsx
// Core components
import {
  ChartContainer,
  ChartWrapper,
  ChartHeader,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";

// Legacy high-level component (still supported)
import { Chart } from "saha-ui";
```

## Migration Guide

### From Legacy to New API

**Before:**
```tsx
<Chart
  type="line"
  config={{
    data: lineData,
    series: [
      { dataKey: "value", name: "Value", color: "#6366f1" }
    ],
    xAxis: { dataKey: "month" },
  }}
/>
```

**After:**
```tsx
<ChartContainer config={{ value: { label: "Value", color: "#6366f1" } }}>
  <LineChart data={lineData} accessibilityLayer>
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <Line dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
  </LineChart>
</ChartContainer>
```

### Benefits of New API

1. **More Control**: Direct access to all Recharts props
2. **Better Performance**: No abstraction overhead
3. **Easier Customization**: Style with Tailwind or custom CSS
4. **Type Safety**: Better TypeScript support
5. **Modern Design**: Matches Shadcn UI aesthetic
6. **Future Proof**: Easy to upgrade when Recharts releases updates

## Examples

Check out the comprehensive examples in:
- `examples/ChartExamples.tsx` - All chart types with code
- `docs/chart-shadcn-usage.md` - Complete documentation

### Available Chart Types

All standard Recharts chart types are supported:

- **BarChart** - Vertical or horizontal bars
- **LineChart** - Line graphs with dots
- **AreaChart** - Filled area charts
- **PieChart** - Pie and donut charts
- **RadarChart** - Radar/spider charts
- **ScatterChart** - Scatter plots
- **ComposedChart** - Mix multiple chart types
- And more...

## Best Practices

1. **Always set minimum height**:
   ```tsx
   <ChartContainer className="min-h-[300px]">
   ```

2. **Use CSS variables for colors**:
   ```tsx
   fill="var(--color-desktop)"
   ```

3. **Add accessibility layer**:
   ```tsx
   <BarChart accessibilityLayer>
   ```

4. **Keep tooltips simple**:
   ```tsx
   <Tooltip content={<ChartTooltipContent />} />
   ```

5. **Use ChartWrapper for cards**:
   ```tsx
   <ChartWrapper title="..." description="...">
   ```

## Troubleshooting

### Chart not showing?
- Ensure you set a minimum height on `ChartContainer`
- Check that your data is in the correct format
- Verify Recharts is installed: `npm install recharts`

### Colors not applying?
- Use `var(--color-KEY)` format, not direct config colors
- Ensure keys in `chartConfig` match your data keys
- Check CSS variables are defined in your theme

### TypeScript errors?
- Use `satisfies ChartConfig` on your config object
- Import types: `import type { ChartConfig } from "saha-ui"`
- Add `any` type for complex Recharts props if needed

## Support

- Full documentation: `docs/chart-shadcn-usage.md`
- Examples: `examples/ChartExamples.tsx`
- Issues: File on GitHub repository

## Summary

This update brings modern, flexible charting to Saha UI while maintaining full backward compatibility. The new compositional API provides more control and better aligns with Shadcn UI's philosophy, while the legacy API continues to work for existing code.

Choose the approach that works best for your use case:
- **New API**: Maximum flexibility and control
- **Legacy API**: Quick setup with configuration object

Both approaches produce beautiful, accessible charts that work perfectly in light and dark modes.