# Tag

A versatile tag component for labels, categories, filters, and status indicators. Supports icons, avatars, badges, and interactive features.

## Features

- 🎨 11 visual variants (default, primary, secondary, accent, success, warning, error, info, outline, ghost, glass)
- 📏 8 size options (xs to 4xl)
- 🔷 3 shape options (default, full, none)
- 🎯 Icon and avatar support
- 🔢 Badge indicators
- ❌ Removable tags
- 👆 Clickable tags
- 🎭 Loading states
- ⚡ Animated variants

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Tag } from "saha-ui";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Tag>Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
    </div>
  );
}
```

## Variants

```tsx
<Tag variant="default">Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="accent">Accent</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="info">Info</Tag>
<Tag variant="outline">Outline</Tag>
<Tag variant="ghost">Ghost</Tag>
<Tag variant="glass">Glass</Tag>
```

## Sizes

```tsx
<Tag size="xs">Extra Small</Tag>
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>
```

## Shapes

```tsx
<Tag rounded="default">Default</Tag>
<Tag rounded="full">Full</Tag>
<Tag rounded="none">None</Tag>
```

## With Icons

```tsx
import { Tag as TagIcon, User } from 'lucide-react';

<Tag icon={<TagIcon className="w-3 h-3" />}>
  Category
</Tag>
<Tag icon={<User className="w-3 h-3" />} variant="primary">
  User
</Tag>
```

## With Avatar

```tsx
<Tag avatar="/avatar.jpg">John Doe</Tag>
```

## Removable

```tsx
function RemovableTags() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          removable
          onRemove={() => setTags(tags.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
```

## Clickable

```tsx
<Tag clickable onClick={() => console.log("Clicked")}>
  Click me
</Tag>
```

## With Badge

```tsx
<Tag badge="5" variant="primary">
  Messages
</Tag>
<Tag badge="New" badgeVariant="error">
  Notifications
</Tag>
```

## With Dot Indicator

```tsx
<Tag dot dotPosition="left" variant="success">
  Online
</Tag>
<Tag dot dotPosition="right" dotColor="red">
  Offline
</Tag>
```

## Loading State

```tsx
<Tag loading variant="primary">
  Processing...
</Tag>
```

## TagGroup

```tsx
import { TagGroup } from "saha-ui";

<TagGroup spacing="md" wrap>
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
  <Tag>Next.js</Tag>
  <Tag>Vite</Tag>
</TagGroup>;
```

## Common Patterns

### Filter Tags

```tsx
function FilterTags() {
  const [selected, setSelected] = useState(["all"]);

  const filters = ["all", "active", "pending", "completed"];

  return (
    <TagGroup>
      {filters.map((filter) => (
        <Tag
          key={filter}
          selected={selected.includes(filter)}
          onClick={() => setSelected([filter])}
          clickable
          variant={selected.includes(filter) ? "primary" : "outline"}
        >
          {filter}
        </Tag>
      ))}
    </TagGroup>
  );
}
```

### Skill Tags

```tsx
<TagGroup max={5}>
  {skills.map((skill) => (
    <Tag key={skill} variant="gradient" size="sm">
      {skill}
    </Tag>
  ))}
</TagGroup>
```

### Status Tags

```tsx
<Tag variant="success" dot>Online</Tag>
<Tag variant="warning" dot>Away</Tag>
<Tag variant="error" dot>Offline</Tag>
```

## API Reference

### Tag Props

| Prop           | Type                                | Default     | Description              |
| -------------- | ----------------------------------- | ----------- | ------------------------ |
| `variant`      | `TagVariant`                        | `"default"` | Visual style             |
| `size`         | `TagSize`                           | `"md"`      | Size                     |
| `rounded`      | `"default"` \| `"full"` \| `"none"` | `"default"` | Border radius            |
| `icon`         | `ReactNode`                         | -           | Icon element             |
| `avatar`       | `string`                            | -           | Avatar image URL         |
| `removable`    | `boolean`                           | `false`     | Show remove button       |
| `onRemove`     | `() => void`                        | -           | Remove callback          |
| `clickable`    | `boolean`                           | `false`     | Enable click interaction |
| `onClick`      | `() => void`                        | -           | Click callback           |
| `disabled`     | `boolean`                           | `false`     | Disabled state           |
| `selected`     | `boolean`                           | `false`     | Selected state           |
| `dot`          | `boolean`                           | `false`     | Show dot indicator       |
| `dotPosition`  | `"left"` \| `"right"`               | `"left"`    | Dot position             |
| `dotColor`     | `string`                            | -           | Custom dot color         |
| `badge`        | `string \| number`                  | -           | Badge content            |
| `badgeVariant` | `string`                            | `"default"` | Badge variant            |
| `loading`      | `boolean`                           | `false`     | Loading state            |
| `animated`     | `boolean`                           | `false`     | Enable animation         |

### TagGroup Props

| Prop      | Type                                               | Default | Description          |
| --------- | -------------------------------------------------- | ------- | -------------------- |
| `spacing` | `"sm"` \| `"md"` \| `"lg"` \| `number` \| `string` | `"md"`  | Gap between tags     |
| `wrap`    | `boolean`                                          | `false` | Enable wrapping      |
| `max`     | `number`                                           | -       | Maximum visible tags |

## TypeScript

```typescript
import type { TagProps, TagGroupProps } from "saha-ui";
```
