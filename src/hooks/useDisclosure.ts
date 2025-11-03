import { useState, useCallback } from "react";

/**
 * useDisclosure - Manage open/close state for modals, dropdowns, etc.
 * @param initialState - Initial open state
 * @returns Open state and control functions
 */

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
}

export function useDisclosure(
  initialState: boolean = false
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}
