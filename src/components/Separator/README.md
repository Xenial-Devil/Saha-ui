# Separator

A visual divider component for separating content sections. Also known as a divider, it creates visual distinction between different areas of content with horizontal or vertical lines.

## Features

- 📐 Horizontal and vertical orientations
- 🎨 Multiple visual variants
- 📏 Customizable thickness
- 🎯 Text/label support
- 💫 Decorative and semantic options
- ♿ Full accessibility support
- 🎭 Flexible styling options

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Separator } from '@saha-ui/core';

function MyComponent() {
  return (
    <div>
      <p>Content above</p>
      <Separator />
      <p>Content below</p>
    </div>
  );
}
```

## Orientations

### Horizontal (Default)

```tsx
<div>
  <p>Section 1</p>
  <Separator orientation="horizontal" />
  <p>Section 2</p>
</div>
```

### Vertical

```tsx
<div className="flex items-center gap-4">
  <span>Item 1</span>
  <Separator orientation="vertical" className="h-6" />
  <span>Item 2</span>
  <Separator orientation="vertical" className="h-6" />
  <span>Item 3</span>
</div>
```

## Variants

### Default

```tsx
<Separator variant="default" />
```

### Dashed

```tsx
<Separator variant="dashed" />
```

### Dotted

```tsx
<Separator variant="dotted" />
```

### Gradient

```tsx
<Separator variant="gradient" />
```

## With Text/Label

### Centered Text

```tsx
<Separator>
  <span className="px-2 text-sm text-muted-foreground">OR</span>
</Separator>
```

### Aligned Text

```tsx
<Separator align="start">
  <span className="px-2 text-sm">Start</span>
</Separator>

<Separator align="center">
  <span className="px-2 text-sm">Center</span>
</Separator>

<Separator align="end">
  <span className="px-2 text-sm">End</span>
</Separator>
```

## Decorative vs Semantic

### Semantic (Default)

Semantic separators are announced to screen readers:

```tsx
<Separator decorative={false} />
```

### Decorative

Purely visual separators not announced to screen readers:

```tsx
<Separator decorative />
```

## Thickness

### Thin

```tsx
<Separator className="h-px" />
```

### Medium (Default)

```tsx
<Separator />
```

### Thick

```tsx
<Separator className="h-1" />
```

## Custom Styling

### Custom Colors

```tsx
<Separator className="bg-primary" />
<Separator className="bg-gradient-to-r from-blue-500 to-purple-500" />
```

### Custom Spacing

```tsx
<Separator className="my-8" />
<Separator className="my-4" />
```

## API Reference

### Separator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the separator |
| `variant` | `'default' \| 'dashed' \| 'dotted' \| 'gradient'` | `'default'` | Visual style variant |
| `decorative` | `boolean` | `false` | Whether separator is decorative only |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of label text |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Optional label content |

## Common Patterns

### Section Divider

```tsx
function Content() {
  return (
    <article>
      <section>
        <h2>Section 1</h2>
        <p>Content for section 1...</p>
      </section>

      <Separator className="my-8" />

      <section>
        <h2>Section 2</h2>
        <p>Content for section 2...</p>
      </section>
    </article>
  );
}
```

### List Dividers

```tsx
function ItemList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="py-4">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          {index < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
```

### Navigation Dividers

```tsx
function Navigation() {
  return (
    <nav className="flex items-center gap-4">
      <a href="/">Home</a>
      <Separator orientation="vertical" className="h-4" decorative />
      <a href="/about">About</a>
      <Separator orientation="vertical" className="h-4" decorative />
      <a href="/contact">Contact</a>
    </nav>
  );
}
```

### Form Section Separator

```tsx
function Form() {
  return (
    <form>
      <div className="space-y-4">
        <h3>Personal Information</h3>
        <Input label="Name" />
        <Input label="Email" />
      </div>

      <Separator className="my-6">
        <span className="px-2 text-xs text-muted-foreground">
          Additional Details
        </span>
      </Separator>

      <div className="space-y-4">
        <h3>Address</h3>
        <Input label="Street" />
        <Input label="City" />
      </div>
    </form>
  );
}
```

### Authentication Separator

```tsx
function LoginForm() {
  return (
    <div className="space-y-4">
      <Button variant="primary" className="w-full">
        Sign in with Email
      </Button>

      <Separator>
        <span className="px-2 text-xs text-muted-foreground bg-background">
          OR
        </span>
      </Separator>

      <Button variant="outline" className="w-full">
        <GoogleIcon className="mr-2" />
        Sign in with Google
      </Button>
    </div>
  );
}
```

### Card Footer Separator

```tsx
function Card() {
  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <h2>Card Title</h2>
        <p>Card content goes here...</p>
      </div>

      <Separator />

      <div className="p-4 flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    </div>
  );
}
```

### Sidebar Divider

```tsx
function Sidebar() {
  return (
    <aside className="w-64 p-4">
      <nav>
        <h3 className="font-semibold mb-2">Main</h3>
        <ul>
          <li>Dashboard</li>
          <li>Analytics</li>
        </ul>

        <Separator className="my-4" />

        <h3 className="font-semibold mb-2">Settings</h3>
        <ul>
          <li>Profile</li>
          <li>Preferences</li>
        </ul>
      </nav>
    </aside>
  );
}
```

### Gradient Separator

```tsx
<Separator className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
```

### Decorative Separator

```tsx
<Separator className="my-8">
  <div className="px-2">
    <StarIcon className="w-4 h-4 text-muted-foreground" />
  </div>
</Separator>
```

## Accessibility

The Separator component follows accessibility best practices:

- **ARIA Attributes:**
  - Uses `role="separator"` for semantic separators
  - Decorative separators use `role="none"` and `aria-hidden="true"`
  - `aria-orientation` indicates horizontal or vertical orientation

- **Screen Readers:**
  - Semantic separators are announced as "separator"
  - Decorative separators are hidden from screen readers
  - Text labels within separators are read normally

### Accessible Examples

```tsx
// Semantic separator (announced to screen readers)
<Separator decorative={false} />

// Decorative separator (hidden from screen readers)
<Separator decorative />

// With descriptive text
<Separator>
  <span>Section divider</span>
</Separator>
```

## Best Practices

1. **Use Semantic Separators:** Set `decorative={false}` for meaningful content divisions
2. **Decorative for Visual Only:** Use `decorative={true}` for purely visual separators
3. **Appropriate Spacing:** Add margin classes for proper spacing around separators
4. **Vertical Height:** Always specify height for vertical separators
5. **Consistent Styling:** Use consistent separator styles throughout your app
6. **Avoid Overuse:** Too many separators can make content feel fragmented
7. **Consider Alternatives:** Sometimes spacing or background colors work better than separators

## Styling

### Custom Width

```tsx
<Separator className="max-w-md mx-auto" />
```

### Custom Color and Style

```tsx
<Separator className="bg-primary h-0.5 rounded-full" />
```

### With Animation

```tsx
<Separator className="animate-pulse" />
```

### Responsive

```tsx
<Separator className="my-4 md:my-8 lg:my-12" />
```

## When to Use

**Use Separator when:**
- Dividing content sections
- Separating list items
- Creating visual breaks in forms
- Dividing navigation items
- Separating card header/body/footer

**Use alternatives when:**
- Content is already clearly separated by spacing
- You need interactive dividers (consider Resizable)
- You're dividing columns (consider Grid or layout components)

## Related Components

- **Divider** - Alternative name for the same component
- **Hr** - Native HTML horizontal rule
- **Grid** - For layout divisions
- **Card** - Often uses separators internally
- **List** - Can include separators between items

## Changelog

- **v1.0.0** - Initial release with horizontal/vertical orientations and variants