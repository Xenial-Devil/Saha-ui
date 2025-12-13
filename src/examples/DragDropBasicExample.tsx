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
                style={{
                  cursor: "grab",
                  userSelect: "none",
                }}
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
                style={{
                  cursor: "grab",
                  userSelect: "none",
                }}
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
