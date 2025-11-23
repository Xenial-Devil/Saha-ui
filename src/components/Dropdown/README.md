# Dropdown

A dropdown menu component for displaying a list of actions or options. Supports nested menus, icons, and keyboard navigation.

## Features

- 📋 **Menu Items** - Text, icons, and shortcuts
- 🔗 **Nested Menus** - Sub-menu support
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🎯 **Positioning** - Smart positioning and collision detection
- 🎨 **Variants** - Multiple visual styles
- ♿ **Accessible** - ARIA compliant

## Installation

\`\`\`tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>
\`\`\`

## Related Components

- **ContextMenu** - Right-click menu
- **Select** - Form select dropdown
- **Popover** - General purpose overlay
