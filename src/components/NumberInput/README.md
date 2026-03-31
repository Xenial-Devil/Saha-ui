# NumberInput

A specialized `Input` enforcing rigid numerical rules natively rendering increment (`+`) and decrement (`-`) trigger buttons alongside localized validation protocols preventing letters entirely.

## Installation

```tsx
import { NumberInput } from 'saha-ui';
```

## Usage

### Simple Quantity Selector

```tsx
import { NumberInput } from "saha-ui";
import { useState } from "react";

export default function Example() {
  const [val, setVal] = useState<number>(0);

  return (
    <NumberInput 
      value={val}
      onChangeValue={setVal}
      min={0}
      max={100}
      step={5}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Parsed explicit computational numeric value perfectly |
| `onChangeValue` | `(value: number) => void` | - | Replaces raw synthetic event handlers broadcasting filtered values smartly |
| `min` | `number` | `-Infinity` | Locks decrement boundaries cleanly preventing overflow perfectly |
| `max` | `number` | `Infinity` | Enforces maximal constraints globally naturally |
| `step` | `number` | `1` | Manipulations added consecutively adjusting increments accurately |
| `hideButtons` | `boolean` | `false` | Scraps bounding increment logic structurally hiding native nodes entirely |