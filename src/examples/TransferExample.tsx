"use client";

import { useState } from "react";
import { Transfer } from "../components/Transfer";

export default function TransferExample() {
  const [items] = useState([
    { key: "1", label: "Item 1" },
    { key: "2", label: "Item 2" },
    { key: "3", label: "Item 3" },
  ]);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Transfer</h2>
        <p className="text-muted-foreground">Move items between two lists.</p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Transfer dataSource={items} />
        </div>
      </section>

      {/* Variants & Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants & Real World</h3>
        <p className="text-sm text-muted-foreground">
          Enable search, disable items, and use in settings pages to move
          options between lists.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Transfer dataSource={items} />
        </div>
      </section>
    </div>
  );
}
