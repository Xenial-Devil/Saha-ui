#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const R = process.cwd();
const a = process.argv.slice(2);
const c = a[ 0 ] || "init";

// Helpers
const rd = (f) => fs.readFileSync(f, "utf8");
const wr = (f, s) => {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s, "utf8");
};
const fE = (f) => fs.existsSync(f) && fs.statSync(f).isFile();
const dE = (d) => fs.existsSync(d) && fs.statSync(d).isDirectory();

// package.json
const P = (() => {
  try {
    return JSON.parse(rd(path.join(R, "package.json")));
  } catch {
    return {};
  }
})();
const D = { ...(P.dependencies || {}), ...(P.devDependencies || {}) };
const F = D.next ? "next" : "react";

// ----------------------------------------------
// Tailwind detection from package.json only
// ----------------------------------------------
const TAILWIND_CONFIG_FILES = [
  "tailwind.config.js",
  "tailwind.config.ts",
  "tailwind.config.mjs",
  "tailwind.config.cjs",
  "tailwind.config.mts",
  "tailwind.config.cts",
];

const parseMajor = (v) => {
  const m = String(v || "").match(/(\d+)/);
  return m ? parseInt(m[ 1 ], 10) : 0;
};

function assertTailwindFromPkgJson() {
  const versionRange =
    (P.dependencies && P.dependencies.tailwindcss) ||
    (P.devDependencies && P.devDependencies.tailwindcss);

  if (!versionRange) {
    console.error("❌ Tailwind CSS is not listed in package.json.");
    console.error("Please add Tailwind first, then re-run this command.");
    console.error("Examples:");
    console.error("  - v4: npm i -D tailwindcss");
    console.error("        Optional: npm i -D @tailwindcss/postcss  // PostCSS flow");
    console.error("        Optional: npm i -D @tailwindcss/cli      // CLI flow");
    console.error("  - v3: npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p");
    process.exit(1);
  }

  const major = parseMajor(versionRange);
  console.log(`🔎 Tailwind in package.json: "${versionRange}" (detected major v${major})`);
  return { versionRange, major };
}

// v3 requires a tailwind.config.* file to exist
function assertTailwindV3ConfigPresent() {
  const configPath = TAILWIND_CONFIG_FILES
    .map((f) => path.join(R, f))
    .find((p) => fE(p));
  if (!configPath) {
    console.error("❌ Tailwind v3 detected, but no tailwind.config.* found.");
    console.error("Please run: npx tailwindcss init -p");
    process.exit(1);
  }
  console.log("✅ Tailwind v3 config file detected.");
}

// ----------------------------------------------
// React presence
// ----------------------------------------------
function assertReactPresent() {
  if (!D.react) {
    console.error("❌ This setup currently supports React/Next projects only.");
    console.error("React dependency was not found in package.json.");
    process.exit(1);
  }
  console.log("✅ React detected.");
}

// ----------------------------------------------
// saha-ui presence + deps sync
// ----------------------------------------------
function ensureSahaUIInstalled() {
  try {
    const pkgPath = path.join(R, "package.json");
    if (!fE(pkgPath)) {
      console.error("❌ No package.json found in this directory.");
      console.error("Please run this command inside your project folder.");
      process.exit(1);
    }

    const pkg = JSON.parse(rd(pkgPath));
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    if (!deps[ "saha-ui" ]) {
      console.log("\n📦 saha-ui not found in your project.");
      console.log("Installing saha-ui@latest for you...\n");
      execSync("npm install saha-ui@latest --save-dev", {
        stdio: "inherit",
        cwd: R,
      });
      console.log("\n✅ saha-ui installed successfully!\n");
    } else {
      console.log("✅ saha-ui is already installed.\n");
    }
  } catch (err) {
    console.error("❌ Failed to verify or install saha-ui:");
    console.error(err.message);
    process.exit(1);
  }
}

// ONLY install dependencies and optionalDependencies (not peers/dev)
// Skips packages already listed in the host project's deps/devDeps.
function installSahaUIDeps() {
  try {
    const sahaPath = path.dirname(fileURLToPath(import.meta.url));
    const pkgPath = path.resolve(sahaPath, "../package.json");

    if (!fE(pkgPath)) {
      console.warn("⚠️ Could not find saha-ui package.json to sync dependencies.");
      return;
    }

    const sahaPkg = JSON.parse(rd(pkgPath));
    const toSync = {
      ...(sahaPkg.dependencies || {}),
      ...(sahaPkg.optionalDependencies || {}),
    };

    // Re-read host package.json to reflect any updates after saha-ui install
    const hostPkg = JSON.parse(rd(path.join(R, "package.json")));
    const hostAll = {
      ...(hostPkg.dependencies || {}),
      ...(hostPkg.devDependencies || {}),
    };

    const toInstall = Object.entries(toSync).filter(([ name ]) => !hostAll[ name ]);
    if (toInstall.length === 0) {
      console.log("ℹ️ No missing dependencies from saha-ui to install in your project.");
      return;
    }

    const depNames = toInstall.map(([ name, version ]) => `${name}@${version}`).join(" ");
    console.log("📦 Installing saha-ui dependencies into your project (deps + optionalDeps)...");
    execSync(`npm install ${depNames} --save-dev`, {
      stdio: "inherit",
      cwd: R,
    });
    console.log("\n✅ saha-ui dependencies installed successfully!\n");
  } catch (err) {
    console.error("❌ Failed to install saha-ui dependencies:", err.message);
  }
}

// ----------------------------------------------
// CSS file selection (Next vs React)
// ----------------------------------------------
const N = [
  "app/globals.css",
  "app/global.css",
  "styles/globals.css",
  "styles/global.css",
  "src/app/globals.css",
  "src/app/global.css",
  "src/styles/globals.css",
  "src/styles/global.css",
];
const V = [ "src/index.css", "src/main.css", "src/global.css", "index.css" ];
const C = F === "next" ? N : V;

const pick = () => {
  for (const x of C) {
    const f = path.join(R, x);
    if (fE(f)) return f;
  }

  if (F === "next") {
    const A = dE(path.join(R, "app")) && path.join(R, "app/globals.css");
    const B = dE(path.join(R, "src/app")) && path.join(R, "src/app/globals.css");
    const S = dE(path.join(R, "styles")) && path.join(R, "styles/globals.css");
    const T = dE(path.join(R, "src/styles")) && path.join(R, "src/styles/globals.css");
    return A || B || S || T || path.join(R, "app/globals.css");
  }

  return dE(path.join(R, "src")) ? path.join(R, "src/index.css") : path.join(R, "index.css");
};

// ----------------------------------------------
// CSS payloads (your CSS)
// ----------------------------------------------
const M = "/* saha-ui */";
const TW = /@import\s+["']tailwindcss["'];?/;

// CSS for Tailwind v4+
const CSS_V4 = `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-error: var(--error);
  --color-error-foreground: var(--error-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

:root {
  --radius: 0.625rem;
  --background: oklch(0.98 0.003 200);
  --foreground: oklch(0.15 0.01 200);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.01 200);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.01 200);
  --primary: oklch(48.151% 0.23085 269.463);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.65 0.25 340);
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.96 0.005 200);
  --muted-foreground: oklch(0.45 0.01 200);
  --accent: oklch(0.65 0.12 185);
  --accent-foreground: oklch(1 0 0);
  --success: oklch(0.60 0.15 145);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.70 0.15 65);
  --warning-foreground: oklch(0.15 0.01 200);
  --error: oklch(0.60 0.20 25);
  --error-foreground: oklch(1 0 0);
  --destructive: oklch(0.60 0.20 25);
  --destructive-foreground: oklch(1 0 0);
  --info: oklch(0.60 0.15 250);
  --info-foreground: oklch(1 0 0);
  --border: oklch(0.92 0.005 200);
  --input: oklch(0.96 0.005 200);
  --ring: oklch(0.60 0.18 275);
  --chart-1: oklch(0.60 0.18 275);
  --chart-2: oklch(0.60 0.15 145);
  --chart-3: oklch(0.60 0.15 250);
  --chart-4: oklch(0.65 0.25 340);
  --chart-5: oklch(0.65 0.12 185);
  
  --glass-bg: oklch(1 0 0 / 0.25);
  --glass-bg-hover: oklch(1 0 0 / 0.35);
  --glass-border: oklch(0.60 0.18 275 / 0.15);
  --glass-shadow: 0 8px 32px 0 oklch(0.60 0.18 275 / 0.12);
  --glass-blur: 16px;
}

.dark {
  --background: oklch(0.08 0.005 200);
  --foreground: oklch(0.95 0.005 200);
  --card: oklch(0.12 0.01 200);
  --card-foreground: oklch(0.95 0.005 200);
  --popover: oklch(0.12 0.01 200);
  --popover-foreground: oklch(0.95 0.005 200);
  --primary: oklch(41.145% 0.14945 272.396);
  --primary-foreground: oklch(0.98 0.003 200);
  --secondary: oklch(0.70 0.25 340);
  --secondary-foreground: oklch(0.98 0.003 200);
  --muted: oklch(0.15 0.01 200);
  --muted-foreground: oklch(0.65 0.005 200);
  --accent: oklch(0.70 0.15 185);
  --accent-foreground: oklch(0.98 0.003 200);
  --success: oklch(0.65 0.18 145);
  --success-foreground: oklch(0.98 0.003 200);
  --warning: oklch(0.75 0.18 65);
  --warning-foreground: oklch(0.98 0.003 200);
  --error: oklch(0.65 0.22 25);
  --error-foreground: oklch(0.98 0.003 200);
  --destructive: oklch(0.65 0.22 25);
  --destructive-foreground: oklch(0.98 0.003 200);
  --info: oklch(0.65 0.18 250);
  --info-foreground: oklch(0.98 0.003 200);
  --border: oklch(0.20 0.01 200);
  --input: oklch(0.15 0.01 200);
  --ring: oklch(0.68 0.20 275);
  --chart-1: oklch(0.68 0.20 275);
  --chart-2: oklch(0.65 0.18 145);
  --chart-3: oklch(0.65 0.18 250);
  --chart-4: oklch(0.70 0.25 340);
  --chart-5: oklch(0.70 0.15 185);
  
  --glass-bg: oklch(0.12 0.01 200 / 0.5);
  --glass-bg-hover: oklch(0.12 0.01 200 / 0.7);
  --glass-border: oklch(0.68 0.20 275 / 0.2);
  --glass-shadow: 0 8px 32px 0 oklch(0 0 0 / 0.6);
  --glass-blur: 16px;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  
  body {
    @apply bg-background text-foreground;
    background: linear-gradient(
      135deg,
      oklch(0.98 0.003 200) 0%,
      oklch(0.96 0.02 270) 50%,
      oklch(0.98 0.02 340) 100%
    );
    background-attachment: fixed;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .dark body {
    @apply text-foreground;
    color: oklch(0.95 0.005 200);
    background: linear-gradient(
      135deg,
      oklch(0.08 0.005 200) 0%,
      oklch(0.10 0.01 200) 50%,
      oklch(0.12 0.01 200) 100%
    );
    background-attachment: fixed;
  }
  
  .dark {
    color-scheme: dark;
  }
}

@layer components {
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    position: relative;
  }
  
  .glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      oklch(1 0 0 / 0.4) 0%,
      oklch(1 0 0 / 0.1) 50%,
      oklch(1 0 0 / 0) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }
  
  .dark .glass::before {
    background: linear-gradient(
      135deg,
      oklch(0.68 0.20 275 / 0.3) 0%,
      oklch(0.68 0.20 275 / 0.1) 50%,
      oklch(0.68 0.20 275 / 0) 100%
    );
  }
  
  .glass-hover:hover {
    background: var(--glass-bg-hover);
    transform: translateY(-2px);
    box-shadow: 0 12px 48px 0 oklch(0.60 0.18 275 / 0.2);
  }
  
  .dark .glass-hover:hover {
    box-shadow: 0 12px 48px 0 oklch(0 0 0 / 0.7);
  }
  
  .glass-strong {
    background: var(--glass-bg);
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow), inset 0 1px 0 oklch(1 0 0 / 0.3);
  }
  
  .dark .glass-strong {
    box-shadow: var(--glass-shadow), inset 0 1px 0 oklch(0.68 0.20 275 / 0.2);
  }
  
  .glass-subtle {
    background: var(--glass-bg);
    backdrop-filter: blur(8px) saturate(150%);
    -webkit-backdrop-filter: blur(8px) saturate(150%);
    border: 1px solid var(--glass-border);
    box-shadow: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  }
}

@layer utilities {
  @keyframes progress-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 1.5rem 0;
    }
  }
  
  @keyframes progress-indeterminate {
    0% {
      left: -40%;
      transform: scaleX(0.6);
    }
    50% {
      transform: scaleX(1);
    }
    100% {
      left: 100%;
      transform: scaleX(0.6);
    }
  }
  
  @keyframes progress-shimmer {
    0% {
      transform: translateX(-100%) scaleX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: translateX(0%) scaleX(1);
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%) scaleX(0);
      opacity: 0;
    }
  }
  
  @keyframes progress-glow-pulse {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.15) saturate(1.2);
    }
  }
  
  @keyframes collapsible-down {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: var(--radix-collapsible-content-height);
      opacity: 1;
    }
  }
  
  @keyframes collapsible-up {
    from {
      height: var(--radix-collapsible-content-height);
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }
  
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  
  [role="menu"],
  [role="listbox"] {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  [role="menu"]::-webkit-scrollbar,
  [role="listbox"]::-webkit-scrollbar {
    display: none;
  }
  
  [contenteditable][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    opacity: 0.5;
    pointer-events: none;
  }
  
  [contenteditable]:focus:empty:before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    opacity: 0.3;
  }
}`;

// CSS for Tailwind v3
const CSS_V3 = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 0.625rem;
  --background: 0 0% 98%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  --primary: 269 70% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 340 75% 65%;
  --secondary-foreground: 0 0% 100%;
  --muted: 220 13% 95%;
  --muted-foreground: 220 9% 46%;
  --accent: 185 50% 65%;
  --accent-foreground: 0 0% 100%;
  --success: 145 60% 60%;
  --success-foreground: 0 0% 100%;
  --warning: 65 60% 70%;
  --warning-foreground: 222 47% 11%;
  --error: 25 80% 60%;
  --error-foreground: 0 0% 100%;
  --destructive: 25 80% 60%;
  --destructive-foreground: 0 0% 100%;
  --info: 250 60% 60%;
  --info-foreground: 0 0% 100%;
  --border: 220 13% 91%;
  --input: 220 13% 95%;
  --ring: 275 70% 60%;
}

.dark {
  --background: 222 47% 8%;
  --foreground: 220 13% 95%;
  --card: 222 47% 12%;
  --card-foreground: 220 13% 95%;
  --popover: 222 47% 12%;
  --popover-foreground: 220 13% 95%;
  --primary: 272 60% 41%;
  --primary-foreground: 0 0% 98%;
  --secondary: 340 75% 70%;
  --secondary-foreground: 0 0% 98%;
  --muted: 222 47% 15%;
  --muted-foreground: 220 13% 65%;
  --accent: 185 60% 70%;
  --accent-foreground: 0 0% 98%;
  --success: 145 70% 65%;
  --success-foreground: 0 0% 98%;
  --warning: 65 70% 75%;
  --warning-foreground: 0 0% 98%;
  --error: 25 85% 65%;
  --error-foreground: 0 0% 98%;
  --destructive: 25 85% 65%;
  --destructive-foreground: 0 0% 98%;
  --info: 250 70% 65%;
  --info-foreground: 0 0% 98%;
  --border: 222 47% 20%;
  --input: 222 47% 15%;
  --ring: 275 75% 68%;
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .dark .glass {
    background: rgba(18, 18, 23, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }
}`;

// ----------------------------------------------
// Calculate relative path from a file to node_modules
// ----------------------------------------------
const getRelativePathToNodeModules = (fromFile) => {
  const fromDir = path.dirname(fromFile);
  const nodeModulesPath = path.join(R, "node_modules");
  let relativePath = path.relative(fromDir, nodeModulesPath);

  // Convert Windows backslashes to forward slashes for consistency
  relativePath = relativePath.replace(/\\/g, '/');

  // If in same directory, use ./
  if (!relativePath) {
    relativePath = '.';
  } else if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }

  return relativePath;
};

// ----------------------------------------------
// Update Tailwind config for v3 (auto-update content + manual hints for theme)
// ----------------------------------------------
const updateTailwindConfig = (cssFilePath) => {
  const configFiles = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  let configPath = null;
  for (const cf of configFiles) {
    const p = path.join(R, cf);
    if (fE(p)) {
      configPath = p;
      break;
    }
  }

  if (!configPath) {
    console.warn("⚠️  Warning: Could not find Tailwind config file");
    console.log("\n📝 Please manually create tailwind.config.js and add:");
    console.log(`
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/saha-ui/dist/**/*.js", // ← Required for saha-ui
  ],
  // ... rest of your config
};
    `);
    return;
  }

  // Calculate relative path from config file to node_modules
  const relativePathToNodeModules = getRelativePathToNodeModules(configPath);
  const sahaUIContentPath = `${relativePathToNodeModules}/saha-ui/dist/**/*.js`;

  let config = rd(configPath);
  const contentPattern = /node_modules\/saha-ui\/dist\/\*\*\/\*\.js/;

  // Check if saha-ui content path already exists
  if (contentPattern.test(config)) {
    console.log("✅ Tailwind config already includes saha-ui content path");
  } else {
    // Try to automatically add the content path
    const contentArrayRegex = /content\s*:\s*\[([\s\S]*?)\]/;
    const match = config.match(contentArrayRegex);

    if (match) {
      const currentContent = match[ 1 ];
      const newContentPath = `\n    "${sahaUIContentPath}",`;

      // Add before the closing bracket
      const updatedContent = currentContent.trimEnd() + newContentPath;
      config = config.replace(contentArrayRegex, `content: [${updatedContent}\n  ]`);

      wr(configPath, config);
      console.log(`✅ Added saha-ui content path to ${path.relative(R, configPath)}`);
      console.log(`   Path: "${sahaUIContentPath}"`);
    } else {
      console.warn("⚠️  Could not automatically update content array");
      console.log("\n📝 Please manually add this to your tailwind.config content array:");
      console.log(`  "${sahaUIContentPath}"`);
    }
  }

  // Theme extension hints (manual for now to avoid breaking existing configs)
  if (config.includes("theme:") && config.includes("extend:")) {
    console.log("\nℹ️  Tailwind config already has theme.extend");
    console.log("📝 If you haven't already, add these to your tailwind.config theme.extend:");
    console.log(`
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
  muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
  destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
  success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))" },
  warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))" },
  error: { DEFAULT: "hsl(var(--error))", foreground: "hsl(var(--error-foreground))" },
  info: { DEFAULT: "hsl(var(--info))", foreground: "hsl(var(--info-foreground))" },
  card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
  popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
  chart: { 1: "hsl(var(--chart-1))", 2: "hsl(var(--chart-2))", 3: "hsl(var(--chart-3))", 4: "hsl(var(--chart-4))", 5: "hsl(var(--chart-5))" },
},
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
},
keyframes: {
  "progress-stripes": { "0%": { backgroundPosition: "0 0" }, "100%": { backgroundPosition: "1.5rem 0" } },
  "progress-indeterminate": { "0%": { left: "-40%", transform: "scaleX(0.6)" }, "50%": { transform: "scaleX(1)" }, "100%": { left: "100%", transform: "scaleX(0.6)" } },
  "progress-shimmer": { "0%": { transform: "translateX(-100%) scaleX(0)", opacity: "0" }, "10%": { opacity: "1" }, "50%": { transform: "translateX(0%) scaleX(1)" }, "90%": { opacity: "1" }, "100%": { transform: "translateX(100%) scaleX(0)", opacity: "0" } },
  "progress-glow-pulse": { "0%, 100%": { filter: "brightness(1) saturate(1)" }, "50%": { filter: "brightness(1.15) saturate(1.2)" } },
  "collapsible-down": { from: { height: "0", opacity: "0" }, to: { height: "var(--radix-collapsible-content-height)", opacity: "1" } },
  "collapsible-up": { from: { height: "var(--radix-collapsible-content-height)", opacity: "1" }, to: { height: "0", opacity: "0" } },
},
animation: {
  "progress-stripes": "progress-stripes 1s linear infinite",
  "progress-indeterminate": "progress-indeterminate 1.5s ease-in-out infinite",
  "progress-shimmer": "progress-shimmer 2s ease-in-out infinite",
  "progress-glow-pulse": "progress-glow-pulse 2s ease-in-out infinite",
  "collapsible-down": "collapsible-down 0.2s ease-out",
  "collapsible-up": "collapsible-up 0.2s ease-out",
},
    `);
  }
};

// ----------------------------------------------
// Inject
// ----------------------------------------------
const inject = (f, tailwindInfo) => {
  const ex = fE(f);
  const cur = ex ? rd(f) : "";

  const hasTailwindV4Import = /@import\s+["']tailwindcss["'];?/.test(cur);
  const hasTailwindV3Import = cur.includes("@tailwind");
  const hasTailwindImport = hasTailwindV4Import || hasTailwindV3Import;

  // For Tailwind v4, always check and add @source if missing
  if (hasTailwindV4Import) {
    const relativePathToNodeModules = getRelativePathToNodeModules(f);
    const sahaUISourcePath = `${relativePathToNodeModules}/saha-ui/dist/**/*.js`;
    const sourcePattern = /source\s+["'][^"']*saha-ui[^"']*["']/;

    if (!sourcePattern.test(cur)) {
      // Add @source to the @import line
      const updatedContent = cur.replace(
        /@import\s+["']tailwindcss["'];?/,
        `@import "tailwindcss" source "${sahaUISourcePath}";`
      );
      wr(f, updatedContent);
      console.log(`\n✅ Added @source "${sahaUISourcePath}" to Tailwind v4 import`);
    } else {
      console.log("✅ Tailwind v4 @source already includes saha-ui");
    }
  }

  // Now check if CSS content is already injected
  if (cur.includes(M)) {
    console.log(`✅ saha-ui: CSS already injected in ${path.relative(R, f)}`);
    return;
  }

  const CSS = tailwindInfo.major >= 4 ? CSS_V4 : CSS_V3;

  let cssToInject = CSS;
  if (hasTailwindImport) {
    if (hasTailwindV4Import) {
      cssToInject = CSS.replace(/^@import\s+["']tailwindcss["'][^;]*;?\n*/, "").trim();
    } else if (hasTailwindV3Import) {
      cssToInject = CSS.replace(/@tailwind\s+(base|components|utilities);?\n*/g, "").trim();
    }
  }

  let out;
  if (hasTailwindV4Import) {
    // Re-read file in case @source was just added
    const currentContent = rd(f);
    out = currentContent.replace(/@import\s+["']tailwindcss["'][^;]*;/, (m) => `${m}\n${M}\n${cssToInject}`);
  } else if (hasTailwindV3Import) {
    const tailwindDirectives = cur.match(/@tailwind\s+(base|components|utilities);?\n*/g);
    if (tailwindDirectives) {
      const lastDirective = tailwindDirectives[ tailwindDirectives.length - 1 ];
      const lastIndex = cur.lastIndexOf(lastDirective);
      const beforeDirective = cur.substring(0, lastIndex + lastDirective.length);
      const afterDirective = cur.substring(lastIndex + lastDirective.length);
      out = `${beforeDirective}\n${M}\n${cssToInject}\n${afterDirective}`;
    } else {
      out = `${M}\n${cssToInject}\n\n${cur}`;
    }
  } else {
    out = `${M}\n${CSS}\n\n${cur}`;
  }

  wr(f, out);
  console.log(`\n✅ saha-ui: Injected CSS into ${path.relative(R, f)} (${F})`);
  console.log(`📦 Using Tailwind v${tailwindInfo.major} configuration`);

  if (tailwindInfo.major < 4) {
    console.log("\n⚠️  Tailwind v3 detected - updating your tailwind.config");
    updateTailwindConfig(f);
  }

  if (!ex) {
    if (F === "next") {
      console.log("\n📝 Next steps:");
      console.log("  - Ensure root layout imports this CSS:");
      console.log("    app/layout.tsx -> import './globals.css'");
    } else {
      console.log("\n📝 Next steps:");
      console.log("  - Ensure src/main.tsx imports './index.css'");
    }
  }
};

// ----------------------------------------------
// Main
// ----------------------------------------------
const run = () => {
  if (c !== "init") {
    console.log("Usage: npx saha-ui init");
    return;
  }

  console.log("\n🚀 Initializing saha-ui...\n");

  // 1) Determine Tailwind version from package.json only
  const tailwindInfo = assertTailwindFromPkgJson();

  // 2) For v3, ensure config exists. For v4, CLI/PostCSS are optional.
  if (tailwindInfo.major < 4) {
    assertTailwindV3ConfigPresent();
  } else {
    console.log("ℹ️ Tailwind v4 detected. PostCSS/CLI are optional; proceeding to inject CSS.");
  }

  // 3) Proceed only if React is present
  assertReactPresent();

  // 4) Ensure saha-ui is installed, then install its deps (deps + optionalDeps only)
  ensureSahaUIInstalled();
  installSahaUIDeps();

  // 5) Inject CSS (v4: just CSS; v3: CSS + config hints)
  inject(pick(), tailwindInfo);

  console.log("\n✨ Done!\n");
};

run();