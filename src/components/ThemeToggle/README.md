# ThemeToggle

A pre-built button component for toggling between light and dark themes. Integrates seamlessly with ThemeProvider for instant theme switching.

## Features

- 🌓 Light/dark/system modes
- 🎨 14 visual variants
- 📏 8 size options
- 🎭 Smooth icon transitions
- 💾 Auto-persistence
- ⌨️ Keyboard accessible
- 🎯 Tooltip support
- 🔄 System sync

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { ThemeProvider, ThemeToggle } from "saha-ui";

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

## Variants

```tsx
<ThemeToggle variant="default" />
<ThemeToggle variant="outline" />
<ThemeToggle variant="ghost" />
<ThemeToggle variant="gradient" />
<ThemeToggle variant="glass" />
<ThemeToggle variant="minimal" />
```

## Sizes

```tsx
<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />
<ThemeToggle size="icon" />
```

## With Dropdown

```tsx
<ThemeToggle showDropdown dropdownAlign="end" />
```

## Custom Icons

```tsx
import { Sun, Moon, Monitor } from "lucide-react";

<ThemeToggle lightIcon={Sun} darkIcon={Moon} systemIcon={Monitor} />;
```

## Without System Option

```tsx
<ThemeToggle showSystem={false} />
```

## Common Patterns

### Navbar Toggle

```tsx
<nav className="flex items-center justify-between p-4">
  <div className="text-xl font-bold">My App</div>

  <div className="flex items-center gap-4">
    <NavigationMenu />
    <ThemeToggle variant="ghost" size="icon" />
  </div>
</nav>
```

### Settings Panel

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium">Theme</h3>
      <p className="text-sm text-muted-foreground">
        Choose your preferred color scheme
      </p>
    </div>

    <ThemeToggle showDropdown variant="outline" />
  </div>
</div>
```

### Mobile Menu

```tsx
<Sheet>
  <SheetContent>
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <nav className="flex flex-col gap-2">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Theme</span>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>
```

### Footer Toggle

```tsx
<footer className="border-t">
  <div className="container flex items-center justify-between py-8">
    <div>
      <p className="text-sm text-muted-foreground">© 2024 My Company</p>
    </div>

    <div className="flex items-center gap-4">
      <ThemeToggle variant="ghost" />
      <SocialLinks />
    </div>
  </div>
</footer>
```

### Inline Toggle

```tsx
<div className="flex items-center gap-2">
  <span className="text-sm">Appearance:</span>
  <ThemeToggle variant="minimal" size="sm" showDropdown />
</div>
```

## API Reference

### ThemeToggle Props

| Prop            | Type                               | Default          | Description           |
| --------------- | ---------------------------------- | ---------------- | --------------------- |
| `variant`       | `ThemeToggleVariant`               | `"ghost"`        | Visual style          |
| `size`          | `ThemeToggleSize`                  | `"icon"`         | Size preset           |
| `showDropdown`  | `boolean`                          | `false`          | Show dropdown menu    |
| `showSystem`    | `boolean`                          | `true`           | Include system option |
| `dropdownAlign` | `"start"` \| `"center"` \| `"end"` | `"end"`          | Dropdown alignment    |
| `lightIcon`     | `LucideIcon`                       | `Sun`            | Light mode icon       |
| `darkIcon`      | `LucideIcon`                       | `Moon`           | Dark mode icon        |
| `systemIcon`    | `LucideIcon`                       | `Monitor`        | System mode icon      |
| `showTooltip`   | `boolean`                          | `true`           | Show tooltip          |
| `tooltipText`   | `string`                           | `"Toggle theme"` | Tooltip content       |
| `className`     | `string`                           | -                | Additional classes    |

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation (Enter, Space)
- Focus visible indicators
- High contrast support
- Reduced motion support

## TypeScript

```typescript
import type { ThemeToggleProps } from "saha-ui";
```

## Related Components

- ThemeProvider
- Button
- DropdownMenu
