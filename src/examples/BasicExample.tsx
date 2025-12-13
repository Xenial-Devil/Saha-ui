import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
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
    { id: "1", content: "Item 1", containerId: "container-1" },
    { id: "2", content: "Item 2", containerId: "container-1" },
    { id: "3", content: "Item 3", containerId: "container-1" },
    { id: "4", content: "Item 4", containerId: "container-2" },
    { id: "5", content: "Item 5", containerId: "container-2" },
  ]);

  const handleDrop = (event: DropEvent) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === event.item.id
          ? { ...item, containerId: event.containerId }
          : item
      );
      return updated;
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
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Container 1</h3>
          <DroppableContainer
            id="container-1"
            items={container1Items}
            onDrop={handleDrop}
            className="min-h-[300px] p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-2"
          >
            {(item, index) => (
              <DraggableItem
                id={item.id}
                index={index}
                item={item}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
              >
                {item.content}
              </DraggableItem>
            )}
          </DroppableContainer>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Container 2</h3>
          <DroppableContainer
            id="container-2"
            items={container2Items}
            onDrop={handleDrop}
            className="min-h-[300px] p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-2"
          >
            {(item, index) => (
              <DraggableItem
                id={item.id}
                index={index}
                item={item}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
              >
                {item.content}
              </DraggableItem>
            )}
          </DroppableContainer>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default BasicExample;
