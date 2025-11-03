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
  options: UseFetchOptions = {}
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
      abortControllerRef.current.abort();
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
      if (err instanceof Error && err.name === "AbortError") {
        // Request was cancelled, don't update state
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
        abortControllerRef.current.abort();
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
