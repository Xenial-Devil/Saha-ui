import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useFetch - Fetch data from an API with loading and error states
 * @param url - URL to fetch from
 * @param options - Fetch options
 * @returns Data, loading, error, and refetch function
 */

export interface UseFetchOptions extends RequestInit {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  // Accept unknown so callers can receive whatever the runtime throws (Error or plain objects)
  onError?: (error: unknown) => void;
}

export interface UseFetchResult<T> {
  data: T | null;
  // Error may be an Error instance or an arbitrary thrown value (extensions may throw plain objects)
  error: unknown | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const { immediate = true, onSuccess, onError, ...fetchOptions } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (err) {
        // Suppress abort errors
        console.debug("Abort error suppressed:", err);
      }
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setIsSuccess(true);
      setIsError(false);
      setError(null);
      onSuccess?.(result);
    } catch (err) {
      // Handle AbortError or cancelation errors
      if (err instanceof Error && err.name === "AbortError") {
        // Request was cancelled, don't update state
        return;
      }

      // Note: don't special-case non-Error thrown values here. Callers receive
      // the original thrown value via onError so they can decide how to handle it.

      // Preserve the original thrown value when possible. If it's not an Error instance,
      // keep the raw value so callers (and tests) can inspect extension/browser-provided objects.
      const reportedError = err instanceof Error ? err : err;
      setError(reportedError);
      setIsError(true);
      setIsSuccess(false);
      setData(null);
      onError?.(reportedError);
    } finally {
      setIsLoading(false);
    }
  }, [url, fetchOptions, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }

    return () => {
      // Cleanup: abort request on unmount
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (err) {
          // Suppress abort errors during cleanup
          console.debug("Cleanup abort error suppressed:", err);
        }
      }
    };
  }, [immediate, fetchData]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch: fetchData,
  };
}
