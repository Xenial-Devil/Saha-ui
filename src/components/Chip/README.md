# Chip

A versatile chip component for displaying compact elements like tags, categories, filters, and selections. Supports icons, avatars, deletion, and multiple visual variants.

## Features

- 🎨 Five visual variants (filled, outlined, soft, gradient, glass)
- 🎯 Seven color schemes (default, primary, secondary, success, warning, error, info)
- 📏 Three sizes (sm, md, lg)
- 🖼️ Icon and avatar support
- ❌ Deletable/removable functionality
- 🖱️ Clickable interaction
- ♿ Fully accessible
- 🎭 `asChild` pattern support
- 🔄 Disabled state

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Chip } from "saha-ui";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Chip>Default Chip</Chip>
      <Chip color="primary">Primary</Chip>
      <Chip color="success">Success</Chip>
    </div>
  );
}
```

## Variants

### Filled (Default)

Solid background with contrasting text:

```tsx
<Chip variant="filled" color="primary">
  Filled
</Chip>
```

### Outlined

Border style with transparent background:

```tsx
<Chip variant="outlined" color="primary">
  Outlined
</Chip>
```

### Soft

Subtle background with softer appearance:

```tsx
<Chip variant="soft" color="primary">
  Soft
</Chip>
```

### Gradient

Gradient background effect:

```tsx
<Chip variant="gradient" color="primary">
  Gradient
</Chip>
```

### Glass

Glassmorphism effect:

```tsx
<Chip variant="glass" color="primary">
  Glass
</Chip>
```

## Colors

Available colors: `default`, `primary`, `secondary`, `success`, `warning`, `error`, `info`

```tsx
<div className="flex gap-2">
  <Chip color="default">Default</Chip>
  <Chip color="primary">Primary</Chip>
  <Chip color="secondary">Secondary</Chip>
  <Chip color="success">Success</Chip>
  <Chip color="warning">Warning</Chip>
  <Chip color="error">Error</Chip>
  <Chip color="info">Info</Chip>
</div>
```

## Sizes

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

## With Icons

Add icons to chips:

```tsx
import { Tag, Star, Heart } from 'lucide-react';

<Chip icon={<Tag size={14} />} color="primary">
  Tagged
</Chip>

<Chip icon={<Star size={14} />} color="warning">
  Featured
</Chip>

<Chip icon={<Heart size={14} />} color="error">
  Favorite
</Chip>
```

## With Avatar

Display user avatars in chips:

```tsx
<Chip avatar={<Avatar src="/user.jpg" size="xs" />} color="primary">
  John Doe
</Chip>
```

## Deletable Chips

Create removable chips:

```tsx
function TagList() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  const handleDelete = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          color="primary"
          deletable
          onDelete={() => handleDelete(tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}
```

## Clickable Chips

Make chips interactive:

```tsx
function FilterChips() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="flex gap-2">
      {["All", "Active", "Pending", "Completed"].map((filter) => (
        <Chip
          key={filter}
          clickable
          onClick={() => toggleChip(filter)}
          color={selected.includes(filter) ? "primary" : "default"}
        >
          {filter}
        </Chip>
      ))}
    </div>
  );
}
```

## Disabled State

```tsx
<Chip disabled>Disabled</Chip>
<Chip disabled deletable>Disabled Deletable</Chip>
```

## API Reference

### Chip Props

| Prop        | Type                                                                                   | Default     | Description                         |
| ----------- | -------------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `variant`   | `'filled' \| 'outlined' \| 'soft' \| 'gradient' \| 'glass'`                            | `'filled'`  | Visual style variant                |
| `color`     | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color scheme                        |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                                 | `'md'`      | Size of the chip                    |
| `icon`      | `ReactNode`                                                                            | -           | Icon to display at start            |
| `avatar`    | `ReactNode`                                                                            | -           | Avatar to display at start          |
| `deletable` | `boolean`                                                                              | `false`     | Whether chip can be deleted         |
| `onDelete`  | `() => void`                                                                           | -           | Callback when delete button clicked |
| `clickable` | `boolean`                                                                              | `false`     | Whether chip is clickable           |
| `disabled`  | `boolean`                                                                              | `false`     | Whether chip is disabled            |
| `className` | `string`                                                                               | -           | Additional CSS classes              |
| `asChild`   | `boolean`                                                                              | `false`     | Merge props with child element      |

## Common Patterns

### Tag Filter

```tsx
function ProductFilters() {
  const [filters, setFilters] = useState<string[]>([]);

  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];

  const toggleFilter = (category: string) => {
    setFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <h3>Filter by Category:</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category) => (
          <Chip
            key={category}
            clickable
            onClick={() => toggleFilter(category)}
            color={filters.includes(category) ? "primary" : "default"}
            variant={filters.includes(category) ? "filled" : "outlined"}
          >
            {category}
          </Chip>
        ))}
      </div>
    </div>
  );
}
```

### User Selection

```tsx
function UserSelector({ users }) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <h3>Selected Users:</h3>
      <div className="flex flex-wrap gap-2">
        {selected.map((userId) => {
          const user = users.find((u) => u.id === userId);
          return (
            <Chip
              key={userId}
              avatar={<Avatar src={user.avatar} size="xs" />}
              color="primary"
              deletable
              onDelete={() =>
                setSelected((prev) => prev.filter((id) => id !== userId))
              }
            >
              {user.name}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
```

### Status Indicators

```tsx
<div className="flex gap-2">
  <Chip color="success" icon={<CheckCircle size={14} />}>
    Completed
  </Chip>
  <Chip color="warning" icon={<Clock size={14} />}>
    In Progress
  </Chip>
  <Chip color="error" icon={<XCircle size={14} />}>
    Failed
  </Chip>
</div>
```

### Skills Tags

```tsx
function SkillsTags({ skills, onRemove }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Chip
          key={skill}
          variant="soft"
          color="primary"
          size="sm"
          deletable
          onDelete={() => onRemove(skill)}
        >
          {skill}
        </Chip>
      ))}
    </div>
  );
}
```

## Styling

### Custom Styles

```tsx
<Chip color="primary" className="shadow-lg hover:shadow-xl transition-shadow">
  Custom Styled
</Chip>
```

### Combining Props

```tsx
<Chip
  variant="gradient"
  color="primary"
  size="lg"
  icon={<Star size={16} />}
  className="font-bold uppercase"
>
  Premium
</Chip>
```

## Accessibility

The Chip component follows accessibility best practices:

- **Keyboard Navigation:**
  - Clickable chips are keyboard accessible
  - Delete button can be activated with Enter/Space
- **ARIA Attributes:**
  - Proper role attributes for interactive chips
  - Delete buttons have descriptive labels
- **Focus Management:**
  - Clear focus indicators
  - Disabled chips are not focusable

## Best Practices

1. **Use Semantic Colors:** Choose colors that match the chip's meaning (success for completed, error for failed, etc.)
2. **Keep Labels Short:** Chip text should be brief and scannable
3. **Consistent Sizing:** Use the same size for chips in the same context
4. **Icon Clarity:** Use clear, recognizable icons
5. **Delete Feedback:** Provide visual feedback when chips are removed
6. **Group Related Chips:** Use consistent spacing and alignment
7. **Limit Quantity:** Avoid overwhelming users with too many chips

## Related Components

- **Badge** - Smaller indicator component
- **Tag** - Similar to Chip but with different styling
- **Button** - For more prominent actions
- **Avatar** - Often used within chips

## Changelog

- **v1.0.0** - Initial release with all variants and features
