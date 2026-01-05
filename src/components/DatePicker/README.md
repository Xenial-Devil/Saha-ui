# DatePicker

A fully accessible date picker component with calendar interface, range selection, and various date formats. Implements proper ARIA attributes and keyboard navigation for enhanced accessibility.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 📅 **Calendar View** - Interactive calendar interface
- 🔢 **Date Range** - Support for selecting date ranges
- 🌍 **Localization** - Multi-language and format support
- 🚫 **Disabled Dates** - Disable specific dates or ranges
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🌗 **Dark Mode** - Automatic dark mode support
- 📱 **Mobile Friendly** - Touch-optimized interface
- 🔄 **Time Picker** - Optional time selection

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { DatePicker } from "saha-ui";

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return <DatePicker label="Select date" value={date} onChange={setDate} />;
}
```

## Examples

### Variants

```tsx
<DatePicker label="Default" variant="default" />
<DatePicker label="Primary" variant="primary" />
<DatePicker label="Secondary" variant="secondary" />
<DatePicker label="Accent" variant="accent" />
<DatePicker label="Success" variant="success" />
<DatePicker label="Warning" variant="warning" />
<DatePicker label="Error" variant="error" />
```

### Sizes

```tsx
<DatePicker label="Small" size="sm" />
<DatePicker label="Medium" size="md" />
<DatePicker label="Large" size="lg" />
```

### Date Range Selection

Select a range of dates:

```tsx
function DateRangePicker() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      label="Select date range"
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => setDateRange(dates)}
      placeholderText="Select start and end dates"
    />
  );
}
```

### With Min and Max Dates

Restrict selectable dates:

```tsx
<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={addDays(new Date(), 30)}
  helperText="Select a date within the next 30 days"
/>
```

### With Disabled Dates

Disable specific dates or patterns:

```tsx
// Disable weekends
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

<DatePicker
  label="Select weekday"
  value={date}
  onChange={setDate}
  filterDate={(date) => !isWeekend(date)}
  helperText="Weekends are not available"
/>;

// Disable specific dates
const disabledDates = [
  new Date(2024, 11, 25), // Christmas
  new Date(2024, 0, 1), // New Year
];

<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  excludeDates={disabledDates}
/>;
```

### With Time Selection

Include time picker:

```tsx
<DatePicker
  label="Select date and time"
  value={date}
  onChange={setDate}
  showTimeSelect
  timeIntervals={15}
  dateFormat="MMMM d, yyyy h:mm aa"
  placeholderText="Select date and time"
/>
```

### Time Only

Show only time picker:

```tsx
<DatePicker
  label="Select time"
  value={time}
  onChange={setTime}
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  timeCaption="Time"
  dateFormat="h:mm aa"
/>
```

### Month Picker

Select month and year:

```tsx
<DatePicker
  label="Select month"
  value={date}
  onChange={setDate}
  dateFormat="MMMM yyyy"
  showMonthYearPicker
  placeholderText="Select month"
/>
```

### Year Picker

Select year only:

```tsx
<DatePicker
  label="Select year"
  value={date}
  onChange={setDate}
  dateFormat="yyyy"
  showYearPicker
  placeholderText="Select year"
/>
```

### With Custom Format

```tsx
<DatePicker
  label="Birth date"
  value={date}
  onChange={setDate}
  dateFormat="dd/MM/yyyy"
  placeholderText="DD/MM/YYYY"
/>
```

### Inline Calendar

Show calendar without input:

```tsx
<DatePicker label="Select date" value={date} onChange={setDate} inline />
```

### Required Field

```tsx
<DatePicker
  label="Appointment date"
  value={date}
  onChange={setDate}
  required
  error={!date && submitted ? "Date is required" : undefined}
  aria-required="true"
/>
```

### With Error State

```tsx
<DatePicker
  label="Date of birth"
  value={date}
  onChange={setDate}
  error="You must be at least 18 years old"
  aria-invalid="true"
/>
```

### Disabled State

```tsx
<DatePicker
  label="Disabled picker"
  disabled
  value={date}
  helperText="Date selection is currently unavailable"
/>
```

### Read-only State

```tsx
<DatePicker
  label="Booking date"
  readOnly
  value={bookingDate}
  helperText="This date cannot be changed"
/>
```

### With Clear Button

```tsx
<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  isClearable
  placeholderText="Select a date or clear"
/>
```

### Highlight Dates

Highlight specific dates:

```tsx
const highlightDates = [
  { date: new Date(), className: "bg-primary text-primary-foreground" },
  {
    date: addDays(new Date(), 7),
    className: "bg-accent text-accent-foreground",
  },
];

<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  highlightDates={highlightDates}
/>;
```

### Custom Day Contents

```tsx
<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  renderDayContents={(day, date) => {
    const hasEvent = events.some((e) => isSameDay(e.date, date));
    return (
      <div className="relative">
        {day}
        {hasEvent && (
          <div className="absolute bottom-0 w-1 h-1 bg-primary rounded-full" />
        )}
      </div>
    );
  }}
/>
```

### Booking System

```tsx
function BookingDatePicker() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const bookedDates = getBookedDates(); // Get booked dates from API

  return (
    <>
      <DatePicker
        label="Check-in date"
        value={checkIn}
        onChange={setCheckIn}
        minDate={new Date()}
        excludeDates={bookedDates}
        placeholderText="Select check-in date"
      />

      <DatePicker
        label="Check-out date"
        value={checkOut}
        onChange={setCheckOut}
        minDate={checkIn || new Date()}
        excludeDates={bookedDates}
        placeholderText="Select check-out date"
        disabled={!checkIn}
        helperText={!checkIn ? "Select check-in date first" : undefined}
      />
    </>
  );
}
```

### Birth Date Picker

```tsx
function BirthDatePicker() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const maxDate = subYears(new Date(), 18); // Must be 18+

  return (
    <DatePicker
      label="Date of birth"
      value={birthDate}
      onChange={setBirthDate}
      maxDate={maxDate}
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      dateFormat="MMMM d, yyyy"
      placeholderText="MM/DD/YYYY"
      helperText="You must be at least 18 years old"
      required
    />
  );
}
```

### Appointment Scheduler

```tsx
function AppointmentPicker() {
  const [appointment, setAppointment] = useState<Date | null>(null);

  const availableSlots = [
    { start: 9, end: 12 }, // 9 AM - 12 PM
    { start: 14, end: 17 }, // 2 PM - 5 PM
  ];

  const filterTime = (time: Date) => {
    const hours = time.getHours();
    return availableSlots.some(
      (slot) => hours >= slot.start && hours < slot.end
    );
  };

  return (
    <DatePicker
      label="Schedule appointment"
      value={appointment}
      onChange={setAppointment}
      showTimeSelect
      minDate={new Date()}
      filterDate={(date) => !isWeekend(date)}
      filterTime={filterTime}
      timeIntervals={30}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select appointment time"
      helperText="Available: Mon-Fri, 9 AM-12 PM & 2 PM-5 PM"
    />
  );
}
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus to/from date picker
- **Enter/Space**: Open calendar
- **Escape**: Close calendar
- **Arrow Keys**: Navigate dates in calendar
- **Home**: Go to start of week
- **End**: Go to end of week
- **Page Up**: Previous month
- **Page Down**: Next month
- **Shift + Page Up**: Previous year
- **Shift + Page Down**: Next year

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<DatePicker
  label="Appointment date"
  description="Select your preferred appointment date"
  helperText="Available dates are highlighted"
  error={error}
/>
// Automatically creates:
// - role="button" for the input trigger
// - role="dialog" for the calendar popup
// - role="grid" for the calendar
// - aria-labelledby links to label
// - aria-describedby links to description, helperText, and error
// - aria-selected for selected date
// - aria-disabled for disabled dates
```

### Manual ARIA Labels

For date pickers without visible labels:

```tsx
<DatePicker aria-label="Select date" value={date} onChange={setDate} />
```

### Required Fields

```tsx
<DatePicker
  label="Required date"
  required
  aria-required="true"
  error={!date && submitted ? "Date is required" : undefined}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<DatePicker label="Date" error="Invalid date selected" aria-invalid="true" />
// Error has role="alert" and aria-live="polite"
```

### Date Range Accessibility

```tsx
<DatePicker
  label="Date range"
  selectsRange
  startDate={startDate}
  endDate={endDate}
  onChange={setDateRange}
  aria-label="Select date range"
  helperText="Use arrow keys to navigate, Enter to select"
/>
```

## API Reference

### DatePicker Props

| Prop                  | Type                                                                                     | Default        | Description                               |
| --------------------- | ---------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- |
| `label`               | `string`                                                                                 | -              | Label text for the date picker            |
| `description`         | `string`                                                                                 | -              | Description text shown below the label    |
| `placeholder`         | `string`                                                                                 | -              | Placeholder text                          |
| `helperText`          | `string`                                                                                 | -              | Helper text shown below the picker        |
| `error`               | `string`                                                                                 | -              | Error message to display                  |
| `value`               | `Date \| null`                                                                           | -              | Selected date (controlled)                |
| `defaultValue`        | `Date`                                                                                   | -              | Default date (uncontrolled)               |
| `onChange`            | `(date: Date \| null) => void`                                                           | -              | Callback when date changes                |
| `onBlur`              | `(e: FocusEvent) => void`                                                                | -              | Blur event handler                        |
| `variant`             | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'`    | Color variant                             |
| `size`                | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`         | Size of the date picker                   |
| `dateFormat`          | `string`                                                                                 | `'MM/dd/yyyy'` | Date format string                        |
| `minDate`             | `Date`                                                                                   | -              | Minimum selectable date                   |
| `maxDate`             | `Date`                                                                                   | -              | Maximum selectable date                   |
| `excludeDates`        | `Date[]`                                                                                 | -              | Array of dates to exclude                 |
| `includeDates`        | `Date[]`                                                                                 | -              | Array of dates to include (only these)    |
| `filterDate`          | `(date: Date) => boolean`                                                                | -              | Function to filter selectable dates       |
| `selectsRange`        | `boolean`                                                                                | `false`        | Enable range selection                    |
| `startDate`           | `Date \| null`                                                                           | -              | Start date for range                      |
| `endDate`             | `Date \| null`                                                                           | -              | End date for range                        |
| `showTimeSelect`      | `boolean`                                                                                | `false`        | Show time picker                          |
| `showTimeSelectOnly`  | `boolean`                                                                                | `false`        | Show only time picker                     |
| `timeIntervals`       | `number`                                                                                 | `30`           | Time interval in minutes                  |
| `timeCaption`         | `string`                                                                                 | `'Time'`       | Label for time picker                     |
| `showMonthYearPicker` | `boolean`                                                                                | `false`        | Show month/year picker                    |
| `showYearPicker`      | `boolean`                                                                                | `false`        | Show year picker only                     |
| `showYearDropdown`    | `boolean`                                                                                | `false`        | Show year dropdown                        |
| `showMonthDropdown`   | `boolean`                                                                                | `false`        | Show month dropdown                       |
| `inline`              | `boolean`                                                                                | `false`        | Display calendar inline                   |
| `disabled`            | `boolean`                                                                                | `false`        | Whether the picker is disabled            |
| `readOnly`            | `boolean`                                                                                | `false`        | Whether the picker is read-only           |
| `required`            | `boolean`                                                                                | `false`        | Whether date selection is required        |
| `isClearable`         | `boolean`                                                                                | `false`        | Show clear button                         |
| `highlightDates`      | `Array<{ date: Date; className: string }>`                                               | -              | Dates to highlight                        |
| `renderDayContents`   | `(day: number, date: Date) => ReactNode`                                                 | -              | Custom day renderer                       |
| `locale`              | `Locale`                                                                                 | `en-US`        | Date locale                               |
| `className`           | `string`                                                                                 | -              | Additional CSS classes                    |
| `aria-label`          | `string`                                                                                 | -              | Accessible label for screen readers       |
| `aria-labelledby`     | `string`                                                                                 | -              | ID of element that labels this picker     |
| `aria-describedby`    | `string`                                                                                 | -              | IDs of elements that describe this picker |
| `aria-required`       | `'true' \| 'false'`                                                                      | -              | Whether the picker is required            |
| `aria-invalid`        | `'true' \| 'false'`                                                                      | -              | Whether the picker has an error           |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<DatePicker label="Appointment date" />
<DatePicker aria-label="Select date" />

// Bad ❌
<DatePicker placeholder="Select date" />
```

### 2. Set Appropriate Min/Max Dates

Restrict dates to valid ranges:

```tsx
// Good ✅
<DatePicker
  label="Future date"
  minDate={new Date()}
  maxDate={addYears(new Date(), 1)}
/>

// Bad ❌ - No restrictions on old/future dates
<DatePicker label="Date" />
```

### 3. Provide Clear Helper Text

```tsx
<DatePicker
  label="Check-in date"
  helperText="Bookings must be made at least 24 hours in advance"
  minDate={addDays(new Date(), 1)}
/>
```

### 4. Use Appropriate Date Formats

Match user expectations:

```tsx
// US format
<DatePicker dateFormat="MM/dd/yyyy" />

// European format
<DatePicker dateFormat="dd/MM/yyyy" />

// ISO format
<DatePicker dateFormat="yyyy-MM-dd" />
```

### 5. Validate Date Ranges

```tsx
function DateRangeForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setError("End date must be after start date");
    } else {
      setError("");
    }
  }, [startDate, endDate]);

  return (
    <>
      <DatePicker label="Start" value={startDate} onChange={setStartDate} />
      <DatePicker
        label="End"
        value={endDate}
        onChange={setEndDate}
        error={error}
      />
    </>
  );
}
```

### 6. Disable Unavailable Dates

```tsx
<DatePicker
  label="Appointment"
  filterDate={(date) => !isWeekend(date)}
  excludeDates={bookedDates}
  helperText="Available Monday-Friday only"
/>
```

### 7. Use Time Picker When Needed

```tsx
// Just date
<DatePicker label="Birth date" dateFormat="MM/dd/yyyy" />

// Date and time
<DatePicker
  label="Appointment"
  showTimeSelect
  dateFormat="MM/dd/yyyy h:mm aa"
/>
```

### 8. Provide Clear Error Messages

```tsx
<DatePicker
  label="Date"
  error="Please select a date within the next 30 days"
  value={date}
/>
```

### 9. Consider Mobile Users

```tsx
<DatePicker
  label="Date"
  // Shows native date picker on mobile
  showNativePicker
/>
```

### 10. Localize for Your Audience

```tsx
import { es } from "date-fns/locale";

<DatePicker label="Fecha" locale={es} dateFormat="dd/MM/yyyy" />;
```

## Form Integration

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function Form() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="appointmentDate"
        control={control}
        rules={{
          required: "Date is required",
          validate: (value) => {
            if (value < new Date()) {
              return "Date must be in the future";
            }
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            label="Appointment date"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            minDate={new Date()}
            aria-invalid={!!fieldState.error}
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  date: Yup.date()
    .required("Required")
    .min(new Date(), "Date must be in the future"),
});

function Form() {
  return (
    <Formik
      initialValues={{ date: null }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <DatePicker
          label="Select date"
          value={values.date}
          onChange={(date) => setFieldValue("date", date)}
          error={touched.date ? errors.date : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Event Calendar

```tsx
function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const events = getEvents(); // Get events from API

  const eventDates = events.map((e) => ({
    date: e.date,
    className: "bg-primary/20 text-primary font-semibold",
  }));

  return (
    <DatePicker
      label="Event calendar"
      value={selectedDate}
      onChange={setSelectedDate}
      inline
      highlightDates={eventDates}
      renderDayContents={(day, date) => {
        const event = events.find((e) => isSameDay(e.date, date));
        return (
          <div className="relative">
            {day}
            {event && (
              <div className="absolute bottom-0 w-full">
                <div className="w-1 h-1 mx-auto bg-primary rounded-full" />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
```

### Flight Booking

```tsx
function FlightDatePicker() {
  const [departure, setDeparture] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("roundTrip");

  return (
    <>
      <DatePicker
        label="Departure date"
        value={departure}
        onChange={setDeparture}
        minDate={new Date()}
        selectsStart
        startDate={departure}
        endDate={returnDate}
        required
      />

      {tripType === "roundTrip" && (
        <DatePicker
          label="Return date"
          value={returnDate}
          onChange={setReturnDate}
          minDate={departure || new Date()}
          selectsEnd
          startDate={departure}
          endDate={returnDate}
          disabled={!departure}
          helperText={!departure ? "Select departure date first" : undefined}
        />
      )}
    </>
  );
}
```

### Multi-language Support

```tsx
import { de, fr, es, ja } from "date-fns/locale";

function LocalizedDatePicker() {
  const [locale, setLocale] = useState("en");

  const locales = { en: undefined, de, fr, es, ja };
  const formats = {
    en: "MM/dd/yyyy",
    de: "dd.MM.yyyy",
    fr: "dd/MM/yyyy",
    es: "dd/MM/yyyy",
    ja: "yyyy年MM月dd日",
  };

  return (
    <DatePicker
      label="Select date"
      value={date}
      onChange={setDate}
      locale={locales[locale]}
      dateFormat={formats[locale]}
    />
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { DatePickerProps } from "saha-ui";

const MyDatePicker: React.FC<DatePickerProps> = (props) => {
  return <DatePicker {...props} />;
};

// Type-safe date handling
const handleChange = (date: Date | null) => {
  if (date) {
    console.log(format(date, "yyyy-MM-dd"));
  }
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<DatePicker label="Custom styled" className="my-custom-class" />
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Memoize Date Calculations

```tsx
const minDate = useMemo(() => addDays(new Date(), 1), []);
const maxDate = useMemo(() => addMonths(new Date(), 6), []);

<DatePicker minDate={minDate} maxDate={maxDate} />;
```

### 2. Lazy Load Large Date Ranges

```tsx
const [visibleMonth, setVisibleMonth] = useState(new Date());
const events = useMonthEvents(visibleMonth); // Load only current month

<DatePicker onMonthChange={setVisibleMonth} />;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Input](../Input/README.md) - For text input
- [Select](../Select/README.md) - For dropdown selection
- [TimePicker](../TimePicker/README.md) - For time only
- [Calendar](../Calendar/README.md) - Calendar display
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
