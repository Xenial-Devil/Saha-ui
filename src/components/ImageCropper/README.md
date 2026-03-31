# ImageCropper

Native client-side Canvas-based image editor designed for simple profile picture zoom, pan, and strict shape cropping operations (Rectangle & Circle).

## Installation

```tsx
import { ImageCropper } from 'saha-ui';
```

## Usage

### Simple Profile Cropper

```tsx
import { ImageCropper } from "saha-ui";

export default function Example() {
  const handleCrop = (file: File) => {
    console.log("Uploaded file size:", file.size);
  }

  return (
    <ImageCropper 
      src="/avatar-placeholder.jpg"
      shape="round"
      aspect={1}
      onCropComplete={handleCrop}
      zoomable={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Standard image URL mapped accurately plotting pixels safely |
| `aspect` | `number` | `1` | Strict ratio division modifying drawing rectangles fluidly |
| `shape` | `"rect" \| "round"` | `"rect"` | Generates clipping boundaries rendering masks seamlessly |
| `onCropComplete` | `(file: File) => void` | - | Dispatches extracted buffers asynchronously handling logic smartly |
| `zoomable` | `boolean` | `true` | Allows mouse-wheel and embedded slider usage smoothly |
| `quality` | `number` | `0.92` | WebP/JPEG encoding constraints reducing output bloat easily |
