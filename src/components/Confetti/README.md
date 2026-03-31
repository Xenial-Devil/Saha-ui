# Confetti

A high-performance HTML `<canvas>` based temporary confetti explosion effect.

## Installation

```tsx
import { Confetti } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { Confetti } from "saha-ui";
import { useState } from "react";

export default function Celebration() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Celebrate!</button>
      {show && <Confetti duration={3000} particleCount={150} />}
    </div>
  );
}
```

## Props

| Prop            | Type       | Default           | Description                                                           |
| --------------- | ---------- | ----------------- | --------------------------------------------------------------------- |
| `particleCount` | `number`   | `100`             | The number of standard confetti particles to emit.                    |
| `colors`        | `string[]` | `['#ff0a...'...]` | Array of hex color strings to select from.                            |
| `duration`      | `number`   | `3000`            | Total duration of the effect in milliseconds before canvas clears up. |
| `autoStart`     | `boolean`  | `true`            | Fire the component immediately upon mount.                            |
