# Spinner Component - Logo Feature Update

## 🎉 New Feature Added: Custom Logo/Icon Support

The Spinner component now supports displaying custom logos or icons in the center while the spinner animates around it!

## What's New

### Logo Prop

- Accepts **image URL (string)** or **React component (ReactNode)**
- Automatically positions logo in the center of the spinner
- Logo remains stationary while spinner animates around it

### Logo Size Options

5 size variants to perfectly fit your logo within the spinner:

- `xs` - 25% of spinner size
- `sm` - 35% of spinner size
- `md` - 50% of spinner size (default)
- `lg` - 65% of spinner size
- `xl` - 80% of spinner size

## Usage Examples

### With Image URL

```tsx
<Spinner
  variant="primary"
  size="xl"
  logo="/your-brand-logo.png"
  logoSize="md"
  label="Loading..."
/>
```

### With Custom React Component

```tsx
<Spinner
  variant="success"
  size="xl"
  logo={
    <div className="w-full h-full flex items-center justify-center bg-success/10 rounded-full">
      <span className="text-2xl font-bold text-success">S</span>
    </div>
  }
  logoSize="lg"
/>
```

### With SVG Icon

```tsx
<Spinner
  variant="gradient"
  size="2xl"
  logo={<YourSvgIcon />}
  logoSize="md"
  label="Building..."
/>
```

### Fullscreen with Logo

```tsx
<Spinner
  fullscreen
  variant="gradient"
  size="2xl"
  logo="/brand-logo.png"
  logoSize="lg"
  label="Loading your app..."
/>
```

## Technical Implementation

### Type Definitions Updated

```typescript
export interface SpinnerProps {
  // ... existing props

  /**
   * Custom logo or icon to display in the center of the spinner
   * Can be an image URL (string) or a React component (ReactNode)
   */
  logo?: string | React.ReactNode;

  /**
   * Size of the logo relative to spinner size
   * @default "md"
   */
  logoSize?: "xs" | "sm" | "md" | "lg" | "xl";
}
```

### CVA Variants Added

```typescript
const logoSizeVariants = cva(
  "absolute inset-0 flex items-center justify-center",
  {
    variants: {
      logoSize: {
        xs: "[&>*]:w-[25%] [&>*]:h-[25%] [&>img]:w-[25%] [&>img]:h-[25%]",
        sm: "[&>*]:w-[35%] [&>*]:h-[35%] [&>img]:w-[35%] [&>img]:h-[35%]",
        md: "[&>*]:w-[50%] [&>*]:h-[50%] [&>img]:w-[50%] [&>img]:h-[50%]",
        lg: "[&>*]:w-[65%] [&>*]:h-[65%] [&>img]:w-[65%] [&>img]:h-[65%]",
        xl: "[&>*]:w-[80%] [&>*]:h-[80%] [&>img]:w-[80%] [&>img]:h-[80%]",
      },
    },
    defaultVariants: {
      logoSize: "md",
    },
  }
);
```

### Component Structure

```tsx
<div className="relative">
  {/* Animated spinner ring */}
  <div className={spinnerVariants({ variant, size, thickness })} />

  {/* Centered logo (if provided) */}
  {logo && (
    <div className={logoSizeVariants({ logoSize })}>
      {typeof logo === "string" ? (
        <img src={logo} alt="Loading logo" className="object-contain" />
      ) : (
        logo
      )}
    </div>
  )}
</div>
```

## Files Modified

1. **`src/components/Spinner/Spinner.types.ts`**

   - Added `logo` prop (string | ReactNode)
   - Added `logoSize` prop with 5 size options

2. **`src/components/Spinner/index.tsx`**

   - Added `logoSizeVariants` CVA configuration
   - Updated component to render logo in center
   - Wrapped spinner in relative container for positioning

3. **`src/examples/SpinnerExample.tsx`**

   - Added "With Custom Logo/Icon" section showing image, component, and SVG examples
   - Added "Logo Sizes" section demonstrating all 5 size options
   - Updated "Common Use Cases" with brand loading example

4. **`README.md`**
   - Updated Quick Example with logo examples
   - Added comprehensive logo documentation in detailed section
   - Added logo sizes reference
   - Updated features list with logo capabilities

## Use Cases

### Brand Loading Screens

```tsx
<Spinner
  fullscreen
  variant="gradient"
  size="2xl"
  logo="/company-logo.png"
  logoSize="lg"
  label="Loading Saha UI..."
/>
```

### App Initialization

```tsx
{
  isInitializing && (
    <Spinner
      variant="primary"
      size="xl"
      logo={<AppIcon />}
      logoSize="md"
      label="Initializing..."
    />
  );
}
```

### File Upload with Icon

```tsx
<Spinner
  variant="info"
  size="lg"
  logo={<UploadIcon />}
  logoSize="sm"
  label="Uploading files..."
/>
```

### Custom Brand Experience

```tsx
<Spinner
  variant="glass"
  size="2xl"
  logo={
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
      <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        UI
      </span>
    </div>
  }
  logoSize="lg"
/>
```

## Benefits

✅ **Brand Identity** - Display your logo during loading states  
✅ **User Experience** - More engaging and professional loading screens  
✅ **Flexibility** - Works with images, icons, or custom components  
✅ **Responsive** - 5 size options ensure perfect fit  
✅ **Theme Aware** - Adapts to light/dark modes  
✅ **Performance** - Minimal overhead, CSS-based positioning  
✅ **Accessibility** - Maintains all ARIA attributes

## Build Status

✅ **Build Successful** - No errors or warnings  
✅ **Type Safety** - Full TypeScript coverage for new props  
✅ **Backward Compatible** - Existing usage unaffected

## Component Count

**Total Components: 30** with enhanced Spinner

The Spinner component is now even more versatile and professional! 🚀
