import { useState, useMemo, useCallback } from "react";

/**
 * useSearchFilter - Filter and search through a list of items
 * @param items - Array of items to filter
 * @param options - Search options
 * @returns Filtered items and search controls
 */

export interface UseSearchFilterOptions<T> {
  searchKeys?: (keyof T)[];
  filterFn?: (item: T, query: string) => boolean;
  caseSensitive?: boolean;
}

export interface UseSearchFilterReturn<T> {
  filteredItems: T[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  itemCount: number;
  hasResults: boolean;
}

export function useSearchFilter<T>(
  items: T[],
  options: UseSearchFilterOptions<T> = {}
): UseSearchFilterReturn<T> {
  const { searchKeys, filterFn, caseSensitive = false } = options;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();

    return items.filter((item) => {
      if (filterFn) {
        return filterFn(item, query);
      }

      if (searchKeys && searchKeys.length > 0) {
        return searchKeys.some((key) => {
          const value = item[key];
          if (value === null || value === undefined) return false;

          const stringValue = String(value);
          const searchValue = caseSensitive
            ? stringValue
            : stringValue.toLowerCase();

          return searchValue.includes(query);
        });
      }

      return Object.values(item as Record<string, any>).some((value) => {
        if (typeof value === "string") {
          const searchValue = caseSensitive ? value : value.toLowerCase();
          return searchValue.includes(query);
        }
        return false;
      });
    });
  }, [items, searchQuery, searchKeys, filterFn, caseSensitive]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const itemCount = filteredItems.length;
  const hasResults = itemCount > 0;

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
    clearSearch,
    itemCount,
    hasResults,
  };
}
