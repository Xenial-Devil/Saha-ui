# Saha UI - Troubleshooting Guide

## Common Issues and Solutions

### 🎨 Components Have No Styles / CSS Classes Not Working

**Symptoms:**

- Components render but have no styling
- Tailwind classes from Saha UI don't appear
- Console shows no errors, but components look unstyled

**Solution:**

This is the most common issue! It happens because Tailwind doesn't scan `node_modules` by default.

**Quick Fix:**

```bash
npx saha-ui init
```

This command will automatically:

1. Inject CSS variables into your CSS file
2. Update your Tailwind config to include `node_modules/saha-ui/dist/**/*.js` in content paths
3. Install missing dependencies

**Manual Fix (if CLI doesn't work):**

For **Tailwind v3**, add to `tailwind.config.js`:

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Add this line!
  ],
  // ... rest of config
};
```

For **Tailwind v4**, update your CSS import:

```css
@import "tailwindcss" source("./src/**/*.{js,jsx,ts,tsx}") source(
    "./node_modules/saha-ui/dist/**/*.js"
  );
```

Then restart your dev server:

```bash
npm run dev
```

---

### ⚛️ "use client" Directive Warning in Next.js

**Symptoms:**

- Warning: "You're importing a component that needs useState/useEffect..."
- Error: "Server Components cannot use hooks"

**Solution:**

This is expected! Saha UI components are already marked with `"use client"` where needed.

- **55 components** use `"use client"` (interactive components)
- **15 components** are server-compatible (Button, Typography, etc.)

If you still see warnings, ensure you're using the correct import:

```tsx
// ✅ Correct - imports client component properly
import { Button } from "saha-ui";

// ❌ Avoid - don't re-export from server components
// In server component:
export { Button } from "saha-ui"; // This will fail!
```

---

### 📦 Module Not Found / Import Errors

**Symptoms:**

- `Cannot find module 'saha-ui'`
- `Module not found: Can't resolve 'saha-ui/components/Button'`

**Solution:**

1. **Ensure saha-ui is installed:**

```bash
npm install saha-ui
```

2. **Clear node_modules and reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Use correct import paths:**

```tsx
// ✅ Main entry
import { Button } from "saha-ui";

// ✅ Direct component import
import { Button } from "saha-ui/components/Button";

// ❌ Wrong - no /src/
import { Button } from "saha-ui/src/components/Button";
```

---

### 🎨 Custom Themes / Colors Not Working

**Symptoms:**

- CSS variables like `--primary` don't apply
- Custom theme colors don't show

**Solution:**

1. **Ensure CSS variables are injected:**
   Run `npx saha-ui init` to inject all design tokens.

2. **Verify CSS import in your app:**

For React/Vite:

```tsx
// src/main.tsx
import "./index.css"; // ← Make sure this exists!
```

For Next.js:

```tsx
// app/layout.tsx
import "./globals.css"; // ← Make sure this exists!
```

3. **Check for CSS variable conflicts:**
   If you have existing `--primary` variables, they might conflict. Saha UI uses:

```css
--primary: oklch(48.151% 0.23085 269.463);
--primary-foreground: oklch(1 0 0);
```

---

### 🌓 Dark Mode Not Working

**Symptoms:**

- Dark mode toggle doesn't work
- Components stay in light mode
- `.dark` class not applying

**Solution:**

1. **Wrap app with ThemeProvider:**

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return <ThemeProvider>{/* Your app */}</ThemeProvider>;
}
```

2. **Ensure Tailwind darkMode is configured:**

For Tailwind v3 (`tailwind.config.js`):

```javascript
export default {
  darkMode: "class", // ← Required!
  // ... rest of config
};
```

For Tailwind v4 (in CSS):

```css
@custom-variant dark (&:is(.dark *));
```

3. **Use ThemeToggle component:**

```tsx
import { ThemeToggle } from "saha-ui";

<ThemeToggle />;
```

---

### 💥 Build Errors / TypeScript Errors

**Symptoms:**

- Build fails with TypeScript errors
- `Type 'X' is not assignable to type 'Y'`

**Solution:**

1. **Update TypeScript config:**

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"
    "jsx": "react-jsx",
    "types": ["node"]
  }
}
```

2. **Ensure peer dependencies are installed:**

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

3. **Clear build cache:**

```bash
# For Vite
rm -rf node_modules/.vite

# For Next.js
rm -rf .next

# Rebuild
npm run build
```

---

### 🔄 Hot Reload / HMR Not Working

**Symptoms:**

- Changes to Saha UI components don't reflect
- Need to restart dev server for changes

**Solution:**

1. **Clear build cache:**

```bash
rm -rf node_modules/.vite
rm -rf .next
npm run dev
```

2. **For local development (linking):**
   If you're developing Saha UI locally and linking it:

```bash
# In saha-ui repo
npm run build
npm link

# In your project
npm link saha-ui
```

Make sure to rebuild Saha UI after changes!

---

### 📱 Components Not Responsive

**Symptoms:**

- Components don't adapt to screen size
- Mobile view looks broken

**Solution:**

Saha UI uses Tailwind's responsive utilities. Ensure:

1. **Viewport meta tag is present:**

```html
<!-- In index.html or app layout -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. **Use responsive props where available:**

```tsx
<Button size={{ base: "sm", md: "md", lg: "lg" }}>Responsive Button</Button>
```

---

### 🖼️ Icons Not Showing (Lucide Icons)

**Symptoms:**

- Link component shows no icons
- ThemeToggle shows no sun/moon icons

**Solution:**

Lucide Icons are **optional** dependencies. Install them:

```bash
npm install lucide-react
```

If you don't want icons:

```tsx
// Use Button instead of Link
<Button as="a" href="/page">Link</Button>

// Custom theme toggle
<button onClick={toggleTheme}>Toggle</button>
```

---

### ⚡ Performance Issues / Large Bundle Size

**Symptoms:**

- Build size is too large
- Slow page loads

**Solution:**

1. **Use direct component imports:**

```tsx
// ✅ Better tree-shaking
import { Button } from "saha-ui/components/Button";
import { Card } from "saha-ui/components/Card";

// ❌ Imports everything
import * as SahaUI from "saha-ui";
```

2. **Verify Vite/Webpack is tree-shaking:**
   Check your build output - unused components should be excluded.

3. **Lazy load heavy components:**

```tsx
const DataTable = lazy(() => import("saha-ui/components/DataTable"));
const Chart = lazy(() => import("saha-ui/components/Chart"));
```

---

### 🔧 Customization / Extending Components

**Question:** How do I customize component styles?

**Solution:**

**Method 1: CVA Variants (Recommended)**

```tsx
import { Button, buttonVariants } from "saha-ui";
import { cva } from "class-variance-authority";

// Extend existing variants
const customButtonVariants = cva(buttonVariants.base, {
  variants: {
    ...buttonVariants.variants,
    size: {
      ...buttonVariants.variants.size,
      xl: "text-xl px-8 py-4", // Add new size
    },
  },
});
```

**Method 2: Tailwind Classes**

```tsx
<Button className="custom-class hover:custom-hover">Custom Styled</Button>
```

**Method 3: CSS Variables**

```css
:root {
  --primary: oklch(0.7 0.25 150); /* Custom green */
}
```

---

### 🧪 Testing with Jest / Vitest

**Symptoms:**

- Tests fail with import errors
- `Cannot use import statement outside a module`

**Solution:**

1. **Configure test environment:**

```javascript
// vitest.config.ts
export default {
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
};
```

2. **Mock Saha UI if needed:**

```tsx
// test/setup.ts
vi.mock("saha-ui", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  // ... mock other components
}));
```

---

### 🆘 Still Having Issues?

1. **Check existing issues:** [GitHub Issues](https://github.com/Xenial-Devil/Saha-ui/issues)
2. **Read full documentation:** [CSS_DISTRIBUTION_SOLUTION.md](./CSS_DISTRIBUTION_SOLUTION.md)
3. **Open a new issue:** Include:
   - Saha UI version
   - React/Next.js version
   - Tailwind version
   - Error messages
   - Minimal reproduction code

---

## Quick Checklist

Before opening an issue, verify:

- [ ] Ran `npx saha-ui init`
- [ ] `node_modules/saha-ui/dist/**/*.js` in Tailwind content config
- [ ] CSS file is imported in app entry point
- [ ] Peer dependencies installed (React 18/19)
- [ ] Dev server restarted after config changes
- [ ] Build cache cleared (`rm -rf node_modules/.vite` or `.next`)
- [ ] Using correct import paths
- [ ] ThemeProvider wraps the app (for theme-dependent components)

If all checked and still not working, open an issue! 🐛
