import { useMemo, useState } from "react";
import { Watermark } from "../components/Watermark";

type WatermarkMode = "draft" | "internal" | "staging" | "confidential";

const modeConfig: Record<
  WatermarkMode,
  { text: string; opacity: number; rotate: number; color: string }
> = {
  draft: { text: "DRAFT", opacity: 0.08, rotate: -28, color: "#0f172a" },
  internal: {
    text: "INTERNAL",
    opacity: 0.07,
    rotate: -24,
    color: "#1f2937",
  },
  staging: {
    text: "STAGING",
    opacity: 0.09,
    rotate: -32,
    color: "#0b6bcb",
  },
  confidential: {
    text: "CONFIDENTIAL",
    opacity: 0.06,
    rotate: -30,
    color: "#7f1d1d",
  },
};

export const WatermarkExample = () => {
  const [mode, setMode] = useState<WatermarkMode>("draft");
  const active = useMemo(() => modeConfig[mode], [mode]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Watermark Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Repeated watermark overlays for draft, confidential, and staging
          content.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Apply default watermark text over content and simple document blocks.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Watermark text="DRAFT">
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Quarterly strategy document content and milestone summary.
              </div>
            </Watermark>

            <Watermark text="REVIEW" opacity={0.08} rotate={-18}>
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Product requirement review notes shared with design and
                engineering.
              </div>
            </Watermark>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with broad, readable text and avoid heavy opacity in default
              setups.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep watermark labels short and recognizable.</li>
              <li>
                - Use medium opacity to preserve readability of real content.
              </li>
              <li>- Validate print and screenshot visibility early.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Adjust rotation, color, and spacing for polished product interfaces.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Watermark text="INTERNAL" rotate={-24} opacity={0.08}>
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Internal architecture notes with service ownership map.
              </div>
            </Watermark>

            <Watermark
              text="TEAM COPY"
              rotate={-34}
              opacity={0.05}
              width={180}
              height={180}
              color="#334155"
            >
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Collaboration draft for feature rollout and support handoff.
              </div>
            </Watermark>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Normal mode should align with your UI theme while preserving
              legible foreground content.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep color contrast subtle but visible in screenshots.</li>
              <li>
                - Use consistent angles for a predictable visual language.
              </li>
              <li>- Tune pattern width and height for document density.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Switch profile presets to reuse watermark styles across workflows.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "draft",
                  "internal",
                  "staging",
                  "confidential",
                ] as WatermarkMode[]
              ).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className="rounded-md border border-border px-3 py-1 text-sm text-foreground hover:bg-muted"
                >
                  {item}
                </button>
              ))}
            </div>

            <Watermark
              text={active.text}
              opacity={active.opacity}
              rotate={active.rotate}
              color={active.color}
              width={200}
              height={180}
              fontSize={18}
            >
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Profile preview for release notes, runbook screenshots, and
                shareable QA artifacts.
              </div>
            </Watermark>

            <p className="text-xs text-muted-foreground">
              Active profile: {active.text} | opacity {active.opacity}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and reusable
              configuration presets.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Store mode profiles in a shared configuration map.</li>
              <li>
                - Reuse presets across export, print, and screenshot flows.
              </li>
              <li>- Keep profile labels consistent with legal policy terms.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Used for legal docs, audit exports, and pre-release screenshots.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Watermark text="CONFIDENTIAL" opacity={0.06} color="#7f1d1d">
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Customer contract preview with pricing appendix and legal
                clauses.
              </div>
            </Watermark>

            <Watermark
              text="STAGING"
              opacity={0.08}
              color="#0b6bcb"
              rotate={-34}
            >
              <div className="rounded border border-border/60 bg-background p-6 text-sm text-foreground">
                Pre-release dashboard screenshot for QA signoff and launch
                review.
              </div>
            </Watermark>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Pair watermark modes with document sensitivity classes.</li>
              <li>- Ensure exported PDFs preserve overlay styling.</li>
              <li>
                - Include policy-friendly labels like CONFIDENTIAL or DRAFT.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WatermarkExample;
