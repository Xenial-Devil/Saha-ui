# Drawer

A slide-out panel component that overlays content from the side, top, or bottom of the viewport. Perfect for navigation menus, forms, filters, and additional content without leaving the current page.

## Features

- 🎯 Four positions (left, right, top, bottom)
- 📏 Multiple size options (sm, md, lg, xl, full)
- 🎨 Backdrop variants (default, blur, transparent, dark)
- ✨ Animation options (slide, fade, scale, none)
- 🔒 Body scroll locking
- ⌨️ Keyboard navigation (Escape to close)
- ♿ Full accessibility support
- 🎭 Nested drawers support
- 🌐 Portal rendering
- 📱 Mobile-friendly

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "saha-ui";

function MyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>Open Drawer</button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer content.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">Main content goes here</div>

        <DrawerFooter>
          <button>Submit</button>
          <DrawerClose asChild>
            <button>Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

## Positions

### Right (Default)

```tsx
<Drawer position="right">
  <DrawerContent>Right side drawer</DrawerContent>
</Drawer>
```

### Left

```tsx
<Drawer position="left">
  <DrawerContent>Left side drawer</DrawerContent>
</Drawer>
```

### Top

```tsx
<Drawer position="top">
  <DrawerContent>Top drawer</DrawerContent>
</Drawer>
```

### Bottom

```tsx
<Drawer position="bottom">
  <DrawerContent>Bottom drawer</DrawerContent>
</Drawer>
```

## Sizes

```tsx
{
  /* Small */
}
<Drawer size="sm">
  <DrawerContent>Small drawer</DrawerContent>
</Drawer>;

{
  /* Medium (default) */
}
<Drawer size="md">
  <DrawerContent>Medium drawer</DrawerContent>
</Drawer>;

{
  /* Large */
}
<Drawer size="lg">
  <DrawerContent>Large drawer</DrawerContent>
</Drawer>;

{
  /* Extra Large */
}
<Drawer size="xl">
  <DrawerContent>Extra large drawer</DrawerContent>
</Drawer>;

{
  /* Full Screen */
}
<Drawer size="full">
  <DrawerContent>Full screen drawer</DrawerContent>
</Drawer>;
```

## Controlled Mode

Manage drawer state externally:

```tsx
function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled Drawer</DrawerTitle>
          </DrawerHeader>

          <div className="p-4">
            <p>This drawer is controlled by external state</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## Backdrop Variants

### Default

```tsx
<Drawer backdrop="default">
  <DrawerContent>Standard backdrop</DrawerContent>
</Drawer>
```

### Blur

```tsx
<Drawer backdrop="blur">
  <DrawerContent>Blurred backdrop</DrawerContent>
</Drawer>
```

### Dark

```tsx
<Drawer backdrop="dark">
  <DrawerContent>Dark backdrop</DrawerContent>
</Drawer>
```

### Transparent

```tsx
<Drawer backdrop="transparent">
  <DrawerContent>Transparent backdrop</DrawerContent>
</Drawer>
```

## Animation Options

```tsx
{
  /* Slide (default) */
}
<Drawer animation="slide">
  <DrawerContent>Slides in</DrawerContent>
</Drawer>;

{
  /* Fade */
}
<Drawer animation="fade">
  <DrawerContent>Fades in</DrawerContent>
</Drawer>;

{
  /* Scale */
}
<Drawer animation="scale">
  <DrawerContent>Scales in</DrawerContent>
</Drawer>;

{
  /* No animation */
}
<Drawer animation="none">
  <DrawerContent>Instant</DrawerContent>
</Drawer>;
```

## Disable Overlay Close

Prevent closing when clicking outside:

```tsx
<Drawer closeOnOverlayClick={false}>
  <DrawerContent>Must use close button to dismiss</DrawerContent>
</Drawer>
```

## Disable Escape Key

Prevent closing with Escape key:

```tsx
<Drawer closeOnEscape={false}>
  <DrawerContent>Escape key won't close this</DrawerContent>
</Drawer>
```

## Nested Drawers

Open drawers within drawers:

```tsx
<Drawer>
  <DrawerTrigger>Open First</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>First Drawer</DrawerTitle>
    </DrawerHeader>

    <Drawer nested>
      <DrawerTrigger>Open Second</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nested Drawer</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  </DrawerContent>
</Drawer>
```

## API Reference

### Drawer Props

| Prop                  | Type                                             | Default     | Description                       |
| --------------------- | ------------------------------------------------ | ----------- | --------------------------------- |
| `children`            | `ReactNode`                                      | -           | **Required.** Drawer components   |
| `open`                | `boolean`                                        | -           | Controlled open state             |
| `defaultOpen`         | `boolean`                                        | `false`     | Default open state (uncontrolled) |
| `onOpenChange`        | `(open: boolean) => void`                        | -           | Callback when state changes       |
| `position`            | `'left' \| 'right' \| 'top' \| 'bottom'`         | `'right'`   | Drawer position                   |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`         | `'md'`      | Drawer size                       |
| `backdrop`            | `'default' \| 'blur' \| 'transparent' \| 'dark'` | `'default'` | Backdrop variant                  |
| `animation`           | `'slide' \| 'fade' \| 'scale' \| 'none'`         | `'slide'`   | Animation type                    |
| `showOverlay`         | `boolean`                                        | `true`      | Show backdrop overlay             |
| `closeOnOverlayClick` | `boolean`                                        | `true`      | Close on backdrop click           |
| `closeOnEscape`       | `boolean`                                        | `true`      | Close on Escape key               |
| `lockScroll`          | `boolean`                                        | `true`      | Lock body scroll when open        |
| `nested`              | `boolean`                                        | `false`     | Enable nested drawer support      |
| `zIndex`              | `number`                                         | `1000`      | Z-index value                     |
| `className`           | `string`                                         | -           | Additional CSS classes            |

### DrawerTrigger Props

| Prop        | Type        | Default | Description                   |
| ----------- | ----------- | ------- | ----------------------------- |
| `children`  | `ReactNode` | -       | **Required.** Trigger element |
| `asChild`   | `boolean`   | `false` | Merge props with child        |
| `className` | `string`    | -       | Additional CSS classes        |

### DrawerContent Props

| Prop        | Type        | Default | Description                  |
| ----------- | ----------- | ------- | ---------------------------- |
| `children`  | `ReactNode` | -       | **Required.** Drawer content |
| `className` | `string`    | -       | Additional CSS classes       |

### DrawerHeader Props

| Prop        | Type        | Default | Description                  |
| ----------- | ----------- | ------- | ---------------------------- |
| `children`  | `ReactNode` | -       | **Required.** Header content |
| `className` | `string`    | -       | Additional CSS classes       |

### DrawerFooter Props

| Prop        | Type        | Default | Description                  |
| ----------- | ----------- | ------- | ---------------------------- |
| `children`  | `ReactNode` | -       | **Required.** Footer content |
| `className` | `string`    | -       | Additional CSS classes       |

## Common Patterns

### Navigation Menu

```tsx
function NavDrawer() {
  return (
    <Drawer position="left">
      <DrawerTrigger asChild>
        <button aria-label="Open menu">
          <MenuIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
```

### Filter Panel

```tsx
function FilterDrawer() {
  return (
    <Drawer position="right" size="sm">
      <DrawerTrigger asChild>
        <button>Filters</button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Options</DrawerTitle>
          <DrawerDescription>Refine your search results</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <div>
            <label>Category</label>
            <select className="w-full">
              <option>All</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
          </div>

          <div>
            <label>Price Range</label>
            <input type="range" className="w-full" />
          </div>
        </div>

        <DrawerFooter>
          <button className="btn-primary">Apply Filters</button>
          <DrawerClose asChild>
            <button className="btn-secondary">Reset</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

### Shopping Cart

```tsx
function CartDrawer({ items }) {
  return (
    <Drawer position="right">
      <DrawerTrigger asChild>
        <button className="relative">
          <ShoppingCartIcon />
          <Badge className="absolute -top-2 -right-2">{items.length}</Badge>
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>{items.length} items</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-auto p-4">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <DrawerFooter>
          <div className="mb-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${calculateTotal(items)}</span>
            </div>
          </div>
          <button className="btn-primary w-full">Checkout</button>
          <DrawerClose asChild>
            <button className="btn-secondary w-full">Continue Shopping</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

### Form Drawer

```tsx
function FormDrawer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Drawer closeOnOverlayClick={false}>
      <DrawerTrigger asChild>
        <button>Add New Item</button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Item</DrawerTitle>
          <DrawerDescription>Fill in the details below</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="w-full" required />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" className="w-full" rows={4} />
          </div>

          <DrawerFooter>
            <button type="submit" className="btn-primary">
              Save
            </button>
            <DrawerClose asChild>
              <button type="button" className="btn-secondary">
                Cancel
              </button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
```

## Accessibility

The Drawer component follows accessibility best practices:

- **ARIA Attributes:**

  - `role="dialog"` for drawer content
  - `aria-modal="true"` to indicate modal behavior
  - `aria-labelledby` connects to drawer title
  - `aria-describedby` connects to drawer description

- **Keyboard Navigation:**

  - `Escape` closes the drawer (unless disabled)
  - Focus trap keeps focus within drawer
  - Tab cycles through focusable elements
  - Focus returns to trigger on close

- **Screen Readers:**
  - Proper announcement when opened
  - Title and description are announced
  - Close button has accessible label

## Best Practices

1. **Always Provide Title:** Use `DrawerTitle` for context
2. **Use Descriptions:** Add `DrawerDescription` for complex drawers
3. **Proper Trigger:** Use semantic buttons with clear labels
4. **Close Options:** Provide multiple ways to close (button, overlay, Escape)
5. **Size Appropriately:** Choose size based on content amount
6. **Position Wisely:** Right is standard for actions, left for navigation
7. **Handle States:** Show loading states for async operations
8. **Mobile First:** Test on mobile devices for usability

## Styling

### Custom Styles

```tsx
<Drawer>
  <DrawerContent className="bg-gradient-to-b from-blue-500 to-purple-600">
    <DrawerHeader className="text-white">
      <DrawerTitle>Custom Styled Drawer</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

## Related Components

- **Dialog** - For modal dialogs
- **Sheet** - Alternative drawer implementation
- **Sidebar** - Persistent side navigation
- **Popover** - For smaller contextual content

## Changelog

- **v1.0.0** - Initial release with all features
