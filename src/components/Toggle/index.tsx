"use client";
import * as React from "react";
import { cn } from "../../lib/utils";
import { toggleVariants, toggleGroupVariants } from "./Toggle.styles";
import type {
  ToggleProps,
  ToggleGroupProps,
  ToggleVariant,
  ToggleSize,
} from "./Toggle.types";

// ============================================================================
// CONTEXT
// ============================================================================

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[] | undefined;
  onValueChange: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<
  ToggleGroupContextValue | undefined
>(undefined);

function useToggleGroup() {
  return React.useContext(ToggleGroupContext);
}

// ============================================================================
// TOGGLE COMPONENT
// ============================================================================

/**
 * Toggle Component
 *
 * A button that can be toggled between on and off states.
 * Features multiple variants, sizes, and support for icons and badges.
 *
 * @example
 * ```tsx
 * // Compact API
 * <Toggle pressed={bold} onPressedChange={setBold}>
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // With variants
 * <Toggle variant="primary" size="lg">
 *   Toggle me
 * </Toggle>
 * ```
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      disabled = false,
      children,
      value,
      ...props
    },
    ref
  ) => {
    const groupContext = useToggleGroup();
    const [uncontrolledPressed, setUncontrolledPressed] =
      React.useState(defaultPressed);

    // Determine if this toggle is part of a group
    const inGroup = groupContext !== undefined;

    // Determine pressed state
    let isPressed: boolean;
    if (inGroup && value !== undefined) {
      if (groupContext.type === "single") {
        isPressed = groupContext.value === value;
      } else {
        isPressed = Array.isArray(groupContext.value)
          ? groupContext.value.includes(value)
          : false;
      }
    } else {
      isPressed =
        controlledPressed !== undefined
          ? controlledPressed
          : uncontrolledPressed;
    }

    // Handle toggle click
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || (inGroup && groupContext.disabled)) {
        return;
      }

      if (inGroup && value !== undefined) {
        // Group mode
        if (groupContext.type === "single") {
          groupContext.onValueChange(isPressed ? "" : value);
        } else {
          const currentValues = Array.isArray(groupContext.value)
            ? groupContext.value
            : [];
          const newValues = isPressed
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
          groupContext.onValueChange(newValues);
        }
      } else {
        // Standalone mode
        const newPressed = !isPressed;
        if (controlledPressed === undefined) {
          setUncontrolledPressed(newPressed);
        }
        onPressedChange?.(newPressed);
      }

      props.onClick?.(event);
    };

    const effectiveVariant = inGroup
      ? groupContext.variant || variant
      : variant;
    const effectiveSize = inGroup ? groupContext.size || size : size;
    const effectiveDisabled = disabled || (inGroup && groupContext.disabled);

    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        data-slot="toggle"
        disabled={effectiveDisabled}
        className={cn(
          toggleVariants({
            variant: effectiveVariant,
            size: effectiveSize,
          }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

// ============================================================================
// TOGGLE GROUP COMPONENT
// ============================================================================

/**
 * ToggleGroup Component
 *
 * Groups multiple Toggle components together with shared state management.
 * Supports single selection (like radio) or multiple selection (like checkbox).
 *
 * @example
 * ```tsx
 * // Single selection
 * <ToggleGroup type="single" value={align} onValueChange={setAlign}>
 *   <Toggle value="left"><AlignLeft /></Toggle>
 *   <Toggle value="center"><AlignCenter /></Toggle>
 *   <Toggle value="right"><AlignRight /></Toggle>
 * </ToggleGroup>
 *
 * // Multiple selection
 * <ToggleGroup type="multiple" value={styles} onValueChange={setStyles}>
 *   <Toggle value="bold"><Bold /></Toggle>
 *   <Toggle value="italic"><Italic /></Toggle>
 *   <Toggle value="underline"><Underline /></Toggle>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      type = "single",
      value,
      defaultValue,
      onValueChange,
      variant,
      size,
      disabled = false,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | string[]
    >(defaultValue || (type === "single" ? "" : ([] as string[])));

    const effectiveValue = value !== undefined ? value : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (newValue: string | string[]) => {
        if (value === undefined) {
          setUncontrolledValue(newValue);
        }
        if (onValueChange) {
          onValueChange(newValue as any);
        }
      },
      [value, onValueChange]
    );

    const contextValue: ToggleGroupContextValue = React.useMemo(
      () => ({
        type,
        value: effectiveValue,
        onValueChange: handleValueChange,
        variant,
        size,
        disabled,
      }),
      [type, effectiveValue, handleValueChange, variant, size, disabled]
    );

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="group"
          data-slot="toggle-group"
          className={cn(toggleGroupVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

// ============================================================================
// EXPORTS
// ============================================================================

export type { ToggleProps, ToggleGroupProps, ToggleVariant, ToggleSize };
export { toggleVariants, toggleGroupVariants };
