"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainer } from "./DroppableContainer";
import type { VirtualItem } from "./DragDrop.types";
import { cn } from "../../lib/utils";

// ============================================
// VirtualList Component Props
// ============================================

export interface VirtualListProps<T = any> {
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

// ============================================
// VirtualList Component
// ============================================

export const VirtualList = <T extends { id: string } = any>({
  items,
  itemHeight,
  containerHeight,
  onReorder,
  renderItem,
  overscan = 3,
  className,
  estimatedItemSize: _estimatedItemSize = 50,
  onScroll,
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef<number | null>(null);

  // Calculate item heights and positions
  const { virtualItems, totalHeight, startIndex, endIndex } = useMemo(() => {
    const getItemHeight =
      typeof itemHeight === "function" ? itemHeight : () => itemHeight;

    let currentOffset = 0;
    const virtualItems: VirtualItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight(i);
      const start = currentOffset;
      const end = start + height;

      virtualItems.push({
        key: `virtual-${i}`,
        index: i,
        start,
        size: height,
        end,
      });

      currentOffset = end;
    }

    const totalHeight = currentOffset;

    // Find visible range
    const visibleStart = scrollTop;
    const visibleEnd = scrollTop + containerHeight;

    const startIndex = virtualItems.findIndex(
      (item) => item.end > visibleStart
    );
    const endIndex = virtualItems.findIndex((item) => item.start > visibleEnd);

    const startWithOverscan = Math.max(0, startIndex - overscan);
    const endWithOverscan =
      endIndex === -1
        ? items.length
        : Math.min(items.length, endIndex + overscan);

    return {
      virtualItems,
      totalHeight,
      startIndex: startWithOverscan,
      endIndex: endWithOverscan,
    };
  }, [items.length, itemHeight, scrollTop, containerHeight, overscan]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return virtualItems.slice(startIndex, endIndex);
  }, [virtualItems, startIndex, endIndex]);

  // Handle scroll
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;

      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop, target.scrollHeight);

      // Debounce scroll events
      if (scrollingRef.current !== null) {
        clearTimeout(scrollingRef.current);
      }

      scrollingRef.current = window.setTimeout(() => {
        scrollingRef.current = null;
      }, 150);
    },
    [onScroll]
  );

  // Handle drop
  const handleDrop = useCallback(
    (event: any) => {
      if (!onReorder) return;

      const { sourceIndex, targetIndex } = event;

      // Reorder items
      const newItems = [...items];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, removed);

      onReorder(newItems);
    },
    [items, onReorder]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollingRef.current !== null) {
        clearTimeout(scrollingRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn("overflow-auto relative", className)}
      style={{ height: containerHeight }}
    >
      <DroppableContainer
        id="virtual-list"
        items={items}
        onDrop={handleDrop}
        style={{ height: totalHeight, position: "relative" }}
      >
        {() =>
          visibleItems.map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <DraggableItem
                  id={item.id}
                  index={virtualItem.index}
                  item={item}
                  data={{
                    virtualIndex: virtualItem.index,
                    virtualStart: virtualItem.start,
                    virtualSize: virtualItem.size,
                  }}
                >
                  {renderItem(item, virtualItem.index, virtualItem)}
                </DraggableItem>
              </div>
            );
          })
        }
      </DroppableContainer>
    </div>
  );
};

VirtualList.displayName = "VirtualList";

// ============================================
// Utility Hook: useVirtualScroll
// ============================================

export interface UseVirtualScrollOptions {
  itemCount: number;
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan?: number;
}

export const useVirtualScroll = ({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 3,
}: UseVirtualScrollOptions) => {
  const [scrollTop, setScrollTop] = useState(0);

  const virtualData = useMemo(() => {
    const getItemHeight =
      typeof itemHeight === "function" ? itemHeight : () => itemHeight;

    let currentOffset = 0;
    const items: VirtualItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      const height = getItemHeight(i);
      const start = currentOffset;
      const end = start + height;

      items.push({
        key: `virtual-${i}`,
        index: i,
        start,
        size: height,
        end,
      });

      currentOffset = end;
    }

    const totalHeight = currentOffset;
    const visibleStart = scrollTop;
    const visibleEnd = scrollTop + containerHeight;

    const startIndex = items.findIndex((item) => item.end > visibleStart);
    const endIndex = items.findIndex((item) => item.start > visibleEnd);

    const startWithOverscan = Math.max(0, startIndex - overscan);
    const endWithOverscan =
      endIndex === -1 ? itemCount : Math.min(itemCount, endIndex + overscan);

    return {
      items,
      totalHeight,
      startIndex: startWithOverscan,
      endIndex: endWithOverscan,
      visibleItems: items.slice(startWithOverscan, endWithOverscan),
    };
  }, [itemCount, itemHeight, scrollTop, containerHeight, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const scrollToIndex = useCallback(
    (index: number, align: "start" | "center" | "end" = "start") => {
      const item = virtualData.items[index];
      if (!item) return;

      let scrollTo = item.start;

      if (align === "center") {
        scrollTo = item.start - containerHeight / 2 + item.size / 2;
      } else if (align === "end") {
        scrollTo = item.end - containerHeight;
      }

      setScrollTop(
        Math.max(
          0,
          Math.min(scrollTo, virtualData.totalHeight - containerHeight)
        )
      );
    },
    [virtualData, containerHeight]
  );

  return {
    ...virtualData,
    scrollTop,
    handleScroll,
    scrollToIndex,
  };
};
