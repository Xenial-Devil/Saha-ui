import React, { useMemo, useState } from "react";
import { DragDropProvider, TreeView } from "../components/DragDrop";
import type { TreeItem } from "../components/DragDrop/DragDrop.types";

const initialProjectTree: TreeItem[] = [
  {
    id: "project-root",
    label: "Platform",
    children: [
      {
        id: "project-web",
        label: "Web App",
        children: [
          { id: "project-web-auth", label: "Authentication" },
          { id: "project-web-billing", label: "Billing" },
        ],
      },
      {
        id: "project-api",
        label: "API Services",
        children: [
          { id: "project-api-users", label: "Users Service" },
          { id: "project-api-notify", label: "Notification Service" },
        ],
      },
    ],
  },
  {
    id: "project-ops",
    label: "Operations",
    children: [
      { id: "project-ops-observability", label: "Observability" },
      { id: "project-ops-runbooks", label: "Runbooks" },
    ],
  },
];

const initialReleaseTree: TreeItem[] = [
  {
    id: "release-wave-1",
    label: "Wave 1",
    children: [
      { id: "release-wave-1-internal", label: "Internal Users" },
      { id: "release-wave-1-beta", label: "Beta Customers" },
    ],
  },
  {
    id: "release-wave-2",
    label: "Wave 2",
    children: [
      { id: "release-wave-2-east", label: "East Region" },
      { id: "release-wave-2-west", label: "West Region" },
      { id: "release-wave-2-global", label: "Global Rollout" },
    ],
  },
];

const countNodes = (items: TreeItem[]): number =>
  items.reduce(
    (count, item) =>
      count + 1 + (item.children ? countNodes(item.children) : 0),
    0,
  );

export const DragDropTreeExample: React.FC = () => {
  const [projectTree, setProjectTree] =
    useState<TreeItem[]>(initialProjectTree);
  const [releaseTree, setReleaseTree] =
    useState<TreeItem[]>(initialReleaseTree);
  const [lastTreeEvent, setLastTreeEvent] = useState(
    "No expand/collapse events yet.",
  );

  const projectNodeCount = useMemo(
    () => countNodes(projectTree),
    [projectTree],
  );
  const releaseNodeCount = useMemo(
    () => countNodes(releaseTree),
    [releaseTree],
  );

  return (
    <DragDropProvider>
      <div className="space-y-12 p-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            DragDrop TreeView Component
          </h2>
          <p className="mt-2 text-muted-foreground">
            Organize hierarchical data with nested drag-and-drop interactions.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Basic Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Render a nested project tree and reorder nodes by drag-and-drop.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <TreeView
                items={projectTree}
                constraints={{ maxDepth: 4 }}
                showLines
                onReorder={setProjectTree}
              />
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Keep parent state as the source of truth.</li>
                <li>• Use depth constraints to prevent invalid nesting.</li>
                <li>• Show lines in dense hierarchies for readability.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Normal Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize item content for domain context such as team ownership.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <TreeView
                items={projectTree}
                constraints={{ maxDepth: 4 }}
                onReorder={setProjectTree}
                renderItem={(item, depth) => (
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {String(item.label ?? item.id)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Depth {depth}
                    </span>
                  </div>
                )}
              />
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Render domain metadata directly in tree rows.</li>
                <li>• Keep row content compact for large hierarchies.</li>
                <li>• Use consistent naming conventions per node type.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Advanced Usage
          </h3>
          <p className="text-sm text-muted-foreground">
            Combine constraints with expand and collapse callbacks.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <TreeView
                items={releaseTree}
                constraints={{
                  maxDepth: 3,
                  allowCrossLevel: true,
                  preventDropIntoDescendants: true,
                }}
                showLines
                indentSize={24}
                onExpand={(itemId) => setLastTreeEvent(`Expanded: ${itemId}`)}
                onCollapse={(itemId) =>
                  setLastTreeEvent(`Collapsed: ${itemId}`)
                }
                onReorder={setReleaseTree}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Last event: {lastTreeEvent}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Track expand/collapse for onboarding and analytics.</li>
                <li>• Tune indentation for deeply nested structures.</li>
                <li>• Keep max depth aligned with business rules.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Real-Life Use Cases
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage phased releases, folder structures, and access hierarchies.
          </p>
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <TreeView
                items={releaseTree}
                constraints={{ maxDepth: 3 }}
                showLines
                onReorder={setReleaseTree}
              />
              <div className="mt-4 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
                <p>Project tree nodes: {projectNodeCount}</p>
                <p>Release tree nodes: {releaseNodeCount}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Implementation Notes
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Use hierarchical views for rollout and ownership mapping.
                </li>
                <li>• Persist reordered trees to backend APIs.</li>
                <li>• Validate tree shape before saving critical workflows.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DragDropProvider>
  );
};

export default DragDropTreeExample;
