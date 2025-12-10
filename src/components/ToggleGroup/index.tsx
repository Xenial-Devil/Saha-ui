"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  toggleGroupVariants,
  toggleGroupItemVariants,
} from "./ToggleGroup.styles";
import type { ToggleGroupProps } from "./ToggleGroup.types";
import { ToggleGroupContext } from "../Toggle";

// ============================================================================
// CONTEXT
// ============================================================================

// Use the shared ToggleGroupContext exported from the Toggle component
// Consumers (Toggle) will use the same context instance.

// ============================================================================
// TOGGLE GROUP COMPONENT
// ============================================================================

/**
 * ToggleGroup Component
 *
 * A group of toggle buttons that can be used for single or multiple selection.
 * Supports both controlled and uncontrolled state, with custom spacing and orientation.
 *
 * @example
 * ```tsx
 * // Single selection (radio behavior)
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <Toggle value="left">Left</Toggle>
 *   <Toggle value="center">Center</Toggle>
 *   <Toggle value="right">Right</Toggle>
 * </ToggleGroup>
 *
 * // Multiple selection (checkbox behavior)
 * <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
 *   <Toggle value="bold">B</Toggle>
 *   <Toggle value="italic">I</Toggle>
 *   <Toggle value="underline">U</Toggle>
 * </ToggleGroup>
 *
 * // With spacing and orientation
 * <ToggleGroup
 *   type="single"
 *   variant="primary"
 *   spacing={0}
 *   orientation="vertical"
 * >
 *   <Toggle value="top">Top</Toggle>
 *   <Toggle value="bottom">Bottom</Toggle>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      spacing = 1,
      orientation = "horizontal",
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    // Uncontrolled state
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | string[] | undefined
    >(() => {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return type === "multiple" ? [] : undefined;
    });

    // Determine current value
    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;

    // Handle value change
    const handleValueChange = React.useCallback(
      (newValue: string | string[]) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange]
    );

    // Context value (no strict type here to allow shape compatibility with Toggle's context)
    const contextValue = React.useMemo(
      () => ({
        type,
        value,
        onValueChange: handleValueChange,
        variant,
        size,
        spacing,
        orientation,
        disabled,
      }),
      [
        type,
        value,
        handleValueChange,
        variant,
        size,
        spacing,
        orientation,
        disabled,
      ]
    );

    // Handle numeric or custom string spacing values
    const isTokenSpacing =
      typeof spacing === "number" && [0, 1, 2, 3, 4].includes(spacing);

    const customStyle =
      !isTokenSpacing && spacing !== undefined && spacing !== 0
        ? {
            gap: typeof spacing === "number" ? `${spacing}px` : spacing,
          }
        : undefined;

    return (
      <div
        ref={ref}
        role={type === "single" ? "radiogroup" : "group"}
        aria-orientation={orientation}
        className={cn(
          toggleGroupVariants({
            variant,
            orientation,
            spacing: isTokenSpacing ? (spacing as 0 | 1 | 2 | 3 | 4) : 1,
          }),
          className
        )}
        style={customStyle}
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        data-orientation={orientation}
        {...props}
      >
        <ToggleGroupContext.Provider value={contextValue}>
          {children}
        </ToggleGroupContext.Provider>
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupVariant,
  ToggleGroupSize,
  ToggleGroupSpacing,
  ToggleGroupOrientation,
} from "./ToggleGroup.types";

export { toggleGroupVariants, toggleGroupItemVariants };

// Re-export `Toggle` from the Toggle module so consumers can use `<Toggle>` inside
// `<ToggleGroup>`. Also keep a `ToggleGroupItem` alias for backward compatibility.
export { Toggle } from "../Toggle";
