"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useDragDropContext } from "./DragDropContext";
import { cn } from "../../lib/utils";

// ============================================
// SelectionManager Component Props
// ============================================

export interface SelectionManagerProps {
  children: React.ReactNode;
  items?: any[];
  selectedIds?: string[];
  enabled?: boolean;
  enableBoxSelection?: boolean;
  enableKeyboardShortcuts?: boolean;
  className?: string;
  selectionClassName?: string;
  onSelectionChange?: (selectedIds: Set<string>) => void;
}

// ============================================
// SelectionManager Component
// ============================================

export const SelectionManager: React.FC<SelectionManagerProps> = ({
  children,
  enabled = true,
  className,
  selectionClassName,
  onSelectionChange,
}) => {
  const context = useDragDropContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const isSelecting = useRef(false);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const [selectionBox, setSelectionBox] = React.useState<DOMRect | null>(null);

  const { selectionState, selectItem, clearSelection } = context;

  // Handle selection change
  useEffect(() => {
    if (selectionState && onSelectionChange) {
      onSelectionChange(selectionState.selectedIds);
    }
  }, [selectionState, onSelectionChange]);

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!enabled || e.button !== 0) return;

      // Check if clicking on a draggable item
      const target = e.target as HTMLElement;
      const isDraggable = target.closest("[data-draggable]");

      if (isDraggable) {
        // Only handle selection if modifier keys are pressed
        // Otherwise, let DraggableItem handle it for drag operations
        if (e.ctrlKey || e.metaKey || e.shiftKey) {
          const itemId = isDraggable.getAttribute("data-draggable-id");
          if (itemId && selectItem) {
            selectItem(itemId, {
              ctrlKey: e.ctrlKey || e.metaKey,
              shiftKey: e.shiftKey,
            });
          }
        }
        return;
      }

      // Start box selection
      if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
        clearSelection?.();
      }

      isSelecting.current = true;
      startPoint.current = { x: e.clientX, y: e.clientY };
    },
    [enabled, selectItem, clearSelection]
  );

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isSelecting.current || !startPoint.current) return;

    const currentPoint = { x: e.clientX, y: e.clientY };
    const rect = new DOMRect(
      Math.min(startPoint.current.x, currentPoint.x),
      Math.min(startPoint.current.y, currentPoint.y),
      Math.abs(currentPoint.x - startPoint.current.x),
      Math.abs(currentPoint.y - startPoint.current.y)
    );

    setSelectionBox(rect);
  }, []);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isSelecting.current && selectionBox && containerRef.current) {
      // Find items within selection box
      const draggables =
        containerRef.current.querySelectorAll("[data-draggable]");
      const selectedIds: string[] = [];

      draggables.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          selectionBox &&
          rect.left < selectionBox.right &&
          rect.right > selectionBox.left &&
          rect.top < selectionBox.bottom &&
          rect.bottom > selectionBox.top
        ) {
          const itemId = el.getAttribute("data-draggable-id");
          if (itemId) {
            selectedIds.push(itemId);
          }
        }
      });

      // Select items
      selectedIds.forEach((id) => {
        selectItem?.(id, { ctrlKey: true });
      });
    }

    isSelecting.current = false;
    startPoint.current = null;
    setSelectionBox(null);
  }, [selectionBox, selectItem]);

  // Attach event listeners
  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [enabled, handleMouseDown, handleMouseMove, handleMouseUp]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + A - Select all
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        if (containerRef.current) {
          const draggables =
            containerRef.current.querySelectorAll("[data-draggable]");
          draggables.forEach((el) => {
            const itemId = el.getAttribute("data-draggable-id");
            if (itemId) {
              selectItem?.(itemId, { ctrlKey: true });
            }
          });
        }
      }

      // Escape - Clear selection
      if (e.key === "Escape") {
        clearSelection?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, selectItem, clearSelection]);

  // Compute selection box style relative to the container to avoid
  // viewport/ancestor-transform issues (sidebar or shifted layouts).
  const selectionStyle = React.useMemo(() => {
    if (!selectionBox || !containerRef.current) return undefined;
    const containerRect = containerRef.current.getBoundingClientRect();
    const left =
      selectionBox.left - containerRect.left + containerRef.current.scrollLeft;
    const top =
      selectionBox.top - containerRect.top + containerRef.current.scrollTop;
    return {
      left,
      top,
      width: selectionBox.width,
      height: selectionBox.height,
      position: "absolute" as const,
    };
  }, [selectionBox]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {children}

      {/* Selection Box (positioned relative to the container to avoid shifts) */}
      {selectionBox && selectionStyle && (
        <div
          className={cn(
            "pointer-events-none border-2 border-primary bg-primary/10 z-50",
            selectionClassName
          )}
          style={selectionStyle}
        />
      )}

      {/* Selection Info */}
      {selectionState && selectionState.selectedIds.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg px-4 py-2 z-50">
          <p className="text-sm font-medium">
            {selectionState.selectedIds.size} item
            {selectionState.selectedIds.size !== 1 ? "s" : ""} selected
          </p>
          <button
            onClick={clearSelection}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

SelectionManager.displayName = "SelectionManager";

// ============================================
// Selection Badge Component
// ============================================

export interface SelectionBadgeProps {
  itemId: string;
  className?: string;
}

export const SelectionBadge: React.FC<SelectionBadgeProps> = ({
  itemId,
  className,
}) => {
  const { selectionState } = useDragDropContext();
  const isSelected = selectionState?.selectedIds.has(itemId);

  if (!isSelected || !selectionState) return null;

  const index = Array.from(selectionState.selectedIds).indexOf(itemId);

  return (
    <div
      className={cn(
        "absolute top-1 right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground",
        "flex items-center justify-center text-xs font-medium shadow-md z-10",
        className
      )}
    >
      {index + 1}
    </div>
  );
};

SelectionBadge.displayName = "SelectionBadge";
