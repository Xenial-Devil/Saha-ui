# Command Component - Quick Reference

## Installation

```bash
npm install saha-ui
```

## Import

```typescript
// Component API
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "saha-ui";

// Types
import type { CommandProps, CommandItem, CommandGroup } from "saha-ui";
```

## Basic Usage

### Component API (Recommended for complex UIs)

```tsx
function App() {
  const [value, setValue] = useState("");

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="new" icon={<Plus />} shortcut="⌘N">
            New File
          </CommandItem>
          <CommandItem value="open" icon={<Folder />}>
            Open
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Props API (Quick implementation)

```tsx
const items = [
  { value: "new", label: "New", icon: <Plus />, shortcut: "⌘N" },
  { value: "open", label: "Open", icon: <Folder /> },
];

<Command
  items={items}
  onSelect={(value) => handleAction(value)}
  placeholder="Search..."
/>;
```

## Props Reference

### Command (Main Container)

#### Component API Mode

```typescript
interface CommandPropsComponent {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string) => number;
  loading?: boolean;
  variant?: CommandVariant;
  size?: CommandSize;
  className?: string;
}
```

#### Props API Mode

```typescript
interface CommandPropsItems {
  items: CommandItem[] | CommandGroup[];
  onSelect?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  // ... same variant, size, className
}
```

### CommandInput

```typescript
interface CommandInputProps {
  placeholder?: string;
  className?: string;
}
```

### CommandItem

```typescript
interface CommandItemProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  shortcut?: string | string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
  className?: string;
}
```

### CommandGroup

```typescript
interface CommandGroupProps {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}
```

## Keyboard Shortcuts

| Key     | Action                  |
| ------- | ----------------------- |
| `↓`     | Move to next item       |
| `↑`     | Move to previous item   |
| `Enter` | Select highlighted item |
| `Esc`   | Clear search            |

## Variants

```typescript
type CommandVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost"
  | "glass"
  | "outline";
```

### Examples

```tsx
<Command variant="primary" />
<Command variant="glass" />
<Command variant="outline" />
```

## Sizes

```typescript
type CommandSize = "sm" | "md" | "lg";
```

```tsx
<Command size="sm" />  // Compact
<Command size="md" />  // Default
<Command size="lg" />  // Spacious
```

## Advanced Examples

### With Icons and Shortcuts

```tsx
<CommandItem
  value="save"
  icon={<Save className="w-4 h-4" />}
  shortcut={["⌘", "S"]}
  onSelect={handleSave}
>
  Save File
</CommandItem>
```

### With Descriptions

```tsx
<CommandItem
  value="upload"
  icon={<Upload />}
  description="Upload files to cloud storage"
  shortcut="⌘U"
>
  Upload Files
</CommandItem>
```

### Grouped Commands

```tsx
<Command>
  <CommandInput />
  <CommandList>
    <CommandGroup heading="File">
      <CommandItem value="new">New</CommandItem>
      <CommandItem value="open">Open</CommandItem>
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="Edit">
      <CommandItem value="copy">Copy</CommandItem>
      <CommandItem value="paste">Paste</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Loading State

```tsx
const [loading, setLoading] = useState(false);

<Command loading={loading}>
  <CommandInput />
  <CommandList>
    <CommandLoading>Searching...</CommandLoading>
    <CommandEmpty>No results</CommandEmpty>
    <CommandGroup>{/* items */}</CommandGroup>
  </CommandList>
</Command>;
```

### Custom Filter

```tsx
const customFilter = (value: string, search: string) => {
  // Return 0-1 score
  return value.toLowerCase().startsWith(search.toLowerCase()) ? 1 : 0;
};

<Command filter={customFilter}>{/* ... */}</Command>;
```

### Disabled Items

```tsx
<CommandItem value="premium" disabled>
  Premium Feature (Pro only)
</CommandItem>
```

## Styling

### Custom Classes

```tsx
<Command className="max-w-md mx-auto shadow-xl">
  <CommandInput className="text-lg" />
  <CommandList className="max-h-96">
    <CommandItem className="py-4">Large Item</CommandItem>
  </CommandList>
</Command>
```

### Variant Combinations

```tsx
// Primary with glass effect
<Command variant="primary" className="glass" />

// Error with outline
<Command variant="error" className="border-2" />
```

## Common Patterns

### Application Command Palette

```tsx
function AppCommandPalette() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Command value={value} onValueChange={setValue}>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            {/* Your commands */}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

### Quick Actions Menu

```tsx
const actions = [
  { value: "new", label: "New", icon: <Plus />, shortcut: "⌘N" },
  { value: "save", label: "Save", icon: <Save />, shortcut: "⌘S" },
];

<Command
  items={actions}
  onSelect={(action) => {
    switch (action) {
      case "new":
        handleNew();
        break;
      case "save":
        handleSave();
        break;
    }
  }}
  variant="primary"
  size="sm"
/>;
```

### Search with Async Loading

```tsx
function AsyncCommand() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!value) return;

    setLoading(true);
    searchAPI(value).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [value]);

  return (
    <Command value={value} onValueChange={setValue} loading={loading}>
      <CommandInput />
      <CommandList>
        <CommandLoading>Searching...</CommandLoading>
        <CommandEmpty>No results</CommandEmpty>
        <CommandGroup>
          {results.map((item) => (
            <CommandItem key={item.id} value={item.id}>
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## TypeScript Tips

### Type-safe Item Data

```typescript
interface MyCommand {
  id: string;
  label: string;
  action: () => void;
}

const commands: MyCommand[] = [
  { id: "save", label: "Save", action: handleSave },
  { id: "export", label: "Export", action: handleExport },
];

<Command
  items={commands.map((cmd) => ({
    value: cmd.id,
    label: cmd.label,
    onSelect: cmd.action,
  }))}
/>;
```

### Discriminated Union Usage

```typescript
// Props API - items must be provided
const propsAPI: CommandPropsItems = {
  items: myItems,
  onSelect: handleSelect,
};

// Component API - children must be provided
const componentAPI: CommandPropsComponent = {
  children: <CommandInput />,
};

// TypeScript ensures correct usage
<Command {...propsAPI} />  // ✅
<Command {...componentAPI} />  // ✅
```

## Accessibility

- ✅ Full keyboard navigation
- ✅ ARIA roles and attributes
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ Touch-friendly targets

## Performance

- Efficient filtering (handles 100s of items)
- No unnecessary re-renders
- Clean event listener management
- Small bundle size: 15.55 kB (4.30 kB gzipped)

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Related Components

- **Combobox** - Form field selection
- **Autocomplete** - Search with suggestions
- **Dropdown** - Menu selection
- **Select** - Standard select input

## Migration from Other Libraries

### From Radix UI

```tsx
// Radix UI
import { Command } from "@radix-ui/react-command";

// Saha UI - Same API!
import { Command } from "saha-ui";
```

### From Shadcn

```tsx
// Shadcn - Nearly identical
import { Command } from "@/components/ui/command";

// Saha UI - More variants and features
import { Command } from "saha-ui";
```

## Troubleshooting

### Items not showing

```tsx
// ❌ Wrong - mixing APIs
<Command items={myItems}>
  <CommandInput />
</Command>

// ✅ Correct - Props API
<Command items={myItems} />

// ✅ Correct - Component API
<Command>
  <CommandInput />
  <CommandList>
    <CommandItem>...</CommandItem>
  </CommandList>
</Command>
```

### Search not working

```tsx
// ❌ Wrong - missing value/onValueChange
<Command>
  <CommandInput />
</Command>;

// ✅ Correct - controlled
const [value, setValue] = useState("");
<Command value={value} onValueChange={setValue}>
  <CommandInput />
</Command>;
```

### Keyboard navigation broken

```tsx
// Ensure CommandItem has unique values
<CommandItem value="item-1">Item 1</CommandItem>
<CommandItem value="item-2">Item 2</CommandItem>
```

## Support

- GitHub: https://github.com/your-repo/saha-ui
- Documentation: https://saha-ui.dev/docs/command
- Examples: https://saha-ui.dev/examples/command

---

**Last Updated:** January 2025  
**Version:** 1.7.0+  
**Component Status:** ✅ Production Ready
