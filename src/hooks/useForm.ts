import { useState, useCallback } from "react";

/**
 * Form field state interface
 */
export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
}

/**
 * Form state type
 */
export type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

/**
 * Validation rules type
 */
export type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], formValues: T) => string | undefined;
};

/**
 * Form actions interface
 */
export interface UseFormActions<T> {
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: <K extends keyof T>(field: K, error: string) => void;
  setTouched: <K extends keyof T>(field: K, touched: boolean) => void;
  handleChange: <K extends keyof T>(
    field: K
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: <K extends keyof T>(field: K) => () => void;
  validate: () => boolean;
  validateField: <K extends keyof T>(field: K) => boolean;
  reset: () => void;
  setValues: (values: Partial<T>) => void;
}

/**
 * Custom hook for form state management and validation
 * @param initialValues - Initial form values
 * @param validationRules - Validation rules for each field
 * @returns [formState, formActions]
 *
 * @example
 * const [form, { handleChange, handleBlur, validate }] = useForm(
 *   { email: '', password: '' },
 *   {
 *     email: (value) => !value ? 'Required' : undefined,
 *     password: (value) => value.length < 6 ? 'Min 6 chars' : undefined
 *   }
 * );
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): [FormState<T>, UseFormActions<T>] {
  // Initialize form state
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const state = {} as FormState<T>;
    Object.keys(initialValues).forEach((key) => {
      state[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: undefined,
        touched: false,
      };
    });
    return state;
  });

  // Set individual field value
  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  }, []);

  // Set individual field error
  const setError = useCallback(<K extends keyof T>(field: K, error: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], error },
    }));
  }, []);

  // Set individual field touched
  const setTouched = useCallback(
    <K extends keyof T>(field: K, touched: boolean) => {
      setFormState((prev) => ({
        ...prev,
        [field]: { ...prev[field], touched },
      }));
    },
    []
  );

  // Handle input change
  const handleChange = useCallback(
    <K extends keyof T>(field: K) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(field, e.target.value as T[K]);
      },
    [setValue]
  );

  // Handle input blur
  const handleBlur = useCallback(
    <K extends keyof T>(field: K) =>
      () => {
        setTouched(field, true);
        validateField(field);
      },
    [setTouched]
  );

  // Validate single field
  const validateField = useCallback(
    <K extends keyof T>(field: K): boolean => {
      if (!validationRules || !validationRules[field]) return true;

      const formValues = {} as T;
      Object.keys(formState).forEach((key) => {
        formValues[key as keyof T] = formState[key as keyof T].value;
      });

      const error = validationRules[field]!(formState[field].value, formValues);
      setError(field, error || "");
      return !error;
    },
    [formState, validationRules, setError]
  );

  // Validate all fields
  const validate = useCallback((): boolean => {
    if (!validationRules) return true;

    let isValid = true;
    Object.keys(formState).forEach((key) => {
      const fieldKey = key as keyof T;
      setTouched(fieldKey, true);
      const fieldValid = validateField(fieldKey);
      if (!fieldValid) isValid = false;
    });

    return isValid;
  }, [formState, validationRules, validateField, setTouched]);

  // Reset form to initial values
  const reset = useCallback(() => {
    const state = {} as FormState<T>;
    Object.keys(initialValues).forEach((key) => {
      state[key as keyof T] = {
        value: initialValues[key as keyof T],
        error: undefined,
        touched: false,
      };
    });
    setFormState(state);
  }, [initialValues]);

  // Set multiple values at once
  const setValues = useCallback((values: Partial<T>) => {
    setFormState((prev) => {
      const newState = { ...prev };
      Object.keys(values).forEach((key) => {
        const fieldKey = key as keyof T;
        newState[fieldKey] = {
          ...prev[fieldKey],
          value: values[fieldKey]!,
        };
      });
      return newState;
    });
  }, []);

  return [
    formState,
    {
      setValue,
      setError,
      setTouched,
      handleChange,
      handleBlur,
      validate,
      validateField,
      reset,
      setValues,
    },
  ];
}
