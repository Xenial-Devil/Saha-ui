"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock3,
  Sparkles,
  Star,
  Tag,
  Zap,
} from "lucide-react";
import Badge from "../components/Badge";

export const BadgeExample = () => {
  const [tags, setTags] = useState([
    "Design",
    "Frontend",
    "Priority",
    "Release",
  ]);
  const [activeWorkflow, setActiveWorkflow] = useState("Release");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Badge Component</h2>
        <p className="mt-2 text-muted-foreground">
          Small status labels for metadata, states, and contextual tags.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with variant labels for quick status communication.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-5">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="glass">Glass</Badge>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep badge text concise and recognizable.</li>
              <li>• Map color semantics to product-wide meaning.</li>
              <li>• Use outline or glass for low-priority metadata.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Combine size, shape, and dot indicators for row-level status.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" size="sm">
                Small
              </Badge>
              <Badge variant="primary" size="md">
                Medium
              </Badge>
              <Badge variant="primary" size="lg">
                Large
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" shape="rounded">
                Rounded
              </Badge>
              <Badge variant="secondary" shape="pill">
                Pill
              </Badge>
              <Badge variant="secondary" shape="square">
                Square
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success" dot>
                Online
              </Badge>
              <Badge variant="warning" dot>
                Away
              </Badge>
              <Badge variant="error" dot>
                Offline
              </Badge>
              <Badge variant="info" dot pulse>
                Live
              </Badge>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Match badge size to surrounding text density.</li>
              <li>• Dot badges are effective for realtime presence states.</li>
              <li>• Avoid mixing too many shapes in one table row.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Add icons, pulse effects, and removable tags for interactive filters.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" icon={<Star size={12} />}>
                Featured
              </Badge>
              <Badge variant="success" icon={<CheckCircle size={12} />}>
                Verified
              </Badge>
              <Badge variant="warning" icon={<AlertCircle size={12} />}>
                Attention
              </Badge>
              <Badge variant="glass" icon={<Sparkles size={12} />} pulse>
                Premium
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  icon={<Tag size={12} />}
                  removable
                  onRemove={() =>
                    setTags((prev) => prev.filter((item) => item !== tag))
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={activeWorkflow === "Build" ? "primary" : "default"}
                icon={<Zap size={12} />}
                onClick={() => setActiveWorkflow("Build")}
                className="cursor-pointer"
              >
                Build
              </Badge>
              <Badge
                variant={activeWorkflow === "Review" ? "primary" : "default"}
                icon={<Clock3 size={12} />}
                onClick={() => setActiveWorkflow("Review")}
                className="cursor-pointer"
              >
                Review
              </Badge>
              <Badge
                variant={activeWorkflow === "Release" ? "primary" : "default"}
                icon={<CheckCircle size={12} />}
                onClick={() => setActiveWorkflow("Release")}
                className="cursor-pointer"
              >
                Release
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Active workflow badge: {activeWorkflow}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Removable badges are ideal for active filter chips.</li>
              <li>• Icon badges improve scan speed in dense UIs.</li>
              <li>• Pulse only for important, time-sensitive signals.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Use badges in deployment dashboards, incident queues, and customer
          records.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 p-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Release 2.8.1
                </p>
                <p className="text-xs text-muted-foreground">
                  Scheduled for 18:30 UTC
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info" dot>
                  Canary
                </Badge>
                <Badge variant="success" icon={<CheckCircle size={12} />}>
                  Healthy
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 p-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Incident #4312
                </p>
                <p className="text-xs text-muted-foreground">
                  Authentication latency spike
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="error" dot pulse>
                  P1
                </Badge>
                <Badge variant="warning" icon={<Clock3 size={12} />}>
                  Investigating
                </Badge>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Pair badge groups with concise contextual text.</li>
              <li>• Keep critical severity badges highly visible.</li>
              <li>• Reuse badge semantics across support and ops tools.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BadgeExample;
