import { useState, useCallback } from "react";

/**
 * useValidation - Form validation hook
 * @param rules - Validation rules object
 * @returns Validation state and validate function
 */

export interface ValidationRule<T> {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  custom?: (value: T) => string | boolean;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface UseValidationOptions {
  mode?: "onChange" | "onBlur" | "onSubmit";
  reValidateMode?: "onChange" | "onBlur";
}

export function useValidation<T extends Record<string, any>>(
  rules: ValidationRules<T>,
  _options: UseValidationOptions = {}
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (name: keyof T, value: any): string => {
      const fieldRules = rules[name];
      if (!fieldRules) return "";

      // Required validation
      if (fieldRules.required) {
        if (!value || (typeof value === "string" && !value.trim())) {
          return typeof fieldRules.required === "string"
            ? fieldRules.required
            : `${String(name)} is required`;
        }
      }

      // String validations
      if (typeof value === "string") {
        if (fieldRules.minLength && value.length < fieldRules.minLength.value) {
          return fieldRules.minLength.message;
        }

        if (fieldRules.maxLength && value.length > fieldRules.maxLength.value) {
          return fieldRules.maxLength.message;
        }

        if (fieldRules.pattern && !fieldRules.pattern.value.test(value)) {
          return fieldRules.pattern.message;
        }
      }

      // Custom validation
      if (fieldRules.custom) {
        const result = fieldRules.custom(value);
        if (typeof result === "string") return result;
        if (result === false) return `${String(name)} is invalid`;
      }

      return "";
    },
    [rules]
  );

  const validate = useCallback(
    (values: T): ValidationResult => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      Object.keys(rules).forEach((key) => {
        const error = validateField(key as keyof T, values[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return { isValid, errors: newErrors };
    },
    [rules, validateField]
  );

  const validateSingle = useCallback(
    (name: keyof T, value: any) => {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return error === "";
    },
    [validateField]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((name: keyof T) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name as string];
      return next;
    });
  }, []);

  const setTouchedField = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  return {
    errors,
    touched,
    validate,
    validateSingle,
    clearErrors,
    clearError,
    setTouchedField,
  };
}
