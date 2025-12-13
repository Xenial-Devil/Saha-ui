"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDragDropContext } from "./DragDropContext";
import { cn } from "../../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

// ============================================
// DebugOverlay Component Props
// ============================================

export interface DebugOverlayProps {
  enabled?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showCollisionRects?: boolean;
  showDragPath?: boolean;
  showPerformanceMetrics?: boolean;
}

// ============================================
// DebugOverlay Component
// ============================================

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  enabled = true,
  position = "top-right",
  showCollisionRects: _showCollisionRects = true,
  showDragPath = true,
  showPerformanceMetrics = true,
}) => {
  const context = useDragDropContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const [dragPath, setDragPath] = useState<
    Array<{ x: number; y: number; timestamp: number }>
  >([]);
  const [fps, setFps] = useState(0);
  const [renderTime, setRenderTime] = useState(0);
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });
  const renderStartRef = useRef(0);

  const {
    activeId,
    activeItem,
    activeIndex,
    sourceContainerId,
    dragPosition,
    isDragging,
    selectionState,
    historyState,
  } = context;

  // Track drag path
  useEffect(() => {
    if (isDragging && dragPosition) {
      setDragPath((prev) => [
        ...prev.slice(-50), // Keep last 50 points
        { x: dragPosition.x, y: dragPosition.y, timestamp: Date.now() },
      ]);
    } else {
      setDragPath([]);
    }
  }, [isDragging, dragPosition]);

  // Calculate FPS
  useEffect(() => {
    if (!enabled || !showPerformanceMetrics) return;

    const calculateFps = () => {
      const now = performance.now();
      fpsRef.current.frames++;

      if (now >= fpsRef.current.lastTime + 1000) {
        setFps(
          Math.round(
            (fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime)
          )
        );
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      requestAnimationFrame(calculateFps);
    };

    const rafId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(rafId);
  }, [enabled, showPerformanceMetrics]);

  // Calculate render time
  useEffect(() => {
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    setRenderTime(performance.now() - renderStartRef.current);
  });

  if (!enabled) return null;

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <>
      {/* Debug Panel */}
      <div
        className={cn(
          "fixed z-[9999] bg-background border rounded-lg shadow-lg",
          "max-w-md transition-all duration-200",
          positionClasses[position],
          !isExpanded && "w-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Drag & Drop Debug
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-background rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-3 space-y-3 text-xs max-h-[500px] overflow-auto">
            {/* Performance Metrics */}
            {showPerformanceMetrics && (
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Performance
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 rounded px-2 py-1">
                    <span className="text-muted-foreground">FPS:</span>
                    <span
                      className={cn(
                        "ml-2 font-mono font-medium",
                        fps >= 50
                          ? "text-green-500"
                          : fps >= 30
                          ? "text-yellow-500"
                          : "text-red-500"
                      )}
                    >
                      {fps}
                    </span>
                  </div>
                  <div className="bg-muted/50 rounded px-2 py-1">
                    <span className="text-muted-foreground">Render:</span>
                    <span className="ml-2 font-mono font-medium">
                      {renderTime.toFixed(2)}ms
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Drag State */}
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground mb-2">Drag State</h4>
              <div className="bg-muted/50 rounded px-2 py-1 space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Is Dragging:</span>
                  <span className="font-medium">
                    {isDragging ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active ID:</span>
                  <span className="font-mono font-medium truncate max-w-[120px]">
                    {activeId || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Index:</span>
                  <span className="font-medium">{activeIndex ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Container:</span>
                  <span className="font-mono font-medium truncate max-w-[120px]">
                    {sourceContainerId || "—"}
                  </span>
                </div>
                {dragPosition && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span className="font-mono font-medium">
                      x: {Math.round(dragPosition.x)}, y:{" "}
                      {Math.round(dragPosition.y)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Selection State */}
            {selectionState && (
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Multi-Selection
                </h4>
                <div className="bg-muted/50 rounded px-2 py-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected:</span>
                    <span className="font-medium">
                      {selectionState.selectedIds.size} items
                    </span>
                  </div>
                  {selectionState.selectedIds.size > 0 && (
                    <div className="mt-1 pt-1 border-t border-border">
                      <div className="text-muted-foreground mb-1">IDs:</div>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(selectionState.selectedIds).map((id) => (
                          <span
                            key={id}
                            className="px-1.5 py-0.5 bg-primary/20 text-primary rounded text-[10px] font-mono"
                          >
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* History State */}
            {historyState && (
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Undo/Redo
                </h4>
                <div className="bg-muted/50 rounded px-2 py-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Can Undo:</span>
                    <span className="font-medium">
                      {historyState.past.length > 0 ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Can Redo:</span>
                    <span className="font-medium">
                      {historyState.future.length > 0 ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">History Size:</span>
                    <span className="font-medium">
                      {historyState.past.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Active Item Data */}
            {activeItem && (
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Active Item
                </h4>
                <pre className="bg-muted/50 rounded px-2 py-1 overflow-auto max-h-32 text-[10px] font-mono">
                  {JSON.stringify(activeItem, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drag Path Visualization */}
      {showDragPath && isDragging && dragPath.length > 1 && (
        <svg
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{ width: "100vw", height: "100vh" }}
        >
          <defs>
            <linearGradient id="dragPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="dotGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          <polyline
            points={dragPath.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#dragPathGrad)"
            strokeWidth={2}
            strokeOpacity={0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {dragPath.map((point, i) => {
            const alpha = 0.18 + (i / dragPath.length) * 0.82;
            return (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={2.25}
                fill="url(#dotGrad)"
                fillOpacity={alpha}
              />
            );
          })}
        </svg>
      )}

      {/* Cursor marker that follows the pointer to help visual alignment */}
      {showDragPath && isDragging && dragPosition && (
        <>
          <style>{`@keyframes sahaPulse { 0% { transform: scale(1); opacity: 0.95 } 50% { transform: scale(1.12); opacity: 0.75 } 100% { transform: scale(1); opacity: 0.95 } }`}</style>
          <div
            aria-hidden
            style={{
              position: "fixed",
              left: dragPosition.x,
              top: dragPosition.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 10000,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                background:
                  "radial-gradient(circle at 35% 30%, rgba(139,92,246,0.20), rgba(99,102,241,0.06))",
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 8px 22px rgba(15,23,42,0.14)",
                animation: "sahaPulse 1.6s ease-in-out infinite",
                transformOrigin: "center",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
                boxShadow: "0 6px 18px rgba(139,92,246,0.24)",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

DebugOverlay.displayName = "DebugOverlay";
