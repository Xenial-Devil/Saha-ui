import { DragPosition, DragBounds, DragAxis } from "./DragDrop.types";

// ============================================
// Collision Detection
// ============================================

export function closestCenter(
  draggable: DOMRect,
  droppables: Map<string, DOMRect>
): string | null {
  let closestId: string | null = null;
  let closestDistance = Infinity;

  const draggableCenter = {
    x: draggable.left + draggable.width / 2,
    y: draggable.top + draggable.height / 2,
  };

  droppables.forEach((rect, id) => {
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const distance = Math.sqrt(
      Math.pow(draggableCenter.x - center.x, 2) +
        Math.pow(draggableCenter.y - center.y, 2)
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestId = id;
    }
  });

  return closestId;
}

export function closestCorners(
  draggable: DOMRect,
  droppables: Map<string, DOMRect>
): string | null {
  let closestId: string | null = null;
  let closestDistance = Infinity;

  droppables.forEach((rect, id) => {
    const corners = [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.left, y: rect.bottom },
      { x: rect.right, y: rect.bottom },
    ];

    corners.forEach((corner) => {
      const distance = Math.sqrt(
        Math.pow(draggable.left - corner.x, 2) +
          Math.pow(draggable.top - corner.y, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = id;
      }
    });
  });

  return closestId;
}

export function pointerWithin(
  pointer: DragPosition,
  droppables: Map<string, DOMRect>
): string | null {
  for (const [id, rect] of droppables) {
    if (
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom
    ) {
      return id;
    }
  }
  return null;
}

export function rectIntersection(
  draggable: DOMRect,
  droppables: Map<string, DOMRect>
): string | null {
  let maxIntersection = 0;
  let closestId: string | null = null;

  droppables.forEach((rect, id) => {
    const intersectionX = Math.max(
      0,
      Math.min(draggable.right, rect.right) -
        Math.max(draggable.left, rect.left)
    );
    const intersectionY = Math.max(
      0,
      Math.min(draggable.bottom, rect.bottom) -
        Math.max(draggable.top, rect.top)
    );
    const intersectionArea = intersectionX * intersectionY;

    if (intersectionArea > maxIntersection) {
      maxIntersection = intersectionArea;
      closestId = id;
    }
  });

  return maxIntersection > 0 ? closestId : null;
}

// ============================================
// Position Calculations
// ============================================

export function restrictToAxis(
  position: DragPosition,
  axis: DragAxis,
  initialPosition: DragPosition
): DragPosition {
  if (axis === "x") {
    return { x: position.x, y: initialPosition.y };
  }
  if (axis === "y") {
    return { x: initialPosition.x, y: position.y };
  }
  return position;
}

export function restrictToBounds(
  position: DragPosition,
  bounds: DragBounds
): DragPosition {
  const restricted = { ...position };

  if (bounds.top !== undefined && restricted.y < bounds.top) {
    restricted.y = bounds.top;
  }
  if (bounds.bottom !== undefined && restricted.y > bounds.bottom) {
    restricted.y = bounds.bottom;
  }
  if (bounds.left !== undefined && restricted.x < bounds.left) {
    restricted.x = bounds.left;
  }
  if (bounds.right !== undefined && restricted.x > bounds.right) {
    restricted.x = bounds.right;
  }

  return restricted;
}

export function snapToGrid(
  position: DragPosition,
  gridSize: { x: number; y: number }
): DragPosition {
  return {
    x: Math.round(position.x / gridSize.x) * gridSize.x,
    y: Math.round(position.y / gridSize.y) * gridSize.y,
  };
}

export function applyModifiers(
  position: DragPosition,
  options: {
    axis?: DragAxis;
    bounds?: DragBounds;
    snapToGrid?: { x: number; y: number };
    initialPosition: DragPosition;
  }
): DragPosition {
  let modified = position;

  if (options.axis) {
    modified = restrictToAxis(modified, options.axis, options.initialPosition);
  }

  if (options.snapToGrid) {
    modified = snapToGrid(modified, options.snapToGrid);
  }

  if (options.bounds) {
    modified = restrictToBounds(modified, options.bounds);
  }

  return modified;
}

// ============================================
// Distance & Threshold
// ============================================

export function getDistance(a: DragPosition, b: DragPosition): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function exceedsThreshold(
  current: DragPosition,
  initial: DragPosition,
  threshold: number
): boolean {
  return getDistance(current, initial) > threshold;
}

// ============================================
// Auto Scroll
// ============================================

export interface ScrollableAncestor {
  element: HTMLElement;
  rect: DOMRect;
}

export function getScrollableAncestors(
  element: HTMLElement
): ScrollableAncestor[] {
  const ancestors: ScrollableAncestor[] = [];
  let current: HTMLElement | null = element.parentElement;

  while (current && current !== document.body) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(current);
    const isScrollable =
      overflow === "auto" ||
      overflow === "scroll" ||
      overflowX === "auto" ||
      overflowX === "scroll" ||
      overflowY === "auto" ||
      overflowY === "scroll";

    if (isScrollable) {
      ancestors.push({
        element: current,
        rect: current.getBoundingClientRect(),
      });
    }

    current = current.parentElement;
  }

  // Add window as the final scrollable ancestor
  ancestors.push({
    element: document.documentElement,
    rect: new DOMRect(0, 0, window.innerWidth, window.innerHeight),
  });

  return ancestors;
}

export function calculateAutoScrollVelocity(
  pointer: DragPosition,
  rect: DOMRect,
  threshold: number,
  maxSpeed: number
): { x: number; y: number } {
  const velocity = { x: 0, y: 0 };

  // Vertical scroll
  const distanceToTop = pointer.y - rect.top;
  const distanceToBottom = rect.bottom - pointer.y;

  if (distanceToTop < threshold) {
    velocity.y = -maxSpeed * (1 - distanceToTop / threshold);
  } else if (distanceToBottom < threshold) {
    velocity.y = maxSpeed * (1 - distanceToBottom / threshold);
  }

  // Horizontal scroll
  const distanceToLeft = pointer.x - rect.left;
  const distanceToRight = rect.right - pointer.x;

  if (distanceToLeft < threshold) {
    velocity.x = -maxSpeed * (1 - distanceToLeft / threshold);
  } else if (distanceToRight < threshold) {
    velocity.x = maxSpeed * (1 - distanceToRight / threshold);
  }

  return velocity;
}

// ============================================
// Array Utilities
// ============================================

export function reorderArray<T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export function moveItemBetweenArrays<T>(
  sourceArray: T[],
  destinationArray: T[],
  fromIndex: number,
  toIndex: number
): { source: T[]; destination: T[] } {
  const source = [...sourceArray];
  const destination = [...destinationArray];
  const [removed] = source.splice(fromIndex, 1);
  destination.splice(toIndex, 0, removed);

  return { source, destination };
}

export function cloneItem<T>(item: T): T {
  if (typeof item === "object" && item !== null) {
    return JSON.parse(JSON.stringify(item));
  }
  return item;
}

// ============================================
// DOM Utilities
// ============================================

export function getEventCoordinates(
  event: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent
): DragPosition | null {
  if ("touches" in event && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if ("clientX" in event && "clientY" in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return null;
}

export function getElementCenter(element: HTMLElement): DragPosition {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function createDragImage(element: HTMLElement): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.pointerEvents = "none";
  clone.style.zIndex = "9999";
  clone.style.opacity = "0.8";
  return clone;
}

// ============================================
// Keyboard Navigation
// ============================================

export function getKeyboardCoordinates(
  key: string,
  step: number = 10
): DragPosition | null {
  const coordinates: Record<string, DragPosition> = {
    ArrowUp: { x: 0, y: -step },
    ArrowDown: { x: 0, y: step },
    ArrowLeft: { x: -step, y: 0 },
    ArrowRight: { x: step, y: 0 },
  };

  return coordinates[key] || null;
}

// ============================================
// Announcements (A11y)
// ============================================

export function announce(
  message: string,
  politeness: "polite" | "assertive" = "polite"
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", politeness);
  announcement.setAttribute("aria-atomic", "true");
  announcement.style.position = "absolute";
  announcement.style.left = "-10000px";
  announcement.style.width = "1px";
  announcement.style.height = "1px";
  announcement.style.overflow = "hidden";

  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function getDefaultAnnouncement(
  type: "start" | "move" | "drop" | "cancel",
  data: any
): string {
  switch (type) {
    case "start":
      return `Started dragging item ${data.index + 1}`;
    case "move":
      return `Moved to position ${data.targetIndex + 1}`;
    case "drop":
      return `Dropped item at position ${data.targetIndex + 1}`;
    case "cancel":
      return `Drag cancelled. Item returned to position ${data.index + 1}`;
    default:
      return "";
  }
}

// ============================================
// Tree Structure Utilities
// ============================================

export function flattenTree<T extends { id: string; children?: T[] }>(
  items: T[],
  depth = 0
): Array<T & { depth: number }> {
  return items.reduce((acc, item) => {
    acc.push({ ...item, depth });
    if (item.children && item.children.length > 0) {
      acc.push(...flattenTree(item.children, depth + 1));
    }
    return acc;
  }, [] as Array<T & { depth: number }>);
}

export function buildTree<T extends { id: string; parentId?: string | null }>(
  items: T[]
): T[] {
  const map = new Map<string, T & { children: T[] }>();
  const roots: T[] = [];

  items.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  items.forEach((item) => {
    const node = map.get(item.id)!;
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node as any);
      }
    } else {
      roots.push(node as any);
    }
  });

  return roots;
}

export function isDescendant(
  itemId: string,
  potentialAncestorId: string,
  items: Map<string, { parentId?: string | null }>
): boolean {
  let currentId: string | null | undefined = itemId;

  while (currentId) {
    const item = items.get(currentId);
    if (!item) break;

    if (item.parentId === potentialAncestorId) {
      return true;
    }

    currentId = item.parentId;
  }

  return false;
}

export function getDepth(
  itemId: string,
  items: Map<string, { parentId?: string | null }>
): number {
  let depth = 0;
  let currentId: string | null | undefined = itemId;

  while (currentId) {
    const item = items.get(currentId);
    if (!item || !item.parentId) break;
    depth++;
    currentId = item.parentId;
  }

  return depth;
}

// ============================================
// Multi-Selection Utilities
// ============================================

export function getSelectedIndices(
  selectedIds: Set<string>,
  items: { id: string }[]
): number[] {
  return items
    .map((item, index) => (selectedIds.has(item.id) ? index : -1))
    .filter((index) => index !== -1);
}

export function getItemsBetween(
  startIndex: number,
  endIndex: number,
  items: { id: string }[]
): string[] {
  const min = Math.min(startIndex, endIndex);
  const max = Math.max(startIndex, endIndex);
  return items.slice(min, max + 1).map((item) => item.id);
}

export function reorderMultipleItems<T>(
  array: T[],
  indices: number[],
  targetIndex: number
): T[] {
  const result = [...array];
  const itemsToMove = indices.sort((a, b) => a - b).map((i) => result[i]);

  // Remove items from original positions (reverse order)
  indices
    .sort((a, b) => b - a)
    .forEach((index) => {
      result.splice(index, 1);
    });

  // Insert at target
  result.splice(targetIndex, 0, ...itemsToMove);
  return result;
}

// ============================================
// Virtualization Utilities
// ============================================

export function calculateVirtualItems(
  scrollTop: number,
  containerHeight: number,
  itemCount: number,
  itemHeight: number | ((index: number) => number),
  overscan = 3
): { start: number; end: number; offsetY: number }[] {
  const getItemHeight =
    typeof itemHeight === "function" ? itemHeight : () => itemHeight;

  let currentOffset = 0;
  const items: { start: number; end: number; offsetY: number }[] = [];

  for (let i = 0; i < itemCount; i++) {
    const height = getItemHeight(i);
    const start = currentOffset;
    const end = start + height;

    items.push({ start, end, offsetY: start });
    currentOffset = end;
  }

  const visibleStart = scrollTop;
  const visibleEnd = scrollTop + containerHeight;

  const startIndex = items.findIndex((item) => item.end > visibleStart);
  const endIndex = items.findIndex((item) => item.start > visibleEnd);

  return items.slice(
    Math.max(0, startIndex - overscan),
    endIndex === -1 ? itemCount : endIndex + overscan
  );
}

// ============================================
// Performance Utilities
// ============================================

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  let previous = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = window.setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      func.apply(this, args);
      rafId = null;
    });
  };
}

// ============================================
// Analytics Utilities
// ============================================

export function calculateDragDistance(
  startPosition: DragPosition,
  endPosition: DragPosition
): number {
  return Math.sqrt(
    Math.pow(endPosition.x - startPosition.x, 2) +
      Math.pow(endPosition.y - startPosition.y, 2)
  );
}

export function createAnalyticsEvent(
  type: string,
  data: Record<string, any>
): void {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", type, data);
  }
}

// ============================================
// Validation Utilities
// ============================================

export function validateDrop(
  _sourceContainerId: string,
  _targetContainerId: string,
  accepts?: string[],
  itemType?: string
): boolean {
  if (!accepts) return true;
  if (!itemType) return true;
  return accepts.includes(itemType);
}

export function canDropIntoItem(
  draggedItemId: string,
  targetItemId: string,
  items: Map<string, { id: string; parentId?: string | null }>,
  maxDepth?: number
): boolean {
  // Prevent dropping into self
  if (draggedItemId === targetItemId) return false;

  // Prevent dropping into descendants
  if (isDescendant(targetItemId, draggedItemId, items)) return false;

  // Check depth constraint
  if (maxDepth !== undefined) {
    const targetDepth = getDepth(targetItemId, items);
    if (targetDepth + 1 >= maxDepth) return false;
  }

  return true;
}
