import { useState, useCallback, useEffect } from "react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../lib/validation";

/**
 * Props for the useAccordion hook
 */
export interface UseAccordionProps {
  /**
   * Type of accordion: single item or multiple items can be open
   * @default "single"
   */
  type?: "single" | "multiple";

  /**
   * Controlled value for the accordion
   */
  value?: string | string[];

  /**
   * Default value for uncontrolled accordion
   */
  defaultValue?: string | string[];

  /**
   * Callback when accordion value changes
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Whether the accordion item can be collapsed
   * @default false
   */
  collapsible?: boolean;

  /**
   * Accordion variant for styling
   */
  variant?: "default" | "controlled" | "allopen" | "toggle" | "firstopen" | "glass";

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Children elements (for validation)
   */
  children?: React.ReactNode;
}

/**
 * Return type for the useAccordion hook
 */
export interface UseAccordionReturn {
  /**
   * Current value of the accordion
   */
  value: string | string[];

  /**
   * Handler to change accordion value
   */
  handleValueChange: (itemValue: string) => void;

  /**
   * Check if an item is open
   */
  isItemOpen: (itemValue: string) => boolean;

  /**
   * Type of accordion
   */
  type: "single" | "multiple";

  /**
   * Whether items can be collapsed
   */
  collapsible: boolean;
}

/**
 * Custom hook for managing Accordion state and behavior
 *
 * This hook handles both controlled and uncontrolled accordion state,
 * supporting single and multiple expansion modes with optional collapsible behavior.
 *
 * @example
 * ```tsx
 * const { value, handleValueChange, isItemOpen } = useAccordion({
 *   type: "single",
 *   defaultValue: "item-1",
 *   collapsible: true
 * });
 * ```
 */
export function useAccordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
}: UseAccordionProps = {}): UseAccordionReturn {
  // Initialize uncontrolled state
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () => {
      if (defaultValue !== undefined) return defaultValue;
      return type === "multiple" ? [] : "";
    }
  );

  // Determine if controlled or uncontrolled
  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  /**
   * Handle value change for accordion items
   * Supports both single and multiple expansion modes
   */
  const handleValueChange = useCallback(
    (itemValue: string) => {
      let newValue: string | string[];

      if (type === "multiple") {
        // Multiple mode: toggle item in array
        const currentValue = Array.isArray(value) ? value : [];
        if (currentValue.includes(itemValue)) {
          newValue = currentValue.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentValue, itemValue];
        }
      } else {
        // Single mode: toggle or replace
        if (collapsible && value === itemValue) {
          newValue = "";
        } else {
          newValue = itemValue;
        }
      }

      // Call user's onChange handler
      if (onValueChange) {
        onValueChange(newValue);
      }

      // Update uncontrolled state if not controlled
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
    },
    [type, value, collapsible, onValueChange, controlledValue]
  );

  /**
   * Check if a specific item is open
   */
  const isItemOpen = useCallback(
    (itemValue: string) => {
      if (type === "multiple") {
        return Array.isArray(value) && value.includes(itemValue);
      }
      return value === itemValue;
    },
    [type, value]
  );

  return {
    value,
    handleValueChange,
    isItemOpen,
    type,
    collapsible,
  };
}
