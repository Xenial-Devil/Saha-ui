# Relative Path Calculation Examples

## How the CLI Calculates Paths

The `npx saha-ui init` command now intelligently calculates the correct relative path from your CSS file to `node_modules`, ensuring it works correctly regardless of your project structure.

### Examples:

#### Example 1: React/Vite Project (CSS in `src/`)

**Project Structure:**

```
my-project/
├── src/
│   └── index.css          ← CSS file here
├── node_modules/
│   └── saha-ui/
├── tailwind.config.js      ← Config file here
└── package.json
```

**Result:**

**For `tailwind.config.js` (at root):**

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Relative path from root
  ],
};
```

**For `src/index.css` (Tailwind v4):**

```css
@import "tailwindcss" source("../node_modules/saha-ui/dist/**/*.js");
/* ☝️ One level up from src/ to reach node_modules */
```

---

#### Example 2: Next.js App Router (CSS in `app/`)

**Project Structure:**

```
my-nextjs/
├── app/
│   └── globals.css        ← CSS file here
├── node_modules/
│   └── saha-ui/
├── tailwind.config.ts     ← Config file here
└── package.json
```

**Result:**

**For `tailwind.config.ts` (at root):**

```typescript
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Relative path from root
  ],
};
```

**For `app/globals.css` (Tailwind v4):**

```css
@import "tailwindcss" source("../node_modules/saha-ui/dist/**/*.js");
/* ☝️ One level up from app/ to reach node_modules */
```

---

#### Example 3: Next.js with `src/app/` (Deeper nesting)

**Project Structure:**

```
my-nextjs/
├── src/
│   └── app/
│       └── globals.css    ← CSS file here
├── node_modules/
│   └── saha-ui/
├── tailwind.config.js     ← Config file here
└── package.json
```

**Result:**

**For `tailwind.config.js` (at root):**

```javascript
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Relative path from root
  ],
};
```

**For `src/app/globals.css` (Tailwind v4):**

```css
@import "tailwindcss" source("../../node_modules/saha-ui/dist/**/*.js");
/* ☝️ Two levels up from src/app/ to reach node_modules */
```

---

#### Example 4: Monorepo with Custom Structure

**Project Structure:**

```
monorepo/
├── apps/
│   └── web/
│       ├── styles/
│       │   └── main.css   ← CSS file here
│       ├── node_modules/
│       │   └── saha-ui/
│       ├── tailwind.config.js
│       └── package.json
```

**Result:**

**For `apps/web/tailwind.config.js`:**

```javascript
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Relative from config location
  ],
};
```

**For `apps/web/styles/main.css` (Tailwind v4):**

```css
@import "tailwindcss" source("../node_modules/saha-ui/dist/**/*.js");
/* ☝️ One level up from styles/ to reach node_modules */
```

---

## How It Works

### 1. **Tailwind Config (v3)**

The CLI:

1. Finds your `tailwind.config.js/ts/mjs/cjs`
2. Calculates relative path from config file to `node_modules`
3. Adds the path to the `content` array

```javascript
// Calculated automatically based on config file location
const relativePathToNodeModules = path.relative(
  path.dirname(configPath),
  path.join(process.cwd(), "node_modules")
);
```

### 2. **CSS File (Tailwind v4)**

The CLI:

1. Detects your CSS file location (`src/index.css`, `app/globals.css`, etc.)
2. Calculates relative path from CSS file to `node_modules`
3. Adds `@source` to the `@import "tailwindcss"` line

```javascript
// Calculated automatically based on CSS file location
const relativePathToNodeModules = path.relative(
  path.dirname(cssFilePath),
  path.join(process.cwd(), "node_modules")
);
```

### 3. **Cross-Platform Compatibility**

The CLI automatically converts Windows backslashes to forward slashes:

```javascript
// Windows: ..\node_modules → ../node_modules
// Unix:    ../node_modules → ../node_modules
relativePath = relativePath.replace(/\\/g, "/");
```

---

## Verification

After running `npx saha-ui init`, verify the paths:

### For Tailwind v3:

```bash
# Check your tailwind.config file
cat tailwind.config.js
# Should show correct relative path to node_modules
```

### For Tailwind v4:

```bash
# Check your CSS file
cat src/index.css  # or app/globals.css
# Should show @import with correct @source path
```

### Test Build:

```bash
npm run build
# Should compile without errors
# Tailwind should generate classes from saha-ui components
```

---

## Troubleshooting Paths

If paths don't work:

1. **Check the path format:**

   - ✅ `../node_modules/saha-ui/dist/**/*.js` (forward slashes)
   - ❌ `..\\node_modules\\saha-ui\\dist\\**\\*.js` (backslashes)

2. **Count the `../` correctly:**

   - `src/index.css` → `../node_modules` (1 level up)
   - `src/app/globals.css` → `../../node_modules` (2 levels up)
   - `tailwind.config.js` (at root) → `./node_modules` (same level)

3. **Verify node_modules location:**

   ```bash
   ls node_modules/saha-ui
   # Should show the installed package
   ```

4. **Re-run the CLI:**
   ```bash
   npx saha-ui init
   # CLI will detect if paths are already correct
   ```

---

## Manual Override

If the CLI fails to auto-detect, you can manually set the paths:

### Tailwind v3 (`tailwind.config.js`):

```javascript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // Adjust path as needed
  ],
};
```

### Tailwind v4 (CSS file):

```css
@import "tailwindcss" source("../node_modules/saha-ui/dist/**/*.js");
/* Adjust ../ count based on your file location */
```

---

**The CLI handles all this automatically!** Just run `npx saha-ui init` and it will calculate the correct paths for your project structure. 🚀
