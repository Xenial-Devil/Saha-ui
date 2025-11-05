# CSS Distribution Solution for saha-ui

## Problem

When installing `saha-ui` from npm, the Tailwind CSS classes used in library components don't work in consuming projects. This happens because:

1. **Tailwind doesn't scan node_modules by default** - The consuming project's Tailwind configuration doesn't include `node_modules/saha-ui` in its content paths
2. **JIT compilation misses library classes** - Even though CSS variables are injected, the actual utility classes (e.g., `bg-primary`, `rounded-lg`, `flex`) are never generated

## Solution

The `npx saha-ui init` command now automatically:

### 1. **Injects CSS Variables** (Already Working)

- Adds all design tokens (colors, spacing, etc.) to your CSS file
- Supports both Tailwind v3 and v4
- Preserves existing Tailwind imports

### 2. **Updates Tailwind Content Configuration** (NEW - Fixed!)

#### For Tailwind v3:

Automatically adds to your `tailwind.config.js`:

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Auto-added by CLI
  ],
  // ... rest of config
};
```

#### For Tailwind v4:

Instructions provided to add content configuration via CSS:

```css
@import "tailwindcss" source("./src/**/*.{js,jsx,ts,tsx}") source(
    "./node_modules/saha-ui/dist/**/*.js"
  );
```

Or use `@config` with PostCSS setup.

## How It Works

### Automatic Setup (Recommended)

Run in your project:

```bash
npx saha-ui init
```

The CLI will:

1. ✅ Detect your Tailwind version (v3 or v4)
2. ✅ Install saha-ui and its dependencies
3. ✅ Inject CSS variables into your CSS file
4. ✅ **Automatically update your Tailwind config to scan saha-ui components**
5. ✅ Provide manual instructions for theme customization if needed

### Manual Setup (If CLI Doesn't Work)

#### Tailwind v3 Projects:

1. **Add to `tailwind.config.js`:**

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // Required!
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... other color tokens
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ... other theme extensions
    },
  },
};
```

2. **Add CSS variables to your CSS file** (run `npx saha-ui init` to auto-inject)

#### Tailwind v4 Projects:

1. **Update your CSS import:**

```css
@import "tailwindcss" source("./src/**/*.{js,jsx,ts,tsx}") source(
    "./node_modules/saha-ui/dist/**/*.js"
  );
```

Or with PostCSS setup in `tailwind.config.js`:

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js",
  ],
};
```

2. **Add CSS variables** (run `npx saha-ui init` to auto-inject)

## Verification

After setup, verify everything works:

```bash
# Build your project
npm run build

# Check that Tailwind generates classes for saha-ui components
# You should see no console errors about missing styles
npm run dev
```

### Test Component

```tsx
import { Button } from "saha-ui";

export default function Test() {
  return <Button variant="default">Test Button</Button>;
}
```

If the button appears styled correctly, everything is working! ✅

## Troubleshooting

### Classes Still Not Working?

1. **Clear build cache:**

```bash
rm -rf node_modules/.vite  # For Vite
rm -rf .next              # For Next.js
npm run build
```

2. **Verify Tailwind config:**
   Check that `node_modules/saha-ui/dist/**/*.js` is in your content array

3. **Check CSS import:**
   Ensure your CSS file is imported in your app entry point:

- React: `src/main.tsx` → `import './index.css'`
- Next.js: `app/layout.tsx` → `import './globals.css'`

4. **Restart dev server:**

```bash
npm run dev
```

### For TypeScript Projects

If you see TypeScript errors, ensure you have proper type declarations:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["node"]
  }
}
```

## Benefits of This Approach

✅ **No Pre-compiled CSS** - Uses Tailwind JIT for optimal bundle size  
✅ **Tree-shakeable** - Only includes classes you actually use  
✅ **Customizable** - Full control over theme via CSS variables  
✅ **Framework Agnostic** - Works with React, Next.js, Vite, etc.  
✅ **Type Safe** - Full TypeScript support with exported types  
✅ **Server Components** - 15 components are server-compatible

## Alternative Approaches (Not Recommended)

### 1. Pre-compiled CSS Bundle

❌ Larger bundle size (includes all classes)  
❌ No tree-shaking  
❌ Duplicate styles if consuming project also uses Tailwind

### 2. CSS-in-JS

❌ Runtime performance overhead  
❌ No SSR optimization  
❌ Harder to customize

### 3. Safelist Configuration

❌ Manual maintenance required  
❌ Includes unused classes  
❌ Increases bundle size

## Summary

The **content path configuration** is the recommended approach because it:

- Leverages Tailwind's JIT compiler
- Provides optimal bundle sizes
- Maintains full customization
- Works seamlessly with modern build tools
- Requires zero runtime overhead

Run `npx saha-ui init` and you're ready to go! 🚀
