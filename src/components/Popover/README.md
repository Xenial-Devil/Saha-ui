# Popover

A flexible popover component for displaying rich content in a floating panel positioned relative to a trigger element. Perfect for tooltips, menus, forms, and contextual information.

## Features

- 🎯 12 positioning options (top, bottom, left, right with start/end variants)
- 🎨 12 visual variants (default, primary, secondary, accent, success, warning, danger, info, glass, bordered, elevated, flat)
- 📏 Four sizes (sm, md, lg, xl)
- 🖱️ Multiple trigger types (click, hover, focus, manual)
- ➡️ Optional arrow pointer
- 🔒 Click outside to close
- ⌨️ Keyboard navigation (Escape to close)
- ♿ Full accessibility support
- 🎭 Portal rendering
- 🔄 Controlled and uncontrolled modes

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@saha-ui/core';

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p>This is the popover content</p>
      </PopoverContent>
    </Popover>
  );
}
```

## Positions

### Top Positions

```tsx
<Popover position="top">
  <PopoverTrigger><button>Top</button></PopoverTrigger>
  <PopoverContent>Centered on top</PopoverContent>
</Popover>

<Popover position="top-start">
  <PopoverTrigger><button>Top Start</button></PopoverTrigger>
  <PopoverContent>Aligned to start</PopoverContent>
</Popover>

<Popover position="top-end">
  <PopoverTrigger><button>Top End</button></PopoverTrigger>
  <PopoverContent>Aligned to end</PopoverContent>
</Popover>
```

### Bottom Positions

```tsx
<Popover position="bottom">
  <PopoverTrigger><button>Bottom</button></PopoverTrigger>
  <PopoverContent>Centered on bottom</PopoverContent>
</Popover>

<Popover position="bottom-start">
  <PopoverTrigger><button>Bottom Start</button></PopoverTrigger>
  <PopoverContent>Aligned to start</PopoverContent>
</Popover>

<Popover position="bottom-end">
  <PopoverTrigger><button>Bottom End</button></PopoverTrigger>
  <PopoverContent>Aligned to end</PopoverContent>
</Popover>
```

### Left & Right Positions

```tsx
<Popover position="left">
  <PopoverTrigger><button>Left</button></PopoverTrigger>
  <PopoverContent>To the left</PopoverContent>
</Popover>

<Popover position="right">
  <PopoverTrigger><button>Right</button></PopoverTrigger>
  <PopoverContent>To the right</PopoverContent>
</Popover>
```

## Variants

### Default

```tsx
<Popover variant="default">
  <PopoverTrigger><button>Default</button></PopoverTrigger>
  <PopoverContent>Default style popover</PopoverContent>
</Popover>
```

### Primary

```tsx
<Popover variant="primary">
  <PopoverTrigger><button>Primary</button></PopoverTrigger>
  <PopoverContent>Primary themed popover</PopoverContent>
</Popover>
```

### Glass

```tsx
<Popover variant="glass">
  <PopoverTrigger><button>Glass</button></PopoverTrigger>
  <PopoverContent>Glassmorphism effect</PopoverContent>
</Popover>
```

### Status Variants

```tsx
<Popover variant="success">
  <PopoverTrigger><button>Success</button></PopoverTrigger>
  <PopoverContent>Success message</PopoverContent>
</Popover>

<Popover variant="warning">
  <PopoverTrigger><button>Warning</button></PopoverTrigger>
  <PopoverContent>Warning message</PopoverContent>
</Popover>

<Popover variant="danger">
  <PopoverTrigger><button>Danger</button></PopoverTrigger>
  <PopoverContent>Danger message</PopoverContent>
</Popover>
```

## Sizes

```tsx
<Popover size="sm">
  <PopoverTrigger><button>Small</button></PopoverTrigger>
  <PopoverContent>Small popover</PopoverContent>
</Popover>

<Popover size="md">
  <PopoverTrigger><button>Medium</button></PopoverTrigger>
  <PopoverContent>Medium popover</PopoverContent>
</Popover>

<Popover size="lg">
  <PopoverTrigger><button>Large</button></PopoverTrigger>
  <PopoverContent>Large popover</PopoverContent>
</Popover>

<Popover size="xl">
  <PopoverTrigger><button>Extra Large</button></PopoverTrigger>
  <PopoverContent>Extra large popover</PopoverContent>
</Popover>
```

## Trigger Types

### Click (Default)

```tsx
<Popover trigger="click">
  <PopoverTrigger><button>Click me</button></PopoverTrigger>
  <PopoverContent>Opens on click</PopoverContent>
</Popover>
```

### Hover

```tsx
<Popover trigger="hover">
  <PopoverTrigger><button>Hover me</button></PopoverTrigger>
  <PopoverContent>Opens on hover</PopoverContent>
</Popover>
```

### Focus

```tsx
<Popover trigger="focus">
  <PopoverTrigger><input placeholder="Focus me" /></PopoverTrigger>
  <PopoverContent>Opens on focus</PopoverContent>
</Popover>
```

### Manual (Controlled)

```tsx
function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover trigger="manual" open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <button onClick={() => setOpen(!open)}>Toggle</button>
      </PopoverTrigger>
      <PopoverContent>Manually controlled</PopoverContent>
    </Popover>
  );
}
```

## With Arrow

```tsx
<Popover arrow>
  <PopoverTrigger><button>With Arrow</button></PopoverTrigger>
  <PopoverContent>This popover has an arrow pointer</PopoverContent>
</Popover>
```

## Without Arrow

```tsx
<Popover arrow={false}>
  <PopoverTrigger><button>No Arrow</button></PopoverTrigger>
  <PopoverContent>This popover has no arrow</PopoverContent>
</Popover>
```

## Rich Content

```tsx
<Popover size="lg">
  <PopoverTrigger asChild>
    <button>View Details</button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">User Profile</h3>
        <p className="text-sm text-muted-foreground">
          Detailed information about the user
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Avatar src="/user.jpg" size="md" />
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="primary">Follow</Button>
        <Button size="sm" variant="outline">Message</Button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## Form in Popover

```tsx
<Popover size="lg">
  <PopoverTrigger asChild>
    <button>Add Comment</button>
  </PopoverTrigger>
  <PopoverContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows={4}
          className="w-full"
          placeholder="Write your comment..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" variant="primary">Submit</Button>
      </div>
    </form>
  </PopoverContent>
</Popover>
```

## API Reference

### Popover Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'bottom'` | Position relative to trigger |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'glass' \| 'bordered' \| 'elevated' \| 'flat'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the popover |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | How popover is triggered |
| `arrow` | `boolean` | `true` | Show arrow pointer |
| `open` | `boolean` | - | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when state changes |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `offset` | `number` | `8` | Distance from trigger (px) |
| `delay` | `number` | `200` | Hover delay (ms) |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Trigger and Content components |

### PopoverTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Trigger element |
| `asChild` | `boolean` | `false` | Merge props with child element |
| `className` | `string` | - | Additional CSS classes |

### PopoverContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Popover content |
| `className` | `string` | - | Additional CSS classes |

## Common Patterns

### User Menu

```tsx
function UserMenu({ user }) {
  return (
    <Popover position="bottom-end">
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar src={user.avatar} size="sm" />
          <ChevronDown className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-1">
          <div className="px-3 py-2 border-b">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button className="w-full text-left px-3 py-2 hover:bg-accent">
            Profile
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-accent">
            Settings
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-accent">
            Sign Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Color Picker

```tsx
function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: color }}
          />
          <span>Pick Color</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <ColorPickerComponent
          value={color}
          onChange={setColor}
        />
      </PopoverContent>
    </Popover>
  );
}
```

### Date Picker

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button className="flex items-center gap-2">
      <Calendar className="h-4 w-4" />
      <span>Select Date</span>
    </button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  </PopoverContent>
</Popover>
```

### Quick Actions

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button>
      <MoreVertical className="h-5 w-5" />
    </button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-1">
      <button className="w-full text-left px-3 py-2 hover:bg-accent">
        <Edit className="inline h-4 w-4 mr-2" />
        Edit
      </button>
      <button className="w-full text-left px-3 py-2 hover:bg-accent">
        <Copy className="inline h-4 w-4 mr-2" />
        Duplicate
      </button>
      <button className="w-full text-left px-3 py-2 hover:bg-accent text-red-600">
        <Trash className="inline h-4 w-4 mr-2" />
        Delete
      </button>
    </div>
  </PopoverContent>
</Popover>
```

### Share Dialog

```tsx
<Popover size="lg">
  <PopoverTrigger asChild>
    <button>
      <Share2 className="h-5 w-5 mr-2" />
      Share
    </button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-4">
      <h3 className="font-semibold">Share this page</h3>
      <div className="flex gap-2">
        <Input value="https://example.com/page" readOnly />
        <Button variant="outline">
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Twitter</Button>
        <Button variant="outline" size="sm">Facebook</Button>
        <Button variant="outline" size="sm">LinkedIn</Button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## Accessibility

The Popover component follows accessibility best practices:

- **ARIA Attributes:**
  - `role="dialog"` or `role="menu"` based on content
  - `aria-haspopup` on trigger
  - `aria-expanded` indicates open state
  - `aria-controls` links trigger to content

- **Keyboard Navigation:**
  - `Escape` closes the popover
  - `Tab` navigates through interactive elements
  - Focus trap for menu-style popovers

- **Focus Management:**
  - Focus moves to popover content on open
  - Focus returns to trigger on close
  - Clear focus indicators

### Accessible Examples

```tsx
// Menu popover
<Popover>
  <PopoverTrigger aria-label="Open menu">
    <MenuIcon />
  </PopoverTrigger>
  <PopoverContent role="menu">
    <button role="menuitem">Action 1</button>
    <button role="menuitem">Action 2</button>
  </PopoverContent>
</Popover>

// Dialog popover
<Popover>
  <PopoverTrigger>More Info</PopoverTrigger>
  <PopoverContent role="dialog" aria-label="Additional information">
    <p>Detailed information here...</p>
  </PopoverContent>
</Popover>
```

## Best Practices

1. **Choose Appropriate Trigger:** Use click for interactive content, hover for simple tooltips
2. **Position Wisely:** Ensure popover doesn't overflow viewport
3. **Keep Content Focused:** Popovers should contain related, focused content
4. **Limit Nesting:** Avoid nested popovers (max 1 level)
5. **Mobile Considerations:** Test on touch devices; hover doesn't work on mobile
6. **Size Appropriately:** Match size to content without overwhelming
7. **Provide Exit Options:** Always allow users to close easily

## Styling

### Custom Styles

```tsx
<Popover>
  <PopoverTrigger><button>Custom</button></PopoverTrigger>
  <PopoverContent className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    Custom styled popover
  </PopoverContent>
</Popover>
```

### Custom Width

```tsx
<Popover>
  <PopoverTrigger><button>Wide</button></PopoverTrigger>
  <PopoverContent className="w-96">
    Wide popover content
  </PopoverContent>
</Popover>
```

## Performance Tips

1. **Lazy Content:** Only render content when popover is open
2. **Portal Rendering:** Uses portal for better positioning
3. **Event Delegation:** Efficient event handling
4. **Unmount on Close:** Content is unmounted when closed (saves memory)

## Related Components

- **Tooltip** - For simple text hints
- **Dropdown** - For selection menus
- **Dialog** - For modal content
- **HoverCard** - For preview content
- **ContextMenu** - For right-click menus

## Changelog

- **v1.0.0** - Initial release with 12 positions and variants