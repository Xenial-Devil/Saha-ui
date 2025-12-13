import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DragHandle,
} from "../components/DragDrop";
import type {
  DropEvent,
  DragDropPlugin,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Plugin System Example
 *
 * Demonstrates:
 * - Custom plugin creation
 * - Plugin lifecycle hooks
 * - Event interception
 * - Custom behavior injection
 */
export const PluginExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: "1", content: "Item 1", containerId: "container-1" },
    { id: "2", content: "Item 2", containerId: "container-1" },
    { id: "3", content: "Item 3", containerId: "container-1" },
    { id: "4", content: "Item 4", containerId: "container-2" },
    { id: "5", content: "Item 5", containerId: "container-2" },
  ]);

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev.slice(-9),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  // Custom logging plugin
  const loggingPlugin: DragDropPlugin = {
    name: "logger",
    version: "1.0.0",
    onDragStart: (event) => {
      addLog(`🟢 Drag started: ${event.item.content}`);
    },
    onDragMove: (event) => {
      // Throttled for performance
      if (Math.random() < 0.1) {
        addLog(`🔵 Dragging: ${event.item.content}`);
      }
    },
    onDragEnd: (event) => {
      addLog(`🔴 Drag ended: ${event.item.content}`);
    },
    onDrop: (event) => {
      addLog(`✅ Dropped in: ${event.containerId}`);
    },
  };

  // Custom validation plugin
  const validationPlugin: DragDropPlugin = {
    name: "validator",
    version: "1.0.0",
    onDrop: (event) => {
      // Example: Prevent dropping certain items in container-2
      if (event.containerId === "container-2" && event.item.id === "1") {
        addLog(`⛔ Validation failed: Item 1 cannot go to Container 2`);
        return false; // Prevent drop
      }
      return true;
    },
  };

  // Custom animation plugin
  const animationPlugin: DragDropPlugin = {
    name: "animator",
    version: "1.0.0",
    onDragStart: (event) => {
      addLog(`🎬 Animation: Applying drag effect`);
      // Custom animation logic would go here
    },
    onDrop: (event) => {
      addLog(`🎬 Animation: Applying drop effect`);
      // Custom animation logic would go here
    },
  };

  const handleDrop = (event: DropEvent) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === event.item.id
          ? { ...item, containerId: event.containerId }
          : item
      )
    );
  };

  const container1Items = items.filter(
    (item) => item.containerId === "container-1"
  );
  const container2Items = items.filter(
    (item) => item.containerId === "container-2"
  );

  return (
    <DragDropProvider
      onDrop={handleDrop}
      plugins={[loggingPlugin, validationPlugin, animationPlugin]}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Plugin System Demo</h2>

        {/* Plugin Info */}
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-semibold text-indigo-900 mb-2">
            🔌 Active Plugins:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-900">Logger Plugin</div>
              <div className="text-xs text-indigo-700">
                Logs all drag events
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-900">Validator Plugin</div>
              <div className="text-xs text-indigo-700">
                Validates drop operations
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-indigo-200">
              <div className="font-bold text-indigo-900">Animator Plugin</div>
              <div className="text-xs text-indigo-700">
                Custom drag animations
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Container 1 */}
          <div className="lg:col-span-1">
            <DroppableContainer
              id="container-1"
              className="min-h-[400px] p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50"
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
                Container 1
              </h3>
              <div className="space-y-2">
                {container1Items.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    data={item}
                    className="p-3 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <DragHandle className="text-gray-400" />
                      <span>{item.content}</span>
                    </div>
                  </DraggableItem>
                ))}
              </div>
            </DroppableContainer>
          </div>

          {/* Container 2 */}
          <div className="lg:col-span-1">
            <DroppableContainer
              id="container-2"
              className="min-h-[400px] p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50"
            >
              <h3 className="text-lg font-semibold mb-4 text-green-900">
                Container 2
                <span className="text-xs ml-2 text-red-600">
                  (Item 1 blocked)
                </span>
              </h3>
              <div className="space-y-2">
                {container2Items.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    data={item}
                    className="p-3 bg-white border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <DragHandle className="text-gray-400" />
                      <span>{item.content}</span>
                    </div>
                  </DraggableItem>
                ))}
              </div>
            </DroppableContainer>
          </div>

          {/* Event Log */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-white flex items-center justify-between">
                  📊 Event Log
                  <button
                    onClick={() => setLogs([])}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Clear
                  </button>
                </h3>
                <div className="space-y-1 font-mono text-xs max-h-[400px] overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      Start dragging to see events...
                    </div>
                  ) : (
                    logs.map((log, i) => (
                      <div
                        key={i}
                        className="text-green-400 py-1 border-b border-gray-800"
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <strong>Try this:</strong> Drag Item 1 to Container 2 - the
                validation plugin will prevent it!
              </div>
            </div>
          </div>
        </div>

        {/* Plugin Guide */}
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">
            📚 Plugin Lifecycle Hooks:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-purple-800">
            <div>
              <code className="bg-purple-100 px-1 rounded">onDragStart</code> -
              Called when drag begins
            </div>
            <div>
              <code className="bg-purple-100 px-1 rounded">onDragMove</code> -
              Called during dragging
            </div>
            <div>
              <code className="bg-purple-100 px-1 rounded">onDragEnd</code> -
              Called when drag ends
            </div>
            <div>
              <code className="bg-purple-100 px-1 rounded">onDrop</code> -
              Called on successful drop
            </div>
            <div>
              <code className="bg-purple-100 px-1 rounded">onCancel</code> -
              Called when drag is cancelled
            </div>
            <div>
              <code className="bg-purple-100 px-1 rounded">onCollision</code> -
              Called on collision detection
            </div>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default PluginExample;
