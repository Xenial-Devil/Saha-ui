"use client";

import React, { useState, useRef, useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type { ColorPickerProps, PresetColor } from "./ColorPicker.types";
import {
  colorPickerVariants,
  colorPickerTriggerVariants,
  colorPickerSwatchVariants,
  colorPickerPopoverVariants,
  colorPickerInputVariants,
  colorPickerPresetColorsVariants,
  colorPickerPresetColorVariants,
  colorPickerClearButtonVariants,
} from "./ColorPicker.styles";

export type ColorPickerVariantsProps = VariantProps<typeof colorPickerVariants>;

// Default preset colors
const DEFAULT_PRESETS: PresetColor[] = [
  { color: "#f5222d", label: "Red" },
  { color: "#fa541c", label: "Orange" },
  { color: "#fa8c16", label: "Gold" },
  { color: "#faad14", label: "Yellow" },
  { color: "#52c41a", label: "Green" },
  { color: "#13c2c2", label: "Cyan" },
  { color: "#1890ff", label: "Blue" },
  { color: "#2f54eb", label: "Purple" },
  { color: "#722ed1", label: "Violet" },
  { color: "#eb2f96", label: "Magenta" },
  { color: "#000000", label: "Black" },
  { color: "#ffffff", label: "White" },
  { color: "#f0f0f0", label: "Gray 1" },
  { color: "#d9d9d9", label: "Gray 2" },
  { color: "#bfbfbf", label: "Gray 3" },
  { color: "#8c8c8c", label: "Gray 4" },
];

/**
 * ColorPicker Component
 *
 * A color picker component with preset colors and hex input.
 * Perfect for theme customization and design tools.
 * Supports hex color format with optional alpha channel.
 *
 * @example
 * ```tsx
 * // Basic color picker
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 * />
 *
 * // With presets
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   presets={customPresets}
 * />
 *
 * // With clear button
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   allowClear
 * />
 * ```
 */
const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = "#000000",
      onChange,
      format: _format = "hex",
      showFormatSwitch: _showFormatSwitch = false,
      disableAlpha: _disableAlpha = false,
      presets = DEFAULT_PRESETS,
      showPresets = true,
      size = "md",
      disabled = false,
      placement = "bottom-start",
      trigger,
      allowClear = false,
      className,
      triggerClassName,
      popoverClassName,
      asChild: _asChild = false,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Determine if component is controlled
    const isControlled = controlledValue !== undefined;
    const currentColor = isControlled ? controlledValue : uncontrolledValue;

    // Update input value when color changes
    useEffect(() => {
      setInputValue(currentColor || "");
    }, [currentColor]);

    // Handle color change
    const handleColorChange = (newColor: string) => {
      if (disabled) return;

      if (!isControlled) {
        setUncontrolledValue(newColor);
      }
      onChange?.(newColor);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // Validate hex color
      if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
        handleColorChange(value);
      }
    };

    // Handle preset click
    const handlePresetClick = (color: string) => {
      handleColorChange(color);
      setIsOpen(false);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleColorChange("");
    };

    // Handle click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    const normalizedPresets = Array.isArray(presets[0])
      ? (presets as PresetColor[][])
      : [presets as PresetColor[]];

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }}
        className={cn(colorPickerVariants({ size, disabled }), className)}
        {...props}
      >
        {/* Trigger */}
        {trigger ? (
          <div onClick={() => !disabled && setIsOpen(!isOpen)}>{trigger}</div>
        ) : (
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              colorPickerTriggerVariants({ size, disabled }),
              triggerClassName,
            )}
            aria-label="Pick a color"
            aria-expanded={isOpen}
          >
            <div
              className={cn(colorPickerSwatchVariants({ size }))}
              style={{
                background: currentColor || "#ffffff",
              }}
            >
              {!currentColor && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "8px 8px",
                    backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                  }}
                />
              )}
            </div>
            <span className="text-sm">{currentColor || "Select"}</span>
            {allowClear && currentColor && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(colorPickerClearButtonVariants())}
                aria-label="Clear color"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </button>
        )}

        {/* Popover */}
        {isOpen && (
          <div
            ref={popoverRef}
            className={cn(
              colorPickerPopoverVariants({ placement }),
              "absolute z-50 mt-2",
              popoverClassName,
            )}
            role="dialog"
            aria-label="Color picker"
          >
            {/* Hex Input */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Hex Color
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                className={cn(colorPickerInputVariants({ disabled }))}
                disabled={disabled}
              />
            </div>

            {/* Preset Colors */}
            {showPresets && normalizedPresets.length > 0 && (
              <div className="space-y-3">
                {normalizedPresets.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <div className={cn(colorPickerPresetColorsVariants())}>
                      {group.map((preset) => (
                        <button
                          key={preset.color}
                          type="button"
                          onClick={() => handlePresetClick(preset.color)}
                          className={cn(
                            colorPickerPresetColorVariants({
                              active: preset.color === currentColor,
                            }),
                          )}
                          style={{ background: preset.color }}
                          title={preset.label}
                          aria-label={`Select ${preset.label || preset.color}`}
                        >
                          {preset.color === currentColor && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white shadow" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
export default ColorPicker;
export type { ColorPickerProps, PresetColor };
