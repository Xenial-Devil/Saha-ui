"use client";
import Affix from "../components/Affix";

export default function AffixExample() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Affix</h2>
        <p className="text-muted-foreground">
          Keep elements sticky to viewport edges.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <p className="text-sm text-muted-foreground">
          Affix makes a child stick to the viewport when scrolling.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Affix offsetTop={10}>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded">
              Sticky Button
            </button>
          </Affix>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <p className="text-sm text-muted-foreground">
          You can use CSS sticky mode or JS-affix mode.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg flex gap-4">
          <Affix offsetTop={0} useSticky>
            <div className="px-3 py-2 bg-accent text-accent-foreground rounded">
              Sticky (CSS)
            </div>
          </Affix>
          <Affix offsetBottom={10}>
            <div className="px-3 py-2 bg-secondary text-secondary-foreground rounded">
              Affix Bottom
            </div>
          </Affix>
        </div>
      </section>

      {/* Real World Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Commonly used for sticky headers or floating action buttons.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="h-48 overflow-auto p-4 border rounded">
            <Affix offsetTop={0} useSticky>
              <div className="px-4 py-2 bg-background rounded shadow">
                Sticky Header
              </div>
            </Affix>
            <div className="mt-4 space-y-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-2 bg-card rounded">
                  Content row {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
