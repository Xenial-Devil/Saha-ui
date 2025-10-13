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
      className={`glass glass-hover p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none group ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon
          size={size}
          className="text-primary transition-transform group-hover:rotate-12"
        />
      ) : (
        <Sun
          size={size}
          className="text-warning transition-transform group-hover:rotate-180"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
