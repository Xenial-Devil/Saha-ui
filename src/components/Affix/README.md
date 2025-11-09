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
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Affix, Button } from '@saha-ui/core';

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
    <Button variant="primary" size="lg">+</Button>
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
      <Affix 
        offsetTop={0} 
        target={() => containerRef.current!}
      >
        <div className="bg-primary text-white p-4">
          Sticky within container
        </div>
      </Affix>
      
      <div className="h-[1000px]">
        Long scrollable content...
      </div>
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
      <p>Affixed: {isAffixed ? 'Yes' : 'No'}</p>
      
      <Affix 
        offsetTop={10}
        onChange={(affixed) => setIsAffixed(affixed)}
      >
        <div className={`p-4 ${isAffixed ? 'shadow-lg' : ''}`}>
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
  <div className="bg-white p-4">
    CSS Sticky Header
  </div>
</Affix>
```

## API Reference

### Affix Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Content to be affixed |
| `offsetTop` | `number` | - | Offset from top when affixed (triggers top affixing) |
| `offsetBottom` | `number` | - | Offset from bottom when affixed (triggers bottom affixing) |
| `target` | `Window \| HTMLElement \| (() => HTMLElement \| Window)` | `window` | Scroll container target |
| `onChange` | `(affixed: boolean) => void` | - | Callback when affix state changes |
| `zIndex` | `number` | `10` | Z-index for affixed element |
| `useSticky` | `boolean` | `false` | Use CSS sticky instead of fixed positioning |
| `className` | `string` | - | Additional CSS classes for container |
| `contentClassName` | `string` | - | Additional CSS classes for content wrapper |
| `asChild` | `boolean` | `false` | Merge props with child element |

## Styling

### Custom Styles

Apply custom styles to the affixed element:

```tsx
<Affix 
  offsetTop={0}
  className="border-b border-gray-200"
  contentClassName="container mx-auto"
>
  <header>
    Styled sticky header
  </header>
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
      className={affixed ? 'shadow-lg' : ''}
    >
      <div className={`
        transition-all duration-300
        ${affixed ? 'bg-white' : 'bg-transparent'}
      `}>
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
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
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
              <li><a href="#section1">Section 1</a></li>
              <li><a href="#section2">Section 2</a></li>
              <li><a href="#section3">Section 3</a></li>
            </ul>
          </div>
        </Affix>
      </aside>
      
      <main className="flex-1">
        {/* Main content */}
      </main>
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
      <div className="h-32 bg-gray-100">
        Header content above toolbar
      </div>
      
      <Affix 
        offsetTop={0}
        onChange={setAffixed}
        className={`
          transition-all duration-300
          ${affixed ? 'shadow-lg bg-white' : 'bg-gray-50'}
        `}
      >
        <div className="px-4 py-2 flex items-center gap-2">
          <Button size="sm" variant="outline">Bold</Button>
          <Button size="sm" variant="outline">Italic</Button>
          <Button size="sm" variant="outline">Underline</Button>
          <div className="mx-2 h-6 w-px bg-gray-300" />
          <Button size="sm" variant="outline">Align Left</Button>
          <Button size="sm" variant="outline">Align Center</Button>
        </div>
      </Affix>
      
      <div className="p-4">
        Main content area...
      </div>
    </div>
  );
}
```

### Back to Top Button

```tsx
function BackToTop() {
  const [isAffixed, setIsAffixed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Affix 
      offsetBottom={20}
      onChange={setIsAffixed}
    >
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

## Accessibility

- Ensure affixed content doesn't obscure important content
- Maintain proper focus management when elements become affixed
- Provide skip links to bypass sticky navigation
- Test with keyboard navigation
- Consider screen reader announcements for state changes

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