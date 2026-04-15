import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TickerCarousel } from "./index";

describe("TickerCarousel", () => {
  const items = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
  ];

  it("renders the carousel and items correctly", () => {
    render(<TickerCarousel items={items} ariaLabel="Test Carousel" />);

    // Check basic ARIA roles
    const region = screen.getByRole("region", { name: "Test Carousel" });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");

    // Because TickerCarousel creates clones based on measurements and testing-library uses JSDOM (no real layout),
    // we should at least expect the items to be rendered in the DOM somewhere.
    const item1 = screen.getAllByText("Item 1")[0];
    const item2 = screen.getAllByText("Item 2")[0];
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
