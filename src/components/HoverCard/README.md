# HoverCard

A card component that appears on hover, perfect for displaying additional information about an element.

## Features

- 🎯 **Hover Trigger** - Opens on mouse hover
- ⏱️ **Delay** - Configurable open/close delays
- 📍 **Positioning** - Smart positioning
- 🎨 **Customizable** - Custom content and styling
- ♿ **Accessible** - Keyboard and screen reader support

## Installation

\`\`\`tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<HoverCard>
  <HoverCardTrigger>@username</HoverCardTrigger>
  <HoverCardContent>
    <div>
      <h4>John Doe</h4>
      <p>Software Developer</p>
    </div>
  </HoverCardContent>
</HoverCard>
\`\`\`

## Related Components

- **Tooltip** - Simple text tooltips
- **Popover** - Click-triggered overlay
- **Card** - Card container
