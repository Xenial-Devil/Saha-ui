# Resizable

A flexible resizable panel component built on `react-resizable-panels`. Create split layouts with draggable dividers for dashboards, editors, and multi-pane interfaces.

## Features

- ↔️ Horizontal and vertical layouts
- 🎨 10 visual variants
- 🔧 Min/max size constraints
- 💾 Layout persistence
- ⚡ Collapsible panels
- 🎯 Accessible drag handles
- 📱 Touch-friendly
- ⌨️ Keyboard resizing

## Installation

```bash
npm install saha-ui react-resizable-panels
```

## Basic Usage

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "saha-ui";

function App() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={20}>
        <div>Sidebar</div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={70}>
        <div>Main Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## Direction

```tsx
{
  /* Horizontal */
}
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanelGroup>;

{
  /* Vertical */
}
<ResizablePanelGroup direction="vertical">
  <ResizablePanel>Top</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Bottom</ResizablePanel>
</ResizablePanelGroup>;
```

## Variants

```tsx
<ResizablePanelGroup variant="primary">...</ResizablePanelGroup>
<ResizablePanelGroup variant="glass">...</ResizablePanelGroup>
<ResizablePanelGroup variant="outline">...</ResizablePanelGroup>
```

## With Handle Indicator

```tsx
<ResizableHandle withHandle />
```

## Common Patterns

### Code Editor Layout

```tsx
<ResizablePanelGroup direction="horizontal" className="h-screen">
  <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
    <FileTree />
  </ResizablePanel>

  <ResizableHandle withHandle />

  <ResizablePanel defaultSize={60}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={70}>
        <CodeEditor />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={30} minSize={15}>
        <Terminal />
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>

  <ResizableHandle withHandle />

  <ResizablePanel defaultSize={20} minSize={15} collapsible>
    <Properties />
  </ResizablePanel>
</ResizablePanelGroup>
```

### Dashboard Layout

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={25} minSize={20}>
    <Sidebar />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={60}>
        <MainChart />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={40}>
        <DataTable />
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>
```

## API Reference

### ResizablePanelGroup Props

| Prop        | Type                           | Default        | Description               |
| ----------- | ------------------------------ | -------------- | ------------------------- |
| `direction` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Panel direction           |
| `variant`   | `ResizableVariant`             | `"default"`    | Visual variant            |
| `id`        | `string`                       | -              | Unique ID for persistence |
| `className` | `string`                       | -              | CSS classes               |

### ResizablePanel Props

| Prop          | Type               | Default | Description               |
| ------------- | ------------------ | ------- | ------------------------- |
| `defaultSize` | `number`           | -       | Default size (percentage) |
| `minSize`     | `number`           | -       | Minimum size              |
| `maxSize`     | `number`           | -       | Maximum size              |
| `collapsible` | `boolean`          | `false` | Enable collapsing         |
| `variant`     | `ResizableVariant` | -       | Visual variant            |

### ResizableHandle Props

| Prop         | Type               | Default | Description           |
| ------------ | ------------------ | ------- | --------------------- |
| `withHandle` | `boolean`          | `true`  | Show handle indicator |
| `variant`    | `ResizableVariant` | -       | Visual variant        |

## TypeScript

```typescript
import type { ResizablePanelGroupProps } from "saha-ui";
```
