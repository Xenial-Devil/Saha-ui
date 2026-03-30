# OTPDisplayBlock

A high-level wrapper block for standard One-Time Password inputs. Under the hood, this wraps the core `InputOTP` functionality into an effortless pre-styled block component layout with error and label states handled implicitly.

## Installation

```tsx
import { OTPDisplayBlock } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { OTPDisplayBlock } from "saha-ui";
import { useState } from "react";

export default function Verification() {
  const [otp, setOtp] = useState("");

  return (
    <OTPDisplayBlock
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={(val) => console.log("Finished typing:", val)}
      error={otp.length === 6 && otp !== "123456" ? "Invalid code" : undefined}
    />
  );
}
```

## Props

The component accepts standard `HTMLAttributes<HTMLDivElement>` minus `onChange`, plus:

| Prop         | Type                    | Default     | Description                                                                                 |
| ------------ | ----------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `value`      | `string`                | `undefined` | The controlled input state value.                                                           |
| `length`     | `number`                | `6`         | Number of character slots to emit. Splits nicely in the middle for even lengths > 3.        |
| `onChange`   | `(val: string) => void` | `undefined` | Fired when value modifies.                                                                  |
| `onComplete` | `(val: string) => void` | `undefined` | Fired exactly when the `length` requirement is hit.                                         |
| `error`      | `string`                | `undefined` | Localized error string. If present, renders a red error text organically beneath the block. |
| `secure`     | `boolean`               | `false`     | Visual password-masking property to hide standard characters.                               |
