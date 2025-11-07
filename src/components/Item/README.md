# Item

A generic list item component with support for icons, actions, and various layouts.

## Features

- 🎨 **Flexible Layout** - Start/end content slots
- 🖼️ **Media Support** - Icons, avatars, thumbnails
- 🎯 **Actions** - Secondary actions and buttons
- 📱 **Responsive** - Mobile-optimized
- ♿ **Accessible** - Proper semantics

## Installation

\`\`\`tsx
import { Item } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<Item
  startContent={<Avatar src="/user.jpg" />}
  title="John Doe"
  description="Software Developer"
  endContent={<ChevronRight />}
/>
\`\`\`

## Related Components

- **List** - List container
- **Card** - Card container
