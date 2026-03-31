# FloatingToolbar

A highly visible, floating toolbar that hovers above the general content, wrapping a standard `ButtonGroup`. Perfect for rich text editors or contextual page actions.

## Installation

```tsx
import { FloatingToolbar } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { FloatingToolbar, Button } from "saha-ui";
import { Bold, Italic, Link } from "lucide-react";

export default function Editor() {
  return (
    <FloatingToolbar position="bottom">
      <Button variant="ghost" size="sm">
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Italic className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Link className="w-4 h-4" />
      </Button>
    </FloatingToolbar>
  );
}
```

## Props

| Prop               | Type                                     | Default     | Description                                                       |
| ------------------ | ---------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `position`         | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`  | Position of the floating toolbar relative to the screen.          |
| `buttonGroupProps` | `ButtonGroupProps`                       | `undefined` | Props to pass directly to the underlying `ButtonGroup` container. |
| `children`         | `React.ReactNode`                        | `undefined` | The buttons to render inside the toolbar.                         |
