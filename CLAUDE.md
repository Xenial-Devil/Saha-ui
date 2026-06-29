# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`saha-ui` is a publishable React component library (npm package, 120+ components, 39 hooks) built with TypeScript, Tailwind CSS v4, OKLCH colors, and CVA. It ships three things from one repo:

1. The component library (`src/` → `dist/`).
2. An **MCP server** (`mcp/server.ts`) that exposes the library's components/hooks/docs to AI assistants.
3. A **CLI** (`bin/cli.js`) run via `npx saha-ui init` in consumer projects to inject CSS tokens and wire up Tailwind.

The Vite dev server (`src/main.tsx`, `src/App.tsx`, `index.html`) exists only as an internal playground for developing components — it is not shipped.

## Commands

```bash
npm run dev          # Vite playground on port 7877 (component dev sandbox)
npm run build        # Build the library to dist/ (uses vite.config.ts)
npm run build:mcp    # Build only the MCP server (vite.mcp.config.ts)
npm run build:all    # Build library + MCP server
npm run build:types  # Emit .d.ts only (tsc --emitDeclarationOnly)
npm run lint         # eslint, --max-warnings 0
```

MCP testing/dev:

```bash
npm run test:mcp     # node mcp/test-dynamic-features.js
npm run mcp:client   # node test-client.js   (exercises the server over stdio)
npm run mcp:demo     # node demo-mcp.js
```

**Tests:** there is no unit-test runner wired up (no jest/vitest). `testsprite_tests/` contains Python Playwright-style E2E scripts run by an external TestSprite harness, not via npm. Do not assume `npm test` exists.

`npm run build` runs automatically on `prepublishOnly`. Release versioning is handled by semantic-release (`.releaserc.json`).

## Build architecture (important)

- **`vite.config.ts` is the active build config** used by `npm run build`. `build.config.js` in the root is an alternate/legacy config that also bundles the MCP server — `npm run build` does NOT use it. When changing build behavior, edit `vite.config.ts`.
- The build is a **multi-entry, `preserveModules` ES-only library**: every non-test `.ts`/`.tsx` file under `src/` becomes its own entry (via a `glob.sync` in the rollup `input`), so the `dist/` tree mirrors `src/` and consumers can deep-import `saha-ui/components/Button`.
- `*.types.ts` files are excluded from JS entries (types only) but `.d.ts` is still emitted by `vite-plugin-dts`.
- All peer/heavy deps are marked **external** (react, recharts + its d3 deps, monaco, lucide-react, `@modelcontextprotocol/sdk`, etc.) — they are never bundled. If you add a dependency that should not be bundled into `dist/`, add it to the `external` array in `vite.config.ts`.
- `optionalDependencies` (monaco, lucide-react, MCP SDK) are optional on purpose — components using them must degrade gracefully when absent.

## Component conventions

Every component lives in `src/components/<Name>/` and follows a strict 3–4 file pattern:

- `index.tsx` — the component implementation + `export { Component }` and a default export.
- `<Name>.styles.ts` — all visual variants defined with **CVA** (`cva(...)`), exported as `<name>Variants`.
- `<Name>.types.ts` — prop types and exported variant union types.
- `README.md` — per-component docs (optional but common).

Patterns used throughout (see `src/components/Button/` as the canonical example):

- `React.forwardRef` for all components; set `displayName`.
- `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) to merge classes — always use it, never string-concat classNames.
- **`asChild` prop** uses the custom `Slot` from `src/lib/Slot.tsx` (Radix-style polymorphism) — there is no `@radix-ui` dependency despite docs mentioning "Radix primitives".
- Standard size scale across components: `xs, sm, md, lg, xl, 2xl, 3xl, 4xl` (+ `icon` where relevant). Default size is `md`.
- Variants reference semantic color tokens (`bg-primary`, `text-foreground`, etc.), never raw colors.

### Adding/exposing a component

`src/index.ts` is a **1750-line manual barrel file** — it is the public API. A new component is not exported until you add its export block there (component, its `*Variants`, and its `type`s), mirroring the existing entries. There are helper scripts in `scripts/` (`find-missing-exports.cjs`, `add-missing-exports.cjs`) to detect components missing from the barrel.

## Theming system

- Colors are **OKLCH** CSS custom properties (`--primary`, `--background`, `--glass-*`, `--chart-*`, etc.) defined for `:root` and `.dark`. The canonical token set lives in `src/index.css` and is duplicated as JS constants inside `bin/cli.js` (`SAHA_UI_ROOT_VARIABLES`, `SAHA_UI_DARK_VARIABLES`, `SAHA_UI_KEYFRAMES`) — **if you change a token, update both places.**
- `tailwind.config.js` maps these CSS vars to Tailwind color names so `bg-primary` etc. resolve.
- Dark mode is class-based (`.dark` + `@custom-variant dark`). `ThemeProvider`/`useTheme` (`src/components/ThemeProvider`) manage it; `NextThemeProvider` is the Next.js variant.
- "Glass morphism" = the `.glass*` utility classes + `--glass-*` tokens.

## CLI (`bin/cli.js`)

Run by consumers as `npx saha-ui init`. It detects React vs Next.js and Tailwind v3 vs v4 from the consumer's `package.json`, finds their global CSS file, and **merges** (not overwrites) Saha UI's CSS variables, keyframes, and `@layer` blocks using a hand-rolled brace-matching CSS parser. It creates timestamped backups before writing and supports `--dry`/`-n` and `--no-backup`. When editing token defaults, keep the constants near the top of this file in sync with `src/index.css`.

## MCP server (`mcp/server.ts`)

Stdio MCP server (`@modelcontextprotocol/sdk`) that reads component/hook source and docs at runtime to answer AI queries (list components, get props, search, generate examples). It resolves its root differently depending on whether it runs from `dist/` or source (`SAHA_UI_ROOT` logic at the top). Launched in consumer installs via `bin/mcp.js` → `dist/mcp/server.js`. Build it with `npm run build:mcp`.

## Conventions / gotchas

- ESLint is intentionally lenient for this existing codebase: `no-explicit-any` is off, hooks rules are `warn`, unused vars allowed when prefixed `_`. But `npm run lint` uses `--max-warnings 0`, so warnings still fail CI — fix or `_`-prefix them.
- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters`/`noImplicitReturns` on.
- Output targets `ES2022`, ESM only (`"type": "module"`). No CJS build despite the `require` field in `exports` pointing at the ESM file.
- The many root-level `*.md` files (`AI_QUICK_REFERENCE.md`, `COMPONENT_REFORMAT_GUIDE.md`, etc.), `COMPONENTS_LIST.txt`, and `ComponentAi list.txt` are documentation/status artifacts consumed by AI tooling — not build inputs.
