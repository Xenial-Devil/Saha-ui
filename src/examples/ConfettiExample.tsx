import { useState } from "react";
import { Confetti } from "../components/Confetti";

export const ConfettiExample = () => {
  const [burstSeed, setBurstSeed] = useState(0);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Confetti Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Celebration overlays for success moments such as submissions,
          purchases, and onboarding completion.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Run a default celebratory burst with minimal configuration.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Confetti particleCount={80} duration={1800} />
            <div className="relative h-20 rounded-lg border border-border/60 bg-muted/30">
              <Confetti particleCount={50} duration={1200} />
              <p className="absolute inset-0 flex items-center justify-center text-xs text-foreground">
                Lightweight success burst
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Start with default timing and particle count.</li>
              <li>- Keep celebratory motion brief and intentional.</li>
              <li>- Use this for meaningful success transitions only.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Customize palette and duration for brand-aligned motion language.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Confetti
              particleCount={120}
              duration={2400}
              colors={["#22c55e", "#3b82f6", "#f59e0b"]}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and positive
              completion states.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Match colors with your semantic success palette.</li>
              <li>- Keep duration proportional to user task complexity.</li>
              <li>- Avoid overusing confetti for low-impact interactions.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Trigger confetti on demand for workflow events and replay testing.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <button
              type="button"
              onClick={() => setBurstSeed((current) => current + 1)}
              className="mb-4 rounded-md border border-border px-3 py-1 text-sm text-foreground hover:bg-muted"
            >
              Trigger celebration
            </button>
            <div
              key={burstSeed}
              className="relative h-24 rounded-lg bg-muted/40"
            >
              <Confetti
                autoStart
                particleCount={160}
                duration={3000}
                className="opacity-80"
              />
              <p className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                Milestone unlocked
              </p>
            </div>

            <div className="relative h-20 rounded-lg border border-border/60 bg-muted/30">
              <Confetti
                particleCount={130}
                duration={2600}
                colors={["#ef4444", "#f59e0b", "#3b82f6"]}
                autoStart
              />
              <p className="absolute inset-0 flex items-center justify-center text-xs text-foreground">
                Branded campaign preset
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Use controlled retriggers for QA and demo workflows.</li>
              <li>- Keep burst area scoped so text remains readable.</li>
              <li>- Integrate triggers with real completion events.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Ideal for milestone moments in checkout, onboarding, and publishing.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="relative h-28 rounded-lg border border-border/60 bg-muted/40">
              <Confetti particleCount={90} duration={2200} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-foreground">
                  Project created successfully
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Team workspace is ready for collaboration.
                </p>
              </div>
            </div>

            <div className="relative h-24 rounded-lg border border-border/60 bg-muted/40">
              <Confetti particleCount={70} duration={1600} />
              <p className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground">
                Checkout completed
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Connect celebrations to business-critical milestones.</li>
              <li>- Pair with contextual text that explains what completed.</li>
              <li>
                - Keep contrast and accessibility intact during animation.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfettiExample;
