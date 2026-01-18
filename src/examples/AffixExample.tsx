"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Affix,
  AffixGroup,
  type AffixHandle,
  type ScrollInfo,
  type ScrollDirection,
  type PerformanceMetrics,
} from "../components/Affix";

export default function AffixExample() {
  // State for interactive examples
  const [affixState, setAffixState] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [controlledAffixed, setControlledAffixed] = useState(false);
  const [imperativeState, setImperativeState] = useState<string>("Not affixed");
  const [stackedAffixIds, setStackedAffixIds] = useState<string[]>([]);
  const [boundaryStatus, setBoundaryStatus] = useState("Not reached");

  // Ref for imperative handle
  const affixRef = useRef<AffixHandle>(null);

  // Callbacks
  const handleChange = useCallback((affixed: boolean) => {
    setAffixState(affixed);
  }, []);

  const handleScroll = useCallback((info: ScrollInfo) => {
    setScrollProgress(Math.round(info.scrollProgress * 100));
  }, []);

  const handleDirectionChange = useCallback(
    (direction: ScrollDirection, _prevDirection: ScrollDirection) => {
      setScrollDirection(direction);
    },
    []
  );

  const handleMetricsUpdate = useCallback((m: PerformanceMetrics) => {
    setMetrics(m);
  }, []);

  // Update imperative state display
  const updateImperativeDisplay = useCallback(() => {
    if (affixRef.current) {
      const state = affixRef.current.getState();
      setImperativeState(
        state.affixed ? `Affixed (${state.position})` : "Not affixed"
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(updateImperativeDisplay, 100);
    return () => clearInterval(interval);
  }, [updateImperativeDisplay]);

  return (
    <div className="space-y-8 p-8 pb-[600px]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Affix Component</h1>
        <p className="text-muted-foreground mt-2">
          Advanced sticky/fixed positioning with all features working.
        </p>
      </div>

      {/* ============================================ */}
      {/* SCROLL DIRECTION DETECTION - FIXED */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Scroll Direction Detection
        </h2>
        <p className="text-sm text-muted-foreground">
          Show/hide elements based on scroll direction. Current direction:{" "}
          <strong className="text-foreground">{scrollDirection}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Affix on Scroll Up */}
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Show on Scroll Up</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Scroll down first, then scroll up to see the header appear
            </p>
            <div
              className="h-64 overflow-auto border rounded relative"
              id="scroll-up-container"
            >
              <Affix
                offsetTop={0}
                affixOnScrollUp
                shadow
                transition={{ duration: 300 }}
                target={() =>
                  document.getElementById("scroll-up-container") as HTMLElement
                }
                onDirectionChange={handleDirectionChange}
              >
                <div className="px-4 py-3 bg-green-500 text-white flex items-center gap-2">
                  <span>↑</span>
                  <span>Visible when scrolling UP</span>
                </div>
              </Affix>
              <div className="p-4 space-y-2 mt-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="p-2 bg-card rounded border text-sm">
                    Scroll down first, then scroll up - Row {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Affix on Scroll Down */}
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Show on Scroll Down</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Scroll down to see the header appear
            </p>
            <div
              className="h-64 overflow-auto border rounded relative"
              id="scroll-down-container"
            >
              <Affix
                offsetTop={0}
                affixOnScrollDown
                shadow
                transition={{ duration: 300 }}
                target={() =>
                  document.getElementById(
                    "scroll-down-container"
                  ) as HTMLElement
                }
              >
                <div className="px-4 py-3 bg-orange-500 text-white flex items-center gap-2">
                  <span>↓</span>
                  <span>Visible when scrolling DOWN</span>
                </div>
              </Affix>
              <div className="p-4 space-y-2 mt-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="p-2 bg-card rounded border text-sm">
                    Scroll to see - Row {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bi-directional */}
        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Bi-directional Mode</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sticks to top when scrolling up, bottom when scrolling down.
          </p>
          <div
            className="h-64 overflow-auto border rounded relative"
            id="bidirectional-container"
          >
            <Affix
              offsetTop={0}
              offsetBottom={0}
              biDirectional
              shadow
              target={() =>
                document.getElementById(
                  "bidirectional-container"
                ) as HTMLElement
              }
            >
              <div className="px-4 py-3 bg-purple-500 text-white">
                I follow your scroll direction!
              </div>
            </Affix>
            <div className="p-4 space-y-2 mt-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="p-2 bg-card rounded border text-sm">
                  Content {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BOUNDARY ELEMENT - FIXED */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Boundary Element
        </h2>
        <p className="text-sm text-muted-foreground">
          Stop affixing when reaching a boundary element (like a footer).
          Status: <strong className="text-foreground">{boundaryStatus}</strong>
        </p>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div
            className="h-80 overflow-auto border rounded relative"
            id="boundary-scroll-container"
          >
            <Affix
              offsetTop={0}
              shadow
              target={() =>
                document.getElementById(
                  "boundary-scroll-container"
                ) as HTMLElement
              }
              boundaryElement="#boundary-footer-element"
              onBoundaryReached={(info) => {
                console.log("Boundary reached:", info);
                setBoundaryStatus("Boundary reached! Header stopped.");
              }}
              onChange={(affixed) => {
                if (!affixed) {
                  setBoundaryStatus("Not affixed");
                } else {
                  setBoundaryStatus("Affixed - scrolling...");
                }
              }}
            >
              <div className="px-4 py-3 bg-primary text-primary-foreground">
                I stop before the red footer! Scroll down to see.
              </div>
            </Affix>
            <div className="p-4 space-y-2 mt-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="p-3 bg-card rounded border">
                  Content row {i + 1} - Keep scrolling to reach the boundary
                </div>
              ))}
            </div>
            <div
              id="boundary-footer-element"
              className="p-6 bg-red-500 text-white text-center font-bold"
            >
              🛑 FOOTER BOUNDARY - Header stops here and unsticks!
            </div>
            <div className="p-4 space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-3 bg-card rounded border">
                  Content after footer {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STACKING / AFFIX GROUP - FIXED */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Stacking with AffixGroup
        </h2>
        <p className="text-sm text-muted-foreground">
          Multiple Affix components that stack properly. Active:{" "}
          <strong className="text-foreground">
            {stackedAffixIds.length > 0 ? stackedAffixIds.join(", ") : "None"}
          </strong>
        </p>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div
            className="h-80 overflow-auto border rounded relative"
            id="stacking-container"
          >
            <AffixGroup
              gap={0}
              onGroupChange={(ids) => {
                console.log("Stacked affixes:", ids);
                setStackedAffixIds(ids);
              }}
            >
              <Affix
                offsetTop={0}
                useSticky
                autoStack
                stackId="topbar"
                stackPriority={1}
                shadow
              >
                <div className="px-4 py-2 bg-red-500 text-white font-medium">
                  🔴 Top Bar (Priority 1) - Height: 40px
                </div>
              </Affix>

              <Affix
                offsetTop={0}
                useSticky
                autoStack
                stackId="navigation"
                stackPriority={2}
                shadow
              >
                <div className="px-4 py-3 bg-blue-500 text-white font-medium">
                  🔵 Navigation (Priority 2) - Height: 48px
                </div>
              </Affix>

              <Affix
                offsetTop={0}
                useSticky
                autoStack
                stackId="subnav"
                stackPriority={3}
                shadow
              >
                <div className="px-4 py-2 bg-green-500 text-white font-medium">
                  🟢 Sub Navigation (Priority 3) - Height: 40px
                </div>
              </Affix>

              <div className="p-4 space-y-2">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="p-3 bg-card rounded border">
                    Content row {i + 1} - All three headers should stack!
                  </div>
                ))}
              </div>
            </AffixGroup>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Scroll inside the container. Headers stack with proper offsets based
            on priority.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* IMPERATIVE CONTROL - FIXED */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Imperative Control
        </h2>
        <p className="text-sm text-muted-foreground">
          Control the Affix programmatically using a ref. Current state:{" "}
          <strong className="text-foreground">{imperativeState}</strong>
        </p>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => {
                affixRef.current?.forceAffix(true);
                updateImperativeDisplay();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Force Affix ON
            </button>
            <button
              onClick={() => {
                affixRef.current?.forceAffix(false);
                updateImperativeDisplay();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Force Affix OFF
            </button>
            <button
              onClick={() => {
                affixRef.current?.reset();
                updateImperativeDisplay();
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => {
                affixRef.current?.updatePosition();
                updateImperativeDisplay();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Update Position
            </button>
            <button
              onClick={() => {
                const state = affixRef.current?.getState();
                console.log("Current Affix State:", state);
                alert(JSON.stringify(state, null, 2));
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Get State (Console + Alert)
            </button>
            <button
              onClick={() => {
                const scrollInfo = affixRef.current?.getScrollInfo();
                console.log("Scroll Info:", scrollInfo);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Log Scroll Info
            </button>
          </div>

          <div
            className="h-64 overflow-auto border rounded relative"
            id="imperative-container"
          >
            <Affix
              ref={affixRef}
              offsetTop={0}
              shadow
              target={() =>
                document.getElementById("imperative-container") as HTMLElement
              }
              onChange={(affixed, position) => {
                console.log("Affix changed:", { affixed, position });
                updateImperativeDisplay();
              }}
            >
              <div className="px-4 py-3 bg-background border-b">
                <span className="font-medium">Controlled Header</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  (Use buttons above to control)
                </span>
              </div>
            </Affix>
            <div className="p-4 space-y-2 mt-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="p-3 bg-card rounded border">
                  Content row {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMBINED FEATURES */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Combined Features Demo
        </h2>
        <p className="text-sm text-muted-foreground">
          All features working together: scroll direction + boundary + stacking
        </p>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-card rounded border">
            <div>
              <span className="text-muted-foreground text-sm">Progress:</span>
              <span className="ml-2 font-mono">{scrollProgress}%</span>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Direction:</span>
              <span className="ml-2 font-mono">{scrollDirection}</span>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Affixed:</span>
              <span className="ml-2 font-mono">
                {affixState ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Updates:</span>
              <span className="ml-2 font-mono">
                {metrics?.updateCount || 0}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4 h-2 bg-muted rounded overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <div
            className="h-80 overflow-auto border rounded relative"
            id="combined-container"
          >
            <Affix
              offsetTop={0}
              shadow={{ blur: 12, color: "rgba(0,0,0,0.15)" }}
              backdrop={{ blur: 8, backgroundColor: "rgba(255,255,255,0.9)" }}
              transition={{ duration: 200 }}
              target={() =>
                document.getElementById("combined-container") as HTMLElement
              }
              onChange={handleChange}
              onScroll={handleScroll}
              onDirectionChange={handleDirectionChange}
              exposeMetrics
              onMetricsUpdate={handleMetricsUpdate}
              debug={{
                enabled: true,
                showScrollInfo: true,
                showPositionInfo: true,
              }}
            >
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Smart Header</span>
                  <div className="flex gap-2 text-xs">
                    <span
                      className={`px-2 py-1 rounded ${
                        scrollDirection === "up"
                          ? "bg-green-100 text-green-700"
                          : scrollDirection === "down"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {scrollDirection === "up"
                        ? "↑"
                        : scrollDirection === "down"
                        ? "↓"
                        : "—"}
                    </span>
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                      {scrollProgress}%
                    </span>
                  </div>
                </div>
              </div>
            </Affix>
            <div className="p-4 space-y-2 mt-2">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="p-3 bg-card rounded border">
                  Content row {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BASIC EXAMPLES */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Basic Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CSS Sticky */}
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">CSS Sticky Mode</h3>
            <div className="h-48 overflow-auto border rounded">
              <Affix offsetTop={0} useSticky shadow>
                <div className="px-4 py-2 bg-green-500 text-white">
                  CSS Sticky (Best Performance)
                </div>
              </Affix>
              <div className="p-4 space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-2 bg-card rounded border text-sm">
                    Content {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* JS Fixed */}
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">JS Fixed Mode</h3>
            <div
              className="h-48 overflow-auto border rounded relative"
              id="js-fixed-container"
            >
              <Affix
                offsetTop={0}
                shadow
                target={() =>
                  document.getElementById("js-fixed-container") as HTMLElement
                }
              >
                <div className="px-4 py-2 bg-blue-500 text-white">
                  JS Fixed (More Features)
                </div>
              </Affix>
              <div className="p-4 space-y-2 mt-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-2 bg-card rounded border text-sm">
                    Content {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTROLLED MODE */}
      {/* ============================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Controlled Mode
        </h2>
        <p className="text-sm text-muted-foreground">
          Fully control the affixed state externally with a checkbox.
        </p>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={controlledAffixed}
                onChange={(e) => setControlledAffixed(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="font-medium">Force Affixed State</span>
            </label>
          </div>

          <div
            className="h-48 overflow-auto border rounded relative"
            id="controlled-container"
          >
            <Affix
              offsetTop={0}
              affixed={controlledAffixed}
              shadow
              target={() =>
                document.getElementById("controlled-container") as HTMLElement
              }
            >
              <div
                className={`px-4 py-3 transition-colors ${
                  controlledAffixed
                    ? "bg-green-500 text-white"
                    : "bg-background"
                }`}
              >
                {controlledAffixed ? "✓ Forced Affixed!" : "Not Forced"}
              </div>
            </Affix>
            <div className="p-4 space-y-2 mt-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-2 bg-card rounded border text-sm">
                  Content {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32" />
    </div>
  );
}
