"use client";

import { ThemeProvider } from "./ThemeProvider";

import type {Theme} from "./ThemeProvider.types"

interface ProvidersProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function NextThemeProvider({ children, defaultTheme, storageKey }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
}
