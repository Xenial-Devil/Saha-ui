# Dropdown

A robust, accessible dropdown menu component for actions and selections. Supports icons, nested menus, keyboard navigation, portaling, and size-aware content.

## Highlights

- Keyboard-first interactions (Arrow keys, Enter, Escape)
- Smart positioning with viewport collision handling
- Portaling with `disablePortal` control
- Size-aware items — menus can match trigger sizes (sm/md/lg)

## Import

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../../components/Dropdown";
```

## Important props & behavior

- `disablePortal?: boolean` — When `false` (default), the menu renders in a document-level portal and positioning uses absolute `top/left` computed by the shared `usePortalPosition` hook. When `true`, the menu renders inline and uses CSS utilities for placement.
- Width behavior — when portaled the menu width is calculated from the trigger width (or a size-based minimum). This prevents full-width expansion when the menu is detached from the trigger.
- Size variants — items respond to the `size` context (`sm`, `md`, `lg`) so small triggers render compact menu items and large triggers have more generous padding and font-size.

For exact TypeScript types see `src/components/Dropdown/Dropdown.types.ts`.

## Examples

Basic usage

```tsx
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
```

Size-aware menu (small, medium, large)

```tsx
<div className="flex gap-4">
  <Dropdown>
    <DropdownTrigger asChild>
      <button className="btn btn-sm">Small</button>
    </DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
    </DropdownContent>
  </Dropdown>

  <Dropdown>
    <DropdownTrigger asChild>
      <button className="btn">Medium</button>
    </DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
    </DropdownContent>
  </Dropdown>

  <Dropdown>
    <DropdownTrigger asChild>
      <button className="btn btn-lg">Large</button>
    </DropdownTrigger>
    <DropdownContent>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
    </DropdownContent>
  </Dropdown>
</div>
```

Disable portal (inline rendering)

```tsx
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Inline Menu</Button>
  </DropdownTrigger>
  <DropdownContent disablePortal>
    <DropdownItem>Inline option</DropdownItem>
  </DropdownContent>
</Dropdown>
```

## Accessibility

- Proper ARIA roles are applied to the menu (`role="menu"` / `listbox`) and items (`role="menuitem"` / `option`).
- Keyboard navigation is supported out-of-the-box: Arrow keys, Enter, Space, Escape, Home, End.

## Tips

- For consistent visual alignment when portaling is used, prefer using the built-in sizing variants so menu items match trigger size.
- If you need the menu to inherit layout constraints (e.g., inside a modal with constrained width), set `disablePortal` to `true`.

---

If you want, I can add a short example file to `src/examples` that demonstrates portaled vs inline menus and the size-aware behavior for small/medium/large triggers.
