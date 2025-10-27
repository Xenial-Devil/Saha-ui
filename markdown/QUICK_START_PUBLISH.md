# 🚀 Quick Start - Publishing to NPM

## Prerequisites

✅ You have an npm account (create at [npmjs.com/signup](https://www.npmjs.com/signup))  
✅ Package is built and ready (`dist/` folder exists)  
✅ All changes are committed to Git

---

## Step-by-Step Publishing

### 1. Login to npm

```bash
npm login
```

Enter your credentials when prompted.

Verify login:

```bash
npm whoami
```

### 2. Build the Package

```bash
npm run build
```

✅ This generates:

- `dist/index.d.ts` - TypeScript types
- `dist/saha-ui.es.js` - ES Module
- `dist/saha-ui.umd.js` - UMD Module
- `dist/saha-ui.css` - Styles
- Source maps

### 3. Test Package Contents

```bash
npm pack --dry-run
```

✅ Verify output shows:

- 9 files total
- ~756 KB unpacked
- Includes: dist/, README.md, LICENSE, package.json
- Excludes: src/, node_modules/, config files

### 4. Publish to npm

**First time:**

```bash
npm publish --access public
```

**Subsequent updates:**

```bash
# Update version first
npm version patch  # 1.0.0 → 1.0.1

# Then publish
npm publish
```

### 5. Verify Publication

Visit: `https://www.npmjs.com/package/saha-ui`

---

## Version Management

```bash
# Patch release (bug fixes): 1.0.0 → 1.0.1
npm version patch

# Minor release (new features): 1.0.0 → 1.1.0
npm version minor

# Major release (breaking changes): 1.0.0 → 2.0.0
npm version major
```

---

## After Publishing

### Create Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Update Changelog

Add version notes to `CHANGELOG.md`

### Test Installation

In a new project:

```bash
npm install saha-ui
```

```tsx
import { Button } from "saha-ui";
import "saha-ui/dist/style.css";

function App() {
  return <Button variant="primary">Hello!</Button>;
}
```

---

## Quick Reference

| Action               | Command                           |
| -------------------- | --------------------------------- |
| Build                | `npm run build`                   |
| Test package         | `npm pack --dry-run`              |
| Login to npm         | `npm login`                       |
| Check login          | `npm whoami`                      |
| Publish (first time) | `npm publish --access public`     |
| Publish (update)     | `npm publish`                     |
| Update version       | `npm version patch\|minor\|major` |

---

## Troubleshooting

**"You must verify your email"**
→ Visit npmjs.com and verify your email

**"Package name already exists"**
→ Change name in `package.json` or use scoped package: `@username/saha-ui`

**"Permission denied"**
→ Run `npm login` again

**Build fails**
→ Delete `dist/` and `node_modules/`, then:

```bash
npm install
npm run build
```

---

## What Users Get

When someone runs `npm install saha-ui`, they get:

✅ **11 Components**: Button, Card, Alert, Accordion, Avatar, AvatarGroup, Tooltip, Link, List, Image, Carousel  
✅ **Theme System**: ThemeProvider, ThemeToggle, useTheme  
✅ **TypeScript Types**: Full type definitions  
✅ **Utilities**: cn() for className merging  
✅ **Styles**: Compiled Tailwind CSS with OKLCH colors  
✅ **Documentation**: Comprehensive README

---

## Support

📚 [Full Publishing Guide](./PUBLISHING.md)  
📦 [Installation Guide](./INSTALLATION.md)  
📖 [Package Summary](./NPM_PACKAGE_SUMMARY.md)  
🐛 [GitHub Issues](https://github.com/Xenial-Devil/Saha-ui/issues)

---

**Ready to publish?** Run: `npm publish --access public` 🚀
