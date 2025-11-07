# NavigationMenu

A complex navigation menu system with dropdown support.

## Features

- 🎯 **Multi-level Menus** - Nested navigation support
- ♿ **Accessible** - ARIA navigation pattern
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🎨 **Responsive** - Mobile-friendly design
- 🌗 **Dark Mode** - Full dark mode support
- 🎭 **Animated** - Smooth transitions

## Installation

\`\`\`bash
import { NavigationMenu } from '@saha-ui/components';
\`\`\`

## Basic Usage

\`\`\`tsx
import { NavigationMenu } from '@saha-ui/components';

function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/products/software">
            Software
          </NavigationMenuLink>
          <NavigationMenuLink href="/products/hardware">
            Hardware
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <NavigationMenuLink href="/about">
          About
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
\`\`\`

## Accessibility

- **Tab** - Navigate menu triggers
- **Arrow Keys** - Navigate menu items
- **Enter** - Activate link
- **Escape** - Close menu
- ARIA navigation pattern implemented

## Changelog

### v1.16.0
- Enhanced ARIA support
- Improved keyboard navigation
- Better accessibility
- Responsive improvements

---

**Need help?** Check the [component documentation](../README.md).
