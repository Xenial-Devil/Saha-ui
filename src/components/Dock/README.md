# Dock & DockIcon

An animated context menu similar to the macOS Dock. The children (`DockIcon`) organically magnify based on cursor proximity physics.

## Installation

```tsx
import { Dock, DockIcon } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { Dock, DockIcon } from "saha-ui";
import { Home, Settings, User } from "lucide-react";

export default function AppDock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <Dock magnification={60} baseSize={40} distance={140}>
        <DockIcon>
          <Home />
        </DockIcon>
        <DockIcon>
          <Settings />
        </DockIcon>
        <DockIcon>
          <User />
        </DockIcon>
      </Dock>
    </div>
  );
}
```

## Props

### Dock Props

| Prop            | Type     | Default | Description                                           |
| --------------- | -------- | ------- | ----------------------------------------------------- |
| `magnification` | `number` | `60`    | Maximum pixel size when hovering.                     |
| `distance`      | `number` | `140`   | Required cursor distance in px before scaling starts. |
| `baseSize`      | `number` | `40`    | Default icon size in pixels.                          |

### DockIcon Props

Receives scaling contexts passively from the parent `Dock`. No manual props are required.
