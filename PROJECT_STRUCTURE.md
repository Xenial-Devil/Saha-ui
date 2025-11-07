# Saha UI Project Structure

## Root Level Organization

```
Saha-ui/
├── bin/                     # Executable scripts
│   ├── cli.js              # Main CLI tool (npx saha-ui)
│   └── mcp.js              # MCP server launcher (npx saha-ui-mcp)
│
├── mcp/                     # MCP Server (companion tool, like bin/)
│   └── server.ts           # MCP server implementation
│
├── src/                     # Library source code
│   ├── components/         # 73 React components
│   ├── hooks/              # 40+ custom React hooks
│   ├── lib/                # Utility functions
│   ├── assets/             # Static assets
│   ├── examples/           # Usage examples (dev only)
│   ├── index.ts            # Main library entry
│   └── index.css           # Global styles
│
├── dist/                    # Build output (generated)
│   ├── components/         # Built components
│   ├── hooks/              # Built hooks
│   ├── lib/                # Built utilities
│   ├── mcp/                # Built MCP server
│   │   └── server.js       # Compiled MCP server
│   └── index.js            # Main library bundle
│
├── docs/                    # Documentation
│   ├── MCP_SERVER.md       # MCP server full documentation
│   └── MCP_QUICK_REFERENCE.md  # MCP quick reference
│
├── vite.config.ts          # Main library build config
├── vite.mcp.config.ts      # MCP server build config
├── package.json            # Package metadata & dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Main documentation
```

## Why MCP at Root Level?

The MCP server is placed at root level (like `bin/`) because:

1. **Not Library Code**: It's not part of the React component library
2. **Companion Tool**: It's a separate utility, like the CLI
3. **Independent Build**: Builds separately from the library
4. **Clean Separation**: Keeps library source (`src/`) pure
5. **Similar to bin/**: Follows same pattern as other executables

## Build Process

### Library Build
```bash
npm run build:lib
# Uses vite.config.ts
# Compiles src/ → dist/
# Excludes examples, tests, etc.
```

### MCP Server Build
```bash
npm run build:mcp
# Uses vite.mcp.config.ts
# Compiles mcp/server.ts → dist/mcp/server.js
# Independent from library build
```

### Full Build
```bash
npm run build
# Runs both build:lib and build:mcp
```

## Published Package Structure

When published to npm, users get:

```
node_modules/saha-ui/
├── dist/                # Built library + MCP server
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── mcp/            # ✨ Built MCP server
│   │   └── server.js
│   └── index.js
├── bin/                 # Executable scripts
│   ├── cli.js
│   └── mcp.js          # ✨ MCP launcher
├── mcp/                 # ✨ MCP source (for reference)
│   └── server.ts
├── package.json
└── README.md
```

## Usage After Installation

### Use Library
```tsx
import { Button, Card } from 'saha-ui';
// Uses dist/index.js
```

### Use CLI
```bash
npx saha-ui init
# Runs bin/cli.js
```

### Use MCP Server
```bash
npx saha-ui-mcp
# Runs bin/mcp.js → dist/mcp/server.js
```

## Key Points

✅ **mcp/** is at root level (sibling to bin/ and src/)
✅ **mcp/** contains MCP server source code
✅ **bin/mcp.js** launches the built MCP server
✅ **dist/mcp/** contains the compiled MCP server
✅ **src/** only contains library code (components, hooks, lib)
✅ Library build ignores mcp/ (it's not in src/)
✅ MCP builds independently with its own config

---

**Clean, organized, and follows best practices!** ✨
