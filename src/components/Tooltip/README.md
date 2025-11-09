# Tooltip

A flexible and accessible tooltip component for displaying contextual information on hover, focus, or click. Supports multiple positions, variants, and interactive content.

## Features

- 🎯 Four positioning options (top, bottom, left, right)
- 🎨 Nine visual variants (default, dark, light, glass, primary, success, warning, error, info)
- 📏 Three sizes (sm, md, lg)
- ⚡ Multiple trigger types (hover, click, focus, manual)
- ➡️ Optional arrow pointer
- 🖱️ Interactive tooltip content support
- ⏱️ Configurable delay
- ♿ Full accessibility support
- 🎭 Composable with TooltipTrigger and TooltipContent

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from '@saha-ui/core';

function MyComponent() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button>Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        This is a tooltip
      </TooltipContent>
    </Tooltip>
  );
}
```

## Positions

### Top (Default)

```tsx
<Tooltip position="top">
  <TooltipTrigger>
    <button>Hover</button>
  </TooltipTrigger>
  <TooltipContent>Top tooltip</TooltipContent>
</Tooltip>
```

### Bottom

```tsx
<Tooltip position="bottom">
  <TooltipTrigger>
    <button>Hover</button>
  </TooltipTrigger>
  <TooltipContent>Bottom tooltip</TooltipContent>
</Tooltip>
```

### Left

```tsx
<Tooltip position="left">
  <TooltipTrigger>
    <button>Hover</button>
  </TooltipTrigger>
  <TooltipContent>Left tooltip</TooltipContent>
</Tooltip>
```

### Right

```tsx
<Tooltip position="right">
  <TooltipTrigger>
    <button>Hover</button>
  </TooltipTrigger>
  <TooltipContent>Right tooltip</TooltipContent>
</Tooltip>
```

## Variants

### Default

```tsx
<Tooltip variant="default">
  <TooltipTrigger><button>Default</button></TooltipTrigger>
  <TooltipContent>Default variant</TooltipContent>
</Tooltip>
```

### Dark

```tsx
<Tooltip variant="dark">
  <TooltipTrigger><button>Dark</button></TooltipTrigger>
  <TooltipContent>Dark variant</TooltipContent>
</Tooltip>
```

### Light

```tsx
<Tooltip variant="light">
  <TooltipTrigger><button>Light</button></TooltipTrigger>
  <TooltipContent>Light variant</TooltipContent>
</Tooltip>
```

### Glass

```tsx
<Tooltip variant="glass">
  <TooltipTrigger><button>Glass</button></TooltipTrigger>
  <TooltipContent>Glass effect tooltip</TooltipContent>
</Tooltip>
```

### Colored Variants

```tsx
<Tooltip variant="primary">
  <TooltipTrigger><button>Primary</button></TooltipTrigger>
  <TooltipContent>Primary color</TooltipContent>
</Tooltip>

<Tooltip variant="success">
  <TooltipTrigger><button>Success</button></TooltipTrigger>
  <TooltipContent>Success message</TooltipContent>
</Tooltip>

<Tooltip variant="warning">
  <TooltipTrigger><button>Warning</button></TooltipTrigger>
  <TooltipContent>Warning message</TooltipContent>
</Tooltip>

<Tooltip variant="error">
  <TooltipTrigger><button>Error</button></TooltipTrigger>
  <TooltipContent>Error message</TooltipContent>
</Tooltip>
```

## Sizes

```tsx
<Tooltip size="sm">
  <TooltipTrigger><button>Small</button></TooltipTrigger>
  <TooltipContent>Small tooltip</TooltipContent>
</Tooltip>

<Tooltip size="md">
  <TooltipTrigger><button>Medium</button></TooltipTrigger>
  <TooltipContent>Medium tooltip</TooltipContent>
</Tooltip>

<Tooltip size="lg">
  <TooltipTrigger><button>Large</button></TooltipTrigger>
  <TooltipContent>Large tooltip</TooltipContent>
</Tooltip>
```

## Trigger Types

### Hover (Default)

```tsx
<Tooltip trigger="hover">
  <TooltipTrigger><button>Hover me</button></TooltipTrigger>
  <TooltipContent>Shows on hover</TooltipContent>
</Tooltip>
```

### Click

```tsx
<Tooltip trigger="click">
  <TooltipTrigger><button>Click me</button></TooltipTrigger>
  <TooltipContent>Shows on click</TooltipContent>
</Tooltip>
```

### Focus

```tsx
<Tooltip trigger="focus">
  <TooltipTrigger><input placeholder="Focus me" /></TooltipTrigger>
  <TooltipContent>Shows on focus</TooltipContent>
</Tooltip>
```

### Manual (Controlled)

```tsx
function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip trigger="manual" open={open} onOpenChange={setOpen}>
      <TooltipTrigger>
        <button onClick={() => setOpen(!open)}>Toggle</button>
      </TooltipTrigger>
      <TooltipContent>Controlled tooltip</TooltipContent>
    </Tooltip>
  );
}
```

## With Delay

```tsx
<Tooltip delay={500}>
  <TooltipTrigger><button>Hover</button></TooltipTrigger>
  <TooltipContent>Shows after 500ms delay</TooltipContent>
</Tooltip>
```

## Without Arrow

```tsx
<Tooltip arrow={false}>
  <TooltipTrigger><button>Hover</button></TooltipTrigger>
  <TooltipContent>No arrow pointer</TooltipContent>
</Tooltip>
```

## Interactive Tooltip

Allow users to interact with tooltip content:

```tsx
<Tooltip interactive>
  <TooltipTrigger><button>Hover</button></TooltipTrigger>
  <TooltipContent>
    <div>
      <p>Interactive content</p>
      <button onClick={() => console.log('Clicked')}>
        Click me
      </button>
    </div>
  </TooltipContent>
</Tooltip>
```

## Custom Max Width

```tsx
<Tooltip maxWidth="400px">
  <TooltipTrigger><button>Hover</button></TooltipTrigger>
  <TooltipContent>
    This is a very long tooltip content that needs more space to display
    properly without being cut off or wrapped awkwardly.
  </TooltipContent>
</Tooltip>
```

## Disabled Tooltip

```tsx
<Tooltip disabled>
  <TooltipTrigger><button>Hover</button></TooltipTrigger>
  <TooltipContent>This won't show</TooltipContent>
</Tooltip>
```

## API Reference

### Tooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger |
| `variant` | `'default' \| 'dark' \| 'light' \| 'glass' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the tooltip |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | How tooltip is triggered |
| `delay` | `number` | `200` | Delay before showing (ms) |
| `arrow` | `boolean` | `true` | Show arrow pointer |
| `interactive` | `boolean` | `false` | Allow interaction with content |
| `maxWidth` | `string` | `'320px'` | Maximum width |
| `offset` | `number` | `8` | Distance from trigger (px) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change callback |
| `children` | `ReactNode` | - | Trigger and Content components |

### TooltipTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Element that triggers tooltip |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

### TooltipContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Tooltip content |
| `className` | `string` | - | Additional CSS classes |

## Common Patterns

### Icon with Tooltip

```tsx
<Tooltip>
  <TooltipTrigger>
    <button className="p-2 rounded hover:bg-gray-100">
      <InfoIcon />
    </button>
  </TooltipTrigger>
  <TooltipContent>
    Additional information about this feature
  </TooltipContent>
</Tooltip>
```

### Form Field Helper

```tsx
<div className="flex items-center gap-2">
  <label htmlFor="username">Username</label>
  <Tooltip position="right">
    <TooltipTrigger>
      <HelpCircle className="w-4 h-4 text-gray-400" />
    </TooltipTrigger>
    <TooltipContent>
      Username must be 3-20 characters and alphanumeric
    </TooltipContent>
  </Tooltip>
</div>
```

### Disabled Button Explanation

```tsx
<Tooltip>
  <TooltipTrigger>
    <button disabled className="opacity-50 cursor-not-allowed">
      Submit
    </button>
  </TooltipTrigger>
  <TooltipContent>
    Please fill in all required fields to enable submission
  </TooltipContent>
</Tooltip>
```

### Rich Content Tooltip

```tsx
<Tooltip interactive maxWidth="300px">
  <TooltipTrigger>
    <Avatar src="/user.jpg" />
  </TooltipTrigger>
  <TooltipContent>
    <div className="space-y-2">
      <div className="font-semibold">John Doe</div>
      <div className="text-sm">Senior Developer</div>
      <div className="text-xs text-muted-foreground">
        john@example.com
      </div>
      <button className="text-sm text-primary">
        View Profile →
      </button>
    </div>
  </TooltipContent>
</Tooltip>
```

### Keyboard Shortcut

```tsx
<Tooltip>
  <TooltipTrigger>
    <button>Save</button>
  </TooltipTrigger>
  <TooltipContent>
    <div className="flex items-center gap-2">
      <span>Save document</span>
      <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">
        Ctrl+S
      </kbd>
    </div>
  </TooltipContent>
</Tooltip>
```

## Accessibility

The Tooltip component follows accessibility best practices:

- **ARIA Attributes:**
  - Uses `aria-describedby` to associate tooltip with trigger
  - Proper role attributes for screen readers
  
- **Keyboard Navigation:**
  - `Esc` key closes tooltip
  - Tooltips appear on focus for keyboard users
  - Tab key moves through interactive content
  
- **Screen Readers:**
  - Tooltip content is announced when trigger receives focus
  - Interactive tooltips maintain focus management

### Best Practices for Accessibility

```tsx
// Good: Essential information is always visible
<button>
  Save
  <Tooltip>
    <TooltipTrigger><InfoIcon /></TooltipTrigger>
    <TooltipContent>Ctrl+S to save</TooltipContent>
  </Tooltip>
</button>

// Bad: Critical information hidden in tooltip only
<Tooltip>
  <TooltipTrigger><button>?</button></TooltipTrigger>
  <TooltipContent>Required field</TooltipContent>
</Tooltip>
```

## Best Practices

1. **Keep Content Concise:** Tooltips should provide brief, helpful information
2. **Don't Hide Critical Info:** Don't rely on tooltips for essential information
3. **Appropriate Trigger:** Use hover for additional info, click for interactive content
4. **Position Wisely:** Choose positions that won't overflow viewport
5. **Consistent Styling:** Use consistent variants throughout your app
6. **Mobile Consideration:** Hover doesn't work on touch devices; consider alternatives
7. **Performance:** Avoid complex content in non-interactive tooltips

## Styling

### Custom Styles

```tsx
<Tooltip>
  <TooltipTrigger>
    <button>Hover</button>
  </TooltipTrigger>
  <TooltipContent className="bg-gradient-to-r from-purple-500 to-pink-500">
    Custom styled tooltip
  </TooltipContent>
</Tooltip>
```

## Related Components

- **Popover** - For more complex interactive content
- **HoverCard** - For rich preview content
- **ContextMenu** - For action menus
- **Dialog** - For modal interactions

## Changelog

- **v1.0.0** - Initial release with all features