# DateTimePicker

The `DateTimePicker` component composes `DatePicker` and `TimePicker` to provide a unified Date and Time selection field. It renders as a horizontal flex group showing both a date picker and a time picker side-by-side.

## Installation

```tsx
import { DateTimePicker } from 'saha-ui';
```

## Usage

### Basic Usage

```tsx
import { useState } from "react";
import { DateTimePicker } from "saha-ui";

export default function Example() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DateTimePicker
      label="Schedule Meeting"
      value={date}
      onChange={setDate}
      variant="default"
      size="md"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| string \| null` | - | The combined selected date and time |
| `onChange` | `(date: Date \| null) => void` | - | Callback fired when either date or time changes |
| `useRange` | `boolean` | `false` | Use range mode |
| `datePickerProps` | `Partial<DatePickerProps>` | - | Props to pass down directly to the DatePicker component |
| `timePickerProps` | `Partial<TimePickerProps>` | - | Props to pass down directly to the TimePicker component |
| `variant` | `DatePickerVariant` | `"default"` | Visual style variant of the pickers |
| `size` | `DatePickerSize` | `"md"` | Size of the input fields |
| `label` | `string` | - | Text label for the combined element |
| `helperText` | `string` | - | Text shown below the inputs |
| `error` | `boolean` | `false` | Applies error styling to the pickers |
| `disabled` | `boolean` | `false` | Disables both date and time pickers |
