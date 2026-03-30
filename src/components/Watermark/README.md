# Watermark

A watermark overlay component that creates a repeating, rotated text background over any content, often used to indicate confidential or draft status.

## Installation

```tsx
import { Watermark } from "saha-ui";
```

## Usage

### Wrapping Content

```tsx
import { Watermark } from "saha-ui";

export default function Document() {
  return (
    <Watermark text="CONFIDENTIAL" opacity={0.1} rotate={-45}>
      <div className="p-8 bg-white min-h-[500px]">
        <h1>Top Secret Document</h1>
        <p>This information should not be shared outside the organization.</p>
      </div>
    </Watermark>
  );
}
```

### As an Absolute Overlay

If no children are provided, it generates an absolute overlay that will fill its relative parent.

```tsx
<div className="relative w-full h-96">
  <Watermark text="DRAFT" />
  <p>Content underneath...</p>
</div>
```

## Props

| Prop       | Type     | Default          | Description                                 |
| ---------- | -------- | ---------------- | ------------------------------------------- |
| `text`     | `string` | `"CONFIDENTIAL"` | The text to display as a watermark pattern. |
| `width`    | `number` | `240`            | Width of the invisible SVG repeating cell.  |
| `height`   | `number` | `240`            | Height of the invisible SVG repeating cell. |
| `color`    | `string` | `"currentColor"` | Font color.                                 |
| `fontSize` | `number` | `24`             | Size of the watermark font.                 |
| `rotate`   | `number` | `-30`            | Rotation angle of the text in degrees.      |
| `opacity`  | `number` | `0.05`           | Opacity of the watermark.                   |
| `zIndex`   | `number` | `10`             | Standard CSS z-index.                       |
