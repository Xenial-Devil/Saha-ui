# PasswordInput

A specialized `Input` component appending a dynamic interactive icon toggle ("eye" icon) swapping between password masking bullets and revealing plaintext instantly.

## Installation

```tsx
import { PasswordInput } from 'saha-ui';
```

## Usage

### Simple Visible Mask

```tsx
import { PasswordInput } from "saha-ui";

export default function Example() {
  return (
    <PasswordInput 
      placeholder="Enter super secure password"
      variant="default"
      strengthIndicator={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strengthIndicator` | `boolean` | `false` | Measures character complexity natively showing colored horizontal tracks |
| `strength` | `0 \| 1 \| 2 \| 3 \| 4 \| 5` | - | Controlled variant forcing colored lengths visually explicitly |
| `variant` | `InputVariant` | `"default"` | Inherits standardized block styling parameters effectively |
| `size` | `InputSize` | `"md"` | Scales rendered fonts intuitively handling layouts cleanly |
| `disabled` | `boolean` | `false` | Locks interactions freezing state fully |
