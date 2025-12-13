"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import type {
  DroppableContainerProps,
  DraggableItem as DragItem,
} from "./DragDrop.types";
import { droppableContainerVariants } from "./DragDrop.styles";
import { useDragDropContext } from "./DragDropContext";

export const DroppableContainer = <T extends { id: string }>({
  id,
  items,
  children,
  direction = "vertical",
  className,
  disabled = false,
  accepts,
  renderEmpty,
  style,
  onDrop,
}: DroppableContainerProps<T>) => {
  const context = useDragDropContext();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const targetIndexRef = useRef<number>(0);
  const draggedItemRef = useRef<HTMLElement | null>(null);

  const isEmpty = items.length === 0;

  // Store dragged item dimensions for placeholder
  useEffect(() => {
    if (context.isDragging && context.activeId) {
      const draggedElement = document.querySelector(
        `[data-draggable-id="${context.activeId}"]`
      ) as HTMLElement;
      draggedItemRef.current = draggedElement;
    } else {
      draggedItemRef.current = null;
      setPlaceholderIndex(null);
    }
  }, [context.isDragging, context.activeId]);

  // Register/unregister
  useEffect(() => {
    if (elementRef.current && !disabled) {
      context.registerDroppable(id, elementRef.current);
      return () => context.unregisterDroppable(id);
    }
    return undefined;
  }, [id, disabled, context]);

  // Handle hover - calculate drop position (react-dnd pattern)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !context.isDragging || !context.activeItem) return;

      // Check if accepts this type
      if (accepts && context.activeItem.type) {
        if (!accepts.includes(context.activeItem.type)) {
          return;
        }
      }

      if (!isOver) setIsOver(true);

      // Calculate target index based on mouse position
      const containerRect = elementRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const itemElements = Array.from(
        elementRef.current?.querySelectorAll("[data-draggable-id]") || []
      );

      let targetIndex = items.length;

      if (direction === "vertical") {
        const mouseY = e.clientY;
        for (let i = 0; i < itemElements.length; i++) {
          const item = itemElements[i] as HTMLElement;
          const rect = item.getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2;
          if (mouseY < midpoint) {
            targetIndex = i;
            break;
          }
        }
      } else {
        const mouseX = e.clientX;
        for (let i = 0; i < itemElements.length; i++) {
          const item = itemElements[i] as HTMLElement;
          const rect = item.getBoundingClientRect();
          const midpoint = rect.left + rect.width / 2;
          if (mouseX < midpoint) {
            targetIndex = i;
            break;
          }
        }
      }

      targetIndexRef.current = targetIndex;
      setPlaceholderIndex(targetIndex);
    },
    [disabled, accepts, context, isOver, items.length, direction]
  );

  const handleMouseLeave = useCallback(() => {
    setIsOver(false);
  }, []);

  // Listen for global mouse up to handle drop
  useEffect(() => {
    if (!context.isDragging || !isOver) return;

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (disabled || !context.activeItem) return;

      e.stopPropagation(); // Prevent cancel handler from firing

      setIsOver(false);

      // Trigger drop event with pre-calculated position
      const dropEvent = {
        item: context.activeItem,
        sourceIndex: context.activeIndex!,
        targetIndex: targetIndexRef.current,
        sourceContainerId: context.sourceContainerId!,
        targetContainerId: id,
        containerId: id,
        effect: "move" as const,
        position: { x: e.clientX, y: e.clientY },
      } as any;

      context.handleDrop(dropEvent);
      onDrop?.(dropEvent);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp, true);
    return () =>
      document.removeEventListener("mouseup", handleGlobalMouseUp, true);
  }, [disabled, id, context, onDrop, isOver]);

  const renderItems = () => {
    if (isEmpty && renderEmpty) {
      return renderEmpty();
    }

    const itemsWithPlaceholder: (DragItem | { isPlaceholder: boolean })[] = [];
    const isDraggingFromThis = context.sourceContainerId === id;

    items.forEach((item, index) => {
      // Skip the dragged item to avoid duplication
      if (context.activeId === item.id && isDraggingFromThis) {
        return;
      }

      // Add placeholder before this item if needed
      if (isOver && placeholderIndex === index) {
        itemsWithPlaceholder.push({ isPlaceholder: true });
      }

      itemsWithPlaceholder.push(item);
    });

    // Add placeholder at the end if needed
    if (isOver && placeholderIndex === items.length) {
      itemsWithPlaceholder.push({ isPlaceholder: true });
    }

    return itemsWithPlaceholder.map((item, index) => {
      if ("isPlaceholder" in item && item.isPlaceholder) {
        const draggedHeight = draggedItemRef.current?.offsetHeight || 60;
        const draggedWidth = draggedItemRef.current?.offsetWidth || 200;
        return (
          <div
            key={`placeholder-${index}`}
            style={{
              height: direction === "vertical" ? draggedHeight : "auto",
              width: direction === "horizontal" ? draggedWidth : "auto",
              transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "2px dashed rgba(59, 130, 246, 0.3)",
              borderRadius: "8px",
              margin: "4px 0",
            }}
            role="presentation"
            aria-label="Drop zone"
          />
        );
      }

      const actualItem = item as T;
      const actualIndex = items.findIndex((i) => i.id === actualItem.id);

      // Calculate displacement for smooth animations
      let transform = "none";
      if (placeholderIndex !== null && context.isDragging) {
        // If item is after placeholder, shift down/right
        if (
          actualIndex >= placeholderIndex &&
          context.activeId !== actualItem.id
        ) {
          const placeholderHeight = draggedItemRef.current?.offsetHeight || 0;
          const placeholderWidth = draggedItemRef.current?.offsetWidth || 0;

          if (direction === "vertical") {
            transform = `translateY(${placeholderHeight + 8}px)`; // +8 for margin
          } else {
            transform = `translateX(${placeholderWidth + 8}px)`;
          }
        }
      }

      return (
        <div
          key={actualItem.id}
          role="listitem"
          style={{
            transform,
            transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {children(actualItem, actualIndex)}
        </div>
      );
    });
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        droppableContainerVariants({
          direction,
          isOver,
          isEmpty,
          disabled,
        }),
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-droppable-id={id}
      data-droppable-direction={direction}
      role="list"
      aria-label={`Droppable container ${id}`}
    >
      {renderItems()}
    </div>
  );
};

DroppableContainer.displayName = "DroppableContainer";
