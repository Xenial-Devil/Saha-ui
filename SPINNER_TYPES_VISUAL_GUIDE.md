# 🎨 Spinner Types Visual Guide

## All 15 Spinner Types - Quick Reference

### Classic Spinners (Original 5)

#### 1. Ring (Default) 🔵

```tsx
<Spinner type="ring" variant="primary" size="lg" />
```

**Description**: Classic circular border spinner with transparent top/right borders  
**Animation**: Continuous 360° rotation  
**Best For**: General loading states, default choice  
**Style**: Minimalist, professional, universal

---

#### 2. Dots ⚪

```tsx
<Spinner type="dots" variant="primary" size="lg" />
```

**Description**: 8 dots rotating in perfect circle  
**Animation**: Synchronized rotation with opacity fade  
**Best For**: Elegant loading, modern apps  
**Style**: Clean, discrete, sophisticated

---

#### 3. Dashed ⭕

```tsx
<Spinner type="dashed" variant="primary" size="lg" />
```

**Description**: Ring with dashed border pattern  
**Animation**: Rotating dashed circle  
**Best For**: Dash-themed UIs, alternative to solid ring  
**Style**: Subtle, textured, modern

---

#### 4. Bars 📊

```tsx
<Spinner type="bars" variant="primary" size="lg" />
```

**Description**: 8 radiating bars from center  
**Animation**: Rotating bars with opacity gradient  
**Best For**: Industrial UIs, data processing  
**Style**: Technical, bold, dynamic

---

#### 5. Dot Ring 🔘

```tsx
<Spinner type="dotRing" variant="primary" size="lg" />
```

**Description**: 12 dots forming complete circle  
**Animation**: Smooth circular rotation  
**Best For**: Complete loading indicators, timers  
**Style**: Balanced, harmonious, complete

---

## Creative Spinners (New 10)

### 6. Orbit 🌌

```tsx
<Spinner type="orbit" variant="gradient" size="xl" />
```

**Description**: Multi-orbit planetary system with 3 orbits, 4 dots each  
**Animation**: Concentric orbital rotation  
**Best For**:

- Cloud synchronization
- Multi-threaded operations
- Network activities
- Space-themed apps
- Complex system operations

**Visual Characteristics**:

- 3 concentric orbits at different radii
- Each orbit has 4 dots offset by 45°
- Opacity decreases per orbit (1.0, 0.8, 0.6)
- Creates depth perception

**Why It's Beautiful**: Mimics celestial mechanics, creates sense of complexity and system interaction

---

### 7. Pulse 💓

```tsx
<Spinner type="pulse" variant="success" size="lg" />
```

**Description**: 3 expanding concentric circles pulsing outward  
**Animation**: Ping animation with staggered delays  
**Best For**:

- Heartbeat monitors
- Notification systems
- Radar displays
- Sonar effects
- Real-time updates

**Visual Characteristics**:

- 3 circles: 100%, 80%, 60% size
- Each has unique animation delay (0s, 0.3s, 0.6s)
- Duration: 2s, 2.5s, 3s respectively
- Opacity fade: 0.6, 0.45, 0.3

**Why It's Beautiful**: Creates mesmerizing wave effect, sense of energy radiating outward

---

### 8. Square ⬛

```tsx
<Spinner type="square" variant="warning" size="lg" />
```

**Description**: 4 corner dots rotating in square formation  
**Animation**: Circular path maintaining square positions  
**Best For**:

- Grid-based applications
- Document editors
- Canvas applications
- Geometric design tools
- Modern minimalist UIs

**Visual Characteristics**:

- 4 corners positioned at ±offset on x,y axes
- Small square dots (3-12px based on size)
- Opacity gradient per corner
- Clean geometric aesthetic

**Why It's Beautiful**: Sharp, modern geometry; combines circular motion with angular form

---

### 9. Triangle 🔺

```tsx
<Spinner type="triangle" variant="accent" size="lg" />
```

**Description**: 3 CSS triangles rotating in triangular formation  
**Animation**: 120° rotation maintaining equilateral triangle  
**Best For**:

- Delta symbols
- Warning indicators
- Mathematical applications
- Direction indicators
- Angular frameworks

**Visual Characteristics**:

- Pure CSS triangles (no SVG/images)
- Positioned at 0°, 120°, 240° (equilateral)
- Border-based triangle technique
- Individual triangle rotation

**Why It's Beautiful**: Unique CSS shape technique, strong directional emphasis

---

### 10. Wave 🌊

```tsx
<Spinner type="wave" variant="info" size="md" />
```

**Description**: 5 vertical bars with sequential bounce animation  
**Animation**: Cascading bounce creating wave motion  
**Best For**:

- Audio visualizers
- Music players
- Progress indicators
- Rhythmic processes
- Media applications

**Visual Characteristics**:

- 5 vertical bars with small gaps
- Sequential delay: 0.1s per bar
- Vertical bounce animation
- Horizontal layout (flexbox)

**Why It's Beautiful**: Rhythmic, musical quality; familiar from audio applications

---

### 11. Spiral 🌀

```tsx
<Spinner type="spiral" variant="error" size="lg" />
```

**Description**: Dots arranged in expanding Archimedean spiral  
**Animation**: Rotation revealing spiral structure  
**Best For**:

- Data visualization
- Mathematical tools
- Scientific applications
- Creative/artistic apps
- Fibonacci sequences

**Visual Characteristics**:

- 12 dots with increasing radius
- Radius formula: (i / dots) × maxRadius
- Opacity increases with radius: (i/dots) × 0.8 + 0.2
- Creates spiral arm effect

**Why It's Beautiful**: Mathematically elegant, natural pattern found in shells and galaxies

---

### 12. Infinity ∞

```tsx
<Spinner type="infinity" variant="gradient" size="xl" />
```

**Description**: Lemniscate (∞ symbol) traced by 20 dots  
**Animation**: Rotation along infinity curve  
**Best For**:

- Continuous processes
- Subscription services
- Loop operations
- Infinite scrolls
- Eternal/ongoing concepts

**Visual Characteristics**:

- Parametric equation: x = (a·cos(t))/(1+sin²(t)), y = (a·cos(t)·sin(t))/(1+sin²(t))
- 20 dots trace figure-eight path
- Opacity fade along path
- Mathematical precision

**Why It's Beautiful**: Iconic symbol, smooth figure-eight motion, mathematical perfection

---

### 13. Flower 🌸

```tsx
<Spinner type="flower" variant="success" size="lg" />
```

**Description**: 6 petal-shaped elements radiating from center dot  
**Animation**: Rotating flower with botanical aesthetic  
**Best For**:

- Nature-themed applications
- Wellness/health apps
- Organic/eco brands
- Meditation apps
- Beauty/cosmetics

**Visual Characteristics**:

- 6 teardrop petals using `border-radius: 50% 50% 50% 0`
- Center dot for flower core
- Petals positioned at 60° intervals
- Each petal rotated to face outward

**Why It's Beautiful**: Organic, soft appearance; evokes natural growth and beauty

---

### 14. Grid ⚡

```tsx
<Spinner type="grid" variant="secondary" size="lg" />
```

**Description**: 3×3 grid (9 cells) with cascading pulse  
**Animation**: Sequential pulse with intelligent delay  
**Best For**:

- Gallery loading
- Image grids
- Dashboard widgets
- Tile-based UIs
- App launchers

**Visual Characteristics**:

- CSS Grid layout: 3×3
- 9 square cells with gaps
- Pulse animation with 0.1s delay per cell
- Creates diagonal wave effect

**Why It's Beautiful**: Structured, organized; familiar loading pattern for content grids

---

### 15. Bounce 🏀

```tsx
<Spinner type="bounce" variant="accent" size="lg" />
```

**Description**: 3 horizontally aligned dots with vertical bounce  
**Animation**: Classic "..." typing indicator  
**Best For**:

- Chat applications
- Messaging interfaces
- Typing indicators
- Simple loading states
- Casual/friendly UIs

**Visual Characteristics**:

- 3 dots in horizontal row
- Vertical bounce animation
- Sequential delay: 0.16s per dot
- Small, friendly appearance

**Why It's Beautiful**: Universally recognized, playful, approachable; perfect simplicity

---

## Size Reference

All spinners support 6 sizes:

| Size  | Dimensions | Use Case                   |
| ----- | ---------- | -------------------------- |
| `xs`  | 16px       | Inline text, tight spaces  |
| `sm`  | 24px       | Buttons, small cards       |
| `md`  | 32px       | Default, most common       |
| `lg`  | 48px       | Card headers, prominent    |
| `xl`  | 64px       | Hero sections, featured    |
| `2xl` | 128px      | Fullscreen, splash screens |

## Variant Showcase

All 15 types work with all 10 variants:

| Variant     | Theme              | Best Spinner Types       |
| ----------- | ------------------ | ------------------------ |
| `default`   | Neutral gray       | Ring, Dots, Grid         |
| `primary`   | Brand blue         | All types                |
| `secondary` | Muted purple       | Spiral, Grid, Square     |
| `accent`    | Vibrant color      | Flower, Triangle, Bounce |
| `info`      | Informational blue | Wave, Pulse, Orbit       |
| `success`   | Green positive     | Flower, Pulse, Infinity  |
| `warning`   | Yellow caution     | Square, Triangle, Bars   |
| `error`     | Red alert          | Spiral, Bars, Triangle   |
| `glass`     | Blur effect        | Orbit, Infinity, Flower  |
| `gradient`  | Multi-color        | Orbit, Infinity, Spiral  |

## Use Case Matrix

| Type         | Technical | Creative | Casual | Professional |
| ------------ | --------- | -------- | ------ | ------------ |
| Ring         | ✅        | ✅       | ✅     | ✅           |
| Dots         | ✅        | ✅       | ✅     | ✅           |
| Dashed       | ✅        | ❌       | ✅     | ✅           |
| Bars         | ✅        | ❌       | ❌     | ✅           |
| DotRing      | ✅        | ✅       | ✅     | ✅           |
| **Orbit**    | ✅        | ✅       | ❌     | ✅           |
| **Pulse**    | ✅        | ✅       | ✅     | ❌           |
| **Square**   | ✅        | ✅       | ❌     | ✅           |
| **Triangle** | ✅        | ✅       | ❌     | ✅           |
| **Wave**     | ✅        | ✅       | ✅     | ✅           |
| **Spiral**   | ❌        | ✅       | ❌     | ❌           |
| **Infinity** | ✅        | ✅       | ✅     | ✅           |
| **Flower**   | ❌        | ✅       | ✅     | ❌           |
| **Grid**     | ✅        | ❌       | ✅     | ✅           |
| **Bounce**   | ✅        | ❌       | ✅     | ✅           |

## Performance Notes

### Optimized Types (Lightest)

1. **Ring** - Single element with CSS borders
2. **Dashed** - Single element variation
3. **Bounce** - Only 3 elements

### Medium Complexity

4. **Dots** - 8 elements
5. **Bars** - 8 elements
6. **Square** - 4 elements
7. **Triangle** - 3 elements
8. **Wave** - 5 elements
9. **Grid** - 9 elements

### Rich Animation (Most Elements)

10. **Orbit** - 12 elements (3 orbits × 4 dots)
11. **DotRing** - 12 elements
12. **Spiral** - 12 elements
13. **Infinity** - 20 elements
14. **Flower** - 7 elements (6 petals + center)
15. **Pulse** - 3 elements (but with opacity animations)

All spinners are GPU-accelerated via CSS transforms! 🚀

---

## Combination Examples

### Futuristic App

```tsx
<Spinner type="orbit" variant="gradient" size="xl" />
```

### Health/Wellness App

```tsx
<Spinner type="flower" variant="success" size="lg" />
```

### Music Player

```tsx
<Spinner type="wave" variant="info" size="md" />
```

### Chat Application

```tsx
<Spinner type="bounce" variant="primary" size="sm" />
```

### Data Visualization

```tsx
<Spinner type="spiral" variant="accent" size="xl" />
```

### Subscription Service

```tsx
<Spinner type="infinity" variant="gradient" size="2xl" />
```

### Modern Dashboard

```tsx
<Spinner type="grid" variant="secondary" size="lg" />
```

---

**Total Configurations**: 15 types × 10 variants × 6 sizes = **900 possible combinations!** 🎉
