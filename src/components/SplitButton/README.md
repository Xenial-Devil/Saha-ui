# SplitButton

A `SplitButton` composes a `Button` and a `Dropdown` menu into a single `ButtonGroup`. It is commonly used for displaying a primary action with a secondary list of linked options.

## Installation

```tsx
import { SplitButton } from 'saha-ui';
```

## Usage

### Basic SplitButton

```tsx
import { SplitButton } from "saha-ui";

export default function Example() {
  const actions = [
    { label: "Deploy to Staging", onClick: () => console.log("Staging") },
    { label: "Deploy to Prod", onClick: () => console.log("Prod") }
  ];

  return (
    <SplitButton 
      onClick={() => console.log("Default deploy action")}
      actions={actions}
      variant="primary"
    >
      Deploy
    </SplitButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | - | The main action callback when the left side of the button is clicked |
| `children` | `ReactNode` | - | The label rendered on the left main action |
| `actions` | `SplitButtonAction[]` | - | The dropdown action definitions rendered in the secondary menu |
| `dropdownIcon` | `ReactNode` | `<ChevronDownIcon />` | Custom icon element representing the dropdown toggle right side |
| `variant` | `ButtonVariant` | `"primary"` | Extends standard `Button` variant |
| `size` | `ButtonSize` | `"md"` | Extends standard `Button` size component globally |
| `disabled` | `boolean` | `false` | Disables both buttons seamlessly |

### SplitButtonAction

```typescript
export interface SplitButtonAction {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
```
