# Drag & Drop — Developer Guide

This document provides a concise, developer-focused reference for the Drag & Drop components located in `src/components/DragDrop`. It covers installation, recommended integration patterns, API references, performance and accessibility guidance, debugging tips, and recommended tests for production usage.

Purpose: this implementation is designed to be a flexible, production-ready building block for applications that need accessible, high-quality drag & drop interactions across mouse, touch, and keyboard inputs.

---

## Table of contents

- Overview
- Installation
- Quick start
- Core components & patterns
- API reference (props & events)
- Performance considerations
- Accessibility (A11y)
- Customization & theming
- Debugging & testing
- Contributing and versioning

---

## Overview

The DragDrop module provides three primary primitives:

- `DragDropProvider` — top-level context that manages sensors, global drag state and utilities such as auto-scroll and announcements.
- `DroppableContainer` — a region that renders an array of items and accepts drops.
- `DraggableItem` — an individual item that can be picked up, dragged and reordered or moved between containers.

These primitives are intentionally small and composable so you can build lists, grids, multi-container UIs and custom editors.

## Installation

Install the package (or use your local workspace package linking strategy during development):

```bash
npm install saha-ui
# or in development (from repo root)
# npm run build && npm link
```

Import the components in your app:

```tsx
import { DragDropProvider, DroppableContainer, DraggableItem } from "saha-ui";
```

## Quick start

A minimal example: controlled list with reordering.

```tsx
import React, { useState } from "react";
import { DragDropProvider, DroppableContainer, DraggableItem } from "saha-ui";

function reorder<T>(arr: T[], from: number, to: number) {
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function Example() {
  const [items, setItems] = useState([
    { id: "1", name: "A" },
    { id: "2", name: "B" },
  ]);

  return (
    <DragDropProvider>
      <DroppableContainer
        id="list"
        items={items}
        onDrop={(e) => {
          // `e.sourceIndex` and `e.targetIndex` are provided by the library
          setItems((s) => reorder(s, e.sourceIndex, e.targetIndex));
        }}
      >
        {(item, index) => (
          <DraggableItem key={item.id} id={item.id} index={index} item={item}>
            <div className="p-3 bg-white rounded shadow">{item.name}</div>
          </DraggableItem>
        )}
      </DroppableContainer>
    </DragDropProvider>
  );
}
```

## Core components & patterns

- `DragDropProvider` — wrap your drag/drop-enabled subtree. Configure sensors and high level options here.
- `DroppableContainer` — accepts `items` array and a render function. Keep this component controlled for predictability in large apps.
- `DraggableItem` — minimal wrapper that exposes `id`, `index`, `item` and accepts props for custom preview, drag handle and drag-disabled state.

Common patterns:

- Controlled list: keep `items` in parent state and update on `onDrop`.
- Cross-list moves: maintain separate arrays and use `onDrop` to transfer items between them.
- Custom preview: pass a `preview` prop to `DraggableItem` or use a global `DragOverlay`.

## API reference (summary)

This section documents the most commonly used props and events. For full types consult the TypeScript source in `src/components/DragDrop`.

# Drag & Drop — Developer Reference

Low-level, production-oriented drag & drop primitives used across the Saha UI system. This README is written for developers integrating the library into applications: it focuses on API, TypeScript types, copy‑paste examples, integration notes, performance, accessibility, testing and common troubleshooting.

--

Table of contents

- Overview
- Installation
- Quick start (copy-paste)
- Full examples (Basic, Advanced, Multi-Selection)
- API reference (props & events)
- TypeScript types (excerpt)
- Accessibility
- Performance
- Testing & debugging
- Troubleshooting
- Migration notes
- Contributing

--

## Overview

The package exports composable primitives:

- `DragDropProvider` — global context for drag state, sensors, auto-scroll and announcements
- `DroppableContainer` — controlled container that renders an `items` array and accepts drops
- `DraggableItem` — an item wrapper that makes its children draggable and exposes render state
- `SelectionManager` — optional helper for multi-select and box selection flows
- `DragOverlay` / `DebugOverlay` — helper components for polished previews and debugging

Use these to implement lists, boards, editors and complex drag behaviours while keeping authoritative state in your application.

## Installation

```bash
npm install saha-ui
```

Import:

```tsx
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  SelectionManager,
  DragOverlay,
  DebugOverlay,
} from "saha-ui";
```

## Quick start (copy-paste)

Minimal controlled list with reordering and a drag preview.

```tsx
import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DragOverlay,
  useDragDropContext,
} from "saha-ui";

function reorder(arr, from, to) {
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export default function BasicExample() {
  const [items, setItems] = useState([
    { id: "1", content: "A" },
    { id: "2", content: "B" },
  ]);
  const context = useDragDropContext();
  const dragged = items.find((i) => i.id === context.activeId);

  return (
    <DragDropProvider>
      <DroppableContainer
        id="list"
        items={items}
        onDrop={(e) =>
          setItems((s) => reorder(s, e.sourceIndex, e.targetIndex))
        }
      >
        {(item, index) => (
          <DraggableItem id={item.id} index={index} item={item} key={item.id}>
            <div className="p-3 bg-white rounded">{item.content}</div>
          </DraggableItem>
        )}
      </DroppableContainer>

      <DragOverlay>
        {dragged ? (
          <div className="p-3 bg-white rounded shadow">{dragged.content}</div>
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}
```

## Full examples

The repository contains three runnable examples demonstrating common patterns. Below are the full example code snippets (copy-paste) so you can run them or adapt them directly.

### 1) Basic Example — `src/examples/DragDropBasicExample.tsx`

```tsx
import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DragOverlay,
  useDragDropContext,
} from "../components/DragDrop";
import type {
  DropEvent,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Basic Drag and Drop Example
 *
 * Demonstrates:
 * - Simple drag and drop between containers
 * - Visual feedback during drag
 * - Basic reordering
 */
export const BasicExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    {
      id: "1",
      content: "🎯 Complete project proposal",
      containerId: "container-1",
    },
    { id: "2", content: "📧 Review email drafts", containerId: "container-1" },
    {
      id: "3",
      content: "💡 Brainstorm new features",
      containerId: "container-1",
    },
    { id: "4", content: "✅ Update documentation", containerId: "container-2" },
    { id: "5", content: "🚀 Deploy to production", containerId: "container-2" },
  ]);

  const handleDrop = (event: DropEvent) => {
    setItems((prev) => {
      const { item, sourceContainerId, targetContainerId, targetIndex } = event;

      // Find item to move
      const itemToMove = prev.find((i) => i.id === item.id);
      if (!itemToMove) return prev;

      // Remove item from array
      const withoutItem = prev.filter((i) => i.id !== item.id);

      // Update item's container
      const updatedItem = { ...itemToMove, containerId: targetContainerId };

      // If moving within same container, adjust targetIndex if needed
      let adjustedTargetIndex = targetIndex;
      if (sourceContainerId === targetContainerId) {
        const sourceIndex = prev.findIndex((i) => i.id === item.id);
        if (sourceIndex < targetIndex) {
          adjustedTargetIndex = targetIndex - 1;
        }
      }

      // Get items in target container
      const targetContainerItems = withoutItem.filter(
        (i) => i.containerId === targetContainerId
      );
      const otherContainerItems = withoutItem.filter(
        (i) => i.containerId !== targetContainerId
      );

      // Insert at target position
      const reorderedTargetItems = [
        ...targetContainerItems.slice(0, adjustedTargetIndex),
        updatedItem,
        ...targetContainerItems.slice(adjustedTargetIndex),
      ];

      // Combine all items maintaining order
      return [...otherContainerItems, ...reorderedTargetItems];
    });
  };

  const container1Items = items.filter(
    (item) => item.containerId === "container-1"
  );
  const container2Items = items.filter(
    (item) => item.containerId === "container-2"
  );

  return (
    <DragDropProvider>
      <DragDropContent
        items={items}
        container1Items={container1Items}
        container2Items={container2Items}
        onDrop={handleDrop}
      />
    </DragDropProvider>
  );
};

const DragDropContent: React.FC<{
  items: DragItem[];
  container1Items: DragItem[];
  container2Items: DragItem[];
  onDrop: (event: DropEvent) => void;
}> = ({ items, container1Items, container2Items, onDrop }) => {
  const context = useDragDropContext();
  const draggedItem = items.find((item) => item.id === context.activeId);

  return (
    <>
      <div className="flex gap-6 p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 min-h-screen">
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Active Tasks
            </h3>
          </div>
          <DroppableContainer
            id="container-1"
            items={container1Items}
            onDrop={onDrop}
            className="min-h-[400px] p-5 border-2 border-blue-200/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {(item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                item={item}
                className="p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
                style={{ cursor: "grab", userSelect: "none" }}
              >
                {item.content}
              </DraggableItem>
            )}
          </DroppableContainer>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Completed
            </h3>
          </div>
          <DroppableContainer
            id="container-2"
            items={container2Items}
            onDrop={onDrop}
            className="min-h-[400px] p-5 border-2 border-purple-200/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {(item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                item={item}
                className="group relative p-5 mb-3 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 border-2 border-purple-100 dark:border-purple-800/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                style={{ cursor: "grab", userSelect: "none" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-125 transition-transform" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {item.content}
                  </span>
                </div>
              </DraggableItem>
            )}
          </DroppableContainer>
        </div>
      </div>

      <DragOverlay>
        {draggedItem ? (
          <div className="p-5 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 border-2 border-indigo-300 dark:border-indigo-600 rounded-xl shadow-2xl cursor-grabbing backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {draggedItem.content}
              </p>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </>
  );
};

export default BasicExample;
```

### 2) Advanced Example — `src/examples/DragDropAdvancedExample.tsx`

```tsx
import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DebugOverlay,
} from "../components/DragDrop";
import type {
  DropEvent,
  DragAnalytics,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Advanced Features Example
 *
 * Demonstrates:
 * - Undo/Redo functionality
 * - Snap to grid
 * - Analytics tracking
 * - Debug overlay
 * - Custom collision detection
 * - Performance monitoring
 */
export const AdvancedExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: "1", content: "🎨 Design mockups", containerId: "backlog" },
    { id: "2", content: "💻 Implement feature", containerId: "backlog" },
    { id: "3", content: "🧪 Write tests", containerId: "backlog" },
    { id: "4", content: "📝 Update docs", containerId: "backlog" },
    { id: "5", content: "🔍 Code review", containerId: "active" },
    { id: "6", content: "🚀 Deploy to prod", containerId: "active" },
  ]);

  const [snapToGrid, setSnapToGrid] = useState(true);
  const [debugMode, setDebugMode] = useState(true);
  const [analytics, setAnalytics] = useState<DragAnalytics | null>(null);

  const handleDrop = (event: DropEvent) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === event.item.id
          ? { ...item, containerId: event.containerId }
          : item
      )
    );
  };

  const handleAnalytics = (data: DragAnalytics) => {
    setAnalytics(data);
    console.log("Analytics:", data);
  };

  const handleUndo = () => {
    console.log("Undo triggered");
  };

  const handleRedo = () => {
    console.log("Redo triggered");
  };

  const backlogItems = items.filter((item) => item.containerId === "backlog");
  const activeItems = items.filter((item) => item.containerId === "active");

  return (
    <DragDropProvider>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Advanced Features Demo</h2>

        {/* Control Panel */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">Control Panel</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="snap-grid"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="snap-grid" className="text-sm font-medium">
                Snap to Grid (20px)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="debug-mode"
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="debug-mode" className="text-sm font-medium">
                Debug Overlay
              </label>
            </div>

            <button
              onClick={handleUndo}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              ⎌ Undo (Ctrl+Z)
            </button>

            <button
              onClick={handleRedo}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              ⎌ Redo (Ctrl+Y)
            </button>
          </div>

          {/* Analytics Display */}
          {analytics && (
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <h4 className="font-semibold text-sm mb-2">Live Analytics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Drag Count:</span>{" "}
                  <span className="font-bold">{analytics.dragCount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Drop Count:</span>{" "}
                  <span className="font-bold">{analytics.dropCount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Duration:</span>{" "}
                  <span className="font-bold">
                    {analytics.averageDragDuration?.toFixed(0) || 0}ms
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Distance:</span>{" "}
                  <span className="font-bold">
                    {analytics.averageDragDistance?.toFixed(0) || 0}px
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">
            🌟 Active Features:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-800">
            <div>✓ Undo/Redo with 20 history steps</div>
            <div>✓ Snap to 20px grid alignment</div>
            <div>✓ Real-time analytics tracking</div>
            <div>✓ Closest-center collision detection</div>
            <div>✓ Performance monitoring</div>
            <div>✓ Debug visualization tools</div>
          </div>
        </div>

        {/* Drag Drop Containers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              📋 Backlog ({backlogItems.length})
            </h3>
            <DroppableContainer
              id="backlog"
              items={backlogItems}
              onDrop={handleDrop}
              className="min-h-[400px] p-4 bg-gray-50 border-2 border-gray-300 rounded-lg"
            >
              {(item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  item={item}
                  className="p-4 mb-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move"
                >
                  {item.content}
                </DraggableItem>
              )}
            </DroppableContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              🔥 Active Sprint ({activeItems.length})
            </h3>
            <DroppableContainer
              id="active"
              items={activeItems}
              onDrop={handleDrop}
              className="min-h-[400px] p-4 bg-green-50 border-2 border-green-300 rounded-lg"
            >
              {(item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  item={item}
                  className="p-4 mb-2 bg-white border border-green-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move"
                >
                  {item.content}
                </DraggableItem>
              )}
            </DroppableContainer>
          </div>
        </div>

        {/* Debug Overlay */}
        {debugMode && (
          <DebugOverlay
            showFPS={true}
            showRenderTime={true}
            showDragPath={true}
            showState={true}
            position="bottom-right"
          />
        )}

        {/* Instructions */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 Try These Features:
          </h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
            <li>Toggle "Snap to Grid" to see alignment behavior</li>
            <li>Watch the analytics update in real-time as you drag</li>
            <li>Use Ctrl+Z / Ctrl+Y for undo/redo operations</li>
            <li>Enable Debug Overlay to see performance metrics</li>
            <li>Observe FPS counter and render times</li>
            <li>See the drag path visualization</li>
          </ul>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default AdvancedExample;
```

### 3) Multi-Selection Example — `src/examples/DragDropMultiSelectionExample.tsx`

```tsx
import React, { useState } from "react";
import {
  DragDropProvider,
  SelectionManager,
  DroppableContainer,
  DraggableItem,
  DragOverlay,
} from "../components/DragDrop";
import type {
  DropEvent,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Multi-Selection Example
 *
 * Demonstrates:
 * - Multi-item selection with Ctrl/Cmd + Click
 * - Range selection with Shift + Click
 * - Box selection (drag to select multiple)
 * - Select all (Ctrl/Cmd + A)
 * - Batch operations on selected items
 */
export const MultiSelectionExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: "1", content: "Task 1: Review pull request", containerId: "todo" },
    { id: "2", content: "Task 2: Update documentation", containerId: "todo" },
    { id: "3", content: "Task 3: Fix bug in login", containerId: "todo" },
    { id: "4", content: "Task 4: Add unit tests", containerId: "todo" },
    { id: "5", content: "Task 5: Refactor API calls", containerId: "todo" },
    {
      id: "6",
      content: "Task 6: Design new feature",
      containerId: "in-progress",
    },
    { id: "7", content: "Task 7: Code review", containerId: "in-progress" },
    { id: "8", content: "Task 8: Deploy to staging", containerId: "done" },
    { id: "9", content: "Task 9: Update changelog", containerId: "done" },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDrop = (event: DropEvent) => {
    // Check if the dropped item is part of a multi-selection
    const isMultiDrag =
      selectedIds.includes(event.item.id) && selectedIds.length > 1;

    if (isMultiDrag) {
      // Move all selected items to the target container
      setItems((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? { ...item, containerId: event.containerId }
            : item
        )
      );
      // Clear selection after multi-drop
      setSelectedIds([]);
    } else {
      // Single item drop
      setItems((prev) =>
        prev.map((item) =>
          item.id === event.item.id
            ? { ...item, containerId: event.containerId }
            : item
        )
      );
      // Clear selection if any
      if (selectedIds.length > 0) setSelectedIds([]);
    }
  };

  const handleSelectionChange = (ids: Set<string>) =>
    setSelectedIds(Array.from(ids));

  const handleBulkMove = (targetContainer: string) => {
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, containerId: targetContainer }
          : item
      )
    );
    setSelectedIds([]);
  };
  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.length} selected items?`)) {
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const todoItems = items.filter((item) => item.containerId === "todo");
  const inProgressItems = items.filter(
    (item) => item.containerId === "in-progress"
  );
  const doneItems = items.filter((item) => item.containerId === "done");

  return (
    <DragDropProvider enableMultiDrag={true}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Kanban Board with Multi-Selection
        </h2>

        <DragOverlay>
          {items
            .filter((item) => selectedIds.includes(item.id))
            .map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-2xl mb-2"
                style={{
                  marginTop: idx === 0 ? 0 : "-40px",
                  transform: `translateX(${idx * 4}px) translateY(${
                    idx * 4
                  }px)`,
                  opacity: idx === 0 ? 1 : 0.8 - idx * 0.15,
                  zIndex: 100 - idx,
                }}
              >
                <div className="flex items-center gap-3">
                  {idx === 0 && selectedIds.length > 1 && (
                    <div className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                      {selectedIds.length} items
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800">
                    {idx === 0 ? item.content : ""}
                  </span>
                </div>
              </div>
            ))}
        </DragOverlay>

        <SelectionManager
          items={items}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          enableBoxSelection={true}
          enableKeyboardShortcuts={true}
        >
          <div className="mb-6 p-6 bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              <h3 className="font-bold text-lg">Selection Controls</h3>
              <span className="ml-auto px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                {selectedIds.length} selected
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleBulkMove("todo")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl"
              >
                📋 Move to Todo
              </button>
              <button
                onClick={() => handleBulkMove("in-progress")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl"
              >
                ⚡ Move to In Progress
              </button>
              <button
                onClick={() => handleBulkMove("done")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl"
              >
                ✅ Move to Done
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl"
              >
                🗑️ Delete Selected
              </button>
            </div>
            <div className="mt-4 p-3 bg-purple-100 rounded-xl text-sm">
              Tips: Ctrl/Cmd+Click for multi-select • Shift+Click for range •
              Drag to box-select • Ctrl/Cmd+A to select all
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold">To Do</h3>
              <DroppableContainer
                id="todo"
                items={todoItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white rounded-2xl shadow-lg"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`${
                      selectedIds.includes(item.id)
                        ? "bg-purple-50 border-purple-400"
                        : "bg-white"
                    } p-4 mb-3 rounded-xl`}
                  >
                    <div className="flex items-start gap-3">
                      {selectedIds.includes(item.id) && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span className="flex-1">{item.content}</span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>
            <div>
              <h3 className="text-lg font-bold">In Progress</h3>
              <DroppableContainer
                id="in-progress"
                items={inProgressItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white rounded-2xl shadow-lg"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`${
                      selectedIds.includes(item.id)
                        ? "bg-purple-50 border-purple-400"
                        : "bg-white"
                    } p-4 mb-3 rounded-xl`}
                  >
                    <div className="flex items-start gap-3">
                      {selectedIds.includes(item.id) && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span className="flex-1">{item.content}</span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>
            <div>
              <h3 className="text-lg font-bold">Done</h3>
              <DroppableContainer
                id="done"
                items={doneItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white rounded-2xl shadow-lg"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`${
                      selectedIds.includes(item.id)
                        ? "bg-purple-50 border-purple-400"
                        : "bg-white"
                    } p-4 mb-3 rounded-xl`}
                  >
                    <div className="flex items-start gap-3">
                      {selectedIds.includes(item.id) && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span className="flex-1">{item.content}</span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>
          </div>
        </SelectionManager>
      </div>
    </DragDropProvider>
  );
};

export default MultiSelectionExample;
```

## API reference (developer-oriented)

This section lists component props and types you will most likely use. For full TypeScript definitions, open `src/components/DragDrop/DragDrop.types.ts`.

### DragDropProvider

Props (selected):

- `sensors?: ('mouse'|'touch'|'pointer'|'keyboard')[]` — enabled input sensors. Default: `['mouse','touch','pointer']`.
- `autoScroll?: boolean` — enable auto-scrolling when dragging near edges. Default: `true`.
- `autoScrollSpeed?: number` — speed in px. Default: `10`.
- `dragThreshold?: number` — minimum pixels required to start a drag. Default: `5`.
- `announcements?: { onDragStart?: (event)=>string, onDragOver?: (event)=>string, onDragEnd?: (event)=>string, onDragCancel?: (event)=>string }` — screen reader messages.

### DroppableContainer

Props (selected):

- `id: string` (required) — unique container id.
- `items: T[]` (required) — array of items rendered by this container.
- `direction?: 'vertical'|'horizontal'|'grid'` — layout direction.
- `disabled?: boolean` — when true, disallow drops.
- `accepts?: string[]` — allow-list of item `type`s.
- `renderEmpty?: () => ReactNode` — custom empty state render.
- `onDrop?: (event: DropEvent) => void` — drop handler (see `DropEvent` type).

Children: function `(item, index) => ReactNode`.

### DraggableItem

Props (selected):

- `id: string` — unique item id (required).
- `index: number` — the current index in the container (required).
- `item: any` — payload for the item (required).
- `disabled?: boolean` — prevent dragging.
- `dragHandle?: boolean` — require a `DragHandle` child to start drag.
- `preview?: ReactNode` — custom drag preview.
- `type?: string` — optional string used by `accepts` on containers.

Children: either JSX or function receiving `{ isDragging, isActive }`.

### SelectionManager

Props (selected):

- `items: any[]` — items tracked by selection manager.
- `selectedIds: string[]` — controlled selection ids.
- `onSelectionChange: (ids: Set<string>) => void` — selection change callback.
- `enableBoxSelection?: boolean` — enable drag-to-select box.
- `enableKeyboardShortcuts?: boolean` — enable select-all and other shortcuts.

## TypeScript types (excerpt)

```ts
export type DropEvent = {
  item: any;
  sourceContainerId: string;
  targetContainerId: string;
  sourceIndex: number;
  targetIndex: number;
  containerId?: string; // alias for target
};

export interface DraggableItemType {
  id: string;
  index: number;
  item: any;
}
```

For the authoritative types open `src/components/DragDrop/DragDrop.types.ts`.

## Accessibility

- Keyboard: support for starting/ending drag via keyboard controls and moving with arrow keys.
- Screen reader announcements: use the provider's `announcements` to localize messages.
- Focus restoration: ensure your UI restores focus after a drop when necessary.

## Performance guidance

- Memoize item components with `React.memo` and avoid inline functions where possible.
- When combining with virtualization (e.g., `react-window`) expose an indexed map layer so droppable indexes match virtualized indexes.
- Avoid layout reads (getBoundingClientRect) on every `onDragMove`. Throttle or cache measurements.

## Testing & debugging

- Unit: test `onDrop` handlers and reordering helpers.
- Integration/E2E: use Cypress/Playwright to emulate pointer sequences: `mousedown` → `mousemove` → `mouseup` and keyboard flows.
- DebugOverlay: example shows an overlay useful when tuning performance and collision detection.

## Troubleshooting

- Items not draggable: check `disabled` and overlapping elements/z-index.
- Indices off after move: remove from source list before inserting to target, and adjust indexes when moving within same container.
- Virtualized lists: ensure index translation between virtual list and droppable container.

## Migration notes

- If migrating from plain DOM reorder code, switch to controlled `items` arrays and handle reordering in `onDrop`.
- For multi-item drag, use `SelectionManager` or `enableMultiDrag` flag to keep semantics explicit.

## Contributing

- Open PRs with tests for new behaviours. Add examples under `src/examples` and update README with integration notes.

---

If you want, I can now: embed full TypeScript declarations into this README, add a short migration section with examples, or produce Cypress test snippets for the three examples. Which should I do next?

- Selection manager for multi-drag and batch actions
- Debug overlay utilities in examples for profiling and drag-path visualization

### Examples

- Basic: `src/examples/DragDropBasicExample.tsx` — cross-container reordering + `DragOverlay`
- Advanced: `src/examples/DragDropAdvancedExample.tsx` — undo/redo hooks, snap-to-grid, analytics, `DebugOverlay`
- Multi-selection: `src/examples/DragDropMultiSelectionExample.tsx` — `SelectionManager`, box selection, stacked `DragOverlay` for multi-drag

### Composition

Use `DroppableContainer` as a controlled render layer and keep your data canonical in parent state. Combine `SelectionManager` for multi-select workflows and `DragOverlay` for custom preview rendering.

### Troubleshooting

- Items not draggable: confirm `DraggableItem` `disabled` is false and no overlaying element blocks pointer events
- Incorrect indices after cross-list moves: ensure `onDrop` uses provided `sourceIndex`/`targetIndex` and accounts for removal from source list before insertion
- Performance issues with very large lists: integrate virtualization (react-window) and ensure droppable index mappings are correctly translated

### TypeScript

Types are exported from the drag/drop package. Example:

```ts
import type { DropEvent, DraggableItem as DragItem } from "saha-ui";
```

### Contributing & Tests

- Add unit tests for `onDrop` logic and selection behaviors
- Add Cypress e2e tests for drag sequences (mousedown/mousemove/mouseup) and keyboard flows

---

If you'd like, I will now rewrite the DragDrop README to exactly mirror the section order and formatting of `Button/README.md` (full props table, detailed examples, migration guide, troubleshooting). Proceed with that? Or should I embed the full example sources into the README now?

## Examples

Below are concise, copy-pasteable examples based on the code in the `src/examples` folder. Each demonstrates common real-world usage patterns.

### Basic: Simple cross-container reordering

Purpose: illustrate a minimal controlled usage with two containers and basic reordering.

```tsx
import { DragDropProvider, DroppableContainer, DraggableItem } from "saha-ui";

function BasicExample() {
  // items contain a containerId field used to split between lists
  // handleDrop receives { item, sourceContainerId, targetContainerId, targetIndex }
}

// See `src/examples/DragDropBasicExample.tsx` for the full implementation
```

Key points:

- Use `onDrop` to compute new ordering and to move items between containers.
- Use `DragOverlay` to render a polished drag preview.

### Advanced: Undo/Redo, analytics and debug overlay

Purpose: demonstrates adding higher-level UX features like undo/redo, snap-to-grid, analytics and a debug overlay.

```tsx
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DebugOverlay,
} from "saha-ui";

function AdvancedExample() {
  // keep an items array in state
  // toggle snapToGrid and debugMode from a control panel
  // onDrop updates containerId for the moved item
  // DebugOverlay can show FPS, drag path and render timing
}

// See `src/examples/DragDropAdvancedExample.tsx` for the full implementation
```

Key points:

- The library is designed to integrate with analytics hooks; capture drag count, drop count, duration and distance.
- Implement undo/redo at the app level by storing history snapshots when items change.

### Multi-Selection: Select, drag and batch operations

Purpose: demonstrate multi-select interactions (Ctrl/Cmd, Shift, box selection) and batch operations (move/delete).

```tsx
import {
  DragDropProvider,
  SelectionManager,
  DroppableContainer,
  DraggableItem,
  DragOverlay,
} from "saha-ui";

function MultiSelectionExample() {
  // Use SelectionManager to track selectedIds and enable box selection
  // When a multi-selected group is dragged, onDrop will move all selected items
}

// See `src/examples/DragDropMultiSelectionExample.tsx` for the full implementation
```

Key points:

- Provide `enableMultiDrag` or wrap with `SelectionManager` to support multi-item dragging.
- Use `DragOverlay` to draw stacked previews for multi-drag UX.

---

Where to look

- `src/examples/DragDropBasicExample.tsx` — basic usage and `DragOverlay` preview
- `src/examples/DragDropAdvancedExample.tsx` — advanced features, control panel and `DebugOverlay`
- `src/examples/DragDropMultiSelectionExample.tsx` — selection manager, multi-drag and batch operations

If you'd like, I can embed the full source of any of those examples into this README, or generate a small live-playground story (Storybook) for one of them. Which would you prefer?
