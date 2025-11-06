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
  onError?: (error: Error) => void;
}

export interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {},
): UseFetchResult<T> {
  const { immediate = true, onSuccess, onError, ...fetchOptions } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
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

      // Check for manual cancelation errors
      if (
        typeof err === "object" &&
        err !== null &&
        "type" in err &&
        (err as any).type === "cancelation"
      ) {
        // Manual cancelation, don't update state
        console.debug("Operation manually canceled");
        return;
      }

      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      setIsError(true);
      setIsSuccess(false);
      setData(null);
      onError?.(error);
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
