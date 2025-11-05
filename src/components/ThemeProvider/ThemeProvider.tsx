import React, { createContext, useContext } from "react";
import {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
} from "./ThemeProvider.types";
import { useColorMode } from "../../hooks/useColorMode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "saha-ui-theme",
}) => {
  // Use our custom useColorMode hook instead of manual state management
  const { colorMode, setColorMode, toggleColorMode, isDark } = useColorMode({
    defaultMode: defaultTheme,
    storageKey,
    classNameDark: "dark",
    classNameLight: "light",
  });

  // Expose both the selected theme (can be "system") and the resolved theme (always "light" | "dark")
  const theme = colorMode as Theme;
  const resolvedTheme: "light" | "dark" =
    colorMode === "system"
      ? isDark
        ? "dark"
        : "light"
      : (colorMode as "light" | "dark");

  const setTheme = (newTheme: Theme) => {
    setColorMode(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, toggleTheme: toggleColorMode, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
