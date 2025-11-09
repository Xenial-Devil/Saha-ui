# Dialog

A fully-featured modal dialog component for displaying content that requires user attention or interaction. Supports multiple variants, sizes, animations, and accessibility features.

## Features

- 🎨 Nine visual variants (default, primary, secondary, accent, success, warning, error, info, glass)
- 📏 Multiple sizes (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full)
- ✨ Eight animation styles (fade, scale, slide, zoom, bounce)
- 🎯 Controlled and uncontrolled modes
- ♿ Full accessibility support (ARIA, focus trap, keyboard navigation)
- 🔒 Body scroll locking
- 🎭 Customizable backdrop (default, blur, transparent, dark)
- 📱 Responsive and mobile-friendly
- 🧩 Composable with subcomponents
- 🎪 Nested dialog support

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Dialog } from '@saha-ui/core';

function MyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Dialog Title"
        description="This is a description of the dialog content."
      >
        <p>Dialog content goes here.</p>
      </Dialog>
    </>
  );
}
```

## Sizes

```tsx
<Dialog size="xs" title="Extra Small">Content</Dialog>
<Dialog size="sm" title="Small">Content</Dialog>
<Dialog size="md" title="Medium">Content</Dialog>
<Dialog size="lg" title="Large">Content</Dialog>
<Dialog size="xl" title="Extra Large">Content</Dialog>
<Dialog size="2xl" title="2X Large">Content</Dialog>
<Dialog size="full" title="Full Screen">Content</Dialog>
```

## Variants

### Default

```tsx
<Dialog variant="default" title="Default Dialog">
  Standard dialog appearance
</Dialog>
```

### Primary

```tsx
<Dialog variant="primary" title="Primary Dialog">
  Primary themed dialog
</Dialog>
```

### Glass

```tsx
<Dialog variant="glass" title="Glass Dialog">
  Modern glassmorphism effect
</Dialog>
```

### Status Variants

```tsx
<Dialog variant="success" title="Success!">
  Operation completed successfully.
</Dialog>

<Dialog variant="error" title="Error">
  An error occurred.
</Dialog>

<Dialog variant="warning" title="Warning">
  Please review this warning.
</Dialog>

<Dialog variant="info" title="Information">
  Here's some information.
</Dialog>
```

## Animations

```tsx
<Dialog animation="fade" title="Fade In">Fade animation</Dialog>
<Dialog animation="scale" title="Scale In">Scale animation</Dialog>
<Dialog animation="slide-up" title="Slide Up">Slide up animation</Dialog>
<Dialog animation="slide-down" title="Slide Down">Slide down animation</Dialog>
<Dialog animation="zoom" title="Zoom In">Zoom animation</Dialog>
<Dialog animation="bounce" title="Bounce In">Bounce animation</Dialog>
```

## With Footer

```tsx
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  footer={
    <div className="flex gap-2 justify-end">
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  }
>
  <p>This action cannot be undone.</p>
</Dialog>
```

## Backdrop Options

```tsx
<Dialog backdrop="default" title="Default Backdrop">
  Standard dark backdrop
</Dialog>

<Dialog backdrop="blur" title="Blurred Backdrop">
  Blurred background effect
</Dialog>

<Dialog backdrop="transparent" title="Transparent Backdrop">
  No backdrop overlay
</Dialog>

<Dialog backdrop="dark" title="Dark Backdrop">
  Extra dark backdrop
</Dialog>
```

## Centered Dialog

```tsx
<Dialog
  centered
  title="Centered Dialog"
  description="This dialog is vertically centered"
>
  Content
</Dialog>
```

## Scroll Behavior

### Inside Scrolling (Default)

```tsx
<Dialog scrollBehavior="inside" title="Inside Scroll">
  <div className="h-96">Long content that scrolls inside...</div>
</Dialog>
```

### Outside Scrolling

```tsx
<Dialog scrollBehavior="outside" title="Outside Scroll">
  <div className="h-[800px]">Long content that scrolls the page...</div>
</Dialog>
```

## Full Screen

```tsx
<Dialog fullScreen title="Full Screen Dialog">
  Takes up entire viewport
</Dialog>
```

## Prevent Close

Disable closing via backdrop click or escape key:

```tsx
<Dialog
  preventClose
  title="Attention Required"
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  You must complete this form before closing.
</Dialog>
```

## Nested Dialogs

```tsx
function NestedDialogs() {
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

  return (
    <>
      <Dialog
        open={parentOpen}
        onOpenChange={setParentOpen}
        title="Parent Dialog"
      >
        <p>This is the parent dialog.</p>
        <button onClick={() => setChildOpen(true)}>
          Open Nested Dialog
        </button>
        
        <Dialog
          nested
          open={childOpen}
          onOpenChange={setChildOpen}
          title="Nested Dialog"
        >
          <p>This is a nested dialog.</p>
        </Dialog>
      </Dialog>
    </>
  );
}
```

## Controlled Mode

```tsx
function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpen={() => console.log('Dialog opened')}
      onClose={() => console.log('Dialog closed')}
      title="Controlled Dialog"
    >
      <p>This dialog is fully controlled.</p>
    </Dialog>
  );
}
```

## API Reference

### Dialog Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'glass'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| 'full'` | `'md'` | Dialog size |
| `title` | `ReactNode` | - | Dialog title |
| `description` | `ReactNode` | - | Dialog description |
| `children` | `ReactNode` | - | Dialog body content |
| `footer` | `ReactNode` | - | Dialog footer content |
| `showHeader` | `boolean` | `true` | Whether to show header |
| `showCloseButton` | `boolean` | `true` | Whether to show close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `animation` | `'fade' \| 'scale' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right' \| 'zoom' \| 'bounce'` | `'fade'` | Animation style |
| `centered` | `boolean` | `false` | Vertically center dialog |
| `scrollBehavior` | `'inside' \| 'outside'` | `'inside'` | Scroll behavior for long content |
| `fullScreen` | `boolean` | `false` | Make dialog full screen |
| `backdrop` | `'default' \| 'blur' \| 'transparent' \| 'dark'` | `'default'` | Backdrop style |
| `preventClose` | `boolean` | `false` | Prevent closing dialog |
| `lockScroll` | `boolean` | `true` | Lock body scroll when open |
| `focusTrap` | `boolean` | `true` | Trap focus within dialog |
| `returnFocus` | `boolean` | `true` | Return focus to trigger on close |
| `nested` | `boolean` | `false` | Whether dialog is nested |
| `onOpen` | `() => void` | - | Callback when dialog opens |
| `onClose` | `() => void` | - | Callback when dialog closes |
| `className` | `string` | - | Additional CSS classes |
| `overlayClassName` | `string` | - | Classes for backdrop overlay |
| `contentClassName` | `string` | - | Classes for content container |
| `ariaLabel` | `string` | - | ARIA label for accessibility |

## Common Patterns

### Confirmation Dialog

```tsx
function ConfirmDialog({ onConfirm, onCancel }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      size="sm"
      title="Confirm Action"
      description="Are you sure you want to delete this item? This action cannot be undone."
      footer={
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 text-white">
            Delete
          </button>
        </div>
      }
    />
  );
}
```

### Form Dialog

```tsx
function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Create New Item"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input label="Name" required />
          <TextArea label="Description" />
          <Select label="Category" />
        </div>
        <div className="flex gap-2 justify-end mt-6">
          <button type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </Dialog>
  );
}
```

### Alert Dialog

```tsx
function AlertDialog({ message, onClose }) {
  return (
    <Dialog
      open={true}
      onOpenChange={onClose}
      variant="error"
      size="sm"
      title="Error"
      closeOnOverlayClick={false}
      footer={
        <button onClick={onClose} className="w-full">
          OK
        </button>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
```

## Accessibility

The Dialog component follows WAI-ARIA Dialog pattern:

- **Keyboard Navigation:**
  - `Escape` - Close dialog (if enabled)
  - `Tab` - Navigate between focusable elements
  - Focus is trapped within dialog
  
- **ARIA Attributes:**
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby` for title
  - `aria-describedby` for description
  
- **Focus Management:**
  - Focus moves to first focusable element on open
  - Focus returns to trigger element on close
  - Focus trap prevents tabbing outside dialog

## Best Practices

1. **Use Appropriate Sizes:** Choose sizes that fit content without overwhelming the screen
2. **Clear Titles:** Provide descriptive titles for context
3. **Limit Nested Dialogs:** Avoid deeply nested dialogs (max 2 levels)
4. **Confirm Destructive Actions:** Always confirm actions that cannot be undone
5. **Mobile Considerations:** Test dialogs on mobile devices
6. **Avoid Overuse:** Use dialogs sparingly to avoid disrupting user flow
7. **Provide Exit Options:** Always allow users to close dialogs easily

## Styling

### Custom Styles

```tsx
<Dialog
  title="Custom Styled"
  className="custom-dialog"
  overlayClassName="custom-overlay"
  contentClassName="shadow-2xl"
>
  Content
</Dialog>
```

## Related Components

- **Drawer** - Side panel overlay
- **Popover** - Lightweight popup
- **Modal** - Alternative modal implementation
- **Sheet** - Bottom sheet for mobile

## Changelog

- **v1.0.0** - Initial release with all features