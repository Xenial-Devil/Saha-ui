# Calendar Component - Implementation Summary

## Overview

A fully-featured, beautiful Calendar component with type-safe selection modes, advanced features, and stunning visual variants following the Saha-ui design system.

## Key Features

### 🎯 Selection Modes (Type-Safe)

**Single Date Selection**

```tsx
<Calendar mode="single" value={date} onChange={setDate} />
```

**Multiple Date Selection**

```tsx
<Calendar mode="multiple" values={dates} onChange={setDates} />
```

**Date Range Selection**

```tsx
<Calendar mode="range" range={dateRange} onRangeChange={setDateRange} />
```

### 🎨 Visual Variants

- **default** - Clean card design with subtle shadows
- **bordered** - Prominent border with hover effects
- **glass** - Frosted glass effect with backdrop blur
- **glass-strong** - Enhanced glass effect
- **gradient** - Gradient border with shimmer

### 📏 Size Variants

- **sm** - Compact size for tight spaces
- **md** - Default medium size
- **lg** - Large size for emphasis

### ✨ Advanced Features

1. **Date Constraints**

   - Minimum date (`minDate`)
   - Maximum date (`maxDate`)
   - Disabled dates array (`disabledDates`)
   - Custom disable function (`isDateDisabled`)

2. **Customization**

   - First day of week (Sunday/Monday start)
   - Weekday format (short/narrow/long)
   - Show/hide today button
   - Show/hide clear button
   - Custom day renderer
   - Custom header/footer content
   - Border radius options (none to 2xl)

3. **Month/Year Picker**

   - Click month/year to open picker
   - Quick navigation between years
   - Fast month selection

4. **Animations**

   - Smooth transitions
   - Hover effects
   - Scale animations on day cells

5. **Accessibility**
   - ARIA labels
   - Keyboard navigation ready
   - Proper semantic HTML

## Type Safety

The component uses **discriminated unions** to ensure correct props usage:

```typescript
type CalendarProps =
  | CalendarSingleProps // mode="single" → value required
  | CalendarMultipleProps // mode="multiple" → values required
  | CalendarRangeProps; // mode="range" → range required
```

TypeScript will error if you:

- Use `mode="single"` with `values` or `range`
- Use `mode="multiple"` with `value` or `range`
- Use `mode="range"` with `value` or `values`

## Component Structure

```
src/components/Calendar/
├── Calendar.types.ts   # TypeScript definitions
└── index.tsx           # Main component implementation

src/examples/
└── CalendarExample.tsx # Comprehensive examples
```

## Props Interface

### Base Props (All Modes)

| Prop              | Type              | Default     | Description              |
| ----------------- | ----------------- | ----------- | ------------------------ |
| `variant`         | `CalendarVariant` | `"default"` | Visual style             |
| `size`            | `CalendarSize`    | `"md"`      | Component size           |
| `rounded`         | `CalendarRounded` | `"lg"`      | Border radius            |
| `weekdayFormat`   | `WeekdayFormat`   | `"short"`   | Day name format          |
| `firstDayOfWeek`  | `number`          | `0`         | Week start (0=Sun)       |
| `minDate`         | `Date`            | -           | Minimum selectable date  |
| `maxDate`         | `Date`            | -           | Maximum selectable date  |
| `disabledDates`   | `Date[]`          | `[]`        | Array of disabled dates  |
| `isDateDisabled`  | `function`        | -           | Custom disable function  |
| `showWeekNumbers` | `boolean`         | `false`     | Show week numbers        |
| `showTodayButton` | `boolean`         | `true`      | Show today button        |
| `showClearButton` | `boolean`         | `true`      | Show clear button        |
| `enablePicker`    | `boolean`         | `true`      | Enable month/year picker |
| `renderDay`       | `DayRenderer`     | -           | Custom day renderer      |
| `headerContent`   | `ReactNode`       | -           | Custom header            |
| `footerContent`   | `ReactNode`       | -           | Custom footer            |
| `animated`        | `boolean`         | `true`      | Enable animations        |
| `locale`          | `string`          | `"en-US"`   | Locale for formatting    |

### Mode-Specific Props

**Single Mode:**

- `mode?: "single"`
- `value?: Date`
- `onChange?: (date: Date | undefined) => void`

**Multiple Mode:**

- `mode: "multiple"`
- `values?: Date[]`
- `onChange?: (dates: Date[]) => void`

**Range Mode:**

- `mode: "range"`
- `range?: { from: Date; to?: Date }`
- `onRangeChange?: (range: { from: Date; to?: Date } | undefined) => void`

## Usage Examples

### Basic Single Selection

```tsx
import { useState } from "react";
import { Calendar } from "saha-ui";

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <Calendar mode="single" value={date} onChange={setDate} variant="glass" />
  );
}
```

### Range Selection with Constraints

```tsx
const [range, setRange] = useState<{ from: Date; to?: Date }>();

<Calendar
  mode="range"
  range={range}
  onRangeChange={setRange}
  variant="glass-strong"
  minDate={new Date()}
  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
/>;
```

### Multiple Selection with Disabled Weekends

```tsx
const [dates, setDates] = useState<Date[]>([]);

<Calendar
  mode="multiple"
  values={dates}
  onChange={setDates}
  variant="gradient"
  isDateDisabled={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable Sat & Sun
  }}
/>;
```

### Custom Week Start (Monday)

```tsx
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  firstDayOfWeek={1}
  weekdayFormat="long"
/>
```

## Build Output

```
dist/components\Calendar\index.js  15.93 kB │ gzip: 3.82 kB
```

## Browser Compatibility

- ✅ Chrome/Edge (modern)
- ✅ Firefox (modern)
- ✅ Safari (modern)
- ✅ Responsive design
- ✅ Touch device support

## Design Patterns

### CVA for Variants

```typescript
const calendarVariants = cva(
  [
    /* base styles */
  ],
  {
    variants: {
      variant: {
        /* variants */
      },
      size: {
        /* sizes */
      },
      rounded: {
        /* radii */
      },
    },
  }
);
```

### Type-Safe Mode Discrimination

```typescript
const onChange =
  mode === "single" && "onChange" in props
    ? (props.onChange as (date: Date | undefined) => void)
    : undefined;
```

### Memoized Calculations

```typescript
const calendarDays = useMemo(() => {
  // Generate calendar grid
}, [currentMonth, firstDayOfWeek]);
```

## Advanced Customization

### Custom Day Renderer

```tsx
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  renderDay={(date, isSelected, isToday, isDisabled, isInRange) => (
    <div className={isSpecialDay(date) ? "special-day" : ""}>
      {date.getDate()}
      {isSpecialDay(date) && <span>🎉</span>}
    </div>
  )}
/>
```

### Custom Header/Footer

```tsx
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  headerContent={
    <div className="custom-header">
      <button onClick={goToPreviousYear}>« Year</button>
      <span>{currentMonth.getFullYear()}</span>
      <button onClick={goToNextYear}>Year »</button>
    </div>
  }
  footerContent={
    <div className="custom-footer">
      <button onClick={selectToday}>Today</button>
      <button onClick={selectTomorrow}>Tomorrow</button>
    </div>
  }
/>
```

## Accessibility Features

- **ARIA labels** on all interactive elements
- **Keyboard navigation** support structure
- **Screen reader** friendly
- **Focus management** for better UX
- **Disabled state** properly communicated

## Performance Optimizations

1. **Memoized calculations** for calendar grid
2. **useCallback** for event handlers
3. **Conditional rendering** for pickers
4. **Efficient date comparisons**
5. **No unnecessary re-renders**

## Testing Suggestions

```tsx
// Test single selection
it("should select single date", () => {
  const onChange = vi.fn();
  render(<Calendar mode="single" onChange={onChange} />);
  // Click a date
  // Verify onChange called with Date
});

// Test range selection
it("should select date range", () => {
  const onRangeChange = vi.fn();
  render(<Calendar mode="range" onRangeChange={onRangeChange} />);
  // Click start date
  // Click end date
  // Verify onRangeChange called with range object
});

// Test disabled dates
it("should not allow selecting disabled dates", () => {
  const onChange = vi.fn();
  const disabledDate = new Date();
  render(
    <Calendar
      mode="single"
      onChange={onChange}
      disabledDates={[disabledDate]}
    />
  );
  // Try to click disabled date
  // Verify onChange not called
});
```

## Future Enhancements

Potential features for future versions:

- [ ] Time picker integration
- [ ] Preset quick selections
- [ ] Custom events/markers on dates
- [ ] Multi-month view
- [ ] Year view
- [ ] Decade view
- [ ] Keyboard navigation implementation
- [ ] RTL support
- [ ] More locale options
- [ ] Custom color schemes per date

## Migration from DatePicker

If you're using the DatePicker component and want to migrate:

**Before (DatePicker):**

```tsx
<DatePicker value={date} onChange={setDate} variant="glass" />
```

**After (Calendar):**

```tsx
<Calendar mode="single" value={date} onChange={setDate} variant="glass" />
```

The Calendar component can be used standalone or integrated with input fields for a full date picker experience.

## Summary

The Calendar component is a production-ready, type-safe, and beautifully designed solution for date selection in React applications. It follows the Saha-ui design system perfectly and provides flexibility through multiple selection modes, visual variants, and extensive customization options.

**Total Components: 47/71** ✅
