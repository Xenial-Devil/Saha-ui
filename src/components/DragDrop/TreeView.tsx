"use client";

import React, { useState, useCallback, useMemo } from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainer } from "./DroppableContainer";
import type { TreeItem, NestedDragConstraints } from "./DragDrop.types";
import { buildTree, canDropIntoItem, getDepth } from "./DragDrop.utils";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { cn } from "../../lib/utils";

// ============================================
// TreeView Component Props
// ============================================

export interface TreeViewProps<T extends TreeItem = TreeItem> {
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

interface TreeNodeProps<T extends TreeItem = TreeItem> {
  item: T & { depth: number };
  index: number;
  expanded: Set<string>;
  onToggle: (itemId: string) => void;
  renderItem?: (item: T, depth: number) => React.ReactNode;
  indentSize: number;
  showLines: boolean;
  constraints?: NestedDragConstraints;
}

// ============================================
// TreeNode Component
// ============================================

const TreeNode = <T extends TreeItem = TreeItem>({
  item,
  index,
  expanded,
  onToggle,
  renderItem,
  indentSize,
  showLines,
  constraints: _constraints,
}: TreeNodeProps<T>) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded.has(item.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle(item.id);
    }
  };

  return (
    <div className="relative">
      <DraggableItem id={item.id} index={index} item={item as any}>
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-3 hover:bg-accent rounded-md transition-colors",
            "cursor-pointer select-none"
          )}
          style={{
            paddingLeft: `${item.depth * indentSize + 12}px`,
          }}
        >
          {/* Tree Lines */}
          {showLines && item.depth > 0 && (
            <div className="absolute left-0 top-0 bottom-0">
              {Array.from({ length: item.depth }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-border"
                  style={{
                    left: `${i * indentSize + indentSize / 2}px`,
                  }}
                />
              ))}
              <div
                className="absolute top-1/2 w-2 h-px bg-border"
                style={{
                  left: `${item.depth * indentSize - indentSize / 2}px`,
                }}
              />
            </div>
          )}

          {/* Expand/Collapse Button */}
          <button
            onClick={handleToggle}
            className={cn(
              "flex items-center justify-center w-4 h-4 hover:bg-muted rounded transition-colors",
              !hasChildren && "invisible"
            )}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {hasChildren && (
              <>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </>
            )}
          </button>

          {/* Icon */}
          <div className="flex-shrink-0">
            {hasChildren ? (
              <Folder className={cn("w-4 h-4", isExpanded && "text-primary")} />
            ) : (
              <File className="w-4 h-4 text-muted-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderItem ? (
              renderItem(item as T, item.depth)
            ) : (
              <span className="truncate">{item.label || item.id}</span>
            )}
          </div>
        </div>
      </DraggableItem>
    </div>
  );
};

// ============================================
// TreeView Component
// ============================================

export const TreeView = <T extends TreeItem = TreeItem>({
  items,
  onReorder,
  onExpand,
  onCollapse,
  renderItem,
  constraints,
  className,
  indentSize = 20,
  showLines = true,
}: TreeViewProps<T>) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Flatten tree for rendering
  const flatItems = useMemo(() => {
    const flatten = (items: T[], depth = 0): Array<T & { depth: number }> => {
      return items.reduce((acc, item) => {
        acc.push({ ...item, depth });
        if (
          item.children &&
          item.children.length > 0 &&
          expanded.has(item.id)
        ) {
          acc.push(...flatten(item.children as T[], depth + 1));
        }
        return acc;
      }, [] as Array<T & { depth: number }>);
    };

    return flatten(items);
  }, [items, expanded]);

  // Toggle expand/collapse
  const handleToggle = useCallback(
    (itemId: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
          onCollapse?.(itemId);
        } else {
          next.add(itemId);
          onExpand?.(itemId);
        }
        return next;
      });
    },
    [onExpand, onCollapse]
  );

  // Handle drop
  const handleDrop = useCallback(
    (event: any) => {
      if (!onReorder) return;

      const { sourceIndex, targetIndex, item: draggedItem } = event;
      const targetItem = flatItems[targetIndex];

      // Validate drop
      const itemMap = new Map(
        flatItems.map((item) => [
          item.id,
          { id: item.id, parentId: item.parentId },
        ])
      );

      if (
        !canDropIntoItem(
          draggedItem.id,
          targetItem.id,
          itemMap,
          constraints?.maxDepth
        )
      ) {
        return;
      }

      // Check depth constraints
      if (constraints?.maxDepth !== undefined) {
        const targetDepth = getDepth(targetItem.id, itemMap);
        if (targetDepth >= constraints.maxDepth) {
          return;
        }
      }

      // Reorder items
      const newFlatItems = [...flatItems];
      const [removed] = newFlatItems.splice(sourceIndex, 1);
      newFlatItems.splice(targetIndex, 0, removed);

      // Rebuild tree
      const newTree = buildTree(
        newFlatItems.map((item, idx) => ({
          ...item,
          parentId:
            idx > 0 && newFlatItems[idx - 1].depth < item.depth
              ? newFlatItems[idx - 1].id
              : null,
        }))
      );

      onReorder(newTree as T[]);
    },
    [flatItems, onReorder, constraints]
  );

  return (
    <DroppableContainer
      id="tree-root"
      items={flatItems}
      onDrop={handleDrop}
      className={cn("space-y-1", className)}
    >
      {(item: any, index: number) => (
        <TreeNode
          key={item.id}
          item={item}
          index={index}
          expanded={expanded}
          onToggle={handleToggle}
          renderItem={renderItem}
          indentSize={indentSize}
          showLines={showLines}
          constraints={constraints}
        />
      )}
    </DroppableContainer>
  );
};

TreeView.displayName = "TreeView";
