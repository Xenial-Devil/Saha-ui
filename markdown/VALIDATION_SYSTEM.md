# Validation System Guide

## Overview

The Saha-ui component library includes a comprehensive validation system that provides **both compile-time (TypeScript) and runtime validation** for all components. This ensures developers catch prop errors during development while maintaining zero production overhead.

## Architecture

### 1. Compile-Time Validation (TypeScript)

**Type Safety with Discriminated Unions:**

```typescript
// Example: Calendar component
type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps;

// TypeScript enforces correct props at compile time
<Calendar mode="single" value={new Date()} /> // ✅ Valid
<Calendar mode="single" values={[new Date()]} /> // ❌ Type error
```

**Benefits:**

- Catches errors in IDE before running code
- Autocomplete shows only valid props for each mode
- Refactoring is safer with type checking
- Zero runtime cost

### 2. Runtime Validation (Development-Only)

**Central Validation Module:** `src/lib/validation.ts`

```typescript
import { createValidator } from "../../lib/validation";

const validator = createValidator("ComponentName");
validator.validateRequired("propName", value);
validator.validateEnum("variant", variant, ["primary", "secondary"]);
```

**Benefits:**

- Catches dynamic errors (e.g., invalid dates from API)
- Provides clear, actionable error messages
- Tree-shaken in production builds (zero overhead)
- Consistent validation patterns across components

## Validation Utilities

### Helper Functions

```typescript
// Type checking helpers
isValidDate(value: any): boolean
isValidNumber(value: any): boolean
isValidString(value: any): boolean
isValidBoolean(value: any): boolean
isValidArray(value: any): boolean
isValidObject(value: any): boolean
isValidFunction(value: any): boolean
isValidEnum(value: any, allowedValues: readonly any[]): boolean
```

### ComponentValidator Class

```typescript
class ComponentValidator {
  // Error/warning messages
  error(message: string): void;
  warn(message: string): void;

  // Validation methods
  validateRequired(propName: string, value: any): boolean;
  validateType(
    propName: string,
    value: any,
    expectedType: string,
    validator
  ): boolean;
  validateEnum(
    propName: string,
    value: any,
    allowedValues: readonly any[]
  ): boolean;
  validateDate(propName: string, date: any): boolean;
  validateArray(propName: string, value: any, itemValidator?): boolean;
  validateRange(
    propName: string,
    value: number,
    min: number,
    max: number
  ): boolean;
  validateMutuallyExclusive(
    props: Record<string, any>,
    propNames: string[]
  ): boolean;
  validateConditional(
    condition: boolean,
    propName: string,
    value: any
  ): boolean;
  validateChildren(children: any, allowedTypes?: string[]): boolean;
}
```

### Common Validators

Reusable validators for frequently used prop patterns:

```typescript
import { commonValidators } from "../../lib/validation";

// Size validation
commonValidators.size(validator, size);
// Validates: "sm" | "md" | "lg" | "xl"

// Variant validation
commonValidators.variant(validator, variant);
// Validates: "default" | "outline" | "ghost" | "glass" | "gradient"

// Color validation
commonValidators.color(validator, color);
// Validates: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info"

// Standard props
commonValidators.className(validator, className);
commonValidators.disabled(validator, disabled);
```

## Implementation Patterns

### Pattern 1: Mode-Based Components (Calendar, Select, etc.)

Components with different prop requirements based on mode:

```typescript
// Calendar.types.ts - Compile-time
export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps;

// Calendar/index.tsx - Runtime
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Calendar");

    if (mode === "single") {
      // Reject props from other modes
      if ("values" in props) {
        validator.error(
          "Invalid prop: 'values' should not be used in mode='single'. Use 'value' instead."
        );
      }
      // Validate mode-specific props
      validator.validateDate("value", value);
    }

    if (mode === "multiple") {
      validator.validateArray("values", values, isValidDate);
    }

    if (mode === "range") {
      validator.validateDate("range.from", range?.from);
      validator.validateDate("range.to", range?.to);
    }

    // Common validations
    validator.validateDate("minDate", minDate);
    validator.validateDate("maxDate", maxDate);
  }
}, [mode, value, values, range, minDate, maxDate, props]);
```

### Pattern 2: Input Components (Input, TextArea, etc.)

Standard form input components:

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Input");

    commonValidators.size(validator, size);
    commonValidators.variant(validator, variant);
    commonValidators.disabled(validator, disabled);

    if (type) {
      validator.validateEnum("type", type, [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
      ]);
    }

    if (maxLength !== undefined) {
      validator.validateType("maxLength", maxLength, "number", isValidNumber);
      validator.validateRange("maxLength", maxLength, 0, Infinity);
    }
  }
}, [size, variant, disabled, type, maxLength]);
```

### Pattern 3: Display Components (Badge, Chip, Alert, etc.)

Visual/display components:

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Badge");

    commonValidators.size(validator, size);
    commonValidators.variant(validator, variant);
    commonValidators.color(validator, color);

    if (icon && !isValidObject(icon)) {
      validator.error("Invalid prop: 'icon' must be a React element.");
    }
  }
}, [size, variant, color, icon]);
```

### Pattern 4: Container Components (Accordion, Tab, etc.)

Components that manage children:

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Accordion");

    commonValidators.variant(validator, variant);
    validator.validateChildren(children);

    if (defaultOpen !== undefined) {
      validator.validateArray("defaultOpen", defaultOpen, isValidString);
    }

    if (type) {
      validator.validateEnum("type", type, ["single", "multiple"]);
    }
  }
}, [variant, children, defaultOpen, type]);
```

## Adding Validation to a Component

### Step 1: Enhance TypeScript Types

```typescript
// Component.types.ts

// Use discriminated unions for mutually exclusive props
export type ComponentProps =
  | { mode: "a"; propA: string }
  | { mode: "b"; propB: number };

// Use strict literal types
export type ComponentVariant = "default" | "outline" | "ghost";
export type ComponentSize = "sm" | "md" | "lg";
```

### Step 2: Add Runtime Validation

```typescript
// Component/index.tsx
import { createValidator, commonValidators } from "../../lib/validation";

export const Component = (props: ComponentProps) => {
  // ... destructure props ...

  // Validation effect
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const validator = createValidator("ComponentName");

      // Common validations
      commonValidators.size(validator, size);
      commonValidators.variant(validator, variant);
      commonValidators.color(validator, color);

      // Component-specific validations
      validator.validateRequired("requiredProp", requiredProp);
      validator.validateEnum("customProp", customProp, ["a", "b", "c"]);

      // Conditional validation
      if (mode === "special") {
        validator.validateDate("specialDate", specialDate);
      }
    }
  }, [size, variant, color, requiredProp, customProp, mode, specialDate]);

  // ... component implementation ...
};
```

### Step 3: Test Validation

```typescript
// In your test/example file

// This should show TypeScript errors
<Component mode="a" propB={123} /> // ❌ propB not allowed in mode="a"

// This should show runtime console errors in development
<Component mode="a" propA={null} /> // ❌ propA is required
<Component variant="invalid" /> // ❌ variant must be "default" | "outline" | "ghost"
```

## Validation Checklist

When adding validation to a component:

- [ ] **Types**: Define discriminated unions for mutually exclusive props
- [ ] **Enums**: Use literal types for all fixed value props (variant, size, etc.)
- [ ] **Required**: Validate all required props exist
- [ ] **Type**: Validate prop types (Date, number, string, array, etc.)
- [ ] **Range**: Validate number ranges (min/max)
- [ ] **Mode**: Validate mode-specific props and reject props from other modes
- [ ] **Conditionals**: Validate props that depend on other props
- [ ] **Arrays**: Validate array items match expected types
- [ ] **Objects**: Validate object shapes and required properties
- [ ] **Dependencies**: Add all validated props to useEffect dependencies array
- [ ] **Development**: Wrap in `process.env.NODE_ENV !== "production"` check

## Benefits

### For Users

✅ **Catch errors early** - See problems during development, not production  
✅ **Clear error messages** - Know exactly what's wrong and how to fix it  
✅ **Type safety** - IDE autocomplete and type checking  
✅ **Better DX** - Faster development with instant feedback

### For Library Maintainers

✅ **Consistent patterns** - Same validation approach across all components  
✅ **Easy to maintain** - Central validation utilities  
✅ **Zero production cost** - Tree-shaken in production builds  
✅ **Extensible** - Easy to add new validators

## Performance

### Development

- Validation runs only in development mode
- Uses `process.env.NODE_ENV !== "production"` guard
- Minimal performance impact during development

### Production

- **Zero overhead** - All validation code is tree-shaken
- Build tools remove `if (process.env.NODE_ENV !== "production")` blocks
- Production bundle contains no validation code
- No runtime performance penalty

## Examples

See these components for reference implementations:

- **Calendar** - Complex mode-based validation with discriminated unions
- **Input** - Standard input validation with common validators
- **Badge** - Simple display component validation
- **Accordion** - Container component with children validation

## Best Practices

1. **Always use discriminated unions** for mutually exclusive props
2. **Validate in useEffect** to catch prop changes
3. **Include all validated props** in useEffect dependencies
4. **Use common validators** for standard props (size, variant, color)
5. **Provide helpful error messages** that explain what's wrong and how to fix it
6. **Test validation** with invalid props during development
7. **Keep validation logic simple** - One validator per prop when possible
8. **Document prop requirements** in TypeScript types and JSDoc comments

## Migration Guide

To add validation to existing components:

1. Review component props and identify validation requirements
2. Add TypeScript discriminated unions if needed
3. Import validation utilities
4. Add useEffect with validator instance
5. Add validation for each prop
6. Test with invalid props
7. Verify production build is clean

## Future Enhancements

- [ ] JSDoc `@throws` annotations for better IDE support
- [ ] Branded types for validated values
- [ ] Integration with form validation libraries
- [ ] Custom validation hooks for complex scenarios
- [ ] Validation error boundaries for better error handling
