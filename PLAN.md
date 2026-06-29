# Saha UI — Implementation Plan

**Based on:** IMPROVEMENTS.md survey findings  
**Target:** Production-ready accessibility + advanced customization  
**Approach:** Phased, dependency-aware, backward-compatible

---

## Phase 1: Accessibility Foundation (CRITICAL PATH)

**Why first:** Blocks production use for regulated industries. Breaks WCAG 2.1 AA. Dependency for all interactive components.

### 1.1 Focus Management Infrastructure (Week 1, Days 1-2) ✅ DONE

**Goal:** Fix `useFocusTrap` hook, make reusable across Dialog/Drawer/Dropdown.

**Tasks:**
1. ✅ **Audit `src/hooks/useFocusTrap.ts`** — verify it works or rewrite
   - Must trap Tab/Shift+Tab within container
   - Must return focus to trigger on unmount
   - Accept `enabled` boolean, `initialFocus` selector, `returnFocus` ref
   
2. ✅ **Test harness** — create minimal test page with Dialog + nested focusables
   - Verify Tab cycles within dialog
   - Verify Escape returns focus to button that opened it
   - Test with screen reader (NVDA/JAWS/VoiceOver)

**Deliverable:** ✅ Working `useFocusTrap(containerRef, { enabled, returnFocus })` hook.

**Implementation notes (2026-06-29):**
- Hook rewritten with new API: `useFocusTrap(containerRef, { enabled, returnFocus, initialFocus })`
- Tab trap logic verified (lines 36-48)
- Return focus on unmount (cleanup, line 67-69)
- Initial focus with 100ms delay for animations (lines 56-63)
- Test harness: `test-focus-trap.html` (manual browser verification required)
- Note: Dialog already has inline trap implementation (Dialog.tsx:227-280), working correctly
- Note: AppBar has separate local `useFocusTrap` in AppBar.hooks.ts — no conflict

---

### 1.2 Dialog/Drawer Focus Fixes (Week 1, Days 3-4) ✅ DONE

**Dialog** (`src/components/Dialog/Dialog.tsx`):
✅ Already implemented — inline focus trap (lines 227-280), return focus (284-287), `focusTrap`/`returnFocus` props work.

**Drawer** (`src/components/Drawer/Drawer.tsx`):
✅ Fixed — replaced inline focus with `useFocusTrap` hook
- Added `focusTrap` and `returnFocus` props to `Drawer.types.ts`
- Imported `useFocusTrap` from `../../hooks/useFocusTrap`
- Wired hook: `useFocusTrap(drawerRef, { enabled: open && focusTrap, returnFocus: returnFocus ? previousActiveElement : undefined })`
- Removed old inline focus code (was focusing wrapper, not first element)
- Hook now focuses first interactive element + traps Tab

**Acceptance:**
- ✅ Tab trap works (via `useFocusTrap`)
- ✅ Focus returns to trigger (via `returnFocus` ref in hook cleanup)
- ⚠️ Screen reader testing pending (manual NVDA/JAWS/VoiceOver verification required)
- ✅ `aria-modal="true"` present in Dialog (line 362)
- ⚠️ `aria-describedby` still missing from both (deferred to §1.5 ARIA Cleanup)

**Implementation notes (2026-06-29):**
- Dialog skipped — already complete from prior work
- Drawer now uses shared `useFocusTrap` hook instead of inline logic
- Build passes (`npm run build` ✓ 400 modules transformed)

---

### 1.3 Keyboard Navigation (Week 1, Day 5 - Week 2, Day 2)

**Dropdown** (`src/components/Dropdown/index.tsx`):
```tsx
// Line 119: focusedIndex exists, wire DOM focus
const itemRefs = useRef<(HTMLElement | null)[]>([]);

useEffect(() => {
  if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
    itemRefs.current[focusedIndex]?.focus();
  }
}, [focusedIndex]);

// In item render (line ~338):
<div
  ref={el => itemRefs.current[index] = el}
  role="option"
  aria-selected={focusedIndex === index}
  tabIndex={-1}
  // ... rest
>
```

**Select** (`src/components/Select/index.tsx`):
Add keyboard nav from scratch:
```tsx
const [focusedIndex, setFocusedIndex] = useState(0);
const itemRefs = useRef<HTMLElement[]>([]);

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
      break;
    case 'ArrowUp':
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      handleSelect(options[focusedIndex]);
      break;
    case 'Escape':
      setOpen(false);
      break;
  }
};
```

**Tooltip** (`src/components/Tooltip/index.tsx`):
```tsx
// Add aria-describedby link
const contentId = useId();

// On trigger:
<Comp
  aria-describedby={isOpen ? contentId : undefined}
  onKeyDown={(e) => {
    if (e.key === 'Escape') setIsOpen(false);
  }}
  // ...
>

// On content:
<div id={contentId} role="tooltip" aria-hidden={!isOpen}>
```

**Acceptance:**
- Arrow keys navigate Dropdown/Select
- Enter/Space select item
- Escape closes and returns focus
- Screen reader announces "X of Y" position

---

### 1.4 Reduced Motion (Week 2, Day 3)

**Pattern:** Wrap all animation classes in `useReducedMotion` guard.

**Components to fix:**
- Dialog (`Dialog.tsx:151`)
- Drawer (`Drawer.tsx:100`)
- Carousel (`Carousel/index.tsx:244`)
- Toast/Snackbar (search for `animate-` classes)

**Implementation:**
```tsx
import { useReducedMotion } from '../../hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

// Replace:
className="animate-slide-in"
// With:
className={prefersReducedMotion ? '' : 'animate-slide-in'}
```

**Acceptance:**
- Set OS to "reduce motion"
- Open Dialog/Drawer — no slide animation, instant appear
- Components still functional

---

### 1.5 ARIA Cleanup (Week 2, Day 4)

Add missing attributes from IMPROVEMENTS.md §1.2:

| Component | Add |
|-----------|-----|
| Dialog | `aria-describedby={bodyId}` on content |
| Drawer | `aria-describedby={bodyId}` on content |
| Dropdown | `role="listbox"` on container, `role="option"` on items |
| Tooltip | `aria-describedby` link (done in 1.3) |

**Acceptance:** Pass axe-core audit, no ARIA violations.

---

## Phase 2: Type Safety (LOW RISK, HIGH VALUE)

**Why second:** No breaking changes, pure DX improvement. Can run parallel to Phase 1 if needed.

### 2.1 Replace `any` Types (Week 2, Day 5 - Week 3, Day 1)

**File-by-file fixes from IMPROVEMENTS.md §3.1:**

1. **Autocomplete.types.ts:152**
   ```tsx
   // Before:
   renderInput?: (props: any) => React.ReactNode;
   // After:
   renderInput?: (props: InputProps) => React.ReactNode;
   ```

2. **Chart.types.ts:108, 122**
   ```tsx
   tickFormatter?: (value: number | string) => string;
   formatter?: (value: number, name: string, props: TooltipProps) => React.ReactNode;
   ```

3. **ComposedChartComponent.tsx:46**
   ```tsx
   const renderSeries = (series: ChartSeries, index: number) => { ... }
   ```

4. **Command.types.ts:106**
   ```tsx
   // Before: [key: string]: any;
   // After: Define explicit shape or:
   [key: string]: string | number | boolean | undefined;
   ```

5. **DataTable.types.ts:60, 117**
   ```tsx
   // Use generic:
   export interface ColumnDef<T> {
     filterValue?: T;
     cell?: (value: T) => React.ReactNode;
   }
   ```

6. **DateTimePicker/index.tsx:95**
   ```tsx
   const handleTimeChange = (time: Date | string) => { ... }
   ```

**Acceptance:** `npm run build` with `strict: true`, zero `any` in modified files.

---

### 2.2 Extend Native Props (Week 3, Day 2)

**Check and fix from IMPROVEMENTS.md §3.2:**

```tsx
// Select.types.ts
export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  // ... existing props
}

// Combobox.types.ts
export interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  // ...
}

// Checkbox (wrapper).types.ts
export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  // ...
}
```

**Acceptance:** Native props (`data-*`, `aria-*`, `onMouseEnter`, etc.) pass TypeScript and work at runtime.

---

## Phase 3: Advanced Customization (FEATURE WORK)

**Why third:** Non-breaking enhancement. Can add without touching existing APIs.

### 3.1 Slot-Styling API (Week 3, Day 3 - Week 4, Day 2)

**Goal:** Unified `classNames={{}}` object for multi-part components.

**Pattern (example: Dialog):**
```tsx
// Dialog.types.ts
export interface DialogProps {
  // ... existing
  classNames?: {
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
  // Backward compat aliases:
  overlayClassName?: string;
  contentClassName?: string;
  // ...
}

// Dialog.tsx
const {
  classNames,
  overlayClassName,
  contentClassName,
  // ...
} = props;

// Merge with precedence: classNames.overlay < overlayClassName
<div className={cn(
  baseOverlayClasses,
  classNames?.overlay,
  overlayClassName // wins if both present
)}>
```

**Components to implement (priority order):**
1. Dialog (4 parts) — most requested
2. Card (5 parts)
3. Select (3 parts)
4. Accordion (3 parts)
5. Table (6 parts)
6. Dropdown (2 parts)
7. Tabs (3 parts)

**Acceptance:**
```tsx
<Dialog classNames={{ overlay: "bg-red-500/50", content: "max-w-4xl" }}>
// Renders with custom classes, existing overlayClassName still works
```

---

### 3.2 Export CVA Variants (Week 4, Day 3)

**Task:** Export all `*Variants` from component `.styles.ts` files via `src/index.ts`.

**Current exports (keep):**
- `buttonVariants`
- `badgeVariants`

**Add to barrel:**
```tsx
// src/index.ts
export { inputVariants } from "./components/Input/Input.styles";
export { cardVariants, cardHeaderVariants, cardTitleVariants, cardContentVariants, cardFooterVariants } from "./components/Card/Card.styles";
export { dialogVariants, dialogOverlayVariants, dialogContentVariants } from "./components/Dialog/Dialog.styles";
export { selectVariants, selectTriggerVariants, selectContentVariants, selectItemVariants } from "./components/Select/Select.styles";
// ... all components with CVA
```

**Acceptance:** External code can call `inputVariants({ size: 'lg', variant: 'outline' })` after importing from `saha-ui`.

---

### 3.3 Extend `asChild` Support (Week 4, Day 4)

**Current support:** Button, Card, Badge, Tooltip, Accordion, DropdownTrigger (50%)

**Add to:**
- Input — allow `<Input asChild><CustomInput /></Input>`
- Checkbox/Radio — allow custom control element
- Dialog/Drawer trigger wrappers
- Select trigger

**Pattern (Input example):**
```tsx
// Input.types.ts
export interface InputProps {
  asChild?: boolean;
  // ...
}

// Input/index.tsx
import { Slot } from '../../lib/Slot';

const Comp = asChild ? Slot : 'input';
return <Comp ref={ref} className={cn(inputVariants({ ... }), className)} {...props} />;
```

**Acceptance:**
```tsx
<Input asChild>
  <MyCustomInput />
</Input>
// MyCustomInput receives merged className + props
```

---

### 3.4 Unstyled Mode (Week 4, Day 5)

**Goal:** Opt-out of all variant styles for headless use.

**Pattern:**
```tsx
// Every component:
export interface XProps {
  unstyled?: boolean;
  // ...
}

// In component:
const classes = unstyled ? '' : cn(xVariants({ variant, size }), className);
```

**Acceptance:**
```tsx
<Button unstyled className="custom-btn">
// Renders <button class="custom-btn"> with no Saha UI classes
```

---

### 3.5 Render Props (Week 5, Days 1-2)

**Add to components from IMPROVEMENTS.md §2.5:**

**Dropdown:**
```tsx
interface DropdownProps {
  renderItem?: (item: DropdownItem, index: number) => React.ReactNode;
  // ...
}
```

**Autocomplete:**
```tsx
interface AutocompleteProps {
  renderOption?: (option: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  // renderInput already exists, fix type per Phase 2
}
```

**Table:**
```tsx
interface ColumnDef<T> {
  renderCell?: (value: T, row: Row<T>) => React.ReactNode;
  renderHeader?: (column: ColumnDef<T>) => React.ReactNode;
}
```

**Avatar:**
```tsx
interface AvatarProps {
  renderFallback?: (initials: string) => React.ReactNode;
}
```

**Acceptance:** Custom render functions override default rendering.

---

## Phase 4: Consistency Polish (OPTIONAL)

**Why last:** Breaking changes. Ship as v2.0 if done.

### 4.1 Unify Callback Naming (Week 5, Day 3)

**Current inconsistency:**
- Select: `onValueChange`
- Input/Checkbox: `onChange`
- Dialog: `onOpenChange`
- Accordion: `onValueChange`

**Proposal:**
- Value changes → `onChange`
- Open/close state → `onOpenChange`

**Migration:**
```tsx
// Deprecate onValueChange, alias to onChange
export interface SelectProps {
  onChange?: (value: string) => void;
  /** @deprecated Use onChange */
  onValueChange?: (value: string) => void;
}

// In component:
const handleChange = onChange || onValueChange;
```

**Acceptance:** Log deprecation warnings, publish migration guide.

---

### 4.2 Unify Boolean Props (Week 5, Day 4)

**Current inconsistency:**
- Dialog: `open`
- Dropdown: `isOpen`
- Tooltip: `isOpen`

**Proposal:** Use `open` everywhere (matches native `<dialog>`).

**Migration:**
```tsx
export interface TooltipProps {
  open?: boolean;
  /** @deprecated Use open */
  isOpen?: boolean;
}

const openState = open ?? isOpen;
```

---

## Testing Strategy

### Per-Phase Acceptance Criteria

**Phase 1 (A11y):**
- [ ] Pass axe-core audit (0 violations)
- [ ] Manual keyboard-only navigation through all interactive components
- [ ] Screen reader testing (NVDA on Windows, VoiceOver on Mac)
- [ ] Test in `prefers-reduced-motion: reduce` mode

**Phase 2 (Types):**
- [ ] `npm run build` succeeds with `strict: true`
- [ ] No `@ts-ignore` or `any` in modified files
- [ ] Native props autocomplete in VS Code

**Phase 3 (Customization):**
- [ ] Create example page using all new APIs (`classNames`, `asChild`, `unstyled`, render props)
- [ ] Verify backward compat — existing `*ClassName` props still work
- [ ] External CVA usage compiles and renders correctly

**Phase 4 (Consistency):**
- [ ] Deprecation warnings log correctly
- [ ] No runtime breaks when using old prop names
- [ ] Migration guide published

---

## Risk Mitigation

### Breaking Change Guardrails

1. **Never remove props** — deprecate + alias instead
2. **Default behavior unchanged** — new features opt-in
3. **Spread props preserved** — existing `{...props}` still work
4. **Version carefully:**
   - Phase 1-3: `v1.26.0` (semver minor)
   - Phase 4 (if breaking): `v2.0.0` (semver major)

### Dependencies

**External:**
- `useFocusTrap` must work before Dialog/Drawer fixes
- `useReducedMotion` already exists, just needs usage

**Internal:**
- Phase 1 blocks nothing (pure fixes)
- Phase 2 blocks nothing (types only)
- Phase 3 can run parallel to Phase 1-2
- Phase 4 requires completed Phase 1-3 for testing

---

## Success Metrics

**Accessibility:**
- 100% WCAG 2.1 AA compliance (axe-core)
- Zero keyboard-only navigation blockers
- Screen reader compatibility verified

**Customization:**
- All multi-part components support `classNames={{}}`
- All CVA variants exported
- 80%+ components support `asChild`

**Type Safety:**
- Zero `any` in public API surfaces
- 100% native prop extension

**Consistency:**
- Unified naming conventions documented
- Deprecation warnings logged
- Migration guide published

---

## Post-Implementation

1. **Update docs** — add examples for all new APIs
2. **Publish guide** — "Migrating to v1.26/v2.0"
3. **Announce** — changelog, Twitter, Discord
4. **Monitor** — GitHub issues for edge cases
5. **Iterate** — address feedback in patch releases
