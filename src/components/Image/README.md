# Image

An enhanced image component with lazy loading, fallbacks, aspect ratio support, and loading states.

## Features

- 🖼️ **Lazy Loading** - Intersection Observer support
- 🎨 **Aspect Ratio** - Maintain proportions
- 🔄 **Fallback** - Error state handling
- ✨ **Effects** - Blur, zoom, overlay
- 📱 **Responsive** - Srcset and sizes support
- ⚡ **Performance** - Optimized loading

## Installation

\`\`\`tsx
import { Image } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<Image
  src="/photo.jpg"
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
/>
\`\`\`

## Related Components

- **AspectRatio** - Aspect ratio container
- **Skeleton** - Loading placeholder
