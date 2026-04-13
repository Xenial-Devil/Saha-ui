#!/usr/bin/env node

/**
 * Saha UI MCP Server - Enhanced Dynamic Version (v2.1.0 - Bug Fixed)
 *
 * Fixes from v2.0:
 * - Fixed regex `g` flag bug in searchInFiles (lastIndex persistence)
 * - Fixed detail_level enum mismatch ("brief" → "summary")
 * - Fixed fuzzy-matched component/hook name not propagated to callers
 * - Fixed HOOKS.find / COMPONENTS.find using unresolved original name
 * - Replaced `any[]` with proper generics in findBestMatch
 * - Added glob error handling for missing directories
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the Saha UI package
const SAHA_UI_ROOT = __dirname.includes("dist")
  ? path.resolve(__dirname, "..", "..")
  : path.resolve(__dirname, "..");

// ─── Types ────────────────────────────────────────────────────────────────────

interface SessionContext {
  recentComponents: string[];
  recentHooks: string[];
  userIntent: string | null;
  skillLevel: "beginner" | "intermediate" | "advanced";
  lastQuery: string | null;
  queryCount: number;
  timestamp: number;
}

interface ComponentMeta {
  name: string;
  category: string;
  complexity: "simple" | "medium" | "complex";
  tags: string[];
}

interface HookMeta {
  name: string;
  category: string;
  complexity: "simple" | "medium" | "complex";
  tags: string[];
}

interface UtilityMeta {
  name: string;
  file: string;
  description: string;
}

// ─── Session ──────────────────────────────────────────────────────────────────

const sessionContext: SessionContext = {
  recentComponents: [],
  recentHooks: [],
  userIntent: null,
  skillLevel: "intermediate",
  lastQuery: null,
  queryCount: 0,
  timestamp: Date.now(),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type ComplexityLevel = ComponentMeta["complexity"];

const SIMPLE_COMPONENTS = new Set<string>([
  "Affix",
  "AspectRatio",
  "Avatar",
  "Backdrop",
  "Badge",
  "Button",
  "Checkbox",
  "Chip",
  "Container",
  "Empty",
  "IconButton",
  "Image",
  "Kbd",
  "Label",
  "Link",
  "Paper",
  "PlayButton",
  "Progress",
  "QRCode",
  "Radio",
  "Rating",
  "Separator",
  "Skeleton",
  "Spinner",
  "Switch",
  "Tag",
  "Typography",
  "Watermark",
]);

const COMPLEX_COMPONENTS = new Set<string>([
  "Accordion",
  "Autocomplete",
  "Calendar",
  "Carousel",
  "Chart",
  "CodeEditor",
  "ColorPicker",
  "Combobox",
  "Command",
  "DataTable",
  "DatePicker",
  "DateRangePicker",
  "DateTimePicker",
  "Dialog",
  "DragDrop",
  "Drawer",
  "FileInput",
  "GanttChart",
  "ImageCropper",
  "KanbanBoard",
  "MultiSelect",
  "NavigationMenu",
  "NotificationCenter",
  "NumberInput",
  "PasswordInput",
  "PhoneInput",
  "Resizable",
  "Sidebar",
  "Sonner",
  "SpotlightSearch",
  "TextEditor",
  "ThemeProvider",
  "ThemeToggle",
  "TimePicker",
  "Tour",
  "Transfer",
  "Upload",
  "VirtualList",
]);

const MEDIUM_HOOKS = new Set<string>([
  "useAccordion",
  "useAlert",
  "useAnimatedHeight",
  "useAnimation",
  "useAspectRatio",
  "useAsync",
  "useAvatar",
  "useChartColors",
  "useChartData",
  "useColorMode",
  "useControllableState",
  "useDataTable",
  "useDebounce",
  "useDOM",
  "useEventListener",
  "useFetch",
  "useFocusTrap",
  "useForm",
  "useIntersectionObserver",
  "useLazyMount",
  "useMediaQuery",
  "useMergedRef",
  "useMergedRefs",
  "usePagination",
  "useSearchFilter",
  "useThrottle",
  "useUpdateEffect",
  "useValidation",
]);

function extractNameTokens(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items));
}

function categoryTagSeeds(category: string): string[] {
  const seeds: Record<string, string[]> = {
    Layout: ["layout", "container", "structure"],
    Navigation: ["navigation", "menu", "flow"],
    "Form Controls": ["form", "input", "field"],
    Actions: ["action", "interaction", "trigger"],
    "Data Display": ["display", "content", "visual"],
    Feedback: ["feedback", "status", "message"],
    Overlay: ["overlay", "popup", "layer"],
    Media: ["media", "visual", "interactive"],
    Utility: ["utility", "helper", "behavior"],
    Theming: ["theme", "appearance", "style"],
    Component: ["component", "logic", "state"],
    State: ["state", "management", "logic"],
    Interaction: ["dom", "events", "interaction"],
    Form: ["form", "validation", "input"],
    Performance: ["performance", "optimization", "timing"],
  };

  return seeds[category] ?? ["ui", "component", "react"];
}

function inferComponentCategory(name: string): string {
  if (name === "ThemeProvider" || name === "ThemeToggle") return "Theming";

  if (
    /^(Container|Grid|Stack|Section|Masonry|Paper|Resizable|ScrollArea|Affix|VirtualList)$/i.test(
      name,
    )
  ) {
    return "Layout";
  }

  if (
    [
      "AppBar",
      "BottomNavigation",
      "Breadcrumb",
      "Dock",
      "Link",
      "Menubar",
      "NavigationMenu",
      "Pagination",
      "Segmented",
      "Sidebar",
      "Steps",
      "Tab",
    ].includes(name)
  ) {
    return "Navigation";
  }

  if (
    /(Button|Toggle|FloatingActionButton|IconButton|PlayButton|SpeedDial|SplitButton|FloatingToolbar|ButtonGroup)/i.test(
      name,
    )
  ) {
    return "Actions";
  }

  if (
    /(Input|Select|Picker|Form|Field|Checkbox|Radio|Switch|Slider|Upload|TextArea|TextEditor|TagInput|Autocomplete|Combobox|MultiSelect|Date|OTP|Password|Phone|Number)/i.test(
      name,
    )
  ) {
    return "Form Controls";
  }

  if (
    /(Dialog|Drawer|Dropdown|Popover|HoverCard|ContextMenu|Command|SpotlightSearch)/i.test(
      name,
    )
  ) {
    return "Overlay";
  }

  if (
    /(Alert|Backdrop|Progress|Result|Snackbar|Sonner|Spinner|Toast|Tooltip|Tour|NotificationCenter|CookieConsent|Confetti|AnnouncementBar)/i.test(
      name,
    )
  ) {
    return "Feedback";
  }

  if (
    /(AspectRatio|Calendar|Carousel|VideoPlayer|Image|ImageCropper|ImageGallery|TickerCarousel|ChatBubble|QRCode)/i.test(
      name,
    )
  ) {
    return "Media";
  }

  if (
    /(DragDrop|Collapsible|InfiniteScroll|Transfer|Watermark|CountdownTimer|TypewriterText)/i.test(
      name,
    )
  ) {
    return "Utility";
  }

  return "Data Display";
}

function inferComponentComplexity(name: string): ComplexityLevel {
  if (COMPLEX_COMPONENTS.has(name)) return "complex";
  if (SIMPLE_COMPONENTS.has(name)) return "simple";
  return "medium";
}

function inferHookCategory(name: string): string {
  if (/(Accordion|AspectRatio|Avatar|Chart|DataTable|Alert)/.test(name)) {
    return "Component";
  }

  if (
    /(Array|ControllableState|Counter|Disclosure|LocalStorage|SessionStorage|Toggle|Previous)/.test(
      name,
    )
  ) {
    return "State";
  }

  if (
    /(ClickOutside|DOM|EventListener|FocusTrap|Hover|IntersectionObserver|ScrollLock|WindowSize|MergedRef|MergedRefs)/.test(
      name,
    )
  ) {
    return "Interaction";
  }

  if (/(Form|Validation)/.test(name)) {
    return "Form";
  }

  if (
    /(Debounce|Throttle|MediaQuery|Interval|Timeout|Async|Fetch|Animation|ReducedMotion|LazyMount|UpdateEffect|Clipboard|ColorMode|Pagination|SearchFilter|AnimatedHeight)/.test(
      name,
    )
  ) {
    return "Performance";
  }

  return "Utility";
}

function inferHookComplexity(name: string): ComplexityLevel {
  if (name === "useDataTable") return "complex";
  if (MEDIUM_HOOKS.has(name)) return "medium";
  return "simple";
}

function buildTags(
  name: string,
  category: string,
  extra: string[] = [],
): string[] {
  const tags = unique([
    ...extractNameTokens(name).slice(0, 3),
    ...extra,
    ...categoryTagSeeds(category),
  ]);

  return tags.filter((tag) => tag.length > 1).slice(0, 5);
}

function listComponentNames(): string[] {
  const componentsDir = path.join(SAHA_UI_ROOT, "src", "components");

  try {
    return fs
      .readdirSync(componentsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => {
        const componentPath = path.join(componentsDir, name);
        return (
          fs.existsSync(path.join(componentPath, "index.tsx")) ||
          fs.existsSync(path.join(componentPath, "index.ts"))
        );
      })
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function listHookNames(): string[] {
  const hooksDir = path.join(SAHA_UI_ROOT, "src", "hooks");

  try {
    return fs
      .readdirSync(hooksDir, { withFileTypes: true })
      .filter(
        (entry) => entry.isFile() && /^use[A-Za-z0-9]+\.ts$/.test(entry.name),
      )
      .map((entry) => entry.name.replace(/\.ts$/, ""))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

const COMPONENTS: ComponentMeta[] = listComponentNames().map((name) => {
  const category = inferComponentCategory(name);

  return {
    name,
    category,
    complexity: inferComponentComplexity(name),
    tags: buildTags(name, category),
  };
});

const HOOKS: HookMeta[] = listHookNames().map((name) => {
  const category = inferHookCategory(name);

  return {
    name,
    category,
    complexity: inferHookComplexity(name),
    tags: buildTags(name, category, ["hook"]),
  };
});

const UTILITIES: UtilityMeta[] = [
  {
    name: "cn",
    file: "lib/utils.ts",
    description: "Class name utility for merging Tailwind classes",
  },
  {
    name: "formatters",
    file: "lib/formatters.ts",
    description: "Number, currency, date, and bytes formatting helpers",
  },
  {
    name: "createChartConfig",
    file: "lib/chartConfig.ts",
    description: "Factory helper for building typed chart configurations",
  },
  {
    name: "validation",
    file: "lib/validation.ts",
    description: "Runtime prop-validation helpers and shared validators",
  },
  {
    name: "modernDesign",
    file: "lib/modernDesign.ts",
    description: "Modern effect tokens for transitions, shadows, and UI polish",
  },
  {
    name: "usePortalPosition",
    file: "lib/usePortalPosition.ts",
    description:
      "Portal positioning helper for popovers, dropdowns, and tooltips",
  },
];

// ─── Fuzzy Matching ───────────────────────────────────────────────────────────

function levenshteinDistance(a: string, b: string): number {
  const m = b.length;
  const n = a.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (b[i - 1] === a[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return dp[m][n];
}

function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (q === t) return 1.0;
  if (t.includes(q) || q.includes(t)) return 0.8;
  const dist = levenshteinDistance(q, t);
  return 1 - dist / Math.max(q.length, t.length);
}

// FIX: generic constraint instead of any[]
function findBestMatch<T extends { name: string }>(
  query: string,
  items: T[],
  threshold = 0.6,
): T[] {
  return items
    .map((item) => ({ item, score: fuzzyScore(query, item.name) }))
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/** Resolve a possibly-misspelled name to the best match, or return null. */
function resolveItem<T extends { name: string }>(
  query: string,
  items: T[],
): T | null {
  const exact = items.find((i) => i.name.toLowerCase() === query.toLowerCase());
  if (exact) return exact;
  return findBestMatch(query, items)[0] ?? null;
}

// ─── Intent Detection ─────────────────────────────────────────────────────────

function detectIntent(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("how to") || q.includes("how do i") || q.includes("guide"))
    return "tutorial";
  if (q.includes("example") || q.includes("demo") || q.includes("sample"))
    return "example";
  if (q.includes("style") || q.includes("customize") || q.includes("theme"))
    return "styling";
  if (q.includes("props") || q.includes("api") || q.includes("parameters"))
    return "api";
  if (
    q.includes("similar") ||
    q.includes("alternative") ||
    q.includes("related")
  )
    return "discovery";
  if (q.includes("error") || q.includes("fix") || q.includes("not working"))
    return "troubleshooting";
  if (q.includes("best") || q.includes("recommend") || q.includes("should i"))
    return "recommendation";
  return "information";
}

// ─── Session Context ──────────────────────────────────────────────────────────

function updateContext(
  type: "component" | "hook" | "query",
  value: string,
): void {
  sessionContext.queryCount++;
  sessionContext.timestamp = Date.now();
  sessionContext.lastQuery = value;

  if (type === "component") {
    sessionContext.recentComponents = [
      value,
      ...sessionContext.recentComponents,
    ].slice(0, 5);
  } else if (type === "hook") {
    sessionContext.recentHooks = [value, ...sessionContext.recentHooks].slice(
      0,
      5,
    );
  } else {
    sessionContext.userIntent = detectIntent(value);
  }
}

// ─── Contextual Suggestions ───────────────────────────────────────────────────

function getContextualSuggestions(component: ComponentMeta): string[] {
  const suggestions: string[] = [];

  const related = COMPONENTS.filter(
    (c) => c.category === component.category && c.name !== component.name,
  ).slice(0, 2);

  if (related.length > 0) {
    suggestions.push(
      `Related ${component.category} components: ${related.map((c) => c.name).join(", ")}`,
    );
  }

  if (component.name === "Input") {
    suggestions.push("Useful hooks: useDebounce, useLocalStorage");
  } else if (component.name === "Modal" || component.name === "Dialog") {
    suggestions.push("Useful hooks: useClickOutside, useToggle");
  } else if (component.name === "Tooltip" || component.name === "Dropdown") {
    suggestions.push("Useful hooks: useClickOutside");
  }

  if (sessionContext.userIntent === "styling") {
    suggestions.push("Check out: get_component_variants, get_theme_config");
  } else if (sessionContext.userIntent === "example") {
    suggestions.push("Use: get_usage_example for complete code samples");
  }

  return suggestions;
}

// ─── Smart Response Builder ───────────────────────────────────────────────────

interface ResponseMeta {
  type?: string;
  name?: string;
  suggestions?: string[];
  nextSteps?: string[];
  tips?: string[];
}

function generateSmartResponse(
  content: string,
  meta: ResponseMeta = {},
): string {
  const { type, name, suggestions = [], nextSteps = [], tips = [] } = meta;
  let response = content;

  if (name && type === "component") {
    response = `# ${name} Component\n\n${response}`;
  }

  const intentMessages: Record<string, string> = {
    tutorial: "\n\n💡 **Tutorial Mode**: I'll provide step-by-step guidance.",
    example: "\n\n📋 **Example Mode**: Here's a working code sample.",
    styling: "\n\n🎨 **Styling Mode**: Focus on customization and theming.",
    api: "\n\n📖 **API Mode**: Here's the technical reference.",
    troubleshooting: "\n\n🔧 **Troubleshooting Mode**: Let's solve this issue.",
  };

  if (sessionContext.userIntent && intentMessages[sessionContext.userIntent]) {
    response = intentMessages[sessionContext.userIntent] + "\n\n" + response;
  }

  if (suggestions.length > 0) {
    response += "\n\n---\n\n### 💡 Suggestions\n\n";
    suggestions.forEach((s) => {
      response += `- ${s}\n`;
    });
  }

  if (nextSteps.length > 0) {
    response += "\n\n### 🎯 Next Steps\n\n";
    nextSteps.forEach((s) => {
      response += `- ${s}\n`;
    });
  }

  if (tips.length > 0) {
    response += "\n\n### 📌 Pro Tips\n\n";
    tips.forEach((t) => {
      response += `- ${t}\n`;
    });
  }

  if (sessionContext.recentComponents.length > 0 && type === "component") {
    response += `\n\n---\n\n*Recently viewed: ${sessionContext.recentComponents.slice(0, 3).join(", ")}*`;
  }

  return response;
}

// ─── File Helpers ─────────────────────────────────────────────────────────────

function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(path.join(SAHA_UI_ROOT, filePath), "utf-8");
  } catch {
    return "";
  }
}

function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(path.join(SAHA_UI_ROOT, filePath));
  } catch {
    return false;
  }
}

// FIX: removed global `g` flag from RegExp.
// With the `g` flag, RegExp.prototype.test() advances `lastIndex` after each
// match. When reused across different strings inside a loop, every other call
// returns false (because lastIndex points past the end of the previous string).
// Using only the `i` flag is sufficient for case-insensitive line matching.
// A fresh RegExp is created per line so there is no shared state.
function searchInFiles(
  pattern: string,
  directory = "src",
): Array<{ file: string; matches: string[] }> {
  const searchPath = path.join(SAHA_UI_ROOT, directory);

  if (!fs.existsSync(searchPath)) return [];

  let files: string[] = [];
  try {
    files = glob.sync("**/*.{ts,tsx,js,jsx,css}", {
      cwd: searchPath,
      ignore: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.test.*",
        "**/*.spec.*",
      ],
    });
  } catch {
    return [];
  }

  const results: Array<{ file: string; matches: string[] }> = [];

  for (const file of files) {
    const content = readFileContent(path.join(directory, file));
    const lines = content.split("\n");
    const matches: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      // FIX: new RegExp per line — no shared lastIndex
      if (new RegExp(pattern, "i").test(lines[i])) {
        matches.push(`Line ${i + 1}: ${lines[i].trim()}`);
      }
    }

    if (matches.length > 0) {
      results.push({
        file: path.join(directory, file).replace(/\\/g, "/"),
        matches,
      });
    }
  }

  return results;
}

function extractPropsFromTypes(content: string): string {
  const match =
    content.match(/interface\s+\w+Props\s*\{([^}]+)\}/s) ||
    content.match(/type\s+\w+Props\s*=\s*\{([^}]+)\}/s);
  return match ? match[1].trim() : "No props interface found";
}

// ─── Documentation Builders ───────────────────────────────────────────────────

/**
 * Returns { resolvedName, docs } so callers always work with the correct name.
 * FIX v2.0 returned only a string, forcing callers to re-guess the resolved name,
 * causing getContextualSuggestions() and COMPONENTS.find() to use the raw query.
 */
function getComponentDocumentation(
  query: string,
): { resolvedName: string; docs: string } | null {
  const component = resolveItem(query, COMPONENTS);
  if (!component) return null;

  const componentDir = path.join(
    SAHA_UI_ROOT,
    "src",
    "components",
    component.name,
  );
  if (!fs.existsSync(componentDir)) return null;

  let docs = `**Category**: ${component.category}\n`;
  docs += `**Complexity**: ${component.complexity}\n`;
  docs += `**Tags**: ${component.tags.join(", ")}\n\n`;

  try {
    const indexPath = path.join(componentDir, "index.tsx");
    if (fs.existsSync(indexPath)) {
      docs += `## Component Implementation\n\n\`\`\`typescript\n${fs.readFileSync(indexPath, "utf-8")}\n\`\`\`\n\n`;
    }

    const typesPath = path.join(componentDir, `${component.name}.types.ts`);
    if (fs.existsSync(typesPath)) {
      docs += `## Props\n\n\`\`\`typescript\n${extractPropsFromTypes(fs.readFileSync(typesPath, "utf-8"))}\n\`\`\`\n\n`;
    }

    const stylesPath = path.join(componentDir, `${component.name}.styles.ts`);
    if (fs.existsSync(stylesPath)) {
      docs += `## Styles\n\n\`\`\`typescript\n${fs.readFileSync(stylesPath, "utf-8")}\n\`\`\`\n\n`;
    }
  } catch {
    docs += `\n*Note: Some files couldn't be read, but the component exists in the library.*\n`;
  }

  return { resolvedName: component.name, docs };
}

/** Same pattern for hooks — returns resolvedName alongside docs. */
function getHookDocumentation(
  query: string,
): { resolvedName: string; docs: string } | null {
  const hook = resolveItem(query, HOOKS);
  if (!hook) return null;

  const hookPath = `src/hooks/${hook.name}.ts`;
  if (!fileExists(hookPath)) return null;

  const content = readFileContent(hookPath);
  let docs = `**Category**: ${hook.category}\n`;
  docs += `**Complexity**: ${hook.complexity}\n`;
  docs += `**Tags**: ${hook.tags.join(", ")}\n\n`;
  docs += `## Implementation\n\n\`\`\`typescript\n${content}\n\`\`\`\n\n`;

  return { resolvedName: hook.name, docs };
}

function getQuickStartGuide(): string {
  return `# Saha UI Quick Start Guide

## Installation

\`\`\`bash
npm install saha-ui
# or
yarn add saha-ui
\`\`\`

## Basic Setup

### 1. Initialize Saha UI
\`\`\`bash
npx saha-ui@latest init
\`\`\`

### 2. Use Components
\`\`\`typescript
import { Button, Card, Input } from 'saha-ui'

function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  )
}
\`\`\`

## Theming

Configure your theme in \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
\`\`\`

## Next Steps

- Browse components: Use \`list_components_by_category\`
- See examples: Use \`get_usage_example\` for any component
- Customize theme: Use \`get_theme_config\`
- Learn hooks: Check out our custom hooks for enhanced functionality
`;
}

// ─── MCP Server ───────────────────────────────────────────────────────────────

const server = new Server(
  { name: "saha-ui-mcp", version: "2.1.0" },
  { capabilities: { resources: {}, tools: {}, prompts: {} } },
);

// ─── Resources ────────────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "saha-ui://docs/quick-start",
      name: "Quick Start Guide",
      description: "Get started with Saha UI in minutes",
      mimeType: "text/markdown",
    },
    {
      uri: "saha-ui://docs/components",
      name: "Components Overview",
      description: "Complete list of all available components",
      mimeType: "text/markdown",
    },
    {
      uri: "saha-ui://docs/hooks",
      name: "Hooks Overview",
      description: "Custom React hooks for enhanced functionality",
      mimeType: "text/markdown",
    },
    {
      uri: "saha-ui://docs/theming",
      name: "Theming Guide",
      description: "Customize colors, spacing, and styles",
      mimeType: "text/markdown",
    },
    {
      uri: "saha-ui://docs/readme",
      name: "README",
      description: "Main project documentation",
      mimeType: "text/markdown",
    },
    {
      uri: "saha-ui://package",
      name: "package.json",
      description: "Package configuration and dependencies",
      mimeType: "application/json",
    },
    {
      uri: "saha-ui://session/context",
      name: "Session Context",
      description: "Current interaction context and history",
      mimeType: "application/json",
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "saha-ui://docs/quick-start") {
    return {
      contents: [
        { uri, mimeType: "text/markdown", text: getQuickStartGuide() },
      ],
    };
  }

  if (uri === "saha-ui://docs/components") {
    const list = COMPONENTS.map(
      (c) =>
        `### ${c.name}\n- **Category**: ${c.category}\n- **Complexity**: ${c.complexity}\n- **Tags**: ${c.tags.join(", ")}\n`,
    ).join("\n");
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: `# Saha UI Components\n\n${list}`,
        },
      ],
    };
  }

  if (uri === "saha-ui://docs/hooks") {
    const list = HOOKS.map(
      (h) =>
        `### ${h.name}\n- **Category**: ${h.category}\n- **Complexity**: ${h.complexity}\n- **Tags**: ${h.tags.join(", ")}\n`,
    ).join("\n");
    return {
      contents: [
        { uri, mimeType: "text/markdown", text: `# Saha UI Hooks\n\n${list}` },
      ],
    };
  }

  if (uri === "saha-ui://docs/theming") {
    const css =
      readFileContent("src/index.css") || "Theming documentation coming soon";
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: `# Theming Guide\n\n\`\`\`css\n${css}\n\`\`\``,
        },
      ],
    };
  }

  if (uri === "saha-ui://docs/readme") {
    const readme = readFileContent("README.md") || "README not found";
    return { contents: [{ uri, mimeType: "text/markdown", text: readme }] };
  }

  if (uri === "saha-ui://package") {
    const pkg = readFileContent("package.json") || "{}";
    return { contents: [{ uri, mimeType: "application/json", text: pkg }] };
  }

  if (uri === "saha-ui://session/context") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(sessionContext, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// ─── Tools ────────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_component",
      description:
        "Get detailed information about a component with smart suggestions and context",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component name (fuzzy matching supported)",
          },
          // FIX: was "brief" in the handler but "summary" in the enum — now consistent
          detail_level: {
            type: "string",
            enum: ["summary", "full", "code_only"],
            description: "Level of detail to return",
            default: "full",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_hook",
      description:
        "Get detailed information about a custom React hook with usage examples",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Hook name (fuzzy matching supported)",
          },
          include_example: {
            type: "boolean",
            description: "Include usage example",
            default: true,
          },
        },
        required: ["name"],
      },
    },
    {
      name: "search_code",
      description:
        "Search codebase with smart filtering and context-aware results",
      inputSchema: {
        type: "object",
        properties: {
          pattern: {
            type: "string",
            description: "Search pattern (regex supported)",
          },
          directory: {
            type: "string",
            description: "Directory to search in",
            default: "src",
          },
          context_lines: {
            type: "number",
            description: "Number of context lines around matches",
            default: 2,
          },
        },
        required: ["pattern"],
      },
    },
    {
      name: "get_component_variants",
      description:
        "Get all style variants and customization options for a component",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string", description: "Component name" } },
        required: ["name"],
      },
    },
    {
      name: "get_utility",
      description: "Get information about utility functions with examples",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string", description: "Utility name" } },
        required: ["name"],
      },
    },
    {
      name: "list_components_by_category",
      description: "List components grouped by category with smart filtering",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Filter by category (optional)",
          },
          complexity: {
            type: "string",
            enum: ["simple", "medium", "complex"],
            description: "Filter by complexity (optional)",
          },
          tags: {
            type: "string",
            description: "Filter by tags (comma-separated)",
          },
        },
      },
    },
    {
      name: "get_usage_example",
      description: "Get complete, runnable usage examples with best practices",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Component or hook name" },
          scenario: {
            type: "string",
            description:
              'Specific use case (e.g., "form validation", "dark mode")',
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_theme_config",
      description: "Get theming configuration and customization guide",
      inputSchema: {
        type: "object",
        properties: {
          aspect: {
            type: "string",
            enum: ["colors", "spacing", "typography", "all"],
            description: "Theme aspect to focus on",
            default: "all",
          },
        },
      },
    },
    {
      name: "ask_question",
      description:
        "Ask natural language questions about Saha UI with intelligent responses",
      inputSchema: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Your question about Saha UI",
          },
        },
        required: ["question"],
      },
    },
    {
      name: "get_recommendations",
      description: "Get smart recommendations based on your current context",
      inputSchema: {
        type: "object",
        properties: {
          scenario: {
            type: "string",
            description:
              'What are you building? (e.g., "dashboard", "form", "landing page")',
          },
        },
        required: ["scenario"],
      },
    },
  ],
}));

// ─── Tool Handlers ────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // ── get_component ────────────────────────────────────────────────────────
    if (name === "get_component") {
      if (!args) throw new Error("Missing arguments for get_component");

      const query = args.name as string;
      const detailLevel = (args.detail_level as string) || "full";

      updateContext("query", query);

      const result = getComponentDocumentation(query);

      if (!result) {
        const matches = findBestMatch(query, COMPONENTS).slice(0, 3);
        const text =
          matches.length > 0
            ? `I couldn't find "${query}". Did you mean:\n\n${matches.map((c) => `- **${c.name}** (${c.category})`).join("\n")}\n\nWant me to show you one of these instead?`
            : `I couldn't find "${query}". Use \`list_components_by_category()\` to browse all components.`;
        return { content: [{ type: "text", text }] };
      }

      // FIX: use resolvedName — v2.0 used raw query here, breaking suggestions
      const { resolvedName, docs } = result;
      updateContext("component", resolvedName);

      const component = COMPONENTS.find((c) => c.name === resolvedName)!;
      const contextSuggestions = getContextualSuggestions(component);

      const nextSteps = [
        `Try: get_usage_example("${resolvedName}") for complete code samples`,
        `Check: get_component_variants("${resolvedName}") for styling options`,
      ];
      const tips = [
        `Complexity: ${component.complexity} — ${component.complexity === "simple" ? "Great for beginners!" : "May require additional setup"}`,
        `Common use cases: ${component.tags.slice(0, 2).join(", ")}`,
      ];

      let response = generateSmartResponse(docs, {
        type: "component",
        name: resolvedName,
        suggestions: contextSuggestions,
        nextSteps,
        tips,
      });

      // FIX: "brief" renamed to "summary" to match the schema enum
      if (detailLevel === "summary") {
        const lines = response.split("\n");
        const cutoff = lines.findIndex(
          (l) => l.includes("## Styles") || l.includes("## Props"),
        );
        if (cutoff > 0) response = lines.slice(0, cutoff).join("\n");
      }

      return { content: [{ type: "text", text: response }] };
    }

    // ── get_hook ─────────────────────────────────────────────────────────────
    if (name === "get_hook") {
      if (!args) throw new Error("Missing arguments for get_hook");

      const query = args.name as string;
      const includeExample = args.include_example !== false;

      updateContext("query", query);

      const result = getHookDocumentation(query);

      if (!result) {
        const matches = findBestMatch(query, HOOKS).slice(0, 3);
        const text =
          matches.length > 0
            ? `Hook "${query}" not found. Did you mean:\n\n${matches.map((h) => `- ${h.name}`).join("\n")}`
            : `Hook "${query}" not found in the library.`;
        return { content: [{ type: "text", text }] };
      }

      // FIX: use resolvedName; v2.0 used raw query which missed fuzzy-matched hooks
      const { resolvedName, docs } = result;
      updateContext("hook", resolvedName);

      const hook = HOOKS.find((h) => h.name === resolvedName)!;
      const suggestions = [
        `Category: ${hook.category}`,
        `Use this when: ${hook.tags.join(", ")}`,
      ];
      const nextSteps = [
        "Combine with components for enhanced functionality",
        "Check TypeScript types for full API",
      ];

      let response = generateSmartResponse(docs, {
        type: "hook",
        name: resolvedName,
        suggestions,
        nextSteps,
      });

      // Remove code blocks when examples not requested
      if (!includeExample) {
        response = response
          .split(/```[\s\S]*?```/g)
          .join("")
          .replace(/\n{3,}/g, "\n\n")
          .trim();
      }

      return { content: [{ type: "text", text: response }] };
    }

    // ── search_code ──────────────────────────────────────────────────────────
    if (name === "search_code") {
      if (!args) throw new Error("Missing arguments for search_code");

      const pattern = args.pattern as string;
      const directory = (args.directory as string) || "src";

      updateContext("query", `search: ${pattern}`);

      const results = searchInFiles(pattern, directory);

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: generateSmartResponse(`No results found for "${pattern}"`, {
                suggestions: [
                  "Try a broader search pattern",
                  "Check spelling or try a simpler term",
                  "Search in a different directory (components, hooks, lib)",
                ],
              }),
            },
          ],
        };
      }

      let output = `# Search Results for "${pattern}"\n\nFound ${results.length} file(s)\n\n`;
      results.forEach(({ file, matches }) => {
        output += `## ${file}\n\n`;
        matches.slice(0, 10).forEach((m) => {
          output += `- ${m}\n`;
        });
        output += "\n";
      });

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(output, {
              nextSteps: [
                "Use get_component or get_hook for detailed information",
                "Narrow search with more specific patterns",
              ],
            }),
          },
        ],
      };
    }

    // ── get_component_variants ───────────────────────────────────────────────
    if (name === "get_component_variants") {
      if (!args)
        throw new Error("Missing arguments for get_component_variants");

      const query = args.name as string;
      updateContext("query", `variants: ${query}`);

      // FIX: resolve name before building file path
      const component = resolveItem(query, COMPONENTS);
      const resolvedName = component?.name ?? query;
      const stylesPath = `src/components/${resolvedName}/styles.ts`;

      if (fileExists(stylesPath)) {
        return {
          content: [
            {
              type: "text",
              text: generateSmartResponse(
                `# ${resolvedName} Style Variants\n\n\`\`\`typescript\n${readFileContent(stylesPath)}\n\`\`\``,
                {
                  tips: [
                    "Use Tailwind classes for custom styling",
                    "Combine variants for unique designs",
                    "Check className prop for overrides",
                  ],
                },
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `No separate styles file found for ${resolvedName}. Styles may be inline in the component file.`,
          },
        ],
      };
    }

    // ── get_utility ──────────────────────────────────────────────────────────
    if (name === "get_utility") {
      if (!args) throw new Error("Missing arguments for get_utility");

      const utilityName = args.name as string;
      const utility = UTILITIES.find((u) => u.name === utilityName);
      updateContext("query", `utility: ${utilityName}`);

      if (!utility) {
        return {
          content: [
            {
              type: "text",
              text: `Utility "${utilityName}" not found. Available: ${UTILITIES.map((u) => u.name).join(", ")}`,
            },
          ],
        };
      }

      const utilityPath = `src/${utility.file}`;
      if (!fileExists(utilityPath)) {
        return {
          content: [
            { type: "text", text: `Utility file not found: ${utilityPath}` },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(
              `# ${utilityName}\n\n${utility.description}\n\n\`\`\`typescript\n${readFileContent(utilityPath)}\n\`\`\``,
              {
                tips: [
                  'Import utilities from "saha-ui/lib"',
                  "Utilities are tree-shakeable",
                ],
              },
            ),
          },
        ],
      };
    }

    // ── list_components_by_category ──────────────────────────────────────────
    if (name === "list_components_by_category") {
      const categoryFilter = args?.category as string | undefined;
      const complexityFilter = args?.complexity as string | undefined;
      const tagsFilter = args?.tags as string | undefined;

      updateContext("query", "list components");

      let filtered = [...COMPONENTS];
      if (categoryFilter)
        filtered = filtered.filter((c) =>
          c.category.toLowerCase().includes(categoryFilter.toLowerCase()),
        );
      if (complexityFilter)
        filtered = filtered.filter((c) => c.complexity === complexityFilter);
      if (tagsFilter) {
        const tagList = tagsFilter
          .split(",")
          .map((t) => t.trim().toLowerCase());
        filtered = filtered.filter((c) =>
          c.tags.some((t) => tagList.includes(t.toLowerCase())),
        );
      }

      const categories: Record<string, ComponentMeta[]> = {};
      filtered.forEach((c) => {
        (categories[c.category] ??= []).push(c);
      });

      let output = "# Saha UI Components\n\n";
      if (categoryFilter || complexityFilter || tagsFilter) {
        const parts: string[] = [];
        if (categoryFilter) parts.push(`category="${categoryFilter}"`);
        if (complexityFilter) parts.push(`complexity="${complexityFilter}"`);
        if (tagsFilter) parts.push(`tags="${tagsFilter}"`);
        output += `**Filtered by**: ${parts.join(", ")}\n\n`;
      }

      Object.entries(categories).forEach(([cat, comps]) => {
        output += `## ${cat}\n\n`;
        comps.forEach((c) => {
          output += `### ${c.name}\n- **Complexity**: ${c.complexity}\n- **Tags**: ${c.tags.join(", ")}\n- **Quick access**: \`get_component("${c.name}")\`\n\n`;
        });
      });

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(output, {
              nextSteps: [
                "Use filters to narrow down options",
                "Try get_recommendations for personalized suggestions",
              ],
            }),
          },
        ],
      };
    }

    // ── get_usage_example ────────────────────────────────────────────────────
    if (name === "get_usage_example") {
      if (!args) throw new Error("Missing arguments for get_usage_example");

      const query = args.name as string;
      updateContext("query", `example: ${query}`);

      // FIX: resolve before using the name
      const component = resolveItem(query, COMPONENTS);
      const resolvedName = component?.name ?? query;
      const examplePath = `examples/${resolvedName}.tsx`;

      if (fileExists(examplePath)) {
        return {
          content: [
            {
              type: "text",
              text: generateSmartResponse(
                `# ${resolvedName} Usage Example\n\n\`\`\`typescript\n${readFileContent(examplePath)}\n\`\`\``,
                {
                  tips: [
                    "Copy this example and modify for your needs",
                    "Check props documentation for more options",
                    "Combine with hooks for enhanced functionality",
                  ],
                },
              ),
            },
          ],
        };
      }

      if (component) {
        const basicExample = `import { ${resolvedName} } from 'saha-ui'

function Example() {
  return (
    <${resolvedName}>
      ${resolvedName} content here
    </${resolvedName}>
  )
}

export default Example`;

        return {
          content: [
            {
              type: "text",
              text: generateSmartResponse(
                `# ${resolvedName} Usage Example\n\n\`\`\`typescript\n${basicExample}\n\`\`\``,
                {
                  suggestions: [
                    "This is a basic example — check component docs for more props",
                    `Category: ${component.category} — explore similar components`,
                  ],
                },
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Example not found for "${query}". Use get_component to see implementation.`,
          },
        ],
      };
    }

    // ── get_theme_config ─────────────────────────────────────────────────────
    if (name === "get_theme_config") {
      updateContext("query", "theme config");

      const tailwindConfig =
        readFileContent("tailwind.config.js") ||
        readFileContent("tailwind.config.ts") ||
        "No Tailwind config found";
      const indexCSS = readFileContent("src/index.css");

      let output = "# Saha UI Theme Configuration\n\n";
      output += `## Tailwind Configuration\n\n\`\`\`javascript\n${tailwindConfig}\n\`\`\`\n\n`;
      if (indexCSS)
        output += `## CSS Variables\n\n\`\`\`css\n${indexCSS}\n\`\`\`\n\n`;

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(output, {
              tips: [
                "Use CSS variables for dynamic theming",
                "Extend Tailwind config for custom colors",
                "Components respect theme configuration automatically",
              ],
              nextSteps: [
                "Create a custom theme by extending the config",
                "Use useTheme hook for runtime theme switching",
                "Check component variants for styling options",
              ],
            }),
          },
        ],
      };
    }

    // ── ask_question ─────────────────────────────────────────────────────────
    if (name === "ask_question") {
      if (!args) throw new Error("Missing arguments for ask_question");

      const question = args.question as string;
      updateContext("query", question);

      const intent = detectIntent(question);
      const q = question.toLowerCase();

      const intentPrefixes: Record<string, string> = {
        tutorial: "📚 **Tutorial Answer**:\n\n",
        example: "💻 **Code Example**:\n\n",
        styling: "🎨 **Styling Guide**:\n\n",
        api: "📖 **API Reference**:\n\n",
        troubleshooting: "🔧 **Solution**:\n\n",
      };

      let answer = intentPrefixes[intent] ?? "";

      if (
        q.includes("install") ||
        q.includes("setup") ||
        q.includes("get started")
      ) {
        answer += getQuickStartGuide();
      } else if (q.includes("component") || q.includes("what components")) {
        answer += `# Available Components\n\n${COMPONENTS.map((c) => `- ${c.name} (${c.category})`).join("\n")}\n\nUse \`get_component("ComponentName")\` for details.`;
      } else if (q.includes("hook") || q.includes("what hooks")) {
        answer += `# Available Hooks\n\n${HOOKS.map((h) => `- ${h.name} (${h.category})`).join("\n")}\n\nUse \`get_hook("hookName")\` for details.`;
      } else if (
        q.includes("theme") ||
        q.includes("style") ||
        q.includes("color")
      ) {
        answer +=
          "For theming information, use `get_theme_config()`. You can customize colors, spacing, typography, and more through Tailwind configuration.";
      } else if (q.includes("example") || q.includes("how to use")) {
        answer +=
          'Use `get_usage_example("ComponentName")` to see complete, runnable examples for any component or hook.';
      } else {
        answer += `I understand you're asking about: "${question}"\n\nHere are some helpful tools:\n\n- \`list_components_by_category()\` — Browse all components\n- \`get_component("Name")\` — Get component details\n- \`search_code("pattern")\` — Search the codebase\n- \`get_recommendations({scenario: "your use case"})\` — Get personalized suggestions`;
      }

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(answer, {
              suggestions: [
                "Be specific about component names or features",
                "Use tool commands for detailed information",
                "Check examples for real-world usage",
              ],
            }),
          },
        ],
      };
    }

    // ── get_recommendations ──────────────────────────────────────────────────
    if (name === "get_recommendations") {
      if (!args) throw new Error("Missing arguments for get_recommendations");

      const scenario = args.scenario as string;
      updateContext("query", `recommendations: ${scenario}`);

      const s = scenario.toLowerCase();
      let recs = `# Recommendations for: ${scenario}\n\n`;

      if (s.includes("dashboard") || s.includes("admin")) {
        recs += `## Suggested Components\n\n- **Card** — For metrics and data panels\n- **Tabs** — For navigation between sections\n- **Badge** — For status indicators\n- **Avatar** — For user profiles\n\n`;
        recs += `## Useful Hooks\n\n- **useMediaQuery** — Responsive layouts\n- **useLocalStorage** — Persist user preferences\n`;
      } else if (s.includes("form")) {
        recs += `## Suggested Components\n\n- **Input** — Text fields\n- **Select** — Dropdowns\n- **Checkbox** — Boolean inputs\n- **Button** — Form actions\n\n`;
        recs += `## Useful Hooks\n\n- **useDebounce** — Optimize input handling\n- **useToggle** — Manage boolean states\n`;
      } else if (s.includes("landing") || s.includes("marketing")) {
        recs += `## Suggested Components\n\n- **Button** — Call-to-action buttons\n- **Card** — Feature showcases\n- **Modal** — Sign-up forms\n- **Accordion** — FAQ sections\n`;
      } else {
        recs += `## General Recommendations\n\n1. Browse \`list_components_by_category()\`\n2. Check examples for similar projects\n3. Start with simple components and build up\n`;
      }

      return {
        content: [
          {
            type: "text",
            text: generateSmartResponse(recs, {
              nextSteps: [
                "Get detailed info for each recommended component",
                "Check usage examples to see them in action",
                "Combine components for complex UIs",
              ],
            }),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
});

// ─── Prompts ──────────────────────────────────────────────────────────────────

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: "component_integration",
      description:
        "Help integrate a Saha UI component into an existing project",
      arguments: [
        {
          name: "component",
          description: "Component to integrate",
          required: true,
        },
        {
          name: "framework",
          description: "Target framework (Next.js, Vite, etc.)",
          required: false,
        },
      ],
    },
    {
      name: "build_ui",
      description: "Get step-by-step guidance to build a specific UI",
      arguments: [
        {
          name: "description",
          description: "Describe the UI you want to build",
          required: true,
        },
      ],
    },
    {
      name: "customize_theme",
      description: "Get help customizing the Saha UI theme",
      arguments: [
        {
          name: "requirements",
          description: "Theme customization requirements",
          required: true,
        },
      ],
    },
    {
      name: "debug_issue",
      description: "Debug a Saha UI component issue",
      arguments: [
        {
          name: "problem",
          description: "Describe the problem",
          required: true,
        },
        {
          name: "component",
          description: "Component having issues",
          required: false,
        },
      ],
    },
  ],
}));

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "component_integration") {
    const component = args?.component as string;
    const framework = (args?.framework as string) || "React";
    updateContext("query", `integrate: ${component}`);
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Help me integrate the ${component} component from Saha UI into my ${framework} project. Show me the imports, setup, and a working example.`,
          },
        },
      ],
    };
  }

  if (name === "build_ui") {
    const description = args?.description as string;
    updateContext("query", `build: ${description}`);
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I want to build: ${description}. Please recommend Saha UI components and provide a step-by-step implementation guide with code examples.`,
          },
        },
      ],
    };
  }

  if (name === "customize_theme") {
    const requirements = args?.requirements as string;
    updateContext("query", `theme: ${requirements}`);
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I need to customize the Saha UI theme: ${requirements}. Show me how to configure colors, typography, spacing, and other theme settings.`,
          },
        },
      ],
    };
  }

  if (name === "debug_issue") {
    const problem = args?.problem as string;
    const component = args?.component as string | undefined;
    updateContext("query", `debug: ${problem}`);
    const text = component
      ? `I'm having an issue with Saha UI: ${problem}. This is related to the ${component} component. Please help me troubleshoot and fix this issue.`
      : `I'm having an issue with Saha UI: ${problem}. Please help me troubleshoot and fix this issue.`;
    return { messages: [{ role: "user", content: { type: "text", text } }] };
  }

  throw new Error(`Unknown prompt: ${name}`);
});

// ─── Start ────────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    "Saha UI MCP Server v2.1.0 running on stdio (Enhanced Dynamic Mode)",
  );
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
