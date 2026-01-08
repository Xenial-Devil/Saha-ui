"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import type { AffixGroupContextValue, AffixGroupProps } from "./Affix.types";

const AffixGroupContext = createContext<AffixGroupContextValue | null>(null);

/**
 * Hook to access Affix group context
 */
export function useAffixGroup(): AffixGroupContextValue | null {
  return useContext(AffixGroupContext);
}

interface AffixElementData {
  priority: number;
  height: number;
  affixed: boolean;
  element: HTMLElement | null;
}

/**
 * AffixGroup Component
 *
 * Coordinates multiple Affix components for proper stacking
 */
export function AffixGroup({
  children,
  id: _id,
  direction = "vertical",
  gap = 0,
  onGroupChange,
}: AffixGroupProps): React.ReactElement {
  const affixedElementsRef = useRef<Map<string, AffixElementData>>(new Map());
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Force re-render of children when stack changes
  const triggerUpdate = useCallback(() => {
    setUpdateTrigger((c) => c + 1);
  }, []);

  const registerAffix = useCallback(
    (
      affixId: string,
      priority: number,
      height: number,
      element?: HTMLElement | null
    ) => {
      const existing = affixedElementsRef.current.get(affixId);

      affixedElementsRef.current.set(affixId, {
        priority,
        height,
        affixed: existing?.affixed ?? false,
        element: element ?? existing?.element ?? null,
      });

      triggerUpdate();
    },
    [triggerUpdate]
  );

  const unregisterAffix = useCallback(
    (affixId: string) => {
      affixedElementsRef.current.delete(affixId);
      triggerUpdate();
    },
    [triggerUpdate]
  );

  const getStackOffset = useCallback(
    (affixId: string): number => {
      const elements = Array.from(affixedElementsRef.current.entries())
        .filter(([, data]) => data.affixed)
        .sort((a, b) => a[1].priority - b[1].priority);

      let offset = 0;
      for (const [currentId, data] of elements) {
        if (currentId === affixId) break;
        offset += data.height + (direction === "vertical" ? gap : 0);
      }

      return offset;
    },
    [gap, direction]
  );

  const getAffixedElements = useCallback(() => {
    return new Map(
      Array.from(affixedElementsRef.current.entries()).map(([id, data]) => [
        id,
        { priority: data.priority, height: data.height },
      ])
    );
  }, []);

  const notifyStateChange = useCallback(
    (affixId: string, affixed: boolean, height?: number) => {
      const element = affixedElementsRef.current.get(affixId);
      if (element) {
        element.affixed = affixed;
        if (height !== undefined) {
          element.height = height;
        }

        triggerUpdate();

        if (onGroupChange) {
          const affixedIds = Array.from(affixedElementsRef.current.entries())
            .filter(([, data]) => data.affixed)
            .map(([id]) => id);
          onGroupChange(affixedIds);
        }
      }
    },
    [onGroupChange, triggerUpdate]
  );

  const contextValue = useMemo<AffixGroupContextValue>(
    () => ({
      registerAffix,
      unregisterAffix,
      getStackOffset,
      getAffixedElements,
      notifyStateChange,
      updateTrigger,
    }),
    [
      registerAffix,
      unregisterAffix,
      getStackOffset,
      getAffixedElements,
      notifyStateChange,
      updateTrigger,
    ]
  );

  return (
    <AffixGroupContext.Provider value={contextValue}>
      {children}
    </AffixGroupContext.Provider>
  );
}

export { AffixGroupContext };
