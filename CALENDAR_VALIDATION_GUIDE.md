# Calendar Prop Validation - Implementation Guide

## ✅ Runtime Validation Added

The Calendar component now includes comprehensive **runtime prop validation** that checks:

- Correct props for each mode
- Valid Date objects
- Correct data types (Date vs Array vs Object)
- Logical constraints (min/max dates)

### 🎯 What Gets Validated

#### Mode-Specific Props

**Single Mode (`mode="single"`)**

- ✅ Allows: `value`, `onChange`
- ❌ Rejects: `values`, `range`, `onRangeChange`
- Validates: `value` must be a Date object (not an array)

**Multiple Mode (`mode="multiple"`)**

- ✅ Allows: `values`, `onChange`
- ❌ Rejects: `value`, `range`, `onRangeChange`
- Validates: `values` must be an array of valid Date objects

**Range Mode (`mode="range"`)**

- ✅ Allows: `range`, `onRangeChange`
- ❌ Rejects: `value`, `values`, `onChange`
- Validates: `range` must be `{ from: Date, to?: Date }`
- Warns: If `range.to` is before `range.from`

#### General Props (All Modes)

- `minDate` - Must be a valid Date object
- `maxDate` - Must be a valid Date object, cannot be before `minDate`
- `disabledDates` - Must be an array of valid Date objects
- `currentMonth` - Must be a valid Date object

## 📝 Validation Examples

### ❌ Invalid Usage (Will Show Console Errors)

```tsx
// ERROR: Using array in single mode
<Calendar
  mode="single"
  value={[new Date()]}  // ❌ Should be Date, not Array
  onChange={setDate}
/>
// Console: "Invalid prop: 'value' should be a Date object, not an array"

// ERROR: Using wrong props in single mode
<Calendar
  mode="single"
  values={dates}  // ❌ Should use 'value' in single mode
  onChange={setDate}
/>
// Console: "Invalid prop: 'values' should not be used in mode='single'"

// ERROR: Using wrong props in multiple mode
<Calendar
  mode="multiple"
  value={date}  // ❌ Should use 'values' in multiple mode
  onChange={setDates}
/>
// Console: "Invalid prop: 'value' should not be used in mode='multiple'"

// ERROR: Using wrong callback in range mode
<Calendar
  mode="range"
  range={dateRange}
  onChange={setRange}  // ❌ Should use 'onRangeChange'
/>
// Console: "Invalid prop: 'onChange' should not be used in mode='range'"

// ERROR: Invalid date object
<Calendar
  mode="single"
  value={new Date("invalid")}  // ❌ Invalid date
  onChange={setDate}
/>
// Console: "Invalid prop: 'value' must be a valid Date object"

// ERROR: Max before min
<Calendar
  mode="single"
  minDate={new Date(2025, 11, 31)}
  maxDate={new Date(2025, 0, 1)}  // ❌ Before minDate
/>
// Console: "Invalid prop: 'maxDate' should not be before 'minDate'"

// WARNING: Range.to before range.from
<Calendar
  mode="range"
  range={{
    from: new Date(2025, 11, 31),
    to: new Date(2025, 0, 1)  // ⚠️ Before from
  }}
/>
// Console: "Warning: 'range.to' should not be before 'range.from'"
```

### ✅ Valid Usage

```tsx
// ✅ Correct single mode
<Calendar
  mode="single"
  value={new Date()}
  onChange={setDate}
/>

// ✅ Correct multiple mode
<Calendar
  mode="multiple"
  values={[new Date(), new Date()]}
  onChange={setDates}
/>

// ✅ Correct range mode
<Calendar
  mode="range"
  range={{ from: new Date(), to: new Date() }}
  onRangeChange={setRange}
/>

// ✅ With valid constraints
<Calendar
  mode="single"
  minDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
  disabledDates={[new Date(2025, 6, 4)]}
/>
```

## 🔍 Validation Checks

### 1. Mode Validation

```typescript
// Single Mode Checks
if (mode === "single") {
  - Cannot use 'values' prop
  - Cannot use 'range' prop
  - Cannot use 'onRangeChange' callback
  - 'value' must be Date object (not array)
  - 'value' must be valid Date
}

// Multiple Mode Checks
if (mode === "multiple") {
  - Cannot use 'value' prop
  - Cannot use 'range' prop
  - Cannot use 'onRangeChange' callback
  - 'values' must be an array
  - All items in 'values' must be valid Dates
}

// Range Mode Checks
if (mode === "range") {
  - Cannot use 'value' prop
  - Cannot use 'values' prop
  - Cannot use 'onChange' callback
  - 'range' must be object with 'from' property
  - 'range.from' must be valid Date
  - 'range.to' (if provided) must be valid Date
  - Warning if 'range.to' < 'range.from'
}
```

### 2. Date Validation

```typescript
// isValidDate helper function
const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Checks:
- Must be instanceof Date
- Must not be Invalid Date (NaN)
```

### 3. Constraint Validation

```typescript
// Min/Max Date Checks
if (minDate && maxDate && maxDate < minDate) {
  console.error("maxDate should not be before minDate");
}

// Disabled Dates Check
if (!Array.isArray(disabledDates)) {
  console.error("disabledDates must be an array");
}
```

## 🎯 Console Output Examples

### Development Mode

```javascript
// Wrong prop in single mode
[Calendar] Invalid prop: 'values' should not be used in mode='single'. Use 'value' instead.

// Wrong prop in multiple mode
[Calendar] Invalid prop: 'value' should not be used in mode='multiple'. Use 'values' instead.

// Wrong callback in range mode
[Calendar] Invalid prop: 'onChange' should not be used in mode='range'. Use 'onRangeChange' instead.

// Invalid date
[Calendar] Invalid prop: 'value' must be a valid Date object in mode='single'.

// Array instead of Date
[Calendar] Invalid prop: 'value' should be a Date object, not an array, in mode='single'.

// Invalid array items
[Calendar] Invalid prop: 'values' contains invalid Date objects in mode='multiple'.

// Range validation
[Calendar] Invalid prop: 'range' must be an object with 'from' property of type Date.
[Calendar] Invalid prop: 'range.from' must be a valid Date object in mode='range'.
[Calendar] Warning: 'range.to' should not be before 'range.from'. The dates will be auto-corrected.

// Constraint validation
[Calendar] Invalid prop: 'minDate' must be a valid Date object.
[Calendar] Invalid prop: 'maxDate' should not be before 'minDate'.
[Calendar] Invalid prop: 'disabledDates' must be an array of Date objects.
[Calendar] Invalid prop: 'disabledDates' contains invalid Date objects.
```

### Production Mode

**All validation is skipped in production builds** for performance:

```typescript
if (process.env.NODE_ENV !== "production") {
  // Validation only runs in development
}
```

## 🚀 Benefits

### For Developers

1. **Early Error Detection** - Catch mistakes during development
2. **Clear Error Messages** - Know exactly what's wrong
3. **TypeScript + Runtime** - Both compile-time and runtime safety
4. **Development Only** - No performance impact in production

### Error Prevention

```tsx
// TypeScript catches this at compile time
<Calendar
  mode="single"
  values={dates} // ❌ Type error
/>;

// Runtime catches this in development
const wrongValue: any = [new Date()];
<Calendar
  mode="single"
  value={wrongValue} // ❌ Runtime error
/>;
```

## 📊 Build Output

```
dist/components\Calendar\index.js  27.90 kB │ gzip: 5.43 kB
```

**Size increase:** ~3.7 kB uncompressed / ~0.63 kB gzipped

- Validation code is tree-shaken in production
- Only affects development bundle

## 🎓 Best Practices

### Do This ✅

```tsx
// Use correct props for mode
<Calendar mode="single" value={date} onChange={setDate} />
<Calendar mode="multiple" values={dates} onChange={setDates} />
<Calendar mode="range" range={range} onRangeChange={setRange} />

// Validate dates before passing
const date = new Date(userInput);
if (!isNaN(date.getTime())) {
  setSelectedDate(date);
}

// Use valid date ranges
<Calendar
  minDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
/>
```

### Don't Do This ❌

```tsx
// Don't mix mode props
<Calendar mode="single" values={dates} />  // ❌
<Calendar mode="multiple" value={date} />  // ❌
<Calendar mode="range" onChange={fn} />     // ❌

// Don't pass invalid dates
<Calendar value={new Date("bad")} />        // ❌
<Calendar value={[new Date()]} />           // ❌ (in single mode)

// Don't pass wrong types
<Calendar values={new Date()} />            // ❌ (not an array)
<Calendar range={new Date()} />             // ❌ (not an object)
```

## 🧪 Testing Validation

To test validation in your development environment:

```tsx
// 1. Open browser console
// 2. Try invalid props
<Calendar mode="single" values={[new Date()]} />

// 3. See console errors
// [Calendar] Invalid prop: 'values' should not be used in mode='single'

// 4. Fix the issue
<Calendar mode="single" value={new Date()} />
```

## 📚 TypeScript Integration

Validation complements TypeScript's discriminated unions:

```typescript
// TypeScript ensures you use correct types
type CalendarProps =
  | CalendarSingleProps // mode="single" → value, onChange
  | CalendarMultipleProps // mode="multiple" → values, onChange
  | CalendarRangeProps; // mode="range" → range, onRangeChange

// Runtime validation catches what TypeScript can't
const dynamicValue: any = getSomeValue();
<Calendar mode="single" value={dynamicValue} />;
// TypeScript: ✅ (type is 'any')
// Runtime: ❌ If dynamicValue is not a valid Date
```

## 🎯 Summary

Calendar now validates:

- ✅ **Mode-specific props** - Right props for each mode
- ✅ **Data types** - Date vs Array vs Object
- ✅ **Valid dates** - instanceof Date && not NaN
- ✅ **Logical constraints** - min < max, from < to
- ✅ **Development only** - Zero production overhead
- ✅ **Clear messages** - Know exactly what to fix

**Result:** Catch errors early, fix faster, ship with confidence! 🚀
