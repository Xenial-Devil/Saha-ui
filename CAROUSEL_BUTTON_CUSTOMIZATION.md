# Carousel Button Customization Guide

## Overview

The Carousel component now supports **fully customizable CTA (Call-to-Action) buttons** with multiple variants, custom styling, and even completely custom button components. Buttons are **optional** and can be shown or hidden as needed.

## Features

✅ **Optional Buttons** - Show or hide CTA buttons  
✅ **4 Built-in Variants** - Gradient, Solid, Outline, Ghost  
✅ **Custom Button Components** - Complete control over button design  
✅ **Custom Icons** - Use any Lucide icon or custom icon component  
✅ **Custom Styling** - Override styles with custom CSS classes  
✅ **Flexible Actions** - Support for both links and click handlers

---

## Basic Usage

### 1. Default Gradient Button (Default)

```tsx
<Carousel
  items={[
    {
      image: "/image1.jpg",
      alt: "Slide 1",
      title: "Welcome",
      description: "Explore our features",
      link: "/explore",
      linkText: "Get Started",
    },
  ]}
/>
```

**Result:** Beautiful gradient button (primary → accent) with hover effects

---

### 2. Hide Buttons

```tsx
<Carousel
  items={[
    {
      image: "/image1.jpg",
      alt: "Slide 1",
      title: "Welcome",
      description: "Just enjoy the view",
      showButton: false, // Hide the button
    },
  ]}
/>
```

**Result:** No CTA button displayed, only image with title and description

---

## Button Variants

### Available Variants

| Variant    | Style                                  | Use Case                |
| ---------- | -------------------------------------- | ----------------------- |
| `gradient` | Gradient background (primary → accent) | Default, high emphasis  |
| `solid`    | Solid primary color background         | Medium emphasis         |
| `outline`  | Transparent with white border          | Low emphasis, overlays  |
| `ghost`    | Transparent with subtle hover          | Minimal, subtle actions |
| `custom`   | No default styles                      | Complete custom styling |

### Gradient Button (Default)

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Modern Design",
      link: "#",
      linkText: "Explore",
      buttonVariant: "gradient", // Default
    },
  ]}
/>
```

**Styling:**

- Background: `bg-gradient-to-r from-primary to-accent`
- Text: White
- Hover: Scale up + shadow glow

### Solid Button

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Solid Style",
      link: "#",
      linkText: "Learn More",
      buttonVariant: "solid",
    },
  ]}
/>
```

**Styling:**

- Background: `bg-primary`
- Text: White
- Hover: Slightly darker + shadow + scale

### Outline Button

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Minimal Look",
      link: "#",
      linkText: "Discover",
      buttonVariant: "outline",
    },
  ]}
/>
```

**Styling:**

- Background: Transparent
- Border: `border-2 border-white`
- Text: White
- Hover: Fill white, text becomes black

### Ghost Button

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Subtle Action",
      link: "#",
      linkText: "View More",
      buttonVariant: "ghost",
    },
  ]}
/>
```

**Styling:**

- Background: Transparent
- Text: White
- Hover: Subtle white background with backdrop blur

---

## Custom Icons

Replace the default `ExternalLink` icon with any icon:

```tsx
import { ShoppingCart, Heart, Download, ArrowRight } from "lucide-react";

<Carousel
  items={[
    {
      image: "/product.jpg",
      alt: "Product",
      title: "Buy Now",
      link: "/cart",
      linkText: "Add to Cart",
      LinkIcon: ShoppingCart, // Custom icon
      buttonVariant: "solid",
    },
  ]}
/>;
```

**Remove Icon:**

```tsx
{
  ...item,
  LinkIcon: null, // No icon
}
```

---

## Custom Button Styling

Override button styles with custom CSS classes:

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Custom Styled",
      link: "#",
      linkText: "Click Here",
      buttonVariant: "custom",
      buttonClassName:
        "bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 font-bold shadow-2xl",
    },
  ]}
/>
```

**Tips:**

- Use `buttonVariant: "custom"` to remove default styles
- `buttonClassName` overrides/extends the default classes
- Works with all variants

---

## Completely Custom Button Component

For ultimate control, provide your own button component:

```tsx
const MyCustomButton = ({ link, linkText, onClick, linkTarget }) => (
  <a
    href={link}
    target={linkTarget}
    className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-2xl bg-white text-black font-extrabold text-lg transition-all duration-300 hover:bg-black hover:text-white"
  >
    <span className="relative z-10">{linkText || "Click Me"}</span>
    <svg
      className="w-6 h-6 transition-transform group-hover:translate-x-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </a>
);

<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Custom Button",
      link: "/custom",
      linkText: "Explore Now",
      CustomButton: MyCustomButton, // Your component
    },
  ]}
/>;
```

**Props your component receives:**

```tsx
interface CustomButtonProps {
  link?: string;
  linkText?: string;
  onClick?: () => void;
  linkTarget?: string;
}
```

---

## Click Handlers

Use `onClick` instead of `link` for JavaScript actions:

```tsx
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Interactive",
      linkText: "Click Me",
      onClick: () => {
        console.log("Button clicked!");
        // Your custom logic
      },
      buttonVariant: "gradient",
    },
  ]}
/>
```

---

## Complete API Reference

### CarouselItemProps (Button-Related)

```tsx
interface CarouselItemProps {
  // ... other props

  /** CTA link URL */
  link?: string;

  /** Button text */
  linkText?: string;

  /** Click handler (alternative to link) */
  onClick?: () => void;

  /** Link target attribute @default "_blank" */
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";

  /** Show/hide the button @default true when link or onClick provided */
  showButton?: boolean;

  /** Button variant style @default "gradient" */
  buttonVariant?: "gradient" | "solid" | "outline" | "ghost" | "custom";

  /** Custom CSS classes for button */
  buttonClassName?: string;

  /** Custom icon component */
  LinkIcon?: React.ElementType | null;

  /** Custom button component */
  CustomButton?: React.ComponentType<{
    link?: string;
    linkText?: string;
    onClick?: () => void;
    linkTarget?: string;
  }>;
}
```

---

## Real-World Examples

### E-commerce Product Carousel

```tsx
import { ShoppingCart } from "lucide-react";

const products = [
  {
    image: "/product1.jpg",
    alt: "Product 1",
    title: "Premium Watch",
    description: "Luxury timepiece",
    link: "/products/1",
    linkText: "Buy Now - $299",
    LinkIcon: ShoppingCart,
    buttonVariant: "solid",
  },
  {
    image: "/product2.jpg",
    alt: "Product 2",
    title: "Designer Bag",
    description: "Limited edition",
    link: "/products/2",
    linkText: "Add to Cart",
    LinkIcon: ShoppingCart,
    buttonVariant: "gradient",
  },
];

<Carousel items={products} autoplay variant="bordered" />;
```

### Hero Carousel (No Buttons)

```tsx
const heroSlides = [
  {
    image: "/hero1.jpg",
    alt: "Hero 1",
    title: "Welcome to Our Site",
    description: "Discover amazing features",
    showButton: false, // No distracting buttons
  },
  {
    image: "/hero2.jpg",
    alt: "Hero 2",
    title: "Innovation First",
    description: "Built for the future",
    showButton: false,
  },
];

<Carousel items={heroSlides} autoplay effect="fade" variant="glass" />;
```

### Call-to-Action Carousel

```tsx
import { ArrowRight } from "lucide-react";

const ctaSlides = [
  {
    image: "/cta1.jpg",
    alt: "CTA 1",
    title: "Start Your Journey",
    description: "Join thousands of satisfied customers",
    link: "/signup",
    linkText: "Sign Up Free",
    LinkIcon: ArrowRight,
    buttonVariant: "gradient",
  },
  {
    image: "/cta2.jpg",
    alt: "CTA 2",
    title: "Get Premium",
    description: "Unlock all features",
    link: "/pricing",
    linkText: "View Plans",
    LinkIcon: ArrowRight,
    buttonVariant: "outline",
  },
];

<Carousel items={ctaSlides} autoplay variant="glass" />;
```

---

## Migration Guide

### Before (Old Code)

Buttons were hardcoded with no customization:

```tsx
// Old: No control over button style
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Title",
      link: "#",
      linkText: "Click", // Always gradient button
    },
  ]}
/>
```

### After (New Code)

Full control over button appearance:

```tsx
// New: Complete customization
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Title",
      link: "#",
      linkText: "Click",
      buttonVariant: "solid", // Choose variant
      LinkIcon: CustomIcon, // Custom icon
      buttonClassName: "px-8", // Custom styles
    },
  ]}
/>

// Or hide it completely
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Title",
      showButton: false, // No button
    },
  ]}
/>

// Or use completely custom button
<Carousel
  items={[
    {
      image: "/image.jpg",
      alt: "Slide",
      title: "Title",
      CustomButton: MyButton, // Your component
    },
  ]}
/>
```

---

## Best Practices

### ✅ Do

- Use `gradient` for primary CTAs (high emphasis)
- Use `outline` or `ghost` for secondary actions
- Hide buttons (`showButton: false`) for pure image carousels
- Match button variant to carousel variant (e.g., `ghost` with `glass`)
- Use custom icons that match your action (ShoppingCart, Download, etc.)
- Provide meaningful `linkText` that describes the action

### ❌ Don't

- Mix too many button variants in one carousel
- Use `custom` variant without providing `buttonClassName`
- Forget to provide either `link` or `onClick` when showing buttons
- Use generic text like "Click Here" - be specific
- Overload slides with too much text and large buttons

---

## Styling Tips

### Matching Carousel Variants

```tsx
// Glass carousel → Ghost button
<Carousel
  items={items.map(item => ({ ...item, buttonVariant: "ghost" }))}
  variant="glass"
/>

// Bordered carousel → Solid button
<Carousel
  items={items.map(item => ({ ...item, buttonVariant: "solid" }))}
  variant="bordered"
/>
```

### Responsive Button Sizes

```tsx
{
  ...item,
  buttonClassName: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
}
```

### Animated Custom Buttons

```tsx
const AnimatedButton = ({ link, linkText }) => (
  <a
    href={link}
    className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold overflow-hidden relative"
  >
    <span className="relative z-10 transition-transform group-hover:translate-x-2">
      {linkText}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent translate-x-full transition-transform group-hover:translate-x-0" />
  </a>
);
```

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Accessibility

All button variants are keyboard accessible and screen-reader friendly:

- ✅ Proper `<a>` and `<button>` semantics
- ✅ `rel="noopener noreferrer"` for external links
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Meaningful link text required

---

## Performance

- Buttons use CSS transitions (GPU-accelerated)
- Custom button components are rendered efficiently
- No layout shift with `showButton` toggle
- Optimized for React 19.2.0

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** October 12, 2025
