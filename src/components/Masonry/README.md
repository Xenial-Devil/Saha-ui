# Masonry

A Pinterest-style masonry layout component for creating dynamic grid layouts with varying item heights. Perfect for image galleries, card grids, and content that needs fluid, responsive positioning.

## Features

- 📐 CSS Grid or JavaScript-based layout modes
- 📱 Responsive column configuration with breakpoints
- 🎨 Flexible gap spacing (7 preset sizes + custom values)
- ✨ Optional animation on mount
- 🎯 Custom item rendering
- 🧩 Column and item className customization
- ⚡ Performance optimized
- ♿ Accessible and semantic HTML

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Masonry } from "saha-ui";

function Gallery() {
  return (
    <Masonry columns={3} gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Masonry>
  );
}
```

## Columns Configuration

### Fixed Columns

```tsx
<Masonry columns={4} gap="lg">
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Masonry>
```

### Responsive Columns

Use breakpoint-based column configuration:

```tsx
<Masonry
  columns={{
    default: 1, // Mobile
    sm: 2, // 640px+
    md: 3, // 768px+
    lg: 4, // 1024px+
    xl: 5, // 1280px+
    "2xl": 6, // 1536px+
  }}
  gap="md"
>
  {items.map((item) => (
    <ImageCard key={item.id} image={item.image} />
  ))}
</Masonry>
```

## Gap Spacing

### Preset Gaps

```tsx
<Masonry gap="none">No gap</Masonry>
<Masonry gap="xs">Extra small gap</Masonry>
<Masonry gap="sm">Small gap</Masonry>
<Masonry gap="md">Medium gap (default)</Masonry>
<Masonry gap="lg">Large gap</Masonry>
<Masonry gap="xl">Extra large gap</Masonry>
<Masonry gap="2xl">2X large gap</Masonry>
```

### Custom Gap

```tsx
{/* Numeric (pixels) */}
<Masonry gap={32}>32px gap</Masonry>

{/* CSS units */}
<Masonry gap="2rem">2rem gap</Masonry>
<Masonry gap="clamp(1rem, 2vw, 3rem)">Fluid gap</Masonry>
```

## Layout Modes

### CSS Mode (Default)

Uses CSS Grid for optimal performance:

```tsx
<Masonry mode="css" columns={3} gap="md">
  {items}
</Masonry>
```

### JavaScript Mode

Uses JS-based layout calculation for better cross-browser support:

```tsx
<Masonry mode="js" columns={3} gap="md">
  {items}
</Masonry>
```

## Animation

### Animate on Mount

```tsx
<Masonry columns={4} gap="lg" animate={true} animationDelay={50}>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Masonry>
```

## Customization

### Column ClassName

```tsx
<Masonry columns={3} gap="md" columnClassName="bg-gray-100 p-2 rounded">
  {items}
</Masonry>
```

### Item ClassName

```tsx
<Masonry
  columns={3}
  gap="md"
  itemClassName="transform hover:scale-105 transition-transform"
>
  {items}
</Masonry>
```

### Custom Render Function

```tsx
<Masonry
  columns={3}
  gap="md"
  renderItem={(child, index) => (
    <div
      className="masonry-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {child}
    </div>
  )}
>
  {items}
</Masonry>
```

## Common Patterns

### Image Gallery

```tsx
<Masonry columns={{ default: 1, sm: 2, md: 3, lg: 4 }} gap="sm">
  {images.map((img) => (
    <img
      key={img.id}
      src={img.url}
      alt={img.alt}
      className="w-full rounded-lg"
    />
  ))}
</Masonry>
```

### Card Grid

```tsx
<Masonry columns={{ default: 1, md: 2, lg: 3 }} gap="lg" animate={true}>
  {posts.map((post) => (
    <Card key={post.id}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.excerpt}</p>
      </CardContent>
    </Card>
  ))}
</Masonry>
```

### Pinterest-style Board

```tsx
<Masonry
  columns={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
  gap="md"
  className="max-w-7xl mx-auto px-4"
  itemClassName="hover:opacity-90 transition-opacity"
>
  {pins.map((pin) => (
    <div key={pin.id} className="group relative">
      <img src={pin.image} alt={pin.title} className="w-full rounded-lg" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <button className="text-white">Save</button>
      </div>
    </div>
  ))}
</Masonry>
```

### Product Showcase

```tsx
<Masonry columns={{ default: 1, sm: 2, lg: 3, xl: 4 }} gap="xl">
  {products.map((product) => (
    <Paper key={product.id} elevation={2} padding="lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="font-semibold mb-2">{product.name}</h3>
      <p className="text-muted-foreground mb-4">${product.price}</p>
      <Button className="w-full">Add to Cart</Button>
    </Paper>
  ))}
</Masonry>
```

## API Reference

### MasonryProps

| Prop              | Type                                                                                          | Default | Description                                   |
| ----------------- | --------------------------------------------------------------------------------------------- | ------- | --------------------------------------------- |
| `columns`         | `number` \| `MasonryColumns`                                                                  | `3`     | Number of columns or responsive configuration |
| `gap`             | `"none"` \| `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"2xl"` \| `number` \| `string` | `"md"`  | Gap between items                             |
| `mode`            | `"css"` \| `"js"`                                                                             | `"css"` | Layout calculation mode                       |
| `animate`         | `boolean`                                                                                     | `false` | Animate items on mount                        |
| `animationDelay`  | `number`                                                                                      | `50`    | Delay between item animations (ms)            |
| `className`       | `string`                                                                                      | -       | Container CSS classes                         |
| `columnClassName` | `string`                                                                                      | -       | Column CSS classes                            |
| `itemClassName`   | `string`                                                                                      | -       | Item wrapper CSS classes                      |
| `renderItem`      | `(child, index) => ReactNode`                                                                 | -       | Custom item renderer                          |
| `children`        | `ReactNode`                                                                                   | -       | Items to display                              |

### MasonryColumns Type

```typescript
type MasonryColumns =
  | number
  | {
      default?: number;
      sm?: number; // 640px+
      md?: number; // 768px+
      lg?: number; // 1024px+
      xl?: number; // 1280px+
      "2xl"?: number; // 1536px+
    };
```

## Accessibility

- Uses semantic HTML structure
- Maintains natural reading order
- Supports keyboard navigation for interactive items
- Respects prefers-reduced-motion for animations

## Performance

- CSS mode uses native browser grid calculations
- Minimal JavaScript overhead
- Efficient re-renders with React memoization
- Optional animation system

## Best Practices

1. **Use responsive columns**: Adapt to different screen sizes
2. **Consistent item styling**: Keep items similar in width
3. **Optimize images**: Lazy load and compress images
4. **Consider gap spacing**: Balance between density and readability
5. **Animation sparingly**: Use animations for initial load, not frequent updates
6. **Test layout**: Verify with varying content heights

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers
- ⚠️ CSS mode requires CSS Grid support

## Related Components

- [Grid](../Grid/README.md) - Standard grid layouts
- [Paper](../Paper/README.md) - Container for masonry items
- [Card](../Card/README.md) - Structured content cards

## TypeScript

Full TypeScript support:

```typescript
import type { MasonryProps, MasonryColumns } from "saha-ui";

const config: MasonryColumns = {
  default: 1,
  md: 3,
  lg: 4,
};
```
