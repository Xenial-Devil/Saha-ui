import React, { useState } from "react";
import { DragDropProvider, VirtualList } from "../components/DragDrop";
import type {
  DropEvent,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Virtual List Example
 *
 * Demonstrates:
 * - Efficient rendering of large datasets (10,000+ items)
 * - Smooth scrolling performance
 * - Dynamic item heights
 * - Overscan configuration
 */
export const VirtualListExample: React.FC = () => {
  const [items] = useState<DragItem[]>(() => {
    // Generate 10,000 items for demonstration
    return Array.from({ length: 10000 }, (_, i) => ({
      id: `item-${i}`,
      content: `Item ${i + 1} - ${generateRandomText()}`,
    }));
  });

  const handleDrop = (event: DropEvent) => {
    console.log("Virtual list drop event:", event);
  };

  return (
    <DragDropProvider onDrop={handleDrop}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Virtual List (10,000 Items)</h2>

        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">
            Performance Features:
          </h3>
          <ul className="list-disc list-inside text-green-800 space-y-1">
            <li>Only renders visible items (windowing)</li>
            <li>Smooth 60fps scrolling with 10,000 items</li>
            <li>Dynamic item heights supported</li>
            <li>Overscan buffer for smoother experience</li>
            <li>Efficient memory usage</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <VirtualList
            items={items}
            height={600}
            itemHeight={60}
            overscan={5}
            renderItem={(item) => (
              <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">{item.content}</div>
                <div className="text-sm text-gray-500">ID: {item.id}</div>
              </div>
            )}
          />
        </div>

        <div className="mt-4 text-center text-gray-600">
          <p>Scroll through 10,000 items with smooth performance! 🚀</p>
        </div>
      </div>
    </DragDropProvider>
  );
};

// Helper function to generate random text
function generateRandomText(): string {
  const texts = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor",
    "Incididunt ut labore",
    "Et dolore magna aliqua",
    "Ut enim ad minim veniam",
    "Quis nostrud exercitation",
    "Ullamco laboris nisi",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

export default VirtualListExample;
