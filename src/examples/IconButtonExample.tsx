"use client";
import IconButton from "../components/IconButton";
import { Search, X } from "lucide-react";

export default function IconButtonExample() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Icon Button</h2>
        <p className="text-muted-foreground">
          Compact buttons for icon-only actions.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg flex gap-4">
          <IconButton icon={<Search />} aria-label="Search" />
          <IconButton icon={<X />} variant="outlined" aria-label="Close" />
        </div>
      </section>

      {/* Variants & Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants & Sizes</h3>
        <div className="bg-muted/30 p-6 rounded-lg flex gap-4 items-center">
          <IconButton icon={<Search />} size="sm" aria-label="Search small" />
          <IconButton icon={<Search />} size="md" aria-label="Search medium" />
          <IconButton icon={<Search />} size="lg" aria-label="Search large" />
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Icon buttons are ideal for toolbars and compact controls.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg flex gap-4">
          <div className="flex items-center gap-2">
            <IconButton icon={<Search />} aria-label="Search" />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>
        </div>
      </section>
    </div>
  );
}
