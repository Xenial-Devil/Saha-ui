# 🎯 Drag and Drop Component - Advanced Features

A comprehensive, production-ready drag-and-drop system with full accessibility support, multiple input methods, and enterprise-level features including tree structures, virtualization, multi-selection, undo/redo, and collaboration support.

## 📦 Installation

```bash
npm install saha-ui
```

## 🚀 Quick Start

```tsx
import { DragDropProvider, DroppableContainer, DraggableItem } from "saha-ui";

function App() {
  const [items, setItems] = useState([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ]);

  return (
    <DragDropProvider>
      <DroppableContainer
        id="list-1"
        items={items}
        onDrop={(event) => {
          const newItems = reorderArray(
            items,
            event.sourceIndex,
            event.targetIndex
          );
          setItems(newItems);
        }}
      >
        {items.map((item, index) => (
          <DraggableItem key={item.id} id={item.id} index={index} item={item}>
            <div className="p-4 bg-white rounded shadow">{item.name}</div>
          </DraggableItem>
        ))}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

## 🌟 Core Features

### ✅ BASIC (All Implemented)

- [x] Single list reordering
- [x] Multiple independent lists
- [x] Horizontal and vertical dragging
- [x] Mouse, touch, and pointer events
- [x] Visual feedback during drag
- [x] Drag threshold
- [x] Controlled and uncontrolled state

### ✅ INTERMEDIATE (All Implemented)

- [x] Animations and transitions
- [x] Drag handles
- [x] Custom drag previews
- [x] Long-press activation
- [x] Multiple containers
- [x] Rich event system

### ✅ ADVANCED (All Implemented)

- [x] Performance optimization
- [x] Full accessibility (ARIA, screen readers)
- [x] Keyboard navigation
- [x] Axis locking (horizontal/vertical)
- [x] Auto-scroll
- [x] Portal-based overlays

### ✅ EXPERT (NEW - All Implemented)

- [x] **Tree structures with nested drag-drop**
- [x] **Snap to grid**
- [x] **Multiple collision detection strategies**
- [x] **Undo/Redo history**
- [x] **Multi-item selection and bulk operations**
- [x] **Virtualization for 10,000+ items**
- [x] **Real-time collaboration support**
- [x] **Plugin system for extensibility**
- [x] **Analytics and debugging tools**

---

## 🎨 Advanced Component Examples

### 1. Tree Structure (File Explorer)

```tsx
import { DragDropProvider, TreeView } from "saha-ui";

function FileExplorer() {
  const [files, setFiles] = useState([
    {
      id: "1",
      label: "Documents",
      children: [
        { id: "2", label: "Report.pdf" },
        { id: "3", label: "Presentation.pptx" },
      ],
    },
    {
      id: "4",
      label: "Images",
      children: [
        { id: "5", label: "Photo1.jpg" },
        { id: "6", label: "Photo2.jpg" },
      ],
    },
  ]);

  return (
    <DragDropProvider>
      <TreeView
        items={files}
        onReorder={setFiles}
        onExpand={(id) => console.log("Expanded:", id)}
        onCollapse={(id) => console.log("Collapsed:", id)}
        constraints={{
          maxDepth: 5,
          allowNesting: true,
          restrictRootLevel: false,
        }}
        renderItem={(item, depth) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.label}</span>
          </div>
        )}
        indentSize={24}
        showLines={true}
      />
    </DragDropProvider>
  );
}
```

### 2. Virtualized List (Large Datasets)

```tsx
import { DragDropProvider, VirtualList } from "saha-ui";

function LargeList() {
  const [items, setItems] = useState(
    Array.from({ length: 10000 }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i + 1}`,
    }))
  );

  return (
    <DragDropProvider>
      <VirtualList
        items={items}
        itemHeight={50}
        containerHeight={600}
        onReorder={setItems}
        overscan={5}
        renderItem={(item, index, virtualItem) => (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <span className="text-sm text-muted-foreground">#{index + 1}</span>
            <span className="font-medium">{item.name}</span>
          </div>
        )}
        onScroll={(scrollTop, scrollHeight) => {
          console.log(`Scrolled to ${scrollTop}px of ${scrollHeight}px`);
        }}
      />
    </DragDropProvider>
  );
}
```

### 3. Multi-Selection with Keyboard Shortcuts

```tsx
import { DragDropProvider, SelectionManager, SelectionBadge } from "saha-ui";

function MultiSelectList() {
  const [items, setItems] = useState([
    { id: "1", name: "Task 1" },
    { id: "2", name: "Task 2" },
    { id: "3", name: "Task 3" },
  ]);

  return (
    <DragDropProvider enableMultiDrag={true}>
      <SelectionManager
        onSelectionChange={(selectedIds) => {
          console.log("Selected:", Array.from(selectedIds));
        }}
      >
        <DroppableContainer id="tasks" items={items} onDrop={handleDrop}>
          {items.map((item, index) => (
            <DraggableItem key={item.id} id={item.id} index={index} item={item}>
              <div className="relative p-4 bg-white rounded shadow">
                <SelectionBadge itemId={item.id} />
                {item.name}
              </div>
            </DraggableItem>
          ))}
        </DroppableContainer>
      </SelectionManager>
    </DragDropProvider>
  );
}

// Keyboard shortcuts automatically enabled:
// - Click: Select single item
// - Ctrl/Cmd + Click: Toggle item selection
// - Shift + Click: Range selection
// - Ctrl/Cmd + A: Select all
// - Escape: Clear selection
```

### 4. Undo/Redo Support

```tsx
import { DragDropProvider, useDragDropContext } from "saha-ui";

function UndoableList() {
  const [items, setItems] = useState([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
  ]);

  return (
    <DragDropProvider enableUndo={true} maxHistory={50}>
      <UndoControls />
      <DroppableContainer
        id="list"
        items={items}
        onDrop={(event) => {
          const newItems = reorderArray(
            items,
            event.sourceIndex,
            event.targetIndex
          );
          setItems(newItems);
          // Automatically saved to history
        }}
      >
        {/* ... items ... */}
      </DroppableContainer>
    </DragDropProvider>
  );
}

function UndoControls() {
  const { historyState, undo, redo } = useDragDropContext();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          const previous = undo();
          if (previous) {
            // Apply previous state
          }
        }}
        disabled={historyState?.past.length === 0}
      >
        Undo
      </button>
      <button
        onClick={() => {
          const next = redo();
          if (next) {
            // Apply next state
          }
        }}
        disabled={historyState?.future.length === 0}
      >
        Redo
      </button>
    </div>
  );
}
```

### 5. Snap to Grid

```tsx
import { DragDropProvider } from "saha-ui";

function GridLayout() {
  return (
    <DragDropProvider
      snapToGrid={{
        gridSize: 20,
        offset: { x: 10, y: 10 },
      }}
    >
      <DroppableContainer id="grid" items={items}>
        {/* Items snap to 20px grid with 10px offset */}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

### 6. Custom Collision Detection

```tsx
import { DragDropProvider } from "saha-ui";

function CustomCollision() {
  return (
    <DragDropProvider
      collisionDetection={{
        strategy: "rectIntersection", // "closestCenter" | "closestCorners" | "pointerWithin" | "rectIntersection"
        threshold: 0.5, // 50% overlap required
      }}
    >
      <DroppableContainer id="list" items={items}>
        {/* Uses rectangle intersection for drop detection */}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

### 7. Debug Overlay

```tsx
import { DragDropProvider, DebugOverlay } from "saha-ui";

function DebugApp() {
  return (
    <DragDropProvider debug={true}>
      <DebugOverlay
        enabled={process.env.NODE_ENV === "development"}
        position="top-right"
        showCollisionRects={true}
        showDragPath={true}
        showPerformanceMetrics={true}
      />
      <DroppableContainer id="list" items={items}>
        {/* Your draggable items */}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

### 8. Analytics Tracking

```tsx
import { DragDropProvider } from "saha-ui";

function AnalyticsApp() {
  return (
    <DragDropProvider
      onAnalytics={(analytics) => {
        console.log("Total drags:", analytics.totalDrags);
        console.log("Successful drops:", analytics.successfulDrops);
        console.log("Cancelled drags:", analytics.cancelledDrags);
        console.log("Average duration:", analytics.averageDragDuration);
        console.log("Average distance:", analytics.averageDragDistance);
        console.log("Most dragged:", analytics.mostDraggedItems);

        // Send to your analytics service
        window.gtag?.("event", "drag_drop_analytics", analytics);
      }}
    >
      {/* Your components */}
    </DragDropProvider>
  );
}
```

### 9. Plugin System

```tsx
import { DragDropProvider, DragDropPlugin } from "saha-ui";

const loggingPlugin: DragDropPlugin = {
  name: "logging",
  version: "1.0.0",
  onDragStart: (event) => {
    console.log("[Plugin] Drag started:", event.item.id);
  },
  onDrop: (event) => {
    console.log("[Plugin] Dropped at index:", event.targetIndex);
  },
  onDragCancel: (event) => {
    console.log("[Plugin] Drag cancelled:", event.reason);
  },
};

const hapticPlugin: DragDropPlugin = {
  name: "haptic-feedback",
  version: "1.0.0",
  onDragStart: () => {
    navigator.vibrate?.(10);
  },
  onDrop: () => {
    navigator.vibrate?.([20, 10, 20]);
  },
};

function PluginApp() {
  return (
    <DragDropProvider plugins={[loggingPlugin, hapticPlugin]}>
      {/* Your components */}
    </DragDropProvider>
  );
}
```

### 10. Collaboration Support

```tsx
import { DragDropProvider, useDragDropContext } from "saha-ui";

function CollaborativeEditor() {
  return (
    <DragDropProvider
      collaboration={{
        enabled: true,
        userId: "user-123",
        onLockAcquired: (itemId, userId) => {
          console.log(`${userId} is dragging ${itemId}`);
          // Show lock indicator to other users
        },
        onLockReleased: (itemId) => {
          console.log(`${itemId} is available again`);
        },
        onConflict: (itemId, operation) => {
          console.warn("Conflict detected:", itemId);
          // Handle conflict resolution
        },
      }}
    >
      {/* Your collaborative interface */}
    </DragDropProvider>
  );
}
```

---

## 🎛️ API Reference

### DragDropProvider Props

```typescript
interface EnhancedDragDropContextProps {
  // Basic
  children: ReactNode;
  sensors?: DragSensor[];
  autoScroll?: boolean;
  autoScrollSpeed?: number;
  autoScrollThreshold?: number;
  dragThreshold?: number;
  announcements?: {
    onDragStart?: (event: DragStartEvent) => string;
    onDragOver?: (event: DragOverEvent) => string;
    onDragEnd?: (event: DropEvent) => string;
    onDragCancel?: (event: DragCancelEvent) => string;
  };

  // Advanced
  snapToGrid?: SnapToGridConfig;
  collisionDetection?: CollisionDetectionConfig;
  enableUndo?: boolean;
  maxHistory?: number;
  enableMultiDrag?: boolean;
  plugins?: DragDropPlugin[];
  onAnalytics?: (analytics: DragAnalytics) => void;
  debug?: boolean;
}
```

### TreeView Props

```typescript
interface TreeViewProps<T extends TreeItem = TreeItem> {
  items: T[];
  onReorder?: (items: T[]) => void;
  onExpand?: (itemId: string) => void;
  onCollapse?: (itemId: string) => void;
  renderItem?: (item: T, depth: number) => React.ReactNode;
  constraints?: NestedDragConstraints;
  className?: string;
  indentSize?: number;
  showLines?: boolean;
}
```

### VirtualList Props

```typescript
interface VirtualListProps<T = any> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  onReorder?: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    virtualItem: VirtualItem
  ) => React.ReactNode;
  overscan?: number;
  className?: string;
  estimatedItemSize?: number;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
}
```

### SelectionManager Props

```typescript
interface SelectionManagerProps {
  children: React.ReactNode;
  enabled?: boolean;
  className?: string;
  selectionClassName?: string;
  onSelectionChange?: (selectedIds: Set<string>) => void;
}
```

---

## 🔧 Utility Functions

```typescript
// Tree operations
flattenTree<T>(items: T[], depth?: number): Array<T & { depth: number }>;
buildTree<T>(items: T[]): T[];
isDescendant(itemId: string, ancestorId: string, items: Map): boolean;
getDepth(itemId: string, items: Map): number;
canDropIntoItem(draggedId: string, targetId: string, items: Map, maxDepth?: number): boolean;

// Multi-selection
getSelectedIndices(selectedIds: Set<string>, items: any[]): number[];
getItemsBetween(startIndex: number, endIndex: number, items: any[]): string[];
reorderMultipleItems<T>(array: T[], indices: number[], targetIndex: number): T[];

// Virtualization
calculateVirtualItems(
  scrollTop: number,
  containerHeight: number,
  itemCount: number,
  itemHeight: number | ((index: number) => number),
  overscan?: number
): VirtualItem[];

// Performance
throttle<T>(func: T, wait: number): (...args: any[]) => void;
debounce<T>(func: T, wait: number): (...args: any[]) => void;
rafThrottle<T>(func: T): (...args: any[]) => void;

// Analytics
calculateDragDistance(start: DragPosition, end: DragPosition): number;
createAnalyticsEvent(type: string, data: Record<string, any>): void;

// Validation
validateDrop(sourceId: string, targetId: string, accepts?: string[], itemType?: string): boolean;
```

---

## 🎯 Performance Optimization

### Virtualization for Large Lists (10,000+ items)

```tsx
import { VirtualList } from "saha-ui";

<VirtualList
  items={largeDataset}
  itemHeight={50}
  containerHeight={600}
  overscan={5} // Render 5 extra items above/below viewport
  renderItem={(item) => <div>{item.name}</div>}
/>;
```

### Request Animation Frame Throttling

```tsx
import { rafThrottle } from "saha-ui";

const handleDragMove = rafThrottle((position) => {
  // Automatically throttled to 60fps
  updatePosition(position);
});
```

### Memoization

```tsx
const memoizedItems = useMemo(() => {
  return items.map((item) => ({
    ...item,
    computed: expensiveCalculation(item),
  }));
}, [items]);
```

---

## ♿ Accessibility Features

- **Full ARIA support** (roles, labels, descriptions)
- **Keyboard navigation** (Arrow keys, Space, Enter, Escape)
- **Screen reader announcements** (Drag start, move, drop, cancel)
- **Focus management** (Visual focus indicators, focus trapping)
- **Live regions** (Status updates during drag operations)
- **High contrast mode** (Fully compatible)

### Keyboard Shortcuts

| Action       | Shortcut               |
| ------------ | ---------------------- |
| Start drag   | `Space` or `Enter`     |
| Move item    | `Arrow keys`           |
| Drop item    | `Space` or `Enter`     |
| Cancel drag  | `Escape`               |
| Select item  | `Click`                |
| Multi-select | `Ctrl/Cmd + Click`     |
| Range select | `Shift + Click`        |
| Select all   | `Ctrl/Cmd + A`         |
| Undo         | `Ctrl/Cmd + Z`         |
| Redo         | `Ctrl/Cmd + Shift + Z` |

---

## 🚀 Advanced Use Cases

### 1. Kanban Board

```tsx
<DragDropProvider enableMultiDrag={true}>
  <SelectionManager>
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column) => (
        <DroppableContainer key={column.id} id={column.id} items={column.items}>
          {column.items.map((item, index) => (
            <DraggableItem key={item.id} id={item.id} index={index} item={item}>
              <Card>{item.title}</Card>
            </DraggableItem>
          ))}
        </DroppableContainer>
      ))}
    </div>
  </SelectionManager>
</DragDropProvider>
```

### 2. Form Builder

```tsx
<DragDropProvider
  snapToGrid={{ gridSize: 10 }}
  enableUndo={true}
  maxHistory={100}
>
  <TreeView
    items={formComponents}
    onReorder={setFormComponents}
    constraints={{ maxDepth: 3 }}
  />
</DragDropProvider>
```

### 3. Data Table

```tsx
<DragDropProvider enableMultiDrag={true}>
  <VirtualList
    items={tableData}
    itemHeight={40}
    containerHeight={500}
    renderItem={(row) => <TableRow data={row} />}
  />
</DragDropProvider>
```

---

## 📊 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 13+)
- Mobile: ✅ Touch events supported

---

## 🐛 Debugging

Enable debug mode during development:

```tsx
<DragDropProvider debug={true}>
  <DebugOverlay
    enabled={true}
    showPerformanceMetrics={true}
    showDragPath={true}
  />
</DragDropProvider>
```

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.
