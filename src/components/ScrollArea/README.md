# ScrollArea

A customizable scroll area component with styled scrollbars, auto-hide functionality, and smooth scrolling. Built on top of Radix UI's ScrollArea primitive.

## Features

- 📜 Custom styled scrollbars
- 🎨 Multiple visual variants
- ↔️ Vertical, horizontal, or both orientations
- 👁️ Auto-hide scrollbars
- ✨ Smooth scrolling behavior
- 🎯 Configurable auto-hide delay
- ♿ Fully accessible
- 📱 Touch-friendly

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { ScrollArea } from "saha-ui";

function MyComponent() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>Item {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## Orientations

### Vertical (Default)

```tsx
<ScrollArea orientation="vertical" className="h-72">
  <div>{/* Long vertical content */}</div>
</ScrollArea>
```

### Horizontal

```tsx
<ScrollArea orientation="horizontal" className="w-96">
  <div className="flex gap-4 w-max">
    {items.map((item) => (
      <div key={item.id} className="w-48">
        {item.content}
      </div>
    ))}
  </div>
</ScrollArea>
```

### Both

```tsx
<ScrollArea orientation="both" className="h-96 w-96">
  <div className="min-w-[800px] min-h-[800px]">
    {/* Content larger than container */}
  </div>
</ScrollArea>
```

## Auto-Hide Scrollbar

```tsx
<ScrollArea autoHide={true} autoHideDelay={1000} className="h-72">
  {content}
</ScrollArea>
```

## Hide Scrollbar Completely

```tsx
<ScrollArea hideScrollbar={true} className="h-72">
  {content}
</ScrollArea>
```

## Smooth Scrolling

```tsx
<ScrollArea smoothScroll={true} className="h-72">
  {content}
</ScrollArea>
```

## Common Patterns

### Code Editor Viewport

```tsx
<ScrollArea className="h-[600px] w-full font-mono text-sm">
  <pre>
    <code>{codeContent}</code>
  </pre>
</ScrollArea>
```

### Chat Messages

```tsx
<ScrollArea className="h-96 w-full p-4">
  <div className="space-y-4">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
      >
        <div className="bg-muted px-4 py-2 rounded-lg max-w-[70%]">
          {msg.content}
        </div>
      </div>
    ))}
  </div>
</ScrollArea>
```

### Sidebar Navigation

```tsx
<ScrollArea className="h-screen w-64 border-r">
  <nav className="p-4 space-y-2">
    {navigationItems.map((item) => (
      <Link
        key={item.id}
        href={item.href}
        className="block px-4 py-2 rounded hover:bg-muted"
      >
        {item.label}
      </Link>
    ))}
  </nav>
</ScrollArea>
```

### Data Table

```tsx
<ScrollArea className="h-[400px]" orientation="both">
  <table className="min-w-[800px]">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>{/* cells */}</tr>
      ))}
    </tbody>
  </table>
</ScrollArea>
```

## API Reference

### ScrollArea Props

| Prop            | Type                                       | Default      | Description                  |
| --------------- | ------------------------------------------ | ------------ | ---------------------------- |
| `variant`       | `string`                                   | `"default"`  | Visual style variant         |
| `orientation`   | `"vertical"` \| `"horizontal"` \| `"both"` | `"vertical"` | Scroll direction(s)          |
| `hideScrollbar` | `boolean`                                  | `false`      | Hide scrollbar completely    |
| `smoothScroll`  | `boolean`                                  | `true`       | Enable smooth scrolling      |
| `autoHide`      | `boolean`                                  | `true`       | Auto-hide when not scrolling |
| `autoHideDelay` | `number`                                   | `1000`       | Delay before hiding (ms)     |
| `className`     | `string`                                   | -            | Additional CSS classes       |
| `children`      | `ReactNode`                                | -            | Content to scroll            |

## Accessibility

- Preserves keyboard navigation
- Maintains focus management
- Announces scroll position to screen readers
- Supports platform scroll gestures

## Styling

### Custom Scrollbar Colors

```tsx
<ScrollArea className="h-72 [&_[data-radix-scroll-area-thumb]]:bg-primary">
  {content}
</ScrollArea>
```

## Best Practices

1. **Set container dimensions**: Always specify height/width
2. **Use appropriate orientation**: Match content flow
3. **Consider mobile**: Auto-hide works well on touch devices
4. **Performance**: Avoid nesting scroll areas
5. **Accessibility**: Ensure scrollable content is keyboard accessible

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Related Components

- [Paper](../Paper/README.md) - Container component
- [Card](../Card/README.md) - Card layouts

## TypeScript

```typescript
import type { ScrollAreaRootProps } from "saha-ui";
```
