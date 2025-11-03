import { useState, useCallback, useEffect } from "react";

/**
 * useAsync - Manage async operations state
 * @param asyncFunction - Async function to execute
 * @returns State and execute function
 */

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T, Args extends any[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const { immediate = false } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const data = await asyncFunction(...args);
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
        return data;
      } catch (error) {
        setState({
          data: null,
          error: error as Error,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
        throw error;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as Args));
    }
  }, [immediate]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, execute, reset };
}
