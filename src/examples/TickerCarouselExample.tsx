"use client";

import React from "react";
import { TickerCarousel } from "../components/TickerCarousel/index"; // Assume default export or named export

const items = [
  { id: 1, title: "Next.js", description: "The React Framework" },
  { id: 2, title: "React", description: "UI Library" },
  { id: 3, title: "Tailwind", description: "Utility CSS" },
  { id: 4, title: "Vite", description: "Frontend Tooling" },
  { id: 5, title: "TypeScript", description: "Typed JavaScript" },
];

export const TickerCarouselExample = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold">TickerCarousel</h2>
        <p className="mt-2 text-muted-foreground">
          Continuously scrolling items, useful for logos, sponsors, or news tickets.
        </p>
      </div>

      <div className="py-8">
        <TickerCarousel 
          items={items}
          speed={30}
          cardWidth={250}
          gap={16}
          rows={1}
          showEdgeFade={true}
        />
      </div>
    </div>
  );
};

export default TickerCarouselExample;
