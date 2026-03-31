# SearchInput

A specialized `Input` component enforcing fixed left-sided magnifying-glass icons and optional clear ("x") right-sided icons explicitly utilized for search querying layouts natively.

## Installation

```tsx
import { SearchInput } from 'saha-ui';
```

## Usage

### Debounced Query Input

```tsx
import { SearchInput } from "saha-ui";

export default function Example() {
  return (
    <SearchInput 
      placeholder="Find documents..."
      onClear={() => console.log('Emptied search value!')}
      debounce={300}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `debounce` | `number` | `0` | Milliseconds delayed sequentially halting callback flooding strictly |
| `onClear` | `() => void` | - | Flushes rendering text inputs completely instantly seamlessly |
| `isLoading` | `boolean` | `false` | Mutates trailing icon substituting spinner logic properly |
| `variant` | `InputVariant` | `"default"` | Inherited native text-rendering visual structures |
| `size` | `InputSize` | `"md"` | Manipulates standard structural width buffers effortlessly |
