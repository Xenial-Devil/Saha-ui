# ImageGallery

A fully interactive image grid incorporating lightbox (`Dialog`) zoom functionality. Automatically configures responsive CSS grids, lightbox rendering, thumbnails tracking, and prev/next looping interactions.

## Installation

```tsx
import { ImageGallery } from 'saha-ui';
```

## Usage

### Simple Image Gallery

```tsx
import { ImageGallery } from "saha-ui";

export default function Example() {
  const images = [
    { src: "/nature-1.jpg", alt: "Mountains", caption: "Rocky Mountains" },
    { src: "/nature-2.jpg", alt: "Forest", caption: "Amazon Forest" },
    { src: "/nature-3.jpg", alt: "Ocean" }
  ];

  return (
    <ImageGallery 
      images={images} 
      columns={{ sm: 2, md: 3, lg: 3 }} 
      gap="md" 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `GalleryImage[]` | - | Target source file collection mapping URLs inherently |
| `columns` | `number \| { sm?: number; md?: number; lg?: number; xl?: number }` | `3` | Tailored width layout scaling responsively per media query natively |
| `gap` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Internal grid cell padding padding mapped consistently across all children |
| `enableLightbox` | `boolean` | `true` | Allows triggering full screen immersive viewer immediately upon clicked selection |
| `showThumbnails` | `boolean` | `true` | Enables bottom slider pagination UI tracking current viewer iteration clearly |

### GalleryImage

```typescript
export interface GalleryImage {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  caption?: string;
  id?: string;
  onClick?: () => void;
}
```
