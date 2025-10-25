# Validation Quick Reference

## 🚀 Quick Start - Add Validation in 3 Steps

### Step 1: Import

```typescript
import {
  createValidator,
  commonValidators,
  isValidX,
} from "../../lib/validation";
```

### Step 2: Add useEffect

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("ComponentName");

    // Add validations here
    commonValidators.size(validator, size);
    validator.validateDate("dateProp", dateProp);
  }
}, [size, dateProp]); // ⚠️ Include all validated props
```

### Step 3: Test

```typescript
// TypeScript errors (compile-time)
<Component invalidProp="value" /> // ❌ Type error

// Console errors (runtime)
<Component dateProp="not-a-date" /> // ❌ Runtime error in dev console
```

---

## 📚 Common Validators

### Standard Props

```typescript
commonValidators.size(validator, size);
// Validates: "sm" | "md" | "lg" | "xl"

commonValidators.variant(validator, variant, ["default", "outline", "ghost"]);
// Pass allowed variants array

commonValidators.color(validator, color);
// Validates: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info"

commonValidators.className(validator, className);
// Validates string type

commonValidators.disabled(validator, disabled);
// Validates boolean type
```

---

## 🔧 Validation Methods

### Required

```typescript
validator.validateRequired("propName", value);
// Checks not null/undefined
```

### Type Validation

```typescript
validator.validateType("propName", value, "string", isValidString);
validator.validateType("propName", value, "number", isValidNumber);
validator.validateType("propName", value, "boolean", isValidBoolean);
```

### Enum Validation

```typescript
validator.validateEnum("variant", variant, ["a", "b", "c"] as const);
```

### Date Validation

```typescript
validator.validateDate("dateProp", dateValue);
// Checks instanceof Date and not Invalid Date
```

### Array Validation

```typescript
validator.validateArray("items", items);
// Just array check

validator.validateArray("dates", dates, isValidDate);
// Array check + validate each item
```

### Number Range

```typescript
validator.validateRange("count", count, 0, 100);
// Checks min <= value <= max
```

### Conditional Validation

```typescript
validator.validateConditional(
  mode === "advanced",
  "advancedProp",
  advancedProp
);
// Only validates if condition is true
```

### Mutually Exclusive Props

```typescript
validator.validateMutuallyExclusive(props, ["propA", "propB", "propC"]);
// Ensures only one is provided
```

---

## 🎯 Type Helpers

```typescript
isValidDate(value); // instanceof Date && !isNaN(date.getTime())
isValidNumber(value); // typeof value === "number" && !isNaN(value)
isValidString(value); // typeof value === "string"
isValidBoolean(value); // typeof value === "boolean"
isValidArray(value); // Array.isArray(value)
isValidObject(value); // typeof value === "object" && value !== null
isValidFunction(value); // typeof value === "function"
isValidEnum(value, arr); // arr.includes(value)
```

---

## 📋 Validation Patterns

### Pattern 1: Input Component

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Input");

    commonValidators.size(validator, size);
    commonValidators.variant(validator, variant, inputVariants);
    commonValidators.disabled(validator, disabled);

    if (maxLength !== undefined) {
      validator.validateType("maxLength", maxLength, "number", isValidNumber);
      validator.validateRange("maxLength", maxLength, 0, Infinity);
    }
  }
}, [size, variant, disabled, maxLength]);
```

### Pattern 2: Mode-Based Component (Calendar)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Calendar");

    // Mode-specific validation
    if (mode === "single") {
      if ("values" in props) {
        validator.error("'values' not allowed in mode='single'");
      }
      validator.validateDate("value", value);
    }

    if (mode === "multiple") {
      validator.validateArray("values", values, isValidDate);
    }

    if (mode === "range") {
      validator.validateDate("range.from", range?.from);
      validator.validateDate("range.to", range?.to);
    }
  }
}, [mode, value, values, range, props]);
```

### Pattern 3: Display Component (Badge)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Badge");

    commonValidators.size(validator, size);
    commonValidators.variant(validator, variant, badgeVariants);
    commonValidators.color(validator, color);

    if (icon && !isValidObject(icon)) {
      validator.error("'icon' must be a React element");
    }
  }
}, [size, variant, color, icon]);
```

### Pattern 4: Container Component (Accordion)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Accordion");

    validator.validateChildren(children);
    validator.validateEnum("type", type, ["single", "multiple"]);

    if (defaultOpen) {
      validator.validateArray("defaultOpen", defaultOpen, isValidString);
    }
  }
}, [children, type, defaultOpen]);
```

---

## ⚠️ Important Rules

### ✅ DO

- Wrap in `process.env.NODE_ENV !== "production"` check
- Include **all validated props** in useEffect dependencies
- Use common validators for standard props
- Provide clear, actionable error messages
- Test with invalid props during development

### ❌ DON'T

- Remove the development-only check (breaks tree-shaking)
- Forget to add props to dependency array
- Validate in render (use useEffect)
- Throw errors (use validator.error instead)
- Skip TypeScript types (both are needed!)

---

## 🎨 Error Messages

### Good Error Message ✅

```typescript
validator.error("Invalid prop: 'maxLength' must be a positive number.");
```

### Bad Error Message ❌

```typescript
validator.error("Invalid prop"); // Not helpful!
```

**Format:** `"Invalid prop: '<propName>' <specific problem>."`

---

## 🧪 Testing Validation

### During Development

```typescript
// Open dev console
// Add component with invalid props
<Component variant="invalid" />

// Check console for:
// ❌ [Component] Invalid prop: 'variant' must be one of: ...
```

### TypeScript Errors

```typescript
// IDE should show red underline
<Component mode="single" values={[]} />
//         ^^^^ Type error: 'values' not in single mode props
```

---

## 📊 Checklist for New Component

- [ ] Import validation utilities
- [ ] Add useEffect with development check
- [ ] Validate all required props
- [ ] Validate all prop types
- [ ] Validate enums (variant, size, mode, etc.)
- [ ] Validate conditional props
- [ ] Validate arrays/objects if present
- [ ] Add all props to dependency array
- [ ] Test with invalid props
- [ ] Verify build still succeeds

---

## 🔗 Resources

- **Full Guide:** `VALIDATION_SYSTEM.md`
- **API Reference:** `src/lib/validation.ts`
- **Examples:**
  - Calendar: `src/components/Calendar/index.tsx`
  - Input: `src/components/Input/index.tsx`

---

## 💡 Pro Tips

1. **Use TypeScript discriminated unions** for mutually exclusive props
2. **Start with common validators** - they cover 80% of cases
3. **Copy from similar components** - patterns repeat
4. **Test immediately** - catch validation bugs early
5. **Check build size** - validation should add 0 bytes to production

---

**Need Help?** See `VALIDATION_SYSTEM.md` for detailed examples and patterns.
