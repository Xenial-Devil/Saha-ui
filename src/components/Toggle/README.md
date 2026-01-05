# Toggle

A flexible toggle button component that can be pressed and unpressed, similar to a checkbox but with button styling. Supports single toggles and toggle groups for multiple selections.

## Features

- 🎨 Multiple visual variants (default, outline, ghost)
- 📏 Three sizes (sm, default, lg)
- 🔄 Controlled and uncontrolled modes
- 👥 Toggle groups (single and multiple selection)
- 📐 Horizontal and vertical orientations
- ♿ Full accessibility support
- 🎭 `asChild` pattern for composition
- ⌨️ Keyboard navigation

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Toggle } from "saha-ui";

function MyComponent() {
  return (
    <Toggle>
      <Bold />
    </Toggle>
  );
}
```

## Uncontrolled Toggle

```tsx
<Toggle defaultPressed={false}>
  <Italic />
</Toggle>
```

## Controlled Toggle

```tsx
function ControlledToggle() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      <Underline />
    </Toggle>
  );
}
```

## Variants

### Default

```tsx
<Toggle variant="default">
  <Bold />
</Toggle>
```

### Outline

```tsx
<Toggle variant="outline">
  <Italic />
</Toggle>
```

### Ghost

```tsx
<Toggle variant="ghost">
  <Underline />
</Toggle>
```

## Sizes

```tsx
<Toggle size="sm">Small</Toggle>
<Toggle size="default">Default</Toggle>
<Toggle size="lg">Large</Toggle>
```

## With Text and Icon

```tsx
<Toggle>
  <Bold className="mr-2" />
  <span>Bold</span>
</Toggle>
```

## Disabled State

```tsx
<Toggle disabled>
  <Bold />
</Toggle>
```

## Toggle Group

Use `ToggleGroup` for related toggle buttons:

### Single Selection

Only one toggle can be active at a time:

```tsx
import { ToggleGroup, Toggle } from "saha-ui";

function TextAlignment() {
  const [alignment, setAlignment] = useState("left");

  return (
    <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
      <Toggle value="left">
        <AlignLeft />
      </Toggle>
      <Toggle value="center">
        <AlignCenter />
      </Toggle>
      <Toggle value="right">
        <AlignRight />
      </Toggle>
      <Toggle value="justify">
        <AlignJustify />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Multiple Selection

Multiple toggles can be active simultaneously:

```tsx
function TextFormatting() {
  const [formats, setFormats] = useState<string[]>([]);

  return (
    <ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
      <Toggle value="bold">
        <Bold />
      </Toggle>
      <Toggle value="italic">
        <Italic />
      </Toggle>
      <Toggle value="underline">
        <Underline />
      </Toggle>
      <Toggle value="strikethrough">
        <Strikethrough />
      </Toggle>
    </ToggleGroup>
  );
}
```

### Vertical Orientation

```tsx
<ToggleGroup type="single" orientation="vertical">
  <Toggle value="top">
    <ArrowUp />
  </Toggle>
  <Toggle value="bottom">
    <ArrowDown />
  </Toggle>
</ToggleGroup>
```

## API Reference

### Toggle Props

| Prop              | Type                                | Default     | Description                          |
| ----------------- | ----------------------------------- | ----------- | ------------------------------------ |
| `variant`         | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual style variant                 |
| `size`            | `'sm' \| 'default' \| 'lg'`         | `'default'` | Size of the toggle                   |
| `pressed`         | `boolean`                           | -           | Controlled pressed state             |
| `defaultPressed`  | `boolean`                           | `false`     | Default pressed state (uncontrolled) |
| `onPressedChange` | `(pressed: boolean) => void`        | -           | Callback when state changes          |
| `disabled`        | `boolean`                           | `false`     | Whether toggle is disabled           |
| `value`           | `string`                            | -           | Value for use in ToggleGroup         |
| `className`       | `string`                            | -           | Additional CSS classes               |
| `asChild`         | `boolean`                           | `false`     | Merge props with child element       |
| `children`        | `ReactNode`                         | -           | Toggle content                       |

### ToggleGroup Props (Single)

| Prop            | Type                                | Default        | Description                         |
| --------------- | ----------------------------------- | -------------- | ----------------------------------- |
| `type`          | `'single'`                          | -              | **Required.** Single selection mode |
| `value`         | `string`                            | -              | Controlled selected value           |
| `defaultValue`  | `string`                            | -              | Default value (uncontrolled)        |
| `onValueChange` | `(value: string) => void`           | -              | Callback when selection changes     |
| `variant`       | `'default' \| 'outline' \| 'ghost'` | `'default'`    | Variant for all toggles             |
| `size`          | `'sm' \| 'default' \| 'lg'`         | `'default'`    | Size for all toggles                |
| `disabled`      | `boolean`                           | `false`        | Disable all toggles                 |
| `orientation`   | `'horizontal' \| 'vertical'`        | `'horizontal'` | Group orientation                   |
| `className`     | `string`                            | -              | Additional CSS classes              |
| `children`      | `ReactNode`                         | -              | Toggle components                   |

### ToggleGroup Props (Multiple)

| Prop            | Type                                | Default      | Description                           |
| --------------- | ----------------------------------- | ------------ | ------------------------------------- |
| `type`          | `'multiple'`                        | -            | **Required.** Multiple selection mode |
| `value`         | `string[]`                          | -            | Controlled selected values            |
| `defaultValue`  | `string[]`                          | -            | Default values (uncontrolled)         |
| `onValueChange` | `(value: string[]) => void`         | -            | Callback when selection changes       |
| `variant`       | `'default' \| 'outline' \| 'ghost'` | `'default'`  | Variant for all toggles               |
| `size`          | `'sm' \| 'default' \| 'lg'`         | `'default'`  | Size for all toggles                  |
| `disabled`      | `boolean`                           | `false`      | Disable all toggles                   |
| `orientation`   | `'horizontal' \| 'vertical'`        | `'vertical'` | Group orientation                     |
| `className`     | `string`                            | -            | Additional CSS classes                |
| `children`      | `ReactNode`                         | -            | Toggle components                     |

## Common Patterns

### Text Editor Toolbar

```tsx
function EditorToolbar() {
  const [formats, setFormats] = useState<string[]>([]);
  const [alignment, setAlignment] = useState("left");

  return (
    <div className="flex gap-2">
      <ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
        <Toggle value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <div className="w-px h-6 bg-border" />

      <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
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
    </ToggleGroup>
  );
}
```

### Filter Toggles

```tsx
function FilterToggles() {
  const [filters, setFilters] = useState<string[]>(["active"]);

  return (
    <ToggleGroup
      type="multiple"
      value={filters}
      onValueChange={setFilters}
      variant="outline"
    >
      <Toggle value="active">Active</Toggle>
      <Toggle value="pending">Pending</Toggle>
      <Toggle value="archived">Archived</Toggle>
    </ToggleGroup>
  );
}
```

### Media Controls

```tsx
function MediaControls() {
  const [controls, setControls] = useState<string[]>([]);

  return (
    <ToggleGroup type="multiple" value={controls} onValueChange={setControls}>
      <Toggle value="mute" aria-label="Toggle mute">
        {controls.includes("mute") ? <VolumeX /> : <Volume2 />}
      </Toggle>
      <Toggle value="captions" aria-label="Toggle captions">
        <Subtitles />
      </Toggle>
      <Toggle value="fullscreen" aria-label="Toggle fullscreen">
        <Maximize />
      </Toggle>
    </ToggleGroup>
  );
}
```

## Styling

### Custom Styles

```tsx
<Toggle className="bg-blue-500 hover:bg-blue-600 data-[state=on]:bg-blue-700">
  Custom
</Toggle>
```

### Data Attributes

Toggle elements receive a `data-state` attribute:

```tsx
<Toggle className="data-[state=on]:bg-primary">Styled Based on State</Toggle>
```

## Accessibility

The Toggle component follows accessibility best practices:

- **ARIA Attributes:**

  - `role="button"` for toggle elements
  - `aria-pressed` indicates pressed state
  - `aria-label` for icon-only toggles

- **Keyboard Navigation:**

  - `Space` or `Enter` - Toggle pressed state
  - `Tab` - Move focus between toggles
  - Arrow keys navigate within ToggleGroup

- **Focus Management:**
  - Clear focus indicators
  - Disabled toggles are not focusable

### Accessible Examples

```tsx
// Icon-only toggle with label
<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>

// Toggle with visible label
<Toggle>
  <Bold className="mr-2" />
  <span>Bold</span>
</Toggle>

// Toggle group with accessible labels
<ToggleGroup type="single" aria-label="Text alignment">
  <Toggle value="left" aria-label="Align left">
    <AlignLeft />
  </Toggle>
  <Toggle value="center" aria-label="Align center">
    <AlignCenter />
  </Toggle>
</ToggleGroup>
```

## Best Practices

1. **Use Icon Labels:** Always provide `aria-label` for icon-only toggles
2. **Group Related Toggles:** Use `ToggleGroup` for related options
3. **Choose Appropriate Type:** Use `single` for mutually exclusive options, `multiple` for independent options
4. **Visual Feedback:** Ensure clear visual distinction between pressed and unpressed states
5. **Consistent Sizing:** Use the same size for toggles in a group
6. **Meaningful Icons:** Choose clear, recognizable icons
7. **Disabled State:** Clearly indicate disabled toggles

## When to Use

**Use Toggle when:**

- You need a button-like checkbox
- Building toolbars or formatting controls
- Creating view mode selectors
- Implementing filters with on/off states

**Use alternatives when:**

- You need a simple on/off control → Use `Switch`
- You need radio button behavior → Use `RadioGroup`
- You need checkbox behavior → Use `Checkbox`

## Related Components

- **Switch** - For on/off binary state
- **Checkbox** - For selection in forms
- **RadioGroup** - For single selection from options
- **Button** - For actions without toggle state

## Changelog

- **v1.0.0** - Initial release with Toggle and ToggleGroup
