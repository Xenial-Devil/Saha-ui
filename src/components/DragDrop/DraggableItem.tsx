"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import type { DraggableItemProps } from "./DragDrop.types";
import { draggableItemVariants } from "./DragDrop.styles";
import { useDragDropContext } from "./DragDropContext";
import { getEventCoordinates } from "./DragDrop.utils";

// ============================================
// Draggable Item Component
// ============================================

export const DraggableItem = <T extends { id: string }>({
  id,
  index,
  item,
  children,
  disabled = false,
  dragHandle = false,
  className,
  style,
  draggingClassName,
  draggingStyle,
  preview: _preview,
  type,
  data,
}: DraggableItemProps<T>) => {
  const context = useDragDropContext();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragHandleActive, setIsDragHandleActive] = useState(false);

  const isDragging = context.activeId === id;
  const isActive = context.activeId !== null;

  // Register/unregister
  useEffect(() => {
    if (elementRef.current && !disabled) {
      context.registerDraggable(id, elementRef.current);
      return () => context.unregisterDraggable(id);
    }
    return undefined;
  }, [id, disabled, context]);

  // Mouse sensor
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || (dragHandle && !isDragHandleActive)) return;
      if (e.button !== 0) return; // Only left click

      // Check if this item is already selected
      const isSelected = context.selectionState?.selectedIds.has(id);

      // Allow selection modifier clicks to pass through for multiselect
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        // Let SelectionManager handle this click
        if (context.selectItem) {
          context.selectItem(id, {
            ctrlKey: e.ctrlKey || e.metaKey,
            shiftKey: e.shiftKey,
          });
        }
        return;
      }

      // If clicking on a non-selected item (without modifiers), clear selection
      if (
        !isSelected &&
        context.selectionState?.selectedIds &&
        context.selectionState.selectedIds.size > 0
      ) {
        context.clearSelection?.();
      }

      const coords = getEventCoordinates(e.nativeEvent);
      if (!coords) return;

      e.preventDefault();

      let hasMoved = false;
      const startPosition = coords;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const moveCoords = getEventCoordinates(moveEvent);
        if (!moveCoords) return;

        if (!hasMoved && !context.isDragging) {
          // Check drag threshold
          const distance = Math.sqrt(
            Math.pow(moveCoords.x - startPosition.x, 2) +
              Math.pow(moveCoords.y - startPosition.y, 2)
          );

          if (distance > context.dragThreshold) {
            hasMoved = true;

            context.handleDragStart({
              item,
              index,
              containerId: type || "default",
              position: startPosition,
              sensor: "mouse",
            });
          }
        }

        if (hasMoved) {
          context.handleDragMove({
            item,
            index,
            containerId: type || "default",
            position: startPosition,
            sensor: "mouse",
            delta: {
              x: moveCoords.x - startPosition.x,
              y: moveCoords.y - startPosition.y,
            },
            currentPosition: moveCoords,
          });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Don't call handleDrop here - let DroppableContainer handle it
        // The DroppableContainer listens for mouseup and will trigger the drop
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [disabled, dragHandle, isDragHandleActive, item, index, type, context]
  );

  // Touch sensor
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || (dragHandle && !isDragHandleActive)) return;

      const coords = getEventCoordinates(e.nativeEvent);
      if (!coords) return;

      let hasMoved = false;
      const startPosition = coords;
      let longPressTimer: number | null = null;

      // Long press detection (500ms)
      longPressTimer = window.setTimeout(() => {
        hasMoved = true;
        context.handleDragStart({
          item,
          index,
          containerId: type || "default",
          position: startPosition,
          sensor: "touch",
        });
      }, 500);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }

        if (!hasMoved) return;

        const moveCoords = getEventCoordinates(moveEvent);
        if (!moveCoords) return;

        moveEvent.preventDefault();

        context.handleDragMove({
          item,
          index,
          containerId: type || "default",
          position: startPosition,
          sensor: "touch",
          delta: {
            x: moveCoords.x - startPosition.x,
            y: moveCoords.y - startPosition.y,
          },
          currentPosition: moveCoords,
        });
      };

      const handleTouchEnd = () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
        }

        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);

        if (hasMoved && context.isDragging) {
          context.handleDrop({
            item,
            sourceIndex: index,
            targetIndex: index,
            sourceContainerId: type || "default",
            targetContainerId: type || "default",
            effect: "move",
          });
        }
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [disabled, dragHandle, isDragHandleActive, item, index, type, context]
  );

  // Keyboard sensor
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      // Space or Enter to activate
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!context.isDragging) {
          const rect = elementRef.current?.getBoundingClientRect();
          if (rect) {
            context.handleDragStart({
              item,
              index,
              containerId: type || "default",
              position: { x: rect.left, y: rect.top },
              sensor: "keyboard",
            });
          }
        } else {
          // Drop
          context.handleDrop({
            item,
            sourceIndex: index,
            targetIndex: context.activeIndex || index,
            sourceContainerId: type || "default",
            targetContainerId: context.sourceContainerId || type || "default",
            effect: "move",
          });
        }
      }

      // Arrow keys to move
      if (context.isDragging && context.activeId === id) {
        const step = 10;
        let newPosition = { ...context.dragPosition! };

        switch (e.key) {
          case "ArrowUp":
            newPosition.y -= step;
            e.preventDefault();
            break;
          case "ArrowDown":
            newPosition.y += step;
            e.preventDefault();
            break;
          case "ArrowLeft":
            newPosition.x -= step;
            e.preventDefault();
            break;
          case "ArrowRight":
            newPosition.x += step;
            e.preventDefault();
            break;
        }

        context.handleDragMove({
          item,
          index,
          containerId: type || "default",
          position: context.dragPosition!,
          sensor: "keyboard",
          delta: {
            x: newPosition.x - context.dragPosition!.x,
            y: newPosition.y - context.dragPosition!.y,
          },
          currentPosition: newPosition,
        });
      }
    },
    [disabled, item, index, type, id, context]
  );

  // Provide drag handle activation
  const dragHandleProps = dragHandle
    ? {
        onDragHandleActive: () => setIsDragHandleActive(true),
        onDragHandleInactive: () => setIsDragHandleActive(false),
      }
    : {};

  return (
    <div
      ref={elementRef}
      className={cn(
        draggableItemVariants({ isDragging, disabled }),
        isDragging && draggingClassName,
        className
      )}
      style={{
        ...style,
        ...(isDragging ? draggingStyle : {}),
        // React-beautiful-dnd visual effects
        opacity: isDragging ? 0 : 1,
        transform: isDragging ? "scale(0.95)" : "scale(1)",
        transition: isDragging
          ? "opacity 0.2s ease, transform 0.2s cubic-bezier(0.2, 0, 0, 1)"
          : "transform 0.2s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-pressed={isDragging}
      aria-disabled={disabled}
      aria-roledescription="draggable item"
      aria-describedby={`draggable-item-${id}`}
      data-draggable="true"
      data-draggable-id={id}
      data-draggable-index={index}
      data-draggable-type={type}
      data-dragging={isDragging}
      {...(data || {})}
    >
      {typeof children === "function" && dragHandle
        ? (children as any)({ isDragging, isActive, ...dragHandleProps })
        : children}

      {/* Hidden description for screen readers */}
      <span id={`draggable-item-${id}`} className="sr-only">
        Press space or enter to start dragging. Use arrow keys to move. Press
        space or enter again to drop. Press escape to cancel.
      </span>
    </div>
  );
};

DraggableItem.displayName = "DraggableItem";
