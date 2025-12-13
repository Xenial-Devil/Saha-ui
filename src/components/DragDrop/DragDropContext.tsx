"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import type {
  DragDropContextValue,
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DropEvent,
  DragCancelEvent,
  DraggableItem,
  DragPosition,
  DragSensor,
  EnhancedDragDropContextProps,
  SelectionState,
  HistoryState,
  DragDropPlugin,
} from "./DragDrop.types";
import {
  exceedsThreshold,
  announce,
  getDefaultAnnouncement,
  getScrollableAncestors,
  calculateAutoScrollVelocity,
  calculateDragDistance,
  createAnalyticsEvent,
  getItemsBetween,
} from "./DragDrop.utils";

// ============================================
// Context
// ============================================

const DragDropContext = createContext<DragDropContextValue | null>(null);

export const useDragDropContext = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within DragDropProvider");
  }
  return context;
};

// ============================================
// Provider Component
// ============================================

export const DragDropProvider: React.FC<EnhancedDragDropContextProps> = ({
  children,
  sensors = ["mouse", "touch", "pointer"],
  autoScroll = true,
  autoScrollSpeed = 10,
  autoScrollThreshold = 50,
  dragThreshold = 5,
  announcements,
  // Advanced features
  snapToGrid,
  collisionDetection,
  enableUndo = false,
  maxHistory = 50,
  enableMultiDrag = false,
  plugins = [],
  onAnalytics,
  debug = false,
}) => {
  // Basic State
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<DraggableItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sourceContainerId, setSourceContainerId] = useState<string | null>(
    null
  );
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Multi-Selection State
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedIds: new Set(),
    anchorId: null,
    lastSelectedId: null,
  });

  // Undo/Redo State
  const [historyState, setHistoryState] = useState<HistoryState<any>>({
    past: [],
    future: [],
  });

  // Refs
  const draggables = useRef<Map<string, HTMLElement>>(new Map());
  const droppables = useRef<Map<string, HTMLElement>>(new Map());
  const pointerUpListenerRef = useRef<((ev: Event) => void) | null>(null);
  const initialPosition = useRef<DragPosition | null>(null);
  const currentSensor = useRef<DragSensor | null>(null);
  const autoScrollInterval = useRef<number | null>(null);
  const pluginRegistry = useRef<DragDropPlugin[]>(plugins);
  const dragStartTime = useRef<number>(0);
  const dragStartPosition = useRef<DragPosition | null>(null);

  // Registration
  const registerDraggable = useCallback((id: string, element: HTMLElement) => {
    draggables.current.set(id, element);
  }, []);

  const unregisterDraggable = useCallback((id: string) => {
    draggables.current.delete(id);
  }, []);

  const registerDroppable = useCallback((id: string, element: HTMLElement) => {
    droppables.current.set(id, element);
  }, []);

  const unregisterDroppable = useCallback((id: string) => {
    droppables.current.delete(id);
  }, []);

  // Multi-Selection Methods
  const selectItem = useCallback(
    (id: string, options?: { ctrlKey?: boolean; shiftKey?: boolean }) => {
      if (!enableMultiDrag) return;

      setSelectionState((prev) => {
        const newSelectedIds = new Set(prev.selectedIds);

        if (options?.shiftKey && prev.anchorId) {
          // Range selection
          const items = Array.from(draggables.current.keys());
          const anchorIndex = items.indexOf(prev.anchorId);
          const currentIndex = items.indexOf(id);
          const itemsInRange = getItemsBetween(
            anchorIndex,
            currentIndex,
            items.map((id) => ({ id }))
          );
          itemsInRange.forEach((itemId) => newSelectedIds.add(itemId));
        } else if (options?.ctrlKey) {
          // Toggle selection
          if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
          } else {
            newSelectedIds.add(id);
          }
        } else {
          // Single selection
          newSelectedIds.clear();
          newSelectedIds.add(id);
        }

        return {
          selectedIds: newSelectedIds,
          lastSelectedId: id,
          anchorId: options?.shiftKey ? prev.anchorId : id,
        };
      });
    },
    [enableMultiDrag]
  );

  const clearSelection = useCallback(() => {
    setSelectionState({
      selectedIds: new Set(),
      anchorId: null,
      lastSelectedId: null,
    });
  }, []);

  // Undo/Redo Methods
  const saveToHistory = useCallback(
    (snapshot: any) => {
      if (!enableUndo) return;

      setHistoryState((prev) => ({
        past: [...prev.past.slice(-maxHistory + 1), snapshot],
        future: [],
      }));
    },
    [enableUndo, maxHistory]
  );

  const undo = useCallback(() => {
    if (!enableUndo || historyState.past.length === 0) return null;

    const previous = historyState.past[historyState.past.length - 1];
    setHistoryState((prev) => ({
      past: prev.past.slice(0, -1),
      future: [previous, ...prev.future],
    }));

    return previous;
  }, [enableUndo, historyState.past]);

  const redo = useCallback(() => {
    if (!enableUndo || historyState.future.length === 0) return null;

    const next = historyState.future[0];
    setHistoryState((prev) => ({
      past: [...prev.past, next],
      future: prev.future.slice(1),
    }));

    return next;
  }, [enableUndo, historyState.future]);

  // Plugin Lifecycle
  const executePluginHook = useCallback((hookName: string, data: any) => {
    pluginRegistry.current.forEach((plugin) => {
      const hook = (plugin as any)[hookName];
      if (typeof hook === "function") {
        hook(data);
      }
    });
  }, []);

  // Drag Start
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      // Plugin hook
      executePluginHook("onDragStart", event);

      // Analytics
      dragStartTime.current = Date.now();
      dragStartPosition.current = event.position;

      setActiveId(event.item.id);
      setActiveItem(event.item);
      setActiveIndex(event.index);
      setSourceContainerId(event.containerId);
      setDragPosition(event.position);
      setIsDragging(true);
      initialPosition.current = event.position;
      currentSensor.current = event.sensor;

      // Announcement
      const message =
        announcements?.onDragStart?.(event) ||
        getDefaultAnnouncement("start", event);
      announce(message, "assertive");

      // Add global cursor (set on both <body> and <html> to be robust)
      try {
        document.body.style.cursor = "grabbing";
        document.documentElement.style.cursor = "grabbing";
      } catch {return;}

      // Safety: attach a pointerup listener to clear the cursor if a
      // drop/cancel path is missed for any reason.
      const resetCursor = () => {
        try {
          document.body.style.cursor = "";
        } catch {return;}
      };
      pointerUpListenerRef.current = resetCursor;
      window.addEventListener("pointerup", resetCursor, { once: true });

      // Debug
      if (debug) {
        console.log("[DragDrop] Drag Start:", event);
      }
    },
    [announcements, executePluginHook, debug]
  );

  // Drag Move
  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      if (!initialPosition.current) return;

      // Check threshold
      if (
        !isDragging &&
        !exceedsThreshold(
          event.currentPosition,
          initialPosition.current,
          dragThreshold
        )
      ) {
        return;
      }

      setDragPosition(event.currentPosition);

      // Auto scroll
      if (autoScroll && autoScrollInterval.current === null) {
        const scrollableElements = getScrollableAncestors(
          draggables.current.get(activeId!) || document.body
        );

        autoScrollInterval.current = window.setInterval(() => {
          scrollableElements.forEach(({ element, rect }) => {
            if (!dragPosition) return;

            const velocity = calculateAutoScrollVelocity(
              dragPosition,
              rect,
              autoScrollThreshold,
              autoScrollSpeed
            );

            if (velocity.x !== 0 || velocity.y !== 0) {
              element.scrollBy(velocity.x, velocity.y);
            }
          });
        }, 16); // ~60fps
      }
    },
    [
      isDragging,
      dragThreshold,
      autoScroll,
      autoScrollSpeed,
      autoScrollThreshold,
      activeId,
      dragPosition,
    ]
  );

  // Drag Over
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const message =
        announcements?.onDragOver?.(event) ||
        getDefaultAnnouncement("move", event);
      announce(message, "polite");
    },
    [announcements]
  );

  // Drop
  const handleDrop = useCallback(
    (event: DropEvent) => {
      // Clear auto scroll
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }

      // Analytics
      if (
        onAnalytics &&
        dragStartTime.current &&
        dragStartPosition.current &&
        event.position
      ) {
        const duration = Date.now() - dragStartTime.current;
        const distance = calculateDragDistance(
          dragStartPosition.current,
          event.position
        );

        onAnalytics({
          dragCount: 1,
          dropCount: 1,
          cancelCount: 0,
          averageDragDuration: duration,
          averageDragDistance: distance,
          itemMetrics: new Map([
            [
              event.item.id,
              { dragCount: 1, dropCount: 1, totalDistance: distance },
            ],
          ]),
          containerMetrics: new Map(),
        });

        createAnalyticsEvent("drag_drop_success", {
          duration,
          distance,
          itemId: event.item.id,
          containerId: event.containerId,
        });
      }

      // Plugin hook
      executePluginHook("onDrop", event);

      // Save to history
      saveToHistory(event);

      const message =
        announcements?.onDragEnd?.(event) ||
        getDefaultAnnouncement("drop", event);
      announce(message, "assertive");

      // Reset state
      setActiveId(null);
      setActiveItem(null);
      setActiveIndex(null);
      setSourceContainerId(null);
      setDragPosition(null);
      setIsDragging(false);
      initialPosition.current = null;
      currentSensor.current = null;
      dragStartTime.current = 0;
      dragStartPosition.current = null;

      // Reset cursor on both <body> and <html>
      try {
        document.body.style.cursor = "";
        document.documentElement.style.cursor = "";
      } catch {return;}

      // Remove safety pointerup listener if present
      if (pointerUpListenerRef.current) {
        try {
          window.removeEventListener(
            "pointerup",
            pointerUpListenerRef.current as any
          );
        } catch {return;}
        pointerUpListenerRef.current = null;
      }

      // Debug
      if (debug) {
        console.log("[DragDrop] Drop:", event);
      }
    },
    [announcements, onAnalytics, executePluginHook, saveToHistory, debug]
  );

  // Drag Cancel
  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      // Clear auto scroll
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }

      const message =
        announcements?.onDragCancel?.(event) ||
        getDefaultAnnouncement("cancel", event);
      announce(message, "assertive");

      // Reset state
      setActiveId(null);
      setActiveItem(null);
      setActiveIndex(null);
      setSourceContainerId(null);
      setDragPosition(null);
      setIsDragging(false);
      initialPosition.current = null;
      currentSensor.current = null;

      // Reset cursor on both <body> and <html>
      try {
        document.body.style.cursor = "";
        document.documentElement.style.cursor = "";
      } catch {return;}
    },
    [announcements]
  );

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDragging && activeItem) {
        handleDragCancel({
          item: activeItem,
          reason: "escape",
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDragging, activeItem, handleDragCancel]);

  // Global mouseup handler to catch drops outside containers
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      // If no container handled the drop, cancel the drag
      // This will be prevented by containers that handle the drop first
      setTimeout(() => {
        if (isDragging && activeItem) {
          handleDragCancel({
            item: activeItem,
            reason: "manual",
          });
        }
      }, 50); // Small delay to let containers handle drop first
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, handleDragCancel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      try {
        document.body.style.cursor = "";
        document.documentElement.style.cursor = "";
      } catch {return;}
    };
  }, []);

  // Apply snap to grid
  const applySnapToGrid = useCallback(
    (position: DragPosition): DragPosition => {
      if (!snapToGrid || !("gridSize" in snapToGrid)) return position;

      const { gridSize, offset = { x: 0, y: 0 } } = snapToGrid as {
        gridSize: number;
        offset?: { x: number; y: number };
      };

      return {
        x: Math.round((position.x - offset.x) / gridSize) * gridSize + offset.x,
        y: Math.round((position.y - offset.y) / gridSize) * gridSize + offset.y,
      };
    },
    [snapToGrid]
  );

  const value: DragDropContextValue = {
    activeId,
    activeItem,
    activeIndex,
    sourceContainerId,
    dragPosition,
    isDragging,
    sensors,
    dragThreshold,
    registerDraggable,
    unregisterDraggable,
    registerDroppable,
    unregisterDroppable,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDrop,
    handleDragCancel,
    // Advanced features
    selectionState,
    selectItem,
    clearSelection,
    historyState,
    undo,
    redo,
    saveToHistory,
    applySnapToGrid,
    collisionDetection,
    plugins: pluginRegistry.current,
    debug,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};

DragDropProvider.displayName = "DragDropProvider";
