# SpotlightSearch

A system-wide modal search experience visually mimicking macOS Spotlight or standard application command palettes. Composes the internal `Dialog` and `Command` component structures.

## Installation

```tsx
import { SpotlightSearch } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { SpotlightSearch } from "saha-ui";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Search (Cmd+K)</button>

      <SpotlightSearch open={open} onOpenChange={setOpen}>
        {/* Pass your Command groups here, or leave empty if driving via data prop */}
      </SpotlightSearch>
    </>
  );
}
```

_Note: The component automatically listens for `Cmd+K` / `Ctrl+K` keyboard shortcuts internally when rendered._

## Props

| Prop           | Type                                       | Default                         | Description                                                                                               |
| -------------- | ------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `open`         | `boolean`                                  | `undefined`                     | Controlled open state.                                                                                    |
| `onOpenChange` | `(open: boolean) => void`                  | `undefined`                     | Controlled state setter callback.                                                                         |
| `data`         | `Array<{ heading: string, items: [...] }>` | `[]`                            | Simple data structure to auto-render results if you don't wanna pass native `<CommandGroup>` react nodes. |
| `placeholder`  | `string`                                   | `"Type a command or search..."` | Default input placeholder.                                                                                |
