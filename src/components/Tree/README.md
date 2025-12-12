# Tree

A hierarchical tree component for displaying nested data structures like file systems, organization charts, or navigation menus.

## Features

- 🌳 Nested hierarchical structure
- 🎨 4 visual variants (default, glass, bordered, minimal)
- 📏 8 size options (xs to 4xl)
- 🎯 Custom icons
- 📍 Icon positioning (left/right)
- 📊 Show/hide connecting lines
- 🔄 Expandable/collapsible nodes
- ♿ Keyboard navigation
- 📱 Responsive design

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Tree, TreeItem } from "saha-ui";

function FileTree() {
  return (
    <Tree>
      <TreeItem label="Documents">
        <TreeItem label="Work">
          <TreeItem label="report.pdf" />
          <TreeItem label="presentation.pptx" />
        </TreeItem>
        <TreeItem label="Personal">
          <TreeItem label="photos.zip" />
        </TreeItem>
      </TreeItem>
      <TreeItem label="Downloads" />
    </Tree>
  );
}
```

## Variants

```tsx
<Tree variant="default">...</Tree>
<Tree variant="glass">...</Tree>
<Tree variant="bordered">...</Tree>
<Tree variant="minimal">...</Tree>
```

## With Icons

```tsx
import { Folder, File, Image } from "lucide-react";

<Tree showIcons>
  <TreeItem label="Projects" icon={<Folder />}>
    <TreeItem label="index.tsx" icon={<File />} />
    <TreeItem label="logo.png" icon={<Image />} />
  </TreeItem>
</Tree>;
```

## Connecting Lines

```tsx
<Tree showLines>
  <TreeItem label="Root">
    <TreeItem label="Child 1">
      <TreeItem label="Grandchild" />
    </TreeItem>
  </TreeItem>
</Tree>
```

## Controlled Expansion

```tsx
function ControlledTree() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Tree>
      <TreeItem label="Folder" expanded={expanded} onToggle={setExpanded}>
        <TreeItem label="File 1" />
        <TreeItem label="File 2" />
      </TreeItem>
    </Tree>
  );
}
```

## Common Patterns

### File System

```tsx
<Tree variant="bordered" showLines showIcons>
  <TreeItem label="src" icon={<Folder />}>
    <TreeItem label="components" icon={<Folder />}>
      <TreeItem label="Button.tsx" icon={<File />} />
      <TreeItem label="Card.tsx" icon={<File />} />
    </TreeItem>
    <TreeItem label="utils" icon={<Folder />}>
      <TreeItem label="helpers.ts" icon={<File />} />
    </TreeItem>
  </TreeItem>
  <TreeItem label="package.json" icon={<File />} />
</Tree>
```

### Organization Chart

```tsx
<Tree variant="glass" iconPosition="left">
  <TreeItem label="CEO" icon={<User />}>
    <TreeItem label="CTO" icon={<User />}>
      <TreeItem label="Dev Team Lead" icon={<User />}>
        <TreeItem label="Developer 1" icon={<User />} />
        <TreeItem label="Developer 2" icon={<User />} />
      </TreeItem>
    </TreeItem>
    <TreeItem label="CFO" icon={<User />}>
      <TreeItem label="Accountant" icon={<User />} />
    </TreeItem>
  </TreeItem>
</Tree>
```

## API Reference

### Tree Props

| Prop           | Type                                                    | Default     | Description           |
| -------------- | ------------------------------------------------------- | ----------- | --------------------- |
| `variant`      | `"default"` \| `"glass"` \| `"bordered"` \| `"minimal"` | `"default"` | Visual style          |
| `size`         | `TreeSize`                                              | `"md"`      | Size                  |
| `iconPosition` | `"left"` \| `"right"`                                   | `"left"`    | Icon position         |
| `showLines`    | `boolean`                                               | `false`     | Show connecting lines |
| `showIcons`    | `boolean`                                               | `false`     | Show icons            |
| `className`    | `string`                                                | -           | CSS classes           |

### TreeItem Props

| Prop        | Type                          | Default | Description           |
| ----------- | ----------------------------- | ------- | --------------------- |
| `label`     | `ReactNode`                   | -       | Node label (required) |
| `icon`      | `ReactNode`                   | -       | Custom icon           |
| `expanded`  | `boolean`                     | -       | Controlled expansion  |
| `disabled`  | `boolean`                     | `false` | Disabled state        |
| `onToggle`  | `(expanded: boolean) => void` | -       | Toggle callback       |
| `className` | `string`                      | -       | CSS classes           |

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Space)
- ARIA tree roles and states
- Focus management
- Screen reader support

## TypeScript

```typescript
import type { TreeProps, TreeItemProps } from "saha-ui";
```
