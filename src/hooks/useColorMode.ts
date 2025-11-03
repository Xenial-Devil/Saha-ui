import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * useColorMode - Manage dark/light theme mode
 * @param options - Color mode options
 * @returns Current mode and toggle function
 */

export type ColorMode = "light" | "dark" | "system";

export interface UseColorModeOptions {
  defaultMode?: ColorMode;
  storageKey?: string;
  classNameDark?: string;
  classNameLight?: string;
}

export interface UseColorModeReturn {
  colorMode: ColorMode;
  isDark: boolean;
  isLight: boolean;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(
  options: UseColorModeOptions = {}
): UseColorModeReturn {
  const {
    defaultMode = "system",
    storageKey = "color-mode",
    classNameDark = "dark",
    classNameLight = "light",
  } = options;

  const [storedMode, setStoredMode] = useLocalStorage<ColorMode>(
    storageKey,
    defaultMode
  );

  const [colorMode, setColorModeState] = useState<ColorMode>(storedMode);

  const getSystemPreference = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const getResolvedMode = useCallback(
    (mode: ColorMode): "light" | "dark" => {
      return mode === "system" ? getSystemPreference() : mode;
    },
    [getSystemPreference]
  );

  const isDark = getResolvedMode(colorMode) === "dark";
  const isLight = getResolvedMode(colorMode) === "light";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const resolvedMode = getResolvedMode(colorMode);

    if (resolvedMode === "dark") {
      root.classList.remove(classNameLight);
      root.classList.add(classNameDark);
    } else {
      root.classList.remove(classNameDark);
      root.classList.add(classNameLight);
    }
  }, [colorMode, getResolvedMode, classNameDark, classNameLight]);

  useEffect(() => {
    if (typeof window === "undefined" || colorMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      setColorModeState(colorMode);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [colorMode]);

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      setStoredMode(mode);
    },
    [setStoredMode]
  );

  const toggleColorMode = useCallback(() => {
    const currentResolved = getResolvedMode(colorMode);
    const newMode = currentResolved === "dark" ? "light" : "dark";
    setColorMode(newMode);
  }, [colorMode, getResolvedMode, setColorMode]);

  return {
    colorMode,
    isDark,
    isLight,
    setColorMode,
    toggleColorMode,
  };
}
