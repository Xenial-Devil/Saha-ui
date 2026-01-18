"use client";

import React, { createContext, useContext } from "react";
import type { AppBarContextValue } from "./AppBar.types";

const AppBarContext = createContext<AppBarContextValue | null>(null);

export interface AppBarProviderProps {
  children: React.ReactNode;
  value: AppBarContextValue;
}

export function AppBarProvider({ children, value }: AppBarProviderProps) {
  return (
    <AppBarContext.Provider value={value}>{children}</AppBarContext.Provider>
  );
}

export function useAppBar(): AppBarContextValue {
  const context = useContext(AppBarContext);
  if (!context) {
    throw new Error("useAppBar must be used within an AppBarProvider");
  }
  return context;
}

export function useAppBarOptional(): AppBarContextValue | null {
  return useContext(AppBarContext);
}

// Selector hooks for performance optimization
export function useAppBarScrolled(): boolean {
  const context = useAppBar();
  return context.isScrolled;
}

export function useAppBarVisible(): boolean {
  const context = useAppBar();
  return context.isVisible;
}

export function useAppBarMobile(): boolean {
  const context = useAppBar();
  return context.isMobile;
}

export function useAppBarHeight(): number {
  const context = useAppBar();
  return context.height;
}

export { AppBarContext };
