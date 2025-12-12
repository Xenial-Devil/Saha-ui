# NativeSelect

A styled native HTML select element with consistent design system integration. Provides a lightweight alternative to custom dropdown components.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 🎯 Native performance
- ⚡ No JavaScript required
- ♿ Fully accessible
- 📱 Mobile-optimized
- 🎨 Icon support
- 🔧 Form integration

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { NativeSelect } from "saha-ui";

function App() {
  const [value, setValue] = useState("");

  return (
    <NativeSelect value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </NativeSelect>
  );
}
```

## Variants

```tsx
<NativeSelect variant="default">...</NativeSelect>
<NativeSelect variant="outline">...</NativeSelect>
<NativeSelect variant="ghost">...</NativeSelect>
<NativeSelect variant="filled">...</NativeSelect>
<NativeSelect variant="gradient">...</NativeSelect>
<NativeSelect variant="glass">...</NativeSelect>
```

## Sizes

```tsx
<NativeSelect size="xs">...</NativeSelect>
<NativeSelect size="sm">...</NativeSelect>
<NativeSelect size="md">...</NativeSelect>
<NativeSelect size="lg">...</NativeSelect>
<NativeSelect size="xl">...</NativeSelect>
```

## With Label

```tsx
<div className="space-y-2">
  <label htmlFor="country">Country</label>
  <NativeSelect id="country">
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </NativeSelect>
</div>
```

## With Icon

```tsx
import { Globe } from "lucide-react";

<NativeSelect icon={Globe}>
  <option value="">Select language</option>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
</NativeSelect>;
```

## Disabled

```tsx
<NativeSelect disabled>
  <option>Disabled select</option>
</NativeSelect>

<NativeSelect>
  <option value="1">Active option</option>
  <option value="2" disabled>Disabled option</option>
  <option value="3">Active option</option>
</NativeSelect>
```

## Error State

```tsx
<NativeSelect error>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
</NativeSelect>
```

## With Helper Text

```tsx
<div className="space-y-2">
  <NativeSelect id="category">
    <option value="">Select category</option>
    <option value="tech">Technology</option>
    <option value="design">Design</option>
  </NativeSelect>
  <p className="text-sm text-muted-foreground">
    Choose the most relevant category
  </p>
</div>
```

## Common Patterns

### Form Field

```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <label htmlFor="department">Department</label>
    <NativeSelect id="department" name="department" required variant="outline">
      <option value="">Select department</option>
      <option value="engineering">Engineering</option>
      <option value="design">Design</option>
      <option value="marketing">Marketing</option>
      <option value="sales">Sales</option>
    </NativeSelect>
  </div>

  <div className="space-y-2">
    <label htmlFor="role">Role</label>
    <NativeSelect id="role" name="role" required variant="outline">
      <option value="">Select role</option>
      <option value="manager">Manager</option>
      <option value="developer">Developer</option>
      <option value="designer">Designer</option>
    </NativeSelect>
  </div>

  <Button type="submit">Submit</Button>
</form>
```

### Filter Dropdown

```tsx
<div className="flex items-center gap-2">
  <label htmlFor="sort" className="text-sm">
    Sort by:
  </label>
  <NativeSelect
    id="sort"
    size="sm"
    variant="ghost"
    onChange={(e) => handleSort(e.target.value)}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="popular">Most Popular</option>
    <option value="name">Name (A-Z)</option>
  </NativeSelect>
</div>
```

### Settings Panel

```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <label>Theme</label>
    <NativeSelect variant="filled" size="lg">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </NativeSelect>
  </div>

  <div className="space-y-2">
    <label>Language</label>
    <NativeSelect variant="filled" size="lg" icon={Globe}>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </NativeSelect>
  </div>

  <div className="space-y-2">
    <label>Timezone</label>
    <NativeSelect variant="filled" size="lg">
      <option value="utc">UTC</option>
      <option value="est">EST</option>
      <option value="pst">PST</option>
      <option value="cet">CET</option>
    </NativeSelect>
  </div>
</div>
```

### Quantity Selector

```tsx
<div className="flex items-center gap-2">
  <span className="text-sm">Quantity:</span>
  <NativeSelect
    size="sm"
    variant="outline"
    onChange={(e) => updateQuantity(e.target.value)}
  >
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </NativeSelect>
</div>
```

### Date Filter

```tsx
<div className="flex gap-2">
  <NativeSelect variant="ghost" size="sm">
    <option value="">Month</option>
    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    {/* ... more months */}
  </NativeSelect>

  <NativeSelect variant="ghost" size="sm">
    <option value="">Year</option>
    <option value="2024">2024</option>
    <option value="2023">2023</option>
    <option value="2022">2022</option>
  </NativeSelect>
</div>
```

## API Reference

### NativeSelect Props

| Prop        | Type                   | Default     | Description         |
| ----------- | ---------------------- | ----------- | ------------------- |
| `variant`   | `NativeSelectVariant`  | `"default"` | Visual style        |
| `size`      | `NativeSelectSize`     | `"md"`      | Size preset         |
| `icon`      | `LucideIcon`           | -           | Optional icon       |
| `error`     | `boolean`              | `false`     | Error state         |
| `disabled`  | `boolean`              | `false`     | Disabled state      |
| `required`  | `boolean`              | `false`     | Required field      |
| `className` | `string`               | -           | Additional classes  |
| `...props`  | `SelectHTMLAttributes` | -           | Native select props |

## Accessibility

- Native browser accessibility
- Keyboard navigation (Arrow keys, Enter, Space)
- Label association
- Required field indication
- Error state announcement
- Focus visible indicators

## TypeScript

```typescript
import type { NativeSelectProps } from "saha-ui";
```

## Related Components

- Select
- Combobox
- Autocomplete
