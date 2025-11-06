# Chart Component - Quick Reference

## 🚀 Quick Start

### Import Components
```tsx
import {
  ChartContainer,
  ChartWrapper,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "saha-ui";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
```

## 📊 Basic Usage

### Simple Chart
```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
  <BarChart data={data} accessibilityLayer>
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>
```

### With Card Wrapper
```tsx
<ChartWrapper title="Chart Title" description="Description">
  <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
    {/* Your chart */}
  </ChartContainer>
</ChartWrapper>
```

## 🎨 Chart Config

```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",              // Legend/tooltip label
    color: "hsl(var(--chart-1))",  // CSS variable (recommended)
    // OR
    color: "#3b82f6",              // Direct hex color
    // OR
    theme: {                       // Light/dark mode colors
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
} satisfies ChartConfig;
```

## 🎯 Color Variables

### In Chart Config
```tsx
color: "hsl(var(--chart-1))"
```

### In Chart Components
```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
<Line dataKey="mobile" stroke="var(--color-mobile)" />
```

### Available Colors
- `--chart-1` - Purple
- `--chart-2` - Green
- `--chart-3` - Blue
- `--chart-4` - Pink
- `--chart-5` - Teal

## 📦 Components

### ChartContainer
```tsx
<ChartContainer 
  config={chartConfig}
  className="min-h-[300px] w-full"
>
  {/* Recharts components */}
</ChartContainer>
```

### ChartWrapper
```tsx
<ChartWrapper
  title="Chart Title"
  description="Description text"
  footer={<div>Footer content</div>}
  className="custom-class"
>
  {/* Chart content */}
</ChartWrapper>
```

### ChartTooltipContent
```tsx
<Tooltip 
  content={
    <ChartTooltipContent 
      indicator="dot"           // "dot" | "line" | "dashed"
      hideLabel={false}
      hideIndicator={false}
      labelKey="custom"
      nameKey="custom"
      formatter={(value) => `$${value}`}
      labelFormatter={(label) => label.toUpperCase()}
    />
  }
/>
```

### ChartLegendContent
```tsx
<Legend 
  content={
    <ChartLegendContent 
      nameKey="browser"
      verticalAlign="bottom"   // "top" | "bottom"
    />
  }
/>
```

## 📈 Chart Types

### Bar Chart
```tsx
<BarChart data={data} accessibilityLayer>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="month" tickLine={false} axisLine={false} />
  <Tooltip content={<ChartTooltipContent indicator="line" />} />
  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
</BarChart>
```

### Line Chart
```tsx
<LineChart data={data} accessibilityLayer>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="month" tickLine={false} axisLine={false} />
  <Tooltip content={<ChartTooltipContent indicator="dot" />} />
  <Line 
    dataKey="value" 
    stroke="var(--color-value)" 
    strokeWidth={2}
    dot={{ r: 4 }}
  />
</LineChart>
```

### Area Chart
```tsx
<AreaChart data={data} accessibilityLayer>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="month" tickLine={false} axisLine={false} />
  <Tooltip content={<ChartTooltipContent />} />
  <Area 
    dataKey="value" 
    fill="var(--color-value)"
    stroke="var(--color-value)"
    fillOpacity={0.6}
  />
</AreaChart>
```

### Pie Chart
```tsx
<PieChart>
  <Tooltip content={<ChartTooltipContent hideLabel />} />
  <Legend content={<ChartLegendContent nameKey="browser" />} />
  <Pie 
    data={data} 
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
  />
</PieChart>
```

### Donut Chart
```tsx
<PieChart>
  <Pie 
    data={data}
    dataKey="value"
    innerRadius={60}    // Makes it a donut
    outerRadius={100}
  />
</PieChart>
```

## 🎛️ Common Props

### CartesianGrid
```tsx
<CartesianGrid 
  strokeDasharray="3 3"
  vertical={false}
  horizontal={true}
/>
```

### XAxis / YAxis
```tsx
<XAxis 
  dataKey="month"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
  tickFormatter={(value) => value.slice(0, 3)}
/>
```

### Tooltip
```tsx
<Tooltip 
  content={<ChartTooltipContent />}
  cursor={{ strokeDasharray: "3 3" }}  // For line/area
  cursor={false}                        // For bar
/>
```

## 🔧 Customization

### Responsive Height
```tsx
className="min-h-[200px]"  // Small
className="min-h-[300px]"  // Medium (default)
className="min-h-[400px]"  // Large
className="min-h-[500px]"  // Extra large
```

### Custom Tooltip
```tsx
const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;
  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      {/* Custom content */}
    </div>
  );
};

<Tooltip content={<CustomTooltip />} />
```

## 🌓 Dark Mode

Automatic with CSS variables:
```tsx
color: "hsl(var(--chart-1))"
```

Or specify both:
```tsx
theme: {
  light: "#3b82f6",
  dark: "#60a5fa",
}
```

## ♿ Accessibility

Always add:
```tsx
<BarChart accessibilityLayer>
```

Provides:
- Keyboard navigation
- Screen reader support
- ARIA labels

## 📋 Checklist

- [ ] Set minimum height: `min-h-[300px]`
- [ ] Use CSS variables: `var(--color-key)`
- [ ] Add accessibility: `accessibilityLayer`
- [ ] Make responsive: `w-full`
- [ ] Add tooltip: `<ChartTooltipContent />`
- [ ] Consider legend: `<ChartLegendContent />`

## 🔄 Legacy API (Still Works)

```tsx
import { Chart } from "saha-ui";

<Chart
  type="bar"
  title="Chart Title"
  description="Description"
  config={{
    data: myData,
    series: [
      { dataKey: "value", name: "Value", color: "#3b82f6" }
    ],
    xAxis: { dataKey: "month" },
    grid: { show: true, vertical: false },
    tooltip: { show: true },
    legend: { show: true, position: "bottom" },
  }}
/>
```

## 📚 Resources

- **Full Guide**: `docs/chart-shadcn-usage.md`
- **Update Notes**: `docs/CHART_UPDATE.md`
- **Examples**: `examples/ChartExamples.tsx`

## 💡 Tips

1. Always use `satisfies ChartConfig` for type safety
2. Prefer CSS variables over direct colors
3. Keep tooltips simple
4. Use `ChartWrapper` for cards
5. Test dark mode appearance
6. Add accessibility layer
7. Make charts responsive

## 🐛 Common Issues

### Chart not showing?
- Add minimum height: `min-h-[300px]`
- Check data format
- Verify Recharts installed

### Colors not working?
- Use `var(--color-key)` format
- Match keys in config and data
- Check CSS variables exist

### TypeScript errors?
- Use `satisfies ChartConfig`
- Import types correctly
- Add `any` for complex props

## 🎯 Examples

See `examples/ChartExamples.tsx` for 8 complete working examples including:
- Bar charts (single & stacked)
- Line charts
- Area charts
- Pie charts
- Donut charts
- Mixed chart types