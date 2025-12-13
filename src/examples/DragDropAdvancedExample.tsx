import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
  DebugOverlay,
} from "../components/DragDrop";
import type {
  DropEvent,
  DragAnalytics,
  DraggableItem as DragItem,
} from "../components/DragDrop/DragDrop.types";

/**
 * Advanced Features Example
 *
 * Demonstrates:
 * - Undo/Redo functionality
 * - Snap to grid
 * - Analytics tracking
 * - Debug overlay
 * - Custom collision detection
 * - Performance monitoring
 */
export const AdvancedExample: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: "1", content: "🎨 Design mockups", containerId: "backlog" },
    { id: "2", content: "💻 Implement feature", containerId: "backlog" },
    { id: "3", content: "🧪 Write tests", containerId: "backlog" },
    { id: "4", content: "📝 Update docs", containerId: "backlog" },
    { id: "5", content: "🔍 Code review", containerId: "active" },
    { id: "6", content: "🚀 Deploy to prod", containerId: "active" },
  ]);

  const [snapToGrid, setSnapToGrid] = useState(true);
  const [debugMode, setDebugMode] = useState(true);
  const [analytics, setAnalytics] = useState<DragAnalytics | null>(null);

  const handleDrop = (event: DropEvent) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === event.item.id
          ? { ...item, containerId: event.containerId }
          : item
      )
    );
  };

  const handleAnalytics = (data: DragAnalytics) => {
    setAnalytics(data);
    console.log("Analytics:", data);
  };

  const handleUndo = () => {
    console.log("Undo triggered");
  };

  const handleRedo = () => {
    console.log("Redo triggered");
  };

  const backlogItems = items.filter((item) => item.containerId === "backlog");
  const activeItems = items.filter((item) => item.containerId === "active");

  return (
    <DragDropProvider
      enableUndo={true}
      maxHistory={20}
      onAnalytics={handleAnalytics}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Advanced Features Demo</h2>

        {/* Control Panel */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">Control Panel</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="snap-grid"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="snap-grid" className="text-sm font-medium">
                Snap to Grid (20px)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="debug-mode"
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="debug-mode" className="text-sm font-medium">
                Debug Overlay
              </label>
            </div>

            <button
              onClick={handleUndo}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              ⎌ Undo (Ctrl+Z)
            </button>

            <button
              onClick={handleRedo}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              ⎌ Redo (Ctrl+Y)
            </button>
          </div>

          {/* Analytics Display */}
          {analytics && (
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <h4 className="font-semibold text-sm mb-2">Live Analytics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Drag Count:</span>{" "}
                  <span className="font-bold">{analytics.dragCount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Drop Count:</span>{" "}
                  <span className="font-bold">{analytics.dropCount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Duration:</span>{" "}
                  <span className="font-bold">
                    {analytics.averageDragDuration?.toFixed(0) || 0}ms
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Distance:</span>{" "}
                  <span className="font-bold">
                    {analytics.averageDragDistance?.toFixed(0) || 0}px
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">
            🌟 Active Features:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-800">
            <div>✓ Undo/Redo with 20 history steps</div>
            <div>✓ Snap to 20px grid alignment</div>
            <div>✓ Real-time analytics tracking</div>
            <div>✓ Closest-center collision detection</div>
            <div>✓ Performance monitoring</div>
            <div>✓ Debug visualization tools</div>
          </div>
        </div>

        {/* Drag Drop Containers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              📋 Backlog ({backlogItems.length})
            </h3>
            <DroppableContainer
              id="backlog"
              items={backlogItems}
              onDrop={handleDrop}
              className="min-h-[400px] p-4 bg-gray-50 border-2 border-gray-300 rounded-lg"
            >
              {(item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  item={item}
                  className="p-4 mb-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move"
                >
                  {item.content}
                </DraggableItem>
              )}
            </DroppableContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              🔥 Active Sprint ({activeItems.length})
            </h3>
            <DroppableContainer
              id="active"
              items={activeItems}
              onDrop={handleDrop}
              className="min-h-[400px] p-4 bg-green-50 border-2 border-green-300 rounded-lg"
            >
              {(item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  item={item}
                  className="p-4 mb-2 bg-white border border-green-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move"
                >
                  {item.content}
                </DraggableItem>
              )}
            </DroppableContainer>
          </div>
        </div>

        {/* Debug Overlay */}
        {debugMode && (
          <DebugOverlay
            enabled={debugMode}
            showPerformanceMetrics={true}
            showDragPath={true}
            showCollisionRects={false}
            position="bottom-right"
          />
        )}

        {/* Instructions */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 Try These Features:
          </h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
            <li>Toggle "Snap to Grid" to see alignment behavior</li>
            <li>Watch the analytics update in real-time as you drag</li>
            <li>Use Ctrl+Z / Ctrl+Y for undo/redo operations</li>
            <li>Enable Debug Overlay to see performance metrics</li>
            <li>Observe FPS counter and render times</li>
            <li>See the drag path visualization</li>
          </ul>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default AdvancedExample;
