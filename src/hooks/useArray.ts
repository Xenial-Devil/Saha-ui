import { useState, useCallback } from "react";

/**
 * Helper functions for array state management
 */
export interface UseArrayActions<T> {
  setValue: (value: T[]) => void;
  add: (item: T) => void;
  push: (item: T) => void;
  removeByIndex: (index: number) => void;
  removeById: (id: any, key?: string) => void;
  clear: () => void;
  updateByIndex: (index: number, item: T) => void;
  updateById: (id: any, item: T, key?: string) => void;
  filter: (callback: (item: T, index: number) => boolean) => void;
  set: (index: number, item: T) => void;
}

/**
 * Custom hook for managing array state with useful helper methods
 * @param initialValue - Initial array value
 * @returns [array, arrayActions]
 *
 * @example
 * const [items, { add, removeByIndex, clear }] = useArray([]);
 * add({ id: 1, name: 'Item 1' });
 * removeByIndex(0);
 * clear();
 */
export function useArray<T = any>(
  initialValue: T[] = []
): [T[], UseArrayActions<T>] {
  const [value, setValue] = useState<T[]>(initialValue);

  const add = useCallback((item: T) => {
    setValue((prev) => [...prev, item]);
  }, []);

  const push = useCallback((item: T) => {
    setValue((prev) => [...prev, item]);
  }, []);

  const removeByIndex = useCallback((index: number) => {
    setValue((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeById = useCallback((id: any, key = "id") => {
    setValue((prev) => prev.filter((item: any) => item[key] !== id));
  }, []);

  const clear = useCallback(() => {
    setValue([]);
  }, []);

  const updateByIndex = useCallback((index: number, item: T) => {
    setValue((prev) =>
      prev.map((prevItem, i) => (i === index ? item : prevItem))
    );
  }, []);

  const updateById = useCallback((id: any, item: T, key = "id") => {
    setValue((prev) =>
      prev.map((prevItem: any) => (prevItem[key] === id ? item : prevItem))
    );
  }, []);

  const filter = useCallback(
    (callback: (item: T, index: number) => boolean) => {
      setValue((prev) => prev.filter(callback));
    },
    []
  );

  const set = useCallback((index: number, item: T) => {
    setValue((prev) => {
      const newArray = [...prev];
      newArray[index] = item;
      return newArray;
    });
  }, []);

  return [
    value,
    {
      setValue,
      add,
      push,
      removeByIndex,
      removeById,
      clear,
      updateByIndex,
      updateById,
      filter,
      set,
    },
  ];
}
