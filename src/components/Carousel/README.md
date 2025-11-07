# Carousel

A powerful carousel/slider component for showcasing images, content, or cards. Features smooth transitions, multiple effects, autoplay, navigation controls, and touch/swipe support.

## Features

- 🎠 **Multiple Effects** - Slide, fade, cube, and coverflow transitions
- 🎨 **Visual Variants** - Default, bordered, shadow, and glass styles
- ▶️ **Autoplay** - Automatic slide progression with pause on hover
- 🎯 **Navigation** - Arrow buttons and dot indicators
- 👆 **Touch/Swipe** - Full touch and swipe gesture support
- ⌨️ **Keyboard Navigation** - Arrow key support for accessibility
- 🔄 **Loop** - Infinite loop capability
- ♿ **Accessible** - ARIA labels and keyboard navigation

## Installation

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@saha-ui/core';
```

## Basic Usage

### Simple Carousel

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>
      <img src="/slide1.jpg" alt="Slide 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="/slide2.jpg" alt="Slide 2" />
    </CarouselItem>
    <CarouselItem>
      <img src="/slide3.jpg" alt="Slide 3" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### With Cards

```tsx
<Carousel>
  <CarouselContent>
    {products.map((product) => (
      <CarouselItem key={product.id}>
        <Card>
          <CardContent>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Effects

### Slide Effect (Default)

```tsx
<Carousel effect="slide">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Fade Effect

```tsx
<Carousel effect="fade">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Cube Effect

```tsx
<Carousel effect="cube">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Coverflow Effect

```tsx
<Carousel effect="coverflow">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Variants

```tsx
// Default
<Carousel variant="default">...</Carousel>

// Bordered
<Carousel variant="bordered">...</Carousel>

// Shadow
<Carousel variant="shadow">...</Carousel>

// Glass
<Carousel variant="glass">...</Carousel>
```

## Autoplay

```tsx
// Basic autoplay (3 second interval)
<Carousel autoplay>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>

// Custom interval (5 seconds)
<Carousel autoplay autoplayInterval={5000}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
</Carousel>

// Pause on hover
<Carousel autoplay pauseOnHover>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Navigation

### With Arrow Buttons

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### With Indicators

```tsx
<Carousel showIndicators>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Hide Navigation

```tsx
<Carousel showNavigation={false}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Loop Mode

```tsx
// Infinite loop
<Carousel loop>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Multiple Items Per View

```tsx
// Show 3 items at once
<Carousel itemsPerView={3} gap={16}>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id}>{item.content}</CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

// Responsive items per view
<Carousel 
  itemsPerView={1}
  breakpoints={{
    640: { itemsPerView: 2 },
    1024: { itemsPerView: 3 }
  }}
>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id}>{item.content}</CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

## Advanced Examples

### Hero Carousel

```tsx
<Carousel 
  autoplay 
  autoplayInterval={5000}
  effect="fade"
  loop
  showIndicators
>
  <CarouselContent>
    {heroes.map((hero) => (
      <CarouselItem key={hero.id}>
        <div className="relative h-[600px]">
          <img 
            src={hero.image} 
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="container h-full flex items-end pb-20">
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
                <p className="text-xl mb-6">{hero.description}</p>
                <Button size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-4" />
  <CarouselNext className="right-4" />
</Carousel>
```

### Product Carousel

```tsx
<Carousel 
  itemsPerView={4}
  gap={20}
  loop
  breakpoints={{
    320: { itemsPerView: 1 },
    640: { itemsPerView: 2 },
    1024: { itemsPerView: 3 },
    1280: { itemsPerView: 4 }
  }}
>
  <CarouselContent>
    {products.map((product) => (
      <CarouselItem key={product.id}>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${product.price}</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Testimonial Carousel

```tsx
<Carousel 
  autoplay
  autoplayInterval={6000}
  effect="fade"
  showIndicators
  variant="glass"
  className="max-w-4xl mx-auto"
>
  <CarouselContent>
    {testimonials.map((testimonial) => (
      <CarouselItem key={testimonial.id}>
        <div className="p-12 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-6">
            <AvatarImage src={testimonial.avatar} />
          </Avatar>
          <blockquote className="text-xl italic mb-6">
            "{testimonial.quote}"
          </blockquote>
          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

## Props

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `effect` | `"slide" \| "fade" \| "cube" \| "coverflow"` | `"slide"` | Transition effect |
| `variant` | `"default" \| "bordered" \| "shadow" \| "glass"` | `"default"` | Visual style |
| `autoplay` | `boolean` | `false` | Enable autoplay |
| `autoplayInterval` | `number` | `3000` | Autoplay interval in ms |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay on hover |
| `loop` | `boolean` | `false` | Enable infinite loop |
| `showNavigation` | `boolean` | `true` | Show arrow buttons |
| `showIndicators` | `boolean` | `false` | Show dot indicators |
| `itemsPerView` | `number` | `1` | Items visible at once |
| `gap` | `number` | `0` | Gap between items in pixels |
| `breakpoints` | `object` | - | Responsive breakpoint config |
| `defaultIndex` | `number` | `0` | Initial slide index |
| `onChange` | `(index: number) => void` | - | Slide change callback |
| `className` | `string` | - | Additional CSS classes |

### CarouselItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item content |
| `className` | `string` | - | Additional CSS classes |

## Keyboard Navigation

- **Left Arrow** - Previous slide
- **Right Arrow** - Next slide
- **Home** - First slide
- **End** - Last slide
- **Tab** - Navigate through carousel controls

## Accessibility

- ARIA labels for navigation buttons
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Proper semantic HTML

## Best Practices

1. **Image Optimization** - Use optimized images for better performance
2. **Alt Text** - Always provide alt text for images
3. **Loading States** - Show skeleton loaders while content loads
4. **Touch Gestures** - Enable swipe on mobile devices
5. **Autoplay Caution** - Use autoplay sparingly, provide pause controls
6. **Responsive Design** - Adjust items per view for different screens
7. **Performance** - Lazy load images not currently visible

## Responsive Design

```tsx
<Carousel
  itemsPerView={1}
  breakpoints={{
    // Mobile
    320: { itemsPerView: 1, gap: 10 },
    // Tablet
    768: { itemsPerView: 2, gap: 15 },
    // Desktop
    1024: { itemsPerView: 3, gap: 20 },
    // Large Desktop
    1440: { itemsPerView: 4, gap: 24 }
  }}
>
  {/* Items */}
</Carousel>
```

## Browser Support

Works in all modern browsers that support:
- CSS Transforms
- Touch Events API
- Intersection Observer API
- Modern JavaScript (ES6+)

## Related Components

- **Card** - Card container for carousel items
- **Image** - Optimized image component
- **Button** - Navigation buttons
- **AspectRatio** - Maintain aspect ratios