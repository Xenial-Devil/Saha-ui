import React, { useState } from "react";
import {
  DragDropProvider,
  SelectionManager,
  DroppableContainer,
  DraggableItem,
  DragOverlay,
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
    // Check if the dropped item is part of a multi-selection
    const isMultiDrag =
      selectedIds.includes(event.item.id) && selectedIds.length > 1;

    if (isMultiDrag) {
      // Move all selected items to the target container
      setItems((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? { ...item, containerId: event.containerId }
            : item
        )
      );
      // Clear selection after multi-drop
      setSelectedIds([]);
    } else {
      // Single item drop
      setItems((prev) =>
        prev.map((item) =>
          item.id === event.item.id
            ? { ...item, containerId: event.containerId }
            : item
        )
      );
      // Clear selection if any
      if (selectedIds.length > 0) {
        setSelectedIds([]);
      }
    }
  };

  const handleSelectionChange = (ids: Set<string>) => {
    setSelectedIds(Array.from(ids));
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
    <DragDropProvider enableMultiDrag={true}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Kanban Board with Multi-Selection
        </h2>

        <DragOverlay>
          {items
            .filter((item) => selectedIds.includes(item.id))
            .map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/90 dark:to-pink-900/90 border-2 border-purple-400 dark:border-purple-500 rounded-xl shadow-2xl backdrop-blur-sm mb-2"
                style={{
                  marginTop: idx === 0 ? 0 : "-40px",
                  transform: `translateX(${idx * 4}px) translateY(${
                    idx * 4
                  }px)`,
                  opacity: idx === 0 ? 1 : 0.8 - idx * 0.15,
                  zIndex: 100 - idx,
                }}
              >
                <div className="flex items-center gap-3">
                  {idx === 0 && selectedIds.length > 1 && (
                    <div className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                      {selectedIds.length} items
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {idx === 0 ? item.content : ""}
                  </span>
                </div>
              </div>
            ))}
        </DragOverlay>

        <SelectionManager
          items={items}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          enableBoxSelection={true}
          enableKeyboardShortcuts={true}
        >
          <div className="mb-6 p-6 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-2xl shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              <h3 className="font-bold text-lg bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                Selection Controls
              </h3>
              <span className="ml-auto px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-md">
                {selectedIds.length} selected
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleBulkMove("todo")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                📋 Move to Todo
              </button>
              <button
                onClick={() => handleBulkMove("in-progress")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                ⚡ Move to In Progress
              </button>
              <button
                onClick={() => handleBulkMove("done")}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                ✅ Move to Done
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                🗑️ Delete Selected
              </button>
            </div>
            <div className="mt-4 p-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-xl text-sm text-purple-900 dark:text-purple-200">
              <strong className="font-semibold">💡 Tips:</strong> Ctrl/Cmd+Click
              for multi-select • Shift+Click for range • Drag to box-select •
              Ctrl/Cmd+A to select all
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  📋 To Do
                </h3>
                <span className="ml-auto px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                  {todoItems.length}
                </span>
              </div>
              <DroppableContainer
                id="todo"
                items={todoItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`group relative p-4 mb-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-move ${
                      Array.isArray(selectedIds) &&
                      selectedIds.includes(item.id)
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-400 dark:border-purple-500 shadow-md ring-2 ring-purple-200 dark:ring-purple-700"
                        : "bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 border-2 border-blue-100 dark:border-blue-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {Array.isArray(selectedIds) &&
                        selectedIds.includes(item.id) && (
                          <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">
                        {item.content}
                      </span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full" />
                <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  ⚡ In Progress
                </h3>
                <span className="ml-auto px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full">
                  {inProgressItems.length}
                </span>
              </div>
              <DroppableContainer
                id="in-progress"
                items={inProgressItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-yellow-200 dark:border-yellow-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`group relative p-4 mb-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-move ${
                      Array.isArray(selectedIds) &&
                      selectedIds.includes(item.id)
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-400 dark:border-purple-500 shadow-md ring-2 ring-purple-200 dark:ring-purple-700"
                        : "bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-800 dark:to-yellow-900/10 border-2 border-yellow-100 dark:border-yellow-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {Array.isArray(selectedIds) &&
                        selectedIds.includes(item.id) && (
                          <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">
                        {item.content}
                      </span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ✅ Done
                </h3>
                <span className="ml-auto px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                  {doneItems.length}
                </span>
              </div>
              <DroppableContainer
                id="done"
                items={doneItems}
                onDrop={handleDrop}
                className="min-h-[400px] p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {(item, index) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    className={`group relative p-4 mb-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-move ${
                      Array.isArray(selectedIds) &&
                      selectedIds.includes(item.id)
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-400 dark:border-purple-500 shadow-md ring-2 ring-purple-200 dark:ring-purple-700"
                        : "bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10 border-2 border-green-100 dark:border-green-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {Array.isArray(selectedIds) &&
                        selectedIds.includes(item.id) && (
                          <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">
                        {item.content}
                      </span>
                    </div>
                  </DraggableItem>
                )}
              </DroppableContainer>
            </div>
          </div>
        </SelectionManager>
      </div>
    </DragDropProvider>
  );
};

export default MultiSelectionExample;
