# MultiSelect

Wraps our native `Select` implementation explicitly restricting and injecting multi-selection parameters enabling tag tracking, "Select All" global switches, and max-element cap constraints.

## Installation

```tsx
import { MultiSelect, SelectItem } from 'saha-ui';
```

## Usage

### Simple Tags Selection

```tsx
import { MultiSelect, SelectItem } from "saha-ui";
import { useState } from "react";

export default function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MultiSelect
      value={selected}
      onValueChange={setSelected}
      placeholder="Select toppings..."
      showSelectAll={true}
      maxSelections={3}
    >
      <SelectItem value="cheese">Cheese</SelectItem>
      <SelectItem value="pepperoni">Pepperoni</SelectItem>
      <SelectItem value="olives">Olives</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </MultiSelect>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Controlled array capturing current selection state mapping `SelectItem` values |
| `onValueChange` | `(value: string[]) => void` | - | Broadcasts exact replacement array identically upon toggle clicking logically |
| `placeholder` | `string` | - | Displayed dynamically tracking completely empty sets implicitly |
| `maxSelections` | `number` | - | Limits rendering additions disabling further unselected triggers seamlessly |
| `showSelectAll` | `boolean` | `false` | Injects global toggle capturing iterative values efficiently |
| `variant` | `SelectVariant` | `"default"` | Inherits standard visual mapping padding correctly |
| `size` | `SelectSize` | `"md"` | Expands inputs and dropdown nodes intelligently |
| `disabled` | `boolean` | `false` | Pauses interactions locking UI state safely |
