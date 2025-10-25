/**
 * Component Prop Validation Utilities
 *
 * Provides runtime validation helpers for component props.
 * Only runs in development mode to avoid production overhead.
 */

/**
 * Check if code is running in development mode
 */
export const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Validate that a value is a valid Date object
 */
export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Validate that a value is a valid number
 */
export const isValidNumber = (value: any): value is number => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

/**
 * Validate that a value is a valid string
 */
export const isValidString = (value: any): value is string => {
  return typeof value === "string";
};

/**
 * Validate that a value is a valid boolean
 */
export const isValidBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

/**
 * Validate that a value is a valid array
 */
export const isValidArray = <T = any>(value: any): value is T[] => {
  return Array.isArray(value);
};

/**
 * Validate that a value is a valid object
 */
export const isValidObject = (value: any): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Validate that a value is a valid function
 */
export const isValidFunction = (value: any): value is Function => {
  return typeof value === "function";
};

/**
 * Validate that a value is one of the allowed enum values
 */
export const isValidEnum = <T extends string>(
  value: any,
  allowedValues: readonly T[]
): value is T => {
  return allowedValues.includes(value);
};

/**
 * Component validation helper
 * Logs errors/warnings only in development mode
 */
export class ComponentValidator {
  private componentName: string;

  constructor(componentName: string) {
    this.componentName = componentName;
  }

  /**
   * Log an error message
   */
  error(message: string): void {
    if (isDevelopment) {
      console.error(`[${this.componentName}] ${message}`);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string): void {
    if (isDevelopment) {
      console.warn(`[${this.componentName}] ${message}`);
    }
  }

  /**
   * Validate required prop
   */
  validateRequired(propName: string, value: any): boolean {
    if (value === undefined || value === null) {
      this.error(`Required prop '${propName}' is missing.`);
      return false;
    }
    return true;
  }

  /**
   * Validate prop type
   */
  validateType(
    propName: string,
    value: any,
    expectedType: string,
    validator: (val: any) => boolean
  ): boolean {
    if (value !== undefined && value !== null && !validator(value)) {
      this.error(
        `Invalid prop '${propName}': expected ${expectedType}, got ${typeof value}.`
      );
      return false;
    }
    return true;
  }

  /**
   * Validate enum value
   */
  validateEnum<T extends string>(
    propName: string,
    value: any,
    allowedValues: readonly T[]
  ): boolean {
    if (value !== undefined && !isValidEnum(value, allowedValues)) {
      this.error(
        `Invalid prop '${propName}': must be one of [${allowedValues.join(
          ", "
        )}], got '${value}'.`
      );
      return false;
    }
    return true;
  }

  /**
   * Validate Date prop
   */
  validateDate(propName: string, value: any): boolean {
    if (value !== undefined && value !== null && !isValidDate(value)) {
      this.error(`Invalid prop '${propName}': must be a valid Date object.`);
      return false;
    }
    return true;
  }

  /**
   * Validate array prop
   */
  validateArray(
    propName: string,
    value: any,
    itemValidator?: (item: any) => boolean
  ): boolean {
    if (value !== undefined && value !== null) {
      if (!isValidArray(value)) {
        this.error(`Invalid prop '${propName}': must be an array.`);
        return false;
      }

      if (itemValidator) {
        const invalidItems = value.filter((item) => !itemValidator(item));
        if (invalidItems.length > 0) {
          this.error(
            `Invalid prop '${propName}': contains ${invalidItems.length} invalid item(s).`
          );
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Validate number range
   */
  validateRange(
    propName: string,
    value: number,
    min?: number,
    max?: number
  ): boolean {
    if (value !== undefined && value !== null) {
      if (!isValidNumber(value)) {
        this.error(`Invalid prop '${propName}': must be a valid number.`);
        return false;
      }

      if (min !== undefined && value < min) {
        this.error(
          `Invalid prop '${propName}': must be >= ${min}, got ${value}.`
        );
        return false;
      }

      if (max !== undefined && value > max) {
        this.error(
          `Invalid prop '${propName}': must be <= ${max}, got ${value}.`
        );
        return false;
      }
    }
    return true;
  }

  /**
   * Validate mutually exclusive props
   */
  validateMutuallyExclusive(props: string[], values: any[]): boolean {
    const definedProps = props.filter(
      (_, index) => values[index] !== undefined
    );

    if (definedProps.length > 1) {
      this.error(
        `Mutually exclusive props detected: [${definedProps.join(
          ", "
        )}]. Only one should be defined.`
      );
      return false;
    }
    return true;
  }

  /**
   * Validate conditional prop
   */
  validateConditional(
    propName: string,
    value: any,
    condition: boolean,
    conditionDescription: string
  ): boolean {
    if (!condition && value !== undefined) {
      this.error(
        `Invalid prop '${propName}': should only be used when ${conditionDescription}.`
      );
      return false;
    }

    if (condition && value === undefined) {
      this.warn(
        `Missing prop '${propName}': recommended when ${conditionDescription}.`
      );
      return false;
    }

    return true;
  }

  /**
   * Validate children
   */
  validateChildren(children: any, required: boolean = false): boolean {
    if (required && (children === undefined || children === null)) {
      this.error("Required prop 'children' is missing.");
      return false;
    }
    return true;
  }
}

/**
 * Create a validator instance for a component
 */
export const createValidator = (componentName: string): ComponentValidator => {
  return new ComponentValidator(componentName);
};

/**
 * Validation decorator for props (optional utility)
 */
export const validateProps = (
  componentName: string,
  validationFn: (validator: ComponentValidator, props: any) => void
) => {
  return (props: any) => {
    if (isDevelopment) {
      const validator = createValidator(componentName);
      validationFn(validator, props);
    }
  };
};

/**
 * Common prop validators for reuse
 */
export const commonValidators = {
  /**
   * Validate size prop (common across components)
   */
  size: (validator: ComponentValidator, value: any) => {
    const sizes = ["sm", "md", "lg", "xl"] as const;
    return validator.validateEnum("size", value, sizes);
  },

  /**
   * Validate variant prop (component-specific, pass allowed variants)
   */
  variant: (
    validator: ComponentValidator,
    value: any,
    variants: readonly string[]
  ) => {
    return validator.validateEnum("variant", value, variants);
  },

  /**
   * Validate color prop (common color variants)
   */
  color: (validator: ComponentValidator, value: any) => {
    const colors = [
      "primary",
      "secondary",
      "accent",
      "success",
      "warning",
      "error",
      "info",
    ] as const;
    return validator.validateEnum("color", value, colors);
  },

  /**
   * Validate className prop
   */
  className: (validator: ComponentValidator, value: any) => {
    return validator.validateType("className", value, "string", isValidString);
  },

  /**
   * Validate disabled prop
   */
  disabled: (validator: ComponentValidator, value: any) => {
    return validator.validateType("disabled", value, "boolean", isValidBoolean);
  },
};
