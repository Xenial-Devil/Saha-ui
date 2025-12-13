// Core Components
export { DragDropProvider, useDragDropContext } from "./DragDropContext";
export { DraggableItem } from "./DraggableItem";
export { DroppableContainer } from "./DroppableContainer";
export { DragHandle } from "./DragHandle";
export { DragOverlay } from "./DragOverlay";

// Advanced Components
export { TreeView } from "./TreeView";
export { VirtualList, useVirtualScroll } from "./VirtualList";
export { SelectionManager, SelectionBadge } from "./SelectionManager";
export { DebugOverlay } from "./DebugOverlay";

// Types
export type {
  DragDropContextProps,
  EnhancedDragDropContextProps,
  DroppableContainerProps,
  DraggableItemProps,
  DragHandleProps,
  DragOverlayProps,
  DraggableItem as DraggableItemType,
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DropEvent,
  DragCancelEvent,
  DragPosition,
  DragAxis,
  DragSensor,
  DropEffect,
  TreeItem,
  NestedDragConstraints,
  SnapToGridConfig,
  BoundingConstraints,
  CollisionDetectionConfig,
  HistoryState,
  UndoRedoConfig,
  SelectionState,
  MultiDragConfig,
  VirtualizationConfig,
  VirtualItem,
  DragLock,
  CollaborationConfig,
  AutoScrollConfig,
  DragAnalytics,
  DebugConfig,
  DragDropPlugin,
} from "./DragDrop.types";

// Utilities
export * from "./DragDrop.utils";
