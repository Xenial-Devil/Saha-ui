# FileInput

Replaces the default barebones unstyled HTML `<input type="file" />` with an esthetic block optionally rendering rich "Drag & Drop" zone patterns, file size validation, limits, and icon previews natively!

## Installation

```tsx
import { FileInput } from 'saha-ui';
```

## Usage

### Full Dropzone Field

```tsx
import { FileInput } from "saha-ui";

export default function Example() {
  return (
    <FileInput 
      variant="dropzone"
      multiple={true}
      accept="image/*"
      maxSize={5000000} // 5MB limit
      onChange={(files) => console.log(files)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "button" \| "dropzone"` | `"default"` | Completely redesigns element boundaries effectively |
| `onChange` | `(files: FileList \| null) => void` | - | Flushes standard JavaScript interface properties sequentially |
| `maxSize` | `number` | - | Generates runtime error limits denying file payloads physically |
| `multiple` | `boolean` | `false` | Configures attributes natively signaling browser dialog constraints properly |
| `accept` | `string` | - | Dictates MIME type blocking invalid extensions visually |
| `disabled` | `boolean` | `false` | Grays layouts disabling hovering actions absolutely |