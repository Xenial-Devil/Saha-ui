# Button

A versatile button component with multiple variants, sizes, and states. Supports loading states, icon buttons, and the asChild pattern for composition.

## Installation

```tsx
import { Button } from '@saha-ui/components';
```

## Usage

### Basic Button

```tsx
<Button>Click me</Button>
```

### Variants

The Button component supports multiple visual variants:

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="glass">Glass</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">
  <IconComponent />
</Button>
```

### Loading State

Show a loading spinner and disable the button:

```tsx
<Button loading>Saving...</Button>
<Button loading variant="primary">Processing</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled</Button>
```

### With Icons

```tsx
import { PlusIcon, TrashIcon } from 'lucide-react';

<Button>
  <PlusIcon className="w-4 h-4 mr-2" />
  Add Item
</Button>

<Button size="icon" aria-label="Delete">
  <TrashIcon className="w-4 h-4" />
</Button>
```

### AsChild Pattern

Use the `asChild` prop to render the button as a different element while maintaining button styles:

```tsx
<Button asChild>
  <a href="/home">Home</a>
</Button>

<Button asChild variant="primary">
  <Link to="/dashboard">Dashboard</Link>
</Button>
```

### Full Width Button

```tsx
<Button className="w-full">Full Width Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `"primary"` | Visual style variant of the button |
| `size` | `ButtonSize` | `"md"` | Size of the button |
| `loading` | `boolean` | `false` | Show loading spinner and disable button |
| `disabled` | `boolean` | `false` | Disable the button |
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `children` | `ReactNode` | - | Button content |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this button |
| `aria-describedby` | `string` | - | ID of element that describes this button |
| `aria-pressed` | `boolean \| "true" \| "false" \| "mixed"` | - | Indicates pressed state for toggle buttons |
| `aria-expanded` | `boolean \| "true" \| "false"` | - | Indicates if controlled element is expanded |
| `aria-controls` | `string` | - | ID of element controlled by this button |
| `aria-haspopup` | `boolean \| "menu" \| "dialog" \| ...` | - | Indicates button opens a popup |

### ButtonVariant

```typescript
type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "outline"
  | "ghost"
  | "glass";
```

### ButtonSize

```typescript
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";
```

## Accessibility

The Button component follows WAI-ARIA button pattern and includes:

- ✅ Proper button semantics
- ✅ Keyboard navigation (Enter and Space to activate)
- ✅ Focus visible states
- ✅ `aria-busy` when in loading state
- ✅ `aria-disabled` when disabled
- ✅ Support for all standard ARIA attributes

### Accessibility Examples

#### Icon-only Button

Always provide an `aria-label` for buttons with only icons:

```tsx
<Button size="icon" aria-label="Close dialog">
  <XIcon />
</Button>
```

#### Toggle Button

Use `aria-pressed` for toggle buttons:

```tsx
<Button aria-pressed={isActive} onClick={() => setIsActive(!isActive)}>
  {isActive ? 'Active' : 'Inactive'}
</Button>
```

#### Dropdown/Menu Button

Use `aria-expanded` and `aria-controls` for buttons that open menus:

```tsx
<Button
  aria-expanded={isOpen}
  aria-controls="menu-panel"
  aria-haspopup="menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Options
</Button>
<div id="menu-panel" hidden={!isOpen}>
  {/* Menu content */}
</div>
```

#### Button with Description

Use `aria-describedby` to provide additional context:

```tsx
<Button aria-describedby="delete-help" variant="error">
  Delete Account
</Button>
<span id="delete-help" className="text-sm text-muted">
  This action cannot be undone
</span>
```

## Features

### Visual Effects

- **Ripple Effect**: Touch/click ripple animation
- **Glow Effect**: Hover glow on colored variants
- **Shimmer Effect**: Subtle shimmer animation on certain variants
- **Smooth Transitions**: All state changes are animated

### States

- Default
- Hover (with glow effect)
- Active/Pressed (with ripple effect)
- Focus (with visible focus ring)
- Disabled (reduced opacity)
- Loading (spinner + disabled)

## Dark Mode

All button variants support dark mode automatically through the theme system:

```tsx
<ThemeProvider>
  <Button variant="primary">Primary Button</Button>
  {/* Automatically adapts to dark mode */}
</ThemeProvider>
```

## Composition Examples

### Button Group

```tsx
<div className="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

### Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <Input name="email" type="email" />
  <Button type="submit" loading={isSubmitting}>
    Sign Up
  </Button>
</form>
```

### Confirmation Button

```tsx
<Dialog>
  <DialogContent>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
    <DialogFooter>
      <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      <Button variant="error" onClick={onConfirm}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Loading Button with State

```tsx
function SaveButton() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onClick={handleSave}>
      Save Changes
    </Button>
  );
}
```

## Styling

### Custom Styling

You can add custom classes or override styles:

```tsx
<Button className="shadow-lg hover:shadow-xl">
  Custom Styled
</Button>
```

### Size Customization

```tsx
<Button className="px-8 py-4 text-lg">
  Extra Large Custom
</Button>
```

## Best Practices

1. **Use Semantic Variants**: Choose variants that match the action's meaning
   - `primary` for main actions
   - `error` for destructive actions
   - `success` for positive confirmations
   - `ghost` for subtle actions

2. **Provide Accessible Labels**: Always use `aria-label` for icon-only buttons

3. **Show Loading States**: Use the `loading` prop for async actions

4. **Use Appropriate Sizes**: Match button size to its importance and context

5. **Consider Button Groups**: Use ButtonGroup component for related actions

6. **Keyboard Navigation**: Ensure buttons are keyboard accessible (built-in)

## Related Components

- [ButtonGroup](../ButtonGroup/README.md) - Group related buttons
- [IconButton](../IconButton/README.md) - Dedicated icon button component
- [Link](../Link/README.md) - For navigation links
- [FloatingActionButton](../FloatingActionButton/README.md) - FAB for primary actions

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

The Button component is optimized for performance:
- Uses CSS transforms for animations (GPU-accelerated)
- Minimal re-renders
- Tree-shakeable exports
- No runtime dependencies beyond React

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { ButtonProps, ButtonVariant, ButtonSize } from '@saha-ui/components';
```

## Migration Guide

### From HTML Button

```tsx
// Before
<button className="btn btn-primary" disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>

// After
<Button variant="primary" loading={loading}>
  Submit
</Button>
```

### From Other Libraries

```tsx
// From Material-UI
<MuiButton variant="contained" color="primary">Click</MuiButton>
// To Saha UI
<Button variant="primary">Click</Button>

// From Chakra UI
<ChakraButton color
Scheme="blue" size="lg">Click</ChakraButton>
// To Saha UI
<Button variant="primary" size="lg">Click</Button>
```

## Troubleshooting

### Button not clickable

- Check if `disabled` or `loading` props are set
- Verify no parent element is preventing clicks
- Check z-index if button is behind other elements

### Styles not applying

- Ensure ThemeProvider wraps your app
- Check if className is overriding styles
- Verify Tailwind CSS is configured correctly

### Loading spinner not showing

- Confirm `loading` prop is `true`
- Check if custom children override the spinner
- Verify the button has
 sufficient width

## Examples Repository

For more examples, check the [examples directory](../../../examples/ButtonExamples.tsx).

---

**Version**: 1.16.0  
**Last Updated**: 2024  
**Component Type**: Interactive  
**Status**: ✅ Production Ready