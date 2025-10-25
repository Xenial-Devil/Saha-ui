# Component Validation Templates

## Quick Copy-Paste Templates for Adding Validation

### 1. Standard Import Addition

```typescript
// Add to existing imports
import {
  createValidator,
  commonValidators,
  isValidNumber,
  isValidBoolean,
  isValidArray,
  isValidString,
} from "../../lib/validation";
```

### 2. Form Input Component Template (Input, TextArea, Select)

```typescript
// Add after existing useEffects, before component logic
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("ComponentName");

    // Common validators
    commonValidators.size(validator, size);
    const variants = ["default", "primary", "secondary", "accent", ...] as const;
    commonValidators.variant(validator, variant, variants);
    commonValidators.disabled(validator, disabled);
    commonValidators.className(validator, className);

    // Number validations
    if (maxLength !== undefined) {
      if (!isValidNumber(maxLength) || maxLength < 0) {
        validator.error("Invalid prop: 'maxLength' must be a positive number.");
      }
    }

    // Boolean validations
    if (required !== undefined && !isValidBoolean(required)) {
      validator.error("Invalid prop: 'required' must be a boolean.");
    }
  }
}, [variant, size, disabled, className, maxLength, required]);
```

### 3. Display Component Template (Badge, Alert, Chip, Tag)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("ComponentName");

    commonValidators.size(validator, size);
    const variants = ["default", "outline", "solid", ...] as const;
    commonValidators.variant(validator, variant, variants);
    commonValidators.color(validator, color);
    commonValidators.className(validator, className);

    // Icon validation
    if (icon && typeof icon !== "object") {
      validator.error("Invalid prop: 'icon' must be a React element.");
    }
  }
}, [size, variant, color, className, icon]);
```

### 4. Container Component Template (Modal, Drawer, Accordion, Tab)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("ComponentName");

    commonValidators.variant(validator, variant, variants);
    commonValidators.className(validator, className);
    validator.validateChildren(children);

    // Open state validation
    if (open !== undefined && !isValidBoolean(open)) {
      validator.error("Invalid prop: 'open' must be a boolean.");
    }

    // Modal specific
    if (modal !== undefined && !isValidBoolean(modal)) {
      validator.error("Invalid prop: 'modal' must be a boolean.");
    }
  }
}, [variant, className, children, open, modal]);
```

### 5. Navigation Component Template (Breadcrumb, Pagination, Steps)

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("ComponentName");

    commonValidators.size(validator, size);
    commonValidators.variant(validator, variant, variants);

    // Items array validation
    validator.validateArray("items", items);
    if (items && isValidArray(items)) {
      items.forEach((item, index) => {
        if (!item || typeof item !== "object") {
          validator.error(`Invalid prop: 'items[${index}]' must be an object.`);
        }
      });
    }

    // Current/active index
    if (current !== undefined && (!isValidNumber(current) || current < 0)) {
      validator.error("Invalid prop: 'current' must be a non-negative number.");
    }
  }
}, [size, variant, items, current]);
```

### 6. Button Component Template

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Button");

    commonValidators.size(validator, size);
    const buttonVariants = [
      "default",
      "primary",
      "secondary",
      "accent",
      "destructive",
      "outline",
      "ghost",
      "link",
      "glass",
    ] as const;
    commonValidators.variant(validator, variant, buttonVariants);
    commonValidators.disabled(validator, disabled);
    commonValidators.className(validator, className);

    // Loading validation
    if (loading !== undefined && !isValidBoolean(loading)) {
      validator.error("Invalid prop: 'loading' must be a boolean.");
    }

    // Icon validation
    if (startIcon && typeof startIcon !== "object") {
      validator.error("Invalid prop: 'startIcon' must be a React element.");
    }
    if (endIcon && typeof endIcon !== "object") {
      validator.error("Invalid prop: 'endIcon' must be a React element.");
    }

    // Full width
    if (fullWidth !== undefined && !isValidBoolean(fullWidth)) {
      validator.error("Invalid prop: 'fullWidth' must be a boolean.");
    }
  }
}, [
  variant,
  size,
  disabled,
  className,
  loading,
  startIcon,
  endIcon,
  fullWidth,
]);
```

### 7. Switch Component Template

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Switch");

    commonValidators.size(validator, size);
    const switchVariants = [
      "default",
      "primary",
      "secondary",
      "accent",
    ] as const;
    commonValidators.variant(validator, variant, switchVariants);
    commonValidators.disabled(validator, disabled);
    commonValidators.className(validator, className);

    // Checked state validation
    if (checked !== undefined && !isValidBoolean(checked)) {
      validator.error("Invalid prop: 'checked' must be a boolean.");
    }

    if (defaultChecked !== undefined && !isValidBoolean(defaultChecked)) {
      validator.error("Invalid prop: 'defaultChecked' must be a boolean.");
    }
  }
}, [variant, size, disabled, className, checked, defaultChecked]);
```

### 8. Avatar Component Template

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Avatar");

    commonValidators.size(validator, size);
    const avatarVariants = ["circle", "square", "rounded"] as const;
    commonValidators.variant(validator, variant, avatarVariants);
    commonValidators.className(validator, className);

    // Either src or fallback should be provided
    if (!src && !fallback && !children) {
      validator.warn(
        "Warning: Avatar should have either 'src', 'fallback', or children."
      );
    }
  }
}, [size, variant, className, src, fallback, children]);
```

### 9. Slider Component Template

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Slider");

    commonValidators.disabled(validator, disabled);
    commonValidators.className(validator, className);

    // Min/max validation
    if (min !== undefined && !isValidNumber(min)) {
      validator.error("Invalid prop: 'min' must be a number.");
    }
    if (max !== undefined && !isValidNumber(max)) {
      validator.error("Invalid prop: 'max' must be a number.");
    }
    if (min !== undefined && max !== undefined && min >= max) {
      validator.error("Invalid prop: 'min' must be less than 'max'.");
    }

    // Step validation
    if (step !== undefined) {
      if (!isValidNumber(step) || step <= 0) {
        validator.error("Invalid prop: 'step' must be a positive number.");
      }
    }

    // Value validation
    if (value !== undefined) {
      if (Array.isArray(value)) {
        validator.validateArray("value", value, isValidNumber);
      } else if (!isValidNumber(value)) {
        validator.error(
          "Invalid prop: 'value' must be a number or number array."
        );
      }
    }
  }
}, [disabled, className, min, max, step, value]);
```

### 10. Upload Component Template

```typescript
useEffect(() => {
  if (process.env.NODE_ENV !== "production") {
    const validator = createValidator("Upload");

    commonValidators.disabled(validator, disabled);
    commonValidators.className(validator, className);

    // Accept validation
    if (accept && !isValidString(accept)) {
      validator.error("Invalid prop: 'accept' must be a string.");
    }

    // Max file size validation
    if (maxSize !== undefined) {
      if (!isValidNumber(maxSize) || maxSize <= 0) {
        validator.error("Invalid prop: 'maxSize' must be a positive number.");
      }
    }

    // Max files validation
    if (maxFiles !== undefined) {
      if (!isValidNumber(maxFiles) || maxFiles < 1) {
        validator.error("Invalid prop: 'maxFiles' must be at least 1.");
      }
    }

    // Multiple validation
    if (multiple !== undefined && !isValidBoolean(multiple)) {
      validator.error("Invalid prop: 'multiple' must be a boolean.");
    }
  }
}, [disabled, className, accept, maxSize, maxFiles, multiple]);
```

---

## Remaining Components Checklist

### Priority 1 - Form Components ✅ Mostly Complete

- [x] Input
- [x] TextArea
- [x] Select
- [x] Checkbox
- [x] CheckboxGroup
- [ ] Radio - needs validation logic
- [ ] RadioGroup - needs validation logic
- [ ] Switch

### Priority 2 - Display Components

- [ ] Badge
- [ ] Alert
- [ ] Chip
- [ ] Tag
- [ ] Toast

### Priority 3 - Button Components

- [ ] Button
- [ ] ButtonGroup
- [ ] FloatingActionButton

### Priority 4 - Container/Modal Components

- [ ] Dialog/Modal
- [ ] Drawer
- [ ] Accordion
- [ ] Tab
- [ ] Popover
- [ ] Tooltip

### Priority 5 - Navigation Components

- [ ] Breadcrumb
- [ ] Pagination
- [ ] Steps

### Priority 6 - Data Display

- [ ] Table
- [ ] List
- [ ] Card
- [ ] Empty
- [ ] Timeline
- [ ] Tree

### Priority 7 - Feedback Components

- [ ] Progress
- [ ] Spinner
- [ ] Skeleton
- [ ] Rating

### Priority 8 - Media Components

- [ ] Avatar
- [ ] AvatarGroup
- [ ] Image
- [ ] Carousel

### Priority 9 - Form Advanced

- [ ] DatePicker
- [ ] Upload
- [ ] Slider

### Priority 10 - Utilities

- [ ] AspectRatio (already has some validation)
- [ ] Divider/Separator
- [ ] Link
- [ ] ThemeProvider
- [ ] ThemeToggle
- [ ] Field
- [ ] Dropdown
- [ ] Autocomplete
- [ ] TagInput
- [ ] PlayButton

---

## Process for Each Component

1. **Add imports** - Add validation utilities to imports
2. **Add useEffect** - Add validation useEffect after existing hooks
3. **Common validators** - Use commonValidators for size, variant, color, className, disabled
4. **Component-specific** - Add custom validation for unique props
5. **Dependencies** - Add all validated props to useEffect dependency array
6. **Test** - Verify build still succeeds

---

## Estimated Time per Component

- **Simple components** (Badge, Chip, Tag): ~5 minutes
- **Medium components** (Button, Avatar, Alert): ~10 minutes
- **Complex components** (Select, DatePicker, Upload): ~15-20 minutes
- **Total remaining**: ~35 components × 10 min avg = ~6 hours

---

## Tips for Fast Implementation

1. **Copy template** - Use template above matching component type
2. **Find variants** - Look at CVA definition for allowed variants
3. **Check props** - Review component props type definition
4. **Add imports** - Don't forget to import validation helpers you use
5. **Dependencies** - Include ALL props you validate in dependency array
6. **Build test** - Run `npm run build` every 5-10 components
