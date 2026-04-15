# Saha UI Comprehensive Component QA Report

Date: 2026-04-15 18:12
Auditor Profile: Senior QA (17 years) static audit approach
Scope: All component folders under src/components with one-by-one review entries
Method: Source architecture scan, package export check, example coverage check, accessibility marker scan, and build verification

## Executive Summary

- Total components audited: 128
- Build status (vite build): PASS
- Automated test files detected by pattern: 223
- Low risk components: 86
- Medium risk components: 42
- High risk components: 0
- Critical risk components: 0

## Key Portfolio Findings

- Components missing entry file: None
- Components not exported from root index: None
- Components missing .styles.ts: 0
- Components missing .types.ts: 0
- Components without direct Example file: 0
- Components with limited a11y markers in source scan: 44
- Components lacking pattern-matched tests: 121

## Component QA Matrix

| # | Component | Exported | Entry | Types | Styles | Example | A11y Markers | Risk |
|---|---|---|---|---|---|---|---|---|
| 1 | Accordion | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, focus | Low |
| 2 | Affix | Yes | Yes | Yes | Yes | Yes | aria, tabIndex, focus, announcement | Low |
| 3 | Alert | Yes | Yes | Yes | Yes | Yes | aria, role, tabIndex, focus, announcement | Low |
| 4 | AnnouncementBar | Yes | Yes | Yes | Yes | Yes | aria, role, focus, announcement | Low |
| 5 | AppBar | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus, announcement | Low |
| 6 | AspectRatio | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus, announcement | Low |
| 7 | Autocomplete | Yes | Yes | Yes | Yes | Yes | keyboard, tabIndex, focus | Low |
| 8 | Avatar | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 9 | AvatarGroup | Yes | Yes | Yes | Yes | Yes | keyboard, tabIndex | Low |
| 10 | Backdrop | Yes | Yes | Yes | Yes | Yes | aria | Medium |
| 11 | Badge | Yes | Yes | Yes | Yes | Yes | aria, focus, announcement | Low |
| 12 | BottomNavigation | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 13 | Breadcrumb | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 14 | Button | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 15 | ButtonGroup | Yes | Yes | Yes | Yes | Yes | role, focus | Low |
| 16 | Calendar | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 17 | Card | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 18 | Carousel | Yes | Yes | Yes | Yes | Yes | aria | Medium |
| 19 | Chart | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 20 | ChatBubble | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 21 | Checkbox | Yes | Yes | Yes | Yes | Yes | aria, role, focus, announcement | Low |
| 22 | Chip | Yes | Yes | Yes | Yes | Yes | aria, tabIndex | Low |
| 23 | CodeEditor | Yes | Yes | Yes | Yes | Yes | aria, tabIndex, focus | Low |
| 24 | Collapsible | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 25 | ColorPicker | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 26 | Combobox | Yes | Yes | Yes | Yes | Yes | aria, role, tabIndex, focus | Low |
| 27 | Command | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 28 | Confetti | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 29 | Container | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 30 | ContextMenu | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 31 | CookieConsent | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 32 | CountdownTimer | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 33 | DataTable | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 34 | DatePicker | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 35 | DateRangePicker | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 36 | DateTimePicker | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 37 | Dialog | Yes | Yes | Yes | Yes | Yes | aria, role, tabIndex, focus | Low |
| 38 | Dock | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 39 | DragDrop | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus, announcement | Low |
| 40 | Drawer | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 41 | Dropdown | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 42 | Empty | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 43 | Field | Yes | Yes | Yes | Yes | Yes | aria, role, announcement | Low |
| 44 | FileInput | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus, announcement | Low |
| 45 | FloatingActionButton | Yes | Yes | Yes | Yes | Yes | focus | Medium |
| 46 | FloatingToolbar | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 47 | Form | Yes | Yes | Yes | Yes | Yes | aria, role, focus, announcement | Low |
| 48 | GanttChart | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 49 | Grid | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 50 | HoverCard | Yes | Yes | Yes | Yes | Yes | focus | Medium |
| 51 | IconButton | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 52 | Image | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 53 | ImageCropper | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 54 | ImageGallery | Yes | Yes | Yes | Yes | Yes | aria | Medium |
| 55 | InfiniteScroll | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 56 | Input | Yes | Yes | Yes | Yes | Yes | aria, role, focus, announcement | Low |
| 57 | InputOTP | Yes | Yes | Yes | Yes | Yes | aria, keyboard, focus | Low |
| 58 | Item | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 59 | KanbanBoard | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 60 | Kbd | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 61 | Label | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 62 | Link | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 63 | List | Yes | Yes | Yes | Yes | Yes | none | Low |
| 64 | Masonry | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 65 | Menubar | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 66 | MultiSelect | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 67 | NativeSelect | Yes | Yes | Yes | Yes | Yes | role, focus | Low |
| 68 | NavigationMenu | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 69 | Notification | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 70 | NotificationCenter | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 71 | NumberInput | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 72 | OTPDisplayBlock | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 73 | Pagination | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 74 | Paper | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 75 | PasswordInput | Yes | Yes | Yes | Yes | Yes | aria, tabIndex, focus | Low |
| 76 | PhoneInput | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 77 | PlayButton | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 78 | Popover | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 79 | Progress | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 80 | QRCode | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 81 | Radio | Yes | Yes | Yes | Yes | Yes | focus | Medium |
| 82 | Rating | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 83 | Resizable | Yes | Yes | Yes | Yes | Yes | focus | Medium |
| 84 | Result | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 85 | ScrollArea | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 86 | SearchInput | Yes | Yes | Yes | Yes | Yes | aria, keyboard, tabIndex, focus | Low |
| 87 | Section | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 88 | Segmented | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 89 | Select | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 90 | Separator | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 91 | Sidebar | Yes | Yes | Yes | Yes | Yes | aria, announcement | Low |
| 92 | Skeleton | Yes | Yes | Yes | Yes | Yes | aria, role, announcement | Low |
| 93 | Slider | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 94 | Snackbar | Yes | Yes | Yes | Yes | Yes | aria, role, focus, announcement | Low |
| 95 | Sonner | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 96 | SpeedDial | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 97 | Spinner | Yes | Yes | Yes | Yes | Yes | aria, role, announcement | Low |
| 98 | SplitButton | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 99 | SpotlightSearch | Yes | Yes | Yes | Yes | Yes | focus | Medium |
| 100 | Stack | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 101 | StatCard | Yes | Yes | Yes | Yes | Yes | aria, keyboard, tabIndex | Low |
| 102 | Stepper | Yes | Yes | Yes | Yes | Yes | keyboard, tabIndex | Low |
| 103 | Steps | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 104 | Switch | Yes | Yes | Yes | Yes | Yes | role, focus, announcement | Low |
| 105 | Tab | Yes | Yes | Yes | Yes | Yes | aria, role | Low |
| 106 | Table | Yes | Yes | Yes | Yes | Yes | none | Low |
| 107 | Tag | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 108 | TagInput | Yes | Yes | Yes | Yes | Yes | aria, keyboard, focus | Low |
| 109 | TextArea | Yes | Yes | Yes | Yes | Yes | aria, keyboard, focus | Low |
| 110 | TextEditor | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 111 | ThemeProvider | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 112 | ThemeToggle | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 113 | TickerCarousel | Yes | Yes | Yes | Yes | Yes | aria, role, tabIndex, focus | Low |
| 114 | Timeline | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 115 | TimePicker | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, focus | Low |
| 116 | Toast | Yes | Yes | Yes | Yes | Yes | aria, role, announcement | Low |
| 117 | Toggle | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 118 | ToggleGroup | Yes | Yes | Yes | Yes | Yes | aria, focus | Low |
| 119 | Tooltip | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 120 | Tour | Yes | Yes | Yes | Yes | Yes | aria, role, focus | Low |
| 121 | Transfer | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex, focus | Low |
| 122 | Tree | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 123 | TypewriterText | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 124 | Typography | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 125 | Upload | Yes | Yes | Yes | Yes | Yes | focus, announcement | Low |
| 126 | VideoPlayer | Yes | Yes | Yes | Yes | Yes | aria, role, keyboard, tabIndex | Low |
| 127 | VirtualList | Yes | Yes | Yes | Yes | Yes | none | Medium |
| 128 | Watermark | Yes | Yes | Yes | Yes | Yes | none | Medium |

## One-by-One Detailed QA Notes

### 1. Accordion

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AccordionExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 2. Affix

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=8
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=Yes, Utils=Yes
- Documentation coverage: Example=Yes (AffixExample.tsx), README=Yes
- Accessibility markers: aria, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 3. Alert

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=7
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AlertExample.tsx), README=Yes
- Accessibility markers: aria, role, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 4. AnnouncementBar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AnnouncementBarExample.tsx), README=Yes
- Accessibility markers: aria, role, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 5. AppBar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=8
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=Yes, Utils=No
- Documentation coverage: Example=Yes (AppBarExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 6. AspectRatio

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AspectRatioExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 7. Autocomplete

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AutocompleteExample.tsx), README=Yes
- Accessibility markers: keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 8. Avatar

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AvatarExample.tsx, AvatarGroupExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 9. AvatarGroup

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (AvatarGroupExample.tsx), README=Yes
- Accessibility markers: keyboard, tabIndex
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 10. Backdrop

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (BackdropExample.tsx), README=Yes
- Accessibility markers: aria
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 11. Badge

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (BadgeExample.tsx), README=Yes
- Accessibility markers: aria, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 12. BottomNavigation

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (BottomNavigationExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 13. Breadcrumb

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (BreadcrumbExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 14. Button

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ButtonExample.tsx, ButtonGroupExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 15. ButtonGroup

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ButtonGroupExample.tsx), README=Yes
- Accessibility markers: role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 16. Calendar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CalendarExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 17. Card

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CardExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 18. Carousel

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CarouselExample.tsx), README=Yes
- Accessibility markers: aria
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 19. Chart

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=High, Source files=21
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ChartExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 20. ChatBubble

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ChatBubbleExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 21. Checkbox

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CheckboxExample.tsx, CheckboxGroupExample.tsx), README=Yes
- Accessibility markers: aria, role, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 22. Chip

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ChipExample.tsx), README=Yes
- Accessibility markers: aria, tabIndex
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 23. CodeEditor

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=High, Source files=12
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=Yes, Context=No, Utils=No
- Documentation coverage: Example=Yes (CodeEditorExample.tsx), README=Yes
- Accessibility markers: aria, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 24. Collapsible

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CollapsibleExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 25. ColorPicker

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ColorPickerExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 26. Combobox

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ComboboxExample.tsx), README=Yes
- Accessibility markers: aria, role, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 27. Command

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CommandExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 28. Confetti

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ConfettiExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 29. Container

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ContainerExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 30. ContextMenu

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ContextMenuExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 31. CookieConsent

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CookieConsentExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 32. CountdownTimer

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (CountdownTimerExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 33. DataTable

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DataTableExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 34. DatePicker

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=6
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=Yes
- Documentation coverage: Example=Yes (DatePickerExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 35. DateRangePicker

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DateRangePickerExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 36. DateTimePicker

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DateTimePickerExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 37. Dialog

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=8
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DialogExample.tsx), README=Yes
- Accessibility markers: aria, role, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 38. Dock

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DockExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 39. DragDrop

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=High, Source files=15
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=Yes
- Documentation coverage: Example=Yes (DragDropAdvancedExample.tsx, DragDropBasicExample.tsx, DragDropExample.tsx, DragDropMultiSelectionExample.tsx, DragDropPluginExample.tsx, DragDropTreeExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 40. Drawer

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=8
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DrawerExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 41. Dropdown

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (DropdownExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 42. Empty

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (EmptyExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 43. Field

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (FieldExample.tsx), README=Yes
- Accessibility markers: aria, role, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 44. FileInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (FileInputExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 45. FloatingActionButton

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (FloatingActionButtonExample.tsx), README=Yes
- Accessibility markers: focus
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 46. FloatingToolbar

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (FloatingToolbarExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 47. Form

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (FormExample.tsx), README=Yes
- Accessibility markers: aria, role, focus, announcement
- Risk 1: No structural gaps found in this static QA scan.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 48. GanttChart

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (GanttChartExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 49. Grid

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (GridExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 50. HoverCard

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (HoverCardExample.tsx), README=Yes
- Accessibility markers: focus
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 51. IconButton

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (IconButtonExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 52. Image

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ImageCropperExample.tsx, ImageExample.tsx, ImageGalleryExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 53. ImageCropper

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ImageCropperExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 54. ImageGallery

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ImageGalleryExample.tsx), README=Yes
- Accessibility markers: aria
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 55. InfiniteScroll

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (InfiniteScrollExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 56. Input

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (InputExample.tsx, InputOTPExample.tsx), README=Yes
- Accessibility markers: aria, role, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 57. InputOTP

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (InputOTPExample.tsx), README=Yes
- Accessibility markers: aria, keyboard, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 58. Item

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ItemExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 59. KanbanBoard

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (KanbanBoardExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 60. Kbd

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (KbdExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 61. Label

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (LabelExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 62. Link

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (LinkExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 63. List

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ListExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 64. Masonry

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (MasonryExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 65. Menubar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (MenubarExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 66. MultiSelect

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (MultiSelectExample.tsx, MultiSelectionExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 67. NativeSelect

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (NativeSelectExample.tsx), README=Yes
- Accessibility markers: role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 68. NavigationMenu

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (NavigationMenuExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 69. Notification

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (NotificationCenterExample.tsx, NotificationExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 70. NotificationCenter

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (NotificationCenterExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 71. NumberInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (NumberInputExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 72. OTPDisplayBlock

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (OTPDisplayBlockExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 73. Pagination

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PaginationExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 74. Paper

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PaperExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 75. PasswordInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PasswordInputExample.tsx), README=Yes
- Accessibility markers: aria, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 76. PhoneInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PhoneInputExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 77. PlayButton

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PlayButtonExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 78. Popover

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (PopoverExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 79. Progress

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ProgressExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 80. QRCode

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (QRCodeExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 81. Radio

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (RadioAdvancedExample.tsx, RadioExample.tsx), README=Yes
- Accessibility markers: focus
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 82. Rating

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=7
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (RatingExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 83. Resizable

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ResizableExample.tsx), README=Yes
- Accessibility markers: focus
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 84. Result

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ResultExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 85. ScrollArea

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ScrollAreaExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 86. SearchInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SearchInputExample.tsx), README=Yes
- Accessibility markers: aria, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 87. Section

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SectionExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No structural gaps found in this static QA scan.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 88. Segmented

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SegmentedExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 89. Select

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SelectExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No structural gaps found in this static QA scan.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 90. Separator

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SeparatorExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 91. Sidebar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SidebarExample.tsx), README=Yes
- Accessibility markers: aria, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 92. Skeleton

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=High, Source files=13
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SkeletonExample.tsx), README=Yes
- Accessibility markers: aria, role, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 93. Slider

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SliderExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 94. Snackbar

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SnackbarExample.tsx), README=Yes
- Accessibility markers: aria, role, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 95. Sonner

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SonnerExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 96. SpeedDial

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SpeedDialExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 97. Spinner

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SpinnerExample.tsx), README=Yes
- Accessibility markers: aria, role, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 98. SplitButton

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SplitButtonExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 99. SpotlightSearch

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SpotlightSearchExample.tsx), README=Yes
- Accessibility markers: focus
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 100. Stack

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (StackExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No structural gaps found in this static QA scan.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 101. StatCard

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (StatCardExample.tsx), README=Yes
- Accessibility markers: aria, keyboard, tabIndex
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 102. Stepper

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (StepperExample.tsx), README=Yes
- Accessibility markers: keyboard, tabIndex
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 103. Steps

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (StepsExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 104. Switch

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (SwitchExample.tsx), README=Yes
- Accessibility markers: role, focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 105. Tab

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TabExample.tsx, TableExample.tsx), README=Yes
- Accessibility markers: aria, role
- Risk 1: No structural gaps found in this static QA scan.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 106. Table

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TableExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 107. Tag

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TagExample.tsx, TagInputExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 108. TagInput

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TagInputExample.tsx), README=Yes
- Accessibility markers: aria, keyboard, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 109. TextArea

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TextAreaExample.tsx), README=Yes
- Accessibility markers: aria, keyboard, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 110. TextEditor

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TextEditorExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 111. ThemeProvider

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=6
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ThemeProviderExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 112. ThemeToggle

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ThemeToggleExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 113. TickerCarousel

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TickerCarouselExample.tsx), README=Yes
- Accessibility markers: aria, role, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 114. Timeline

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TimelineExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 115. TimePicker

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=6
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=Yes
- Documentation coverage: Example=Yes (TimePickerExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 116. Toast

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=6
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ToastExample.tsx), README=Yes
- Accessibility markers: aria, role, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 117. Toggle

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ToggleExample.tsx, ToggleGroupExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 118. ToggleGroup

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (ToggleGroupExample.tsx), README=Yes
- Accessibility markers: aria, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 119. Tooltip

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TooltipExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 120. Tour

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TourExample.tsx), README=Yes
- Accessibility markers: aria, role, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate open-close lifecycle, click-away handling, and escape-key dismissal rules.
- Recommended test 2: Confirm focus management including initial focus, trap rules, and focus restoration.
- Recommended test 3: Verify portal layering, z-index conflicts, and scroll-lock behavior with nested overlays.

### 121. Transfer

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TransferExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex, focus
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 122. Tree

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TreeExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 123. TypewriterText

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TypewriterTextExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 124. Typography

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (TypographyExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 125. Upload

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=5
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (UploadExample.tsx), README=Yes
- Accessibility markers: focus, announcement
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Validate keyboard-only form flow including tab, shift+tab, arrows, enter, and escape behavior.
- Recommended test 2: Verify validation and error-state rendering for empty, invalid, boundary, and long input values.
- Recommended test 3: Confirm touch and responsive behavior on mobile and tablet breakpoints.

### 126. VideoPlayer

- QA verdict: Low risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Medium, Source files=6
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (VideoPlayerExample.tsx), README=Yes
- Accessibility markers: aria, role, keyboard, tabIndex
- Risk 1: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

### 127. VirtualList

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (VirtualListExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Run performance checks with large datasets and monitor frame drops during interaction.
- Recommended test 2: Verify sorting, filtering, selection, and keyboard navigation paths where applicable.
- Recommended test 3: Validate empty, loading, and error states to avoid layout shifts and stale UI.

### 128. Watermark

- QA verdict: Medium risk
- Packaging status: Exported=Yes, Entry=Yes, Complexity=Low, Source files=4
- Architecture coverage: Types=Yes, Styles=Yes, Hooks=No, Context=No, Utils=No
- Documentation coverage: Example=Yes (WatermarkExample.tsx), README=Yes
- Accessibility markers: none
- Risk 1: Limited accessibility markers in source scan; manual WCAG checks required.
- Risk 2: No component-specific automated tests detected by naming pattern.
- Recommended test 1: Verify all visual variants across light and dark themes for contrast and consistency.
- Recommended test 2: Confirm semantic roles, focus visibility, and screen-reader announcement behavior.
- Recommended test 3: Run responsive checks across mobile, tablet, and desktop to detect spacing regressions.

## Final QA Recommendation

- Close Critical and High findings first to de-risk release readiness.
- Add baseline automated tests for high-use and interaction-heavy components.
- Standardize architecture parity (entry, types, styles, examples) for all public components.
- Run manual accessibility checks for components flagged with limited markers.

## Prioritized Fix Roadmap (P0/P1/P2)

### P0 - Release Blockers (Start Immediately)

- Objective: eliminate Critical risk and API-surface inconsistencies before any release candidate.
- Scope components: Notification, VirtualList, TickerCarousel.
- Action 1: define public API intent for Notification and TickerCarousel (export from root index or mark as internal and move out of public component inventory).
- Action 2: implement Notification architecture parity by adding entry contract, typed props contract, style contract, and example parity with package exports.
- Action 3: implement VirtualList architecture parity by adding dedicated .types.ts and .styles.ts, then align with existing usage API.
- Action 4: add accessibility minimum for all P0 components including role semantics, keyboard navigation, focus handling, and screen reader labels.
- Action 5: add component-level smoke tests for P0 components covering render, interaction, and basic accessibility assertions.
- Exit criteria: zero Critical components; zero unresolved root export decisions; build and lint pass with no new regressions.

### P1 - High Risk Stabilization (After P0)

- Objective: remove structural High risk across the library and normalize component architecture.
- Scope components: CodeEditor, CountdownTimer, DateRangePicker, DateTimePicker, GanttChart, ImageGallery, InfiniteScroll, KanbanBoard, MultiSelect, QRCode, ThemeProvider.
- Action 1: add missing .styles.ts contracts where absent and ensure style variant typing is consistent.
- Action 2: run targeted accessibility hardening for these components, prioritizing keyboard interactions and semantic role coverage.
- Action 3: add or improve component-specific examples where behavior is complex or currently ambiguous.
- Action 4: add baseline test cases for each component covering rendering, primary interactions, and major variant branches.
- Exit criteria: High count reduced to 0; all scoped components have types and styles parity; accessibility checks documented.

### P2 - Medium Risk Quality Lift (Continuous)

- Objective: improve maintainability and confidence at scale for Medium risk portfolio components.
- Scope: Medium risk set, with emphasis on components flagged with limited accessibility markers and missing test patterns.
- Action 1: execute a11y sweep for Medium components with a standard checklist (semantics, focus states, keyboard flow, announcements).
- Action 2: expand automated test matrix for frequently used components first (Button, Input, Select, Dialog, Table, Snackbar, Toast).
- Action 3: verify responsive behavior and visual regression risk for interactive and data-heavy components.
- Action 4: reconcile docs with implementation behavior to prevent API drift in future releases.
- Exit criteria: Medium count reduced sprint-over-sprint with measurable coverage growth in test and accessibility reports.

## Execution Sequence and Ownership

- Step 1: assign one owner for API contracts and exports, one owner for accessibility, one owner for tests.
- Step 2: complete P0 in a short hardening cycle before feature work resumes.
- Step 3: execute P1 in parallel workstreams by component cluster (form, data-display, overlay, utility).
- Step 4: run P2 as rolling quality backlog with weekly burn-down targets.

## Suggested Release Gates

- Gate A (Blocker Gate): all P0 exit criteria complete.
- Gate B (Stability Gate): all P1 components closed with updated docs and tests.
- Gate C (Quality Gate): Medium risk trend declining and accessibility/test coverage visibly improved.
