"use client";

import { useState } from "react";
import Backdrop from "../components/Backdrop";

export default function BackdropExample() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [blurOpen, setBlurOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Backdrop Component</h2>
        <p className="text-muted-foreground">
          A flexible overlay surface for modals, loading states, and attention-blocking flows.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Show a simple modal surface over the page.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-xl border border-border bg-card p-5">
              <button
                onClick={() => setBasicOpen(true)}
                className="rounded bg-primary px-4 py-2 text-primary-foreground"
              >
                Show Basic Backdrop
              </button>

              <Backdrop open={basicOpen} onClick={() => setBasicOpen(false)}>
                <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl">
                  <h4 className="text-lg font-semibold text-foreground">Archive Draft</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This action hides the draft from your active queue.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded border border-border bg-card px-3 py-1.5 text-sm"
                      onClick={() => setBasicOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                      onClick={() => setBasicOpen(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Backdrop>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
              <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• Keep close behavior predictable on backdrop click.</li>
                <li>• Pair with clear primary and secondary actions.</li>
                <li>• Lock scroll for modal contexts when appropriate.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blur / Gradient Variants */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Use blur and gradient variants to match the visual priority of content.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBlurOpen(true)}
                className="rounded bg-primary px-4 py-2 text-primary-foreground"
              >
                Blur Variant
              </button>
              <button
                onClick={() => setAuditOpen(true)}
                className="rounded border border-border bg-card px-4 py-2"
              >
                Gradient Variant
              </button>
            </div>

            <Backdrop
              open={blurOpen}
              variant="blur"
              blur="lg"
              opacity={0.6}
              onClick={() => setBlurOpen(false)}
            >
              <div className="w-full max-w-sm rounded-xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">Blur backdrop for focused review flows.</p>
              </div>
            </Backdrop>

            <Backdrop
              open={auditOpen}
              variant="gradient"
              blur="sm"
              opacity={0.7}
              onClick={() => setAuditOpen(false)}
            >
              <div className="w-full max-w-sm rounded-xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">Gradient backdrop for high-priority confirmations.</p>
              </div>
            </Backdrop>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Blur variants work well with rich page backgrounds.</li>
              <li>• Gradient styles help signal critical workflows.</li>
              <li>• Tune opacity based on underlying page contrast.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Advanced Usage</h3>
        <p className="text-sm text-muted-foreground">
          Build non-modal overlays and loading blockers with custom behavior.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLoadingOpen(true)}
                className="rounded bg-primary px-4 py-2 text-primary-foreground"
              >
                Show Loading Overlay
              </button>
              <button
                onClick={() => setLoadingOpen(false)}
                className="rounded border border-border bg-card px-4 py-2"
              >
                Hide Overlay
              </button>
            </div>

            <Backdrop
              open={loadingOpen}
              variant="solid"
              blur="sm"
              preventScroll
              transitionDuration={220}
              unmountOnExit
            >
              <div className="w-full max-w-xs rounded-xl border border-border bg-background p-5 text-center">
                <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                <p className="text-sm text-muted-foreground">Syncing release metadata...</p>
              </div>
            </Backdrop>

            <Backdrop open={false} invisible disablePointerEvents unmountOnExit />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use unmountOnExit for transient overlays.</li>
              <li>• Keep loading text specific to current background task.</li>
              <li>• disablePointerEvents is useful for nested overlay stacks.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Real-Life Use Cases */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Real-Life Use Cases</h3>
        <p className="text-sm text-muted-foreground">
          Combine backdrop states in audits, approvals, and sensitive actions.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <h4 className="text-sm font-semibold text-foreground">Security Approval Gate</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Backdrop overlays can pause interaction until approval is confirmed.
              </p>
              <button
                type="button"
                onClick={() => setAuditOpen(true)}
                className="mt-3 rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
              >
                Review Approval Dialog
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Ideal for destructive actions and compliance checks.</li>
              <li>• Keep close actions explicit in audit-sensitive flows.</li>
              <li>• Log overlay opens for accountability when needed.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
