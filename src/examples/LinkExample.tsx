"use client";

import { useState } from "react";
import Link from "../components/Link";
import { ExternalLink, Download, ArrowRight } from "lucide-react";

export const LinkExample = () => {
  const [lastClicked, setLastClicked] = useState("No link interaction yet.");
  const [activeDoc, setActiveDoc] = useState("Getting Started");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Link Component</h2>
        <p className="mt-2 text-muted-foreground">
          Styled navigation links for inline actions, docs menus, and CTAs.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with default variants for inline content navigation.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              <Link
                href="#"
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Clicked: Default link");
                }}
              >
                Default Link
              </Link>
              <Link
                href="#"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Clicked: Primary link");
                }}
              >
                Primary Link
              </Link>
              <Link
                href="#"
                variant="muted"
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Clicked: Muted link");
                }}
              >
                Muted Link
              </Link>
              <Link
                href="#"
                variant="underline"
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Clicked: Underline link");
                }}
              >
                Underlined Link
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{lastClicked}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use default and primary variants in body copy.</li>
              <li>• Keep link text explicit and action-driven.</li>
              <li>• Use underline style for article-heavy layouts.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Add icons and sizes for richer inline actions and utility links.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              <Link
                href="#"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
                showUnderline
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Opened Learn More path");
                }}
              >
                Learn More
              </Link>
              <Link
                href="#"
                variant="secondary"
                size="md"
                icon={<Download size={16} />}
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Triggered asset download");
                }}
              >
                Download Kit
              </Link>
              <Link
                href="#"
                variant="ghost"
                size="sm"
                icon={<ExternalLink size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  setLastClicked("Viewed external changelog");
                }}
              >
                External Changelog
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep icon usage consistent per section.</li>
              <li>• Larger link sizes suit hero and landing CTAs.</li>
              <li>• Reserve ghost links for less prominent actions.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Combine external behavior, button variants, and disabled link states.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <Link
              href="https://react.dev"
              external
              variant="primary"
              icon={<ExternalLink size={14} />}
            >
              React Documentation
            </Link>
            <Link
              href="https://www.typescriptlang.org"
              external
              variant="accent"
              icon={<ExternalLink size={14} />}
            >
              TypeScript Docs
            </Link>
            <Link
              href="#"
              variant="button"
              onClick={(e) => {
                e.preventDefault();
                setLastClicked("Started onboarding flow");
              }}
            >
              Start Onboarding
            </Link>
            <Link href="#" variant="primary" disabled>
              Premium Settings (Coming Soon)
            </Link>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use external for outbound docs and partner links.</li>
              <li>• Button variant is useful for hybrid link-action flows.</li>
              <li>• Disabled links should include explanatory copy nearby.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Build docs sidebars and resource hubs with active selection context.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-2 rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Developer Docs
              </p>
              <Link
                href="#"
                variant={
                  activeDoc === "Getting Started" ? "primary" : "default"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveDoc("Getting Started");
                }}
              >
                Getting Started
              </Link>
              <Link
                href="#"
                variant={activeDoc === "Deployment" ? "primary" : "default"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveDoc("Deployment");
                }}
              >
                Deployment
              </Link>
              <Link
                href="#"
                variant={activeDoc === "Security" ? "primary" : "default"}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveDoc("Security");
                }}
              >
                Security
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Active doc: {activeDoc}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Map active variant to current route context.</li>
              <li>• Keep docs navigation concise and hierarchical.</li>
              <li>• Use aria-current in routed implementations.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkExample;
