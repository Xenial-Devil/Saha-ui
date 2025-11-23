# SpeedDial

SpeedDial (a.k.a Floating Action Menu) provides a compact floating trigger that expands to a set of related actions. It's useful for contexts where a primary action and several secondary actions should be quickly accessible (e.g., create, compose, share).

## Highlights

- Floating trigger with expand/collapse animation
- Optional backdrop and keyboard-accessible actions
- Can render in a portal to avoid stacking/context issues
- Accessible: focusable actions, ARIA labels and keyboard navigation

## Import

```tsx
import {
  SpeedDial,
  SpeedDialTrigger,
  SpeedDialActions,
  SpeedDialAction,
} from "../../components/SpeedDial";
```

## Key props

- `open?: boolean` — Controlled open state.
- `defaultOpen?: boolean` — Uncontrolled default state.
- `onOpenChange?: (open: boolean) => void` — Callback when open state changes.
- `placement?: string` — Preferred expansion direction (`top`, `left`, `right`, `bottom`).
- `disablePortal?: boolean` — Render inline rather than in a document-level portal.
- `backdrop?: boolean` — Show a backdrop when open.

## Basic usage

```tsx
<SpeedDial defaultOpen={false} placement="top">
  <SpeedDialTrigger>
    <button className="btn btn-primary">+</button>
  </SpeedDialTrigger>

  <SpeedDialActions>
    <SpeedDialAction onClick={() => alert("New")}>New</SpeedDialAction>
    <SpeedDialAction onClick={() => alert("Upload")}>Upload</SpeedDialAction>
    <SpeedDialAction onClick={() => alert("Share")}>Share</SpeedDialAction>
  </SpeedDialActions>
</SpeedDial>
```

## Accessibility

- Trigger and actions are keyboard-focusable.
- Actions should have descriptive text or an `aria-label` when they are icon-only.
- When `backdrop` is enabled, pressing `Escape` closes the SpeedDial and returns focus to the trigger.

## Theming and customization

- Use `className` on `SpeedDialTrigger`/`SpeedDialActions` to add custom styles.
- The component respects global theme tokens in `tailwind.config.js`.

## Notes

- Prefer `disablePortal` only when the floating content must remain within a specific stacking context (for example, inside certain modals). Default portaling avoids z-index and overflow issues.

---

If you want, I can add a small interactive example under `src/examples` showing `placement` variants and the `backdrop` option.
