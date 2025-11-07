# Command

A command palette component for quick actions and navigation. Provides fuzzy search, keyboard shortcuts, and grouped commands.

## Features

- 🔍 **Fuzzy Search** - Find commands quickly
- ⌨️ **Keyboard Shortcuts** - Full keyboard navigation
- 📁 **Grouped Commands** - Organize by categories
- 🎨 **Customizable** - Custom rendering and styling
- ⚡ **Fast** - Optimized for large command lists
- ♿ **Accessible** - ARIA compliant

## Installation

\`\`\`tsx
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<Command>
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem>New File</CommandItem>
      <CommandItem>Open File</CommandItem>
      <CommandItem>Save</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Navigation">
      <CommandItem>Go to Dashboard</CommandItem>
      <CommandItem>Go to Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
\`\`\`

## Related Components

- **Dialog** - Modal container for command palette
- **Input** - Search input field
- **Kbd** - Keyboard shortcut display
