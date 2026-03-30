# PhoneInput

A composite `Input` and `Popover` block allowing immediate prefix country resolution paired securely with a standard localized phone digit block.

## Installation

```tsx
import { PhoneInput } from 'saha-ui';
```

## Usage

### International Calling Code Lookup

```tsx
import { useState } from "react";
import { PhoneInput, PhoneNumber } from "saha-ui";

export default function Example() {
  const [phone, setPhone] = useState<PhoneNumber | null>({
    countryCode: "US",
    dialCode: "+1",
    number: "",
    formatted: ""
  });

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      defaultCountry="US"
      autoFormat={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `PhoneNumber \| null` | - | Synchronized state referencing country metrics dynamically |
| `onChange` | `(value: PhoneNumber \| null) => void` | - | Bubbles formatting transformations logically |
| `defaultCountry` | `string` | `"US"` | Bootstraps parsing context limiting global boundaries cleanly |
| `autoFormat` | `boolean` | `true` | Allows real-time string adjustments referencing standards fluidly |
| `variant` | `InputVariant` | `"default"` | Determines borders consistently globally mapping variants clearly |
| `size` | `InputSize` | `"md"` | Alters internal padding logically scaling appropriately |
| `disabled` | `boolean` | `false` | Inhibits editing interactions successfully halting execution securely |

### PhoneNumber

```typescript
export interface PhoneNumber {
  countryCode: string; // "US"
  dialCode: string;    // "+1"
  number: string;      // "12345678"
  formatted: string;   // "+1 123 456 78"
}
```
