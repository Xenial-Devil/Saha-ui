# VirtualList

Virtualized, drag-enabled list rendering for large datasets.

`VirtualList` only renders items that are visible in the viewport (plus overscan), which keeps scrolling and reordering fast even with thousands of rows.

This top-level component re-exports the implementation from DragDrop:

- `VirtualList`
- `useVirtualScroll`

## Installation

```tsx
import { VirtualList, useVirtualScroll } from "saha-ui";
```

## Basic Usage

```tsx
import { useState } from "react";
import { VirtualList } from "saha-ui";

type Row = { id: string; label: string };

export default function Example() {
  const [items, setItems] = useState<Row[]>(
    Array.from({ length: 2000 }, (_, i) => ({
      id: `row-${i}`,
      label: `Item ${i + 1}`,
    })),
  );

  return (
    <VirtualList
      items={items}
      itemHeight={44}
      containerHeight={400}
      overscan={4}
      onReorder={setItems}
      renderItem={(item) => (
        <div className="rounded-md border border-border bg-card p-3">
          {item.label}
        </div>
      )}
    />
  );
}
```

## Variable Item Height

```tsx
<VirtualList
  items={items}
  containerHeight={520}
  itemHeight={(index) => (index % 5 === 0 ? 64 : 44)}
  renderItem={(item) => <RowCard item={item} />}
/>
```

## Props

| Prop                | Type                                                              | Default | Description                                           |
| ------------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------------------- |
| `items`             | `T[]`                                                             | -       | Data source to render. `T` must include `id: string`. |
| `itemHeight`        | `number \| (index: number) => number`                             | -       | Fixed or computed item height.                        |
| `containerHeight`   | `number`                                                          | -       | Viewport height in pixels.                            |
| `renderItem`        | `(item: T, index: number, virtualItem: VirtualItem) => ReactNode` | -       | Render function for each visible row.                 |
| `onReorder`         | `(items: T[]) => void`                                            | -       | Called with reordered items after drag-drop.          |
| `overscan`          | `number`                                                          | `3`     | Extra rows rendered above/below viewport.             |
| `className`         | `string`                                                          | -       | Additional container classes.                         |
| `estimatedItemSize` | `number`                                                          | `50`    | Reserved API field for sizing strategies.             |
| `onScroll`          | `(scrollTop: number, scrollHeight: number) => void`               | -       | Scroll callback for analytics or lazy triggers.       |

## `useVirtualScroll` Hook

Use this hook when you need virtualization logic without the drag-drop wrapper.

```tsx
import { useVirtualScroll } from "saha-ui";

const { visibleItems, totalHeight, handleScroll, scrollToIndex } =
  useVirtualScroll({
    itemCount: items.length,
    itemHeight: 44,
    containerHeight: 400,
    overscan: 4,
  });
```

### Hook Options

| Option            | Type                                  | Default | Description                      |
| ----------------- | ------------------------------------- | ------- | -------------------------------- |
| `itemCount`       | `number`                              | -       | Total number of rows.            |
| `itemHeight`      | `number \| (index: number) => number` | -       | Fixed or computed row height.    |
| `containerHeight` | `number`                              | -       | Viewport height in pixels.       |
| `overscan`        | `number`                              | `3`     | Extra rows above/below viewport. |

### Hook Return Values

- `items`: computed virtual items metadata.
- `visibleItems`: slice of virtual items currently rendered.
- `totalHeight`: full scrollable height.
- `startIndex` / `endIndex`: visible range with overscan.
- `scrollTop`: current scroll offset.
- `handleScroll`: attach to the scroll container.
- `scrollToIndex(index, align)`: programmatic navigation (`start`, `center`, `end`).

## Best Practices

1. Keep row heights stable when possible for smoother scroll behavior.
2. Memoize expensive row rendering for large lists.
3. Use `overscan` between `2` and `6` for balanced UX and performance.
4. Keep authoritative item state in parent components.
5. Ensure each item has a stable, unique `id`.

## Notes

- `VirtualList` includes drag-drop behavior through DragDrop internals.
- For static virtualization without drag interactions, use `useVirtualScroll` directly.
