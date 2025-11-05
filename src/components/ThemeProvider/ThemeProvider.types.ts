import React from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme; // The actual selected theme (can be "system")
  resolvedTheme: "light" | "dark"; // The resolved theme (never "system")
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}
