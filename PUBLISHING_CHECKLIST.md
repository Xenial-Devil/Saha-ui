# 📋 NPM Publishing Checklist

Use this checklist before publishing to ensure everything is ready.

---

## ✅ Pre-Publish Checklist

### Package Configuration

- [x] `package.json` has correct version (1.0.0)
- [x] `package.json` has proper entry points (main, module, types, exports)
- [x] `package.json` "files" field includes only dist/, README.md, LICENSE
- [x] Peer dependencies declared (react, react-dom)
- [x] Keywords added for discoverability
- [x] Repository URL configured
- [x] License set to MIT

### Build Configuration

- [x] `vite.config.ts` configured for library mode
- [x] `tsconfig.json` generates declaration files
- [x] `vite-plugin-dts` installed and configured
- [x] Build excludes demo files (App.tsx, main.tsx, etc.)
- [x] `copyPublicDir: false` to exclude public assets

### Files & Documentation

- [x] `.npmignore` created to exclude source files
- [x] `README.md` updated with professional documentation
- [x] `LICENSE` file exists (MIT)
- [x] `PUBLISHING.md` guide created
- [x] `INSTALLATION.md` guide created
- [x] `NPM_PACKAGE_SUMMARY.md` created
- [x] `QUICK_START_PUBLISH.md` created

### Build Verification

- [ ] Run `npm run build` successfully
- [ ] Check `dist/` folder exists
- [ ] Verify `dist/index.d.ts` contains type declarations
- [ ] Verify `dist/saha-ui.es.js` exists
- [ ] Verify `dist/saha-ui.umd.js` exists
- [ ] Verify `dist/saha-ui.css` exists
- [ ] Check source maps (`.map` files) exist
- [ ] No `vite.svg` or other unwanted files in dist/

### Package Testing

- [ ] Run `npm pack --dry-run` to preview package contents
- [ ] Verify only 9 files in package
- [ ] Verify total size is ~756 KB unpacked, ~156 KB gzipped
- [ ] Create tarball: `npm pack`
- [ ] Test installation in another project from tarball
- [ ] Import and use components from tarball package
- [ ] Verify CSS imports work
- [ ] Verify TypeScript types work

### NPM Account

- [ ] Have npm account (create at npmjs.com/signup)
- [ ] Email verified on npm account
- [ ] Run `npm login`
- [ ] Verify login with `npm whoami`

### Version Control

- [ ] All changes committed to Git
- [ ] Working directory is clean
- [ ] On correct branch (main/master)
- [ ] Update `CHANGELOG.md` with version notes

---

## 🚀 Publishing Steps

### 1. Final Build

```bash
npm run build
```

### 2. Test Package

```bash
npm pack --dry-run
```

### 3. Update Version (if needed)

```bash
# Choose one:
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

### 4. Publish

```bash
# First time
npm publish --access public

# Subsequent updates
npm publish
```

### 5. Post-Publish

- [ ] Verify package at `https://www.npmjs.com/package/saha-ui`
- [ ] Create Git tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Test installation: `npm install saha-ui`
- [ ] Update GitHub release notes
- [ ] Share on social media

---

## 🧪 Testing After Publish

### Create Test Project

```bash
mkdir test-saha-ui
cd test-saha-ui
npm init -y
npm install react react-dom saha-ui
```

### Create Test Component

```tsx
// App.tsx
import { Button, Card, Avatar } from "saha-ui";
import type { ButtonVariant } from "saha-ui";
import "saha-ui/dist/style.css";

function App() {
  return (
    <Card variant="glass" padding="lg">
      <Avatar src="/user.jpg" size="lg" status="online" />
      <Button variant="primary">Hello Saha UI!</Button>
    </Card>
  );
}

export default App;
```

### Verify

- [ ] No TypeScript errors
- [ ] Components render correctly
- [ ] Styles apply properly
- [ ] Dark mode works (if using ThemeProvider)
- [ ] All imports resolve correctly

---

## 🔄 Updating After Publish

### For Bug Fixes (Patch)

1. Fix the bug in source code
2. Run `npm run build`
3. Update version: `npm version patch`
4. Publish: `npm publish`

### For New Features (Minor)

1. Implement new feature
2. Update documentation
3. Run `npm run build`
4. Update version: `npm version minor`
5. Publish: `npm publish`

### For Breaking Changes (Major)

1. Implement breaking change
2. Update documentation with migration guide
3. Run `npm run build`
4. Update version: `npm version major`
5. Publish: `npm publish`

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear and rebuild
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors

- Check `tsconfig.json` has `declaration: true`
- Verify `vite-plugin-dts` is installed
- Check no `.tsx` extensions in imports in library code

### Package Too Large

- Verify `.npmignore` excludes source files
- Check `package.json` "files" only includes dist/
- Run `npm pack --dry-run` to see what's included

### Import Errors in Consumer Projects

- Ensure proper `exports` in `package.json`
- Check `types` is first in exports
- Verify `index.d.ts` is in dist/

---

## 📊 Success Metrics

After publishing, monitor:

- [ ] npm download count
- [ ] GitHub stars
- [ ] Issues/bug reports
- [ ] Community feedback
- [ ] Type definition accuracy

---

## 🎯 Quick Commands Reference

| Task                  | Command                         |
| --------------------- | ------------------------------- |
| Install dependencies  | `npm install`                   |
| Build library         | `npm run build`                 |
| Preview package       | `npm pack --dry-run`            |
| Create tarball        | `npm pack`                      |
| Login to npm          | `npm login`                     |
| Check who's logged in | `npm whoami`                    |
| Patch version         | `npm version patch`             |
| Minor version         | `npm version minor`             |
| Major version         | `npm version major`             |
| Publish (first time)  | `npm publish --access public`   |
| Publish (update)      | `npm publish`                   |
| Unpublish (emergency) | `npm unpublish saha-ui@version` |
| View package info     | `npm info saha-ui`              |

---

## ✅ Final Verification

Before clicking "publish":

- [ ] Package builds without errors
- [ ] All tests pass (if you have tests)
- [ ] Documentation is complete
- [ ] Version number is correct
- [ ] Changelog is updated
- [ ] You're logged into npm
- [ ] You've tested the package locally
- [ ] You're ready to support users

---

**Ready?** Run: `npm publish --access public` 🚀

Good luck! 🎉
