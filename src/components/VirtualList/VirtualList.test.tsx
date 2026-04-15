import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { VirtualList } from "./index";
import { DragDropProvider } from "../DragDrop";

describe("VirtualList", () => {
  const items = Array.from({ length: 100 }).map((_, i) => ({ id: `item-${i}`, title: `Item ${i}` }));

  it("renders a subset of items based on container height", () => {
    // We mock getBoundingClientRect or similar if needed for scroll, but testing-library dom usually renders everything zero height.
    // However, our logic calculates `items.slice` based on default container height.
    const { container } = render(
      <DragDropProvider>
        <VirtualList
          items={items}
          itemHeight={50}
          containerHeight={400} // 400 / 50 = 8 items + overscan 3 = ~11 items visible
          renderItem={(item) => <div data-testid="virtual-item">{item.title}</div>}
        />
      </DragDropProvider>
    );

    // Initial render should contain only a subset, not all 100
    const renderedItems = screen.getAllByTestId("virtual-item");
    expect(renderedItems.length).toBeLessThan(100);
    expect(renderedItems.length).toBeGreaterThan(0);
    expect(screen.getByText("Item 0")).toBeInTheDocument();
  });
});
