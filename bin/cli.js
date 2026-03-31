#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const R = process.cwd();
const a = process.argv.slice(2);
const c = a[ 0 ] || "init";

// Helpers
const rd = (f) => fs.readFileSync(f, "utf8");
const wr = (f, s) => {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s, "utf8");
};
// CLI flags
const DRY_RUN = a.includes("--dry") || a.includes("--no-write") || a.includes("-n");
const ENABLE_BACKUP = !a.includes("--no-backup");

/**
 * Create a backup of a file before modifying it.
 * Returns the backup path, or null if no file existed.
 */
const createBackup = (filePath) => {
  try {
    if (!fE(filePath)) return null;
    if (!ENABLE_BACKUP) return null;
    const now = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = `${filePath}.saha-ui-backup-${now}`;
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  } catch (err) {
    console.error("⚠️  Failed to create backup:", err.message);
    return null;
  }
};

/**
 * Basic CSS validation to catch obvious syntax errors.
 * - checks balanced braces
 * - ensures not empty
 */
const validateCss = (css) => {
  if (!css || typeof css !== "string") return { ok: false, reason: "Empty CSS" };
  // Check braces balance
  let depth = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[ i ];
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth < 0) return { ok: false, reason: "Unexpected closing brace" };
  }
  if (depth !== 0) return { ok: false, reason: "Unbalanced braces" };
  // Quick sanity: must contain at least one rule or keyframes
  if (!/@keyframes|@layer|:root|\.dark|@tailwind|@import/.test(css)) {
    return { ok: false, reason: "CSS looks suspicious (no common tokens found)" };
  }
  return { ok: true };
};

/**
 * Safe write: optionally dry-run, create backup, validate CSS, and write.
 */
const safeWrite = (filePath, content, opts = { backup: true, validate: true }) => {
  try {
    if (DRY_RUN) {
      console.log(`\n[dry-run] Would write to: ${path.relative(R, filePath)} (${content.length} bytes)`);
      return { wrote: false, backup: null };
    }

    if (opts.backup && ENABLE_BACKUP) {
      const b = createBackup(filePath);
      if (b) console.log(`🔁 Backup created: ${path.relative(R, b)}`);
    }

    if (opts.validate) {
      const v = validateCss(content);
      if (!v.ok) {
        console.error(`❌ CSS validation failed for ${path.relative(R, filePath)}: ${v.reason}`);
        return { wrote: false, backup: null, error: v.reason };
      }
    }

    wr(filePath, content);
    console.log(`✅ Written: ${path.relative(R, filePath)}`);
    return { wrote: true };
  } catch (err) {
    console.error("❌ Failed to write file:", err.message);
    return { wrote: false, error: err.message };
  }
};
const fE = (f) => fs.existsSync(f) && fs.statSync(f).isFile();
const dE = (d) => fs.existsSync(d) && fs.statSync(d).isDirectory();

// ============================================
// PROMPT UTILITY
// ============================================
const prompt = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
};

const confirmPrompt = async (question) => {
  const answer = await prompt(`${question} (y/n): `);
  return answer === "y" || answer === "yes";
};

const selectPrompt = async (question, options) => {
  console.log(`\n${question}`);
  options.forEach((opt, idx) => {
    console.log(`  ${idx + 1}) ${opt.label}`);
  });
  const answer = await prompt("Enter your choice (1/2/3): ");
  const idx = parseInt(answer, 10) - 1;
  return options[ idx ]?.value || options[ 0 ].value;
};

// ============================================
// CSS PARSING UTILITIES
// ============================================

/**
 * Extract CSS block content (handles nested braces)
 */
const extractBlock = (css, startPattern) => {
  const match = css.match(startPattern);
  if (!match) return null;

  const startIdx = match.index + match[ 0 ].length;
  let braceCount = 1;
  let endIdx = startIdx;

  while (braceCount > 0 && endIdx < css.length) {
    if (css[ endIdx ] === "{") braceCount++;
    if (css[ endIdx ] === "}") braceCount--;
    endIdx++;
  }

  return {
    fullMatch: css.substring(match.index, endIdx),
    content: css.substring(startIdx, endIdx - 1).trim(),
    startIndex: match.index,
    endIndex: endIdx,
  };
};

/**
 * Parse CSS variables from a block
 */
const parseCSSVariables = (content) => {
  const variables = {};
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(content)) !== null) {
    variables[ `--${match[ 1 ]}` ] = match[ 2 ].trim();
  }

  return variables;
};

/**
 * Parse @keyframes from CSS
 */
const parseKeyframes = (css) => {
  const keyframes = {};
  const keyframeRegex = /@keyframes\s+([\w-]+)\s*\{/g;
  let match;

  while ((match = keyframeRegex.exec(css)) !== null) {
    const name = match[ 1 ];
    const block = extractBlock(css.substring(match.index), /@keyframes\s+[\w-]+\s*\{/);
    if (block) {
      keyframes[ name ] = block.fullMatch;
    }
  }

  return keyframes;
};

/**
 * Detect existing CSS structures
 */
const detectExistingStructures = (css) => {
  return {
    hasRoot: /:root\s*\{/.test(css),
    hasDark: /\.dark\s*\{/.test(css),
    hasThemeInline: /@theme\s+inline\s*\{/.test(css),
    hasLayerBase: /@layer\s+base\s*\{/.test(css),
    hasLayerComponents: /@layer\s+components\s*\{/.test(css),
    hasLayerUtilities: /@layer\s+utilities\s*\{/.test(css),
    hasCustomVariant: /@custom-variant\s+dark/.test(css),
    hasTailwindImport: /@import\s+["']tailwindcss["']/.test(css),
    hasTailwindDirectives: /@tailwind\s+(base|components|utilities)/.test(css),
    hasKeyframes: /@keyframes/.test(css),
    hasGlassClass: /\.glass\s*\{/.test(css),
  };
};

/**
 * Extract :root variables from CSS
 */
const extractRootVariables = (css) => {
  const block = extractBlock(css, /:root\s*\{/);
  return block ? parseCSSVariables(block.content) : {};
};

/**
 * Extract .dark variables from CSS
 */
const extractDarkVariables = (css) => {
  const block = extractBlock(css, /\.dark\s*\{/);
  return block ? parseCSSVariables(block.content) : {};
};

/**
 * Merge CSS variables (add missing from source to target)
 */
const mergeVariables = (existing, incoming) => {
  const merged = { ...existing };
  let addedCount = 0;

  for (const [ key, value ] of Object.entries(incoming)) {
    if (!(key in merged)) {
      merged[ key ] = value;
      addedCount++;
    }
  }

  return { merged, addedCount };
};

/**
 * Generate CSS variable block string
 */
const generateVariableBlock = (variables, indent = "  ") => {
  return Object.entries(variables)
    .map(([ key, value ]) => `${indent}${key}: ${value};`)
    .join("\n");
};

/**
 * Replace or update :root block in CSS
 */
const updateRootBlock = (css, newVariables, mode = "merge") => {
  const block = extractBlock(css, /:root\s*\{/);

  if (!block) {
    // No existing :root, add new one
    const newBlock = `:root {\n${generateVariableBlock(newVariables)}\n}`;
    return { css: `${newBlock}\n\n${css}`, added: Object.keys(newVariables).length };
  }

  if (mode === "replace") {
    const newBlock = `:root {\n${generateVariableBlock(newVariables)}\n}`;
    return {
      css: css.substring(0, block.startIndex) + newBlock + css.substring(block.endIndex),
      added: Object.keys(newVariables).length,
    };
  }

  // Merge mode
  const existingVars = parseCSSVariables(block.content);
  const { merged, addedCount } = mergeVariables(existingVars, newVariables);
  const newBlock = `:root {\n${generateVariableBlock(merged)}\n}`;

  return {
    css: css.substring(0, block.startIndex) + newBlock + css.substring(block.endIndex),
    added: addedCount,
  };
};

/**
 * Replace or update .dark block in CSS
 */
const updateDarkBlock = (css, newVariables, mode = "merge") => {
  const block = extractBlock(css, /\.dark\s*\{/);

  if (!block) {
    // No existing .dark, add new one
    const newBlock = `.dark {\n${generateVariableBlock(newVariables)}\n}`;
    // Insert after :root if exists
    const rootBlock = extractBlock(css, /:root\s*\{/);
    if (rootBlock) {
      return {
        css: css.substring(0, rootBlock.endIndex) + "\n\n" + newBlock + css.substring(rootBlock.endIndex),
        added: Object.keys(newVariables).length,
      };
    }
    return { css: `${newBlock}\n\n${css}`, added: Object.keys(newVariables).length };
  }

  if (mode === "replace") {
    const newBlock = `.dark {\n${generateVariableBlock(newVariables)}\n}`;
    return {
      css: css.substring(0, block.startIndex) + newBlock + css.substring(block.endIndex),
      added: Object.keys(newVariables).length,
    };
  }

  // Merge mode
  const existingVars = parseCSSVariables(block.content);
  const { merged, addedCount } = mergeVariables(existingVars, newVariables);
  const newBlock = `.dark {\n${generateVariableBlock(merged)}\n}`;

  return {
    css: css.substring(0, block.startIndex) + newBlock + css.substring(block.endIndex),
    added: addedCount,
  };
};

/**
 * Merge keyframes (add missing)
 */
const mergeKeyframes = (css, incomingKeyframes) => {
  const existingKeyframes = parseKeyframes(css);
  let updatedCss = css;
  let addedCount = 0;

  const newKeyframes = [];
  for (const [ name, keyframe ] of Object.entries(incomingKeyframes)) {
    if (!(name in existingKeyframes)) {
      newKeyframes.push(keyframe);
      addedCount++;
    }
  }

  if (newKeyframes.length > 0) {
    // Add new keyframes at the end of @layer utilities or at the end of file
    const utilitiesBlock = extractBlock(css, /@layer\s+utilities\s*\{/);
    if (utilitiesBlock) {
      const insertPoint = utilitiesBlock.endIndex - 1;
      const keyframesStr = "\n\n" + newKeyframes.join("\n\n") + "\n";
      updatedCss = css.substring(0, insertPoint) + keyframesStr + css.substring(insertPoint);
    } else {
      updatedCss = css + "\n\n" + newKeyframes.join("\n\n");
    }
  }

  return { css: updatedCss, added: addedCount };
};

/**
 * Merge or replace an @layer block (components/utilities)
 * - incomingContent should be the inner content of the @layer block
 */
const updateLayerBlock = (css, layerName, incomingContent, mode = "merge") => {
  const layerRegex = new RegExp(`@layer\\s+${layerName}\\s*\\{`);
  const block = extractBlock(css, layerRegex);

  const buildLayer = (content) => `@layer ${layerName} {\n${content}\n}`;

  if (!block) {
    // No existing layer, insert after :root or at end
    const rootBlock = extractBlock(css, /:root\s*\{/);
    const newBlock = buildLayer(incomingContent);
    if (rootBlock) {
      return { css: css.substring(0, rootBlock.endIndex) + "\n\n" + newBlock + css.substring(rootBlock.endIndex), added: 1 };
    }
    return { css: `${css}\n\n${newBlock}`, added: 1 };
  }

  if (mode === "replace") {
    const newBlock = buildLayer(incomingContent);
    return { css: css.substring(0, block.startIndex) + newBlock + css.substring(block.endIndex), added: 1 };
  }

  // Merge mode: add missing class or selector blocks from incomingContent
  const existingContent = block.content;
  const selectorRegex = /([#.][\w\-:\[\]]+[^\{,\n]*)\s*\{/g;
  const existingSelectors = new Set();
  let m;
  while ((m = selectorRegex.exec(existingContent)) !== null) {
    existingSelectors.add(m[ 1 ].trim());
  }

  const newSelectors = [];
  // Find full blocks in incomingContent and add those whose selector isn't present
  const incomingBlockRegex = /([^{]+)\{([\s\S]*?)\}/g;
  while ((m = incomingBlockRegex.exec(incomingContent)) !== null) {
    const selector = m[ 1 ].trim();
    const blockBody = m[ 0 ];
    if (!existingSelectors.has(selector)) {
      newSelectors.push(blockBody.trim());
    }
  }

  if (newSelectors.length === 0) {
    return { css, added: 0 };
  }

  // Insert new selectors just before the end of the existing layer block
  const insertPoint = block.endIndex - 1;
  const additions = "\n\n" + newSelectors.join("\n\n") + "\n";
  const updatedCss = css.substring(0, insertPoint) + additions + css.substring(insertPoint);

  return { css: updatedCss, added: newSelectors.length };
};

// ============================================
// SAHA-UI CSS VARIABLES (extracted from your CSS)
// ============================================
const SAHA_UI_ROOT_VARIABLES = {
  "--radius": "0.625rem",
  "--background": "oklch(0.98 0.003 200)",
  "--foreground": "oklch(0.15 0.01 200)",
  "--card": "oklch(1 0 0)",
  "--card-foreground": "oklch(0.15 0.01 200)",
  "--popover": "oklch(1 0 0)",
  "--popover-foreground": "oklch(0.15 0.01 200)",
  "--primary": "oklch(48.151% 0.23085 269.463)",
  "--primary-foreground": "oklch(1 0 0)",
  "--secondary": "oklch(0.65 0.25 340)",
  "--secondary-foreground": "oklch(1 0 0)",
  "--muted": "oklch(0.96 0.005 200)",
  "--muted-foreground": "oklch(0.45 0.01 200)",
  "--accent": "oklch(0.65 0.12 185)",
  "--accent-foreground": "oklch(1 0 0)",
  "--success": "oklch(0.60 0.15 145)",
  "--success-foreground": "oklch(1 0 0)",
  "--warning": "oklch(0.70 0.15 65)",
  "--warning-foreground": "oklch(0.15 0.01 200)",
  "--error": "oklch(0.60 0.20 25)",
  "--error-foreground": "oklch(1 0 0)",
  "--destructive": "oklch(0.60 0.20 25)",
  "--destructive-foreground": "oklch(1 0 0)",
  "--info": "oklch(0.60 0.15 250)",
  "--info-foreground": "oklch(1 0 0)",
  "--border": "oklch(0.92 0.005 200)",
  "--input": "oklch(0.96 0.005 200)",
  "--ring": "oklch(0.60 0.18 275)",
  "--chart-1": "oklch(0.60 0.18 275)",
  "--chart-2": "oklch(0.60 0.15 145)",
  "--chart-3": "oklch(0.60 0.15 250)",
  "--chart-4": "oklch(0.65 0.25 340)",
  "--chart-5": "oklch(0.65 0.12 185)",
  "--glass-bg": "oklch(1 0 0 / 0.25)",
  "--glass-bg-hover": "oklch(1 0 0 / 0.35)",
  "--glass-border": "oklch(0.60 0.18 275 / 0.15)",
  "--glass-shadow": "0 8px 32px 0 oklch(0.60 0.18 275 / 0.12)",
  "--glass-blur": "16px",
};

const SAHA_UI_DARK_VARIABLES = {
  "--background": "oklch(0.08 0.005 200)",
  "--foreground": "oklch(0.95 0.005 200)",
  "--card": "oklch(0.12 0.01 200)",
  "--card-foreground": "oklch(0.95 0.005 200)",
  "--popover": "oklch(0.12 0.01 200)",
  "--popover-foreground": "oklch(0.95 0.005 200)",
  "--primary": "oklch(41.145% 0.14945 272.396)",
  "--primary-foreground": "oklch(0.98 0.003 200)",
  "--secondary": "oklch(0.70 0.25 340)",
  "--secondary-foreground": "oklch(0.98 0.003 200)",
  "--muted": "oklch(0.15 0.01 200)",
  "--muted-foreground": "oklch(0.65 0.005 200)",
  "--accent": "oklch(0.70 0.15 185)",
  "--accent-foreground": "oklch(0.98 0.003 200)",
  "--success": "oklch(0.65 0.18 145)",
  "--success-foreground": "oklch(0.98 0.003 200)",
  "--warning": "oklch(0.75 0.18 65)",
  "--warning-foreground": "oklch(0.98 0.003 200)",
  "--error": "oklch(0.65 0.22 25)",
  "--error-foreground": "oklch(0.98 0.003 200)",
  "--destructive": "oklch(0.65 0.22 25)",
  "--destructive-foreground": "oklch(0.98 0.003 200)",
  "--info": "oklch(0.65 0.18 250)",
  "--info-foreground": "oklch(0.98 0.003 200)",
  "--border": "oklch(0.20 0.01 200)",
  "--input": "oklch(0.15 0.01 200)",
  "--ring": "oklch(0.68 0.20 275)",
  "--chart-1": "oklch(0.68 0.20 275)",
  "--chart-2": "oklch(0.65 0.18 145)",
  "--chart-3": "oklch(0.65 0.18 250)",
  "--chart-4": "oklch(0.70 0.25 340)",
  "--chart-5": "oklch(0.70 0.15 185)",
  "--glass-bg": "oklch(0.12 0.01 200 / 0.5)",
  "--glass-bg-hover": "oklch(0.12 0.01 200 / 0.7)",
  "--glass-border": "oklch(0.68 0.20 275 / 0.2)",
  "--glass-shadow": "0 8px 32px 0 oklch(0 0 0 / 0.6)",
  "--glass-blur": "16px",
};

const SAHA_UI_KEYFRAMES = {
  "gradient-x": `@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}`,
  "draw-circle": `@keyframes draw-circle {
  to {
    stroke-dashoffset: 0;
  }
}`,
  "draw-check": `@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}`,
  "draw-x": `@keyframes draw-x {
  to {
    stroke-dashoffset: 0;
  }
}`,
  "shake": `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}`,
  "bounce-in": `@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`,
  "jelly": `@keyframes jelly {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.25, 0.75); }
  40% { transform: scale(0.75, 1.25); }
  50% { transform: scale(1.15, 0.85); }
  65% { transform: scale(0.95, 1.05); }
  75% { transform: scale(1.05, 0.95); }
  100% { transform: scale(1, 1); }
}`,
  "rubber-band": `@keyframes rubber-band {
  0% { transform: scale(1); }
  30% { transform: scale(1.25, 0.75); }
  40% { transform: scale(0.75, 1.25); }
  50% { transform: scale(1.15, 0.85); }
  65% { transform: scale(0.95, 1.05); }
  75% { transform: scale(1.05, 0.95); }
  100% { transform: scale(1); }
}`,
  "swing": `@keyframes swing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}`,
  "tada": `@keyframes tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
}`,
  "heartbeat": `@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}`,
  "progress-stripes": `@keyframes progress-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 1.5rem 0; }
}`,
  "progress-indeterminate": `@keyframes progress-indeterminate {
  0% { left: -40%; transform: scaleX(0.6); }
  50% { transform: scaleX(1); }
  100% { left: 100%; transform: scaleX(0.6); }
}`,
  "progress-shimmer": `@keyframes progress-shimmer {
  0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
  10% { opacity: 1; }
  50% { transform: translateX(0%) scaleX(1); }
  90% { opacity: 1; }
  100% { transform: translateX(100%) scaleX(0); opacity: 0; }
}`,
  "progress-glow-pulse": `@keyframes progress-glow-pulse {
  0%, 100% { filter: brightness(1) saturate(1); }
  50% { filter: brightness(1.15) saturate(1.2); }
}`,
  "collapsible-down": `@keyframes collapsible-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-collapsible-content-height); opacity: 1; }
}`,
  "collapsible-up": `@keyframes collapsible-up {
  from { height: var(--radix-collapsible-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}`,
};

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

// Full CSS payloads for Tailwind v4 and v3. These strings are used
// by the CLI when performing a full CSS replace or fresh install.
const SAHA_UI_TAILWIND_V4_CSS = `@import "tailwindcss";

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
  --animate-slide-left: slide-left 0.2s ease-out;
    --animate-slide-right: slide-right 0.2s ease-out;
    --animate-fade-in: fade-in 0.2s ease-out;
    --animate-fade-out: fade-out 0.15s ease-in;
    --animate-scale-in: scale-in 0.2s ease-out;
    --animate-scale-out: scale-out 0.15s ease-in;
    --animate-slide-in-from-top: slide-in-from-top 0.2s ease-out;
    --animate-slide-out-to-top: slide-out-to-top 0.15s ease-in;
    --animate-slide-in-from-bottom: slide-in-from-bottom 0.2s ease-out;
    --animate-slide-out-to-bottom: slide-out-to-bottom 0.15s ease-in;
    --animate-zoom-in: zoom-in 0.2s ease-out;
    --animate-zoom-out: zoom-out 0.15s ease-in;
}

:root {
  --radius: 0.625rem;

  /* Background colors - light gradient base */
  --background: oklch(0.98 0.003 200);
  --foreground: oklch(0.15 0.01 200);

  /* Card colors - pure white for clean look */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.01 200);

  /* Popover colors */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.01 200);

  /* Primary colors - indigo/purple (matching your current #6366f1) */
  --primary: oklch(48.151% 0.23085 269.463);
  --primary-foreground: oklch(1 0 0);

  /* Secondary colors - pink (matching your #ec4899) */
  --secondary: oklch(0.65 0.25 340);
  --secondary-foreground: oklch(1 0 0);

  /* Muted colors - subtle grays */
  --muted: oklch(0.96 0.005 200);
  --muted-foreground: oklch(0.45 0.01 200);

  /* Accent colors - teal (matching your #14b8a6) */
  --accent: oklch(0.65 0.12 185);
  --accent-foreground: oklch(1 0 0);

  /* Success colors - green */
  --success: oklch(0.60 0.15 145);
  --success-foreground: oklch(1 0 0);

  /* Warning colors - orange */
  --warning: oklch(0.70 0.15 65);
  --warning-foreground: oklch(0.15 0.01 200);

  /* Error/Destructive colors - red */
  --error: oklch(0.60 0.20 25);
  --error-foreground: oklch(1 0 0);
  --destructive: oklch(0.60 0.20 25);
  --destructive-foreground: oklch(1 0 0);

  /* Info colors - blue */
  --info: oklch(0.60 0.15 250);
  --info-foreground: oklch(1 0 0);

  /* Border and input colors */
  --border: oklch(0.92 0.005 200);
  --input: oklch(0.96 0.005 200);
  --ring: oklch(0.60 0.18 275);

  /* Chart colors */
  --chart-1: oklch(0.60 0.18 275);
  --chart-2: oklch(0.60 0.15 145);
  --chart-3: oklch(0.60 0.15 250);
  --chart-4: oklch(0.65 0.25 340);
  --chart-5: oklch(0.65 0.12 185);

  /* Glass effect variables - Light mode */
  --glass-bg: oklch(1 0 0 / 0.25);
  --glass-bg-hover: oklch(1 0 0 / 0.35);
  --glass-border: oklch(0.60 0.18 275 / 0.15);
  --glass-shadow: 0 8px 32px 0 oklch(0.60 0.18 275 / 0.12);
  --glass-blur: 16px;
}

.dark {
  /* Dark mode - pure dark theme */
  --background: oklch(0.08 0.005 200);
  --foreground: oklch(0.95 0.005 200);

  --card: oklch(0.12 0.01 200);
  --card-foreground: oklch(0.95 0.005 200);

  --popover: oklch(0.12 0.01 200);
  --popover-foreground: oklch(0.95 0.005 200);

  /* Primary - brighter indigo for dark mode */
  --primary: oklch(41.145% 0.14945 272.396);
  --primary-foreground: oklch(0.98 0.003 200);

  /* Secondary - brighter pink for dark mode */
  --secondary: oklch(0.70 0.25 340);
  --secondary-foreground: oklch(0.98 0.003 200);

  --muted: oklch(0.15 0.01 200);
  --muted-foreground: oklch(0.65 0.005 200);

  /* Accent - brighter teal for dark mode */
  --accent: oklch(0.70 0.15 185);
  --accent-foreground: oklch(0.98 0.003 200);

  /* Success - brighter green */
  --success: oklch(0.65 0.18 145);
  --success-foreground: oklch(0.98 0.003 200);

  /* Warning - brighter orange */
  --warning: oklch(0.75 0.18 65);
  --warning-foreground: oklch(0.98 0.003 200);

  /* Error - brighter red */
  --error: oklch(0.65 0.22 25);
  --error-foreground: oklch(0.98 0.003 200);
  --destructive: oklch(0.65 0.22 25);
  --destructive-foreground: oklch(0.98 0.003 200);

  /* Info - brighter blue */
  --info: oklch(0.65 0.18 250);
  --info-foreground: oklch(0.98 0.003 200);

  --border: oklch(0.20 0.01 200);
  --input: oklch(0.15 0.01 200);
  --ring: oklch(0.68 0.20 275);

  /* Dark mode chart colors */
  --chart-1: oklch(0.68 0.20 275);
  --chart-2: oklch(0.65 0.18 145);
  --chart-3: oklch(0.65 0.18 250);
  --chart-4: oklch(0.70 0.25 340);
  --chart-5: oklch(0.70 0.15 185);

  /* Glass effect variables - Dark mode */
  --glass-bg: oklch(0.12 0.01 200 / 0.5);
  --glass-bg-hover: oklch(0.12 0.01 200 / 0.7);
  --glass-border: oklch(0.68 0.20 275 / 0.2);
  --glass-shadow: 0 8px 32px 0 oklch(0 0 0 / 0.6);
  --glass-blur: 16px;
}

/* (rest of index.css omitted here for brevity in the script constant)
  Full detailed CSS (animations, utilities, components, etc.) is loaded
  from src/index.css during runtime for editing operations. */`;

// Tailwind v3 variant: keep same payload but prefer @tailwind directives
const SAHA_UI_TAILWIND_V3_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base Saha UI CSS (same tokens & rules as v4 payload) */
` + SAHA_UI_TAILWIND_V4_CSS;
const CSS_V4 = `@import "tailwindcss";

@custom-variant dark(&: is(.dark *));

@theme inline {
  --radius - sm: calc(var(--radius) - 4px);
  --radius - md: calc(var(--radius) - 2px);
  --radius - lg: var(--radius);
  --radius - xl: calc(var(--radius) + 4px);

  --color - background: var(--background);
  --color - foreground: var(--foreground);
  --color - card: var(--card);
  --color - card - foreground: var(--card - foreground);
  --color - popover: var(--popover);
  --color - popover - foreground: var(--popover - foreground);
  --color - primary: var(--primary);
  --color - primary - foreground: var(--primary - foreground);
  --color - secondary: var(--secondary);
  --color - secondary - foreground: var(--secondary - foreground);
  --color - muted: var(--muted);
  --color - muted - foreground: var(--muted - foreground);
  --color - accent: var(--accent);
  --color - accent - foreground: var(--accent - foreground);
  --color - destructive: var(--destructive);
  --color - destructive - foreground: var(--destructive - foreground);
  --color - border: var(--border);
  --color - input: var(--input);
  --color - ring: var(--ring);
  --color - chart - 1: var(--chart - 1);
  --color - chart - 2: var(--chart - 2);
  --color - chart - 3: var(--chart - 3);
  --color - chart - 4: var(--chart - 4);
  --color - chart - 5: var(--chart - 5);
  --color - success: var(--success);
  --color - success - foreground: var(--success - foreground);
  --color - warning: var(--warning);
  --color - warning - foreground: var(--warning - foreground);
  --color - error: var(--error);
  --color - error - foreground: var(--error - foreground);
  --color - info: var(--info);
  --color - info - foreground: var(--info - foreground);
}

:root {
  --radius: 0.625rem;
  --background: oklch(0.98 0.003 200);
  --foreground: oklch(0.15 0.01 200);
  --card: oklch(1 0 0);
  --card - foreground: oklch(0.15 0.01 200);
  --popover: oklch(1 0 0);
  --popover - foreground: oklch(0.15 0.01 200);
  --primary: oklch(48.151 % 0.23085 269.463);
  --primary - foreground: oklch(1 0 0);
  --secondary: oklch(0.65 0.25 340);
  --secondary - foreground: oklch(1 0 0);
  --muted: oklch(0.96 0.005 200);
  --muted - foreground: oklch(0.45 0.01 200);
  --accent: oklch(0.65 0.12 185);
  --accent - foreground: oklch(1 0 0);
  --success: oklch(0.60 0.15 145);
  --success - foreground: oklch(1 0 0);
  --warning: oklch(0.70 0.15 65);
  --warning - foreground: oklch(0.15 0.01 200);
  --error: oklch(0.60 0.20 25);
  --error - foreground: oklch(1 0 0);
  --destructive: oklch(0.60 0.20 25);
  --destructive - foreground: oklch(1 0 0);
  --info: oklch(0.60 0.15 250);
  --info - foreground: oklch(1 0 0);
  --border: oklch(0.92 0.005 200);
  --input: oklch(0.96 0.005 200);
  --ring: oklch(0.60 0.18 275);
  --chart - 1: oklch(0.60 0.18 275);
  --chart - 2: oklch(0.60 0.15 145);
  --chart - 3: oklch(0.60 0.15 250);
  --chart - 4: oklch(0.65 0.25 340);
  --chart - 5: oklch(0.65 0.12 185);

  --glass - bg: oklch(1 0 0 / 0.25);
  --glass - bg - hover: oklch(1 0 0 / 0.35);
  --glass - border: oklch(0.60 0.18 275 / 0.15);
  --glass - shadow: 0 8px 32px 0 oklch(0.60 0.18 275 / 0.12);
  --glass - blur: 16px;
}

.dark {
  --background: oklch(0.08 0.005 200);
  --foreground: oklch(0.95 0.005 200);
  --card: oklch(0.12 0.01 200);
  --card - foreground: oklch(0.95 0.005 200);
  --popover: oklch(0.12 0.01 200);
  --popover - foreground: oklch(0.95 0.005 200);
  --primary: oklch(41.145 % 0.14945 272.396);
  --primary - foreground: oklch(0.98 0.003 200);
  --secondary: oklch(0.70 0.25 340);
  --secondary - foreground: oklch(0.98 0.003 200);
  --muted: oklch(0.15 0.01 200);
  --muted - foreground: oklch(0.65 0.005 200);
  --accent: oklch(0.70 0.15 185);
  --accent - foreground: oklch(0.98 0.003 200);
  --success: oklch(0.65 0.18 145);
  --success - foreground: oklch(0.98 0.003 200);
  --warning: oklch(0.75 0.18 65);
  --warning - foreground: oklch(0.98 0.003 200);
  --error: oklch(0.65 0.22 25);
  --error - foreground: oklch(0.98 0.003 200);
  --destructive: oklch(0.65 0.22 25);
  --destructive - foreground: oklch(0.98 0.003 200);
  --info: oklch(0.65 0.18 250);
  --info - foreground: oklch(0.98 0.003 200);
  --border: oklch(0.20 0.01 200);
  --input: oklch(0.15 0.01 200);
  --ring: oklch(0.68 0.20 275);
  --chart - 1: oklch(0.68 0.20 275);
  --chart - 2: oklch(0.65 0.18 145);
  --chart - 3: oklch(0.65 0.18 250);
  --chart - 4: oklch(0.70 0.25 340);
  --chart - 5: oklch(0.70 0.15 185);

  --glass - bg: oklch(0.12 0.01 200 / 0.5);
  --glass - bg - hover: oklch(0.12 0.01 200 / 0.7);
  --glass - border: oklch(0.68 0.20 275 / 0.2);
  --glass - shadow: 0 8px 32px 0 oklch(0 0 0 / 0.6);
  --glass - blur: 16px;
}

@layer base {
  * {
    @apply border - border outline - ring / 50;
}
  
  body {
  @apply bg - background text - foreground;
  background: linear - gradient(
    135deg,
    oklch(0.98 0.003 200) 0 %,
    oklch(0.96 0.02 270) 50 %,
    oklch(0.98 0.02 340) 100 %
    );
  background - attachment: fixed;
  font - family: -apple - system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans - serif;
  -webkit - font - smoothing: antialiased;
  -moz - osx - font - smoothing: grayscale;
}
  
  .dark body {
  @apply text - foreground;
  color: oklch(0.95 0.005 200);
  background: linear - gradient(
    135deg,
    oklch(0.08 0.005 200) 0 %,
    oklch(0.10 0.01 200) 50 %,
    oklch(0.12 0.01 200) 100 %
    );
  background - attachment: fixed;
}
  
  .dark {
  color - scheme: dark;
}
}

@layer components {
  .glass {
    background: var(--glass - bg);
    backdrop - filter: blur(var(--glass - blur)) saturate(180 %);
    -webkit - backdrop - filter: blur(var(--glass - blur)) saturate(180 %);
    border: 1px solid var(--glass - border);
    box - shadow: var(--glass - shadow);
    position: relative;
  }
  
  .glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border - radius: inherit;
    padding: 1px;
    background: linear - gradient(
      135deg,
      oklch(1 0 0 / 0.4) 0 %,
      oklch(1 0 0 / 0.1) 50 %,
      oklch(1 0 0 / 0) 100 %
    );
    -webkit - mask: linear - gradient(#fff 0 0) content - box, linear - gradient(#fff 0 0);
    -webkit - mask - composite: xor;
    mask: linear - gradient(#fff 0 0) content - box, linear - gradient(#fff 0 0);
    mask - composite: exclude;
    pointer - events: none;
  }
  
  .dark.glass::before {
    background: linear - gradient(
      135deg,
      oklch(0.68 0.20 275 / 0.3) 0 %,
      oklch(0.68 0.20 275 / 0.1) 50 %,
      oklch(0.68 0.20 275 / 0) 100 %
    );
  }
  
  .glass - hover:hover {
    background: var(--glass - bg - hover);
    transform: translateY(-2px);
    box - shadow: 0 12px 48px 0 oklch(0.60 0.18 275 / 0.2);
  }
  
  .dark.glass - hover:hover {
    box - shadow: 0 12px 48px 0 oklch(0 0 0 / 0.7);
  }
  
  .glass - strong {
    background: var(--glass - bg);
    backdrop - filter: blur(24px) saturate(200 %);
    -webkit - backdrop - filter: blur(24px) saturate(200 %);
    border: 1px solid var(--glass - border);
    box - shadow: var(--glass - shadow), inset 0 1px 0 oklch(1 0 0 / 0.3);
  }
  
  .dark.glass - strong {
    box - shadow: var(--glass - shadow), inset 0 1px 0 oklch(0.68 0.20 275 / 0.2);
  }
  
  .glass - subtle {
    background: var(--glass - bg);
    backdrop - filter: blur(8px) saturate(150 %);
    -webkit - backdrop - filter: blur(8px) saturate(150 %);
    border: 1px solid var(--glass - border);
    box - shadow: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  }
}

@layer utilities {
  @keyframes gradient - x {
    0 %, 100 % { background- position: 0 % 50 %;
  }
  50 % { background- position: 100 % 50 %;
}
  }

@keyframes draw - circle {
    to { stroke - dashoffset: 0; }
}

@keyframes draw - check {
    to { stroke - dashoffset: 0; }
}

@keyframes draw - x {
    to { stroke - dashoffset: 0; }
}

@keyframes shake {
  0 %, 100 % { transform: translateX(0); }
  25 % { transform: translateX(-2px); }
  75 % { transform: translateX(2px); }
}

@keyframes bounce -in {
  0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes jelly {
  0 % { transform: scale(1, 1); }
  30 % { transform: scale(1.25, 0.75); }
  40 % { transform: scale(0.75, 1.25); }
  50 % { transform: scale(1.15, 0.85); }
  65 % { transform: scale(0.95, 1.05); }
  75 % { transform: scale(1.05, 0.95); }
  100 % { transform: scale(1, 1); }
}

@keyframes rubber - band {
  0 % { transform: scale(1); }
  30 % { transform: scale(1.25, 0.75); }
  40 % { transform: scale(0.75, 1.25); }
  50 % { transform: scale(1.15, 0.85); }
  65 % { transform: scale(0.95, 1.05); }
  75 % { transform: scale(1.05, 0.95); }
  100 % { transform: scale(1); }
}

@keyframes swing {
  20 % { transform: rotate(15deg); }
  40 % { transform: rotate(-10deg); }
  60 % { transform: rotate(5deg); }
  80 % { transform: rotate(-5deg); }
  100 % { transform: rotate(0deg); }
}

@keyframes tada {
  0 % { transform: scale(1); }
  10 %, 20 % { transform: scale(0.9) rotate(- 3deg);
}
30 %, 50 %, 70 %, 90 % { transform: scale(1.1) rotate(3deg); }
40 %, 60 %, 80 % { transform: scale(1.1) rotate(- 3deg); }
100 % { transform: scale(1) rotate(0); }
  }

@keyframes heartbeat {
  0 % { transform: scale(1); }
  14 % { transform: scale(1.3); }
  28 % { transform: scale(1); }
  42 % { transform: scale(1.3); }
  70 % { transform: scale(1); }
}

@keyframes progress - stripes {
  0 % { background- position: 0 0;
}
100 % { background- position: 1.5rem 0; }
  }

@keyframes progress - indeterminate {
  0 % { left: -40 %; transform: scaleX(0.6); }
  50 % { transform: scaleX(1); }
  100 % { left: 100 %; transform: scaleX(0.6); }
}

@keyframes progress - shimmer {
  0 % { transform: translateX(-100 %) scaleX(0); opacity: 0; }
  10 % { opacity: 1; }
  50 % { transform: translateX(0 %) scaleX(1); }
  90 % { opacity: 1; }
  100 % { transform: translateX(100 %) scaleX(0); opacity: 0; }
}

@keyframes progress - glow - pulse {
  0 %, 100 % { filter: brightness(1) saturate(1); }
  50 % { filter: brightness(1.15) saturate(1.2); }
}

@keyframes collapsible - down {
    from { height: 0; opacity: 0; }
    to { height: var(--radix - collapsible - content - height); opacity: 1; }
}

@keyframes collapsible - up {
    from { height: var(--radix - collapsible - content - height); opacity: 1; }
    to { height: 0; opacity: 0; }
}
/* Progress bar animation */
@keyframes progress - indeterminate {
  0 % {
    transform: translateX(-100 %);
  }
  100 % {
    transform: translateX(400 %);
  }
}

.animate - progress - indeterminate {
  animation: progress - indeterminate 1.5s ease -in -out infinite;
}

/* Tailwind animate-in classes (if not using tailwindcss-animate) */
@keyframes enter {
  from {
    opacity: var(--tw - enter - opacity, 1);
    transform: translate3d(
        var(--tw - enter - translate - x, 0),
        var(--tw - enter - translate - y, 0),
      0
      )
    scale3d(
        var(--tw - enter - scale, 1),
        var(--tw - enter - scale, 1),
        var(--tw - enter - scale, 1)
      )
    rotate(var(--tw - enter - rotate, 0));
  }
}

.animate -in {
  animation- name: enter;
animation - duration: 150ms;
--tw - enter - opacity: initial;
--tw - enter - scale: initial;
--tw - enter - rotate: initial;
--tw - enter - translate - x: initial;
--tw - enter - translate - y: initial;
}

.fade -in {
  --tw - enter - opacity: 0;
}

.slide -in -from - top {
  --tw - enter - translate - y: -100 %;
}

.slide -in -from - bottom {
  --tw - enter - translate - y: 100 %;
}

.duration - 300 {
  animation - duration: 300ms;
}
  /* Utility classes */
  .animate - bounce -in { animation: bounce -in 0.3s ease- out; }
  .animate - shake { animation: shake 0.5s ease -in -out; }
  .animate - jelly { animation: jelly 0.5s ease -in -out; }
  .animate - rubber - band { animation: rubber - band 0.5s ease -in -out; }
  .animate - swing { animation: swing 0.5s ease -in -out; }
  .animate - tada { animation: tada 0.5s ease -in -out; }
  .animate - heartbeat { animation: heartbeat 0.5s ease -in -out; }

  .clip - path - hexagon { clip - path: polygon(50 % 0 %, 100 % 25 %, 100 % 75 %, 50 % 100 %, 0 % 75 %, 0 % 25 %); }
  .clip - path - octagon { clip - path: polygon(30 % 0 %, 70 % 0 %, 100 % 30 %, 100 % 70 %, 70 % 100 %, 30 % 100 %, 0 % 70 %, 0 % 30 %); }
  .clip - path - shield { clip - path: polygon(50 % 0 %, 100 % 0 %, 100 % 75 %, 50 % 100 %, 0 % 75 %, 0 % 0 %); }

  .ease - elastic { transition - timing - function: cubic- bezier(0.68, -0.55, 0.265, 1.55); }
  .ease - bounce { transition - timing - function: cubic- bezier(0.68, -0.55, 0.265, 1.55); }

  .scrollbar - none {
  -ms - overflow - style: none;
  scrollbar - width: none;
}
  .scrollbar - none:: -webkit - scrollbar { display: none; }

[ role = "menu" ], [ role = "listbox" ] {
  -ms - overflow - style: none;
  scrollbar - width: none;
}
[ role = "menu" ]:: -webkit - scrollbar,
  [ role = "listbox" ]:: -webkit - scrollbar { display: none; }

[ contenteditable ][ data - placeholder ]: empty:before {
  content: attr(data - placeholder);
  color: hsl(var(--muted - foreground));
  opacity: 0.5;
  pointer - events: none;
}

[ contenteditable ]: focus: empty:before {
  content: attr(data - placeholder);
  color: hsl(var(--muted - foreground));
  opacity: 0.3;
}

input[ type = "number" ] {
  -moz - appearance: textfield;
  -webkit - appearance: none;
  appearance: none;
}
input[ type = "number" ]:: -webkit - inner - spin - button,
  input[ type = "number" ]:: -webkit - outer - spin - button {
  -webkit - appearance: none;
  margin: 0;
}
}

@media(prefers - reduced - motion: reduce) {
  *, *:: before, *::after {
    animation - duration: 0.01ms!important;
    animation - iteration - count: 1!important;
  }
} `;

// CSS for Tailwind v3
const CSS_V3 = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 0.625rem;
  --background: 0 0 % 98 %;
  --foreground: 222 47 % 11 %;
  --card: 0 0 % 100 %;
  --card - foreground: 222 47 % 11 %;
  --popover: 0 0 % 100 %;
  --popover - foreground: 222 47 % 11 %;
  --primary: 269 70 % 48 %;
  --primary - foreground: 0 0 % 100 %;
  --secondary: 340 75 % 65 %;
  --secondary - foreground: 0 0 % 100 %;
  --muted: 220 13 % 95 %;
  --muted - foreground: 220 9 % 46 %;
  --accent: 185 50 % 65 %;
  --accent - foreground: 0 0 % 100 %;
  --success: 145 60 % 60 %;
  --success - foreground: 0 0 % 100 %;
  --warning: 65 60 % 70 %;
  --warning - foreground: 222 47 % 11 %;
  --error: 25 80 % 60 %;
  --error - foreground: 0 0 % 100 %;
  --destructive: 25 80 % 60 %;
  --destructive - foreground: 0 0 % 100 %;
  --info: 250 60 % 60 %;
  --info - foreground: 0 0 % 100 %;
  --border: 220 13 % 91 %;
  --input: 220 13 % 95 %;
  --ring: 275 70 % 60 %;
}

.dark {
  --background: 222 47 % 8 %;
  --foreground: 220 13 % 95 %;
  --card: 222 47 % 12 %;
  --card - foreground: 220 13 % 95 %;
  --popover: 222 47 % 12 %;
  --popover - foreground: 220 13 % 95 %;
  --primary: 272 60 % 41 %;
  --primary - foreground: 0 0 % 98 %;
  --secondary: 340 75 % 70 %;
  --secondary - foreground: 0 0 % 98 %;
  --muted: 222 47 % 15 %;
  --muted - foreground: 220 13 % 65 %;
  --accent: 185 60 % 70 %;
  --accent - foreground: 0 0 % 98 %;
  --success: 145 70 % 65 %;
  --success - foreground: 0 0 % 98 %;
  --warning: 65 70 % 75 %;
  --warning - foreground: 0 0 % 98 %;
  --error: 25 85 % 65 %;
  --error - foreground: 0 0 % 98 %;
  --destructive: 25 85 % 65 %;
  --destructive - foreground: 0 0 % 98 %;
  --info: 250 70 % 65 %;
  --info - foreground: 0 0 % 98 %;
  --border: 222 47 % 20 %;
  --input: 222 47 % 15 %;
  --ring: 275 75 % 68 %;
}

@layer base {
  * {
    @apply border - border;
}
  
  body {
  @apply bg - background text - foreground;
  font - family: -apple - system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans - serif;
  -webkit - font - smoothing: antialiased;
  -moz - osx - font - smoothing: grayscale;
}
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop - filter: blur(16px) saturate(180 %);
    -webkit - backdrop - filter: blur(16px) saturate(180 %);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .dark.glass {
    background: rgba(18, 18, 23, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }
} `;

// ----------------------------------------------
// Calculate relative path from a file to node_modules
// ----------------------------------------------
const getRelativePathToNodeModules = (fromFile) => {
  const fromDir = path.dirname(fromFile);
  const nodeModulesPath = path.join(R, "node_modules");
  let relativePath = path.relative(fromDir, nodeModulesPath);

  relativePath = relativePath.replace(/\\/g, '/');

  if (!relativePath) {
    relativePath = '.';
  } else if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }

  return relativePath;
};

// ----------------------------------------------
// Update Tailwind config for v3
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
    console.log("\n📝 Please manually create tailwind.config.js and add saha-ui content path.");
    return;
  }

  const relativePathToNodeModules = getRelativePathToNodeModules(configPath);
  const sahaUIContentPath = `${ relativePathToNodeModules } /saha-ui/dist/**/ *.js`;

  let config = rd(configPath);
  const contentPattern = /node_modules\/saha-ui\/dist\/\*\*\/\*\.js/;

  if (contentPattern.test(config)) {
    console.log("✅ Tailwind config already includes saha-ui content path");
  } else {
    const contentArrayRegex = /content\s*:\s*\[([\s\S]*?)\]/;
    const match = config.match(contentArrayRegex);

    if (match) {
      const currentContent = match[ 1 ];
      const newContentPath = `\n    "${sahaUIContentPath}", `;
      const updatedContent = currentContent.trimEnd() + newContentPath;
      config = config.replace(contentArrayRegex, `content: [ ${ updatedContent }\n ]`);

      wr(configPath, config);
      console.log(`✅ Added saha - ui content path to ${ path.relative(R, configPath) } `);
    } else {
      console.warn("⚠️  Could not automatically update content array");
      console.log(`\n📝 Please manually add: "${sahaUIContentPath}"`);
    }
  }
};

// ----------------------------------------------
// Smart Inject with Merge/Replace Options
// ----------------------------------------------
const inject = async (f, tailwindInfo) => {
  const ex = fE(f);
  const cur = ex ? rd(f) : "";

  // Detect existing structures
  const structures = detectExistingStructures(cur);
  const hasExistingSetup = structures.hasRoot || structures.hasDark || structures.hasLayerBase;

  // Check if already injected
  if (cur.includes(M)) {
    console.log(`✅ saha - ui: CSS already injected in ${ path.relative(R, f) } `);
    return;
  }

  let mode = "fresh"; // fresh, replace, merge

  // If existing setup detected, ask user what to do
  if (hasExistingSetup) {
    console.log("\n⚠️  Existing CSS setup detected in your file:");
    if (structures.hasRoot) console.log("   • :root variables found");
    if (structures.hasDark) console.log("   • .dark variables found");
    if (structures.hasLayerBase) console.log("   • @layer base found");
    if (structures.hasLayerComponents) console.log("   • @layer components found");
    if (structures.hasLayerUtilities) console.log("   • @layer utilities found");
    if (structures.hasKeyframes) console.log("   • @keyframes found");
    if (structures.hasGlassClass) console.log("   • .glass class found");

    mode = await selectPrompt(
      "\nHow would you like to handle existing styles?",
      [
        { label: "Replace all - Overwrite existing styles with saha-ui defaults", value: "replace" },
        { label: "Merge - Keep your values, add missing saha-ui variables", value: "merge" },
        { label: "Skip - Don't modify existing styles, only add new sections", value: "skip" },
      ]
    );

    console.log(`\n📝 Selected mode: ${ mode } \n`);
  }

  const CSS = tailwindInfo.major >= 4 ? CSS_V4 : CSS_V3;

  // Handle based on mode
  if (mode === "fresh" || mode === "replace") {
    // Full replacement or fresh install
    let out = "";

    if (mode === "replace") {
      // Remove existing blocks that we'll replace
      let cleanedCss = cur;

      // Remove :root block
      const rootBlock = extractBlock(cleanedCss, /:root\s*\{/);
      if (rootBlock) {
        cleanedCss = cleanedCss.substring(0, rootBlock.startIndex) + cleanedCss.substring(rootBlock.endIndex);
      }

      // Remove .dark block
      const darkBlock = extractBlock(cleanedCss, /\.dark\s*\{/);
      if (darkBlock) {
        cleanedCss = cleanedCss.substring(0, darkBlock.startIndex) + cleanedCss.substring(darkBlock.endIndex);
      }

      // Remove @theme inline block (v4)
      const themeBlock = extractBlock(cleanedCss, /@theme\s+inline\s*\{/);
      if (themeBlock) {
        cleanedCss = cleanedCss.substring(0, themeBlock.startIndex) + cleanedCss.substring(themeBlock.endIndex);
      }

      // Remove @layer base block
      const baseBlock = extractBlock(cleanedCss, /@layer\s+base\s*\{/);
      if (baseBlock) {
        cleanedCss = cleanedCss.substring(0, baseBlock.startIndex) + cleanedCss.substring(baseBlock.endIndex);
      }

      // Remove @layer components block
      const componentsBlock = extractBlock(cleanedCss, /@layer\s+components\s*\{/);
      if (componentsBlock) {
        cleanedCss = cleanedCss.substring(0, componentsBlock.startIndex) + cleanedCss.substring(componentsBlock.endIndex);
      }

      // Remove @layer utilities block
      const utilitiesBlock = extractBlock(cleanedCss, /@layer\s+utilities\s*\{/);
      if (utilitiesBlock) {
        cleanedCss = cleanedCss.substring(0, utilitiesBlock.startIndex) + cleanedCss.substring(utilitiesBlock.endIndex);
      }

      // Remove @custom-variant dark
      cleanedCss = cleanedCss.replace(/@custom-variant\s+dark\s*\([^)]*\)\s*;?\n*/g, "");

      // Clean up multiple empty lines
      cleanedCss = cleanedCss.replace(/\n{3,}/g, "\n\n").trim();

      // Now inject the CSS
      let cssToInject = CSS;

      // Check if tailwind import/directives exist
      if (structures.hasTailwindImport) {
        cssToInject = CSS.replace(/^@import\s+["']tailwindcss["'][^;]*;?\n*/, "").trim();
        out = cleanedCss.replace(/@import\s+["']tailwindcss["'][^;]*;/, (m) => `${ m } \n${ M } \n${ cssToInject } `);
      } else if (structures.hasTailwindDirectives) {
        cssToInject = CSS.replace(/@tailwind\s+(base|components|utilities);?\n*/g, "").trim();
        const tailwindDirectives = cleanedCss.match(/@tailwind\s+(base|components|utilities);?\n*/g);
        if (tailwindDirectives) {
          const lastDirective = tailwindDirectives[ tailwindDirectives.length - 1 ];
          const lastIndex = cleanedCss.lastIndexOf(lastDirective);
          const beforeDirective = cleanedCss.substring(0, lastIndex + lastDirective.length);
          const afterDirective = cleanedCss.substring(lastIndex + lastDirective.length);
          out = `${ beforeDirective } \n${ M } \n${ cssToInject } \n${ afterDirective } `;
        } else {
          out = `${ M } \n${ cssToInject } \n\n${ cleanedCss } `;
        }
      } else {
        out = cleanedCss ? `${ cleanedCss } \n\n${ M } \n${ CSS } ` : `${ M } \n${ CSS } `;
      }

      console.log("✅ Replaced existing styles with saha-ui defaults");
    } else {
      // Fresh install
      if (structures.hasTailwindImport) {
        const cssToInject = CSS.replace(/^@import\s+["']tailwindcss["'][^;]*;?\n*/, "").trim();
        out = cur.replace(/@import\s+["']tailwindcss["'][^;]*;/, (m) => `${ m } \n${ M } \n${ cssToInject } `);
      } else if (structures.hasTailwindDirectives) {
        const cssToInject = CSS.replace(/@tailwind\s+(base|components|utilities);?\n*/g, "").trim();
        const tailwindDirectives = cur.match(/@tailwind\s+(base|components|utilities);?\n*/g);
        if (tailwindDirectives) {
          const lastDirective = tailwindDirectives[ tailwindDirectives.length - 1 ];
          const lastIndex = cur.lastIndexOf(lastDirective);
          out = `${ cur.substring(0, lastIndex + lastDirective.length) } \n${ M } \n${ cssToInject } \n${ cur.substring(lastIndex + lastDirective.length) } `;
        } else {
          out = `${ M } \n${ CSS } \n\n${ cur } `;
        }
      } else {
        out = `${ M } \n${ CSS } \n\n${ cur } `;
      }
    }

    safeWrite(f, out, { backup: true, validate: true });
  } else if (mode === "merge") {
    // Merge mode - add missing variables
    let updatedCss = cur;
    let totalAdded = 0;

    // Merge :root variables
    const rootResult = updateRootBlock(updatedCss, SAHA_UI_ROOT_VARIABLES, "merge");
    updatedCss = rootResult.css;
    if (rootResult.added > 0) {
      console.log(`   ✅ Added ${ rootResult.added } missing:root variables`);
      totalAdded += rootResult.added;
    }

    // Merge .dark variables
    const darkResult = updateDarkBlock(updatedCss, SAHA_UI_DARK_VARIABLES, "merge");
    updatedCss = darkResult.css;
    if (darkResult.added > 0) {
      console.log(`   ✅ Added ${ darkResult.added } missing.dark variables`);
      totalAdded += darkResult.added;
    }

    // Merge keyframes
    const keyframeResult = mergeKeyframes(updatedCss, SAHA_UI_KEYFRAMES);
    updatedCss = keyframeResult.css;
    if (keyframeResult.added > 0) {
      console.log(`   ✅ Added ${ keyframeResult.added } missing @keyframes`);
      totalAdded += keyframeResult.added;
    }

    // Merge @layer components and utilities (add missing classes/rules)
    try {
      const compBlock = extractBlock(SAHA_UI_TAILWIND_V4_CSS, /@layer\s+components\s*\{/);
      if (compBlock) {
        const compRes = updateLayerBlock(updatedCss, "components", compBlock.content, "merge");
        updatedCss = compRes.css;
        if (compRes.added > 0) {
          console.log(`   ✅ Added ${ compRes.added } missing @layer components rules`);
          totalAdded += compRes.added;
        }
      }

      const utilBlock = extractBlock(SAHA_UI_TAILWIND_V4_CSS, /@layer\s+utilities\s*\{/);
      if (utilBlock) {
        const utilRes = updateLayerBlock(updatedCss, "utilities", utilBlock.content, "merge");
        updatedCss = utilRes.css;
        if (utilRes.added > 0) {
          console.log(`   ✅ Added ${ utilRes.added } missing @layer utilities rules`);
          totalAdded += utilRes.added;
        }
      }
    } catch (err) {
      console.warn("⚠️  Failed to merge components/utilities block:", err.message);
    }

    // Add @custom-variant dark if missing (v4)
    if (tailwindInfo.major >= 4 && !structures.hasCustomVariant) {
      if (structures.hasTailwindImport) {
        updatedCss = updatedCss.replace(
          /@import\s+["']tailwindcss["'][^;]*;/,
          (m) => `${ m } \n\n @custom-variant dark(&: is(.dark *)); `
        );
        console.log(`   ✅ Added @custom-variant dark`);
      }
    }

    // Add @theme inline if missing (v4)
    if (tailwindInfo.major >= 4 && !structures.hasThemeInline) {
      const themeInline = `
@theme inline {
  --radius - sm: calc(var(--radius) - 4px);
  --radius - md: calc(var(--radius) - 2px);
  --radius - lg: var(--radius);
  --radius - xl: calc(var(--radius) + 4px);

  --color - background: var(--background);
  --color - foreground: var(--foreground);
  --color - card: var(--card);
  --color - card - foreground: var(--card - foreground);
  --color - popover: var(--popover);
  --color - popover - foreground: var(--popover - foreground);
  --color - primary: var(--primary);
  --color - primary - foreground: var(--primary - foreground);
  --color - secondary: var(--secondary);
  --color - secondary - foreground: var(--secondary - foreground);
  --color - muted: var(--muted);
  --color - muted - foreground: var(--muted - foreground);
  --color - accent: var(--accent);
  --color - accent - foreground: var(--accent - foreground);
  --color - destructive: var(--destructive);
  --color - destructive - foreground: var(--destructive - foreground);
  --color - border: var(--border);
  --color - input: var(--input);
  --color - ring: var(--ring);
  --color - chart - 1: var(--chart - 1);
  --color - chart - 2: var(--chart - 2);
  --color - chart - 3: var(--chart - 3);
  --color - chart - 4: var(--chart - 4);
  --color - chart - 5: var(--chart - 5);
  --color - success: var(--success);
  --color - success - foreground: var(--success - foreground);
  --color - warning: var(--warning);
  --color - warning - foreground: var(--warning - foreground);
  --color - error: var(--error);
  --color - error - foreground: var(--error - foreground);
  --color - info: var(--info);
  --color - info - foreground: var(--info - foreground);
} `;

      // Insert after @custom-variant or @import
      if (updatedCss.includes("@custom-variant dark")) {
        updatedCss = updatedCss.replace(
          /@custom-variant\s+dark\s*\([^)]*\)\s*;?/,
          (m) => `${ m } \n${ themeInline } `
        );
      } else if (structures.hasTailwindImport) {
        updatedCss = updatedCss.replace(
          /@import\s+["']tailwindcss["'][^;]*;/,
          (m) => `${ m } \n${ themeInline } `
        );
      }
      console.log(`   ✅ Added @theme inline block`);
    }

    // Add marker if not present
    if (!updatedCss.includes(M)) {
      if (structures.hasTailwindImport) {
        updatedCss = updatedCss.replace(/@import\s+["']tailwindcss["'][^;]*;/, (m) => `${ m } \n${ M } `);
      } else {
        updatedCss = `${ M } \n${ updatedCss } `;
      }
    }

    if (totalAdded > 0) {
      console.log(`\n✅ Merged ${ totalAdded } total items into your CSS`);
    } else {
      console.log("\n✅ Your CSS already has all required saha-ui variables");
    }

    safeWrite(f, updatedCss, { backup: true, validate: true });
  } else if (mode === "skip") {
    // Skip mode - only add marker and @source for v4
    let updatedCss = cur;

    if (!updatedCss.includes(M)) {
      if (structures.hasTailwindImport) {
        updatedCss = updatedCss.replace(/@import\s+["']tailwindcss["'][^;]*;/, (m) => `${ m } \n${ M } `);
      } else {
        updatedCss = `${ M } \n${ updatedCss } `;
      }
    }

    console.log("✅ Skipped style modifications, only added saha-ui marker");
    safeWrite(f, updatedCss, { backup: true, validate: true });
  }

  // Add @source for Tailwind v4
  const updatedContent = rd(f);
  if (tailwindInfo.major >= 4 && structures.hasTailwindImport) {
    const relativePathToNodeModules = getRelativePathToNodeModules(f);
    const sahaUISourcePath = `${ relativePathToNodeModules } /saha-ui/dist/**/ *.js`;
    const sourcePattern = /source\s+["'][^"']*saha-ui[^"']*["']/;

    if (!sourcePattern.test(updatedContent)) {
      const withSource = updatedContent.replace(
        /@import\s+["']tailwindcss["'];?/,
        `@import "tailwindcss"; \n @source "${sahaUISourcePath}"; `
      );
      safeWrite(f, withSource, { backup: true, validate: true });
      console.log(`✅ Added @source "${sahaUISourcePath}" for Tailwind v4`);
    }
  }

  console.log(`\n✅ saha - ui: CSS processed in ${ path.relative(R, f) } (${ F })`);
  console.log(`📦 Using Tailwind v${ tailwindInfo.major } configuration`);

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
const run = async () => {
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

  // 5) Inject CSS with smart merge/replace options
  await inject(pick(), tailwindInfo);

  console.log("\n✨ Done!\n");
};

run();