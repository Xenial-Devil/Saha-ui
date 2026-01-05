# Slider

A fully accessible slider component for selecting numeric values. Implements the WAI-ARIA slider pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🎯 **Range Selection** - Support for range sliders (two thumbs)
- 📊 **Value Display** - Show current value(s) with tooltips
- 🎚️ **Step Control** - Configurable step increments
- 🔢 **Min/Max Limits** - Set minimum and maximum values
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Home, End, Page Up/Down)
- 🎭 **Marks** - Display marks at specific values
- 🌗 **Dark Mode** - Automatic dark mode support
- 🔢 **Input Integration** - Optional number input sync
- ♿ **Vertical Orientation** - Support for vertical sliders

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Slider } from "saha-ui";

function App() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Volume"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
}
```

## Examples

### Variants

```tsx
<Slider label="Default" variant="default" />
<Slider label="Primary" variant="primary" />
<Slider label="Secondary" variant="secondary" />
<Slider label="Accent" variant="accent" />
<Slider label="Success" variant="success" />
<Slider label="Warning" variant="warning" />
<Slider label="Error" variant="error" />
```

### Sizes

```tsx
<Slider label="Small" size="sm" value={25} />
<Slider label="Medium" size="md" value={50} />
<Slider label="Large" size="lg" value={75} />
```

### With Steps

Define step increments:

```tsx
<Slider
  label="Price range"
  min={0}
  max={1000}
  step={50}
  value={value}
  onChange={setValue}
  helperText="Step: $50"
/>
```

### Range Slider

Select a range with two thumbs:

```tsx
function RangeExample() {
  const [range, setRange] = useState([20, 80]);

  return (
    <Slider
      label="Price range"
      range
      value={range}
      onChange={setRange}
      min={0}
      max={100}
      helperText={`Selected: $${range[0]} - $${range[1]}`}
    />
  );
}
```

### With Marks

Display marks at specific values:

```tsx
<Slider
  label="Rating"
  min={0}
  max={10}
  step={1}
  marks={[
    { value: 0, label: "0" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]}
  value={value}
  onChange={setValue}
/>
```

### With Custom Marks

```tsx
<Slider
  label="Temperature"
  min={-20}
  max={40}
  marks={[
    { value: -20, label: "Cold" },
    { value: 0, label: "Freezing" },
    { value: 20, label: "Comfortable" },
    { value: 40, label: "Hot" },
  ]}
  value={temp}
  onChange={setTemp}
/>
```

### Show Value Tooltip

Display current value in a tooltip:

```tsx
<Slider
  label="Volume"
  showTooltip
  value={volume}
  onChange={setVolume}
  formatTooltip={(value) => `${value}%`}
/>
```

### With Input Field

Sync with a number input:

```tsx
<Slider
  label="Quantity"
  showInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={100}
/>
```

### Vertical Orientation

```tsx
<Slider
  label="Volume"
  orientation="vertical"
  value={volume}
  onChange={setVolume}
  height={200}
/>
```

### Disabled State

```tsx
<Slider
  label="Disabled slider"
  value={50}
  disabled
  helperText="This slider is disabled"
/>
```

### With Custom Colors

```tsx
<Slider
  label="Progress"
  value={progress}
  onChange={setProgress}
  trackColor="bg-blue-200"
  fillColor="bg-blue-600"
  thumbColor="bg-blue-700"
/>
```

### Percentage Display

```tsx
<Slider
  label="Completion"
  min={0}
  max={100}
  value={completion}
  onChange={setCompletion}
  showValue
  formatValue={(value) => `${value}%`}
/>
```

### Temperature Control

```tsx
<Slider
  label="Thermostat"
  min={60}
  max={80}
  step={0.5}
  value={temperature}
  onChange={setTemperature}
  marks={[
    { value: 60, label: "60°F" },
    { value: 70, label: "70°F" },
    { value: 80, label: "80°F" },
  ]}
  showValue
  formatValue={(value) => `${value}°F`}
/>
```

### Volume Control

```tsx
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
  showTooltip
  formatTooltip={(value) => {
    if (value === 0) return "Muted";
    if (value < 30) return "Low";
    if (value < 70) return "Medium";
    return "High";
  }}
/>
```

### Price Range Filter

```tsx
function PriceFilter() {
  const [priceRange, setPriceRange] = useState([100, 500]);

  return (
    <Slider
      label="Price range"
      range
      min={0}
      max={1000}
      step={10}
      value={priceRange}
      onChange={setPriceRange}
      marks={[
        { value: 0, label: "$0" },
        { value: 500, label: "$500" },
        { value: 1000, label: "$1000" },
      ]}
      showValue
      formatValue={(values) => `$${values[0]} - $${values[1]}`}
    />
  );
}
```

### With Validation

```tsx
<Slider
  label="Required value"
  value={value}
  onChange={setValue}
  error={value < 50 ? "Value must be at least 50" : undefined}
  aria-invalid={value < 50}
/>
```

## Accessibility

### Keyboard Navigation

- **Arrow Left/Down**: Decrease value by step
- **Arrow Right/Up**: Increase value by step
- **Home**: Jump to minimum value
- **End**: Jump to maximum value
- **Page Down**: Decrease by large step (10% of range)
- **Page Up**: Increase by large step (10% of range)
- **Tab**: Move focus to/from slider

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated ARIA attributes
<Slider
  label="Volume control"
  min={0}
  max={100}
  value={50}
  helperText="Adjust the audio volume"
/>
// Automatically creates:
// - role="slider"
// - aria-valuemin, aria-valuemax, aria-valuenow
// - aria-valuetext for formatted values
// - aria-labelledby links to label
// - aria-describedby links to helperText
```

### Manual ARIA Labels

For sliders without visible labels:

```tsx
<Slider
  aria-label="Volume control"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
/>
```

### Value Text

Provide readable value descriptions:

```tsx
<Slider
  label="Priority"
  min={1}
  max={5}
  value={priority}
  onChange={setPriority}
  getAriaValueText={(value) => {
    const labels = ["Very Low", "Low", "Medium", "High", "Very High"];
    return labels[value - 1];
  }}
/>
```

### Range Slider Accessibility

```tsx
<Slider
  label="Price range"
  range
  value={[min, max]}
  onChange={setRange}
  aria-label="Price range selector"
  getAriaValueText={([min, max]) => `From $${min} to $${max}`}
/>
```

### Required Fields

```tsx
<Slider
  label="Required setting"
  required
  aria-required="true"
  error={!value ? "This field is required" : undefined}
/>
```

## API Reference

### Slider Props

| Prop                | Type                                                                                     | Default        | Description                               |
| ------------------- | ---------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- |
| `label`             | `string`                                                                                 | -              | Label text for the slider                 |
| `description`       | `string`                                                                                 | -              | Description text shown below the label    |
| `helperText`        | `string`                                                                                 | -              | Helper text shown below the slider        |
| `error`             | `string`                                                                                 | -              | Error message to display                  |
| `value`             | `number \| number[]`                                                                     | -              | Current value(s) (controlled)             |
| `defaultValue`      | `number \| number[]`                                                                     | -              | Default value(s) (uncontrolled)           |
| `onChange`          | `(value: number \| number[]) => void`                                                    | -              | Callback when value changes               |
| `onChangeCommitted` | `(value: number \| number[]) => void`                                                    | -              | Callback when slider interaction ends     |
| `min`               | `number`                                                                                 | `0`            | Minimum value                             |
| `max`               | `number`                                                                                 | `100`          | Maximum value                             |
| `step`              | `number`                                                                                 | `1`            | Step increment                            |
| `marks`             | `SliderMark[]`                                                                           | -              | Marks to display on the slider            |
| `range`             | `boolean`                                                                                | `false`        | Enable range selection (two thumbs)       |
| `orientation`       | `'horizontal' \| 'vertical'`                                                             | `'horizontal'` | Slider orientation                        |
| `variant`           | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'`    | Color variant                             |
| `size`              | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`         | Size of the slider                        |
| `disabled`          | `boolean`                                                                                | `false`        | Whether the slider is disabled            |
| `showTooltip`       | `boolean`                                                                                | `false`        | Show value tooltip on hover/drag          |
| `showValue`         | `boolean`                                                                                | `false`        | Show current value below slider           |
| `showInput`         | `boolean`                                                                                | `false`        | Show number input next to slider          |
| `formatTooltip`     | `(value: number) => string`                                                              | -              | Format tooltip value                      |
| `formatValue`       | `(value: number \| number[]) => string`                                                  | -              | Format display value                      |
| `getAriaValueText`  | `(value: number \| number[]) => string`                                                  | -              | Get ARIA value text                       |
| `height`            | `number \| string`                                                                       | `200`          | Height for vertical sliders               |
| `trackColor`        | `string`                                                                                 | -              | Custom track color class                  |
| `fillColor`         | `string`                                                                                 | -              | Custom fill color class                   |
| `thumbColor`        | `string`                                                                                 | -              | Custom thumb color class                  |
| `required`          | `boolean`                                                                                | `false`        | Whether value is required                 |
| `className`         | `string`                                                                                 | -              | Additional CSS classes                    |
| `aria-label`        | `string`                                                                                 | -              | Accessible label for screen readers       |
| `aria-labelledby`   | `string`                                                                                 | -              | ID of element that labels this slider     |
| `aria-describedby`  | `string`                                                                                 | -              | IDs of elements that describe this slider |
| `aria-required`     | `'true' \| 'false'`                                                                      | -              | Whether the slider is required            |
| `aria-invalid`      | `'true' \| 'false'`                                                                      | -              | Whether the slider has an error           |

### SliderMark

| Prop    | Type                  | Description                  |
| ------- | --------------------- | ---------------------------- |
| `value` | `number`              | Value position of the mark   |
| `label` | `string \| ReactNode` | Label to display at the mark |

## Best Practices

### 1. Provide Clear Labels

Always provide a descriptive label:

```tsx
// Good ✅
<Slider label="Volume level" min={0} max={100} />

// Bad ❌
<Slider min={0} max={100} />
```

### 2. Set Appropriate Step Values

Choose steps that make sense for your use case:

```tsx
// Good ✅ - Price in dollars
<Slider min={0} max={1000} step={10} />

// Bad ❌ - Too precise for prices
<Slider min={0} max={1000} step={0.01} />
```

### 3. Show Current Value

Help users understand the current selection:

```tsx
<Slider label="Brightness" showValue formatValue={(value) => `${value}%`} />
```

### 4. Use Marks for Important Values

```tsx
<Slider
  label="Priority"
  min={1}
  max={5}
  step={1}
  marks={[
    { value: 1, label: "Low" },
    { value: 3, label: "Medium" },
    { value: 5, label: "High" },
  ]}
/>
```

### 5. Provide Helper Text

Give context about the slider's purpose:

```tsx
<Slider
  label="File size limit"
  helperText="Maximum size for uploaded files"
  formatValue={(value) => `${value}MB`}
/>
```

### 6. Use Range Sliders for Filters

```tsx
<Slider
  label="Price range"
  range
  value={[minPrice, maxPrice]}
  onChange={setPriceRange}
  showValue
/>
```

### 7. Debounce Expensive Operations

```tsx
import { useDebouncedCallback } from "use-debounce";

const debouncedFilter = useDebouncedCallback(
  (value) => applyFilter(value),
  300
);

<Slider
  onChange={debouncedFilter}
  onChangeCommitted={applyFilter} // Final value immediately
/>;
```

### 8. Validate Values

```tsx
<Slider
  value={value}
  onChange={setValue}
  error={value < 10 ? "Minimum value is 10" : undefined}
/>
```

### 9. Use Tooltips for Precise Values

```tsx
<Slider showTooltip step={0.1} formatTooltip={(value) => value.toFixed(1)} />
```

### 10. Consider Vertical for Space-Constrained UIs

```tsx
<Slider orientation="vertical" height={150} label="Volume" />
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
        name="volume"
        control={control}
        rules={{
          required: "Volume is required",
          min: { value: 10, message: "Minimum volume is 10" },
        }}
        render={({ field, fieldState }) => (
          <Slider
            label="Volume"
            value={field.value}
            onChange={field.onChange}
            min={0}
            max={100}
            error={fieldState.error?.message}
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

function Form() {
  return (
    <Formik
      initialValues={{ brightness: 50 }}
      validate={(values) => {
        const errors: any = {};
        if (values.brightness < 20) {
          errors.brightness = "Brightness too low";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors }) => (
        <Slider
          label="Brightness"
          value={values.brightness}
          onChange={(value) => setFieldValue("brightness", value)}
          error={errors.brightness}
          min={0}
          max={100}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Audio Volume Control

```tsx
function AudioPlayer() {
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio.mp3" />
      <Slider
        label="Volume"
        value={volume}
        onChange={handleVolumeChange}
        min={0}
        max={100}
        showTooltip
        formatTooltip={(value) => (value === 0 ? "Muted" : `${value}%`)}
      />
    </>
  );
}
```

### Date Range Filter

```tsx
function DateRangeSlider() {
  const minDate = new Date("2020-01-01").getTime();
  const maxDate = new Date("2024-12-31").getTime();
  const [range, setRange] = useState([minDate, maxDate]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Slider
      label="Date range"
      range
      min={minDate}
      max={maxDate}
      step={86400000} // 1 day in milliseconds
      value={range}
      onChange={setRange}
      showValue
      formatValue={([start, end]) =>
        `${formatDate(start)} - ${formatDate(end)}`
      }
    />
  );
}
```

### RGB Color Picker

```tsx
function ColorPicker() {
  const [r, setR] = useState(128);
  const [g, setG] = useState(128);
  const [b, setB] = useState(128);

  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <div>
      <div style={{ background: color }} className="w-full h-20 rounded mb-4" />
      <Slider
        label="Red"
        value={r}
        onChange={setR}
        min={0}
        max={255}
        variant="error"
        showValue
      />
      <Slider
        label="Green"
        value={g}
        onChange={setG}
        min={0}
        max={255}
        variant="success"
        showValue
      />
      <Slider
        label="Blue"
        value={b}
        onChange={setB}
        min={0}
        max={255}
        variant="primary"
        showValue
      />
    </div>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { SliderProps, SliderMark } from "saha-ui";

const MySlider: React.FC<SliderProps> = (props) => {
  return <Slider {...props} />;
};

const marks: SliderMark[] = [
  { value: 0, label: "Min" },
  { value: 50, label: "Mid" },
  { value: 100, label: "Max" },
];
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Slider
  label="Custom styled"
  className="my-custom-class"
  trackColor="bg-gray-200"
  fillColor="bg-purple-500"
  thumbColor="bg-purple-700"
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Debounce onChange

For expensive operations, debounce the onChange callback:

```tsx
const debouncedChange = useDebouncedCallback(
  (value) => expensiveOperation(value),
  300
);

<Slider onChange={debouncedChange} />;
```

### 2. Use onChangeCommitted

For operations that should only run when dragging ends:

```tsx
<Slider
  onChange={setValue} // Fast local update
  onChangeCommitted={saveToServer} // Only when done
/>
```

## Comparison: Slider vs Input

| Use Case                  | Component          |
| ------------------------- | ------------------ |
| Numeric range selection   | **Slider**         |
| Precise numeric input     | Input (number)     |
| Volume/brightness control | **Slider**         |
| Price range filter        | **Slider** (range) |
| Entering specific values  | Input              |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Input](../Input/README.md) - For text/number input
- [Switch](../Switch/README.md) - For binary choices
- [Radio](../Radio/README.md) - For discrete options
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
