"use client";
import { useState } from "react";
import AvatarGroup from "../components/AvatarGroup";
import Avatar from "../components/Avatar";

export default function AvatarGroupExample() {
  const [lastAction, setLastAction] = useState("No interactions yet.");

  const members = [
    {
      name: "Aarav",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Nora",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Kai",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Lina",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Omar",
      src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Tara",
      src: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          AvatarGroup Component
        </h2>
        <p className="text-muted-foreground">
          Display a compact list of user avatars with overflow indicator.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with stacked avatars for compact team indicators.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <AvatarGroup>
              {members.slice(0, 4).map((member) => (
                <Avatar
                  key={member.name}
                  src={member.src}
                  alt={member.name}
                  fallback={member.name.slice(0, 2)}
                />
              ))}
            </AvatarGroup>
            <AvatarGroup size="lg" withRing>
              {members.slice(0, 3).map((member) => (
                <Avatar
                  key={`${member.name}-lg`}
                  src={member.src}
                  alt={member.name}
                  fallback={member.name.slice(0, 2)}
                />
              ))}
            </AvatarGroup>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use stacked mode for compact header summaries.</li>
              <li>• Add ring styling when avatars overlap heavily.</li>
              <li>• Keep fallback initials for unreliable image sources.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Switch between stack, row, and grid variants based on layout density.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Stack</p>
              <AvatarGroup variant="stack" size="md">
                {members.slice(0, 5).map((member) => (
                  <Avatar
                    key={`${member.name}-stack`}
                    src={member.src}
                    alt={member.name}
                    fallback={member.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Row</p>
              <AvatarGroup variant="row" gap size="sm">
                {members.slice(0, 4).map((member) => (
                  <Avatar
                    key={`${member.name}-row`}
                    src={member.src}
                    alt={member.name}
                    fallback={member.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            </div>
            <div className="space-y-2 md:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">
                Grid Dense
              </p>
              <AvatarGroup variant="grid-dense" size="sm">
                {members.map((member) => (
                  <Avatar
                    key={`${member.name}-grid`}
                    src={member.src}
                    alt={member.name}
                    fallback={member.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Row mode is ideal for list rows and table cells.</li>
              <li>• Grid variants suit roster and directory screens.</li>
              <li>• Keep size scales aligned with surrounding typography.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure max display, overflow interactions, and spacing control.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <AvatarGroup
              max={4}
              showCount
              withRing
              onMoreClick={() =>
                setLastAction("Clicked overflow indicator for product team.")
              }
            >
              {members.map((member) => (
                <Avatar
                  key={`${member.name}-advanced`}
                  src={member.src}
                  alt={member.name}
                  fallback={member.name.slice(0, 2)}
                />
              ))}
            </AvatarGroup>

            <AvatarGroup
              max={3}
              reverse
              spacing={10}
              onMoreClick={() =>
                setLastAction("Reviewed hidden members in reverse order group.")
              }
            >
              {members.map((member) => (
                <Avatar
                  key={`${member.name}-reverse`}
                  src={member.src}
                  alt={member.name}
                  fallback={member.name.slice(0, 2)}
                />
              ))}
            </AvatarGroup>
            <p className="text-xs text-muted-foreground">
              Last action: {lastAction}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Max and showCount keep headers compact.</li>
              <li>• Overflow click handlers can open full member drawers.</li>
              <li>• Reverse mode is useful for recency-based displays.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Use AvatarGroup in lists, headers, or conversation previews.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 p-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Release Squad
                </p>
                <p className="text-xs text-muted-foreground">
                  Deploying version 2.8.0
                </p>
              </div>
              <AvatarGroup max={5} showCount withRing>
                {members.map((member) => (
                  <Avatar
                    key={`${member.name}-release`}
                    src={member.src}
                    alt={member.name}
                    fallback={member.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/20 p-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Incident Channel
                </p>
                <p className="text-xs text-muted-foreground">
                  Active responders
                </p>
              </div>
              <AvatarGroup variant="row" size="sm" gap>
                {members.slice(0, 4).map((member) => (
                  <Avatar
                    key={`${member.name}-incident`}
                    src={member.src}
                    alt={member.name}
                    fallback={member.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Pair avatar groups with team context text.</li>
              <li>• Use smaller sizes in table or channel rows.</li>
              <li>• Keep membership counts explicit in critical workflows.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
