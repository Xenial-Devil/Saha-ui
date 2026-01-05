# FloatingActionButton (FAB)

A floating action button component that stays fixed on screen for primary actions. Common in mobile interfaces.

## Features

- 📍 **Fixed Position** - Stays visible while scrolling
- 🎨 **Variants** - Multiple sizes and colors
- ✨ **Extended** - Text label support
- 🎯 **Positioning** - Corner positioning options
- ♿ **Accessible** - Proper ARIA labels

## Installation

\`\`\`tsx
import { FloatingActionButton } from 'saha-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
<FloatingActionButton onClick={() => console.log('Clicked')}>
<Plus className="h-6 w-6" />
</FloatingActionButton>
\`\`\`

## Related Components

- **Button** - Regular button
- **IconButton** - Icon-only button
- **SpeedDial** - Multiple FABs
