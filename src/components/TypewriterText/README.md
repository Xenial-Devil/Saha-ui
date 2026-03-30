# TypewriterText

An animated text component that types out text character-by-character, optionally displaying a blinking cursor and looping.

## Installation

```tsx
import { TypewriterText } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { TypewriterText } from "saha-ui";

export default function Hero() {
  return (
    <TypewriterText
      text="Welcome to the future of UI."
      speed={60}
      variant="primary"
    />
  );
}
```

### Looping

```tsx
<TypewriterText text="This repeats endlessly..." loop={true} loopDelay={3000} />
```

## Props

The component extends `TypographyProps`.

| Prop        | Type      | Default  | Description                                      |
| ----------- | --------- | -------- | ------------------------------------------------ |
| `text`      | `string`  | required | The exact string to animate.                     |
| `speed`     | `number`  | `50`     | Ms delay between each rendered character.        |
| `loop`      | `boolean` | `false`  | Whether to restart animation after finishing.    |
| `loopDelay` | `number`  | `2000`   | Ms to wait before looping.                       |
| `cursor`    | `boolean` | `true`   | Whether to append the blinking pipe `\|` cursor. |
