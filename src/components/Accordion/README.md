# Accordion

A flexible and accessible accordion component that allows users to show and hide sections of content. Supports multiple modes, variants, and full keyboard navigation.

## Features

- ✨ Multiple behavior modes (single, multiple)
- 🎨 Six visual variants
- ♿ Full accessibility support (ARIA attributes, keyboard navigation)
- 🎯 Controlled and uncontrolled modes
- 🔄 Smooth animations and transitions
- 🎭 Custom icons support
- 🧩 Composable architecture with subcomponents
- 🎪 `asChild` pattern support for advanced composition

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "saha-ui";

function MyAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Saha UI?</AccordionTrigger>
        <AccordionContent>
          Saha UI is a modern, accessible React component library built with
          TypeScript and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          Install the package, import the components, and start building amazing
          UIs!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is it customizable?</AccordionTrigger>
        <AccordionContent>
          Yes! Every component supports custom styling through className props
          and variants.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Accordion Types

### Single (Default)

Only one item can be open at a time:

```tsx
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Content for first item</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>Content for second item</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple

Multiple items can be open simultaneously:

```tsx
<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Content for first item</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>Content for second item</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Sizes

The Accordion component supports three size variants:

```tsx
{
  /* Small */
}
<Accordion size="sm" type="single" collapsible>
  {/* items */}
</Accordion>;

{
  /* Medium (default) */
}
<Accordion size="md" type="single" collapsible>
  {/* items */}
</Accordion>;

{
  /* Large */
}
<Accordion size="lg" type="single" collapsible>
  {/* items */}
</Accordion>;
```

## Variants

### Default

Clean, minimal design with subtle borders:

```tsx
<Accordion variant="default" type="single" collapsible>
  {/* items */}
</Accordion>
```

### Controlled

Enhanced visual feedback with hover effects:

```tsx
<Accordion variant="controlled" type="single" collapsible>
  {/* items */}
</Accordion>
```

### Glass

Modern glassmorphism effect:

```tsx
<Accordion variant="glass" type="single" collapsible>
  {/* items */}
</Accordion>
```

### Toggle

Button-like appearance for each item:

```tsx
<Accordion variant="toggle" type="single" collapsible>
  {/* items */}
</Accordion>
```

### First Open

First item starts expanded by default:

```tsx
<Accordion variant="firstopen" type="single" collapsible>
  {/* items */}
</Accordion>
```

### All Open

All items can be open (similar to multiple type):

```tsx
<Accordion variant="allopen" type="multiple">
  {/* items */}
</Accordion>
```

## Controlled Mode

Manage accordion state externally:

```tsx
function ControlledAccordion() {
  const [value, setValue] = useState<string>("item-1");

  return (
    <Accordion type="single" value={value} onValueChange={setValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

For multiple mode:

```tsx
function ControlledMultipleAccordion() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  return (
    <Accordion type="multiple" value={value} onValueChange={setValue}>
      {/* items */}
    </Accordion>
  );
}
```

## Custom Icons

Replace the default chevron icon:

```tsx
import { Plus, Minus } from "lucide-react";

function CustomIconAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger icon={<Plus className="h-5 w-5" />}>
          Click to expand
        </AccordionTrigger>
        <AccordionContent>Custom icon accordion content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Animation Callbacks

Listen to animation lifecycle events:

```tsx
function AnimatedAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      animationDuration={500}
      onOpenStart={(value) => console.log(`Opening ${value}`)}
      onOpenEnd={(value) => console.log(`Opened ${value}`)}
      onCloseStart={(value) => console.log(`Closing ${value}`)}
      onCloseEnd={(value) => console.log(`Closed ${value}`)}
    >
      <AccordionItem
        value="item-1"
        onOpenChange={(isOpen) =>
          console.log(`Item 1 is ${isOpen ? "open" : "closed"}`)
        }
      >
        <AccordionTrigger>Animated Item</AccordionTrigger>
        <AccordionContent
          onAnimationStart={() => console.log("Content animation started")}
          onAnimationEnd={() => console.log("Content animation ended")}
        >
          Content with animation callbacks
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Disabled Items

Disable specific accordion items:

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Active Item</AccordionTrigger>
    <AccordionContent>This item is interactive</AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled Item</AccordionTrigger>
    <AccordionContent>This content won't be accessible</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Performance Optimization

### Lazy Mounting

Load content only when first opened:

```tsx
<Accordion type="single" collapsible lazyMount>
  <AccordionItem value="item-1">
    <AccordionTrigger>Heavy Content Item</AccordionTrigger>
    <AccordionContent>
      {/* This content only mounts when first opened */}
      <ExpensiveComponent />
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Unmount on Close

Unmount content when closed to free up resources:

```tsx
<Accordion type="single" collapsible unmountOnClose>
  <AccordionItem value="item-1">
    <AccordionTrigger>Dynamic Content</AccordionTrigger>
    <AccordionContent>
      {/* This content unmounts when closed */}
      <DynamicComponent />
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Force Mount

Keep content mounted for SEO or form state preservation:

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Form Content</AccordionTrigger>
    <AccordionContent forceMount>
      {/* This content stays mounted even when closed */}
      <FormComponent />
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Advanced Composition with `asChild`

Use the `asChild` prop for custom trigger composition:

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger asChild>
      <div className="flex items-center gap-2">
        <Avatar src="/avatar.jpg" size="sm" />
        <span>Custom Trigger with Avatar</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>Custom content</AccordionContent>
  </AccordionItem>
</Accordion>
```

## API Reference

### Accordion Props

| Prop                | Type                                                                           | Default      | Description                                 |
| ------------------- | ------------------------------------------------------------------------------ | ------------ | ------------------------------------------- |
| `type`              | `'single' \| 'multiple'`                                                       | `'single'`   | Controls how items expand/collapse          |
| `variant`           | `'default' \| 'controlled' \| 'allopen' \| 'toggle' \| 'firstopen' \| 'glass'` | `'default'`  | Visual style variant                        |
| `size`              | `'sm' \| 'md' \| 'lg'`                                                         | `'md'`       | Size variant for the accordion              |
| `value`             | `string \| string[]`                                                           | -            | Controlled value(s) for open items          |
| `defaultValue`      | `string \| string[]`                                                           | -            | Default value(s) for uncontrolled mode      |
| `onValueChange`     | `(value: string \| string[]) => void`                                          | -            | Callback when open items change             |
| `collapsible`       | `boolean`                                                                      | `false`      | Allows closing the open item in single mode |
| `orientation`       | `'vertical' \| 'horizontal'`                                                   | `'vertical'` | Orientation for keyboard navigation         |
| `loop`              | `boolean`                                                                      | `false`      | Loop navigation from last to first item     |
| `disabled`          | `boolean`                                                                      | `false`      | Disable the entire accordion                |
| `lazyMount`         | `boolean`                                                                      | `false`      | Lazy load content only when first opened    |
| `unmountOnClose`    | `boolean`                                                                      | `false`      | Unmount content when closed                 |
| `animationDuration` | `number`                                                                       | `300`        | Animation duration in milliseconds          |
| `onOpenStart`       | `(value: string) => void`                                                      | -            | Callback when any item starts opening       |
| `onOpenEnd`         | `(value: string) => void`                                                      | -            | Callback when any item finishes opening     |
| `onCloseStart`      | `(value: string) => void`                                                      | -            | Callback when any item starts closing       |
| `onCloseEnd`        | `(value: string) => void`                                                      | -            | Callback when any item finishes closing     |
| `className`         | `string`                                                                       | -            | Additional CSS classes                      |
| `children`          | `ReactNode`                                                                    | -            | AccordionItem components                    |

### AccordionItem Props

| Prop           | Type                         | Default | Description                                   |
| -------------- | ---------------------------- | ------- | --------------------------------------------- |
| `value`        | `string`                     | -       | **Required.** Unique identifier for this item |
| `disabled`     | `boolean`                    | `false` | Whether the item is disabled                  |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3`     | Heading level for accessibility (h1-h6)       |
| `onOpenChange` | `(isOpen: boolean) => void`  | -       | Callback when this item's open state changes  |
| `className`    | `string`                     | -       | Additional CSS classes                        |
| `children`     | `ReactNode`                  | -       | Trigger and Content components                |

### AccordionTrigger Props

| Prop           | Type                      | Default           | Description                           |
| -------------- | ------------------------- | ----------------- | ------------------------------------- |
| `children`     | `ReactNode`               | -                 | **Required.** Trigger content (title) |
| `icon`         | `ReactNode`               | `<ChevronDown />` | Custom icon to display                |
| `openIcon`     | `ReactNode`               | -                 | Custom icon for open state            |
| `closedIcon`   | `ReactNode`               | -                 | Custom icon for closed state          |
| `iconPosition` | `'left' \| 'right'`       | `'right'`         | Position of the icon                  |
| `hideIcon`     | `boolean`                 | `false`           | Hide the default icon                 |
| `asChild`      | `boolean`                 | `false`           | Merge props with child element        |
| `onFocus`      | `React.FocusEventHandler` | -                 | Callback when trigger receives focus  |
| `onBlur`       | `React.FocusEventHandler` | -                 | Callback when trigger loses focus     |
| `className`    | `string`                  | -                 | Additional CSS classes                |

### AccordionContent Props

| Prop               | Type         | Default | Description                                    |
| ------------------ | ------------ | ------- | ---------------------------------------------- |
| `children`         | `ReactNode`  | -       | **Required.** Content to display when expanded |
| `forceMount`       | `boolean`    | `false` | Force content to stay mounted even when closed |
| `onAnimationStart` | `() => void` | -       | Callback when content animation starts         |
| `onAnimationEnd`   | `() => void` | -       | Callback when content animation ends           |
| `className`        | `string`     | -       | Additional CSS classes                         |

## Styling

### Custom Styles

Apply custom styles using className:

```tsx
<Accordion className="max-w-2xl mx-auto">
  <AccordionItem value="item-1" className="border-2 border-primary">
    <AccordionTrigger className="text-lg font-bold">
      Custom Styled Item
    </AccordionTrigger>
    <AccordionContent className="bg-muted p-6">
      Custom styled content area
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Accessibility

The Accordion component follows WAI-ARIA authoring practices:

- **Keyboard Navigation:**
  - `Enter` or `Space` - Toggle accordion item
  - `Tab` - Move focus between triggers
- **ARIA Attributes:**
  - `aria-expanded` - Indicates whether item is expanded
  - `data-state` - Provides state information (open/closed)
- **Focus Management:**
  - Proper focus indicators
  - Disabled items are not focusable

## Best Practices

1. **Use Unique Values:** Each `AccordionItem` must have a unique `value` prop
2. **Single vs Multiple:** Choose `type="single"` for mutually exclusive content, `type="multiple"` for independent sections
3. **Collapsible:** Enable `collapsible` in single mode to allow closing all items
4. **Clear Labels:** Use descriptive trigger text for better UX
5. **Content Length:** Keep accordion content concise; for long content, consider linking to a separate page
6. **Mobile Friendly:** Accordions work great on mobile devices by conserving screen space

## Common Patterns

### FAQ Section

```tsx
<Accordion type="single" collapsible variant="default">
  {faqs.map((faq) => (
    <AccordionItem key={faq.id} value={faq.id}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

### Settings Panel

```tsx
<Accordion type="multiple" defaultValue={["general", "privacy"]}>
  <AccordionItem value="general">
    <AccordionTrigger>General Settings</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-4">
        <Switch label="Enable notifications" />
        <Switch label="Auto-save" />
      </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="privacy">
    <AccordionTrigger>Privacy Settings</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-4">
        <Switch label="Public profile" />
        <Switch label="Show email" />
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Related Components

- **Tabs** - For switching between different views
- **Collapsible** - For simple show/hide functionality
- **Drawer** - For slide-out panels

## Changelog

- **v1.0.0** - Initial release with full feature set
