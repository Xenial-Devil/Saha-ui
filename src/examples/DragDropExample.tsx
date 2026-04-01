import { useMemo, useState } from "react";
import {
  DragDropProvider,
  DraggableItem,
  DroppableContainer,
} from "../components/DragDrop";
import type {
  DraggableItem as DragItem,
  DropEvent,
} from "../components/DragDrop/DragDrop.types";

type BoardItem = DragItem & {
  content: string;
  owner?: string;
  priority?: "low" | "medium" | "high";
  type?: "feature" | "bug" | "security";
};

type LaneState = Record<string, BoardItem[]>;

const reorderItems = (
  items: BoardItem[],
  sourceIndex: number,
  targetIndex: number,
) => {
  if (sourceIndex < 0 || sourceIndex >= items.length) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(sourceIndex, 1);
  const safeTarget = Math.max(0, Math.min(targetIndex, next.length));
  next.splice(safeTarget, 0, moved);
  return next;
};

const moveAcrossLanes = (lanes: LaneState, event: DropEvent<BoardItem>) => {
  const sourceId = event.sourceContainerId;
  const targetId = event.targetContainerId;

  if (!sourceId || !targetId || !lanes[sourceId] || !lanes[targetId]) {
    return lanes;
  }

  if (sourceId === targetId) {
    return {
      ...lanes,
      [sourceId]: reorderItems(
        lanes[sourceId],
        event.sourceIndex,
        event.targetIndex,
      ),
    };
  }

  const sourceItems = [...lanes[sourceId]];
  const targetItems = [...lanes[targetId]];
  const [moved] = sourceItems.splice(event.sourceIndex, 1);

  if (!moved) {
    return lanes;
  }

  const safeTarget = Math.max(
    0,
    Math.min(event.targetIndex, targetItems.length),
  );
  targetItems.splice(safeTarget, 0, moved);

  return {
    ...lanes,
    [sourceId]: sourceItems,
    [targetId]: targetItems,
  };
};

export const DragDropExample = () => {
  const [basicItems, setBasicItems] = useState<BoardItem[]>([
    { id: "basic-1", content: "Backlog Item", priority: "medium" },
    { id: "basic-2", content: "In Progress", priority: "high" },
    { id: "basic-3", content: "Done", priority: "low" },
    { id: "basic-4", content: "Review", priority: "medium" },
  ]);

  const [kanbanLanes, setKanbanLanes] = useState<LaneState>({
    "kanban-todo": [
      {
        id: "todo-1",
        content: "Design checkout summary",
        owner: "Nora",
        type: "feature",
        priority: "high",
      },
      {
        id: "todo-2",
        content: "Fix stale cache warning",
        owner: "Aarav",
        type: "bug",
        priority: "medium",
      },
    ],
    "kanban-progress": [
      {
        id: "prog-1",
        content: "Add analytics events",
        owner: "Kai",
        type: "feature",
        priority: "medium",
      },
    ],
    "kanban-done": [
      {
        id: "done-1",
        content: "Upgrade auth middleware",
        owner: "Lina",
        type: "security",
        priority: "high",
      },
    ],
  });

  const [advancedLanes, setAdvancedLanes] = useState<LaneState>({
    "advanced-general": [
      {
        id: "adv-1",
        content: "Refactor header navigation",
        type: "feature",
        priority: "medium",
      },
      {
        id: "adv-2",
        content: "Resolve flaky pagination test",
        type: "bug",
        priority: "high",
      },
      {
        id: "adv-3",
        content: "Rotate signing keys",
        type: "security",
        priority: "high",
      },
    ],
    "advanced-security": [
      {
        id: "adv-4",
        content: "Patch CVE-2026-1072",
        type: "security",
        priority: "high",
      },
    ],
  });

  const [releaseLanes, setReleaseLanes] = useState<LaneState>({
    "release-planned": [
      {
        id: "rel-1",
        content: "Finalize rollout checklist",
        owner: "PM",
        priority: "high",
        type: "feature",
      },
      {
        id: "rel-2",
        content: "Confirm observability alerts",
        owner: "Ops",
        priority: "medium",
        type: "security",
      },
    ],
    "release-qa": [
      {
        id: "rel-3",
        content: "Run regression suite",
        owner: "QA",
        priority: "high",
        type: "bug",
      },
    ],
    "release-live": [
      {
        id: "rel-4",
        content: "Canary traffic at 10%",
        owner: "SRE",
        priority: "medium",
        type: "feature",
      },
    ],
  });

  const [lastEvent, setLastEvent] = useState("No drag events recorded yet.");

  const releaseSummary = useMemo(
    () =>
      Object.entries(releaseLanes)
        .map(([lane, items]) => `${lane}: ${items.length}`)
        .join(" | "),
    [releaseLanes],
  );

  const renderCard = (item: BoardItem) => (
    <div className="rounded-md border border-border bg-background p-3">
      <p className="text-sm font-medium text-foreground">{item.content}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {item.owner ? `Owner: ${item.owner} | ` : ""}
        Priority: {item.priority ?? "n/a"}
      </p>
    </div>
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          DragDrop Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Drag-and-drop primitives for sortable lists, boards, and custom layout
          tooling.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with one droppable lane and draggable items.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <DragDropProvider>
              <DroppableContainer
                id="basic-lane"
                items={basicItems}
                onDrop={(event) => {
                  if (event.sourceContainerId !== event.targetContainerId) {
                    return;
                  }
                  setBasicItems((prev) =>
                    reorderItems(prev, event.sourceIndex, event.targetIndex),
                  );
                  setLastEvent(
                    `Reordered basic lane: ${event.sourceIndex} -> ${event.targetIndex}`,
                  );
                }}
                className="space-y-2 rounded-lg border border-dashed border-border p-3"
              >
                {(item, index) => (
                  <DraggableItem
                    id={item.id}
                    index={index}
                    item={item}
                    className="rounded-md border bg-background p-3"
                  >
                    {renderCard(item)}
                  </DraggableItem>
                )}
              </DroppableContainer>
            </DragDropProvider>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Begin with one lane to validate interaction flow.</li>
              <li>• Keep card content concise for readable drag previews.</li>
              <li>• Update state synchronously for immediate feedback.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Use styling and callbacks for production-grade sorting experiences.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <DragDropProvider>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["kanban-todo", "Todo"],
                  ["kanban-progress", "In Progress"],
                  ["kanban-done", "Done"],
                ].map(([laneId, title]) => (
                  <div
                    key={laneId}
                    className="rounded-lg border border-border/70 bg-muted/20 p-3"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {title}
                    </p>
                    <DroppableContainer
                      id={laneId}
                      items={kanbanLanes[laneId]}
                      onDrop={(event) => {
                        setKanbanLanes((prev) => moveAcrossLanes(prev, event));
                        setLastEvent(
                          `Moved item from ${event.sourceContainerId} to ${event.targetContainerId}`,
                        );
                      }}
                      className="space-y-2 rounded-md border border-dashed border-border p-2"
                    >
                      {(item, index) => (
                        <DraggableItem id={item.id} index={index} item={item}>
                          {renderCard(item)}
                        </DraggableItem>
                      )}
                    </DroppableContainer>
                  </div>
                ))}
              </div>
            </DragDropProvider>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Board lanes should map to real workflow phases.</li>
              <li>• Preserve item metadata during cross-lane moves.</li>
              <li>• Log lane transitions for operational analytics.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Extend with tree view, virtualization, and multi-selection modes.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <DragDropProvider>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    General Queue
                  </p>
                  <DroppableContainer
                    id="advanced-general"
                    items={advancedLanes["advanced-general"]}
                    accepts={["feature", "bug", "security"]}
                    onDrop={(event) => {
                      setAdvancedLanes((prev) => moveAcrossLanes(prev, event));
                      setLastEvent(
                        `Advanced move: ${event.sourceContainerId} -> ${event.targetContainerId}`,
                      );
                    }}
                    className="space-y-2 rounded-md border border-dashed border-border p-2"
                  >
                    {(item, index) => (
                      <DraggableItem id={item.id} index={index} item={item}>
                        {renderCard(item)}
                      </DraggableItem>
                    )}
                  </DroppableContainer>
                </div>

                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Security Queue
                  </p>
                  <DroppableContainer
                    id="advanced-security"
                    items={advancedLanes["advanced-security"]}
                    accepts={["security"]}
                    onDrop={(event) => {
                      setAdvancedLanes((prev) => moveAcrossLanes(prev, event));
                      setLastEvent(
                        `Security lane update from ${event.sourceContainerId}`,
                      );
                    }}
                    className="space-y-2 rounded-md border border-dashed border-border p-2"
                  >
                    {(item, index) => (
                      <DraggableItem id={item.id} index={index} item={item}>
                        {renderCard(item)}
                      </DraggableItem>
                    )}
                  </DroppableContainer>
                </div>
              </div>
            </DragDropProvider>
            <p className="mt-3 text-xs text-muted-foreground">
              Last event: {lastEvent}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• accepts rules help enforce lane-specific policies.</li>
              <li>• Keep event logs for audit and debugging trails.</li>
              <li>• Combine with VirtualList for very large queues.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Common in kanban systems, visual builders, and workflow editors.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <DragDropProvider>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["release-planned", "Planned"],
                  ["release-qa", "QA"],
                  ["release-live", "Live"],
                ].map(([laneId, title]) => (
                  <div
                    key={laneId}
                    className="rounded-lg border border-border/70 bg-muted/20 p-3"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {title}
                    </p>
                    <DroppableContainer
                      id={laneId}
                      items={releaseLanes[laneId]}
                      onDrop={(event) => {
                        setReleaseLanes((prev) => moveAcrossLanes(prev, event));
                        setLastEvent(
                          `Release board move: ${event.sourceContainerId} -> ${event.targetContainerId}`,
                        );
                      }}
                      className="space-y-2 rounded-md border border-dashed border-border p-2"
                    >
                      {(item, index) => (
                        <DraggableItem id={item.id} index={index} item={item}>
                          {renderCard(item)}
                        </DraggableItem>
                      )}
                    </DroppableContainer>
                  </div>
                ))}
              </div>
            </DragDropProvider>
            <p className="mt-3 text-xs text-muted-foreground">
              Lane totals: {releaseSummary}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Useful for release boards and incident queues.</li>
              <li>• Keep lane semantics stable across teams.</li>
              <li>• Persist board state to backend after drops.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DragDropExample;
