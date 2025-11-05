"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { ComponentValidator } from "../../lib/validation";
import type {
  NativeSelectProps,
  NativeSelectOptionProps,
  NativeSelectGroupProps,
  NativeSelectLabelProps,
  NativeSelectDescriptionProps,
  NativeSelectErrorProps,
  NativeSelectWrapperProps,
  NativeSelectVariant,
  NativeSelectSize,
} from "./NativeSelect.types";
import {
  nativeSelectVariants,
  nativeSelectWrapperVariants,
  nativeSelectLabelVariants,
  nativeSelectDescriptionVariants,
  nativeSelectErrorVariants,
  nativeSelectIconVariants,
  nativeSelectOptionVariants,
  nativeSelectGroupVariants,
} from "./NativeSelect.styles";

// ===========================
// Validation Constants
// ===========================

const VALID_VARIANTS: NativeSelectVariant[] = [
  "default",
  "bordered",
  "filled",
  "ghost",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
  "purple",
  "pink",
  "indigo",
  "cyan",
  "teal",
  "orange",
  "glass",
];

const VALID_SIZES: NativeSelectSize[] = ["sm", "md", "lg"];

// ===========================
// NativeSelect Component (Root)
// ===========================

/**
 * NativeSelect - Native HTML select element with beautiful styling
 *
 * A fully accessible native select component with support for single and multiple
 * selections, grouped options, and extensive customization.
 *
 * @example
 * ```tsx
 * // Compact API
 * <NativeSelect variant="primary">
 *   <option value="">Select option</option>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 * </NativeSelect>
 *
 * // Component API
 * <NativeSelectWrapper>
 *   <NativeSelectLabel>Choose an option</NativeSelectLabel>
 *   <NativeSelect variant="primary">
 *     <NativeSelectOption value="">Select option</NativeSelectOption>
 *     <NativeSelectOption value="1">Option 1</NativeSelectOption>
 *     <NativeSelectOption value="2">Option 2</NativeSelectOption>
 *   </NativeSelect>
 *   <NativeSelectDescription>Select one option</NativeSelectDescription>
 * </NativeSelectWrapper>
 * ```
 */
export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(
  (
    {
      children,
      variant = "default",
      size = "md",
      error = false,
      success = false,
      disabled = false,
      className,
      placeholder,
      multiple = false,
      visibleOptions,
      ...props
    },
    ref
  ) => {
    // Runtime validation
    const validator = new ComponentValidator("NativeSelect");

    React.useEffect(() => {
      validator.validateEnum("variant", variant, VALID_VARIANTS);
      validator.validateEnum("size", size, VALID_SIZES);

      if (error && success) {
        validator.warn(
          "Both 'error' and 'success' props are true. 'error' will take precedence."
        );
      }

      if (placeholder && multiple) {
        validator.warn(
          "Placeholder is not typically used with multiple select. Consider using a disabled option instead."
        );
      }

      if (!children) {
        validator.warn(
          "NativeSelect has no children. Consider providing option elements."
        );
      }
    }, [variant, size, error, success, placeholder, multiple, children]);

    // Get color-specific styles for options dropdown
    const getColorStyles = () => {
      const colorMap: Record<
        string,
        {
          border: string;
          borderDark: string;
          bg: string;
          bgDark: string;
          hover: string;
          hoverDark: string;
          selected: string;
          selectedDark: string;
          text: string;
          textDark: string;
        }
      > = {
        default: {
          border: "#d1d5db",
          borderDark: "#4b5563",
          bg: "#ffffff",
          bgDark: "#1f2937",
          hover: "#f3f4f6",
          hoverDark: "#374151",
          selected: "#e5e7eb",
          selectedDark: "#4b5563",
          text: "#1f2937",
          textDark: "#e5e7eb",
        },
        bordered: {
          border: "#9ca3af",
          borderDark: "#6b7280",
          bg: "transparent",
          bgDark: "#1f2937",
          hover: "#f9fafb",
          hoverDark: "#374151",
          selected: "#f3f4f6",
          selectedDark: "#4b5563",
          text: "#1f2937",
          textDark: "#e5e7eb",
        },
        filled: {
          border: "#e5e7eb",
          borderDark: "#374151",
          bg: "#f9fafb",
          bgDark: "#111827",
          hover: "#f3f4f6",
          hoverDark: "#1f2937",
          selected: "#e5e7eb",
          selectedDark: "#374151",
          text: "#1f2937",
          textDark: "#e5e7eb",
        },
        ghost: {
          border: "transparent",
          borderDark: "transparent",
          bg: "transparent",
          bgDark: "#1f2937",
          hover: "#f9fafb",
          hoverDark: "#374151",
          selected: "#f3f4f6",
          selectedDark: "#4b5563",
          text: "#1f2937",
          textDark: "#e5e7eb",
        },
        primary: {
          border: "#93c5fd",
          borderDark: "#3b82f6",
          bg: "#eff6ff",
          bgDark: "#1e3a8a",
          hover: "#dbeafe",
          hoverDark: "#1e40af",
          selected: "#3b82f6",
          selectedDark: "#2563eb",
          text: "#1e40af",
          textDark: "#93c5fd",
        },
        secondary: {
          border: "#d8b4fe",
          borderDark: "#a855f7",
          bg: "#faf5ff",
          bgDark: "#581c87",
          hover: "#f3e8ff",
          hoverDark: "#6b21a8",
          selected: "#a855f7",
          selectedDark: "#9333ea",
          text: "#7e22ce",
          textDark: "#d8b4fe",
        },
        success: {
          border: "#86efac",
          borderDark: "#22c55e",
          bg: "#f0fdf4",
          bgDark: "#14532d",
          hover: "#dcfce7",
          hoverDark: "#15803d",
          selected: "#22c55e",
          selectedDark: "#16a34a",
          text: "#15803d",
          textDark: "#86efac",
        },
        warning: {
          border: "#fde047",
          borderDark: "#eab308",
          bg: "#fefce8",
          bgDark: "#713f12",
          hover: "#fef9c3",
          hoverDark: "#854d0e",
          selected: "#eab308",
          selectedDark: "#ca8a04",
          text: "#a16207",
          textDark: "#fde047",
        },
        danger: {
          border: "#fca5a5",
          borderDark: "#ef4444",
          bg: "#fef2f2",
          bgDark: "#7f1d1d",
          hover: "#fee2e2",
          hoverDark: "#991b1b",
          selected: "#ef4444",
          selectedDark: "#dc2626",
          text: "#b91c1c",
          textDark: "#fca5a5",
        },
        info: {
          border: "#7dd3fc",
          borderDark: "#0ea5e9",
          bg: "#f0f9ff",
          bgDark: "#0c4a6e",
          hover: "#e0f2fe",
          hoverDark: "#075985",
          selected: "#0ea5e9",
          selectedDark: "#0284c7",
          text: "#0369a1",
          textDark: "#7dd3fc",
        },
        purple: {
          border: "#d8b4fe",
          borderDark: "#a855f7",
          bg: "#faf5ff",
          bgDark: "#581c87",
          hover: "#f3e8ff",
          hoverDark: "#6b21a8",
          selected: "#a855f7",
          selectedDark: "#9333ea",
          text: "#7e22ce",
          textDark: "#d8b4fe",
        },
        pink: {
          border: "#f9a8d4",
          borderDark: "#ec4899",
          bg: "#fdf2f8",
          bgDark: "#831843",
          hover: "#fce7f3",
          hoverDark: "#9f1239",
          selected: "#ec4899",
          selectedDark: "#db2777",
          text: "#be185d",
          textDark: "#f9a8d4",
        },
        indigo: {
          border: "#a5b4fc",
          borderDark: "#6366f1",
          bg: "#eef2ff",
          bgDark: "#312e81",
          hover: "#e0e7ff",
          hoverDark: "#3730a3",
          selected: "#6366f1",
          selectedDark: "#4f46e5",
          text: "#4338ca",
          textDark: "#a5b4fc",
        },
        cyan: {
          border: "#67e8f9",
          borderDark: "#06b6d4",
          bg: "#ecfeff",
          bgDark: "#164e63",
          hover: "#cffafe",
          hoverDark: "#155e75",
          selected: "#06b6d4",
          selectedDark: "#0891b2",
          text: "#0e7490",
          textDark: "#67e8f9",
        },
        teal: {
          border: "#5eead4",
          borderDark: "#14b8a6",
          bg: "#f0fdfa",
          bgDark: "#134e4a",
          hover: "#ccfbf1",
          hoverDark: "#115e59",
          selected: "#14b8a6",
          selectedDark: "#0d9488",
          text: "#0f766e",
          textDark: "#5eead4",
        },
        orange: {
          border: "#fdba74",
          borderDark: "#f97316",
          bg: "#fff7ed",
          bgDark: "#7c2d12",
          hover: "#ffedd5",
          hoverDark: "#9a3412",
          selected: "#f97316",
          selectedDark: "#ea580c",
          text: "#c2410c",
          textDark: "#fdba74",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.2)",
          borderDark: "rgba(255, 255, 255, 0.2)",
          bg: "rgba(255, 255, 255, 0.1)",
          bgDark: "rgba(0, 0, 0, 0.1)",
          hover: "rgba(255, 255, 255, 0.2)",
          hoverDark: "rgba(255, 255, 255, 0.15)",
          selected: "rgba(255, 255, 255, 0.3)",
          selectedDark: "rgba(255, 255, 255, 0.2)",
          text: "#111827",
          textDark: "#ffffff",
        },
      };

      return colorMap[variant] || colorMap.default;
    };

    const colors = getColorStyles();

    return (
      <div className="relative">
        <style>
          {`
            /* Dropdown container styling */
            select.native-select-${variant} {
              scrollbar-width: thin;
              scrollbar-color: ${colors.border} transparent;
            }
            
            select.native-select-${variant}::-webkit-scrollbar {
              width: 8px;
            }
            
            select.native-select-${variant}::-webkit-scrollbar-track {
              background: transparent;
            }
            
            select.native-select-${variant}::-webkit-scrollbar-thumb {
              background-color: ${colors.border};
              border-radius: 4px;
            }

            /* Option styling */
            select.native-select-${variant} option {
              padding: 0.625rem 0.875rem;
              font-weight: 500;
              background: linear-gradient(135deg, ${colors.bg} 0%, rgba(255,255,255,0.8) 100%);
              color: ${colors.text};
              border-bottom: 1px solid ${colors.border};
              cursor: pointer;
              transition: all 0.2s ease;
            }

            /* Option hover effect - Beautiful gradient animation */
            select.native-select-${variant} option:hover {
              background: linear-gradient(90deg, ${colors.selected}30 0%, ${colors.hover} 60%, ${colors.bg} 100%);
              color: ${colors.selected};
              border-left: 3px solid ${colors.selected};
              padding-left: calc(0.875rem - 3px);
              font-weight: 600;
              box-shadow: inset 0 0 12px ${colors.selected}30, 0 2px 4px ${colors.selected}20;
            }

            /* Selected/Checked option */
            select.native-select-${variant} option:checked,
            select.native-select-${variant} option:focus {
              background: linear-gradient(135deg, ${colors.selected} 0%, ${colors.selectedDark} 100%) !important;
              color: white !important;
              font-weight: 600;
              border-left: 4px solid ${colors.selectedDark};
              padding-left: calc(0.875rem - 4px);
              box-shadow: inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0 1px ${colors.selected}40;
            }

            /* Dark mode */
            @media (prefers-color-scheme: dark) {
              select.native-select-${variant}::-webkit-scrollbar-thumb {
                background-color: ${colors.borderDark};
              }

              select.native-select-${variant} option {
                background: linear-gradient(135deg, ${colors.bgDark} 0%, rgba(0,0,0,0.4) 100%);
                color: ${colors.textDark};
                border-bottom: 1px solid ${colors.borderDark};
              }

              select.native-select-${variant} option:hover {
                background: linear-gradient(90deg, ${colors.selectedDark}40 0%, ${colors.hoverDark} 60%, ${colors.bgDark} 100%);
                color: ${colors.selectedDark};
                border-left: 3px solid ${colors.selectedDark};
                padding-left: calc(0.875rem - 3px);
                font-weight: 600;
                box-shadow: inset 0 0 12px ${colors.selectedDark}40, 0 2px 4px ${colors.selectedDark}25;
              }

              select.native-select-${variant} option:checked,
              select.native-select-${variant} option:focus {
                background: linear-gradient(135deg, ${colors.selectedDark} 70%, ${colors.selected} 100%) !important;
                color: white !important;
                border-left: 4px solid ${colors.selected};
                padding-left: calc(0.875rem - 4px);
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px ${colors.selectedDark}50;
              }
            }

            /* Optgroup styling */
            select.native-select-${variant} optgroup {
              font-weight: 700;
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: ${colors.text};
              background: linear-gradient(to right, ${colors.bg} 0%, ${colors.hover} 100%);
              padding: 0.5rem 0.875rem;
              border-top: 2px solid ${colors.border};
              border-bottom: 1px solid ${colors.border};
            }

            @media (prefers-color-scheme: dark) {
              select.native-select-${variant} optgroup {
                color: ${colors.textDark};
                background: linear-gradient(to right, ${colors.bgDark} 0%, ${colors.hoverDark} 100%);
                border-top: 2px solid ${colors.borderDark};
                border-bottom: 1px solid ${colors.borderDark};
              }
            }
          `}
        </style>
        <select
          ref={ref}
          disabled={disabled}
          multiple={multiple}
          size={multiple && visibleOptions ? visibleOptions : undefined}
          className={cn(
            nativeSelectVariants({
              variant,
              size,
              error,
              success,
              disabled,
            }),
            multiple && "pr-3",
            `native-select-${variant}`,
            className
          )}
          {...props}
        >
          {placeholder && !multiple && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        {!multiple && (
          <div className={nativeSelectIconVariants()}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

NativeSelect.displayName = "NativeSelect";

// ===========================
// NativeSelectOption Component
// ===========================

/**
 * NativeSelectOption - Option element for NativeSelect
 */
export const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  NativeSelectOptionProps
>(({ children, value, className, ...props }, ref) => {
  return (
    <option
      ref={ref}
      value={value}
      className={cn(nativeSelectOptionVariants(), className)}
      {...props}
    >
      {children}
    </option>
  );
});

NativeSelectOption.displayName = "NativeSelectOption";

// ===========================
// NativeSelectGroup Component
// ===========================

/**
 * NativeSelectGroup - Option group for NativeSelect
 *
 * Groups related options together with a label.
 *
 * @example
 * ```tsx
 * <NativeSelect>
 *   <NativeSelectGroup label="Fruits">
 *     <NativeSelectOption value="apple">Apple</NativeSelectOption>
 *     <NativeSelectOption value="banana">Banana</NativeSelectOption>
 *   </NativeSelectGroup>
 *   <NativeSelectGroup label="Vegetables">
 *     <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
 *   </NativeSelectGroup>
 * </NativeSelect>
 * ```
 */
export const NativeSelectGroup = React.forwardRef<
  HTMLOptGroupElement,
  NativeSelectGroupProps
>(({ children, label, className, ...props }, ref) => {
  return (
    <optgroup
      ref={ref}
      label={label}
      className={cn(nativeSelectGroupVariants(), className)}
      {...props}
    >
      {children}
    </optgroup>
  );
});

NativeSelectGroup.displayName = "NativeSelectGroup";

// ===========================
// NativeSelectWrapper Component
// ===========================

/**
 * NativeSelectWrapper - Container for NativeSelect with label and description
 *
 * Provides a wrapper for the select with proper spacing for labels, descriptions, and errors.
 *
 * @example
 * ```tsx
 * <NativeSelectWrapper>
 *   <NativeSelectLabel required>Country</NativeSelectLabel>
 *   <NativeSelect>
 *     <NativeSelectOption value="">Select country</NativeSelectOption>
 *     <NativeSelectOption value="us">United States</NativeSelectOption>
 *   </NativeSelect>
 *   <NativeSelectDescription>Choose your country</NativeSelectDescription>
 * </NativeSelectWrapper>
 * ```
 */
export const NativeSelectWrapper = React.forwardRef<
  HTMLDivElement,
  NativeSelectWrapperProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(nativeSelectWrapperVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
});

NativeSelectWrapper.displayName = "NativeSelectWrapper";

// ===========================
// NativeSelectLabel Component
// ===========================

/**
 * NativeSelectLabel - Label for NativeSelect
 *
 * Displays a label above the select with optional required indicator.
 */
export const NativeSelectLabel = React.forwardRef<
  HTMLLabelElement,
  NativeSelectLabelProps
>(({ children, required = false, className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(nativeSelectLabelVariants(), className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

NativeSelectLabel.displayName = "NativeSelectLabel";

// ===========================
// NativeSelectDescription Component
// ===========================

/**
 * NativeSelectDescription - Description text for NativeSelect
 *
 * Displays helper text below the select.
 */
export const NativeSelectDescription = React.forwardRef<
  HTMLParagraphElement,
  NativeSelectDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(nativeSelectDescriptionVariants(), className)}
      {...props}
    >
      {children}
    </p>
  );
});

NativeSelectDescription.displayName = "NativeSelectDescription";

// ===========================
// NativeSelectError Component
// ===========================

/**
 * NativeSelectError - Error message for NativeSelect
 *
 * Displays error text below the select with error styling.
 */
export const NativeSelectError = React.forwardRef<
  HTMLParagraphElement,
  NativeSelectErrorProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(nativeSelectErrorVariants(), className)}
      role="alert"
      {...props}
    >
      {children}
    </p>
  );
});

NativeSelectError.displayName = "NativeSelectError";

// Default export
export default NativeSelect;
