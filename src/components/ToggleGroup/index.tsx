import * as React from "react";
import { cn } from "../../lib/utils";
import {
  toggleGroupVariants,
  toggleGroupItemVariants,
} from "./ToggleGroup.styles";
import type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupContextValue,
} from "./ToggleGroup.types";

// ============================================================================
// CONTEXT
// ============================================================================

const ToggleGroupContext = React.createContext<
  ToggleGroupContextValue | undefined
>(undefined);

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      "ToggleGroupItem must be used within a ToggleGroup component"
    );
  }
  return context;
}

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
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right">Right</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Multiple selection (checkbox behavior)
 * <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
 *   <ToggleGroupItem value="bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">I</ToggleGroupItem>
 *   <ToggleGroupItem value="underline">U</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // With spacing and orientation
 * <ToggleGroup
 *   type="single"
 *   variant="primary"
 *   spacing={0}
 *   orientation="vertical"
 * >
 *   <ToggleGroupItem value="top">Top</ToggleGroupItem>
 *   <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
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

    // Context value
    const contextValue: ToggleGroupContextValue = React.useMemo(
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

    return (
      <div
        ref={ref}
        role={type === "single" ? "radiogroup" : "group"}
        aria-orientation={orientation}
        className={cn(
          toggleGroupVariants({ variant, orientation, spacing }),
          className
        )}
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
// TOGGLE GROUP ITEM COMPONENT
// ============================================================================

/**
 * ToggleGroupItem Component
 *
 * Individual toggle button within a ToggleGroup.
 * Must be used as a child of ToggleGroup.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="option1">
 *   Option 1
 * </ToggleGroupItem>
 *
 * // With icon
 * <ToggleGroupItem value="bold">
 *   <Bold className="h-4 w-4" />
 * </ToggleGroupItem>
 *
 * // Disabled item
 * <ToggleGroupItem value="disabled" disabled>
 *   Disabled
 * </ToggleGroupItem>
 * ```
 */
export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(
  (
    {
      className,
      value,
      disabled: itemDisabled = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = useToggleGroupContext();
    const {
      type,
      value: groupValue,
      onValueChange,
      variant,
      size,
      spacing,
      orientation,
      disabled: groupDisabled,
    } = context;

    const disabled = groupDisabled || itemDisabled;

    // Determine if this item is selected
    const isSelected = React.useMemo(() => {
      if (groupValue === undefined) return false;
      if (type === "single") {
        return groupValue === value;
      } else {
        return Array.isArray(groupValue) && groupValue.includes(value);
      }
    }, [type, groupValue, value]);

    // Handle click
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (type === "single") {
        // For single selection, allow deselection by clicking the same item
        const newValue = isSelected ? undefined : value;
        onValueChange(newValue as string);
      } else {
        // For multiple selection
        const currentValues = Array.isArray(groupValue) ? groupValue : [];
        const newValues = isSelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        onValueChange(newValues);
      }

      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        role={type === "single" ? "radio" : "checkbox"}
        aria-checked={isSelected}
        aria-pressed={isSelected}
        data-state={isSelected ? "on" : "off"}
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        data-orientation={orientation}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          toggleGroupItemVariants({ variant, size, spacing, orientation }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

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
