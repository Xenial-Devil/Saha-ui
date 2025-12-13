# Drag & Drop

A flexible, production‑oriented drag & drop system for React applications. This module provides low‑level primitives that can be composed to build lists, boards, trees, editors, and complex multi‑selection workflows while keeping authoritative state in your application.

---

## Features

- Mouse, touch, pointer, and keyboard drag support
- Controlled containers and predictable state updates
- Cross‑container moves and reordering
- Multi‑selection and box selection
- Drag overlays and debug visualization
- Tree (nested) drag & drop with depth constraints
- Virtualized lists for large datasets
- Extensible architecture with analytics and undo/redo hooks

---

## Installation

```bash
npm install saha-ui
```

```tsx
import { DragDropProvider, DroppableContainer, DraggableItem } from "saha-ui";
```

---

## Quick Start

A minimal controlled list with reordering:

```tsx
function Example() {
  const [items, setItems] = useState([
    { id: "1", label: "A" },
    { id: "2", label: "B" },
  ]);

  return (
    <DragDropProvider>
      <DroppableContainer
        id="list"
        items={items}
        onDrop={(e) => {
          setItems((prev) => {
            const copy = [...prev];
            const [moved] = copy.splice(e.sourceIndex, 1);
            copy.splice(e.targetIndex, 0, moved);
            return copy;
          });
        }}
      >
        {(item, index) => (
          <DraggableItem id={item.id} index={index} item={item}>
            <div className="p-3 bg-white rounded">{item.label}</div>
          </DraggableItem>
        )}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

---

## Core Components

### DragDropProvider

Wraps the drag-enabled subtree and manages global drag state.

**Props**

| Prop              | Type                                                | Default                       | Description                       |
| ----------------- | --------------------------------------------------- | ----------------------------- | --------------------------------- |
| `children`        | `ReactNode`                                         | —                             | Drag-enabled subtree              |
| `sensors`         | `('mouse' \| 'touch' \| 'pointer' \| 'keyboard')[]` | `['mouse','touch','pointer']` | Enabled input sensors             |
| `dragThreshold`   | `number`                                            | `5`                           | Minimum pixels before drag starts |
| `autoScroll`      | `boolean`                                           | `true`                        | Enable auto-scroll near edges     |
| `autoScrollSpeed` | `number`                                            | `10`                          | Auto-scroll speed in px           |
| `enableMultiDrag` | `boolean`                                           | `false`                       | Enable multi-item dragging        |
| `debug`           | `boolean`                                           | `false`                       | Enable internal debug state       |


---

### DroppableContainer

A controlled container that renders an array of items and accepts drops.

**Props**

| Prop          | Type                                   | Default      | Description                      |
| ------------- | -------------------------------------- | ------------ | -------------------------------- |
| `id`          | `string`                               | —            | Unique container id              |
| `items`       | `T[]`                                  | —            | Items rendered by this container |
| `onDrop`      | `(event: DropEvent) => void`           | —            | Drop handler                     |
| `direction`   | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Layout direction                 |
| `accepts`     | `string[]`                             | —            | Allowed draggable item types     |
| `disabled`    | `boolean`                              | `false`      | Disable dropping                 |
| `renderEmpty` | `() => ReactNode`                      | —            | Custom empty state               |
| `className`   | `string`                               | —            | Container styling                |

Children are rendered via a function:

```tsx
(item, index) => ReactNode;
```


Children are rendered via a function:

```tsx
(item, index) => ReactNode;
```

---

### DraggableItem

Wraps an item and makes it draggable.

**Props**

| Prop          | Type        | Default | Description                           |
| ------------- | ----------- | ------- | ------------------------------------- |
| `id`          | `string`    | —       | Unique item id                        |
| `index`       | `number`    | —       | Index within container                |
| `item`        | `any`       | —       | Item payload                          |
| `type`        | `string`    | —       | Optional type for `accepts` filtering |
| `containerId` | `string`    | —       | Source container id                   |
| `disabled`    | `boolean`   | `false` | Disable dragging                      |
| `dragHandle`  | `boolean`   | `false` | Require `DragHandle` to start drag    |
| `preview`     | `ReactNode` | —       | Custom drag preview                   |
| `className`   | `string`    | —       | Wrapper styling                       |

---

### DragOverlay

Renders a floating preview that follows the pointer during drag.

```tsx
<DragOverlay>
  <div className="p-3 shadow rounded">Preview</div>
</DragOverlay>
```

---

## Advanced Components

### SelectionManager

Adds multi-selection support (Ctrl/Cmd, Shift, box selection).

**Props**

| Prop                      | Type                         | Default | Description                   |
| ------------------------- | ---------------------------- | ------- | ----------------------------- |
| `children`                | `ReactNode`                  | —       | Selection-enabled subtree     |
| `items`                   | `any[]`                      | —       | Items available for selection |
| `selectedIds`             | `string[]`                   | —       | Controlled selected ids       |
| `onSelectionChange`       | `(ids: Set<string>) => void` | —       | Selection callback            |
| `enabled`                 | `boolean`                    | `true`  | Enable selection system       |
| `enableBoxSelection`      | `boolean`                    | `true`  | Drag-to-select                |
| `enableKeyboardShortcuts` | `boolean`                    | `true`  | Ctrl/Cmd+A, Esc               |
| `className`               | `string`                     | —       | Wrapper styling               |

---

### TreeView

Drag & drop tree with expandable nodes and depth constraints.

**Props**

| Prop          | Type                          | Default | Description                 |
| ------------- | ----------------------------- | ------- | --------------------------- |
| `items`       | `TreeItem[]`                  | —       | Tree data                   |
| `onReorder`   | `(items: TreeItem[]) => void` | —       | Called with rebuilt tree    |
| `onExpand`    | `(id: string) => void`        | —       | Node expand callback        |
| `onCollapse`  | `(id: string) => void`        | —       | Node collapse callback      |
| `constraints` | `NestedDragConstraints`       | —       | Max depth and nesting rules |
| `indentSize`  | `number`                      | `20`    | Indentation per depth       |
| `showLines`   | `boolean`                     | `true`  | Show tree guide lines       |
| `className`   | `string`                      | —       | Container styling           |

---

### VirtualList

Virtualized drag-enabled list for large datasets.

**Props**

| Prop              | Type                                  | Default | Description          |
| ----------------- | ------------------------------------- | ------- | -------------------- |
| `items`           | `T[]`                                 | —       | Items to render      |
| `itemHeight`      | `number \| (index: number) => number` | —       | Item height          |
| `containerHeight` | `number`                              | —       | Viewport height      |
| `renderItem`      | `(item, index, virtual) => ReactNode` | —       | Item renderer        |
| `onReorder`       | `(items: T[]) => void`                | —       | Reorder callback     |
| `overscan`        | `number`                              | `3`     | Extra items rendered |
| `className`       | `string`                              | —       | Container styling    |

---

## Accessibility

- Keyboard dragging supported (arrow keys, Enter/Escape)
- Screen-reader announcements via provider hooks
- Focus is not hijacked; application controls focus restoration
- Selection and drag states are visually indicated

---

## Performance

- Keep containers controlled (source of truth in parent state)
- Memoize item renders (`React.memo`)
- Use `VirtualList` for large datasets
- Avoid heavy work in `onDragMove`

---

## Best Practices

1. Treat drag & drop as a state transition, not a side effect
2. Keep `items` arrays canonical in parent state
3. Use `type` + `accepts` for explicit drop rules
4. Prefer virtualization for large lists
5. Avoid DOM-based assumptions when combining features

---

## Troubleshooting

**Drag does not start**

- Check `disabled` and `dragThreshold`
- Ensure no overlay blocks pointer events

**Wrong index after drop**

- Remove item from source list before inserting
- Adjust index when moving within the same container

**Selection behaves incorrectly in virtual lists**

- Disable box selection or use data-driven selection logic

---

## Migration (Short)

**From plain lists / HTML drag**

- Replace DOM mutations with controlled `items` state
- Handle reordering in `onDrop`

**From other drag libraries**

- Map their `onDragEnd` → `onDrop`
- Move internal drag state into your app state

---

## Known Limitations

- Box selection is DOM-based and not virtualization-safe
- Virtualized drag assumes stable indexes
- Tree depth is inferred from order, not explicit intent
