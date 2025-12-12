# Paper

A versatile surface component that provides elevation and visual hierarchy through shadows, borders, and background effects. Perfect for cards, containers, and content that needs visual separation.

## Features

- 🎨 4 visual variants (filled, outlined, gradient, glass)
- 📏 7 elevation levels (0-6) for shadow depth
- 📐 5 padding presets plus custom values
- 🔷 6 border radius options (none to full)
- ✨ Hover effects with scale and shadow transitions
- 📍 Centered layout option
- 📱 Responsive max-width constraints
- ♿ Semantic HTML with proper accessibility
- 🎭 `asChild` pattern for flexible composition

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Paper } from "saha-ui";

function MyComponent() {
  return (
    <Paper>
      <h2>Hello World</h2>
      <p>Content goes here</p>
    </Paper>
  );
}
```

## Variants

### Filled (Default)

Solid background with elevation shadow:

```tsx
<Paper variant="filled" elevation={2}>
  Filled surface with elevation
</Paper>
```

### Outlined

Border-based surface without background fill:

```tsx
<Paper variant="outlined">Outlined surface</Paper>
```

### Gradient

Subtle gradient background:

```tsx
<Paper variant="gradient" elevation={3}>
  Gradient background surface
</Paper>
```

### Glass

Modern glass morphism effect:

```tsx
<Paper variant="glass" elevation={4}>
  Glass morphism surface
</Paper>
```

## Elevation

Control shadow depth with elevation levels (0-6):

```tsx
<div className="flex gap-4">
  <Paper elevation={0}>No shadow</Paper>
  <Paper elevation={1}>Subtle shadow</Paper>
  <Paper elevation={2}>Light shadow</Paper>
  <Paper elevation={3}>Medium shadow</Paper>
  <Paper elevation={4}>Strong shadow</Paper>
  <Paper elevation={5}>Very strong</Paper>
  <Paper elevation={6}>Maximum depth</Paper>
</div>
```

## Padding

### Token-based Padding

```tsx
<Paper padding="none">No padding</Paper>
<Paper padding="sm">Small padding</Paper>
<Paper padding="md">Medium padding (default)</Paper>
<Paper padding="lg">Large padding</Paper>
<Paper padding="xl">Extra large padding</Paper>
```

### Custom Padding

```tsx
{/* Numeric values (pixels) */}
<Paper padding={24}>24px padding</Paper>

{/* CSS units */}
<Paper padding="2rem">2rem padding</Paper>
<Paper padding="clamp(1rem, 2vw, 3rem)">Fluid padding</Paper>
```

## Border Radius

```tsx
<Paper rounded="none">Sharp corners</Paper>
<Paper rounded="sm">Small radius</Paper>
<Paper rounded="md">Medium radius (default)</Paper>
<Paper rounded="lg">Large radius</Paper>
<Paper rounded="xl">Extra large radius</Paper>
<Paper rounded="full">Fully rounded</Paper>
```

## Hoverable

Add interactive hover effects with scale and shadow transitions:

```tsx
<Paper
  hoverable
  onClick={() => console.log("clicked")}
  className="cursor-pointer"
>
  Click me!
</Paper>
```

## Layout Options

### Centered

```tsx
<Paper centered>Horizontally centered content</Paper>
```

### Max Width

Constrain the maximum width:

```tsx
<Paper maxWidth="sm">Small max width</Paper>
<Paper maxWidth="md">Medium max width</Paper>
<Paper maxWidth="lg">Large max width</Paper>
<Paper maxWidth="xl">Extra large</Paper>
<Paper maxWidth="2xl">2X large</Paper>
<Paper maxWidth="full">Full width</Paper>
```

## Common Patterns

### Card Layout

```tsx
<Paper elevation={2} padding="lg" rounded="lg">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground mb-4">Card description goes here</p>
  <button>Action</button>
</Paper>
```

### Image Card

```tsx
<Paper padding="none" rounded="lg" elevation={3}>
  <img src="/image.jpg" alt="..." className="w-full rounded-t-lg" />
  <div className="p-4">
    <h3>Image Title</h3>
    <p>Image description</p>
  </div>
</Paper>
```

### Dashboard Widget

```tsx
<Paper variant="gradient" elevation={2} padding="lg" hoverable>
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm text-muted-foreground">Total Users</p>
      <p className="text-3xl font-bold">1,234</p>
    </div>
    <UsersIcon className="w-8 h-8 text-primary" />
  </div>
</Paper>
```

### Modal Container

```tsx
<Paper
  variant="glass"
  elevation={5}
  padding="xl"
  rounded="xl"
  centered
  maxWidth="md"
>
  <h2>Modal Title</h2>
  <p>Modal content...</p>
</Paper>
```

## AsChild Pattern

Render as a different element while preserving Paper styles:

```tsx
<Paper asChild variant="outlined" padding="lg">
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</Paper>

<Paper asChild hoverable>
  <a href="/profile">
    View Profile
  </a>
</Paper>
```

## API Reference

### Props

| Prop        | Type                                                                     | Default    | Description              |
| ----------- | ------------------------------------------------------------------------ | ---------- | ------------------------ |
| `variant`   | `"filled"` \| `"outlined"` \| `"gradient"` \| `"glass"`                  | `"filled"` | Visual style variant     |
| `elevation` | `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`                            | `1`        | Shadow depth level       |
| `padding`   | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `number` \| `string` | `"md"`     | Internal padding         |
| `rounded`   | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"full"`             | `"md"`     | Border radius            |
| `hoverable` | `boolean`                                                                | `false`    | Enable hover effects     |
| `centered`  | `boolean`                                                                | `false`    | Center horizontally      |
| `maxWidth`  | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"2xl"` \| `"full"`              | -          | Maximum width constraint |
| `asChild`   | `boolean`                                                                | `false`    | Render as child element  |
| `children`  | `ReactNode`                                                              | -          | Content to display       |
| `className` | `string`                                                                 | -          | Additional CSS classes   |

### Extends

The Paper component extends `React.HTMLAttributes<HTMLDivElement>`, so you can use all standard div props like `onClick`, `onMouseEnter`, `style`, etc.

## Accessibility

The Paper component:

- Uses semantic HTML (`<div>` by default or custom element with `asChild`)
- Inherits all ARIA attributes via props spreading
- Supports keyboard navigation when interactive
- Maintains proper focus management

Add appropriate ARIA labels for interactive papers:

```tsx
<Paper
  hoverable
  onClick={handleClick}
  role="button"
  tabIndex={0}
  aria-label="Open details"
>
  Interactive card
</Paper>
```

## Styling

### Custom Classes

```tsx
<Paper className="shadow-custom border-custom">Custom styled paper</Paper>
```

### Custom Styles

```tsx
<Paper
  style={{
    background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    border: "2px dashed var(--primary)",
  }}
>
  Custom styled content
</Paper>
```

### Tailwind Utilities

```tsx
<Paper className="sm:elevation-2 md:elevation-4 lg:elevation-6">
  Responsive elevation
</Paper>

<Paper className="hover:scale-105 transition-transform">
  Custom hover effect
</Paper>
```

## Dark Mode

Paper automatically adapts to dark mode:

```tsx
{
  /* Light: white background
    Dark: dark surface with adjusted shadows */
}
<Paper variant="filled">Auto-adapts to theme</Paper>;

{
  /* Glass variant works beautifully in both themes */
}
<Paper variant="glass">Glass effect in any theme</Paper>;
```

## Best Practices

1. **Use appropriate elevation**: Higher elevations for modals, lower for cards
2. **Match variant to context**: Glass for modern UIs, outlined for minimal designs
3. **Consider padding**: Remove padding for full-bleed images or custom layouts
4. **Combine with other components**: Works great with Card subcomponents
5. **Performance**: Avoid excessive elevation on many elements
6. **Accessibility**: Add proper ARIA labels for interactive papers
7. **Responsive design**: Use responsive classes for padding and elevation

## Related Components

- [Card](../Card/README.md) - Structured card with header, content, and footer
- [Container](../Container/README.md) - Page-level container with max-width
- [Section](../Section/README.md) - Semantic page sections
- [Badge](../Badge/README.md) - Small status indicators

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { PaperProps, PaperVariant, PaperElevation } from "saha-ui";

const customPaper: PaperProps = {
  variant: "glass",
  elevation: 4,
  padding: "lg",
  hoverable: true,
};
```
