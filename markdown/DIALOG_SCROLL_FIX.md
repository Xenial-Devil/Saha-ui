# Dialog Scroll Behavior Fix

## Issue

Dialog component's `scrollBehavior` prop was not working correctly:

- **scrollBehavior="inside"**: Body should scroll ✅ (Was working)
- **scrollBehavior="outside"**: Entire Dialog content should scroll ❌ (Was NOT scrollable)

## Root Cause

When `scrollBehavior="outside"`, the DialogContent component was setting `max-h-[90vh]` to limit the height, but it was missing the `overflow-y-auto` class that actually enables scrolling.

## Fix Applied

### File: `src/components/Dialog/DialogOverlay.tsx`

**Before:**

```tsx
className={cn(
  contentVariants({
    variant,
    size,
    rounded,
    animation,
    centered: fullScreen ? false : centered,
    fullScreen,
    state,
  }),
  scrollBehavior === "outside" && "max-h-[90vh]",
  className
)}
```

**After:**

```tsx
className={cn(
  contentVariants({
    variant,
    size,
    rounded,
    animation,
    centered: fullScreen ? false : centered,
    fullScreen,
    state,
  }),
  scrollBehavior === "outside" && "max-h-[90vh] overflow-y-auto",
  className
)}
```

## How It Works Now

### scrollBehavior="inside" (Default)

- DialogContent: NO scroll, just container
- DialogBody: `overflow-y-auto` - scrolls when content overflows
- Header & Footer: Fixed (don't scroll)
- **Use case**: Standard Dialogs where you want header/footer visible while content scrolls

### scrollBehavior="outside"

- DialogContent: `max-h-[90vh] overflow-y-auto` - entire Dialog scrolls
- DialogBody: NO `overflow-y-auto` - just part of the scrolling content
- Header & Footer: Scroll with content
- **Use case**: Long Dialogs where you want to scroll the entire thing including header/footer

## Testing

✅ Build successful
✅ No TypeScript errors
✅ Bundle size: 8.56 kB (1.72 kB gzipped) - only 10 bytes increase

## Usage Examples

### Prop-Based API

```tsx
{
  /* Inside scroll (default) - body scrolls, header/footer fixed */
}
<Dialog scrollBehavior="inside" title="Title" footer={<Button>Save</Button>}>
  <div className="h-[1000px]">Long content...</div>
</Dialog>;

{
  /* Outside scroll - entire Dialog scrolls */
}
<Dialog scrollBehavior="outside" title="Title" footer={<Button>Save</Button>}>
  <div className="h-[1000px]">Long content...</div>
</Dialog>;
```

### Component-Based API

```tsx
{
  /* Inside scroll - DialogBody scrolls */
}
<Dialog>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
  <DialogBody scrollable={true}>
    <div className="h-[1000px]">Long content...</div>
  </DialogBody>
  <DialogFooter>
    <Button>Save</Button>
  </DialogFooter>
</Dialog>;

{
  /* Outside scroll - entire Dialog scrolls */
}
<Dialog scrollBehavior="outside">
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
  <DialogBody scrollable={false}>
    <div className="h-[1000px]">Long content...</div>
  </DialogBody>
  <DialogFooter>
    <Button>Save</Button>
  </DialogFooter>
</Dialog>;
```

## Notes

- For component-based API with `scrollBehavior="outside"`, set `scrollable={false}` on DialogBody to avoid double scroll bars
- The `max-h-[90vh]` ensures the Dialog doesn't exceed 90% of viewport height
- Both scroll modes work with all animations and variants
