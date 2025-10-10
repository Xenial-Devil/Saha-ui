import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { ThemeToggleProps } from "./ThemeToggle.types";

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = 20,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`glass glass-hover p-3 rounded-xl transition-all duration-base hover:scale-105 active:scale-95 ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon size={size} className="text-primary" />
      ) : (
        <Sun size={size} className="text-warning" />
      )}
    </button>
  );
};

export default ThemeToggle;
