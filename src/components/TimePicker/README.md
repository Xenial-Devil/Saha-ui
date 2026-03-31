# TimePicker

A flexible and accessible time picker component with single and range selection, manual input parsing, 12/24 hour formats, and customizable display. Matches the visual variants used across the Saha UI components.

## Features

- ✅ Single and range selection
- ⌨️ Manual input with parsing (on Enter / blur)
- 🕛 12h and 24h formats with AM/PM support
- 🎨 Variant and size options (matches DatePicker styles)
- ⏱ Optional seconds, minute/second interval
- 🧭 Shortcuts (now, noon, midnight, etc.) and footer actions
- ♿ Accessible: keyboard navigation + ARIA-friendly (see props)

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { TimePicker } from "saha-ui";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(null);

  return (
    <TimePicker label="Select time" value={time} onChange={setTime} showClear />
  );
}
```

## Examples

### Variants

```tsx
<TimePicker label="Default" variant="default" />
<TimePicker label="Primary" variant="primary" />
<TimePicker label="Accent" variant="accent" />
```

### 12h / 24h Format

```tsx
<TimePicker format="12h" showFormatToggle />
<TimePicker format="24h" />
```

### Manual Input

Users can type values like `9:30 PM`, `21:30`, or `09:30:15`. The component parses input on blur or when Enter is pressed.

### Range Mode

```tsx
const [range, setRange] = useState({ startTime: null, endTime: null });
<TimePicker useRange value={range} onChange={setRange} showFooter />;
```

# TimePicker

A fully-featured time picker component that mirrors the visual and behavioral patterns used across Saha UI. Supports single and range selection modes, manual typing, 12/24-hour formats including AM/PM, optional seconds, shortcuts and footer actions.

## Features

- ✅ Single and range selection
- ⌨️ Manual input parsing (commits on Enter / blur)
- 🕛 Supports `12h` and `24h` displays with AM/PM handling
- 🎨 Visual `variant` and `size` options that reuse DatePicker tokens
- ⏱ Optional seconds and configurable minute/second intervals
- 🧭 Built-in shortcuts (`now`, `midnight`, `noon`, etc.) and footer with `Apply`/`Clear`/`Now`
- ♿ Keyboard navigation and ARIA-friendly attributes (see props)

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { TimePicker } from "saha-ui";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(null);

  return (
    <TimePicker label="Select time" value={time} onChange={setTime} showClear />
  );
}
```

## Examples

### Variants

```tsx
<TimePicker label="Default" variant="default" />
<TimePicker label="Primary" variant="primary" />
<TimePicker label="Accent" variant="accent" />
```

### Sizes

```tsx
<TimePicker label="Small" size="sm" />
<TimePicker label="Medium" size="md" />
<TimePicker label="Large" size="lg" />
```

### 12h / 24h

```tsx
// 12-hour display with AM/PM
<TimePicker format="12h" showFormatToggle />

// 24-hour display
<TimePicker format="24h" />
```

### Manual Input

Users can type common time formats such as `9:30 PM`, `21:30`, or `09:30:15`. The component will attempt to parse and normalize input when the field blurs or on Enter.

```tsx
<TimePicker
  label="Enter time"
  placeholder="hh:mm A or HH:mm"
  value={time}
  onChange={setTime}
/>
```

### Range Mode

```tsx
import { useState } from "react";

const [range, setRange] = useState({ startTime: null, endTime: null });

<TimePicker useRange value={range} onChange={setRange} showFooter />;
```

### Shortcuts & Footer

Customize built-in shortcuts and footer labels via the `configs` prop. Footer actions include `Apply`, `Clear`, and `Now` (when enabled).

```tsx
<TimePicker showShortcuts configs={{ shortcuts: { now: "Now" } }} showFooter />
```

## Props (summary)

- `value` — `TimeValue | TimeRange | null` — current value
- `onChange` — `(value: TimeValue | TimeRange | null) => void`
- `format` — `"12h" | "24h"` (default: `"24h"`)
- `useRange` — enable range selection
- `showSeconds` — include seconds in selector
- `minuteInterval` — minute/second step interval
- `showFooter`, `showClear`, `showNow`, `showShortcuts` — UI toggles
- `variant`, `size` — visual appearance
- `validateTime` — optional validation function

See `TimePicker.types.ts` for full prop and type definitions.

## Props

| Prop                 | Type                                                                                            | Default     | Description                                         |
| -------------------- | ----------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------- |
| `value`              | `TimeValue \| TimeRange \| null`                                                                | -           | Selected time or time range                         |
| `onChange`           | `(value: TimeValue \| TimeRange \| null) => void`                                               | -           | Callback when selection changes                     |
| `variant`            | `TimePickerVariant`                                                                             | `"default"` | Visual style variant                                |
| `size`               | `TimePickerSize`                                                                                | `"md"`      | Input size                                          |
| `useRange`           | `boolean`                                                                                       | `false`     | Enable start/end time range selection               |
| `format`             | `"12h" \| "24h"`                                                                                | `"24h"`     | Display format and AM/PM handling                   |
| `showSeconds`        | `boolean`                                                                                       | `false`     | Show seconds column                                 |
| `minuteInterval`     | `number`                                                                                        | `1`         | Step interval for minutes/seconds                   |
| `minTime`            | `TimeValue`                                                                                     | -           | Minimum selectable time                             |
| `maxTime`            | `TimeValue`                                                                                     | -           | Maximum selectable time                             |
| `disabled`           | `boolean`                                                                                       | `false`     | Disable interactions                                |
| `readOnly`           | `boolean`                                                                                       | `false`     | Read-only mode (no changes allowed)                 |
| `required`           | `boolean`                                                                                       | `false`     | Mark input required                                 |
| `placeholder`        | `string`                                                                                        | -           | Placeholder text for input                          |
| `displayFormat`      | `string`                                                                                        | -           | Custom display format (uses `formatTime`)           |
| `separator`          | `string`                                                                                        | `→`         | Separator for range display                         |
| `showShortcuts`      | `boolean`                                                                                       | `false`     | Show shortcuts sidebar                              |
| `showFooter`         | `boolean`                                                                                       | `false`     | Render footer with Apply/Clear actions (range mode) |
| `showClear`          | `boolean`                                                                                       | `true`      | Show clear (X) button in input                      |
| `showNow`            | `boolean`                                                                                       | `false`     | Show Now button (single mode)                       |
| `showSpinners`       | `boolean`                                                                                       | `false`     | Show increment/decrement spinners in header         |
| `showLiveClock`      | `boolean`                                                                                       | `false`     | Keep live clock updated when open                   |
| `showFormatToggle`   | `boolean`                                                                                       | `false`     | Show toggle to switch 12h/24h formats               |
| `configs`            | `TimePickerConfigs`                                                                             | -           | Customize shortcuts and footer labels               |
| `popoverDirection`   | `"up" \| "down" \| "auto"`                                                                      | `"auto"`    | Preferred dropdown direction                        |
| `animation`          | `AnimationType`                                                                                 | `"slide"`   | Dropdown animation type                             |
| `i18n`               | `string`                                                                                        | `"en"`      | Locale code for labels/text                         |
| `inputClassName`     | `string`                                                                                        | -           | Additional classes for the input element            |
| `containerClassName` | `string`                                                                                        | -           | Additional classes for root container               |
| `dropdownClassName`  | `string`                                                                                        | -           | Additional classes for dropdown panel               |
| `inputId`            | `string`                                                                                        | -           | `id` attribute for input                            |
| `inputName`          | `string`                                                                                        | -           | `name` attribute for input                          |
| `closeOnSelect`      | `boolean`                                                                                       | `true`      | Close dropdown after selecting (single mode)        |
| `enableKeyboardNav`  | `boolean`                                                                                       | `true`      | Enable keyboard navigation inside picker            |
| `validateTime`       | `(time: TimeValue) => boolean`                                                                  | -           | Optional validator for selected times               |
| `error`              | `boolean \| string`                                                                             | `false`     | Error state or message                              |
| `errorMessage`       | `string`                                                                                        | -           | Error message text (alias)                          |
| `success`            | `boolean`                                                                                       | `false`     | Success state styling                               |
| `helperText`         | `string`                                                                                        | -           | Helper/description text below input                 |
| `label`              | `string`                                                                                        | -           | Input label text                                    |
| `onFormatChange`     | `(format: "12h" \| "24h") => void`                                                              | -           | Callback when format toggles                        |
| `renderTimeItem`     | `(value: number, type: "hour" \| "minute" \| "second", isSelected: boolean) => React.ReactNode` | -           | Custom renderer for individual time items           |
| `className`          | `string`                                                                                        | -           | Extra classes applied to root element               |

See `TimePicker.types.ts` for full type definitions and more advanced types (shortcuts, configs).

### Types

```ts
type TimeFormat = "12h" | "24h";

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

interface TimeRange {
  startTime: TimeValue | null;
  endTime: TimeValue | null;
}
```

## Localization

Use the `i18n` prop to select built-in locales (e.g. `en`, `es`, `fr`, `ja`, `zh`, etc.). Locale strings control labels such as AM/PM, shortcuts and button text.

### Supported locales

| Locale     | Code | AM   | PM   | Today       | Clear      | Apply        | Now        | Placeholder          | Separator | RTL |
| ---------- | ---- | ---- | ---- | ----------- | ---------- | ------------ | ---------- | -------------------- | --------- | --- |
| English    | `en` | AM   | PM   | Today       | Clear      | Apply        | Now        | Select time          | →         | no  |
| Spanish    | `es` | AM   | PM   | Hoy         | Limpiar    | Aplicar      | Ahora      | Seleccionar hora     | →         | no  |
| French     | `fr` | AM   | PM   | Aujourd'hui | Effacer    | Appliquer    | Maintenant | Sélectionner l'heure | →         | no  |
| German     | `de` | AM   | PM   | Heute       | Löschen    | Anwenden     | Jetzt      | Zeit auswählen       | →         | no  |
| Japanese   | `ja` | 午前 | 午後 | 今日        | クリア     | 適用         | 現在       | 時間を選択           | ～        | no  |
| Chinese    | `zh` | 上午 | 下午 | 今天        | 清除       | 确定         | 现在       | 选择时间             | 至        | no  |
| Korean     | `ko` | 오전 | 오후 | 오늘        | 지우기     | 적용         | 지금       | 시간 선택            | ~         | no  |
| Arabic     | `ar` | ص    | م    | اليوم       | مسح        | تطبيق        | الآن       | اختر الوقت           | ←         | yes |
| Hindi      | `hi` | AM   | PM   | आज          | साफ़       | लागू         | अभी        | समय चुनें            | →         | no  |
| Portuguese | `pt` | AM   | PM   | Hoje        | Limpar     | Aplicar      | Agora      | Selecionar hora      | →         | no  |
| Russian    | `ru` | AM   | PM   | Сегодня     | Очистить   | Применить    | Сейчас     | Выберите время       | →         | no  |
| Italian    | `it` | AM   | PM   | Oggi        | Cancella   | Applica      | Adesso     | Seleziona ora        | →         | no  |
| Bengali    | `bn` | এএম  | পিএম | আজ          | মুছে ফেলুন | প্রয়োগ করুন | এখন        | সময় নির্বাচন করুন   | →         | no  |

For full locale details and to add or customize locales, see `src/components/TimePicker/TimePicker.locales.ts`.

## Accessibility

The `TimePicker` includes keyboard navigation and ARIA-friendly markup. Please run platform-specific accessibility testing for your target users and assistive technologies.

## Notes

- Visual variants share tokens with `DatePicker` to ensure consistent styling across components.
- Manual input parsing is forgiving; for stricter control, pass a `validateTime` function or pre-validate input before calling `onChange`.

## See also

- `DatePicker` — date selection and combined date/time flows
