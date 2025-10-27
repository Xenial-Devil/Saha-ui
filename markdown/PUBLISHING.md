# Publishing Guide for Saha UI

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **npm Login**: Login to npm from your terminal
   ```bash
   npm login
   ```

## Publishing Steps

### 1. Build the Library

```bash
npm run build
```

This will:

- Compile TypeScript to JavaScript (ES and UMD formats)
- Generate `.d.ts` type declaration files
- Bundle CSS styles
- Create sourcemaps
- Output everything to the `dist/` folder

### 2. Verify Build Output

Check the `dist/` folder contains:

- `saha-ui.es.js` - ES Module bundle
- `saha-ui.umd.js` - UMD bundle
- `index.d.ts` - Main type declarations
- `*.d.ts` - Component type declarations
- `style.css` - Compiled styles
- Sourcemap files

### 3. Test Locally (Optional but Recommended)

Test your package locally before publishing:

```bash
# In saha-ui directory
npm pack
```

This creates a `.tgz` file. In another project:

```bash
npm install /path/to/saha-ui-1.0.0.tgz
```

### 4. Update Version

Before publishing, update the version in `package.json`:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

### 5. Publish to npm

```bash
# First time - public package
npm publish --access public

# Subsequent updates
npm publish
```

## What Gets Published

Only these files/folders are included (defined in `package.json` "files"):

- ✅ `dist/` - All compiled files and types
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - License file

**Excluded** (via `.npmignore`):

- ❌ `src/` - Source files
- ❌ `node_modules/`
- ❌ Config files (tsconfig, vite.config, etc.)
- ❌ Demo files (index.html, App.tsx, etc.)
- ❌ Documentation files (except README.md)

## Package Structure

After publishing, users can install with:

```bash
npm install saha-ui
```

And import like:

```typescript
// Named imports
import { Button, Card, Avatar } from "saha-ui";
import type { ButtonVariant, CardProps } from "saha-ui";

// CSS (required)
import "saha-ui/dist/style.css";
```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features, backwards compatible
- **PATCH** (0.0.x): Bug fixes, backwards compatible

## Publishing Checklist

- [ ] Run `npm run build` successfully
- [ ] Check `dist/` folder contains all files
- [ ] Verify type declarations (`index.d.ts`) exist
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with changes
- [ ] Test locally with `npm pack`
- [ ] Commit all changes
- [ ] Login to npm: `npm login`
- [ ] Publish: `npm publish --access public`
- [ ] Create Git tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`

## Unpublishing (Emergency Only)

⚠️ **Warning**: Only unpublish within 72 hours and if package has no dependents.

```bash
npm unpublish saha-ui@1.0.0
```

## Updating After Publish

1. Make changes
2. Build: `npm run build`
3. Update version: `npm version patch|minor|major`
4. Publish: `npm publish`

## Troubleshooting

### "You must verify your email"

- Go to npmjs.com and verify your email

### "Package name already exists"

- Choose a different package name in `package.json`
- Or publish as scoped package: `@yourusername/saha-ui`

### "Permission denied"

- Run `npm login` and verify credentials
- Check package name ownership

### Build Errors

- Clear dist: `rm -rf dist`
- Reinstall dependencies: `npm ci`
- Rebuild: `npm run build`

## Package.json Entry Points

The package exports:

- **Main (UMD)**: `dist/saha-ui.umd.js`
- **Module (ESM)**: `dist/saha-ui.es.js`
- **Types**: `dist/index.d.ts`
- **CSS**: `dist/style.css`

This ensures compatibility with:

- ✅ Webpack
- ✅ Vite
- ✅ Rollup
- ✅ Next.js
- ✅ Create React App
- ✅ TypeScript projects

## Support

For issues or questions:

- [GitHub Issues](https://github.com/Xenial-Devil/Saha-ui/issues)
- [npm Package](https://www.npmjs.com/package/saha-ui)
