import { useMemo, useState } from "react";
import { InfiniteScroll } from "../components/InfiniteScroll";

const initialFeed = Array.from(
  { length: 8 },
  (_, index) => `Feed item ${index + 1}`,
);

const incidentLog = [
  "09:02 UTC - Elevated error rate detected in auth API.",
  "09:05 UTC - Traffic shifted to healthy cluster.",
  "09:12 UTC - Error rate recovered below threshold.",
  "09:18 UTC - Root cause tagged and postmortem draft started.",
];

export const InfiniteScrollExample = () => {
  const [dynamicItems, setDynamicItems] = useState<string[]>(initialFeed);
  const [isLoading, setIsLoading] = useState(false);
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const hasMore = dynamicItems.length < 20;

  const loadMore = () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    window.setTimeout(() => {
      setDynamicItems((current) => [
        ...current,
        ...Array.from({ length: 4 }, (_, index) => {
          const next = current.length + index + 1;
          return `Feed item ${next}`;
        }),
      ]);
      setPagesLoaded((current) => current + 1);
      setIsLoading(false);
    }, 650);
  };

  const loadSummary = useMemo(
    () => `${dynamicItems.length} items loaded across ${pagesLoaded} pages.`,
    [dynamicItems.length, pagesLoaded],
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          InfiniteScroll Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Progressive loading pattern for feeds, logs, and large result sets.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render finite content with an explicit end state.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <InfiniteScroll
              hasMore={false}
              isLoading={false}
              onLoadMore={() => undefined}
              endMessage="All items loaded"
            >
              <div className="space-y-2">
                {initialFeed.slice(0, 4).map((item) => (
                  <div key={item} className="rounded border p-2 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Always provide a clear terminal state message.</li>
              <li>- Keep list items visually compact and scannable.</li>
              <li>- Ensure non-scrolling pages still render cleanly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Display a loading state while fetching additional pages.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <InfiniteScroll
              hasMore={hasMore}
              isLoading={isLoading}
              onLoadMore={loadMore}
              loader={
                <p className="text-sm text-muted-foreground">
                  Loading next page...
                </p>
              }
            >
              <div className="space-y-2">
                {dynamicItems.map((item) => (
                  <div key={item} className="rounded border p-2 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </InfiniteScroll>
            <p className="mt-4 text-sm text-muted-foreground">{loadSummary}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Guard against duplicate fetches while loading.</li>
              <li>- Keep each page size consistent for smoother UX.</li>
              <li>- Surface progress details for heavy data views.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Tune observer threshold and root margin for dense feeds.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <InfiniteScroll
              hasMore={hasMore}
              isLoading={isLoading}
              onLoadMore={loadMore}
              threshold={0.25}
              rootMargin="180px"
              endMessage={
                <span className="text-sm">No more timeline events.</span>
              }
            >
              <div className="space-y-2">
                {dynamicItems.slice(0, 12).map((item) => (
                  <div key={item} className="rounded border p-2 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Increase `rootMargin` for earlier prefetching.</li>
              <li>- Adjust `threshold` to reduce false-positive triggers.</li>
              <li>- Keep loader messaging lightweight and informative.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Great for incident timelines, notifications, and analytics streams.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <InfiniteScroll
              hasMore={false}
              isLoading={false}
              onLoadMore={() => undefined}
              endMessage={<span>End of deployment log</span>}
            >
              <div className="space-y-2">
                {incidentLog.map((entry) => (
                  <div key={entry} className="rounded border p-2 text-sm">
                    {entry}
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep event lines short enough for fast scanning.</li>
              <li>
                - Pair entries with severity or status metadata when needed.
              </li>
              <li>- Avoid endless feeds without meaningful stop conditions.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfiniteScrollExample;
