import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { Notification, NotificationProvider, useNotifications } from "./index";

const TestComponent = () => {
  const { addNotification, clearNotifications } = useNotifications();

  return (
    <div>
      <button
        onClick={() =>
          addNotification({ id: "test", title: "Test Notification", description: "This is a test notification." })
        }
      >
        Add Notification
      </button>
      <button onClick={clearNotifications}>Clear</button>
    </div>
  );
};

describe("Notification", () => {
  it("renders a notification via context", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    const addButton = screen.getByText("Add Notification");
    await userEvent.click(addButton);

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
    expect(screen.getByText("This is a test notification.")).toBeInTheDocument();
    
    // Check for accessibility
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute("aria-live", "polite");
  });

  it("dismisses the notification when close is clicked", async () => {
    const handleDismiss = vi.fn();
    render(
      <Notification
        id="n1"
        title="Dismissible"
        closable={true}
        onDismiss={handleDismiss}
      />
    );

    const closeBtn = screen.getByLabelText("Close notification");
    await userEvent.click(closeBtn);

    expect(handleDismiss).toHaveBeenCalledWith("n1");
  });
});
