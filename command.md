# SAHA UI - Component Development Instructions

## 📋 Component to Build: [COMPONENT_NAME]

---

## ✅ TEST CASES

### Basic Rendering
- [ ] Component renders without crashing
- [ ] Component renders with default props
- [ ] Component renders with all prop variants
- [ ] Component renders children correctly
- [ ] Component applies custom className
- [ ] Component forwards ref correctly

### Variants Testing
- [ ] Test 'solid' variant
- [ ] Test 'outline' variant
- [ ] Test 'ghost' variant
- [ ] Test 'glass' variant (if applicable)
- [ ] Test 'gradient' variant (if applicable)

### Size Testing
- [ ] Test 'sm' size
- [ ] Test 'md' size (default)
- [ ] Test 'lg' size
- [ ] Test 'xl' size (if applicable)

### Color/Theme Testing
- [ ] Test default color
- [ ] Test 'primary' color
- [ ] Test 'secondary' color
- [ ] Test 'success' color
- [ ] Test 'warning' color
- [ ] Test 'error' color
- [ ] Test 'info' color
- [ ] Component works in light mode
- [ ] Component works in dark mode

### State Testing
- [ ] Test default state
- [ ] Test hover state (if interactive)
- [ ] Test focus state (if interactive)
- [ ] Test active/pressed state (if interactive)
- [ ] Test disabled state
- [ ] Test loading state (if applicable)
- [ ] Test error state (if applicable)

### Interaction Testing
- [ ] onClick handler fires correctly
- [ ] onChange handler fires correctly (if form component)
- [ ] onFocus handler works
- [ ] onBlur handler works
- [ ] Keyboard navigation works (Tab, Enter, Space, Arrows)
- [ ] Component handles rapid clicks/interactions

### Accessibility Testing
- [ ] Has proper ARIA labels
- [ ] Has proper ARIA roles
- [ ] Has proper ARIA states (aria-disabled, aria-expanded, etc.)
- [ ] Keyboard accessible (can navigate with Tab)
- [ ] Focus visible styles present
- [ ] Screen reader announcements work
- [ ] Supports aria-label prop
- [ ] Supports aria-labelledby prop
- [ ] Supports aria-describedby prop
- [ ] Color contrast meets WCAG standards

### Edge Cases
- [ ] Handles very long text/content
- [ ] Handles empty/null/undefined props
- [ ] Handles missing required props gracefully
- [ ] Handles special characters
- [ ] Handles rapid prop changes
- [ ] Handles unmounting correctly
- [ ] No memory leaks
- [ ] No console errors or warnings

### Responsive Testing
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Touch interactions work on mobile
- [ ] Hover interactions work on desktop

### Integration Testing
- [ ] Works with Form component
- [ ] Works with Field component
- [ ] Works inside Card component
- [ ] Works inside Dialog/Drawer
- [ ] Works with other SAHA UI components
- [ ] Works with ThemeProvider

### Performance Testing
- [ ] Renders quickly (< 16ms for 60fps)
- [ ] Re-renders only when necessary
- [ ] Doesn't cause layout thrashing
- [ ] Animations are smooth (60fps)
- [ ] No unnecessary re-renders with React.memo (if needed)

---

## 🏗️ BUILD CHECKLIST

### File Structure
```
src/components/[ComponentName]/
  ├── index.ts                    # Public exports
  ├── [ComponentName].tsx         # Main component
  ├── [ComponentName].types.ts    # TypeScript types
  ├── [ComponentName].styles.ts   # CVA variants (if complex)
  └── [ComponentName].stories.tsx # Storybook stories (optional)
```

**Note:** Test files should NOT be created inside the component directory.

### Component Implementation
- [ ] Create main component file
- [ ] Define TypeScript interface/types
- [ ] Implement component with forwardRef
- [ ] Add prop validation with TypeScript
- [ ] Add default props
- [ ] Implement variants using CVA (Class Variance Authority)
- [ ] Add Tailwind CSS classes
- [ ] Add dark mode support
- [ ] Add OKLCH color system integration
- [ ] Implement proper ref forwarding
- [ ] Add displayName for debugging

### Styling
- [ ] Use Tailwind CSS utility classes
- [ ] Use CVA for variant management
- [ ] Support all defined variants (solid, outline, ghost, glass, gradient)
- [ ] Support all sizes (sm, md, lg, xl)
- [ ] Support all colors (default, primary, secondary, success, warning, error, info)
- [ ] Add transition animations
- [ ] Add hover effects
- [ ] Add focus-visible styles
- [ ] Add disabled styles
- [ ] Ensure proper contrast ratios
- [ ] Test in both light and dark modes

### TypeScript Types
- [ ] Define main component props interface
- [ ] Extend appropriate HTML element props
- [ ] Define variant types as const
- [ ] Export all public types
- [ ] Add JSDoc comments for props
- [ ] Make props readonly where appropriate
- [ ] Use discriminated unions for complex states

### Accessibility Implementation
- [ ] Add proper ARIA attributes
- [ ] Add proper semantic HTML
- [ ] Implement keyboard navigation
- [ ] Add focus management
- [ ] Add screen reader support
- [ ] Test with keyboard only
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Add skip links if needed
- [ ] Ensure focus trap if modal/overlay

### Documentation
- [ ] Add JSDoc comments to component
- [ ] Add prop descriptions
- [ ] Add usage examples in comments
- [ ] Create README.md with examples
- [ ] Document all variants
- [ ] Document all props
- [ ] Add migration guide (if replacing existing)
- [ ] Add accessibility notes

### Testing Implementation (Create tests outside component directory)
- [ ] Write unit tests (React Testing Library) - in separate test directory
- [ ] Write integration tests - in separate test directory
- [ ] Write accessibility tests (jest-axe) - in separate test directory
- [ ] Test all variants
- [ ] Test all props combinations
- [ ] Test edge cases
- [ ] Achieve > 80% code coverage
- [ ] Add visual regression tests (optional)

### Hooks (if component needs custom hook)
- [ ] Create useComponentName hook
- [ ] Add TypeScript types for hook
- [ ] Test hook with @testing-library/react-hooks
- [ ] Document hook usage
- [ ] Export hook from main index

### Integration
- [ ] Export from component index.ts
- [ ] Export from main src/index.ts
- [ ] Update COMPONENTS_LIST.txt
- [ ] Add to appropriate category
- [ ] Update component count
- [ ] Update statistics

### Examples & Stories
- [ ] Create basic example
- [ ] Create examples for each variant
- [ ] Create examples for each size
- [ ] Create examples for different states
- [ ] Create composition examples
- [ ] Create form integration examples (if applicable)
- [ ] Create responsive examples

### Performance Optimization
- [ ] Use React.memo if needed
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for event handlers
- [ ] Avoid unnecessary re-renders
- [ ] Optimize animations (use transform/opacity)
- [ ] Lazy load heavy dependencies

### Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Add polyfills if needed

### Final Checks
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] No console errors
- [ ] All tests passing
- [ ] Code formatted (Prettier)
- [ ] No unused imports
- [ ] No commented code
- [ ] Proper error handling
- [ ] Proper loading states

---

## 🎯 USAGE INSTRUCTIONS FOR GITHUB COPILOT

### Method 1: Direct Component Request
1. Open/create the component file
2. Highlight this entire document
3. Say: "Build the [ComponentName] component based on these specifications"

### Method 2: Step-by-Step
1. Highlight the file structure section
2. Say: "Create this file structure for [ComponentName]"
3. Highlight the component implementation checklist
4. Say: "Implement the component with all these features"
5. Highlight the test cases section
6. Say: "Write tests covering all these test cases (in separate test directory)"

### Method 3: Specific Tasks
- "Write unit tests for all variants"
- "Add accessibility features with proper ARIA attributes"
- "Create TypeScript types with full JSDoc comments"
- "Implement all CVA variants for this component"
- "Add dark mode support"
- "Create usage examples for all props"

### Method 4: Review & Fix
1. After Copilot generates code, highlight this checklist
2. Say: "Review the code against this checklist and fix any missing items"

---

## 📝 EXAMPLE PROMPTS FOR COPILOT

```
"Create a Tabs component following SAHA UI patterns with:
- Variants: solid, outline, ghost, glass
- Sizes: sm, md, lg
- Colors: all theme colors
- Full TypeScript support
- Accessibility compliant
- Dark mode support
- CVA for variants
- No test files inside component directory"
```

```
"Write comprehensive tests for the Tabs component in a separate test directory covering:
- All variants
- Keyboard navigation
- Accessibility with jest-axe
- Edge cases
- Integration with other components"
```

```
"Add these missing features to the Tabs component:
- [ ] Vertical orientation
- [ ] Icon support
- [ ] Badge integration
- [ ] Controlled/uncontrolled modes
- [ ] Animation transitions"
```

---

## 🚀 QUICK START COMMANDS

### For New Component
```
@workspace Create [ComponentName] component with full SAHA UI setup (no test files in component directory)
```

### For Tests Only
```
@workspace Write comprehensive tests for [ComponentName] in separate test directory following SAHA UI standards
```

### For Types
```
@workspace Create TypeScript types and interfaces for [ComponentName]
```

### For Documentation
```
@workspace Generate documentation and examples for [ComponentName]
```

---

## 💡 PRO TIPS

1. **Be Specific**: Always mention "SAHA UI patterns" to maintain consistency
2. **Reference Similar**: Say "similar to Button component" to guide style
3. **Iterate**: Ask Copilot to review and improve after initial generation
4. **Test First**: Can do TDD by writing tests first, then implementation
5. **Use Context**: Have other SAHA UI components open for context

---

## 📚 COMPONENT PATTERNS TO FOLLOW

### Basic Structure
```typescript
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ },
      color: { /* ... */ },
    },
    defaultVariants: { /* ... */ },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, color, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size, color }), className)}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'
```

---

## 🎨 COLOR SYSTEM (OKLCH)

Use these Tailwind classes for theming:
- `bg-primary` / `text-primary`
- `bg-secondary` / `text-secondary`
- `bg-success` / `text-success`
- `bg-warning` / `text-warning`
- `bg-error` / `text-error`
- `bg-info` / `text-info`

Dark mode: `dark:bg-primary` / `dark:text-primary`

---

## ✨ FINAL INSTRUCTION

To use this document with GitHub Copilot:
1. Select/highlight the relevant section(s)
2. Open Copilot Chat
3. Give clear instruction referencing the highlighted content
4. Review and iterate

**Example**: Highlight "TEST CASES" section → Say: "Write tests for Tabs component covering all these cases"

---

End of Instructions. Ready for your component development! 🚀
