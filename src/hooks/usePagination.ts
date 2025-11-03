import { useState, useMemo, useCallback } from "react";

/**
 * usePagination - Manage pagination state and calculations
 * @param options - Pagination options
 * @returns Pagination state and control functions
 */

export interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  pageNumbers: number[];
}

export function usePagination(options: UsePaginationOptions): PaginationState {
  const {
    totalItems,
    itemsPerPage: initialItemsPerPage = 10,
    initialPage = 1,
  } = options;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPageState] =
    useState<number>(initialItemsPerPage);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + itemsPerPage, totalItems),
    [startIndex, itemsPerPage, totalItems]
  );

  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages]
  );

  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const setItemsPerPage = useCallback((items: number) => {
    setItemsPerPageState(items);
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
    setItemsPerPage,
    pageNumbers,
  };
}
