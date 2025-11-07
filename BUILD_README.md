# Saha UI - Build System Documentation

## Overview

This document explains the unified build system for Saha UI that compiles all components and the MCP server as ES modules with modern arrow functions to the `dist/` folder.

## Build Configuration

The project uses a unified build configuration that compiles:
- **React Components** - All UI components from `src/`
- **MCP Server** - Model Context Protocol server from `mcp/`
- **Type Definitions** - TypeScript declaration files

### Output Structure

```
dist/
├── components/          # All UI components
│   ├── Button/
│   │   ├── Button.js
│   │   ├── Button.d.ts
│   │   └── index.js
│   ├── Card/
│   └── ...
├── lib/                 # Utility functions
│   ├── utils.js
│   └── utils.d.ts
├── mcp/                 # MCP server
│   ├── server.js
│   └── server.d.ts
├── index.js             # Main entry point
├── index.d.ts           # Main type definitions
└── assets/              # CSS and other assets
```

## Build Scripts

### Main Build Command
```bash
npm run build
```
Builds everything (components + MCP) as ES modules with arrow functions.

### Individual Build Commands
```bash
npm run build:lib    # Build components only
npm run build:mcp    # Build MCP server only
npm run build:types  # Generate TypeScript declarations only
```

### Legacy Build
```bash
npm run build:legacy
```
Uses the old separate build configs (for backwards compatibility).

## Build Features

### ES2022 Modern Output
- **Arrow Functions** - All functions compiled as arrow functions
- **Const Bindings** - Uses `const` where possible
- **Object Shorthand** - Modern ES6+ syntax
- **Template Literals** - String interpolation

### Code Generation Options
```javascript
generatedCode: {
  arrowFunctions: true,      // () => {} instead of function() {}
  constBindings: true,       // const instead of var
  objectShorthand: true,     // { x } instead of { x: x }
  reservedNamesAsProps: false,
  symbols: true,             // Use Symbol where applicable
}
```

### Tree-Shaking & Optimization
- Aggressive tree-shaking for smaller bundles
- Side-effect detection for CSS files
- External dependencies not bundled
- Preserved module structure for better debugging

## Configuration Files

### `build.config.js`
Main unified build configuration with:
- ES module output format
- Arrow function generation
- Type declaration generation
- Source maps for debugging
- Preserved module structure

### `tsconfig.json`
TypeScript configuration optimized for:
- ES2022 target
- ESNext modules
- JSX React runtime
- Strict type checking

### `vite.build.config.ts`
Alternative TypeScript-based build config (same functionality as `build.config.js`).

## External Dependencies

The following dependencies are marked as external and not bundled:

### React Ecosystem
- `react`
- `react-dom`
- `react/jsx-runtime`

### UI Libraries
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `recharts`
- `monaco-editor`
- `@monaco-editor/react`
- `react-resizable-panels`

### MCP SDK
- `@modelcontextprotocol/sdk`

### Node.js Built-ins
- `fs`, `path`, `url`, `child_process`, `glob`

## Build Process

1. **Clean** - Empties the `dist/` folder
2. **Compile TypeScript** - Transforms TS/TSX to ES2022 JS
3. **Generate Types** - Creates `.d.ts` files
4. **Bundle CSS** - Processes and outputs stylesheets
5. **Create Source Maps** - For debugging
6. **Preserve Modules** - Maintains original file structure

## Customization

### Changing Target Version
Edit `build.config.js`:
```javascript
esbuild: {
  target: 'es2022', // Change to es2020, es2021, etc.
}
```

### Disabling Arrow Functions
Edit `build.config.js`:
```javascript
generatedCode: {
  arrowFunctions: false, // Use traditional functions
}
```

### Enabling Minification
Edit `build.config.js`:
```javascript
build: {
  minify: 'esbuild', // or 'terser'
}
```

## Verification

After building, verify the output:

```bash
# Check build output
ls -la dist/

# Verify MCP server
node dist/mcp/server.js

# Check types
tsc --noEmit --project tsconfig.json
```

## Troubleshooting

### Build Fails with Module Errors
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Missing Type Definitions
- Run: `npm run build:types`
- Check `tsconfig.json` includes correct paths

### MCP Server Not Working
- Verify Node.js version >= 18
- Check external dependencies are installed
- Run: `node --trace-warnings dist/mcp/server.js`

### Arrow Functions Not Generated
- Verify `esbuild.target` is set to `es2022` or higher
- Check `generatedCode.arrowFunctions` is `true`

## Performance Tips

1. **Parallel Builds** - Build lib and MCP separately in parallel
2. **Skip Source Maps** - Set `sourcemap: false` for production
3. **Enable Compression** - Use `reportCompressedSize: true`
4. **Cache Dependencies** - Keep `node_modules` cached in CI/CD

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Build Saha UI
  run: npm run build

- name: Verify Build
  run: |
    test -d dist
    test -f dist/index.js
    test -f dist/mcp/server.js
```

### NPM Publish
The build automatically runs before publishing:
```bash
npm publish
# Runs "prepublishOnly": "npm run build"
```

## Development vs Production

### Development
```bash
npm run dev
# Runs Vite dev server with HMR
```

### Production Build
```bash
npm run build
# Creates optimized ES modules in dist/
```

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [Rollup Configuration](https://rollupjs.org/configuration-options/)
- [ES2022 Features](https://2ality.com/2021/02/es2022.html)

## Version History

- **v1.14.0** - Unified build system with arrow functions
- **v1.13.0** - Separate component and MCP builds
- **v1.12.0** - Initial MCP integration

---

**Questions?** Open an issue on [GitHub](https://github.com/Xenial-Devil/Saha-ui/issues)