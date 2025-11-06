# Chart Component - Shadcn Style Usage

The Chart component now supports **Shadcn's compositional approach** for building charts, while maintaining backward compatibility with the existing API.

## Installation

The chart component uses Recharts under the hood. Make sure you have it installed:

```bash
npm install recharts
```

## CSS Variables

Add the following chart color variables to your CSS file:

```css
@layer base {
  :root {
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
```

## Two Ways to Use Charts

### 1. Shadcn Compositional Approach (Recommended)

Build charts directly using Recharts components with our styled wrappers.

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
```

### 2. Legacy Approach (Backward Compatible)

Use the high-level Chart component with configuration object.

```tsx
import { Chart } from "saha-ui";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
];

export function MyChart() {
  return (
    <Chart
      type="bar"
      title="Monthly Users"
      description="Desktop vs Mobile users"
      config={{
        data,
        series: [
          { dataKey: "desktop", name: "Desktop", color: "hsl(var(--chart-1))" },
          { dataKey: "mobile", name: "Mobile", color: "hsl(var(--chart-2))" },
        ],
        xAxis: { dataKey: "month" },
        grid: { show: true, vertical: false },
        tooltip: { show: true },
        legend: { show: true, position: "bottom" },
      }}
    />
  );
}
```

## Components

### ChartContainer

The main wrapper that provides theming and styling context.

```tsx
<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
  {/* Your Recharts components */}
</ChartContainer>
```

**Props:**
- `config`: ChartConfig object with colors and labels
- `className`: Additional CSS classes

### ChartWrapper

Card-style wrapper for charts with header and footer.

```tsx
<ChartWrapper
  title="Total Revenue"
  description="Showing total revenue for the last 6 months"
  footer={<div>Updated 2 hours ago</div>}
>
  <ChartContainer config={chartConfig}>
    {/* Your chart */}
  </ChartContainer>
</ChartWrapper>
```

### ChartTooltipContent

Pre-styled tooltip component.

```tsx
<Tooltip
  content={
    <ChartTooltipContent
      indicator="dot" // or "line" or "dashed"
      hideLabel={false}
      hideIndicator={false}
      labelKey="month"
      nameKey="name"
    />
  }
/>
```

**Props:**
- `indicator`: "dot" | "line" | "dashed" - Visual indicator style
- `hideLabel`: Hide the tooltip label
- `hideIndicator`: Hide the color indicator
- `labelKey`: Custom key for label in config
- `nameKey`: Custom key for name in data
- `formatter`: Custom value formatter
- `labelFormatter`: Custom label formatter

### ChartLegendContent

Pre-styled legend component.

```tsx
<Legend
  content={
    <ChartLegendContent
      nameKey="name"
      verticalAlign="bottom"
    />
  }
/>
```

## Examples

### Line Chart

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "saha-ui";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const chartData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
```

### Area Chart

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Tooltip content={<ChartTooltipContent indicator="line" />} />
        <Legend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="desktop"
          fill="var(--color-desktop)"
          stroke="var(--color-desktop)"
          stackId="a"
        />
        <Area
          type="monotone"
          dataKey="mobile"
          fill="var(--color-mobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
```

### Pie Chart

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  safari: { label: "Safari", color: "hsl(var(--chart-2))" },
  firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
  edge: { label: "Edge", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function PieChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <PieChart>
        <Tooltip content={<ChartTooltipContent hideLabel />} />
        <Legend content={<ChartLegendContent nameKey="browser" />} />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="50%"
          outerRadius={80}
        />
      </PieChart>
    </ChartContainer>
  );
}
```

## Theming

### Using CSS Variables (Recommended)

```tsx
const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// In your chart
<Bar dataKey="sales" fill="var(--color-sales)" />
```

### Using Direct Colors

```tsx
const chartConfig = {
  sales: {
    label: "Sales",
    color: "#3b82f6",
  },
} satisfies ChartConfig;
```

### Dark Mode Support

```tsx
const chartConfig = {
  sales: {
    label: "Sales",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
} satisfies ChartConfig;
```

## Customization

### Custom Tooltip

```tsx
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  
  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <div className="font-medium">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

<Tooltip content={<CustomTooltip />} />
```

### Custom Legend

```tsx
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex gap-4 justify-center pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

<Legend content={<CustomLegend />} />
```

## Accessibility

Always include the `accessibilityLayer` prop on your chart components:

```tsx
<BarChart accessibilityLayer data={data}>
  {/* ... */}
</BarChart>
```

This adds:
- Keyboard navigation
- Screen reader support
- ARIA labels

## Best Practices

1. **Always set a minimum height** on ChartContainer:
   ```tsx
   <ChartContainer className="min-h-[300px]">
   ```

2. **Use CSS variables for colors** for better theming:
   ```tsx
   fill="var(--color-desktop)"
   ```

3. **Keep charts responsive**:
   ```tsx
   className="min-h-[300px] w-full"
   ```

4. **Add accessibility layers**:
   ```tsx
   <BarChart accessibilityLayer>
   ```

5. **Use meaningful labels** in chartConfig:
   ```tsx
   {
     desktop: {
       label: "Desktop Users",
       color: "hsl(var(--chart-1))"
     }
   }
   ```

## Migration from Legacy API

If you're using the old Chart component, you can gradually migrate:

**Before:**
```tsx
<Chart
  type="bar"
  config={{
    data: myData,
    series: [{ dataKey: "value", name: "Sales" }],
  }}
/>
```

**After:**
```tsx
<ChartContainer config={chartConfig}>
  <BarChart data={myData}>
    <Bar dataKey="value" fill="var(--color-value)" />
  </BarChart>
</ChartContainer>
```

The old API still works for backward compatibility, but the new approach gives you more control and flexibility.