# AspectRatio - Type Safety Guide

## Type-Safe API

The AspectRatio component now enforces correct prop usage at compile time using TypeScript discriminated unions.

## The Rule

**When `ratio` is `"custom"`, you MUST provide `customRatio`. When `ratio` is a preset, you CANNOT provide `customRatio`.**

## Type Definitions

```typescript
// Preset ratios (without "custom")
export type AspectRatioPreset =
  | "1/1" // Square
  | "4/3" // Standard
  | "16/9" // Widescreen
  | "21/9" // Ultrawide
  | "3/2" // Photo
  | "2/3" // Portrait photo
  | "9/16" // Portrait video
  | "3/4"; // Portrait standard

// Props for preset ratios
interface AspectRatioPresetProps {
  ratio?: AspectRatioPreset;
  customRatio?: never; // ❌ NOT allowed
  // ... other props
}

// Props for custom ratios
interface AspectRatioCustomProps {
  ratio: "custom";
  customRatio: number | string; // ✅ REQUIRED
  // ... other props
}

// Final type is a union
export type AspectRatioProps = AspectRatioPresetProps | AspectRatioCustomProps;
```

## Examples

### ✅ Correct Usage

```tsx
import AspectRatio from "./components/AspectRatio";

// Preset ratio - no customRatio
function Example1() {
  return (
    <AspectRatio ratio="16/9">
      <img src="photo.jpg" alt="Photo" />
    </AspectRatio>
  );
}

// Custom ratio with number
function Example2() {
  return (
    <AspectRatio ratio="custom" customRatio={2.5}>
      <img src="wide.jpg" alt="Wide" />
    </AspectRatio>
  );
}

// Custom ratio with string format
function Example3() {
  return (
    <AspectRatio ratio="custom" customRatio="1.3:2.3">
      <img src="portrait.jpg" alt="Portrait" />
    </AspectRatio>
  );
}

// Default ratio (16/9) - no ratio prop needed
function Example4() {
  return (
    <AspectRatio>
      <img src="default.jpg" alt="Default" />
    </AspectRatio>
  );
}
```

### ❌ Type Errors

```tsx
import AspectRatio from "./components/AspectRatio";

// ERROR: customRatio not allowed with preset ratios
function Error1() {
  return (
    <AspectRatio ratio="16/9" customRatio={2.5}>
      {/* TypeScript Error: Type '{ ratio: "16/9"; customRatio: number; ... }' 
          is not assignable to type 'AspectRatioProps' */}
      <img src="photo.jpg" alt="Photo" />
    </AspectRatio>
  );
}

// ERROR: customRatio required when ratio is "custom"
function Error2() {
  return (
    <AspectRatio ratio="custom">
      {/* TypeScript Error: Property 'customRatio' is missing */}
      <img src="photo.jpg" alt="Photo" />
    </AspectRatio>
  );
}
```

## Runtime Validation

Even with TypeScript, the component validates props at runtime for safety:

### Console Error

```tsx
// This will show:
// Error: "customRatio" prop is required when ratio is set to "custom".
// Falling back to 16/9.
<AspectRatio ratio="custom">
  <img src="photo.jpg" />
</AspectRatio>
```

### Console Warning

```tsx
// This will show:
// Warning: "customRatio" prop is ignored when ratio is "16/9".
// Only use customRatio when ratio="custom".
<AspectRatio ratio="16/9" customRatio={2.5}>
  <img src="photo.jpg" />
</AspectRatio>
```

## Benefits

### 1. **Compile-Time Safety**

Catch errors before running your code. Your IDE will show errors immediately.

### 2. **Better IntelliSense**

When you type `ratio="custom"`, your IDE will automatically suggest adding `customRatio`.

### 3. **Self-Documenting**

The type system makes it clear how to use the component correctly.

### 4. **Prevents Bugs**

Can't accidentally pass both a preset ratio and a custom ratio.

## Migration from Old API

If you have existing code that worked before:

### Old Code (Still Works)

```tsx
// This still works if you were using it correctly
<AspectRatio ratio="16/9">
  <img src="photo.jpg" />
</AspectRatio>

<AspectRatio ratio="custom" customRatio={2.5}>
  <img src="wide.jpg" />
</AspectRatio>
```

### Fix TypeScript Errors

If you get errors after upgrading:

```tsx
// BEFORE (now gives error)
<AspectRatio ratio="16/9" customRatio={2.5}>
  <img src="photo.jpg" />
</AspectRatio>

// FIX: Remove customRatio OR change ratio to "custom"
<AspectRatio ratio="custom" customRatio={2.5}>
  <img src="photo.jpg" />
</AspectRatio>
```

```tsx
// BEFORE (now gives error)
<AspectRatio ratio="custom">
  <img src="photo.jpg" />
</AspectRatio>

// FIX: Add customRatio OR use a preset ratio
<AspectRatio ratio="custom" customRatio="16:9">
  <img src="photo.jpg" />
</AspectRatio>
```

## String Ratio Formats

When using `customRatio`, you can use either numbers or strings:

```tsx
// Number: Direct ratio value
<AspectRatio ratio="custom" customRatio={2.5}>
  {/* 2.5:1 ratio */}
</AspectRatio>

// String: width:height format
<AspectRatio ratio="custom" customRatio="16:9">
  {/* Same as preset 16/9 */}
</AspectRatio>

<AspectRatio ratio="custom" customRatio="1.3:2.3">
  {/* Custom 1.3:2.3 ratio */}
</AspectRatio>

// Decimal values work too
<AspectRatio ratio="custom" customRatio="2.5:1">
  {/* 2.5:1 ratio */}
</AspectRatio>
```

## Summary

✅ **DO:**

- Use preset ratios without `customRatio`
- Use `ratio="custom"` with `customRatio`
- Use string format for readable custom ratios

❌ **DON'T:**

- Mix preset ratios with `customRatio`
- Use `ratio="custom"` without `customRatio`
- Ignore TypeScript errors

The type system is there to help you! Trust the red squiggly lines. 🎯
