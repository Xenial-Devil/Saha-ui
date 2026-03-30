# DateRangePicker

A composition wrapper encapsulating `DatePicker` configurations specifically constrained to rendering a Start and End date payload object gracefully.

## Installation

```tsx
import { DateRangePicker } from 'saha-ui';
```

## Usage

### Simple Span Selection

```tsx
import { useState } from "react";
import { DateRangePicker } from "saha-ui";
import type { DateRange } from "saha-ui/components/DatePicker/DatePicker.types";

export default function Example() {
  const [range, setRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7))
  });

  return (
    <DateRangePicker 
      value={range} 
      onChange={setRange} 
      showShortcuts={true}
      placeholder="Select journey span"
    />
  );
}
```

## Props

Exposes all `DatePickerProps` natively but hardcodes `useRange=true` natively rendering multiple blocks globally.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | - | Imposes explicitly object defining boundaries continuously |
| `onChange` | `(value: DateRange) => void` | - | Listener fired perfectly tracking both boundary modifications seamlessly |
| `variant` | `DatePickerVariant` | `"default"` | Inherits standard visual styles perfectly |
| `size` | `DatePickerSize` | `"md"` | Defines block sizing organically referencing standard tokens locally |
| `minDate` | `Date` | - | Absolute minimal scale mapped automatically denying rendering correctly |
| `maxDate` | `Date` | - | Limits selection ceiling logically entirely preventing overlapping completely |
| `disabled` | `boolean` | `false` | Pauses inputs cleanly restricting dropdown expansions definitively |
| `showShortcuts` | `boolean` | `false` | Renders presets like "Last 7 Days" effortlessly accelerating utility natively |
