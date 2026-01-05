# ToggleGroup

A group of toggle buttons that allows users to select one or multiple options. Perfect for filters, view modes, text formatting, and other multi-choice selections.

## Features

- 🎯 Single and multiple selection modes
- 🎨 Multiple variants (default, primary, secondary, outline, ghost)
- 📏 Three sizes (sm, default, lg)
- 🔄 Horizontal and vertical orientations
- ♿ Full accessibility support with ARIA attributes
- ⌨️ Complete keyboard navigation
- 🎭 Controlled and uncontrolled modes
- 🔒 Disabled state support

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { ToggleGroup, Toggle } from "saha-ui";

function MyComponent() {
  const [value, setValue] = useState("left");

  return (
    <ToggleGroup type="single" value={value} onValueChange={setValue}>
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="right">Right</Toggle>
    </ToggleGroup>
  );
}
```

## Selection Types

### Single Selection

Only one option can be selected at a time:

```tsx
function TextAlignment() {
  const [align, setAlign] = useState("left");

  return (
    <ToggleGroup type="single" value={align} onValueChange={setAlign}>
      <Toggle value="left">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle value="center">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle value="right">
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle value="justify">
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Multiple Selection

Multiple options can be selected simultaneously:

```tsx
function TextFormatting() {
  const [formats, setFormats] = useState<string[]>([]);

  return (
    <ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
      <Toggle value="bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle value="italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle value="underline">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle value="strikethrough">
        <Strikethrough className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
}
```

## Variants

### Default

```tsx
<ToggleGroup type="single" variant="default">
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

### Primary

```tsx
<ToggleGroup type="single" variant="primary">
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

### Secondary

```tsx
<ToggleGroup type="single" variant="secondary">
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

### Outline

```tsx
<ToggleGroup type="single" variant="outline">
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

### Ghost

```tsx
<ToggleGroup type="single" variant="ghost">
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

## Sizes

```tsx
{
  /* Small */
}
<ToggleGroup type="single" size="sm">
  <Toggle value="1">Small</Toggle>
  <Toggle value="2">Small</Toggle>
</ToggleGroup>;

{
  /* Default */
}
<ToggleGroup type="single" size="default">
  <Toggle value="1">Default</Toggle>
  <Toggle value="2">Default</Toggle>
</ToggleGroup>;

{
  /* Large */
}
<ToggleGroup type="single" size="lg">
  <Toggle value="1">Large</Toggle>
  <Toggle value="2">Large</Toggle>
</ToggleGroup>;
```

## Orientations

### Horizontal (Default)

```tsx
<ToggleGroup type="single" orientation="horizontal">
  <Toggle value="1">One</Toggle>
  <Toggle value="2">Two</Toggle>
  <Toggle value="3">Three</Toggle>
</ToggleGroup>
```

### Vertical

```tsx
<ToggleGroup type="single" orientation="vertical">
  <Toggle value="1">One</Toggle>
  <Toggle value="2">Two</Toggle>
  <Toggle value="3">Three</Toggle>
</ToggleGroup>
```

## Uncontrolled Mode

```tsx
<ToggleGroup type="single" defaultValue="grid">
  <Toggle value="grid">
    <Grid className="h-4 w-4" />
  </Toggle>
  <Toggle value="list">
    <List className="h-4 w-4" />
  </Toggle>
</ToggleGroup>
```

## Disabled State

### Disable Entire Group

```tsx
<ToggleGroup type="single" disabled>
  <Toggle value="1">Option 1</Toggle>
  <Toggle value="2">Option 2</Toggle>
  <Toggle value="3">Option 3</Toggle>
</ToggleGroup>
```

### Disable Individual Toggles

```tsx
<ToggleGroup type="single">
  <Toggle value="1">Enabled</Toggle>
  <Toggle value="2" disabled>
    Disabled
  </Toggle>
  <Toggle value="3">Enabled</Toggle>
</ToggleGroup>
```

## API Reference

### ToggleGroup Props (Single)

| Prop            | Type                                                            | Default        | Description                  |
| --------------- | --------------------------------------------------------------- | -------------- | ---------------------------- |
| `type`          | `'single'`                                                      | -              | **Required.** Selection type |
| `value`         | `string`                                                        | -              | Controlled selected value    |
| `defaultValue`  | `string`                                                        | -              | Default value (uncontrolled) |
| `onValueChange` | `(value: string) => void`                                       | -              | Callback when value changes  |
| `variant`       | `'default' \| 'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'default'`    | Visual style variant         |
| `size`          | `'sm' \| 'default' \| 'lg'`                                     | `'default'`    | Size of toggles              |
| `orientation`   | `'horizontal' \| 'vertical'`                                    | `'horizontal'` | Layout orientation           |
| `disabled`      | `boolean`                                                       | `false`        | Disable all toggles          |
| `className`     | `string`                                                        | -              | Additional CSS classes       |

### ToggleGroup Props (Multiple)

| Prop            | Type                                                            | Default        | Description                   |
| --------------- | --------------------------------------------------------------- | -------------- | ----------------------------- |
| `type`          | `'multiple'`                                                    | -              | **Required.** Selection type  |
| `value`         | `string[]`                                                      | -              | Controlled selected values    |
| `defaultValue`  | `string[]`                                                      | -              | Default values (uncontrolled) |
| `onValueChange` | `(value: string[]) => void`                                     | -              | Callback when values change   |
| `variant`       | `'default' \| 'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'default'`    | Visual style variant          |
| `size`          | `'sm' \| 'default' \| 'lg'`                                     | `'default'`    | Size of toggles               |
| `orientation`   | `'horizontal' \| 'vertical'`                                    | `'horizontal'` | Layout orientation            |
| `disabled`      | `boolean`                                                       | `false`        | Disable all toggles           |
| `className`     | `string`                                                        | -              | Additional CSS classes        |

### Toggle Props

| Prop              | Type                         | Default | Description                   |
| ----------------- | ---------------------------- | ------- | ----------------------------- |
| `value`           | `string`                     | -       | **Required.** Unique value    |
| `pressed`         | `boolean`                    | -       | Controlled pressed state      |
| `defaultPressed`  | `boolean`                    | `false` | Default pressed state         |
| `onPressedChange` | `(pressed: boolean) => void` | -       | Pressed state change callback |
| `disabled`        | `boolean`                    | `false` | Whether toggle is disabled    |
| `variant`         | `ToggleVariant`              | -       | Override group variant        |
| `size`            | `ToggleSize`                 | -       | Override group size           |
| `className`       | `string`                     | -       | Additional CSS classes        |
| `asChild`         | `boolean`                    | `false` | Merge props with child        |

## Common Patterns

### View Mode Selector

```tsx
function ViewModeSelector() {
  const [view, setView] = useState("grid");

  return (
    <ToggleGroup type="single" value={view} onValueChange={setView}>
      <Toggle value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
      </Toggle>
      <Toggle value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle value="table" aria-label="Table view">
        <Table className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Text Editor Toolbar

```tsx
function EditorToolbar() {
  const [formats, setFormats] = useState<string[]>([]);

  return (
    <div className="flex gap-2">
      <ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
        <Toggle value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <ToggleGroup type="single">
        <Toggle value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </div>
  );
}
```

### Filter Options

```tsx
function ProductFilters() {
  const [filters, setFilters] = useState<string[]>(["available"]);

  return (
    <ToggleGroup
      type="multiple"
      value={filters}
      onValueChange={setFilters}
      variant="outline"
    >
      <Toggle value="available">In Stock</Toggle>
      <Toggle value="sale">On Sale</Toggle>
      <Toggle value="new">New Arrivals</Toggle>
      <Toggle value="featured">Featured</Toggle>
    </ToggleGroup>
  );
}
```

### Sort Options

```tsx
function SortSelector() {
  const [sort, setSort] = useState("newest");

  return (
    <ToggleGroup type="single" value={sort} onValueChange={setSort}>
      <Toggle value="newest">Newest</Toggle>
      <Toggle value="popular">Most Popular</Toggle>
      <Toggle value="price-low">Price: Low to High</Toggle>
      <Toggle value="price-high">Price: High to Low</Toggle>
    </ToggleGroup>
  );
}
```

### Segmented Control

```tsx
function SegmentedControl() {
  const [period, setPeriod] = useState("week");

  return (
    <ToggleGroup
      type="single"
      value={period}
      onValueChange={setPeriod}
      variant="primary"
    >
      <Toggle value="day">Day</Toggle>
      <Toggle value="week">Week</Toggle>
      <Toggle value="month">Month</Toggle>
      <Toggle value="year">Year</Toggle>
    </ToggleGroup>
  );
}
```

## Accessibility

The ToggleGroup component follows WAI-ARIA guidelines:

- **Keyboard Navigation:**
  - `Tab` - Move focus into/out of group
  - `Arrow Keys` - Navigate between toggles
  - `Space` or `Enter` - Toggle selection
- **ARIA Attributes:**
  - `role="group"` for the container
  - `aria-pressed` indicates toggle state
  - `aria-label` for icon-only toggles
  - `aria-disabled` for disabled toggles
- **Focus Management:**
  - Clear focus indicators
  - Roving tabindex for keyboard navigation
  - Proper focus order

### Accessible Examples

```tsx
// Icon-only toggles need aria-label
<ToggleGroup type="single">
  <Toggle value="grid" aria-label="Grid view">
    <Grid className="h-4 w-4" />
  </Toggle>
  <Toggle value="list" aria-label="List view">
    <List className="h-4 w-4" />
  </Toggle>
</ToggleGroup>

// Group should have descriptive label
<div>
  <label id="view-label">View Mode</label>
  <ToggleGroup type="single" aria-labelledby="view-label">
    <Toggle value="grid">Grid</Toggle>
    <Toggle value="list">List</Toggle>
  </ToggleGroup>
</div>
```

## Best Practices

1. **Always Provide Value:** Each toggle must have a unique `value` prop
2. **Use Icons Consistently:** Either all text or all icons, not mixed
3. **Limit Options:** Keep 2-5 options for best UX
4. **Clear Labels:** Use descriptive labels or aria-labels
5. **Single for Mutually Exclusive:** Use single type when only one option makes sense
6. **Multiple for Independent:** Use multiple type for independent options
7. **Visual Feedback:** Ensure selected state is clearly visible
8. **Responsive Design:** Consider vertical orientation on mobile

## Styling

### Custom Styles

```tsx
<ToggleGroup type="single" className="bg-gray-100 p-1 rounded-lg">
  <Toggle value="1" className="data-[state=on]:bg-white">
    Option 1
  </Toggle>
  <Toggle value="2" className="data-[state=on]:bg-white">
    Option 2
  </Toggle>
</ToggleGroup>
```

### With Badges

```tsx
<ToggleGroup type="single">
  <Toggle value="all">
    All
    <Badge className="ml-2" size="sm">
      123
    </Badge>
  </Toggle>
  <Toggle value="unread">
    Unread
    <Badge className="ml-2" size="sm">
      5
    </Badge>
  </Toggle>
</ToggleGroup>
```

## Related Components

- **Toggle** - Individual toggle button
- **Tabs** - For navigation between views
- **RadioGroup** - For single selection without toggle behavior
- **Checkbox** - For multiple independent selections
- **Button** - For standalone actions

## Changelog

- **v1.0.0** - Initial release with single/multiple modes and full accessibility
