# Modal Scroll Behavior Fix

## Issue

Modal component's `scrollBehavior` prop was not working correctly:

- **scrollBehavior="inside"**: Body should scroll ✅ (Was working)
- **scrollBehavior="outside"**: Entire modal content should scroll ❌ (Was NOT scrollable)

## Root Cause

When `scrollBehavior="outside"`, the ModalContent component was setting `max-h-[90vh]` to limit the height, but it was missing the `overflow-y-auto` class that actually enables scrolling.

## Fix Applied

### File: `src/components/Modal/ModalOverlay.tsx`

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

- ModalContent: NO scroll, just container
- ModalBody: `overflow-y-auto` - scrolls when content overflows
- Header & Footer: Fixed (don't scroll)
- **Use case**: Standard modals where you want header/footer visible while content scrolls

### scrollBehavior="outside"

- ModalContent: `max-h-[90vh] overflow-y-auto` - entire modal scrolls
- ModalBody: NO `overflow-y-auto` - just part of the scrolling content
- Header & Footer: Scroll with content
- **Use case**: Long modals where you want to scroll the entire thing including header/footer

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
<Modal scrollBehavior="inside" title="Title" footer={<Button>Save</Button>}>
  <div className="h-[1000px]">Long content...</div>
</Modal>;

{
  /* Outside scroll - entire modal scrolls */
}
<Modal scrollBehavior="outside" title="Title" footer={<Button>Save</Button>}>
  <div className="h-[1000px]">Long content...</div>
</Modal>;
```

### Component-Based API

```tsx
{
  /* Inside scroll - ModalBody scrolls */
}
<Modal>
  <ModalHeader>
    <ModalTitle>Title</ModalTitle>
  </ModalHeader>
  <ModalBody scrollable={true}>
    <div className="h-[1000px]">Long content...</div>
  </ModalBody>
  <ModalFooter>
    <Button>Save</Button>
  </ModalFooter>
</Modal>;

{
  /* Outside scroll - entire modal scrolls */
}
<Modal scrollBehavior="outside">
  <ModalHeader>
    <ModalTitle>Title</ModalTitle>
  </ModalHeader>
  <ModalBody scrollable={false}>
    <div className="h-[1000px]">Long content...</div>
  </ModalBody>
  <ModalFooter>
    <Button>Save</Button>
  </ModalFooter>
</Modal>;
```

## Notes

- For component-based API with `scrollBehavior="outside"`, set `scrollable={false}` on ModalBody to avoid double scroll bars
- The `max-h-[90vh]` ensures the modal doesn't exceed 90% of viewport height
- Both scroll modes work with all animations and variants
