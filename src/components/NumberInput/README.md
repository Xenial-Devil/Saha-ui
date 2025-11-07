# NumberInput

A specialized numeric input component with increment/decrement controls, formatting options, and comprehensive validation.

## Installation

```tsx
import { NumberInput } from '@saha-ui/components';
```

## Usage

### Basic NumberInput

```tsx
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <NumberInput
      value={value}
      onChange={setValue}
    />
  );
}
```

### Variants

The NumberInput component supports 3 visual variants:

```tsx
<NumberInput variant="outline" value={10} onChange={setValue} />
<NumberInput variant="filled" value={20} onChange={setValue} />
<NumberInput variant="unstyled" value={30} onChange={setValue} />
```

### Sizes

```tsx
<NumberInput size="sm" value={10} onChange={setValue} />
<NumberInput size="md" value={20} onChange={setValue} />
<NumberInput size="lg" value={30} onChange={setValue} />
```

### Min and Max

Set minimum and maximum allowed values:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>
```

### Step Increment

Control how much the value changes with each increment/decrement:

```tsx
// Increment by 1 (default)
<NumberInput value={value} onChange={setValue} step={1} />

// Increment by 5
<NumberInput value={value} onChange={setValue} step={5} />

// Increment by 0.1 for decimals
<NumberInput value={value} onChange={setValue} step={0.1} />
```

### Precision

Set the number of decimal places to display:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  precision={2}
/>
```

### Currency Input

Create currency inputs with prefix and formatting:

```tsx
<NumberInput
  value={price}
  onChange={setPrice}
  prefix="$"
  thousandsSeparator=","
  precision={2}
  min={0}
  step={0.01}
/>
```

### Percentage Input

```tsx
<NumberInput
  value={percentage}
  onChange={setPercentage}
  suffix="%"
  min={0}
  max={100}
  step={5}
/>
```

### Thousands Separator

Format large numbers with thousands separators:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  thousandsSeparator=","
/>
```

### Custom Decimal Separator

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  decimalSeparator=","
  thousandsSeparator="."
/>
```

### Disable Negative Numbers

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  allowNegative={false}
  min={0}
/>
```

### Disable Decimals

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  allowDecimal={false}
/>
```

### Controls Position

Change the position of increment/decrement buttons:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  controlsPosition="left"
/>

<NumberInput
  value={value}
  onChange={setValue}
  controlsPosition="right"
/>
```

### Hide Controls

Hide the increment/decrement buttons:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  hideControls
/>
```

### Clamp Behavior

Control how values are clamped to min/max:

```tsx
// Clamp on blur (default) - allows typing out of range, corrects on blur
<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  clampBehavior="blur"
/>

// Strict - prevents typing out of range
<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  clampBehavior="strict"
/>

// None - no clamping
<NumberInput
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  clampBehavior="none"
/>
```

### With Icons

```tsx
import { DollarSignIcon, TrendingUpIcon } from 'lucide-react';

<NumberInput
  value={value}
  onChange={setValue}
  startIcon={<DollarSignIcon className="w-4 h-4" />}
/>

<NumberInput
  value={value}
  onChange={setValue}
  endIcon={<TrendingUpIcon className="w-4 h-4" />}
/>
```

### Custom Controls Icons

```tsx
import { PlusIcon, MinusIcon } from 'lucide-react';

<NumberInput
  value={value}
  onChange={setValue}
  incrementIcon={<PlusIcon className="w-4 h-4" />}
  decrementIcon={<MinusIcon className="w-4 h-4" />}
/>
```

### Disabled and Read-only

```tsx
<NumberInput value={value} onChange={setValue} disabled />
<NumberInput value={value} onChange={setValue} readOnly />
```

### Error State

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  error
/>
```

### Uncontrolled

```tsx
<NumberInput
  defaultValue={50}
  min={0}
  max={100}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| undefined` | - | Current value (controlled) |
| `defaultValue` | `number` | - | Default value (uncontrolled) |
| `onChange` | `(value: number \| undefined) => void` | - | Callback when value changes |
| `min` | `number` | - | Minimum allowed value |
| `max` | `number` | - | Maximum allowed value |
| `step` | `number` | `1` | Step increment/decrement value |
| `precision` | `number` | - | Number of decimal places to format |
| `variant` | `'outline' \| 'filled' \| 'unstyled'` | `'outline'` | Variant style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `error` | `boolean` | `false` | Whether the input has an error state |
| `hideControls` | `boolean` | `false` | Whether to hide the control buttons |
| `controlsPosition` | `'right' \| 'left'` | `'right'` | Position of control buttons |
| `thousandsSeparator` | `string` | - | Format number with thousands separator |
| `decimalSeparator` | `string` | `'.'` | Decimal separator |
| `prefix` | `string` | - | Prefix to display |
| `suffix` | `string` | - | Suffix to display |
| `allowNegative` | `boolean` | `true` | Allow negative values |
| `allowDecimal` | `boolean` | `true` | Allow decimal values |
| `clampBehavior` | `'blur' \| 'strict' \| 'none'` | `'blur'` | Clamp value on blur to min/max bounds |
| `incrementIcon` | `ReactNode` | - | Custom icon for increment button |
| `decrementIcon` | `ReactNode` | - | Custom icon for decrement button |
| `startIcon` | `ReactNode` | - | Start icon |
| `endIcon` | `ReactNode` | - | End icon |
| `wrapperClassName` | `string` | - | Additional class for wrapper |
| `controlsClassName` | `string` | - | Additional class for controls |
| `className` | `string` | - | Additional CSS classes for input |

## Examples

### Price Input

```tsx
function PriceInput() {
  const [price, setPrice] = useState<number>(19.99);

  return (
    <NumberInput
      value={price}
      onChange={setPrice}
      prefix="$"
      thousandsSeparator=","
      precision={2}
      min={0}
      step={0.01}
      placeholder="0.00"
    />
  );
}
```

### Quantity Selector

```tsx
function QuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <NumberInput
      value={quantity}
      onChange={setQuantity}
      min={1}
      max={99}
      step={1}
      hideControls={false}
    />
  );
}
```

### Weight Input (with unit conversion)

```tsx
function WeightInput() {
  const [weight, setWeight] = useState<number>(0);
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');

  const handleChange = (value: number | undefined) => {
    setWeight(value ?? 0);
  };

  return (
    <div className="flex gap-2">
      <NumberInput
        value={weight}
        onChange={handleChange}
        suffix={unit}
        precision={2}
        min={0}
        step={0.1}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')}>
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
    </div>
  );
}
```

### Rating Input

```tsx
function RatingInput() {
  const [rating, setRating] = useState<number>(0);

  return (
    <NumberInput
      value={rating}
      onChange={setRating}
      min={0}
      max={5}
      step={0.5}
      precision={1}
      suffix="/5"
    />
  );
}
```

### Temperature Input

```tsx
function TemperatureInput() {
  const [temp, setTemp] = useState<number>(20);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  return (
    <NumberInput
      value={temp}
      onChange={setTemp}
      suffix={`°${unit}`}
      precision={1}
      allowNegative
      step={0.5}
    />
  );
}
```

### Age Input

```tsx
<NumberInput
  value={age}
  onChange={setAge}
  min={0}
  max={120}
  step={1}
  allowDecimal={false}
  suffix=" years"
/>
```

### Discount Input

```tsx
<NumberInput
  value={discount}
  onChange={setDiscount}
  prefix="- "
  suffix="%"
  min={0}
  max={100}
  step={5}
  precision={0}
/>
```

## Keyboard Shortcuts

- **Arrow Up**: Increment value by step
- **Arrow Down**: Decrement value by step
- **Page Up**: Increment value by step × 10
- **Page Down**: Decrement value by step × 10
- **Home**: Set to minimum value
- **End**: Set to maximum value

## Accessibility

- **ARIA Labels**: Proper labeling for increment/decrement buttons
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Screen Reader Support**: Announces current value and limits
- **Disabled State**: Properly disables buttons when min/max reached
- **Focus Management**: Clear focus indicators

## Styling

The NumberInput component uses CVA (Class Variance Authority) for styling. Customize it:

```tsx
<NumberInput
  value={value}
  onChange={setValue}
  className="custom-input"
  wrapperClassName="custom-wrapper"
  controlsClassName="custom-controls"
/>
```

## Best Practices

1. **Set appropriate min/max**: Prevent invalid values with constraints
2. **Use proper step values**: Match step to your precision (e.g., 0.01 for currency)
3. **Add labels**: Always label inputs for accessibility
4. **Show units**: Use prefix/suffix to clarify what the number represents
5. **Format for readability**: Use thousands separators for large numbers
6. **Consider clamp behavior**: Choose appropriate clamping for your use case
7. **Validate on submit**: Always validate on form submission, not just in the input

## Common Patterns

### Form Integration

```tsx
import { useForm } from 'react-hook-form';

function OrderForm() {
  const { register, watch, setValue } = useForm();
  const quantity = watch('quantity');

  return (
    <form>
      <NumberInput
        value={quantity}
        onChange={(val) => setValue('quantity', val)}
        min={1}
        max={100}
      />
    </form>
  );
}
```

### With Validation

```tsx
function ValidatedNumberInput() {
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState(false);

  const handleChange = (val: number | undefined) => {
    setValue(val ?? 0);
    if (val !== undefined && val < 10) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <NumberInput
        value={value}
        onChange={handleChange}
        error={error}
        min={0}
      />
      {error && <p className="text-red-500 text-sm mt-1">Value must be at least 10</p>}
    </div>
  );
}
```

## Related Components

- [Input](../Input/README.md) - Text input component
- [Slider](../Slider/README.md) - Range slider for numeric values
- [Select](../Select/README.md) - Dropdown selection
- [Field](../Field/README.md) - Form field wrapper

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)