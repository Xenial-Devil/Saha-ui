"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  color = "primary",
  appearance = "default",
  menuBg = "default",
  menuBorder = "default",
  menuText = "default",
  menuClassName,
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [portalPos, setPortalPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const portalRef = React.useRef<HTMLDivElement | null>(null);

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

  // Create a portal container once
  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  // number of menu options (used for positioning estimates)
  const themeOptionsCount = 3;

  // Compute portal position when opening
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();

      // Estimate menu width based on variant (Tailwind w-44 = 11rem = 176px, w-52 = 13rem = 208px)
      const menuWidthMap: Record<string, number> = {
        icon: 176,
        "icon-label": 208,
      };

      const estimatedMenuWidth = menuWidthMap[variant] ?? 200;

      // Estimate menu height from number of options (approx 48px per option + padding)
      const approxOptionHeight = 48;
      const estimatedMenuHeight = Math.min(
        themeOptionsCount * approxOptionHeight + 16,
        400
      );

      const margin = 8; // keep a small margin from viewport edges

      // Preferred left aligns to the button's left
      let left = rect.left + window.scrollX;

      // If it would overflow right, try aligning right edge to the button's right
      if (left + estimatedMenuWidth > window.innerWidth - margin) {
        const altLeft = rect.right + window.scrollX - estimatedMenuWidth;
        // If altLeft still overflows left edge, clamp to margin
        left = Math.max(
          margin,
          Math.min(altLeft, window.innerWidth - estimatedMenuWidth - margin)
        );
      }

      // Preferred top is below the button
      let top = rect.bottom + window.scrollY;

      // If there's not enough space below, flip above the button
      if (
        top + estimatedMenuHeight >
        window.scrollY + window.innerHeight - margin
      ) {
        const flippedTop = rect.top + window.scrollY - estimatedMenuHeight;
        top = Math.max(margin, flippedTop);
      }

      setPortalPos({ top, left });
    }
  }, [isOpen, variant, themeOptionsCount]);

  // After portal renders, measure its actual size and clamp/flip if needed
  useEffect(() => {
    if (!isOpen || !portalRef.current) return;

    const el = portalRef.current;
    const margin = 8;
    const rect = dropdownRef.current?.getBoundingClientRect();
    if (!rect) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    let left = portalPos.left;
    // Clamp horizontally
    if (left + w > window.innerWidth - margin) {
      const altLeft = rect.right + window.scrollX - w;
      left = Math.max(
        margin,
        Math.min(altLeft, window.innerWidth - w - margin)
      );
    }
    if (left < margin) left = margin;

    let top = portalPos.top;
    // Flip above if overflowing bottom
    if (top + h > window.scrollY + window.innerHeight - margin) {
      const flippedTop = rect.top + window.scrollY - h;
      top = Math.max(margin, flippedTop);
    }

    // Only update if different to avoid layout loops
    if (
      Math.abs(left - portalPos.left) > 1 ||
      Math.abs(top - portalPos.top) > 1
    ) {
      setPortalPos({ left, top });
    }
  }, [isOpen, portalContainer, portalPos.left, portalPos.top]);

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

  // If user provided `menuClassName`, use it directly. Otherwise combine the
  // mapped Tailwind classes derived from `menuBg`, `menuBorder`, and `menuText`.
  const menuBgMap: Record<string, string> = {
    default: "bg-white dark:bg-black",
    white: "bg-white",
    primary: "bg-primary",
    neutral: "bg-foreground",
  };

  const menuBorderMap: Record<string, string> = {
    default: "border border-white/6 dark:border-black/6",
    none: "border-0",
    primary: "border border-primary",
    neutral: "border border-muted",
  };

  const menuTextMap: Record<string, string> = {
    default: "text-foreground",
    primary: "text-primary",
    neutral: "text-foreground",
  };

  const computedMenuClassName =
    menuClassName ||
    [
      menuBgMap[menuBg] ?? menuBgMap.default,
      menuBorderMap[menuBorder] ?? menuBorderMap.default,
      menuTextMap[menuText] ?? menuTextMap.default,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          themeToggleButtonVariants({ variant, appearance }),
          className
        )}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        title={
          mounted
            ? `Current theme: ${currentThemeOption.label}`
            : "Toggle theme"
        }
      >
        <span className={cn(themeToggleIconWrap({ size: "md" }))}>
          {mounted ? (
            <CurrentIcon
              size={size}
              className={themeToggleIconVariants({ theme, color })}
            />
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                "inline-block",
                size === 20 ? "w-5 h-5" : "w-4 h-4"
              )}
            />
          )}
        </span>

        {variant === "icon-label" && (
          <span className={themeLabelVariants({ color })}>
            {mounted ? (
              currentThemeOption.label
            ) : (
              <span aria-hidden="true" className="inline-block w-12 h-4" />
            )}
          </span>
        )}

        {variant === "icon-label" && (
          <ChevronDown size={14} className="ml-1 text-muted-foreground" />
        )}
      </button>

      {isOpen && portalContainer
        ? createPortal(
            <div
              ref={portalRef}
              className={cn(
                // disable animation when rendering into portal so menu appears exactly at position
                themeDropdownVariants({ variant, animated: "off" }),
                computedMenuClassName
              )}
              style={{
                position: "absolute",
                top: portalPos.top,
                left: portalPos.left,
              }}
              role="menu"
            >
              {themeOptions.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = theme === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeSelect(option.value)}
                    role="menuitem"
                    className={cn(
                      themeOptionVariants({ selected: isSelected })
                    )}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                      <OptionIcon size={16} />
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </button>
                );
              })}
            </div>,
            portalContainer
          )
        : isOpen && (
            <div
              className={cn(
                themeDropdownVariants({ variant }),
                computedMenuClassName
              )}
              role="menu"
            >
              {themeOptions.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = theme === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeSelect(option.value)}
                    role="menuitem"
                    className={cn(
                      themeOptionVariants({ selected: isSelected })
                    )}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                      <OptionIcon size={16} />
                    </span>
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
    </div>
  );
};

export default ThemeToggle;
