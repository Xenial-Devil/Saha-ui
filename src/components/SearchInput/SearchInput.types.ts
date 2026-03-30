import type { InputProps } from "../Input/Input.types";

/**
 * Props for the SearchInput component
 *
 * Extends all Input props and adds search-specific features.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   onSearch={(query) => console.log(query)}
 *   debounceMs={300}
 * />
 * ```
 */
export interface SearchInputProps extends Omit<InputProps, "type" | "startIcon" | "endIcon" | "size"> {
  /** Size of the input @default "md" */
  size?: "sm" | "md" | "lg";

  /**
   * Callback fired when search is submitted (Enter key or after debounce)
   */
  onSearch?: (query: string) => void;

  /**
   * Callback fired when the clear button is clicked
   */
  onClear?: () => void;

  /**
   * Debounce delay in milliseconds before onSearch fires
   * Set to 0 for no debounce (fires on every keystroke)
   * @default 0
   */
  debounceMs?: number;

  /**
   * Show a loading spinner in the search input
   * @default false
   */
  loading?: boolean;

  /**
   * Show a clear button when input has value
   * @default true
   */
  showClear?: boolean;

  /**
   * Custom search icon element
   */
  searchIcon?: React.ReactNode;

  /**
   * Custom clear icon element
   */
  clearIcon?: React.ReactNode;
}
