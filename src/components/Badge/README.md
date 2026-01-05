# Badge

A versatile badge component for displaying status indicators, labels, tags, and notifications. Supports multiple variants, sizes, shapes, and interactive features.

## Features

- 🎨 10 visual variants (default, primary, secondary, accent, success, warning, error, info, outline, glass)
- 📏 Three sizes (sm, md, lg)
- 🔷 Three shapes (rounded, pill, square)
- 🔴 Status dot indicator
- ✨ Pulse animation for live status
- ❌ Removable badges with close button
- 🎭 Custom icon support
- ♿ Full accessibility support with ARIA attributes
- 🧩 `asChild` pattern for composition

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Badge } from "saha-ui";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  );
}
```

## Variants

### Default

```tsx
<Badge variant="default">Default</Badge>
```

### Primary

```tsx
<Badge variant="primary">Primary</Badge>
```

### Secondary

```tsx
<Badge variant="secondary">Secondary</Badge>
```

### Accent

```tsx
<Badge variant="accent">Accent</Badge>
```

### Success

```tsx
<Badge variant="success">Success</Badge>
```

### Warning

```tsx
<Badge variant="warning">Warning</Badge>
```

### Error

```tsx
<Badge variant="error">Error</Badge>
```

### Info

```tsx
<Badge variant="info">Info</Badge>
```

### Outline

```tsx
<Badge variant="outline">Outline</Badge>
```

### Glass

```tsx
<Badge variant="glass">Glass</Badge>
```

## Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

## Shapes

### Rounded (Default)

```tsx
<Badge shape="rounded">Rounded</Badge>
```

### Pill

```tsx
<Badge shape="pill">Pill Shape</Badge>
```

### Square

```tsx
<Badge shape="square">Square</Badge>
```

## Status Dot Indicator

Add a dot indicator for status display:

```tsx
<Badge variant="success" dot>Online</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="warning" dot>Away</Badge>
```

## Pulse Animation

Add pulse animation for live status indicators:

```tsx
<Badge variant="error" pulse>Live</Badge>
<Badge variant="success" pulse dot>Recording</Badge>
```

## Removable Badges

Create badges that can be dismissed:

```tsx
function RemovableBadge() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="primary"
          removable
          onRemove={() => removeTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

## Custom Icons

Add custom icons to badges:

```tsx
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

<Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
  Verified
</Badge>

<Badge variant="warning" icon={<AlertTriangle className="w-3 h-3" />}>
  Warning
</Badge>

<Badge variant="info" icon={<Info className="w-3 h-3" />}>
  Information
</Badge>
```

## Notification Badges

Display notification counts:

```tsx
<div className="relative inline-block">
  <button className="p-2">
    <Bell />
  </button>
  <Badge
    variant="error"
    size="sm"
    shape="pill"
    className="absolute -top-1 -right-1"
  >
    5
  </Badge>
</div>
```

## API Reference

### Badge Props

| Prop               | Type                                                                                                                       | Default     | Description                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'outline' \| 'glass'` | `'default'` | Visual style variant                  |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                                                     | `'md'`      | Size of the badge                     |
| `shape`            | `'rounded' \| 'pill' \| 'square'`                                                                                          | `'rounded'` | Border radius style                   |
| `dot`              | `boolean`                                                                                                                  | `false`     | Show status dot indicator             |
| `pulse`            | `boolean`                                                                                                                  | `false`     | Add pulse animation                   |
| `removable`        | `boolean`                                                                                                                  | `false`     | Show close button                     |
| `onRemove`         | `() => void`                                                                                                               | -           | Callback when close button is clicked |
| `icon`             | `ReactNode`                                                                                                                | -           | Custom icon element                   |
| `className`        | `string`                                                                                                                   | -           | Additional CSS classes                |
| `asChild`          | `boolean`                                                                                                                  | `false`     | Merge props with child element        |
| `aria-label`       | `string`                                                                                                                   | -           | Accessible label for screen readers   |
| `aria-labelledby`  | `string`                                                                                                                   | -           | ID of labeling element                |
| `aria-describedby` | `string`                                                                                                                   | -           | ID of describing element              |
| `aria-live`        | `'off' \| 'polite' \| 'assertive'`                                                                                         | -           | Live region announcement              |
| `aria-atomic`      | `boolean`                                                                                                                  | -           | Whether to announce entire content    |

## Styling

### Custom Styles

```tsx
<Badge
  variant="primary"
  className="font-bold shadow-lg hover:shadow-xl transition-shadow"
>
  Custom Styled
</Badge>
```

### Combining Props

```tsx
<Badge
  variant="success"
  size="lg"
  shape="pill"
  dot
  pulse
  className="uppercase tracking-wider"
>
  Live Now
</Badge>
```

## Accessibility

The Badge component follows accessibility best practices:

- **ARIA Labels:**

  - Use `aria-label` to provide descriptive text for screen readers
  - Especially important for icon-only or number badges

- **Live Regions:**

  - Use `aria-live` for dynamically updating badges
  - Use `"polite"` for non-critical updates
  - Use `"assertive"` for important notifications

- **Keyboard Navigation:**
  - Removable badges have keyboard-accessible close buttons
  - Proper focus indicators

### Accessible Examples

```tsx
// Notification count
<Badge
  variant="error"
  aria-label="3 unread messages"
  aria-live="polite"
>
  3
</Badge>

// Status indicator
<Badge
  variant="success"
  dot
  aria-label="User is online"
>
  Online
</Badge>

// Removable tag
<Badge
  variant="primary"
  removable
  onRemove={handleRemove}
  aria-label="Remove React tag"
>
  React
</Badge>
```

## Best Practices

1. **Choose Appropriate Variants:** Use semantic variants (success, error, warning, info) for status indicators
2. **Keep Text Concise:** Badges should contain brief labels (1-2 words)
3. **Use Consistent Sizing:** Maintain consistent badge sizes within the same context
4. **Provide Accessible Labels:** Always include `aria-label` for icon-only or number badges
5. **Limit Badge Usage:** Avoid overusing badges to prevent visual clutter
6. **Status Indicators:** Use dot and pulse for live status updates
7. **Removable Badges:** Provide visual feedback when removing tags

## Common Patterns

### Status Badges

```tsx
<div className="flex gap-2">
  <Badge variant="success" dot>
    Active
  </Badge>
  <Badge variant="error" dot>
    Inactive
  </Badge>
  <Badge variant="warning" dot>
    Pending
  </Badge>
</div>
```

### Tag System

```tsx
function TagInput() {
  const [tags, setTags] = useState(["React", "TypeScript", "Next.js"]);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          shape="pill"
          removable
          onRemove={() => setTags(tags.filter((t) => t !== tag))}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

### User Role Badges

```tsx
<div className="flex items-center gap-2">
  <Avatar src="/user.jpg" />
  <span>John Doe</span>
  <Badge variant="accent" size="sm">
    Admin
  </Badge>
  <Badge variant="primary" size="sm">
    Pro
  </Badge>
</div>
```

### Category Labels

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Article Title</CardTitle>
      <div className="flex gap-2">
        <Badge variant="outline">Technology</Badge>
        <Badge variant="outline">Tutorial</Badge>
      </div>
    </div>
  </CardHeader>
</Card>
```

### Live Status Indicator

```tsx
<Badge variant="error" pulse dot>
  Live
</Badge>

<Badge variant="success" pulse>
  Recording
</Badge>
```

### Notification Counter

```tsx
<div className="relative">
  <Button variant="ghost" size="icon">
    <Bell className="h-5 w-5" />
  </Button>
  <Badge
    variant="error"
    size="sm"
    shape="pill"
    className="absolute -top-1 -right-1 min-w-[20px] justify-center"
    aria-label={`${count} new notifications`}
  >
    {count > 99 ? "99+" : count}
  </Badge>
</div>
```

## Composition with `asChild`

Use the `asChild` prop for advanced composition:

```tsx
<Badge asChild variant="primary">
  <a href="/premium" className="cursor-pointer">
    Upgrade to Pro
  </a>
</Badge>
```

## Related Components

- **Chip** - Similar to Badge but typically larger and more interactive
- **Tag** - For labeling and categorization
- **Avatar** - Often used together with badges for status indicators
- **Button** - Can contain badges for counts or status

## Changelog

- **v1.0.0** - Initial release with all variants and features
