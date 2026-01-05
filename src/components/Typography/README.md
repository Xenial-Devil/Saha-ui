# Typography

A flexible typography component for rendering text with consistent styling, semantic HTML elements, and comprehensive text formatting options.

## Features

- 📝 Multiple semantic variants (h1-h6, p, span, blockquote, code, etc.)
- 🎨 Color variants (default, primary, secondary, muted, etc.)
- 📐 Text alignment options (left, center, right, justify)
- ⚖️ Font weight control (light, normal, medium, semibold, bold, etc.)
- ✨ Text transformations (uppercase, lowercase, capitalize)
- 🎯 Text decorations (underline, line-through, none)
- ✂️ Truncation options (single line, multiple lines)
- ♿ Semantic HTML elements
- 🎭 Polymorphic `as` prop for custom elements

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Typography } from "saha-ui";

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Page Title</Typography>
      <Typography variant="p">This is a paragraph of text.</Typography>
    </div>
  );
}
```

## Variants

### Headings

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
```

### Body Text

```tsx
<Typography variant="p">Regular paragraph text</Typography>
<Typography variant="span">Inline span text</Typography>
<Typography variant="small">Small text</Typography>
<Typography variant="lead">Lead paragraph with larger text</Typography>
```

### Special Text

```tsx
<Typography variant="blockquote">
  "This is a blockquote with special styling."
</Typography>

<Typography variant="code">const code = 'inline code';</Typography>

<Typography variant="kbd">Ctrl+S</Typography>

<Typography variant="muted">Muted secondary text</Typography>
```

## Colors

```tsx
<Typography color="default">Default color</Typography>
<Typography color="primary">Primary color</Typography>
<Typography color="secondary">Secondary color</Typography>
<Typography color="accent">Accent color</Typography>
<Typography color="muted">Muted color</Typography>
<Typography color="success">Success color</Typography>
<Typography color="warning">Warning color</Typography>
<Typography color="error">Error color</Typography>
<Typography color="info">Info color</Typography>
```

## Text Alignment

```tsx
<Typography align="left">Left aligned text</Typography>
<Typography align="center">Center aligned text</Typography>
<Typography align="right">Right aligned text</Typography>
<Typography align="justify">Justified text that spans multiple lines</Typography>
```

## Font Weights

```tsx
<Typography weight="light">Light weight (300)</Typography>
<Typography weight="normal">Normal weight (400)</Typography>
<Typography weight="medium">Medium weight (500)</Typography>
<Typography weight="semibold">Semibold weight (600)</Typography>
<Typography weight="bold">Bold weight (700)</Typography>
<Typography weight="extrabold">Extra bold weight (800)</Typography>
<Typography weight="black">Black weight (900)</Typography>
```

## Text Transformations

```tsx
<Typography transform="uppercase">uppercase text</Typography>
<Typography transform="lowercase">LOWERCASE TEXT</Typography>
<Typography transform="capitalize">capitalize each word</Typography>
<Typography transform="normal-case">Normal Case</Typography>
```

## Text Decorations

```tsx
<Typography decoration="underline">Underlined text</Typography>
<Typography decoration="line-through">Strikethrough text</Typography>
<Typography decoration="overline">Overlined text</Typography>
<Typography decoration="none">No decoration</Typography>
```

## Text Truncation

### Single Line Truncation

```tsx
<Typography truncate="single" className="max-w-xs">
  This is a very long text that will be truncated with an ellipsis when it
  exceeds the container width
</Typography>
```

### Multi-line Truncation

```tsx
<Typography truncate="2" className="max-w-md">
  This is a longer text that will be truncated after two lines with an ellipsis.
  Any content beyond the second line will be hidden and replaced with ...
</Typography>

<Typography truncate="3" className="max-w-md">
  Text truncated after 3 lines
</Typography>
```

## Polymorphic Component

Use the `as` prop to render different HTML elements:

```tsx
<Typography variant="h1" as="h2">
  Looks like H1 but renders as H2
</Typography>

<Typography variant="p" as="div">
  Paragraph styling on a div element
</Typography>

<Typography as="span" color="primary">
  Custom span element
</Typography>
```

## API Reference

### Typography Props

| Prop         | Type                                                                                                                                         | Default     | Description              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------ |
| `variant`    | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p' \| 'span' \| 'small' \| 'lead' \| 'blockquote' \| 'code' \| 'kbd' \| 'muted' \| 'list'` | `'p'`       | Typography variant       |
| `color`      | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'muted' \| 'success' \| 'warning' \| 'error' \| 'info'`                                | `'default'` | Text color               |
| `align`      | `'left' \| 'center' \| 'right' \| 'justify'`                                                                                                 | `'left'`    | Text alignment           |
| `weight`     | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'`                                                          | -           | Font weight              |
| `transform`  | `'uppercase' \| 'lowercase' \| 'capitalize' \| 'normal-case'`                                                                                | -           | Text transform           |
| `decoration` | `'underline' \| 'line-through' \| 'overline' \| 'none'`                                                                                      | -           | Text decoration          |
| `truncate`   | `'single' \| '2' \| '3' \| '4' \| '5'`                                                                                                       | -           | Text truncation behavior |
| `as`         | `React.ElementType`                                                                                                                          | -           | HTML element to render   |
| `className`  | `string`                                                                                                                                     | -           | Additional CSS classes   |
| `children`   | `ReactNode`                                                                                                                                  | -           | Content to display       |

## Common Patterns

### Page Title with Subtitle

```tsx
<div>
  <Typography variant="h1" color="primary">
    Welcome to Saha UI
  </Typography>
  <Typography variant="lead" color="muted">
    A modern React component library built with TypeScript and Tailwind CSS
  </Typography>
</div>
```

### Article Content

```tsx
<article>
  <Typography variant="h2" className="mb-4">
    Article Title
  </Typography>

  <Typography variant="p" className="mb-4">
    First paragraph of the article with regular text styling.
  </Typography>

  <Typography variant="blockquote" className="my-6">
    "This is an important quote from the article."
  </Typography>

  <Typography variant="p">
    Additional paragraph content continues here.
  </Typography>
</article>
```

### Form Labels and Descriptions

```tsx
<div className="space-y-2">
  <Typography variant="small" weight="semibold">
    Email Address
  </Typography>
  <input type="email" />
  <Typography variant="muted" color="muted">
    We'll never share your email with anyone else.
  </Typography>
</div>
```

### Card with Heading and Text

```tsx
<Card>
  <Typography variant="h3" className="mb-2">
    Card Title
  </Typography>
  <Typography variant="p" color="muted">
    Card description text that provides additional context and information.
  </Typography>
</Card>
```

### Status Messages

```tsx
<Typography color="success" weight="medium">
  ✓ Operation completed successfully
</Typography>

<Typography color="error" weight="medium">
  ✗ An error occurred
</Typography>

<Typography color="warning" weight="medium">
  ⚠ Warning: Please review this action
</Typography>

<Typography color="info" weight="medium">
  ℹ Additional information available
</Typography>
```

### Code Examples

```tsx
<div className="space-y-2">
  <Typography variant="p">
    Press <Typography variant="kbd">Ctrl+S</Typography> to save your work.
  </Typography>

  <Typography variant="code">npm install saha-ui</Typography>
</div>
```

### Truncated Product Names

```tsx
<div className="grid grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product.id}>
      <Typography variant="h4" truncate="single">
        {product.name}
      </Typography>
      <Typography variant="small" color="muted" truncate="2">
        {product.description}
      </Typography>
    </div>
  ))}
</div>
```

## Accessibility

The Typography component follows accessibility best practices:

- **Semantic HTML:** Uses appropriate semantic elements based on variant
- **Heading Hierarchy:** Maintains proper heading hierarchy (h1-h6)
- **Color Contrast:** Ensure sufficient contrast ratios for text colors
- **Readable Font Sizes:** Appropriate font sizes for readability

### Best Practices

```tsx
// Good: Proper heading hierarchy
<Typography variant="h1">Main Title</Typography>
<Typography variant="h2">Section Title</Typography>
<Typography variant="h3">Subsection Title</Typography>

// Bad: Skipping heading levels
<Typography variant="h1">Main Title</Typography>
<Typography variant="h4">Section Title</Typography> {/* Skipped h2, h3 */}

// Good: Semantic override when needed
<Typography variant="h1" as="h2">
  Styled as H1 but semantically H2
</Typography>
```

## Styling

### Custom Styles

```tsx
<Typography
  variant="h1"
  className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
>
  Gradient Text
</Typography>
```

### Combining Props

```tsx
<Typography
  variant="h2"
  color="primary"
  align="center"
  weight="bold"
  transform="uppercase"
  className="tracking-wider"
>
  Styled Heading
</Typography>
```

### Responsive Typography

```tsx
<Typography variant="h1" className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</Typography>
```

## Best Practices

1. **Use Semantic Variants:** Choose variants that match the semantic meaning of your content
2. **Maintain Heading Hierarchy:** Don't skip heading levels (h1 → h2 → h3)
3. **Consistent Color Usage:** Use color variants consistently throughout your app
4. **Readable Line Length:** Limit line length to 60-80 characters for optimal readability
5. **Appropriate Font Sizes:** Ensure text is readable on all devices
6. **Avoid Excessive Styling:** Don't combine too many styling props
7. **Use Truncation Wisely:** Provide full content access when truncating

## Performance Tips

1. **Avoid Unnecessary Re-renders:** Memoize content when possible
2. **Use Simple Variants:** Simpler variants render faster
3. **Limit Truncation Use:** Truncation calculations can impact performance

## Related Components

- **Heading** - Dedicated heading component
- **Text** - Alternative text component
- **Link** - For styled links
- **Badge** - For labels and tags

## Changelog

- **v1.0.0** - Initial release with all typography variants and features
