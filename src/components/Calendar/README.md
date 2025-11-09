# Calendar

A feature-rich calendar component for date selection with support for single dates, date ranges, multiple dates, and custom styling. Provides an intuitive interface for picking dates with keyboard navigation and accessibility support.

## Features

- 📅 **Multiple Selection Modes** - Single, range, and multiple date selection
- 🎨 **Customizable Styling** - Variants, colors, and custom day rendering
- ⌨️ **Keyboard Navigation** - Full keyboard support for date selection
- 🚫 **Disabled Dates** - Disable specific dates or date ranges
- 🌍 **Locale Support** - Configurable locale and first day of week
- 📱 **Responsive** - Works seamlessly on all screen sizes
- ♿ **Accessible** - ARIA attributes and screen reader support
- 🎯 **Min/Max Dates** - Restrict selectable date ranges

## Installation

```tsx
import { Calendar } from '@saha-ui/core';
```

## Basic Usage

### Single Date Selection

```tsx
const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

### Date Range Selection

```tsx
const [range, setRange] = useState<{ from: Date; to?: Date }>();

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
/>
```

### Multiple Date Selection

```tsx
const [dates, setDates] = useState<Date[]>([]);

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>
```

## Variants

```tsx
// Default variant
<Calendar variant="default" />

// Outline variant
<Calendar variant="outline" />

// Ghost variant
<Calendar variant="ghost" />
```

## Disabled Dates

### Disable Specific Dates

```tsx
const disabledDates = [
  new Date(2024, 0, 15),
  new Date(2024, 0, 20),
];

<Calendar
  mode="single"
  disabled={disabledDates}
/>
```

### Disable Date Range

```tsx
<Calendar
  mode="single"
  disabled={{
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 10)
  }}
/>
```

### Disable with Function

```tsx
// Disable weekends
<Calendar
  mode="single"
  disabled={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }}
/>
```

## Date Constraints

```tsx
// Minimum and maximum dates
<Calendar
  mode="single"
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
/>

// Only allow future dates
<Calendar
  mode="single"
  minDate={new Date()}
/>
```

## Customization

### Initial Month

```tsx
<Calendar
  mode="single"
  defaultMonth={new Date(2024, 6, 1)} // July 2024
/>
```

### First Day of Week

```tsx
// Start week on Monday (0 = Sunday, 1 = Monday, etc.)
<Calendar
  mode="single"
  weekStartsOn={1}
/>
```

### Show Outside Days

```tsx
// Show days from previous/next months
<Calendar
  mode="single"
  showOutsideDays
/>
```

### Number of Months

```tsx
// Show multiple months
<Calendar
  mode="range"
  numberOfMonths={2}
/>
```

## Advanced Examples

### Booking Calendar

```tsx
function BookingCalendar() {
  const [range, setRange] = useState<{ from: Date; to?: Date }>();
  const bookedDates = [
    new Date(2024, 5, 15),
    new Date(2024, 5, 16),
    new Date(2024, 5, 20),
  ];

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      disabled={bookedDates}
      minDate={new Date()}
      numberOfMonths={2}
    />
  );
}
```

### Holiday Calendar

```tsx
function HolidayCalendar() {
  const holidays = [
    new Date(2024, 0, 1),  // New Year
    new Date(2024, 6, 4),  // Independence Day
    new Date(2024, 11, 25), // Christmas
  ];

  return (
    <Calendar
      mode="multiple"
      selected={holidays}
      disabled={holidays}
    />
  );
}
```

### Event Calendar

```tsx
function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const eventDates = [
    new Date(2024, 5, 10),
    new Date(2024, 5, 15),
    new Date(2024, 5, 25),
  ];

  return (
    <div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={{
          hasEvent: eventDates
        }}
        modifiersClassNames={{
          hasEvent: 'bg-blue-100 font-bold'
        }}
      />
      {selectedDate && (
        <div className="mt-4">
          Selected: {selectedDate.toDateString()}
        </div>
      )}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "range" \| "multiple"` | `"single"` | Selection mode |
| `selected` | `Date \| {from: Date; to?: Date} \| Date[]` | - | Selected date(s) |
| `onSelect` | `(date) => void` | - | Callback when date is selected |
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Visual variant |
| `disabled` | `Date[] \| {from: Date; to: Date} \| (date: Date) => boolean` | - | Disabled dates |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `defaultMonth` | `Date` | `new Date()` | Initial month to display |
| `weekStartsOn` | `0-6` | `0` | First day of week (0 = Sunday) |
| `showOutsideDays` | `boolean` | `true` | Show days from adjacent months |
| `numberOfMonths` | `number` | `1` | Number of months to display |
| `modifiers` | `object` | - | Custom date modifiers |
| `modifiersClassNames` | `object` | - | Classes for modifiers |
| `className` | `string` | - | Additional CSS classes |
| `locale` | `Locale` | - | Date-fns locale object |

## Keyboard Navigation

- **Arrow Keys** - Navigate between days
- **Enter/Space** - Select focused day
- **Page Up/Down** - Navigate between months
- **Home** - Go to first day of week
- **End** - Go to last day of week

## Accessibility

The component follows accessibility best practices:

- Full keyboard navigation support
- ARIA labels for screen readers
- Proper focus management
- Semantic HTML with proper roles
- High contrast support
- Disabled state indicators

## Styling

```tsx
// Custom styling
<Calendar
  className="rounded-xl border-2 shadow-lg"
  modifiersClassNames={{
    selected: 'bg-primary text-primary-foreground',
    today: 'border-2 border-primary',
    disabled: 'opacity-40 cursor-not-allowed'
  }}
/>
```

## Integration Examples

### With Form

```tsx
<form>
  <Label htmlFor="date">Select Date</Label>
  <Calendar
    id="date"
    mode="single"
    selected={formData.date}
    onSelect={(date) => setFormData({ ...formData, date })}
  />
</form>
```

### With Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? format(date, 'PPP') : 'Pick a date'}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  </PopoverContent>
</Popover>
```

## Best Practices

1. **Always provide onSelect** - Handle date selection changes
2. **Set appropriate constraints** - Use minDate/maxDate for valid ranges
3. **Disable unavailable dates** - Clearly indicate non-selectable dates
4. **Provide visual feedback** - Show selected and disabled states
5. **Consider timezone** - Handle timezone conversions appropriately
6. **Mobile optimization** - Ensure touch-friendly on mobile devices
7. **Loading states** - Show loading indicator for async date validation

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- Modern JavaScript (ES6+)
- Date API

## Related Components

- **DatePicker** - Date picker with input field
- **Input** - Text input component
- **Popover** - Popover container
- **Button** - Button component