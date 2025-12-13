# Segmented

A segmented control component for selecting a single option from a group of mutually exclusive choices. Provides a modern alternative to radio buttons.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 🔘 Radio button alternative
- 🏷️ Icon support
- ♿ Fully accessible
- ⌨️ Keyboard navigation
- 🎯 Auto-fit options
- 🌈 Smooth transitions

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Segmented } from "saha-ui";

function App() {
  const [value, setValue] = useState("list");

  return (
    <Segmented
      value={value}
      onChange={setValue}
      options={[
        { label: "List", value: "list" },
        { label: "Grid", value: "grid" },
        { label: "Table", value: "table" },
      ]}
    />
  );
}
```

## Variants

```tsx
<Segmented variant="default" options={options} />
<Segmented variant="primary" options={options} />
<Segmented variant="secondary" options={options} />
<Segmented variant="destructive" options={options} />
<Segmented variant="outline" options={options} />
<Segmented variant="ghost" options={options} />
<Segmented variant="gradient" options={options} />
<Segmented variant="glass" options={options} />
<Segmented variant="neon" options={options} />
<Segmented variant="minimal" options={options} />
<Segmented variant="soft" options={options} />
<Segmented variant="premium" options={options} />
<Segmented variant="brutal" options={options} />
<Segmented variant="retro" options={options} />
```

## Sizes

```tsx
<Segmented size="xs" options={options} />
<Segmented size="sm" options={options} />
<Segmented size="md" options={options} />
<Segmented size="lg" options={options} />
<Segmented size="xl" options={options} />
<Segmented size="2xl" options={options} />
<Segmented size="3xl" options={options} />
<Segmented size="4xl" options={options} />
```

## With Icons

```tsx
import { List, Grid, Table } from "lucide-react";

<Segmented
  options={[
    { label: "List", value: "list", icon: List },
    { label: "Grid", value: "grid", icon: Grid },
    { label: "Table", value: "table", icon: Table },
  ]}
/>;
```

## Icon Only

```tsx
<Segmented
  options={[
    { value: "list", icon: List },
    { value: "grid", icon: Grid },
    { value: "table", icon: Table },
  ]}
/>
```

## Disabled Options

```tsx
<Segmented
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2", disabled: true },
    { label: "Option 3", value: "3" },
  ]}
/>
```

## Common Patterns

### View Switcher

```tsx
const [view, setView] = useState("list");

<Segmented
  variant="soft"
  value={view}
  onChange={setView}
  options={[
    { label: "List View", value: "list", icon: List },
    { label: "Grid View", value: "grid", icon: Grid },
    { label: "Calendar", value: "calendar", icon: Calendar },
  ]}
/>;

{
  view === "list" && <ListView />;
}
{
  view === "grid" && <GridView />;
}
{
  view === "calendar" && <CalendarView />;
}
```

### Time Period Selector

```tsx
<Segmented
  variant="primary"
  size="sm"
  options={[
    { label: "24H", value: "24h" },
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "1Y", value: "1y" },
    { label: "All", value: "all" },
  ]}
/>
```

### Chart Type Selector

```tsx
<Segmented
  variant="gradient"
  options={[
    { label: "Line", value: "line", icon: TrendingUp },
    { label: "Bar", value: "bar", icon: BarChart },
    { label: "Pie", value: "pie", icon: PieChart },
    { label: "Area", value: "area", icon: Activity },
  ]}
/>
```

## API Reference

### Segmented Props

| Prop           | Type                      | Default     | Description                  |
| -------------- | ------------------------- | ----------- | ---------------------------- |
| `value`        | `string`                  | -           | Selected value (controlled)  |
| `defaultValue` | `string`                  | -           | Initial value (uncontrolled) |
| `onChange`     | `(value: string) => void` | -           | Change handler               |
| `options`      | `SegmentedOption[]`       | -           | List of options              |
| `variant`      | `SegmentedVariant`        | `"default"` | Visual style                 |
| `size`         | `SegmentedSize`           | `"md"`      | Size preset                  |
| `disabled`     | `boolean`                 | `false`     | Disable all options          |
| `className`    | `string`                  | -           | Additional classes           |

### SegmentedOption

| Prop        | Type         | Default | Description    |
| ----------- | ------------ | ------- | -------------- |
| `label`     | `ReactNode`  | -       | Option label   |
| `value`     | `string`     | -       | Option value   |
| `icon`      | `LucideIcon` | -       | Optional icon  |
| `disabled`  | `boolean`    | `false` | Disable option |
| `className` | `string`     | -       | Option classes |

## Accessibility

- Uses radio button semantics with ARIA
- Keyboard navigation with arrow keys
- Focus management
- Screen reader announcements
- Disabled state support

## TypeScript

```typescript
import type { SegmentedProps, SegmentedOption } from "saha-ui";
```

## Related Components

- RadioGroup
- Tabs
- ButtonGroup
