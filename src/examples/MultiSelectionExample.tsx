import React, { useState } from "react";
import {
  DragDropProvider,
  SelectionManager,
  DroppableContainer,
  DraggableItem,
} from "../components/DragDrop";
import type {
  DropEvent,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Multi-Selection Example
 *
 * Demonstrates:
 * - Multi-item selection with Ctrl/Cmd + Click
 * - Range selection with Shift + Click
 * - Box selection (drag to select multiple)
 * - Select all (Ctrl/Cmd + A)
 * - Batch operations on selected items
 */
export const MultiSelectionExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: "1", content: "Task 1: Review pull request", containerId: "todo" },
    { id: "2", content: "Task 2: Update documentation", containerId: "todo" },
    { id: "3", content: "Task 3: Fix bug in login", containerId: "todo" },
    { id: "4", content: "Task 4: Add unit tests", containerId: "todo" },
    { id: "5", content: "Task 5: Refactor API calls", containerId: "todo" },
    {
      id: "6",
      content: "Task 6: Design new feature",
      containerId: "in-progress",
    },
    { id: "7", content: "Task 7: Code review", containerId: "in-progress" },
    { id: "8", content: "Task 8: Deploy to staging", containerId: "done" },
    { id: "9", content: "Task 9: Update changelog", containerId: "done" },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDrop = (event: DropEvent) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === event.item.id
          ? { ...item, containerId: event.containerId }
          : item
      )
    );
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleBulkMove = (targetContainer: string) => {
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, containerId: targetContainer }
          : item
      )
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.length} selected items?`)) {
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const todoItems = items.filter((item) => item.containerId === "todo");
  const inProgressItems = items.filter(
    (item) => item.containerId === "in-progress"
  );
  const doneItems = items.filter((item) => item.containerId === "done");

  return (
    <DragDropProvider onDrop={handleDrop} enableMultiDrag={true}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Kanban Board with Multi-Selection
        </h2>

        <SelectionManager
          items={items}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          enableBoxSelection={true}
          enableKeyboardShortcuts={true}
        >
          <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">
              Selection Controls ({selectedIds.length} selected)
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleBulkMove("todo")}
                disabled={selectedIds.length === 0}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Move to Todo
              </button>
              <button
                onClick={() => handleBulkMove("in-progress")}
                disabled={selectedIds.length === 0}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Move to In Progress
              </button>
              <button
                onClick={() => handleBulkMove("done")}
                disabled={selectedIds.length === 0}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Move to Done
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Selected
              </button>
            </div>
            <div className="mt-2 text-sm text-purple-800">
              <strong>Tips:</strong> Ctrl/Cmd+Click for multi-select •
              Shift+Click for range • Drag to box-select • Ctrl/Cmd+A to select
              all
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <DroppableContainer
              id="todo"
              className="min-h-[400px] p-4 bg-blue-50 border-2 border-blue-300 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
                To Do ({todoItems.length})
              </h3>
              <div className="space-y-2">
                {todoItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    data={item}
                    className={`p-3 bg-white border-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move ${
                      selectedIds.includes(item.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200"
                    }`}
                  >
                    {item.content}
                  </DraggableItem>
                ))}
              </div>
            </DroppableContainer>

            <DroppableContainer
              id="in-progress"
              className="min-h-[400px] p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4 text-yellow-900">
                In Progress ({inProgressItems.length})
              </h3>
              <div className="space-y-2">
                {inProgressItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    data={item}
                    className={`p-3 bg-white border-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move ${
                      selectedIds.includes(item.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200"
                    }`}
                  >
                    {item.content}
                  </DraggableItem>
                ))}
              </div>
            </DroppableContainer>

            <DroppableContainer
              id="done"
              className="min-h-[400px] p-4 bg-green-50 border-2 border-green-300 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4 text-green-900">
                Done ({doneItems.length})
              </h3>
              <div className="space-y-2">
                {doneItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    data={item}
                    className={`p-3 bg-white border-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move ${
                      selectedIds.includes(item.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200"
                    }`}
                  >
                    {item.content}
                  </DraggableItem>
                ))}
              </div>
            </DroppableContainer>
          </div>
        </SelectionManager>
      </div>
    </DragDropProvider>
  );
};

export default MultiSelectionExample;
