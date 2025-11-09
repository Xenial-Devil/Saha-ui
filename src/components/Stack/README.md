# Stack

A flexible layout primitive for arranging elements with consistent spacing in vertical or horizontal layouts.

## Features

- 🎨 **Flexible Layout** - Vertical, horizontal, and responsive layouts
- 📏 **Consistent Spacing** - Seven spacing scales from `none` to `2xl`
- 🎯 **Alignment Control** - Fine-grained alignment and justification
- 📱 **Responsive** - Automatic mobile-to-desktop layout switching
- ♿ **Accessible** - Full ARIA support for semantic groupings
- 🎭 **Visual Dividers** - Optional separators between items
- 🔄 **Flexible Wrapping** - Control item wrapping behavior
- 🏷️ **Polymorphic** - Use `asChild` for semantic HTML

## Installation

```bash
import { Stack } from '@saha-ui/components';
```

## Basic Usage

### Vertical Stack (Default)

```tsx
import { Stack } from '@saha-ui/components';

function MyComponent() {
  return (
    <Stack spacing="md">
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
    </Stack>
  );
}
```

### Horizontal Stack

```tsx
<Stack direction="horizontal" spacing="sm" align="center">
  <Avatar src="/user.jpg" />
  <div>
    <Text weight="bold">John Doe</Text>
    <Text size="sm" variant="muted">Developer</Text>
  </div>
</Stack>
```

### Responsive Stack

Automatically switches from vertical on mobile to horizontal on desktop:

```tsx
<Stack responsive spacing="lg">
  <Card>Sidebar content</Card>
  <Card>Main content</Card>
</Stack>
```

## Spacing

Stack provides seven spacing options:

```tsx
<Stack spacing="none">   {/* gap-0 */}
<Stack spacing="xs">     {/* gap-1 (0.25rem) */}
<Stack spacing="sm">     {/* gap-2 (0.5rem) */}
<Stack spacing="md">     {/* gap-4 (1rem) - default */}
<Stack spacing="lg">     {/* gap-6 (1.5rem) */}
<Stack spacing="xl">     {/* gap-8 (2rem) */}
<Stack spacing="2xl">    {/* gap-12 (3rem) */}
```

## Alignment

### Cross Axis Alignment (`align`)

Control alignment perpendicular to the stack direction:

```tsx
<Stack direction="horizontal" align="start">
  {/* Align to top */}
</Stack>

<Stack direction="horizontal" align="center">
  {/* Center vertically */}
</Stack>

<Stack direction="horizontal" align="end">
  {/* Align to bottom */}
</Stack>

<Stack direction="horizontal" align="stretch">
  {/* Stretch to fill height (default) */}
</Stack>

<Stack direction="horizontal" align="baseline">
  {/* Align text baselines */}
</Stack>
```

### Main Axis Distribution (`justify`)

Control distribution along the stack direction:

```tsx
<Stack direction="horizontal" justify="start">
  {/* Pack at start (default) */}
</Stack>

<Stack direction="horizontal" justify="center">
  {/* Center items */}
</Stack>

<Stack direction="horizontal" justify="end">
  {/* Pack at end */}
</Stack>

<Stack direction="horizontal" justify="between">
  {/* Space between items */}
</Stack>

<Stack direction="horizontal" justify="around">
  {/* Space around items */}
</Stack>

<Stack direction="horizontal" justify="evenly">
  {/* Equal space everywhere */}
</Stack>
```

## Visual Dividers

Add visual separators between items:

```tsx
<Stack divide spacing="md">
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</Stack>
```

Dividers automatically adjust based on direction:
- Vertical stacks: horizontal dividers
- Horizontal stacks: vertical dividers
- Responsive stacks: dividers change with layout

## Wrapping

Allow items to wrap onto multiple lines:

```tsx
<Stack direction="horizontal" wrap spacing="sm">
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
  <Badge>Tag 4</Badge>
  <Badge>Tag 5</Badge>
</Stack>
```

## Polymorphic Usage (`asChild`)

Use Stack layout on semantic HTML elements:

```tsx
<Stack asChild direction="horizontal" spacing="md">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</Stack>
```

## Common Patterns

### Card Grid

```tsx
<Stack spacing="lg">
  <h2>Featured Items</h2>
  <Stack direction="horizontal" wrap spacing="md">
    <Card>Item 1</Card>
    <Card>Item 2</Card>
    <Card>Item 3</Card>
  </Stack>
</Stack>
```

### Form Layout

```tsx
<Stack spacing="md">
  <Input label="Name" />
  <Input label="Email" />
  <Textarea label="Message" />
  <Stack direction="horizontal" justify="end" spacing="sm">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </Stack>
</Stack>
```

### Toolbar

```tsx
<Stack
  direction="horizontal"
  spacing="xs"
  role="toolbar"
  aria-label="Text formatting"
>
  <Button size="sm" variant="ghost">
    <BoldIcon />
  </Button>
  <Button size="sm" variant="ghost">
    <ItalicIcon />
  </Button>
  <Button size="sm" variant="ghost">
    <UnderlineIcon />
  </Button>
</Stack>
```

### Header with Actions

```tsx
<Stack direction="horizontal" justify="between" align="center">
  <h1>Page Title</h1>
  <Stack direction="horizontal" spacing="sm">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Stack>
</Stack>
```

### Sidebar Layout

```tsx
<Stack responsive spacing="lg">
  {/* Sidebar */}
  <Stack spacing="md" style={{ width: '250px' }}>
    <h3>Navigation</h3>
    <nav>
      <Stack spacing="xs">
        <a href="/dashboard">Dashboard</a>
        <a href="/settings">Settings</a>
      </Stack>
    </nav>
  </Stack>

  {/* Main content */}
  <Stack spacing="lg" style={{ flex: 1 }}>
    <h1>Main Content</h1>
    <p>Content goes here...</p>
  </Stack>
</Stack>
```

### Feature List

```tsx
<Stack role="list" aria-label="Product features" spacing="md">
  <div role="listitem">
    <Stack direction="horizontal" spacing="sm" align="start">
      <CheckIcon className="text-success" />
      <div>
        <Text weight="bold">Fast Performance</Text>
        <Text variant="muted">Optimized for speed</Text>
      </div>
    </Stack>
  </div>
  <div role="listitem">
    <Stack direction="horizontal" spacing="sm" align="start">
      <CheckIcon className="text-success" />
      <div>
        <Text weight="bold">Easy to Use</Text>
        <Text variant="muted">Intuitive interface</Text>
      </div>
    </Stack>
  </div>
</Stack>
```

## Accessibility

### ARIA Labels

Provide labels when Stack represents a meaningful group:

```tsx
<Stack aria-label="User profile actions" spacing="sm">
  <Button>Edit Profile</Button>
  <Button>Change Password</Button>
  <Button>Delete Account</Button>
</Stack>
```

### ARIA Labelledby

Reference an existing heading:

```tsx
<h2 id="actions-heading">Available Actions</h2>
<Stack aria-labelledby="actions-heading" spacing="md">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>
```

### ARIA Describedby

Provide additional context:

```tsx
<Stack aria-describedby="form-help" spacing="md">
  <Input label="Username" />
  <Input label="Password" type="password" />
</Stack>
<Text id="form-help" size="sm" variant="muted">
  All fields are required
</Text>
```

### Semantic Roles

Use appropriate ARIA roles:

```tsx
{/* List */}
<Stack role="list" aria-label="Team members">
  <div role="listitem">Alice</div>
  <div role="listitem">Bob</div>
</Stack>

{/* Toolbar */}
<Stack
  role="toolbar"
  aria-label="Editor tools"
  direction="horizontal"
  aria-orientation="horizontal"
>
  <Button>Cut</Button>
  <Button>Copy</Button>
  <Button>Paste</Button>
</Stack>

{/* Navigation */}
<Stack asChild role="navigation" aria-label="Main navigation">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</Stack>

{/* Group */}
<Stack role="group" aria-labelledby="filter-heading">
  <h3 id="filter-heading">Filters</h3>
  <Checkbox label="In Stock" />
  <Checkbox label="On Sale" />
</Stack>
```

### Orientation

Specify orientation for assistive technologies:

```tsx
<Stack
  direction="horizontal"
  role="tablist"
  aria-orientation="horizontal"
>
  <Button role="tab">Tab 1</Button>
  <Button role="tab">Tab 2</Button>
</Stack>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Main-axis distribution |
| `wrap` | `boolean` | `false` | Allow items to wrap |
| `responsive` | `boolean` | `false` | Vertical on mobile, horizontal on desktop |
| `divide` | `boolean` | `false` | Add visual dividers |
| `asChild` | `boolean` | `false` | Merge props with child element |
| `role` | `string` | - | ARIA role |
| `aria-label` | `string` | - | Accessible label |
| `aria-labelledby` | `string` | - | ID of labeling element |
| `aria-describedby` | `string` | - | ID of describing element |
| `aria-orientation` | `'horizontal' \| 'vertical'` | - | Orientation for ARIA |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Child elements |

### Extends

`Stack` extends all standard HTML `div` attributes.

## Best Practices

### ✅ Do

- Use Stack for consistent spacing in layouts
- Provide ARIA labels for meaningful groupings
- Use `responsive` for mobile-friendly layouts
- Use `asChild` for semantic HTML (nav, ul, etc.)
- Match `aria-orientation` with `direction` for roles that require it
- Use appropriate spacing scales for visual hierarchy

### ❌ Don't

- Don't nest too many Stacks (use Grid for complex layouts)
- Don't use Stack for data tables (use DataTable component)
- Don't forget ARIA labels when Stack represents a semantic group
- Don't use `divide` with `spacing="none"` (dividers won't be visible)
- Don't override flex properties with className (use props instead)

## Performance

Stack is a lightweight layout primitive with minimal overhead:

- **Renders**: Single div (or child via `asChild`)
- **Re-renders**: Only on prop changes (React.memo not needed)
- **Bundle size**: ~1KB minified + gzipped
- **No runtime calculations**: Pure CSS flexbox

## Browser Support

Stack uses standard CSS flexbox and gap properties:

- ✅ Chrome/Edge 84+
- ✅ Firefox 63+
- ✅ Safari 14.1+
- ✅ All modern mobile browsers

## Related Components

- **Grid** - For two-dimensional layouts
- **Container** - For page-width constraints
- **Section** - For page sections with spacing
- **Flex** - For advanced flexbox layouts

## Examples

See the [Stack examples](../../examples/StackExample.tsx) for more usage patterns.

## Changelog

### v1.16.0
- Enhanced TypeScript types with comprehensive JSDoc
- Added ARIA support (aria-label, aria-labelledby, aria-describedby)
- Added role and aria-orientation props
- Auto-computed aria-orientation for common roles
- Improved documentation and examples

---

**Need help?** Check the [component documentation](../README.md) or open an issue.