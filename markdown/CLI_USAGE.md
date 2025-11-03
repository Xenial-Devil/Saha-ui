# Saha UI CLI

## Installation

```bash
npm install saha-ui
# or
yarn add saha-ui
# or
pnpm add saha-ui
```

## Usage

### Initialize Saha UI in Your Project

After installing the package, run the init command to automatically add Saha UI styles to your project:

```bash
npx saha-ui init
```

### What the Init Command Does

The `init` command:

1. **Detects your project type** (Next.js, Vite, or React)
2. **Locates your global CSS file**:
   - **Next.js**: `app/globals.css`, `src/app/globals.css`, `styles/globals.css`, or `src/styles/globals.css`
   - **Vite**: `src/index.css`, `src/App.css`, or `index.css`
   - **React**: `src/index.css`, `src/App.css`, or `public/index.css`
3. **Adds the Saha UI CSS import** to the top of your CSS file

### Example Output

```bash
🎨 Initializing Saha UI...

📦 Detected Next.js project
✅ Successfully initialized Saha UI!
   Added CSS import to: app/globals.css

📝 Next steps:
   1. Import components: import { Button } from 'saha-ui'
   2. Use components in your app

🎉 You're all set! Happy coding!
```

### What Gets Added to Your CSS

The init command adds this import to the top of your global CSS file:

```css
/* Saha UI Styles */
@import "saha-ui/dist/index.css";
```

### Manual Setup (Alternative)

If you prefer to set up manually, simply add the import to your global CSS file:

```css
@import "saha-ui/dist/index.css";
```

## Using Components

After initialization, import and use components in your React app:

```tsx
import { Button, Badge, Card } from "saha-ui";

function App() {
  return (
    <div>
      <Card>
        <h1>Hello Saha UI</h1>
        <Button variant="primary">Click Me</Button>
        <Badge variant="success">New</Badge>
      </Card>
    </div>
  );
}
```

## Troubleshooting

### CSS File Not Found

If the init command can't find your CSS file, create one in the expected location:

**Next.js (App Router):**

```bash
mkdir -p app
touch app/globals.css
```

**Next.js (Pages Router):**

```bash
mkdir -p styles
touch styles/globals.css
```

**Vite/React:**

```bash
mkdir -p src
touch src/index.css
```

Then run `npx saha-ui init` again.

### Already Initialized

If you see the message "Saha UI CSS is already initialized", the CSS import has already been added to your project. No action needed!

### Permission Issues

If you encounter permission errors on Linux/Mac, try:

```bash
chmod +x node_modules/saha-ui/bin/cli.js
npx saha-ui init
```

## Support

For issues or questions:

- GitHub Issues: https://github.com/Xenial-Devil/Saha-ui/issues
- Documentation: https://github.com/Xenial-Devil/Saha-ui#readme
