# HoverCard

A flexible hover-activated overlay for presenting contextual information without requiring a click. Ideal for user previews, quick info, and lightweight contextual content.

## Highlights

- Triggered by hover with configurable open/close delays
- Flexible positioning with portal support and collision handling
- Optional arrow that points to the trigger
- Accessible defaults (ARIA roles and keyboard fallback)

## Import

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../../components/HoverCard";
```

## When to use

Use `HoverCard` to surface supplementary information (user previews, short descriptions, quick actions) that benefits from being visible on hover rather than a full click-activated dialog.

## Key props

- `position?: string` — Preferred placement (`bottom`, `top`, `left`, `right`, and `-start`/`-end` variants). Default: `bottom`.
- `size?: 'sm' | 'md' | 'lg'` — Content sizing variant.
- `openDelay?: number` — Milliseconds to wait before opening (default: `200`).
- `closeDelay?: number` — Milliseconds to wait before closing (default: `300`).
- `disablePortal?: boolean` — Render inline instead of in a document-level portal. Default: `false`.
- `showArrow?: boolean` — Render arrow that points to trigger. Default: `true`.
- `width?: number | string` — Optional fixed width for the content.

For the full TypeScript props, inspect `src/components/HoverCard/HoverCard.types.ts`.

## Accessibility

- The trigger element supports ARIA labelling; use `HoverCardTrigger` with a visible label or `aria-label` when necessary.
- Focus is preserved — `HoverCard` is intended as a hover-first experience; for persistent interactive content prefer `Popover` or `Dialog`.

## Examples

Basic usage

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <button className="btn">Hover me</button>
  </HoverCardTrigger>

  <HoverCardContent>
    <div className="max-w-xs">
      <h4 className="font-semibold">Preview title</h4>
      <p className="text-sm text-muted-foreground">
        Short description, metadata, or actions.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>
```

Force inline rendering (disable portal)

```tsx
<HoverCard>
  <HoverCardTrigger>@user</HoverCardTrigger>
  <HoverCardContent disablePortal>
    Inline content — useful inside scrolling containers or constrained layouts.
  </HoverCardContent>
</HoverCard>
```

Center / align notes

When `disablePortal` is `false` (the default), `HoverCard` uses absolute `top/left` computed by the shared `usePortalPosition` utility. In that mode the component omits CSS translate-based alignment classes (e.g. `-translate-x-1/2`) and relies on the measured `portalPos`. When rendered inline the component falls back to utility-based alignment classes — this avoids double-transforms that can cause alignment jitter.

## Theming & custom styles

- Use `className` on `HoverCardContent` to add custom utilities.
- To change tokens globally, update `tailwind.config.js` and the theme provider used in this project.

## Migration notes

- `disablePortal` was introduced to allow strict inline rendering; when upgrading from earlier versions that always rendered inline, consider whether portal behavior affects CSS stacking and `position` contexts.

---

If you'd like, I can add a short screenshot example and a small demo in `src/examples/` showing `position` variants and portal vs inline behavior.
