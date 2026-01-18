# Affix

A component that makes an element "stick" to the viewport when scrolling. Useful for creating sticky headers, sidebars, toolbars, and other elements that should remain visible while scrolling.

## Features

- 📌 Sticky positioning with configurable offsets
- ⬆️ Top and bottom affixing support
- 🎯 Custom scroll target support
- 🔄 Callback for state changes
- 📱 Responsive and performant
- ♿ Accessibility-friendly
- 🎨 Customizable z-index and styling
- 🔧 CSS sticky mode option

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Affix, Button } from "saha-ui";

function MyComponent() {
  return (
    <Affix offsetTop={10}>
      <Button>Sticky Button</Button>
    </Affix>
  );
}
```

## Affix to Top

Stick element to the top of the viewport:

```tsx
<Affix offsetTop={0}>
  <div className="bg-white shadow-md p-4">
    <h2>Sticky Header</h2>
    <nav>Navigation items...</nav>
  </div>
</Affix>
```

With offset:

```tsx
<Affix offsetTop={20}>
  <Card>
    <p>This will stick 20px from the top</p>
  </Card>
</Affix>
```

## Affix to Bottom

Stick element to the bottom of the viewport:

```tsx
<Affix offsetBottom={0}>
  <div className="bg-white shadow-md p-4">
    <Button>Back to Top</Button>
  </div>
</Affix>
```

With offset:

```tsx
<Affix offsetBottom={20}>
  <div className="floating-action-button">
    <Button variant="primary" size="lg">
      +
    </Button>
  </div>
</Affix>
```

## Custom Scroll Target

Affix within a specific container instead of the window:

```tsx
function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="h-96 overflow-auto">
      <Affix offsetTop={0} target={() => containerRef.current!}>
        <div className="bg-primary text-white p-4">Sticky within container</div>
      </Affix>

      <div className="h-[1000px]">Long scrollable content...</div>
    </div>
  );
}
```

## State Change Callback

Track when the element becomes affixed:

```tsx
function AffixWithCallback() {
  const [isAffixed, setIsAffixed] = useState(false);

  return (
    <div>
      <p>Affixed: {isAffixed ? "Yes" : "No"}</p>

      <Affix offsetTop={10} onChange={(affixed) => setIsAffixed(affixed)}>
        <div className={`p-4 ${isAffixed ? "shadow-lg" : ""}`}>
          Sticky Content
        </div>
      </Affix>
    </div>
  );
}
```

## Custom Z-Index

Control stacking order:

```tsx
<Affix offsetTop={0} zIndex={1000}>
  <header className="bg-white">
    High priority header
  </header>
</Affix>

<Affix offsetTop={60} zIndex={999}>
  <nav className="bg-gray-100">
    Sub-navigation
  </nav>
</Affix>
```

## CSS Sticky Mode

Use native CSS `position: sticky` instead of JavaScript:

```tsx
<Affix offsetTop={0} useSticky>
  <div className="bg-white p-4">CSS Sticky Header</div>
</Affix>
```

## API Reference

### Affix Props

#### Basic Positioning

| Prop           | Type                                                     | Default  | Description                                                |
| -------------- | -------------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `children`     | `ReactNode`                                              | -        | **Required.** Content to be affixed                        |
| `offsetTop`    | `OffsetValue`                                            | -        | Offset from top when affixed (triggers top affixing)       |
| `offsetBottom` | `OffsetValue`                                            | -        | Offset from bottom when affixed (triggers bottom affixing) |
| `offsetLeft`   | `OffsetValue`                                            | -        | Offset from left (horizontal mode)                         |
| `offsetRight`  | `OffsetValue`                                            | -        | Offset from right (horizontal mode)                        |
| `target`       | `Window \| HTMLElement \| (() => HTMLElement \| Window)` | `window` | Scroll container target                                    |

**Note:** `OffsetValue` can be a `number`, `ResponsiveValue<number>`, or `(scrollInfo: ScrollInfo) => number`

#### Boundaries & Constraints

| Prop                    | Type                                           | Default | Description                                 |
| ----------------------- | ---------------------------------------------- | ------- | ------------------------------------------- |
| `boundaryElement`       | `HTMLElement \| string \| (() => HTMLElement)` | -       | Element that acts as bottom boundary        |
| `containerBounds`       | `HTMLElement \| string \| (() => HTMLElement)` | -       | Container bounds to constrain affixing      |
| `minScrollPosition`     | `number`                                       | -       | Minimum scroll position to activate affix   |
| `maxScrollPosition`     | `number`                                       | -       | Maximum scroll position to activate affix   |
| `respectViewportHeight` | `boolean`                                      | `true`  | Don't affix if content taller than viewport |
| `respectViewportWidth`  | `boolean`                                      | `true`  | Don't affix if content wider than viewport  |

#### Directional Behavior

| Prop                | Type      | Default | Description                         |
| ------------------- | --------- | ------- | ----------------------------------- |
| `affixOnScrollUp`   | `boolean` | `false` | Only show when scrolling up         |
| `affixOnScrollDown` | `boolean` | `false` | Only show when scrolling down       |
| `biDirectional`     | `boolean` | `false` | Enable bi-directional affixing      |
| `minVelocity`       | `number`  | -       | Minimum scroll velocity to activate |
| `maxVelocity`       | `number`  | -       | Maximum scroll velocity to activate |

#### Responsive & Breakpoints

| Prop                  | Type              | Default | Description                         |
| --------------------- | ----------------- | ------- | ----------------------------------- |
| `disabledBreakpoints` | `BreakpointKey[]` | -       | Breakpoints where affix is disabled |
| `enabledBreakpoints`  | `BreakpointKey[]` | -       | Breakpoints where affix is enabled  |
| `disableInLandscape`  | `boolean`         | `false` | Disable in landscape orientation    |
| `disableInPortrait`   | `boolean`         | `false` | Disable in portrait orientation     |

#### Performance & Optimization

| Prop                      | Type                 | Default  | Description                          |
| ------------------------- | -------------------- | -------- | ------------------------------------ |
| `throttle`                | `number`             | -        | Throttle scroll events (ms)          |
| `debounce`                | `number`             | -        | Debounce scroll events (ms)          |
| `useIntersectionObserver` | `boolean`            | `false`  | Use IntersectionObserver API         |
| `intersectionThreshold`   | `number \| number[]` | `[0, 1]` | Intersection threshold               |
| `intersectionRootMargin`  | `string`             | -        | Root margin for IntersectionObserver |
| `useResizeObserver`       | `boolean`            | `true`   | Use ResizeObserver API               |
| `useRAF`                  | `boolean`            | `true`   | Use requestAnimationFrame            |
| `passive`                 | `boolean`            | `true`   | Use passive event listeners          |

#### Styling & Animation

| Prop                  | Type                                             | Default     | Description                       |
| --------------------- | ------------------------------------------------ | ----------- | --------------------------------- |
| `transition`          | `TransitionConfig \| false`                      | -           | Transition configuration          |
| `shadow`              | `boolean \| ShadowConfig`                        | -           | Shadow configuration when affixed |
| `backdrop`            | `boolean \| BackdropConfig`                      | -           | Backdrop blur configuration       |
| `indicator`           | `ReactNode \| ((visible: boolean) => ReactNode)` | -           | Custom indicator element          |
| `useTransform`        | `boolean`                                        | `false`     | Use transform for positioning     |
| `physics`             | `boolean \| PhysicsConfig`                       | -           | Spring physics animation          |
| `widthMode`           | `WidthMode`                                      | `'inherit'` | Width calculation mode            |
| `maxHeight`           | `number \| string`                               | -           | Maximum height when affixed       |
| `preserveAspectRatio` | `boolean`                                        | `false`     | Maintain aspect ratio             |
| `zIndex`              | `number`                                         | `10`        | Z-index for affixed element       |

#### Stacking & Groups

| Prop            | Type      | Default | Description                        |
| --------------- | --------- | ------- | ---------------------------------- |
| `stackId`       | `string`  | -       | ID for stacking context            |
| `stackPriority` | `number`  | `0`     | Priority in stack (lower = higher) |
| `autoStack`     | `boolean` | `false` | Auto-calculate stack offset        |
| `groupId`       | `string`  | -       | Group ID for coordinated affixing  |

#### State & Control

| Prop                 | Type                                             | Default | Description                       |
| -------------------- | ------------------------------------------------ | ------- | --------------------------------- |
| `disabled`           | `boolean`                                        | `false` | Disable affixing                  |
| `affixed`            | `boolean`                                        | -       | Controlled affix state            |
| `useSticky`          | `boolean`                                        | `false` | Use CSS sticky positioning        |
| `stickyWithFallback` | `boolean`                                        | `false` | Use sticky with fallback          |
| `portal`             | `boolean \| string \| HTMLElement`               | -       | Portal target for affixed content |
| `customPosition`     | `(scrollInfo, rect, boundary) => PositionResult` | -       | Custom position calculation       |

#### SSR & Hydration

| Prop             | Type        | Default | Description                |
| ---------------- | ----------- | ------- | -------------------------- |
| `ssr`            | `SSRConfig` | -       | SSR configuration          |
| `hydrateOnMount` | `boolean`   | `true`  | Hydrate on component mount |

#### Accessibility

| Prop                      | Type                                       | Default | Description                              |
| ------------------------- | ------------------------------------------ | ------- | ---------------------------------------- |
| `announceStateChange`     | `boolean`                                  | `false` | Announce state changes to screen readers |
| `stateChangeAnnouncement` | `string \| ((affixed: boolean) => string)` | -       | Custom announcement                      |
| `respectReducedMotion`    | `boolean`                                  | `true`  | Respect prefers-reduced-motion           |
| `preserveFocus`           | `boolean`                                  | `true`  | Preserve focus on affix state change     |
| `affixedTabIndex`         | `number`                                   | -       | Tab index when affixed                   |

#### Debug & Metrics

| Prop            | Type                     | Default | Description                |
| --------------- | ------------------------ | ------- | -------------------------- |
| `debug`         | `boolean \| DebugConfig` | -       | Enable debug mode          |
| `exposeMetrics` | `boolean`                | `false` | Expose performance metrics |

#### Callbacks

| Prop                | Type                                                          | Description                |
| ------------------- | ------------------------------------------------------------- | -------------------------- |
| `onChange`          | `(affixed: boolean, position: AffixPosition) => void`         | Affix state change         |
| `onScroll`          | `(scrollInfo: ScrollInfo) => void`                            | Scroll event               |
| `onPositionChange`  | `(position: PositionInfo) => void`                            | Position change            |
| `onBoundaryReached` | `(boundary: BoundaryInfo) => void`                            | Boundary reached           |
| `onDirectionChange` | `(direction: ScrollDirection, prev: ScrollDirection) => void` | Direction change           |
| `onEnterViewport`   | `() => void`                                                  | Element enters viewport    |
| `onLeaveViewport`   | `() => void`                                                  | Element leaves viewport    |
| `onMetricsUpdate`   | `(metrics: PerformanceMetrics) => void`                       | Performance metrics update |

#### Other Props

| Prop                   | Type            | Default | Description                    |
| ---------------------- | --------------- | ------- | ------------------------------ |
| `className`            | `string`        | -       | Container CSS classes          |
| `contentClassName`     | `string`        | -       | Content wrapper CSS classes    |
| `placeholderClassName` | `string`        | -       | Placeholder CSS classes        |
| `affixedClassName`     | `string`        | -       | CSS classes when affixed       |
| `affixedStyle`         | `CSSProperties` | -       | Inline styles when affixed     |
| `asChild`              | `boolean`       | `false` | Merge props with child element |

## Styling

### Custom Styles

Apply custom styles to the affixed element:

```tsx
<Affix
  offsetTop={0}
  className="border-b border-gray-200"
  contentClassName="container mx-auto"
>
  <header>Styled sticky header</header>
</Affix>
```

### Dynamic Styling Based on Affixed State

```tsx
function DynamicAffix() {
  const [affixed, setAffixed] = useState(false);

  return (
    <Affix
      offsetTop={0}
      onChange={setAffixed}
      className={affixed ? "shadow-lg" : ""}
    >
      <div
        className={`
        transition-all duration-300
        ${affixed ? "bg-white" : "bg-transparent"}
      `}
      >
        Dynamic header
      </div>
    </Affix>
  );
}
```

## Best Practices

1. **Choose Offset Wisely:** Consider other sticky elements when setting offsets
2. **Performance:** Use `useSticky` mode for better performance when possible
3. **Z-Index Management:** Coordinate z-index values across sticky elements
4. **Mobile Considerations:** Test sticky behavior on mobile devices
5. **Content Height:** Ensure affixed content doesn't take up too much viewport space
6. **Accessibility:** Ensure affixed content doesn't interfere with keyboard navigation
7. **Single Direction:** Use either `offsetTop` or `offsetBottom`, not both

## Common Patterns

### Sticky Navigation

```tsx
function StickyNav() {
  return (
    <Affix offsetTop={0} zIndex={100}>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Logo />
            <ul className="flex gap-6">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Affix>
  );
}
```

### Sticky Sidebar

```tsx
function PageWithSidebar() {
  return (
    <div className="flex gap-6">
      <aside className="w-64">
        <Affix offsetTop={20}>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Table of Contents</h3>
            <ul className="space-y-2">
              <li>
                <a href="#section1">Section 1</a>
              </li>
              <li>
                <a href="#section2">Section 2</a>
              </li>
              <li>
                <a href="#section3">Section 3</a>
              </li>
            </ul>
          </div>
        </Affix>
      </aside>

      <main className="flex-1">{/* Main content */}</main>
    </div>
  );
}
```

### Floating Action Button

```tsx
function FloatingActions() {
  return (
    <Affix offsetBottom={20} zIndex={50}>
      <div className="fixed right-6 flex flex-col gap-2">
        <Button variant="primary" shape="circle" size="lg">
          <MessageIcon />
        </Button>
        <Button variant="secondary" shape="circle" size="lg">
          <HelpIcon />
        </Button>
      </div>
    </Affix>
  );
}
```

### Sticky Toolbar

```tsx
function StickyToolbar() {
  const [affixed, setAffixed] = useState(false);

  return (
    <div>
      <div className="h-32 bg-gray-100">Header content above toolbar</div>

      <Affix
        offsetTop={0}
        onChange={setAffixed}
        className={`
          transition-all duration-300
          ${affixed ? "shadow-lg bg-white" : "bg-gray-50"}
        `}
      >
        <div className="px-4 py-2 flex items-center gap-2">
          <Button size="sm" variant="outline">
            Bold
          </Button>
          <Button size="sm" variant="outline">
            Italic
          </Button>
          <Button size="sm" variant="outline">
            Underline
          </Button>
          <div className="mx-2 h-6 w-px bg-gray-300" />
          <Button size="sm" variant="outline">
            Align Left
          </Button>
          <Button size="sm" variant="outline">
            Align Center
          </Button>
        </div>
      </Affix>

      <div className="p-4">Main content area...</div>
    </div>
  );
}
```

### Back to Top Button

```tsx
function BackToTop() {
  const [isAffixed, setIsAffixed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Affix offsetBottom={20} onChange={setIsAffixed}>
      {isAffixed && (
        <Button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 shadow-lg"
          variant="primary"
          shape="circle"
        >
          ↑
        </Button>
      )}
    </Affix>
  );
}
```

### AffixHandle (Imperative API)

Access imperative methods via ref:

```tsx
const affixRef = useRef<AffixHandle>(null);

// Force update position
affixRef.current?.updatePosition();

// Force affix state
affixRef.current?.forceAffix(true);

// Reset to initial state
affixRef.current?.reset();

// Get current state
const state = affixRef.current?.getState();

// Check if affixed
const isAffixed = affixRef.current?.isAffixed();

// Get scroll info
const scrollInfo = affixRef.current?.getScrollInfo();

// Get performance metrics
const metrics = affixRef.current?.getMetrics();
```

### AffixGroup Component

Coordinate multiple Affix components:

```tsx
import { AffixGroup, Affix } from "saha-ui";

function App() {
  return (
    <AffixGroup
      direction="vertical"
      gap={0}
      onGroupChange={(affixedIds) => console.log(affixedIds)}
    >
      <Affix offsetTop={0} autoStack stackPriority={1}>
        <header>Header</header>
      </Affix>
      <Affix offsetTop={60} autoStack stackPriority={2}>
        <nav>Navigation</nav>
      </Affix>
    </AffixGroup>
  );
}
```

## Advanced Features

### Responsive Offsets

Use responsive values for different breakpoints:

```tsx
<Affix
  offsetTop={{
    xs: 0,
    sm: 10,
    md: 20,
    lg: 30,
  }}
>
  <header>Responsive offset header</header>
</Affix>
```

### Dynamic Offsets

Calculate offset based on scroll position:

```tsx
<Affix
  offsetTop={(scrollInfo) => {
    return scrollInfo.scrollProgress * 50;
  }}
>
  <div>Dynamic offset element</div>
</Affix>
```

### Direction-Based Visibility

Show/hide based on scroll direction:

```tsx
<Affix offsetTop={0} affixOnScrollUp>
  <header>Shows only when scrolling up</header>
</Affix>

<Affix offsetBottom={0} affixOnScrollDown>
  <div>Shows only when scrolling down</div>
</Affix>
```

### Spring Physics Animation

Add elastic/spring animation:

```tsx
<Affix
  offsetTop={0}
  physics={{
    stiffness: 100,
    damping: 10,
    mass: 1,
  }}
>
  <header>Elastic header</header>
</Affix>
```

### Custom Position Calculation

Implement custom positioning logic:

```tsx
<Affix
  customPosition={(scrollInfo, rect, boundary) => {
    if (scrollInfo.scrollProgress > 0.5) {
      return {
        affixed: true,
        position: "top",
        offset: 20,
      };
    }
    return { affixed: false };
  }}
>
  <div>Custom position element</div>
</Affix>
```

### Boundary Element

Stop affixing when reaching a boundary:

```tsx
function BoundedAffix() {
  const boundaryRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Affix offsetTop={0} boundaryElement={boundaryRef}>
        <nav>Stops at boundary</nav>
      </Affix>
      <main>{/* content */}</main>
      <footer ref={boundaryRef}>Boundary</footer>
    </div>
  );
}
```

### Debug Mode

Visualize affix behavior during development:

```tsx
<Affix
  offsetTop={0}
  debug={{
    enabled: true,
    showScrollInfo: true,
    showPositionInfo: true,
    logStateChanges: true,
  }}
>
  <header>Debug mode enabled</header>
</Affix>
```

### Performance Metrics

Track performance metrics:

```tsx
function MetricsExample() {
  const handleMetrics = (metrics: PerformanceMetrics) => {
    console.log("Update count:", metrics.updateCount);
    console.log("Average update time:", metrics.averageUpdateTime);
  };

  return (
    <Affix offsetTop={0} exposeMetrics onMetricsUpdate={handleMetrics}>
      <header>Tracked header</header>
    </Affix>
  );
}
```

## Hooks

### useAffixGroup

Access the AffixGroup context:

```tsx
import { useAffixGroup } from "saha-ui";

function CustomAffix() {
  const group = useAffixGroup();

  if (group) {
    const offset = group.getStackOffset("my-affix-id");
    // Use offset
  }

  return <div>Custom affix content</div>;
}
```

### Available Hooks

- `useBreakpoint()` - Get current responsive breakpoint
- `useOffsetValue(offset, scrollInfo)` - Resolve responsive/dynamic offset
- `useScrollInfo(target)` - Get comprehensive scroll information
- `useThrottle(callback, delay)` - Throttle function calls
- `useDebounce(callback, delay)` - Debounce function calls
- `usePerformanceMetrics(enabled)` - Track performance metrics
- `useReducedMotion()` - Check for reduced motion preference
- `useOrientation()` - Get device orientation
- `useIntersectionObserver(ref, options)` - Intersection observer hook
- `useResizeObserver(ref, callback)` - Resize observer hook
- `useStickySupport()` - Check CSS sticky support
- `useHydration()` - Track hydration state

## Type Definitions

### ScrollInfo

```typescript
interface ScrollInfo {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  scrollProgress: number; // 0-1
  scrollProgressX: number; // 0-1
  direction: ScrollDirection;
  directionX: ScrollDirection;
  velocity: number;
  velocityX: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
}
```

### AffixState

```typescript
interface AffixState {
  affixed: boolean;
  position: AffixPosition;
  placeholderHeight: number;
  placeholderWidth: number;
  scrollDirection: ScrollDirection;
  scrollProgress: number;
  scrollVelocity: number;
  boundaryReached: boolean;
  boundaryElement: HTMLElement | null;
  isInitialized: boolean;
  isHydrated: boolean;
}
```

## Accessibility

### Screen Reader Announcements

```tsx
<Affix
  offsetTop={0}
  announceStateChange
  stateChangeAnnouncement={(affixed) =>
    affixed ? "Navigation is now fixed" : "Navigation is inline"
  }
>
  <nav>Accessible navigation</nav>
</Affix>
```

### Best Practices

- Ensure affixed content doesn't obscure important content
- Maintain proper focus management when elements become affixed
- Provide skip links to bypass sticky navigation
- Test with keyboard navigation
- Use `announceStateChange` for screen reader users
- Set appropriate `affixedTabIndex` if needed
- Respect `prefers-reduced-motion` (enabled by default)

## Performance Tips

1. **Use CSS Sticky:** Enable `useSticky` for better performance
2. **Throttle Scroll Events:** Built-in throttling for scroll listeners
3. **Minimize Re-renders:** Use `onChange` callback wisely
4. **Fixed Heights:** Affixed elements work best with fixed heights
5. **Limit Nesting:** Avoid deeply nested Affix components

## Browser Support

- Modern browsers with `position: sticky` support (when using `useSticky`)
- Fallback to JavaScript positioning for older browsers
- IE11+ supported with polyfills

## Related Components

- **Sticky** - Simpler sticky positioning component
- **AppBar** - Application header with built-in sticky behavior
- **FloatingActionButton** - Specialized floating button component
- **Drawer** - Slide-out panel component

## Troubleshooting

### Element not sticking

- Ensure `offsetTop` or `offsetBottom` is set
- Check parent container doesn't have `overflow: hidden`
- Verify z-index is high enough

### Jumpy behavior

- Set fixed height/width on affixed content
- Use `useSticky` mode for smoother behavior

### Not working in custom container

- Ensure target container has scrollable content
- Container must have `overflow: auto` or `overflow: scroll`

## Changelog

- **v1.0.0** - Initial release with top/bottom affixing
