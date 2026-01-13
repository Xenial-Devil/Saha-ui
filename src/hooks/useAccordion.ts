import { useState, useCallback, useRef, useId, useEffect } from "react";

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
   * Whether the accordion item can be collapsed when type is "single"
   * @default false
   */
  collapsible?: boolean;

  /**
   * Orientation for keyboard navigation
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Loop navigation from last to first item
   * @default false
   */
  loop?: boolean;

  /**
   * Disable the entire accordion
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when any item starts opening
   */
  onOpenStart?: (value: string) => void;

  /**
   * Callback when any item finishes opening
   */
  onOpenEnd?: (value: string) => void;

  /**
   * Callback when any item starts closing
   */
  onCloseStart?: (value: string) => void;

  /**
   * Callback when any item finishes closing
   */
  onCloseEnd?: (value: string) => void;
}

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

  /**
   * Orientation of the accordion
   */
  orientation: "vertical" | "horizontal";

  /**
   * Whether the accordion is disabled
   */
  disabled: boolean;

  /**
   * Register a trigger element for keyboard navigation
   */
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void;

  /**
   * Keyboard event handler
   */
  handleKeyDown: (e: React.KeyboardEvent, currentValue: string) => void;

  /**
   * Generate unique trigger ID for an item
   */
  generateTriggerId: (value: string) => string;

  /**
   * Generate unique content ID for an item
   */
  generateContentId: (value: string) => string;

  /**
   * Get all registered item values in order
   */
  getItemOrder: () => string[];

  /**
   * Focus a specific item trigger
   */
  focusTrigger: (value: string) => void;

  /**
   * Open a specific item programmatically
   */
  openItem: (value: string) => void;

  /**
   * Close a specific item programmatically
   */
  closeItem: (value: string) => void;

  /**
   * Open all items (only for multiple type)
   */
  openAll: () => void;

  /**
   * Close all items
   */
  closeAll: () => void;

  /**
   * Toggle a specific item
   */
  toggleItem: (value: string) => void;
}

/**
 * Custom hook for managing Accordion state and behavior
 */
export function useAccordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
  orientation = "vertical",
  loop = false,
  disabled = false,
  onOpenStart,
  onCloseStart,
}: UseAccordionProps = {}): UseAccordionReturn {
  const baseId = useId();

  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () => {
      if (defaultValue !== undefined) return defaultValue;
      return type === "multiple" ? [] : "";
    }
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const prevValueRef = useRef(value);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const triggerOrder = useRef<string[]>([]);

  // Effect to trigger open/close callbacks
  useEffect(() => {
    const prevValue = prevValueRef.current;
    const currentValue = value;

    if (type === "multiple") {
      const prevArray = Array.isArray(prevValue) ? prevValue : [];
      const currentArray = Array.isArray(currentValue) ? currentValue : [];

      currentArray.forEach((item) => {
        if (!prevArray.includes(item)) {
          onOpenStart?.(item);
        }
      });

      prevArray.forEach((item) => {
        if (!currentArray.includes(item)) {
          onCloseStart?.(item);
        }
      });
    } else {
      if (prevValue !== currentValue) {
        if (currentValue && currentValue !== "") {
          onOpenStart?.(currentValue as string);
        }
        if (prevValue && prevValue !== "") {
          onCloseStart?.(prevValue as string);
        }
      }
    }

    prevValueRef.current = currentValue;
  }, [value, type, onOpenStart, onCloseStart]);

  const registerTrigger = useCallback(
    (itemValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        triggerRefs.current.set(itemValue, element);
        if (!triggerOrder.current.includes(itemValue)) {
          triggerOrder.current.push(itemValue);
        }
      } else {
        triggerRefs.current.delete(itemValue);
        triggerOrder.current = triggerOrder.current.filter(
          (v) => v !== itemValue
        );
      }
    },
    []
  );

  const getItemOrder = useCallback(() => {
    return [...triggerOrder.current];
  }, []);

  const focusTrigger = useCallback((itemValue: string) => {
    const element = triggerRefs.current.get(itemValue);
    element?.focus();
  }, []);

  const updateValue = useCallback(
    (newValue: string | string[]) => {
      onValueChange?.(newValue);

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
    },
    [isControlled, onValueChange]
  );

  const handleValueChange = useCallback(
    (itemValue: string) => {
      if (disabled) return;

      let newValue: string | string[];

      if (type === "multiple") {
        const currentValue = Array.isArray(value) ? value : [];
        if (currentValue.includes(itemValue)) {
          newValue = currentValue.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentValue, itemValue];
        }
      } else {
        if (collapsible && value === itemValue) {
          newValue = "";
        } else {
          newValue = itemValue;
        }
      }

      updateValue(newValue);
    },
    [type, value, collapsible, updateValue, disabled]
  );

  const openItem = useCallback(
    (itemValue: string) => {
      if (disabled) return;

      if (type === "multiple") {
        const currentValue = Array.isArray(value) ? value : [];
        if (!currentValue.includes(itemValue)) {
          updateValue([...currentValue, itemValue]);
        }
      } else {
        updateValue(itemValue);
      }
    },
    [type, value, updateValue, disabled]
  );

  const closeItem = useCallback(
    (itemValue: string) => {
      if (disabled) return;

      if (type === "multiple") {
        const currentValue = Array.isArray(value) ? value : [];
        updateValue(currentValue.filter((v) => v !== itemValue));
      } else if (collapsible && value === itemValue) {
        updateValue("");
      }
    },
    [type, value, collapsible, updateValue, disabled]
  );

  const toggleItem = useCallback(
    (itemValue: string) => {
      handleValueChange(itemValue);
    },
    [handleValueChange]
  );

  const openAll = useCallback(() => {
    if (disabled || type !== "multiple") return;
    updateValue([...triggerOrder.current]);
  }, [type, updateValue, disabled]);

  const closeAll = useCallback(() => {
    if (disabled) return;

    if (type === "multiple") {
      updateValue([]);
    } else if (collapsible) {
      updateValue("");
    }
  }, [type, collapsible, updateValue, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentValue: string) => {
      if (disabled) return;

      const items = triggerOrder.current;
      const currentIndex = items.indexOf(currentValue);

      if (currentIndex === -1) return;

      const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
      const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";

      let nextIndex: number | null = null;

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          nextIndex = currentIndex + 1;
          if (nextIndex >= items.length) {
            nextIndex = loop ? 0 : items.length - 1;
          }
          break;

        case prevKey:
          e.preventDefault();
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? items.length - 1 : 0;
          }
          break;

        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;

        case "End":
          e.preventDefault();
          nextIndex = items.length - 1;
          break;

        case "Enter":
        case " ":
          e.preventDefault();
          handleValueChange(currentValue);
          return;

        default:
          return;
      }

      if (nextIndex !== null && items[nextIndex]) {
        const nextItem = items[nextIndex];
        focusTrigger(nextItem);
      }
    },
    [orientation, loop, handleValueChange, focusTrigger, disabled]
  );

  const isItemOpen = useCallback(
    (itemValue: string) => {
      if (type === "multiple") {
        return Array.isArray(value) && value.includes(itemValue);
      }
      return value === itemValue;
    },
    [type, value]
  );

  const generateTriggerId = useCallback(
    (itemValue: string) => `accordion-trigger-${baseId}-${itemValue}`,
    [baseId]
  );

  const generateContentId = useCallback(
    (itemValue: string) => `accordion-content-${baseId}-${itemValue}`,
    [baseId]
  );

  return {
    value,
    handleValueChange,
    isItemOpen,
    type,
    collapsible,
    orientation,
    disabled,
    registerTrigger,
    handleKeyDown,
    generateTriggerId,
    generateContentId,
    getItemOrder,
    focusTrigger,
    openItem,
    closeItem,
    openAll,
    closeAll,
    toggleItem,
  };
}
