"use client";
import { useState } from "react";
import { Masonry } from "../components/Masonry";

export default function MasonryExample() {
  const [selectedCollection, setSelectedCollection] = useState<
    "featured" | "all"
  >("featured");

  const editorialCards = [
    { id: "ed-1", title: "Design Tokens", tone: "bg-sky-100", size: "h-28" },
    { id: "ed-2", title: "QA Checklist", tone: "bg-emerald-100", size: "h-40" },
    { id: "ed-3", title: "API Notes", tone: "bg-amber-100", size: "h-32" },
    { id: "ed-4", title: "Release Plan", tone: "bg-rose-100", size: "h-44" },
    { id: "ed-5", title: "Analytics", tone: "bg-indigo-100", size: "h-36" },
    { id: "ed-6", title: "Localization", tone: "bg-orange-100", size: "h-24" },
    { id: "ed-7", title: "Roadmap", tone: "bg-cyan-100", size: "h-48" },
    { id: "ed-8", title: "Accessibility", tone: "bg-lime-100", size: "h-30" },
  ];

  const socialCards = [
    { id: "so-1", title: "Launch Day", tone: "bg-pink-100", size: "h-40" },
    {
      id: "so-2",
      title: "Team Highlight",
      tone: "bg-fuchsia-100",
      size: "h-28",
    },
    {
      id: "so-3",
      title: "Behind the Build",
      tone: "bg-violet-100",
      size: "h-48",
    },
    { id: "so-4", title: "Weekly Wins", tone: "bg-teal-100", size: "h-32" },
    { id: "so-5", title: "Customer Story", tone: "bg-blue-100", size: "h-44" },
    { id: "so-6", title: "How It Works", tone: "bg-green-100", size: "h-26" },
  ];

  const activeCards =
    selectedCollection === "featured" ? socialCards : editorialCards;

  const renderTile = (
    id: string,
    title: string,
    tone: string,
    size: string,
    subtitle: string,
  ) => (
    <article
      key={id}
      className={`rounded-xl border border-border/70 ${tone} p-4 shadow-sm`}
    >
      <div className={`${size} rounded-lg bg-background/70 p-3`}>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </article>
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Masonry Component
        </h2>
        <p className="text-muted-foreground">
          Responsive masonry layout for uneven content heights.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with simple cards and token-based gaps.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Masonry columns={3} gap="md">
              {editorialCards
                .slice(0, 6)
                .map((card) =>
                  renderTile(
                    card.id,
                    card.title,
                    card.tone,
                    card.size,
                    "Baseline masonry card for content previews.",
                  ),
                )}
            </Masonry>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Begin with 2-3 columns before tuning responsiveness.</li>
              <li>• Keep card widths consistent for balanced layouts.</li>
              <li>• Token gaps are easiest to maintain in design systems.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Configure responsive columns and custom gap values.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Masonry columns={{ default: 1, sm: 2, lg: 3, xl: 4 }} gap={18}>
              {editorialCards.map((card) =>
                renderTile(
                  card.id,
                  card.title,
                  card.tone,
                  card.size,
                  "Responsive breakpoint behavior in dashboard feeds.",
                ),
              )}
            </Masonry>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use column objects for mobile-first responsiveness.</li>
              <li>• Numeric gap values help match custom spacing scales.</li>
              <li>• Keep card content lengths realistic for QA testing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Use JS mode with animation and custom render wrappers.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Masonry
              mode="js"
              columns={4}
              gap="sm"
              animate
              animationDelay={70}
              renderItem={(child, index) => (
                <div className="relative">
                  <span className="absolute right-2 top-2 rounded-full bg-card px-2 py-0.5 text-[10px] text-muted-foreground">
                    #{index + 1}
                  </span>
                  {child}
                </div>
              )}
            >
              {socialCards.map((card) =>
                renderTile(
                  card.id,
                  card.title,
                  card.tone,
                  card.size,
                  "Animated entry for social tiles and campaign creatives.",
                ),
              )}
            </Masonry>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• JS mode gives deterministic column assignment.</li>
              <li>• Render wrappers are useful for metadata badges.</li>
              <li>• Keep animation delays short to avoid sluggishness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Curate marketing boards and content feeds with quick collection
          switching.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-md px-3 py-1.5 text-sm ${
                  selectedCollection === "featured"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setSelectedCollection("featured")}
              >
                Featured
              </button>
              <button
                type="button"
                className={`rounded-md px-3 py-1.5 text-sm ${
                  selectedCollection === "all"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setSelectedCollection("all")}
              >
                All Content
              </button>
            </div>
            <Masonry columns={{ default: 1, md: 2, xl: 3 }} gap="md">
              {activeCards.map((card) =>
                renderTile(
                  card.id,
                  card.title,
                  card.tone,
                  card.size,
                  selectedCollection === "featured"
                    ? "Optimized for homepage highlights and campaign moments."
                    : "Full editorial view for planning and operations.",
                ),
              )}
            </Masonry>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                • Great for campaign boards, blog grids, and photo galleries.
              </li>
              <li>• Use lightweight filters to avoid full page refreshes.</li>
              <li>• Persist user collection choice for repeat visits.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
