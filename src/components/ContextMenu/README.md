# ContextMenu

A context menu component triggered by right-click. Displays actions and options relevant to the clicked element.

## Features

- 🖱️ **Right-Click Trigger** - Opens on context menu event
- 📋 **Nested Menus** - Support for sub-menus
- ⌨️ **Keyboard Navigation** - Arrow keys and shortcuts
- 🎨 **Customizable** - Icons, separators, and styling
- ♿ **Accessible** - ARIA attributes and focus management

## Installation

\`\`\`tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from 'saha-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
<ContextMenu>
<ContextMenuTrigger>
<div>Right-click me</div>
</ContextMenuTrigger>
<ContextMenuContent>
<ContextMenuItem>Cut</ContextMenuItem>
<ContextMenuItem>Copy</ContextMenuItem>
<ContextMenuItem>Paste</ContextMenuItem>
</ContextMenuContent>
</ContextMenu>
\`\`\`

## Related Components

- **Dropdown** - Click-triggered menu
- **Menubar** - Top menu bar
- **Popover** - Positioned overlay
