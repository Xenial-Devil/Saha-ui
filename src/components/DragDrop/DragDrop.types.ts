import { ReactNode, CSSProperties } from "react";

// ============================================
// Core Types
// ============================================

export type DragAxis = "x" | "y" | "both";
export type DragSensor = "mouse" | "touch" | "pointer" | "keyboard";
export type DropEffect = "move" | "copy" | "link" | "none";

export interface DraggableItem {
  id: string;
  [key: string]: any;
}

export interface DragPosition {
  x: number;
  y: number;
}

export interface DragBounds {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// ============================================
// Event Types
// ============================================

export interface DragStartEvent<T = DraggableItem> {
  item: T;
  index: number;
  containerId: string;
  position: DragPosition;
  sensor: DragSensor;
}

export interface DragMoveEvent<T = DraggableItem> extends DragStartEvent<T> {
  delta: DragPosition;
  currentPosition: DragPosition;
}

export interface DragOverEvent<T = DraggableItem> {
  item: T;
  sourceIndex: number;
  targetIndex: number;
  sourceContainerId: string;
  targetContainerId: string;
}

export interface DropEvent<T = DraggableItem> extends DragOverEvent<T> {
  containerId?: string;
  position?: DragPosition;
  effect: DropEffect;
}

export interface DragCancelEvent<T = DraggableItem> {
  item: T;
  reason: "escape" | "invalid" | "error" | "manual";
}

// ============================================
// Component Props
// ============================================

export interface DragDropContextProps {
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
}

export interface DroppableContainerProps<T = DraggableItem> {
  id: string;
  items: T[];
  children: (item: T, index: number) => ReactNode;
  direction?: "vertical" | "horizontal" | "grid";
  className?: string;
  disabled?: boolean;
  accepts?: string[];
  renderEmpty?: () => ReactNode;
  style?: CSSProperties;
  onDrop?: (event: DropEvent<T>) => void;
}

export interface DraggableItemProps<T = DraggableItem> {
  id: string;
  index: number;
  item: T;
  children: ReactNode;
  disabled?: boolean;
  dragHandle?: boolean;
  className?: string;
  style?: CSSProperties;
  draggingClassName?: string;
  draggingStyle?: CSSProperties;
  preview?: ReactNode;
  type?: string;
  data?: Record<string, any>;
}

export interface DragHandleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface DragOverlayProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  dropAnimation?: {
    duration?: number;
    easing?: string;
  };
}

// ============================================
// Hook Types
// ============================================

export interface UseDragDropOptions<T = DraggableItem> {
  items: T[];
  onReorder?: (items: T[]) => void;
  onDragStart?: (event: DragStartEvent<T>) => void;
  onDragMove?: (event: DragMoveEvent<T>) => void;
  onDragOver?: (event: DragOverEvent<T>) => void;
  onDrop?: (event: DropEvent<T>) => void;
  onDragCancel?: (event: DragCancelEvent<T>) => void;
  axis?: DragAxis;
  bounds?: DragBounds;
  disabled?: boolean;
}

export interface UseDragDropReturn<T = DraggableItem> {
  items: T[];
  activeItem: T | null;
  isDragging: boolean;
  handleDragStart: (item: T, index: number) => void;
  handleDragEnd: () => void;
  handleDragCancel: () => void;
}

// ============================================
// Context Types
// ============================================

export interface DragDropContextValue {
  activeId: string | null;
  activeItem: DraggableItem | null;
  activeIndex: number | null;
  sourceContainerId: string | null;
  dragPosition: DragPosition | null;
  isDragging: boolean;
  sensors: DragSensor[];
  dragThreshold: number;
  registerDraggable: (id: string, element: HTMLElement) => void;
  unregisterDraggable: (id: string) => void;
  registerDroppable: (id: string, element: HTMLElement) => void;
  unregisterDroppable: (id: string) => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragMove: (event: DragMoveEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleDrop: (event: DropEvent) => void;
  handleDragCancel: (event: DragCancelEvent) => void;
  // Advanced features
  selectionState?: SelectionState;
  selectItem?: (
    id: string,
    options?: { ctrlKey?: boolean; shiftKey?: boolean }
  ) => void;
  clearSelection?: () => void;
  historyState?: HistoryState;
  undo?: () => any;
  redo?: () => any;
  saveToHistory?: (snapshot: any) => void;
  applySnapToGrid?: (position: DragPosition) => DragPosition;
  collisionDetection?: CollisionDetectionConfig;
  plugins?: DragDropPlugin[];
  debug?: boolean | DebugConfig;
}

// ============================================
// Advanced Types
// ============================================

export interface CollisionDetectionStrategy {
  (draggable: DOMRect, droppables: Map<string, DOMRect>): string | null;
}

export interface ScrollableAncestor {
  element: HTMLElement;
  rect: DOMRect;
}

export interface DragModifiers {
  restrictToAxis?: DragAxis;
  restrictToContainer?: boolean;
  snapToGrid?: { x: number; y: number };
  restrictToBounds?: DragBounds;
}

export interface KeyboardCoordinates {
  up: DragPosition;
  down: DragPosition;
  left: DragPosition;
  right: DragPosition;
}

// ============================================
// Tree & Nested Types
// ============================================

export interface TreeItem extends DraggableItem {
  children?: TreeItem[];
  parentId?: string | null;
  depth?: number;
  isCollapsed?: boolean;
}

export interface NestedDragConstraints {
  maxDepth?: number;
  allowCrossLevel?: boolean;
  allowParentDrag?: boolean;
  preventDropIntoDescendants?: boolean;
}

// ============================================
// Collision & Constraints
// ============================================

export interface SnapToGridConfig {
  enabled: boolean;
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
}

export interface BoundingConstraints {
  top?: number | ((element: HTMLElement) => number);
  right?: number | ((element: HTMLElement) => number);
  bottom?: number | ((element: HTMLElement) => number);
  left?: number | ((element: HTMLElement) => number);
  restrictToParent?: boolean;
  restrictToContainer?: boolean;
}

export interface CollisionDetectionConfig {
  strategy:
    | "closestCenter"
    | "closestCorners"
    | "pointerWithin"
    | "rectIntersection";
  custom?: CollisionDetectionStrategy;
}

// ============================================
// State Management & History
// ============================================

export interface DragDropState<T = DraggableItem> {
  containers: Record<string, T[]>;
  timestamp: number;
}

export interface HistoryState<T = any> {
  past: T[];
  future: T[];
}

export interface UndoRedoConfig {
  enabled: boolean;
  maxHistorySize?: number;
  captureOnDrop?: boolean;
}

// ============================================
// Multi-Selection
// ============================================

export interface SelectionState {
  selectedIds: Set<string>;
  anchorId: string | null;
  lastSelectedId: string | null;
}

export interface MultiDragConfig {
  enabled: boolean;
  selectionKey?: "shift" | "ctrl" | "meta";
  allowMultiContainerSelection?: boolean;
}

// ============================================
// Virtualization
// ============================================

export interface VirtualizationConfig {
  enabled: boolean;
  itemHeight: number | ((index: number) => number);
  overscan?: number;
  estimatedItemHeight?: number;
}

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
  end: number;
  key: string;
}

// ============================================
// Collaboration
// ============================================

export interface DragLock {
  itemId: string;
  userId: string;
  timestamp: number;
  expiresAt?: number;
}

export interface CollaborationConfig {
  enabled: boolean;
  userId: string;
  onAcquireLock?: (itemId: string) => Promise<boolean>;
  onReleaseLock?: (itemId: string) => Promise<void>;
  onConflict?: (itemId: string, otherId: string) => void;
}

// ============================================
// Advanced Scrolling
// ============================================

export interface AutoScrollConfig {
  enabled: boolean;
  threshold: number;
  speed: number;
  acceleration?: number;
  maxSpeed?: number;
  smoothness?: number;
  detectNested?: boolean;
}

// ============================================
// Analytics & Debugging
// ============================================

export interface DragAnalytics {
  dragStartTime?: number;
  dragEndTime?: number;
  duration?: number;
  distance?: number;
  itemsMoved?: number;
  containersTraversed?: number;
  cancelled?: boolean;
  dragCount?: number;
  dropCount?: number;
  cancelCount?: number;
  averageDragDuration?: number;
  averageDragDistance?: number;
  itemMetrics?: Map<
    string,
    { dragCount: number; dropCount: number; totalDistance: number }
  >;
  containerMetrics?: Map<string, any>;
}

export interface DebugConfig {
  enabled: boolean;
  logEvents?: boolean;
  showBoundingBoxes?: boolean;
  highlightDropZones?: boolean;
  trackPerformance?: boolean;
}

// ============================================
// Plugin System
// ============================================

export interface DragDropPlugin {
  name: string;
  version?: string;
  onInit?: (context: DragDropContextValue) => void;
  onDestroy?: () => void;
  onDragStart?: (event: DragStartEvent) => void | Promise<void>;
  onDragMove?: (event: DragMoveEvent) => void | Promise<void>;
  onDragOver?: (event: DragOverEvent) => void | Promise<void>;
  onDrop?: (event: DropEvent) => void | Promise<void>;
  onDragCancel?: (event: DragCancelEvent) => void | Promise<void>;
  modifyPosition?: (position: DragPosition) => DragPosition;
  validateDrop?: (event: DragOverEvent) => boolean;
}

// ============================================
// Enhanced Context Props
// ============================================

export interface EnhancedDragDropContextProps extends DragDropContextProps {
  snapToGrid?: SnapToGridConfig;
  collisionDetection?: CollisionDetectionConfig;
  boundingConstraints?: BoundingConstraints;
  undoRedo?: UndoRedoConfig;
  multiSelection?: MultiDragConfig;
  virtualization?: VirtualizationConfig;
  collaboration?: CollaborationConfig;
  autoScrollConfig?: AutoScrollConfig;
  debug?: boolean | DebugConfig;
  plugins?: DragDropPlugin[];
  onStateChange?: (state: DragDropState) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  // Simplified props (backwards compatible)
  enableUndo?: boolean;
  maxHistory?: number;
  enableMultiDrag?: boolean;
  onAnalytics?: (analytics: DragAnalytics) => void;
}
