# Rating

An interactive rating component for displaying and collecting user ratings. Supports stars, hearts, circles, and diamonds with half-star precision and customizable styles.

## Features

- ⭐ Multiple icon types (star, heart, circle, diamond)
- 🎨 6 visual variants (default, primary, secondary, gradient, glass, outline)
- 📏 8 size options (xs to 4xl)
- ✨ Full and half-star precision
- 👁️ Read-only and interactive modes
- 🔢 Optional value display
- 📊 Review count display
- 🎨 Custom colors for filled/empty states
- 💡 Tooltips with custom labels
- ♿ Full accessibility support
- 📱 Touch-friendly and responsive

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Rating } from "saha-ui";
import { useState } from "react";

function ProductRating() {
  const [rating, setRating] = useState(0);

  return <Rating value={rating} onChange={setRating} />;
}
```

## Variants

```tsx
<div className="space-y-4">
  <Rating value={4} variant="default" />
  <Rating value={4} variant="primary" />
  <Rating value={4} variant="secondary" />
  <Rating value={4} variant="gradient" />
  <Rating value={4} variant="glass" />
  <Rating value={4} variant="outline" />
</div>
```

## Sizes

```tsx
<div className="space-y-4">
  <Rating value={4} size="xs" />
  <Rating value={4} size="sm" />
  <Rating value={4} size="md" />
  <Rating value={4} size="lg" />
  <Rating value={4} size="xl" />
  <Rating value={4} size="2xl" />
  <Rating value={4} size="3xl" />
  <Rating value={4} size="4xl" />
</div>
```

## Icon Types

```tsx
<div className="space-y-4">
  <Rating value={4} icon="star" />
  <Rating value={4} icon="heart" />
  <Rating value={4} icon="circle" />
  <Rating value={4} icon="diamond" />
</div>
```

## Precision

### Full Stars

```tsx
<Rating value={4} precision="full" onChange={setValue} />
```

### Half Stars

```tsx
<Rating value={3.5} precision="half" onChange={setValue} />
```

## Read-Only Mode

Display ratings without interaction:

```tsx
<Rating value={4.5} readOnly showValue count={128} countLabel="reviews" />
```

## Value Display

### Show Numeric Value

```tsx
<Rating value={4.2} readOnly showValue />
```

### Custom Value Format

```tsx
<Rating
  value={4.2}
  readOnly
  showValue
  valueFormat={(value, max) => `${value.toFixed(1)} out of ${max}`}
/>
```

### With Review Count

```tsx
<Rating
  value={4.5}
  readOnly
  showValue
  count={234}
  countLabel="customer reviews"
/>
```

## Custom Colors

```tsx
<Rating value={4} color="orange" emptyColor="gray" />
```

## Tooltips

```tsx
<Rating
  value={rating}
  onChange={setRating}
  showTooltip
  tooltipLabels={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
/>
```

## Common Patterns

### Product Rating

```tsx
function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <img src={product.image} alt={product.name} />
      </CardHeader>
      <CardContent>
        <h3>{product.name}</h3>
        <Rating
          value={product.rating}
          readOnly
          showValue
          count={product.reviews}
          size="sm"
          variant="primary"
        />
        <p>${product.price}</p>
      </CardContent>
    </Card>
  );
}
```

### Review Form

```tsx
function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <form>
      <div className="mb-4">
        <label className="block mb-2">Your Rating</label>
        <Rating
          value={rating}
          onChange={setRating}
          size="lg"
          variant="primary"
          showTooltip
          tooltipLabels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
        />
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full"
      />
      <Button type="submit">Submit Review</Button>
    </form>
  );
}
```

### Service Rating Dashboard

```tsx
function ServiceRatings({ ratings }) {
  return (
    <div className="space-y-4">
      {Object.entries(ratings).map(([category, data]) => (
        <div key={category} className="flex items-center justify-between">
          <span className="font-medium">{category}</span>
          <Rating
            value={data.score}
            max={5}
            readOnly
            showValue
            variant="gradient"
            size="sm"
          />
        </div>
      ))}
    </div>
  );
}
```

### Interactive Card

```tsx
function RatingCard() {
  const [rating, setRating] = useState(0);

  return (
    <Paper elevation={2} padding="lg">
      <h3 className="mb-4">Rate Your Experience</h3>
      <Rating
        value={rating}
        onChange={setRating}
        size="xl"
        variant="primary"
        precision="half"
      />
      {rating > 0 && (
        <p className="mt-4 text-muted-foreground">
          You rated this {rating} out of 5 stars
        </p>
      )}
    </Paper>
  );
}
```

## API Reference

### Props

| Prop            | Type                                               | Default     | Description                     |
| --------------- | -------------------------------------------------- | ----------- | ------------------------------- |
| `value`         | `number`                                           | `0`         | Current rating value (0 to max) |
| `max`           | `number`                                           | `5`         | Maximum rating value            |
| `variant`       | `RatingVariant`                                    | `"default"` | Visual style variant            |
| `size`          | `RatingSize`                                       | `"md"`      | Size of rating icons            |
| `icon`          | `"star"` \| `"heart"` \| `"circle"` \| `"diamond"` | `"star"`    | Icon type                       |
| `precision`     | `"full"` \| `"half"`                               | `"full"`    | Rating precision                |
| `readOnly`      | `boolean`                                          | `false`     | Read-only mode                  |
| `disabled`      | `boolean`                                          | `false`     | Disabled state                  |
| `showValue`     | `boolean`                                          | `false`     | Show numeric value              |
| `valueFormat`   | `(value, max) => string`                           | -           | Custom value formatter          |
| `count`         | `number`                                           | -           | Number of reviews/ratings       |
| `countLabel`    | `string`                                           | `"reviews"` | Label for count                 |
| `color`         | `string`                                           | -           | Custom filled color             |
| `emptyColor`    | `string`                                           | -           | Custom empty color              |
| `hoverable`     | `boolean`                                          | `true`      | Enable hover effect             |
| `showTooltip`   | `boolean`                                          | `false`     | Show tooltips                   |
| `tooltipLabels` | `string[]`                                         | -           | Custom tooltip labels           |
| `onChange`      | `(value: number) => void`                          | -           | Value change callback           |
| `onHover`       | `(value: number) => void`                          | -           | Hover callback                  |
| `className`     | `string`                                           | -           | Additional CSS classes          |

## Accessibility

The Rating component:

- Uses proper ARIA roles and attributes
- Keyboard navigable (Arrow keys to change rating)
- Screen reader friendly with value announcements
- Focus visible states
- Disabled and read-only states announced

## Styling

### Custom Styles

```tsx
<Rating
  value={4}
  className="gap-2"
  style={{ filter: "drop-shadow(0 0 10px gold)" }}
/>
```

## Dark Mode

Automatically adapts to dark mode with adjusted colors and contrast.

## Best Practices

1. **Use read-only for display**: Set `readOnly={true}` when showing existing ratings
2. **Show context**: Use `count` and `countLabel` to provide social proof
3. **Provide feedback**: Use tooltips or value display for clarity
4. **Size appropriately**: Use smaller sizes in lists, larger in forms
5. **Precision choice**: Use half-stars for more granular ratings
6. **Accessibility**: Ensure proper labels and keyboard navigation

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Related Components

- [Badge](../Badge/README.md) - For simple indicators
- [Progress](../Progress/README.md) - For progress bars
- [Slider](../Slider/README.md) - For range inputs

## TypeScript

Full TypeScript support:

```typescript
import type { RatingProps, RatingVariant, RatingIcon } from "saha-ui";

const config: RatingProps = {
  value: 4,
  max: 5,
  variant: "primary",
  icon: "star",
  precision: "half",
};
```
