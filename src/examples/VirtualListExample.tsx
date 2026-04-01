import React, { useState } from "react";
import { DragDropProvider, VirtualList } from "../components/DragDrop";
import { VirtualList as CoreVirtualList } from "../components/VirtualList";
import type { DraggableItem as DragItem } from "../components/DragDrop/DragDrop.types";

const coreVirtualListReference = CoreVirtualList;

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
  const coreVirtualListName =
    (coreVirtualListReference as { displayName?: string }).displayName ??
    "VirtualList";

  const [basicItems] = useState<DragItem[]>(() =>
    createItems(200, "Queue item"),
  );
  const [reorderableItems, setReorderableItems] = useState<DragItem[]>(() =>
    createItems(80, "Backlog task"),
  );
  const [dynamicItems] = useState<DragItem[]>(() =>
    createItems(300, "Audit event"),
  );
  const [largeItems] = useState<DragItem[]>(() =>
    createItems(10000, "Monitoring event"),
  );
  const [scrollSnapshot, setScrollSnapshot] = useState({
    top: 0,
    height: 0,
  });
  const [lastReorderSummary, setLastReorderSummary] =
    useState("No reorders yet.");

  return (
    <DragDropProvider>
      <div className="space-y-12 p-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            VirtualList Component
          </h2>
          <p className="mt-2 text-muted-foreground">
            Efficiently render thousands of rows with drag-and-drop
            interactions.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Basic Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Render medium lists with fixed item heights and smooth scrolling.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <VirtualList
                items={basicItems}
                containerHeight={320}
                itemHeight={56}
                overscan={3}
                renderItem={(item, index) => (
                  <div className="border-b border-border/70 p-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Position: {index + 1}
                    </p>
                  </div>
                )}
              />
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Use fixed heights where possible for predictable
                  performance.
                </li>
                <li>• Keep item renderers lightweight.</li>
                <li>• Increase overscan only when you notice scroll pop-in.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Normal Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Enable controlled reordering for triage and prioritization
            workflows.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <VirtualList
                items={reorderableItems}
                containerHeight={320}
                itemHeight={60}
                overscan={4}
                onReorder={(nextItems) => {
                  setReorderableItems(nextItems);
                  setLastReorderSummary(
                    `Top item after reorder: ${nextItems[0]?.content ?? "None"}`,
                  );
                }}
                renderItem={(item) => (
                  <div className="border-b border-border/70 p-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {item.id}
                    </p>
                  </div>
                )}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                {lastReorderSummary}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Keep reorder state in the parent for traceability.</li>
                <li>• Persist order for each user context or project.</li>
                <li>• Pair drag with keyboard alternatives where possible.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Advanced Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Use dynamic heights and larger overscan for complex feed cards.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <VirtualList
                items={dynamicItems}
                containerHeight={360}
                itemHeight={(index) =>
                  index % 7 === 0 ? 92 : index % 3 === 0 ? 72 : 56
                }
                overscan={8}
                renderItem={(item, index, virtualItem) => (
                  <div className="border-b border-border/70 p-3">
                    <p className="text-sm font-medium text-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Row: {index + 1} | Height: {virtualItem.size}px
                    </p>
                  </div>
                )}
              />
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Dynamic heights suit mixed-content activity feeds.</li>
                <li>• Tune overscan based on row complexity.</li>
                <li>• Avoid expensive effects inside each row renderer.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Real-Life Use Cases
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitor and inspect large event streams while keeping memory usage
            efficient.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <VirtualList
                items={largeItems}
                containerHeight={420}
                itemHeight={52}
                overscan={6}
                onScroll={(top, height) => {
                  setScrollSnapshot({
                    top: Math.round(top),
                    height: Math.round(height),
                  });
                }}
                renderItem={(item, index) => (
                  <div className="border-b border-border/70 p-2.5">
                    <p className="text-sm text-foreground">{item.content}</p>
                    <p className="text-xs text-muted-foreground">
                      Record #{index + 1}
                    </p>
                  </div>
                )}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                ScrollTop: {scrollSnapshot.top}px | ScrollHeight:{" "}
                {scrollSnapshot.height}px
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Ideal for logs, audit trails, and support timelines.</li>
                <li>• Capture scroll metrics for performance analysis.</li>
                <li>
                  • Core module alias in this workspace: {coreVirtualListName}.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DragDropProvider>
  );
};

const createItems = (count: number, prefix: string): DragItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
    content: `${prefix} ${i + 1} - ${generateRandomText()}`,
  }));

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
