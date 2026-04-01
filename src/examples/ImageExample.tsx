import { useMemo, useState } from "react";
import Image from "../components/Image";
import type { ImageFit, ImageVariant } from "../components/Image/Image.types";

const heroImage =
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1400&auto=format";
const workspaceImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format";
const fallbackImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1000&auto=format";

const showcaseCards = [
  {
    id: "design-review",
    title: "Design Review Board",
    description: "Collect high-fidelity mockups and feedback snapshots.",
    src: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=900&auto=format",
  },
  {
    id: "release-ready",
    title: "Release Readiness",
    description: "Track rollout checklists with visual status evidence.",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format",
  },
  {
    id: "support-triage",
    title: "Support Triage",
    description: "Attach screenshots to speed up bug investigations.",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format",
  },
];

export const ImageExample = () => {
  const [fit, setFit] = useState<ImageFit>("cover");
  const [variant, setVariant] = useState<ImageVariant>("rounded");
  const [loadStats, setLoadStats] = useState({ success: 0, error: 0 });
  const [selectedCard, setSelectedCard] = useState(showcaseCards[0]);

  const fitSummary = useMemo(() => {
    if (fit === "cover") {
      return "Cover keeps media edge-to-edge for card-heavy interfaces.";
    }

    if (fit === "contain") {
      return "Contain preserves full image visibility for documentation assets.";
    }

    if (fit === "fill") {
      return "Fill stretches to container dimensions, useful for stylized artwork.";
    }

    return "Use none or scale-down when preserving source pixels matters.";
  }, [fit]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Image Component</h2>
        <p className="mt-2 text-muted-foreground">
          Production-ready media rendering with loading states, graceful
          fallbacks, and visual variants.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render a clean hero image with load tracking and hover zoom.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Image
              src={heroImage}
              alt="Team collaborating around a project board"
              width={860}
              height={420}
              aspectRatio="16/9"
              zoomOnHover
              variant="rounded"
              onLoadSuccess={() =>
                setLoadStats((prev) => ({
                  ...prev,
                  success: prev.success + 1,
                }))
              }
              onLoadError={() =>
                setLoadStats((prev) => ({
                  ...prev,
                  error: prev.error + 1,
                }))
              }
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Load stats: {loadStats.success} success / {loadStats.error} errors
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Always set meaningful alt text for accessibility.</li>
              <li>• Use onLoad callbacks to monitor reliability.</li>
              <li>• Keep hero dimensions predictable with aspectRatio.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Let teams switch fit and variant styles for different surface needs.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {(["cover", "contain", "fill"] as ImageFit[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFit(mode)}
                  className={`rounded-md border px-3 py-1 text-xs ${
                    fit === mode
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  fit: {mode}
                </button>
              ))}
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {(["rounded", "bordered", "glass"] as ImageVariant[]).map(
                (mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setVariant(mode)}
                    className={`rounded-md border px-3 py-1 text-xs ${
                      variant === mode
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    variant: {mode}
                  </button>
                ),
              )}
            </div>

            <Image
              src={workspaceImage}
              alt="Workspace with laptop and notes"
              width={820}
              height={360}
              fit={fit}
              variant={variant}
              aspectRatio="21/9"
              showSkeleton
            />
            <p className="mt-3 text-sm text-muted-foreground">{fitSummary}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Fit behavior should match content context.</li>
              <li>• Variant changes can reflect visual hierarchy.</li>
              <li>• Keep one shared image source while tuning style.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Combine fallback strategies, loading priority, and custom error
          content.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Fallback Source
                </p>
                <Image
                  src="https://images.unsplash.com/non-existent-image.jpg"
                  alt="Fallback preview"
                  width={360}
                  height={220}
                  variant="bordered"
                  fallbackSrc={fallbackImage}
                  onLoadError={() =>
                    setLoadStats((prev) => ({
                      ...prev,
                      error: prev.error + 1,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Custom Fallback Content
                </p>
                <Image
                  src="https://images.unsplash.com/definitely-broken-link.jpg"
                  alt="Custom fallback preview"
                  width={360}
                  height={220}
                  variant="glass"
                  fallbackContent={
                    <div className="flex h-full items-center justify-center rounded-md bg-muted/60 px-4 text-center text-xs text-muted-foreground">
                      Preview unavailable. Upload team-approved media before
                      publishing.
                    </div>
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Low Priority Lazy
                </p>
                <Image
                  src={heroImage}
                  alt="Lazy loaded content preview"
                  width={360}
                  height={210}
                  priority="low"
                  lazy
                  variant="rounded"
                />
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  High Priority Eager
                </p>
                <Image
                  src={workspaceImage}
                  alt="High priority preview"
                  width={360}
                  height={210}
                  priority="high"
                  lazy={false}
                  variant="rounded"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use fallbackSrc first for graceful media recovery.</li>
              <li>• Show custom fallbackContent when remediation is needed.</li>
              <li>
                • Reserve high priority loading for above-the-fold assets.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Build visual content cards for ops dashboards, docs, and campaign
          pages.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="grid gap-3 md:grid-cols-3">
              {showcaseCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCard(card)}
                  className={`overflow-hidden rounded-lg border text-left transition ${
                    selectedCard.id === card.id
                      ? "border-primary bg-primary/5"
                      : "border-border/60 bg-muted/20 hover:bg-muted/30"
                  }`}
                >
                  <Image
                    src={card.src}
                    alt={card.title}
                    width={340}
                    height={180}
                    aspectRatio="16/10"
                    fit="cover"
                    variant="default"
                  />
                  <div className="space-y-1 p-3">
                    <p className="text-sm font-semibold text-foreground">
                      {card.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <p className="text-sm font-medium text-foreground">
                Selected card: {selectedCard.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedCard.description}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Ideal for content-heavy product dashboards.</li>
              <li>• Keep card aspect ratios consistent for clean grids.</li>
              <li>• Reuse one image component across docs and marketing.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageExample;
