"use client";

import * as React from "react";
import type { SonnerContextValue } from "./Sonner.types";

// ============================================================================
// CONTEXT
// ============================================================================

export const SonnerContext = React.createContext<SonnerContextValue | undefined>(
  undefined,
);

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook to access Sonner toast functionality
 * Must be used within a SonnerProvider
 */
export function useSonner() {
  const context = React.useContext(SonnerContext);
  if (!context) {
    throw new Error("useSonner must be used within SonnerProvider");
  }
  return context;
}
