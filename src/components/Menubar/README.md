# Menubar

A horizontal menu bar component with dropdown menus.

## Features

- 🎯 **Dropdown Menus** - Multi-level menu support
- ♿ **Accessible** - Full ARIA menubar pattern
- ⌨️ **Keyboard Navigation** - Arrow keys, Enter, Escape
- 🎨 **Customizable** - Multiple variants and sizes
- 🌗 **Dark Mode** - Full dark mode support

## Installation

\`\`\`bash
import { Menubar } from '@saha-ui/components';
\`\`\`

## Basic Usage

\`\`\`tsx
import { Menubar } from '@saha-ui/components';

function AppMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
\`\`\`

## Accessibility

- **Arrow Keys** - Navigate between menu items
- **Enter/Space** - Activate menu item
- **Escape** - Close menu
- **Tab** - Move between menu triggers
- ARIA menubar pattern implemented

## Changelog

### v1.16.0
- Enhanced ARIA support
- Improved keyboard navigation
- Better accessibility

---

**Need help?** Check the [component documentation](../README.md).
