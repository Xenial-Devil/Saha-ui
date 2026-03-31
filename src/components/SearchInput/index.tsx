"use client";

import React, { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import type { SearchInputProps } from "./SearchInput.types";
import { clearButtonVariants, searchIconVariants } from "./SearchInput.styles";

/**
 * Default search icon (magnifying glass)
 * @private
 */
const DefaultSearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

/**
 * Default clear icon (X)
 * @private
 */
const DefaultClearIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

/**
 * Loading spinner
 * @private
 */
const SearchSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * SearchInput Component
 *
 * A search input field with built-in search icon, clear button,
 * optional debounce, and loading state.
 *
 * @component
 * @example
 * // Basic search
 * <SearchInput placeholder="Search..." onSearch={(q) => console.log(q)} />
 *
 * @example
 * // With debounce
 * <SearchInput debounceMs={300} onSearch={handleSearch} />
 *
 * @example
 * // With loading state
 * <SearchInput loading onSearch={handleSearch} />
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      onClear,
      debounceMs = 0,
      loading = false,
      showClear = true,
      searchIcon,
      clearIcon,
      size = "md",
      value,
      defaultValue,
      onChange,
      onKeyDown,
      className,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      () => (defaultValue as string) || ""
    );
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : internalValue;

    // Cleanup debounce timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const fireSearch = useCallback(
      (query: string) => {
        if (debounceMs > 0) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          debounceTimerRef.current = setTimeout(() => {
            onSearch?.(query);
          }, debounceMs);
        } else {
          onSearch?.(query);
        }
      },
      [debounceMs, onSearch]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(e);
        fireSearch(newValue);
      },
      [isControlled, onChange, fireSearch]
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
      onSearch?.("");
    }, [isControlled, onClear, onSearch]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          onSearch?.(currentValue);
        }
        if (e.key === "Escape" && currentValue) {
          handleClear();
        }
        onKeyDown?.(e);
      },
      [currentValue, onSearch, handleClear, onKeyDown]
    );

    const hasValue = currentValue.length > 0;

    const startIconElement = searchIcon || (
      <DefaultSearchIcon className={searchIconVariants({ size })} />
    );

    const endIconElement = loading ? (
      <SearchSpinner className={clearButtonVariants({ size })} />
    ) : hasValue && showClear ? (
      <button
        type="button"
        onClick={handleClear}
        className={clearButtonVariants({ size })}
        aria-label="Clear search"
        tabIndex={-1}
      >
        {clearIcon || <DefaultClearIcon className="h-full w-full" />}
      </button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type="search"
        size={size}
        startIcon={startIconElement}
        endIcon={endIconElement}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          // Remove native search input clear button
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
          className
        )}
        aria-label={props["aria-label"] || "Search"}
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
