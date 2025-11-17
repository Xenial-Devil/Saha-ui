"use client";

import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import { ThemeToggleProps } from "./ThemeToggle.types";
import { Theme } from "../ThemeProvider/ThemeProvider.types";
import { cn } from "../../lib/utils";
import {
  themeToggleButtonVariants,
  themeToggleIconVariants,
  themeToggleIconWrap,
  themeLabelVariants,
  themeDropdownVariants,
  themeOptionVariants,
} from "./ThemeToggle.styles";

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = 20,
  variant = "icon",
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set mounted state after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const themeOptions: Array<{ value: Theme; label: string; icon: typeof Sun }> =
    [
      { value: "light", label: "Light", icon: Sun },
      { value: "dark", label: "Dark", icon: Moon },
      { value: "system", label: "System", icon: Monitor },
    ];

  const currentThemeOption =
    themeOptions.find((opt) => opt.value === theme) || themeOptions[0];
  const CurrentIcon = currentThemeOption.icon;

  const handleThemeSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(themeToggleButtonVariants({ variant }), className)}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        title={
          mounted
            ? `Current theme: ${currentThemeOption.label}`
            : "Toggle theme"
        }
      >
        <span className={cn(themeToggleIconWrap({ size: "md" }))}>
          <CurrentIcon
            size={size}
            className={themeToggleIconVariants({ theme })}
          />
        </span>

        {variant === "icon-label" && (
          <span className={themeLabelVariants()}>
            {currentThemeOption.label}
          </span>
        )}

        {variant === "icon-label" && (
          <ChevronDown size={14} className="ml-1 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className={themeDropdownVariants({ variant })} role="menu">
          {themeOptions.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = theme === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleThemeSelect(option.value)}
                role="menuitem"
                className={cn(themeOptionVariants({ selected: isSelected }))}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                  <OptionIcon size={16} />
                </span>
                <span className="text-sm font-medium">{option.label}</span>
                {isSelected && <span className="ml-auto text-primary">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
