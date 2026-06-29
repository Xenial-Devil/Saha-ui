# Saha UI Component Library — Improvements & Customization Roadmap

**Survey date:** 2026-06-29  
**Components analyzed:** 20 representative components (Button, Input, Card, Dialog, Drawer, Select, Accordion, Table, DataTable, Dropdown, Tabs, Tooltip, Avatar, Badge, Form, Checkbox, Slider, Calendar, Toast/Snackbar, Carousel)

## Executive Summary

**Strengths:**
- 100% `className` forwarding via `cn()` — all components customizable at root
- 100% `forwardRef` support — ref forwarding works everywhere
- 95% spread props support — most components accept `{...props}`
- Strong controlled/uncontrolled state patterns
- All overlays portal correctly to `document.body`

**Critical gaps:**
- **Accessibility incomplete:** Focus management broken, keyboard nav partial, no reduced-motion support
- **Inconsistent customization APIs:** No unified slot-styling pattern for multi-part components
- **Type safety holes:** `any` types in Autocomplete, Chart, Command, DataTable
- **Limited variant exports:** Only Button/Badge export CVA variants for external reuse

---

## 1. Accessibility Fixes (HIGH PRIORITY)

### 1.1 Focus Management — BROKEN

**Dialog** (`src/components/Dialog/Dialog.tsx`):
- **Bug:** `focusTrap` prop defined (line 80) but NOT implemented — no actual trap logic runs
- **Bug:** `returnFocus` stores `previousActiveElement` (line 99) but never restores focus on close
- **Fix:** Import `useFocusTrap` from `src/hooks/useFocusTrap.ts`, wire to `focusTrap` prop, call `previousActiveElement?.focus()` in cleanup

**Drawer** (`src/components/Drawer/Drawer.tsx`):
- **Bug:** Focuses drawer wrapper instead of first interactive element (line 166)
- **Bug:** No Tab trap — keyboard focus escapes to body
- **Fix:** Import `useFocusTrap`, focus first button/input inside drawer on open

**Dropdown** (`src/components/Dropdown/index.tsx`):
- **Bug:** Keyboard nav updates `focusedIndex` state (line 119) but never moves DOM focus
- **Bug:** Screen reader doesn't announce highlighted option
- **Fix:** Store refs for all items, call `.focus()` on `focusedIndex` change, add `aria-activedescendant` to listbox

**Tooltip** (`src/components/Tooltip/index.tsx`):
- **Bug:** No keyboard nav at all — trigger works via `onFocus`/`onBlur` but Escape only closes if content focused (it's portaled, never in focus chain)
- **Missing:** `aria-describedby` link from trigger to content
- **Fix:** Add `aria-describedby={contentId}`, ensure Escape listener on trigger, not content

**Select** (`src/components/Select/index.tsx`):
- **Bug:** Click-only, no keyboard navigation
- **Fix:** Add Arrow up/down, Enter to select, Escape to close, Space to toggle

### 1.2 Missing ARIA Attributes

| Component | Missing | Fix |
|-----------|---------|-----|
| Dialog | `aria-describedby` | Link to body content element |
| Drawer | `aria-describedby` | Link to body content element |
| Dropdown | `role="option"`, `aria-selected` on items | Add to each item |
| Tooltip | `aria-describedby` link | Add `id` to content, reference from trigger |

### 1.3 Reduced Motion Support — IGNORED

**Components animating without guards:**
- Dialog (line 151) — slide-in animation
- Drawer (line 100) — slide-in animation  
- Carousel (line 244) — slide transitions
- Toast/Snackbar — slide/fade animations

**Fix:** Wrap animations in `useReducedMotion` check (hook exists at `src/hooks/useReducedMotion.ts`):
```tsx
const prefersReducedMotion = useReducedMotion();
const animationClass = prefersReducedMotion ? '' : 'animate-slide-in';
```

---

## 2. Customization Enhancements

### 2.1 Unified Slot-Styling API

**Current state:**
- No component uses `classNames={{ part: "..." }}` object pattern
- Dialog/Select use scoped props (`headerClassName`, `contentClassName`)
- Card/Accordion sub-components accept individual `className` only
- Inconsistent APIs for same concept

**Proposal:** Standardize on `classNames` object for multi-part components:

```tsx
<Dialog 
  classNames={{
    overlay: "bg-black/50",
    content: "max-w-2xl",
    header: "border-b",
    body: "p-6",
    footer: "justify-end"
  }}
/>
```

**Components needing this:**
- Card (5 parts: root, header, title, content, footer)
- Dialog (4 parts: overlay, content, header, body, footer)
- Select (3 parts: trigger, content, item)
- Accordion (3 parts: root, item, trigger, content)
- Table (6 parts: root, header, body, row, head, cell)
- Dropdown (2 parts: trigger, content)
- Tabs (3 parts: list, trigger, content)

**Backward compat:** Keep existing `*ClassName` props as aliases.

### 2.2 Export CVA Variants

**Current:** Only Button and Badge export `*Variants` for external use.

**Missing exports:**
- `inputVariants` (Input.styles.ts) — needed for custom input wrappers
- `cardVariants` (Card.styles.ts) — needed for custom card-like surfaces
- `dialogVariants` (Dialog.styles.ts) — needed for modal variants
- `selectVariants` (Select.styles.ts) — needed for custom selects
- All other component variants

**Fix:** Add to `src/index.ts` barrel exports:
```tsx
export { inputVariants } from "./components/Input/Input.styles";
export { cardVariants, cardHeaderVariants, ... } from "./components/Card/Card.styles";
// etc.
```

### 2.3 Extend `asChild` Support

**Current:** 50% of components support `asChild` (Button, Card, Badge, Tooltip, Accordion, DropdownTrigger).

**Missing:**
- Input (should support for custom input rendering)
- Checkbox/Radio (should support for custom control rendering)
- Dialog/Drawer triggers
- Select trigger
- All form components

**Fix:** Add `asChild` prop + `Slot` component to all interactive elements.

### 2.4 Unstyled Mode

**Current:** No component offers "unstyled" or "variant=none" escape hatch. All enforce styling.

**Proposal:** Add `unstyled` boolean prop that skips all variant classes:
```tsx
<Button unstyled className="my-custom-button">
  Custom styled
</Button>
```

Implementation: Early-return empty string from `cn()` call if `unstyled=true`.

### 2.5 Render Props for Complex Customization

**Current:** Only Select, Calendar, DataTable expose render customization.

**Candidates for render props:**
- Dropdown: `renderItem={(item, index) => ...}` for custom option rendering
- Autocomplete: `renderOption`, `renderInput`, `renderEmpty`
- Combobox: `renderItem`, `renderEmpty`, `renderLoading`
- Table: `renderCell`, `renderHeader` per column
- Avatar: `renderFallback` for custom fallback content

---

## 3. Type Safety Improvements

### 3.1 Replace `any` Types

| File | Line | Current | Fix |
|------|------|---------|-----|
| Autocomplete.types.ts | 152 | `renderInput?: (props: any) => ...` | `renderInput?: (props: InputProps) => ...` |
| Chart.types.ts | 108 | `tickFormatter?: (value: any) => ...` | `tickFormatter?: (value: number \| string) => ...` |
| Chart.types.ts | 122 | `formatter?: (value: any, ...) => ...` | `formatter?: (value: number, ...) => ...` |
| ComposedChartComponent.tsx | 46 | `(series: any, index: number)` | `(series: ChartSeries, index: number)` |
| Command.types.ts | 106 | `[key: string]: any;` | Define proper shape or use `Record<string, unknown>` |
| DataTable.types.ts | 60, 117 | `filterValue: any`, `value: any` | Use generic `<T>` for column value type |
| DateTimePicker/index.tsx | 95 | `(time: any)` | `(time: Date \| string)` |

### 3.2 Extend Native Element Props

**Check these components extend proper HTMLAttributes:**
- Select → should extend `HTMLDivAttributes` for root
- Combobox → should extend `HTMLDivAttributes`
- Checkbox → root wrapper should extend `HTMLDivAttributes`
- Radio → root wrapper should extend `HTMLDivAttributes`

---

## 4. Consistency Fixes (LOW PRIORITY)

### 4.1 Unify Callback Naming

**Inconsistency:**
- Select uses `onValueChange`
- Input/Checkbox use `onChange`
- Dialog uses `onOpenChange`
- Accordion uses `onValueChange`

**Proposal:** Standardize on `onChange` for all value changes, reserve `onOpenChange` for open/close state only.

### 4.2 Unify Boolean Prop Naming

**Inconsistency:**
- Dialog: `open` prop
- Dropdown: `isOpen` prop
- Tooltip: `isOpen` prop
- Accordion: `value` prop (string, not boolean)

**Proposal:** Use `open` for all boolean open/close state (matches native `<dialog>`).

---

## 5. Implementation Priority

### Phase 1: Accessibility (Required for compliance)
1. ✅ Fix Dialog/Drawer focus trap + focus return
2. ✅ Fix Dropdown keyboard focus management
3. ✅ Add Select keyboard navigation
4. ✅ Fix Tooltip keyboard + ARIA
5. ✅ Add reduced-motion guards to all animations

**Estimated effort:** 2-3 days

### Phase 2: Type Safety (Improves DX)
1. ✅ Replace all `any` types with proper types or generics
2. ✅ Verify all components extend native element props

**Estimated effort:** 1 day

### Phase 3: Customization (Power user features)
1. ✅ Add `classNames={{}}` slot-styling to all multi-part components
2. ✅ Export all CVA variants in barrel
3. ✅ Add `asChild` to all interactive components
4. ✅ Add `unstyled` prop to all components

**Estimated effort:** 3-4 days

### Phase 4: Consistency (Nice to have)
1. ✅ Unify callback naming
2. ✅ Unify boolean prop naming
3. ✅ Add render props to complex components

**Estimated effort:** 2 days

---

## 6. Testing Requirements

After implementing fixes, verify:

1. **Focus management:**
   - Tab trap works in Dialog/Drawer
   - Focus returns to trigger on close
   - Escape closes and returns focus

2. **Keyboard nav:**
   - Arrow keys move focus in Dropdown/Select/Combobox
   - Enter selects, Escape closes
   - Screen reader announces focused item

3. **Reduced motion:**
   - Animations disabled when `prefers-reduced-motion: reduce`
   - Components still functional without animations

4. **Customization:**
   - `classNames={{}}` applies to all parts
   - `asChild` works with custom elements
   - `unstyled` removes all variant classes
   - Exported variants work in external CVA calls

5. **Types:**
   - No `any` errors in strict mode
   - Native element props available (e.g. `data-*`, `aria-*`)

---

## Appendix: File References

All findings reference exact file paths:
- `D:\Github\Saha-ui\src\components\{Component}\index.tsx`
- `D:\Github\Saha-ui\src\components\{Component}\*.styles.ts`
- `D:\Github\Saha-ui\src\components\{Component}\*.types.ts`

Survey used "very thorough" exploration mode across 20 components.
