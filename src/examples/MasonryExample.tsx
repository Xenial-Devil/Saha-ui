"use client";
import { Masonry } from "../components/Masonry";

export default function MasonryExample() {
  const items = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="p-4 bg-background rounded shadow">
      Item {i + 1}
    </div>
  ));

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Masonry</h2>
        <p className="text-muted-foreground">
          Responsive masonry layout for uneven content heights.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Masonry columns={3} gap="md">
            {items}
          </Masonry>
        </div>
      </section>

      {/* Variants & Columns */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Columns & Gap</h3>
        <p className="text-sm text-muted-foreground">
          Control columns and gap for responsive layouts.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Masonry columns={4} gap="lg">
            {items}
          </Masonry>
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Use Masonry for galleries, card grids, and feeds.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Masonry columns={3} gap="md">
            {items}
          </Masonry>
        </div>
      </section>
    </div>
  );
}
