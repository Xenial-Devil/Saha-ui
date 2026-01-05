# Collapsible

A flexible collapsible/accordion component that expands and collapses content with smooth animations. Perfect for FAQs, menus, settings panels, and any content that needs to be hidden or revealed.

## Features

- 🎨 **Multiple Variants** - 10 color variants plus outline and glass styles
- ✨ **Smooth Animations** - Multiple animation types (smooth, spring, bounce, instant)
- 🎯 **Controlled/Uncontrolled** - Works with or without state management
- 🔄 **Custom Triggers** - Flexible trigger configuration
- ⌨️ **Keyboard Navigation** - Full keyboard support
- ♿ **Accessible** - ARIA attributes and screen reader support
- 🎨 **Custom Icons** - Replace default chevron icon
- 📱 **Responsive** - Works seamlessly on all screen sizes

## Installation

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "saha-ui";
```

## Basic Usage

### Simple Collapsible

```tsx
<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    This is the collapsible content that will be shown when expanded.
  </CollapsibleContent>
</Collapsible>
```

### Controlled State

```tsx
const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be controlled externally
  </CollapsibleContent>
</Collapsible>;
```

### Default Open

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger>Already expanded</CollapsibleTrigger>
  <CollapsibleContent>This content is visible by default</CollapsibleContent>
</Collapsible>
```

## Variants

### Color Variants

```tsx
// Default variant
<Collapsible variant="default">
  <CollapsibleTrigger>Default</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Primary variant
<Collapsible variant="primary">
  <CollapsibleTrigger>Primary</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Success variant
<Collapsible variant="success">
  <CollapsibleTrigger>Success</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Warning variant
<Collapsible variant="warning">
  <CollapsibleTrigger>Warning</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Error variant
<Collapsible variant="error">
  <CollapsibleTrigger>Error</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
```

### Style Variants

```tsx
// Outline variant
<Collapsible variant="outline">
  <CollapsibleTrigger>Outline Style</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Glass variant
<Collapsible variant="glass">
  <CollapsibleTrigger>Glass Effect</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
```

## Animation Types

```tsx
// Smooth animation (default)
<Collapsible animation="smooth">
  <CollapsibleTrigger>Smooth</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Spring animation
<Collapsible animation="spring">
  <CollapsibleTrigger>Spring</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Bounce animation
<Collapsible animation="bounce">
  <CollapsibleTrigger>Bounce</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>

// Instant (no animation)
<Collapsible animation="instant">
  <CollapsibleTrigger>Instant</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
```

## Custom Icons

```tsx
import { Plus, Minus } from "lucide-react";

<Collapsible>
  <CollapsibleTrigger
    icon={<Plus className="h-4 w-4" />}
    iconOpen={<Minus className="h-4 w-4" />}
  >
    Custom Icons
  </CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>;
```

## Disabled State

```tsx
<Collapsible disabled>
  <CollapsibleTrigger>Disabled Collapsible</CollapsibleTrigger>
  <CollapsibleContent>This content cannot be revealed</CollapsibleContent>
</Collapsible>
```

## Advanced Examples

### FAQ Section

```tsx
function FAQSection() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all products...",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days...",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide...",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Collapsible key={index} variant="outline">
          <CollapsibleTrigger className="text-left">
            {faq.question}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-muted-foreground">{faq.answer}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  return (
    <div className="space-y-2">
      <Collapsible variant="glass">
        <CollapsibleTrigger>
          <Settings className="mr-2 h-4 w-4" />
          General Settings
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Username</Label>
              <Input defaultValue="johndoe" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" defaultValue="john@example.com" />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="glass">
        <CollapsibleTrigger>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

### Filter Menu

```tsx
function FilterMenu() {
  return (
    <div className="w-64 space-y-2">
      <Collapsible defaultOpen variant="outline">
        <CollapsibleTrigger>Price Range</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 pt-4">
            <Slider defaultValue={[0, 100]} />
            <div className="flex justify-between text-sm">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen variant="outline">
        <CollapsibleTrigger>Category</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-4">
            <Checkbox id="electronics">Electronics</Checkbox>
            <Checkbox id="clothing">Clothing</Checkbox>
            <Checkbox id="books">Books</Checkbox>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="outline">
        <CollapsibleTrigger>Brand</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-4">
            <Checkbox id="brand1">Brand A</Checkbox>
            <Checkbox id="brand2">Brand B</Checkbox>
            <Checkbox id="brand3">Brand C</Checkbox>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

### Nested Collapsibles

```tsx
<Collapsible variant="primary">
  <CollapsibleTrigger>Parent Section</CollapsibleTrigger>
  <CollapsibleContent>
    <div className="space-y-2 p-4">
      <p>Parent content here</p>

      <Collapsible variant="secondary">
        <CollapsibleTrigger>Child Section 1</CollapsibleTrigger>
        <CollapsibleContent>
          <p className="p-4">Nested content 1</p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="secondary">
        <CollapsibleTrigger>Child Section 2</CollapsibleTrigger>
        <CollapsibleContent>
          <p className="p-4">Nested content 2</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </CollapsibleContent>
</Collapsible>
```

## Props

### Collapsible Props

| Prop           | Type                                                                                                                       | Default      | Description                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------- |
| `open`         | `boolean`                                                                                                                  | -            | Controlled open state             |
| `defaultOpen`  | `boolean`                                                                                                                  | `false`      | Default open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void`                                                                                                  | -            | Callback when open state changes  |
| `variant`      | `"default" \| "primary" \| "secondary" \| "accent" \| "success" \| "warning" \| "error" \| "info" \| "outline" \| "glass"` | `"default"`  | Visual variant                    |
| `animation`    | `"smooth" \| "spring" \| "bounce" \| "instant"`                                                                            | `"smooth"`   | Animation type                    |
| `disabled`     | `boolean`                                                                                                                  | `false`      | Disable the collapsible           |
| `className`    | `string`                                                                                                                   | -            | Additional CSS classes            |
| `children`     | `ReactNode`                                                                                                                | **required** | Trigger and content components    |

### CollapsibleTrigger Props

| Prop        | Type        | Default           | Description                               |
| ----------- | ----------- | ----------------- | ----------------------------------------- |
| `icon`      | `ReactNode` | `<ChevronDown />` | Icon to display                           |
| `iconOpen`  | `ReactNode` | -                 | Icon when open (defaults to rotated icon) |
| `hideIcon`  | `boolean`   | `false`           | Hide the icon                             |
| `className` | `string`    | -                 | Additional CSS classes                    |
| `children`  | `ReactNode` | **required**      | Trigger content                           |

### CollapsibleContent Props

| Prop        | Type        | Default      | Description            |
| ----------- | ----------- | ------------ | ---------------------- |
| `className` | `string`    | -            | Additional CSS classes |
| `children`  | `ReactNode` | **required** | Content to show/hide   |

## Keyboard Navigation

- **Enter/Space** - Toggle open/closed state
- **Tab** - Navigate to next focusable element
- **Shift+Tab** - Navigate to previous focusable element

## Accessibility

The component follows accessibility best practices:

- Uses proper ARIA attributes (`aria-expanded`, `aria-controls`)
- Semantic button element for trigger
- Keyboard navigation support
- Focus visible indicators
- Screen reader announcements
- Proper heading hierarchy support

## Best Practices

1. **Meaningful Triggers** - Use descriptive text for trigger buttons
2. **Visual Feedback** - Show clear open/closed state
3. **Performance** - Don't nest too deeply (max 2-3 levels)
4. **Content Size** - Consider lazy loading for heavy content
5. **Mobile** - Ensure adequate touch target size
6. **Animation** - Use appropriate animation for context
7. **Default State** - Consider which items should be open by default

## Styling

```tsx
// Custom styling
<Collapsible className="rounded-xl border-2 shadow-lg">
  <CollapsibleTrigger className="text-lg font-bold">
    Custom Styled
  </CollapsibleTrigger>
  <CollapsibleContent className="bg-muted p-6">
    Custom content styling
  </CollapsibleContent>
</Collapsible>
```

## Integration Examples

### With Forms

```tsx
<form>
  <Collapsible variant="outline">
    <CollapsibleTrigger>Additional Information</CollapsibleTrigger>
    <CollapsibleContent>
      <div className="space-y-4 pt-4">
        <Input placeholder="Company" />
        <Input placeholder="Tax ID" />
        <TextArea placeholder="Notes" />
      </div>
    </CollapsibleContent>
  </Collapsible>
</form>
```

### With React Hook Form

```tsx
function FormWithCollapsible() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("name")} placeholder="Name" />

      <Collapsible>
        <CollapsibleTrigger>Optional Fields</CollapsibleTrigger>
        <CollapsibleContent>
          <Input {...register("phone")} placeholder="Phone" />
          <Input {...register("address")} placeholder="Address" />
        </CollapsibleContent>
      </Collapsible>

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Browser Support

Works in all modern browsers that support:

- CSS Transitions
- CSS Grid and Flexbox
- Modern JavaScript (ES6+)
- React 18+

## Related Components

- **Accordion** - Multiple collapsibles with exclusive expansion
- **Tabs** - Alternative for switching between content
- **Drawer** - Side panel for additional content
- **Dialog** - Modal overlay for focused content
