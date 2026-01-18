# Rating

An advanced, flexible rating component for displaying and collecting user ratings. Features 80+ built-in icons, 25+ color schemes, custom icon support (Lucide, Iconify, etc.), and extensive customization options.

## Features

- ⭐ **80+ Built-in Icons** - Shapes, emotions, nature, awards, food, animals, and more
- 🎨 **25+ Color Schemes** - Warm, cool, nature, neutral, and special themes
- 🎭 **Custom Icons** - Support for Lucide, Iconify, and any React component
- 🎨 **8 Visual Variants** - default, primary, secondary, gradient, glass, outline, neon, soft
- 📏 **8 Size Options** - xs to 4xl for any use case
- ✨ **Full and Half Precision** - Granular rating control
- 👁️ **Read-only & Interactive** - Display or collect ratings
- 🔢 **Value Display** - Optional numeric value with custom formatting
- 📊 **Review Count** - Show social proof with count and custom labels
- 🎨 **Custom Colors** - Override color schemes with any CSS color
- 💡 **Tooltips** - Custom labels for each rating level
- ⌨️ **Keyboard Navigation** - Arrow keys, Home, End, number keys support
- 🎯 **Highlight on Hover** - Visual feedback for better UX
- 📐 **Horizontal & Vertical** - Flexible layout directions
- ♿ **Full Accessibility** - ARIA roles, keyboard navigation, screen reader support
- 📱 **Touch-friendly** - Responsive and mobile-optimized

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

The Rating component supports 8 visual variants:

```tsx
<div className="space-y-4">
  <Rating value={4} variant="default" />
  <Rating value={4} variant="primary" />
  <Rating value={4} variant="secondary" />
  <Rating value={4} variant="gradient" />
  <Rating value={4} variant="glass" />
  <Rating value={4} variant="outline" />
  <Rating value={4} variant="neon" />
  <Rating value={4} variant="soft" />
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

### 80+ Built-in Icons

The Rating component includes 80+ built-in icons organized into categories:

#### Basic Shapes

```tsx
<Rating value={4} icon="star" />
<Rating value={4} icon="heart" />
<Rating value={4} icon="circle" />
<Rating value={4} icon="square" />
<Rating value={4} icon="diamond" />
<Rating value={4} icon="triangle" />
<Rating value={4} icon="hexagon" />
<Rating value={4} icon="octagon" />
<Rating value={4} icon="pentagon" />
```

#### Emotions & Expressions

```tsx
<Rating value={4} icon="smile" />
<Rating value={4} icon="laugh" />
<Rating value={4} icon="meh" />
<Rating value={4} icon="frown" />
<Rating value={4} icon="angry" />
<Rating value={4} icon="thumbsUp" />
<Rating value={4} icon="thumbsDown" />
```

#### Nature & Weather

```tsx
<Rating value={4} icon="sun" />
<Rating value={4} icon="moon" />
<Rating value={4} icon="flame" />
<Rating value={4} icon="droplet" />
<Rating value={4} icon="snowflake" />
<Rating value={4} icon="leaf" />
<Rating value={4} icon="flower" />
<Rating value={4} icon="tree" />
```

#### Awards & Achievements

```tsx
<Rating value={4} icon="award" />
<Rating value={4} icon="trophy" />
<Rating value={4} icon="medal" />
<Rating value={4} icon="crown" />
<Rating value={4} icon="gem" />
<Rating value={4} icon="badge" />
```

#### Food & Drinks

```tsx
<Rating value={4} icon="coffee" />
<Rating value={4} icon="pizza" />
<Rating value={4} icon="cake" />
<Rating value={4} icon="cherry" />
<Rating value={4} icon="apple" />
```

#### Animals

```tsx
<Rating value={4} icon="cat" />
<Rating value={4} icon="dog" />
<Rating value={4} icon="bird" />
<Rating value={4} icon="fish" />
<Rating value={4} icon="pawPrint" />
```

#### Entertainment

```tsx
<Rating value={4} icon="music" />
<Rating value={4} icon="headphones" />
<Rating value={4} icon="gamepad" />
<Rating value={4} icon="palette" />
```

See the full icon list in the [Icon Reference](#icon-reference) section.

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

## Color Schemes

### 25+ Predefined Color Schemes

The Rating component includes 25+ predefined color schemes:

#### Warm Colors

```tsx
<Rating value={4} colorScheme="yellow" />   {/* Default */}
<Rating value={4} colorScheme="amber" />
<Rating value={4} colorScheme="orange" />
<Rating value={4} colorScheme="red" />
<Rating value={4} colorScheme="rose" />
<Rating value={4} colorScheme="pink" />
<Rating value={4} colorScheme="fuchsia" />
```

#### Cool Colors

```tsx
<Rating value={4} colorScheme="purple" />
<Rating value={4} colorScheme="violet" />
<Rating value={4} colorScheme="indigo" />
<Rating value={4} colorScheme="blue" />
<Rating value={4} colorScheme="sky" />
<Rating value={4} colorScheme="cyan" />
<Rating value={4} colorScheme="teal" />
```

#### Nature Colors

```tsx
<Rating value={4} colorScheme="green" />
<Rating value={4} colorScheme="emerald" />
<Rating value={4} colorScheme="lime" />
```

#### Neutral Colors

```tsx
<Rating value={4} colorScheme="slate" />
<Rating value={4} colorScheme="gray" />
<Rating value={4} colorScheme="zinc" />
<Rating value={4} colorScheme="neutral" />
<Rating value={4} colorScheme="stone" />
```

#### Special Colors

```tsx
<Rating value={4} colorScheme="gold" />
<Rating value={4} colorScheme="bronze" />
<Rating value={4} colorScheme="silver" />
<Rating value={4} colorScheme="rainbow" />
```

### Custom Colors

Override color schemes with any CSS color:

```tsx
{
  /* Custom hex colors */
}
<Rating value={4} color="#ff6b6b" emptyColor="#ffe3e3" />;

{
  /* CSS named colors */
}
<Rating value={4} color="crimson" emptyColor="lightpink" />;

{
  /* RGB/HSL values */
}
<Rating value={4} color="rgb(255, 107, 107)" emptyColor="hsl(0, 100%, 95%)" />;

{
  /* Combine with color scheme (custom overrides scheme) */
}
<Rating value={4} colorScheme="blue" color="#3b82f6" />;
```

## Custom Icons

### Using Custom Lucide Icons

Import any Lucide icon and use it directly:

```tsx
import { Zap, Heart, Crown, Flame, Star } from "lucide-react";

<Rating value={4} customIcon={Zap} colorScheme="yellow" />
<Rating value={4} customIcon={Heart} colorScheme="rose" />
<Rating value={4} customIcon={Crown} colorScheme="gold" />
<Rating value={4} customIcon={Flame} colorScheme="orange" />
```

### Using Iconify

```tsx
import { Icon } from "@iconify/react";

{
  /* Material Design Icons */
}
<Rating value={4} customIcon={<Icon icon="mdi:star" />} />;

{
  /* Font Awesome */
}
<Rating value={4} customIcon={<Icon icon="fa:heart" />} colorScheme="red" />;

{
  /* Emoji */
}
<Rating value={4} customIcon={<Icon icon="noto:fire" />} />;
```

### Separate Empty Icon

Use different icons for filled and empty states:

```tsx
import { Star, StarOff } from "lucide-react";

<Rating
  value={3}
  max={5}
  customIcon={Star}
  customEmptyIcon={StarOff}
  colorScheme="yellow"
/>;
```

### Custom SVG Components

```tsx
const CustomIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

<Rating value={4} customIcon={CustomIcon} />;
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

## Layout & Styling

### Direction

```tsx
{
  /* Horizontal (default) */
}
<Rating value={4} direction="horizontal" />;

{
  /* Vertical */
}
<Rating value={4} direction="vertical" />;
```

### Gap Control

```tsx
<Rating value={4} gap="none" />
<Rating value={4} gap="xs" />
<Rating value={4} gap="sm" />    {/* Default */}
<Rating value={4} gap="md" />
<Rating value={4} gap="lg" />
<Rating value={4} gap="xl" />
```

### Animations

```tsx
{
  /* With animations (default) */
}
<Rating value={4} animated={true} />;

{
  /* Without animations */
}
<Rating value={4} animated={false} />;

{
  /* Highlight on hover */
}
<Rating value={4} highlightOnHover={true} />;
```

### Custom Styling

```tsx
<Rating
  value={4}
  className="my-custom-class"
  iconClassName="custom-icon-class"
/>
```

## Keyboard Navigation

The Rating component supports comprehensive keyboard navigation:

- **Arrow Right/Up**: Increase rating
- **Arrow Left/Down**: Decrease rating
- **Home**: Jump to minimum (0.5 or 1)
- **End**: Jump to maximum
- **0/Backspace/Delete**: Clear rating (if `allowClear` is true)
- **Number keys (1-5)**: Jump to specific rating

## Common Patterns

### Product Rating

```tsx
function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <h3>{product.name}</h3>
      </CardHeader>
      <CardContent>
        <Rating
          value={product.rating}
          readOnly
          showValue
          count={product.reviewCount}
          size="sm"
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
            readOnly
            showValue
            count={data.count}
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
    <Card>
      <CardHeader>
        <h3>Rate Your Experience</h3>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
```

## Advanced Examples

### Dynamic Icon Based on Value

```tsx
function DynamicRating() {
  const [rating, setRating] = useState(3);

  const getIcon = (value: number): RatingIcon => {
    if (value <= 1) return "frown";
    if (value <= 2) return "meh";
    if (value <= 3) return "smile";
    if (value <= 4) return "laugh";
    return "sparkles";
  };

  return (
    <Rating
      value={rating}
      onChange={setRating}
      icon={getIcon(rating)}
      colorScheme={rating >= 4 ? "green" : rating >= 3 ? "yellow" : "red"}
    />
  );
}
```

### Multi-Category Ratings

```tsx
function MultiCategoryRating() {
  const [ratings, setRatings] = useState({
    quality: 0,
    service: 0,
    value: 0,
    atmosphere: 0,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-24">Quality</span>
        <Rating
          value={ratings.quality}
          onChange={(v) => setRatings({ ...ratings, quality: v })}
          icon="star"
          colorScheme="gold"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">Service</span>
        <Rating
          value={ratings.service}
          onChange={(v) => setRatings({ ...ratings, service: v })}
          icon="thumbsUp"
          colorScheme="blue"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">Value</span>
        <Rating
          value={ratings.value}
          onChange={(v) => setRatings({ ...ratings, value: v })}
          icon="dollarSign"
          colorScheme="green"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24">Atmosphere</span>
        <Rating
          value={ratings.atmosphere}
          onChange={(v) => setRatings({ ...ratings, atmosphere: v })}
          icon="sparkles"
          colorScheme="purple"
        />
      </div>
    </div>
  );
}
```

### With Iconify Integration

```tsx
import { Icon } from "@iconify/react";

function IconifyRatings() {
  return (
    <div className="space-y-4">
      {/* Emoji ratings */}
      <Rating value={4} customIcon={<Icon icon="noto:star" />} max={5} />

      {/* Material Design */}
      <Rating
        value={4}
        customIcon={<Icon icon="mdi:heart" />}
        colorScheme="rose"
      />

      {/* Font Awesome */}
      <Rating
        value={4}
        customIcon={<Icon icon="fa-solid:fire" />}
        colorScheme="orange"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop               | Type                                                          | Default         | Description                                    |
| ------------------ | ------------------------------------------------------------- | --------------- | ---------------------------------------------- |
| `value`            | `number`                                                      | `0`             | Current rating value (0 to max)                |
| `max`              | `number`                                                      | `5`             | Maximum rating value                           |
| `variant`          | `RatingVariant`                                               | `"default"`     | Visual style variant (8 options)               |
| `size`             | `RatingSize`                                                  | `"md"`          | Size of rating icons (xs to 4xl)               |
| `icon`             | `RatingIcon`                                                  | `"star"`        | Built-in icon type (80+ options)               |
| `iconStyle`        | `"stroke"` \| `"fill"` \| `"duotone"` \| `"bold"` \| `"thin"` | `"stroke"`      | Controls how icons are rendered                |
| `strokeWidth`      | `number`                                                      | Varies by style | Custom stroke width for the icons              |
| `precision`        | `"full"` \| `"half"`                                          | `"full"`        | Rating precision                               |
| `colorScheme`      | `RatingColorScheme`                                           | `"yellow"`      | Predefined color scheme (25+ options)          |
| `readOnly`         | `boolean`                                                     | `false`         | Read-only mode                                 |
| `disabled`         | `boolean`                                                     | `false`         | Disabled state                                 |
| `showValue`        | `boolean`                                                     | `false`         | Show numeric value                             |
| `valueFormat`      | `(value, max) => string`                                      | -               | Custom value formatter                         |
| `count`            | `number`                                                      | -               | Number of reviews/ratings                      |
| `countLabel`       | `string`                                                      | `"reviews"`     | Label for count                                |
| `color`            | `string`                                                      | -               | Custom filled color (overrides colorScheme)    |
| `emptyColor`       | `string`                                                      | -               | Custom empty color (overrides colorScheme)     |
| `hoverable`        | `boolean`                                                     | `true`          | Enable hover effect                            |
| `showTooltip`      | `boolean`                                                     | `false`         | Show tooltips                                  |
| `tooltipLabels`    | `string[]`                                                    | -               | Custom tooltip labels                          |
| `onChange`         | `(value: number) => void`                                     | -               | Value change callback                          |
| `onHover`          | `(value: number) => void`                                     | -               | Hover callback                                 |
| `allowClear`       | `boolean`                                                     | `true`          | Allow clearing rating by clicking same value   |
| `customIcon`       | `CustomIconComponent`                                         | -               | Custom icon (Lucide, Iconify, React component) |
| `customEmptyIcon`  | `CustomIconComponent`                                         | -               | Custom empty icon                              |
| `className`        | `string`                                                      | -               | Additional CSS classes for container           |
| `iconClassName`    | `string`                                                      | -               | Additional CSS classes for icons               |
| `animated`         | `boolean`                                                     | `true`          | Enable animations                              |
| `highlightOnHover` | `boolean`                                                     | `false`         | Highlight effect on hover                      |
| `direction`        | `"horizontal"` \| `"vertical"`                                | `"horizontal"`  | Layout direction                               |
| `gap`              | `"none"` \| `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"`    | `"sm"`          | Gap between icons                              |

## Icon Reference

### Complete Icon List (80+)

**Shapes**: star, heart, circle, square, diamond, triangle, hexagon, octagon, pentagon

**Emotions**: smile, frown, meh, laugh, angry, thumbsUp, thumbsDown

**Nature & Weather**: sun, moon, cloud, snowflake, droplet, flame, leaf, flower, tree

**Awards**: award, trophy, medal, crown, gem, badge, ribbon

**Energy**: zap, bolt, sparkle, sparkles, rocket, target

**Food & Drinks**: coffee, pizza, cake, cookie, apple, cherry, iceCream, beer, wine

**Animals**: cat, dog, bird, fish, bug, rabbit, pawPrint

**Entertainment**: music, headphones, gamepad, dice, puzzle, palette

**Communication**: messageCircle, bell, mail, send

**Objects**: gift, bookmark, flag, key, lock, lightbulb, umbrella, glasses, watch, compass

**Status**: check, checkCircle, x, xCircle, alertCircle, info, help

**Misc**: ghost, skull, anchor, plane, car, home, building, mountain, waves, infinity, percent, dollarSign, euro, bitcoin

### Programmatic Access

```tsx
import {
  getAllIconNames,
  iconCategories,
  getAllColorSchemes,
  colorSchemeCategories,
} from "saha-ui";

// Get all available icon names
const icons = getAllIconNames();
// ["star", "heart", "circle", ...]

// Get icons by category
const emotionIcons = iconCategories.emotions;
// ["smile", "frown", "meh", "laugh", "angry", "thumbsUp", "thumbsDown"]

// Get all color schemes
const schemes = getAllColorSchemes();
// ["yellow", "amber", "orange", ...]

// Get color schemes by category
const warmColors = colorSchemeCategories.warm;
// ["yellow", "amber", "orange", "red", "rose", "pink", "fuchsia"]
```

## Accessibility

The Rating component is fully accessible:

- ✅ Uses proper ARIA roles (`radiogroup`, `radio`) and attributes
- ✅ Keyboard navigable with comprehensive key support:
  - Arrow keys (Right/Up/Left/Down) to change rating
  - Home/End keys to jump to min/max
  - Number keys for direct rating selection
  - Backspace/Delete to clear rating
- ✅ Screen reader friendly with proper value announcements
- ✅ Focus visible states with custom focus index management
- ✅ Disabled and read-only states properly announced
- ✅ aria-label and aria-checked for each rating item
- ✅ aria-valuenow, aria-valuemin, aria-valuemax for current state

## Styling

### Custom Styles

```tsx
<Rating
  value={4}
  className="gap-2"
  iconClassName="text-amber-500"
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
6. **Color consistency**: Use `colorScheme` for consistency or `color`/`emptyColor` for custom branding
7. **Icon selection**: Choose icons that match your content (hearts for favorites, trophies for achievements, etc.)
8. **Custom icons**: For unique branding, use `customIcon` with your icon library
9. **Accessibility**: Ensure proper labels and keyboard navigation work for your use case
10. **Performance**: Reuse color schemes and built-in icons when possible

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

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  RatingProps,
  RatingVariant,
  RatingSize,
  RatingIcon,
  RatingColorScheme,
  CustomIconComponent,
} from "saha-ui";

const config: RatingProps = {
  value: 4,
  max: 5,
  variant: "gradient",
  size: "lg",
  icon: "heart",
  colorScheme: "rose",
  precision: "half",
  animated: true,
  highlightOnHover: true,
};
```

## Exports

```typescript
// Component
export { Rating } from "saha-ui";

// Types
export type {
  RatingProps,
  RatingVariant,
  RatingSize,
  RatingIcon,
  RatingColorScheme,
  RatingPrecision,
  CustomIconComponent,
} from "saha-ui";

// Utilities
export {
  getAllIconNames,
  iconCategories,
  getAllColorSchemes,
  colorSchemeCategories,
} from "saha-ui";
```
