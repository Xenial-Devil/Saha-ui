#!/usr/bin/env node

/**
 * Saha UI MCP Server - Enhanced Dynamic Version
 *
 * A Model Context Protocol server that provides AI assistants with intelligent,
 * context-aware access to the Saha UI component library.
 *
 * Features:
 * - Context-aware responses that remember session history
 * - Intent detection for natural language queries
 * - Fuzzy matching for typo tolerance
 * - Progressive disclosure (summaries first, details on request)
 * - Proactive suggestions and related content
 * - Smart dependency tracking
 * - Interactive examples with live code
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the Saha UI package
// When built: dist/mcp/server.js -> need to go up 2 levels to reach project root
// When in source: mcp/server.ts -> need to go up 1 level
const SAHA_UI_ROOT = __dirname.includes('dist')
  ? path.resolve(__dirname, '..', '..')
  : path.resolve(__dirname, '..');

// Session context to track interaction history
interface SessionContext {
  recentComponents: string[];
  recentHooks: string[];
  userIntent: string | null;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  lastQuery: string | null;
  queryCount: number;
  timestamp: number;
}

const sessionContext: SessionContext = {
  recentComponents: [],
  recentHooks: [],
  userIntent: null,
  skillLevel: 'intermediate',
  lastQuery: null,
  queryCount: 0,
  timestamp: Date.now(),
};

// Component and hook definitions with metadata
const COMPONENTS = [
  { name: 'Accordion', category: 'Data Display', complexity: 'medium', tags: ['collapsible', 'expandable', 'faq'] },
  { name: 'Alert', category: 'Feedback', complexity: 'simple', tags: ['notification', 'message', 'status'] },
  { name: 'Avatar', category: 'Data Display', complexity: 'simple', tags: ['profile', 'user', 'image'] },
  { name: 'Badge', category: 'Data Display', complexity: 'simple', tags: ['label', 'tag', 'status'] },
  { name: 'Button', category: 'Form Controls', complexity: 'simple', tags: ['action', 'click', 'submit'] },
  { name: 'Card', category: 'Data Display', complexity: 'simple', tags: ['container', 'panel', 'content'] },
  { name: 'Checkbox', category: 'Form Controls', complexity: 'simple', tags: ['input', 'form', 'selection'] },
  { name: 'Dialog', category: 'Overlay', complexity: 'medium', tags: ['modal', 'popup', 'overlay'] },
  { name: 'Dropdown', category: 'Navigation', complexity: 'medium', tags: ['menu', 'select', 'options'] },
  { name: 'Input', category: 'Form Controls', complexity: 'simple', tags: ['text', 'form', 'field'] },
  { name: 'Modal', category: 'Overlay', complexity: 'medium', tags: ['dialog', 'popup', 'overlay'] },
  { name: 'Select', category: 'Form Controls', complexity: 'medium', tags: ['dropdown', 'form', 'options'] },
  { name: 'Tabs', category: 'Navigation', complexity: 'medium', tags: ['navigation', 'switch', 'panel'] },
  { name: 'Toast', category: 'Feedback', complexity: 'medium', tags: ['notification', 'snackbar', 'message'] },
  { name: 'Tooltip', category: 'Overlay', complexity: 'simple', tags: ['hint', 'help', 'info'] },
];

const HOOKS = [
  { name: 'useDebounce', category: 'Performance', complexity: 'medium', tags: ['delay', 'optimization', 'input'] },
  { name: 'useLocalStorage', category: 'State', complexity: 'simple', tags: ['persistence', 'storage', 'state'] },
  { name: 'useMediaQuery', category: 'Responsive', complexity: 'simple', tags: ['responsive', 'breakpoint', 'screen'] },
  { name: 'useTheme', category: 'Theming', complexity: 'simple', tags: ['theme', 'dark-mode', 'styling'] },
  { name: 'useClickOutside', category: 'Interaction', complexity: 'simple', tags: ['click', 'outside', 'event'] },
  { name: 'useToggle', category: 'State', complexity: 'simple', tags: ['boolean', 'state', 'switch'] },
];

const UTILITIES = [
  { name: 'cn', file: 'lib/utils.ts', description: 'Class name utility for merging Tailwind classes' },
  { name: 'formatters', file: 'lib/formatters.ts', description: 'Common formatting utilities' },
];

// Fuzzy string matching using Levenshtein distance
function fuzzyMatch(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  if (s1 === s2) return 1.0;
  if (s2.includes(s1) || s1.includes(s2)) return 0.8;

  const distance = levenshteinDistance(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  return 1 - distance / maxLen;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Find best match for a component/hook name
function findBestMatch(query: string, items: any[], threshold: number = 0.6): any[] {
  const matches = items.map(item => ({
    item,
    score: fuzzyMatch(query, item.name)
  }))
  .filter(match => match.score >= threshold)
  .sort((a, b) => b.score - a.score);

  return matches.map(m => m.item);
}

// Detect user intent from query patterns
function detectIntent(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('how to') || q.includes('how do i') || q.includes('guide')) {
    return 'tutorial';
  }
  if (q.includes('example') || q.includes('demo') || q.includes('sample')) {
    return 'example';
  }
  if (q.includes('style') || q.includes('customize') || q.includes('theme')) {
    return 'styling';
  }
  if (q.includes('props') || q.includes('api') || q.includes('parameters')) {
    return 'api';
  }
  if (q.includes('similar') || q.includes('alternative') || q.includes('related')) {
    return 'discovery';
  }
  if (q.includes('error') || q.includes('fix') || q.includes('problem') || q.includes('not working')) {
    return 'troubleshooting';
  }
  if (q.includes('best') || q.includes('recommend') || q.includes('should i')) {
    return 'recommendation';
  }

  return 'information';
}

// Update session context
function updateContext(type: 'component' | 'hook' | 'query', value: string) {
  sessionContext.queryCount++;
  sessionContext.timestamp = Date.now();
  sessionContext.lastQuery = value;

  if (type === 'component') {
    sessionContext.recentComponents.unshift(value);
    sessionContext.recentComponents = sessionContext.recentComponents.slice(0, 5);
  } else if (type === 'hook') {
    sessionContext.recentHooks.unshift(value);
    sessionContext.recentHooks = sessionContext.recentHooks.slice(0, 5);
  } else if (type === 'query') {
    sessionContext.userIntent = detectIntent(value);
  }
}

// Generate contextual suggestions
function getContextualSuggestions(componentName: string): string[] {
  const component = COMPONENTS.find(c => c.name === componentName);
  if (!component) return [];

  const suggestions: string[] = [];

  // Suggest related components by category
  const relatedByCategory = COMPONENTS
    .filter(c => c.category === component.category && c.name !== componentName)
    .slice(0, 2)
    .map(c => c.name);

  if (relatedByCategory.length > 0) {
    suggestions.push(`Related ${component.category} components: ${relatedByCategory.join(', ')}`);
  }

  // Suggest relevant hooks
  if (component.name === 'Input') {
    suggestions.push('Useful hooks: useDebounce, useLocalStorage');
  } else if (component.name === 'Modal' || component.name === 'Dialog') {
    suggestions.push('Useful hooks: useClickOutside, useToggle');
  } else if (component.name === 'Tooltip' || component.name === 'Dropdown') {
    suggestions.push('Useful hooks: useClickOutside');
  }

  // Suggest based on intent
  if (sessionContext.userIntent === 'styling') {
    suggestions.push('Check out: get_component_variants, get_theme_config');
  } else if (sessionContext.userIntent === 'example') {
    suggestions.push('Use: get_usage_example for complete code samples');
  }

  return suggestions;
}

// Generate smart response with context
function generateSmartResponse(content: string, metadata: any = {}): string {
  const { type, name, suggestions = [], nextSteps = [], tips = [] } = metadata;

  let response = content;

  // Add component name if available
  if (name && type === 'component') {
    response = `# ${name} Component\n\n${response}`;
  }

  // Add contextual information
  if (sessionContext.userIntent) {
    const intentMessages: Record<string, string> = {
      'tutorial': '\n\n💡 **Tutorial Mode**: I\'ll provide step-by-step guidance.',
      'example': '\n\n📋 **Example Mode**: Here\'s a working code sample.',
      'styling': '\n\n🎨 **Styling Mode**: Focus on customization and theming.',
      'api': '\n\n📖 **API Mode**: Here\'s the technical reference.',
      'troubleshooting': '\n\n🔧 **Troubleshooting Mode**: Let\'s solve this issue.',
    };

    if (intentMessages[sessionContext.userIntent]) {
      response = intentMessages[sessionContext.userIntent] + '\n\n' + response;
    }
  }

  // Add suggestions
  if (suggestions.length > 0) {
    response += '\n\n---\n\n### 💡 Suggestions\n\n';
    suggestions.forEach((s: string) => {
      response += `- ${s}\n`;
    });
  }

  // Add next steps
  if (nextSteps.length > 0) {
    response += '\n\n### 🎯 Next Steps\n\n';
    nextSteps.forEach((step: string) => {
      response += `- ${step}\n`;
    });
  }

  // Add tips
  if (tips.length > 0) {
    response += '\n\n### 📌 Pro Tips\n\n';
    tips.forEach((tip: string) => {
      response += `- ${tip}\n`;
    });
  }

  // Add session context
  if (sessionContext.recentComponents.length > 0 && type === 'component') {
    response += `\n\n---\n\n*Recently viewed: ${sessionContext.recentComponents.slice(0, 3).join(', ')}*`;
  }

  return response;
}

// Read file content safely
function readFileContent(filePath: string): string {
  try {
    const fullPath = path.join(SAHA_UI_ROOT, filePath);
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    return '';
  }
}

// Check if file exists
function fileExists(filePath: string): boolean {
  try {
    const fullPath = path.join(SAHA_UI_ROOT, filePath);
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
}

// Search in files with context
function searchInFiles(pattern: string, directory: string = 'src'): Array<{ file: string; matches: string[] }> {
  const searchPath = path.join(SAHA_UI_ROOT, directory);
  const files = glob.sync('**/*.{ts,tsx,js,jsx,css}', {
    cwd: searchPath,
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*'],
  });

  const results: Array<{ file: string; matches: string[] }> = [];
  const regex = new RegExp(pattern, 'gi');

  files.forEach((file) => {
    const content = readFileContent(path.join(directory, file));
    const lines = content.split('\n');
    const matches: string[] = [];

    lines.forEach((line, index) => {
      if (regex.test(line)) {
        const lineNumber = index + 1;
        matches.push(`Line ${lineNumber}: ${line.trim()}`);
      }
    });

    if (matches.length > 0) {
      const relativePath = path.join(directory, file).replace(/\\/g, '/');
      results.push({ file: relativePath, matches });
    }
  });

  return results;
}

// Get component files with intelligence
function getComponentFiles(componentName: string): string[] {
  // Get all files related to a component
  const componentPath = `src/components/${componentName}`;
  const files: string[] = [];

  const possibleFiles = [
    `${componentPath}/${componentName}.tsx`,
    `${componentPath}/index.tsx`,
    `${componentPath}/${componentName}.ts`,
    `${componentPath}/types.ts`,
    `${componentPath}/styles.ts`,
    `${componentPath}/${componentName}.css`,
  ];

  possibleFiles.forEach((file) => {
    if (fileExists(file)) {
      files.push(file);
    }
  });

  return files;
}

// Extract props with better parsing
function extractPropsFromTypes(content: string): string {
  const propsMatch = content.match(/interface\s+\w+Props\s*\{([^}]+)\}/s) ||
                     content.match(/type\s+\w+Props\s*=\s*\{([^}]+)\}/s);

  if (propsMatch) {
    return propsMatch[1].trim();
  }

  return 'No props interface found';
}

// Get component documentation with intelligence
function getComponentDocumentation(componentName: string): string {
  // First, try to find exact match (case-insensitive)
  let actualComponentName = componentName;
  const exactMatch = COMPONENTS.find(c => c.name.toLowerCase() === componentName.toLowerCase());

  if (exactMatch) {
    actualComponentName = exactMatch.name;
  } else {
    // Try fuzzy matching
    const matches = findBestMatch(componentName, COMPONENTS);
    if (matches.length > 0 && matches[0]) {
      actualComponentName = matches[0].name;
    }
  }

  // Check if component directory exists
  const componentDir = path.join(SAHA_UI_ROOT, 'src', 'components', actualComponentName);

  if (!fs.existsSync(componentDir)) {
    // Component directory doesn't exist, suggest alternatives
    const matches = findBestMatch(componentName, COMPONENTS);
    if (matches.length > 0) {
      return `Hey! I couldn't find "${componentName}" but I found these similar components:\n\n${matches.slice(0, 3).map(m => `- **${m.name}** (${m.category})`).join('\n')}\n\nWant me to show you one of these instead?`;
    }
    return `I couldn't find a component called "${componentName}". Try asking "list complexity=simple" to see all available components!`;
  }

  let documentation = `# ${actualComponentName} Component\n\n`;

  const component = COMPONENTS.find(c => c.name === actualComponentName);
  if (component) {
    documentation += `**Category**: ${component.category}\n`;
    documentation += `**Complexity**: ${component.complexity}\n`;
    documentation += `**Tags**: ${component.tags.join(', ')}\n\n`;
  }

  // Read actual component files from the directory
  try {
    // Try index.tsx first (most common)
    const indexPath = path.join(componentDir, 'index.tsx');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      documentation += `## Component Implementation\n\n\`\`\`typescript\n${content}\n\`\`\`\n\n`;
    }

    // Try to read types file
    const typesPath = path.join(componentDir, `${actualComponentName}.types.ts`);
    if (fs.existsSync(typesPath)) {
      const typesContent = fs.readFileSync(typesPath, 'utf-8');
      const props = extractPropsFromTypes(typesContent);
      documentation += `## Props\n\n\`\`\`typescript\n${props}\n\`\`\`\n\n`;
    }

    // Try to read styles file
    const stylesPath = path.join(componentDir, `${actualComponentName}.styles.ts`);
    if (fs.existsSync(stylesPath)) {
      const stylesContent = fs.readFileSync(stylesPath, 'utf-8');
      documentation += `## Styles\n\n\`\`\`typescript\n${stylesContent}\n\`\`\`\n\n`;
    }
  } catch (error) {
    documentation += `\n*Note: Some files couldn't be read, but the component exists in the library.*\n`;
  }

  return documentation;
}

// Get hook documentation with intelligence
function getHookDocumentation(hookName: string): string {
  // First, try to find exact match (case-insensitive)
  let actualHookName = hookName;
  const exactMatch = HOOKS.find(h => h.name.toLowerCase() === hookName.toLowerCase());

  if (exactMatch) {
    actualHookName = exactMatch.name;
  } else {
    // Try fuzzy matching
    const matches = findBestMatch(hookName, HOOKS);
    if (matches.length > 0 && matches[0]) {
      actualHookName = matches[0].name;
    }
  }

  const hookPath = `src/hooks/${actualHookName}.ts`;

  if (!fileExists(hookPath)) {
    const matches = findBestMatch(hookName, HOOKS);
    if (matches.length > 0) {
      return `Hook "${hookName}" not found. Did you mean:\n\n${matches.slice(0, 3).map(m => `- ${m.name}`).join('\n')}`;
    }
    return `Hook "${hookName}" not found in the library.`;
  }

  const content = readFileContent(hookPath);
  const hook = HOOKS.find(h => h.name === actualHookName);

  let doc = `# ${actualHookName} Hook\n\n`;

  if (hook) {
    doc += `**Category**: ${hook.category}\n`;
    doc += `**Complexity**: ${hook.complexity}\n`;
    doc += `**Tags**: ${hook.tags.join(', ')}\n\n`;
  }

  doc += `## Implementation\n\n\`\`\`typescript\n${content}\n\`\`\`\n\n`;

  return doc;
}

// Quick start guide
function getQuickStartGuide(): string {
  return `# Saha UI Quick Start Guide

## Installation

\`\`\`bash
npm install saha-ui
# or
yarn add saha-ui
\`\`\`

## Basic Setup

### 1. Import Styles
\`\`\`typescript
import 'saha-ui/dist/index.css'
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

// Initialize MCP Server
const server = new Server(
  {
    name: 'saha-ui-mcp',
    version: '2.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// Resource handlers - Provide access to documentation
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'saha-ui://docs/quick-start',
        name: 'Quick Start Guide',
        description: 'Get started with Saha UI in minutes',
        mimeType: 'text/markdown',
      },
      {
        uri: 'saha-ui://docs/components',
        name: 'Components Overview',
        description: 'Complete list of all available components',
        mimeType: 'text/markdown',
      },
      {
        uri: 'saha-ui://docs/hooks',
        name: 'Hooks Overview',
        description: 'Custom React hooks for enhanced functionality',
        mimeType: 'text/markdown',
      },
      {
        uri: 'saha-ui://docs/theming',
        name: 'Theming Guide',
        description: 'Customize colors, spacing, and styles',
        mimeType: 'text/markdown',
      },
      {
        uri: 'saha-ui://docs/readme',
        name: 'README',
        description: 'Main project documentation',
        mimeType: 'text/markdown',
      },
      {
        uri: 'saha-ui://package',
        name: 'package.json',
        description: 'Package configuration and dependencies',
        mimeType: 'application/json',
      },
      {
        uri: 'saha-ui://session/context',
        name: 'Session Context',
        description: 'Current interaction context and history',
        mimeType: 'application/json',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === 'saha-ui://docs/quick-start') {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: getQuickStartGuide(),
        },
      ],
    };
  }

  if (uri === 'saha-ui://docs/components') {
    const componentsList = COMPONENTS.map(c =>
      `### ${c.name}\n- **Category**: ${c.category}\n- **Complexity**: ${c.complexity}\n- **Tags**: ${c.tags.join(', ')}\n`
    ).join('\n');

    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: `# Saha UI Components\n\n${componentsList}`,
        },
      ],
    };
  }

  if (uri === 'saha-ui://docs/hooks') {
    const hooksList = HOOKS.map(h =>
      `### ${h.name}\n- **Category**: ${h.category}\n- **Complexity**: ${h.complexity}\n- **Tags**: ${h.tags.join(', ')}\n`
    ).join('\n');

    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: `# Saha UI Hooks\n\n${hooksList}`,
        },
      ],
    };
  }

  if (uri === 'saha-ui://docs/theming') {
    const themeContent = readFileContent('src/index.css') ||
                        'Theming documentation coming soon';
    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: `# Theming Guide\n\n\`\`\`css\n${themeContent}\n\`\`\``,
        },
      ],
    };
  }

  if (uri === 'saha-ui://docs/readme') {
    const readme = readFileContent('README.md') || 'README not found';
    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: readme,
        },
      ],
    };
  }

  if (uri === 'saha-ui://package') {
    const packageJson = readFileContent('package.json') || '{}';
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: packageJson,
        },
      ],
    };
  }

  if (uri === 'saha-ui://session/context') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(sessionContext, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Tool handlers - Provide intelligent search and retrieval
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_component',
        description: 'Get detailed information about a component with smart suggestions and context',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name (fuzzy matching supported)',
            },
            detail_level: {
              type: 'string',
              enum: ['summary', 'full', 'code_only'],
              description: 'Level of detail to return',
              default: 'full',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_hook',
        description: 'Get detailed information about a custom React hook with usage examples',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Hook name (fuzzy matching supported)',
            },
            include_example: {
              type: 'boolean',
              description: 'Include usage example',
              default: true,
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'search_code',
        description: 'Search codebase with smart filtering and context-aware results',
        inputSchema: {
          type: 'object',
          properties: {
            pattern: {
              type: 'string',
              description: 'Search pattern (regex supported)',
            },
            directory: {
              type: 'string',
              description: 'Directory to search in',
              default: 'src',
            },
            context_lines: {
              type: 'number',
              description: 'Number of context lines around matches',
              default: 2,
            },
          },
          required: ['pattern'],
        },
      },
      {
        name: 'get_component_variants',
        description: 'Get all style variants and customization options for a component',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_utility',
        description: 'Get information about utility functions with examples',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Utility name',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'list_components_by_category',
        description: 'List components grouped by category with smart filtering',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category (optional)',
            },
            complexity: {
              type: 'string',
              enum: ['simple', 'medium', 'complex'],
              description: 'Filter by complexity (optional)',
            },
            tags: {
              type: 'string',
              description: 'Filter by tags (comma-separated)',
            },
          },
        },
      },
      {
        name: 'get_usage_example',
        description: 'Get complete, runnable usage examples with best practices',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component or hook name',
            },
            scenario: {
              type: 'string',
              description: 'Specific use case (e.g., "form validation", "dark mode")',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_theme_config',
        description: 'Get theming configuration and customization guide',
        inputSchema: {
          type: 'object',
          properties: {
            aspect: {
              type: 'string',
              enum: ['colors', 'spacing', 'typography', 'all'],
              description: 'Theme aspect to focus on',
              default: 'all',
            },
          },
        },
      },
      {
        name: 'ask_question',
        description: 'Ask natural language questions about Saha UI with intelligent responses',
        inputSchema: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description: 'Your question about Saha UI',
            },
          },
          required: ['question'],
        },
      },
      {
        name: 'get_recommendations',
        description: 'Get smart recommendations based on your current context',
        inputSchema: {
          type: 'object',
          properties: {
            scenario: {
              type: 'string',
              description: 'What are you building? (e.g., "dashboard", "form", "landing page")',
            },
          },
          required: ['scenario'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // get_component - Enhanced with fuzzy matching and smart suggestions
    if (name === 'get_component') {
      if (!args) {
        throw new Error('Missing arguments for get_component');
      }
      const componentName = args.name as string;
      const detailLevel = (args.detail_level as string) || 'full';

      updateContext('component', componentName);
      updateContext('query', componentName);

      const docs = getComponentDocumentation(componentName);
      const suggestions = getContextualSuggestions(componentName);

      const component = COMPONENTS.find(c => c.name === componentName);
      const nextSteps = [
        `Try: get_usage_example("${componentName}") for complete code samples`,
        `Check: get_component_variants("${componentName}") for styling options`,
      ];

      const tips = component ? [
        `Complexity: ${component.complexity} - ${component.complexity === 'simple' ? 'Great for beginners!' : 'May require additional setup'}`,
        `Common use cases: ${component.tags.slice(0, 2).join(', ')}`,
      ] : [];

      let response = generateSmartResponse(docs, {
        type: 'component',
        name: componentName,
        suggestions,
        nextSteps,
        tips,
      });

      // Adjust content based on detail level
      if (detailLevel === 'brief') {
        // For brief mode, show only the main component code without styles
        const lines = response.split('\n');
        const mainSectionEnd = lines.findIndex(line => line.includes('## Styles') || line.includes('## Props'));
        if (mainSectionEnd > 0) {
          response = lines.slice(0, mainSectionEnd).join('\n');
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    }

    // get_hook - Enhanced with examples
    if (name === 'get_hook') {
      if (!args) {
        throw new Error('Missing arguments for get_hook');
      }
      const hookName = args.name as string;
      const includeExample = args.include_example !== false;

      updateContext('hook', hookName);
      updateContext('query', hookName);

      const docs = getHookDocumentation(hookName);

      const hook = HOOKS.find(h => h.name === hookName);
      const suggestions = hook ? [
        `Category: ${hook.category}`,
        `Use this when: ${hook.tags.join(', ')}`,
      ] : [];

      const nextSteps = [
        'Combine with components for enhanced functionality',
        'Check TypeScript types for full API',
      ];

      let response = generateSmartResponse(docs, {
        type: 'hook',
        name: hookName,
        suggestions,
        nextSteps,
      });

      // Filter examples based on includeExample flag
      if (!includeExample && response.includes('```')) {
        // Remove code examples if not requested
        const sections = response.split('```');
        response = sections.filter((_, index) => index % 2 === 0).join('\n\n');
      }

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    }

    // search_code - Enhanced with context
    if (name === 'search_code') {
      if (!args) {
        throw new Error('Missing arguments for search_code');
      }
      const pattern = args.pattern as string;
      const directory = (args.directory as string) || 'src';

      updateContext('query', `search: ${pattern}`);

      const results = searchInFiles(pattern, directory);

      if (results.length === 0) {
        const suggestions = [
          'Try a broader search pattern',
          'Check spelling or try fuzzy matching',
          'Search in different directory (components, hooks, lib)',
        ];

        return {
          content: [
            {
              type: 'text',
              text: generateSmartResponse(
                `No results found for "${pattern}"`,
                { suggestions }
              ),
            },
          ],
        };
      }

      let output = `# Search Results for "${pattern}"\n\nFound ${results.length} file(s)\n\n`;

      results.forEach(({ file, matches }) => {
        output += `## ${file}\n\n`;
        matches.slice(0, 10).forEach((match) => {
          output += `- ${match}\n`;
        });
        output += '\n';
      });

      const nextSteps = [
        'Use get_component or get_hook for detailed information',
        'Narrow search with more specific patterns',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(output, { nextSteps }),
          },
        ],
      };
    }

    // get_component_variants - Enhanced styling info
    if (name === 'get_component_variants') {
      if (!args) {
        throw new Error('Missing arguments for get_component_variants');
      }
      const componentName = args.name as string;
      const stylesPath = `src/components/${componentName}/styles.ts`;

      updateContext('query', `variants: ${componentName}`);

      if (fileExists(stylesPath)) {
        const content = readFileContent(stylesPath);

        const tips = [
          'Use Tailwind classes for custom styling',
          'Combine variants for unique designs',
          'Check className prop for overrides',
        ];

        return {
          content: [
            {
              type: 'text',
              text: generateSmartResponse(
                `# ${componentName} Style Variants\n\n\`\`\`typescript\n${content}\n\`\`\``,
                { tips }
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `No separate styles file found for ${componentName}. Styles may be inline in the component file.`,
          },
        ],
      };
    }

    // get_utility
    if (name === 'get_utility') {
      if (!args) {
        throw new Error('Missing arguments for get_utility');
      }
      const utilityName = args.name as string;
      const utility = UTILITIES.find((u) => u.name === utilityName);

      updateContext('query', `utility: ${utilityName}`);

      if (!utility) {
        return {
          content: [
            {
              type: 'text',
              text: `Utility "${utilityName}" not found. Available: ${UTILITIES.map(u => u.name).join(', ')}`,
            },
          ],
        };
      }

      const utilityPath = `src/${utility.file}`;
      if (!fileExists(utilityPath)) {
        return {
          content: [
            {
              type: 'text',
              text: `Utility file not found: ${utilityPath}`,
            },
          ],
        };
      }

      const content = readFileContent(utilityPath);

      const tips = [
        'Import utilities from "saha-ui/lib"',
        'Utilities are tree-shakeable',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(
              `# ${utilityName}\n\n${utility.description}\n\n\`\`\`typescript\n${content}\n\`\`\``,
              { tips }
            ),
          },
        ],
      };
    }

    // list_components_by_category - Enhanced with filtering
    if (name === 'list_components_by_category') {
      const categoryFilter = args?.category as string | undefined;
      const complexityFilter = args?.complexity as string | undefined;
      const tagsFilter = args?.tags as string | undefined;

      updateContext('query', 'list components');

      let filtered = [...COMPONENTS];

      if (categoryFilter) {
        filtered = filtered.filter(c =>
          c.category.toLowerCase().includes(categoryFilter.toLowerCase())
        );
      }

      if (complexityFilter) {
        filtered = filtered.filter(c => c.complexity === complexityFilter);
      }

      if (tagsFilter) {
        const tags = tagsFilter.split(',').map(t => t.trim().toLowerCase());
        filtered = filtered.filter(c =>
          c.tags.some(tag => tags.includes(tag.toLowerCase()))
        );
      }

      const categories: Record<string, typeof COMPONENTS> = {};
      filtered.forEach(component => {
        if (!categories[component.category]) {
          categories[component.category] = [];
        }
        categories[component.category].push(component);
      });

      let output = '# Saha UI Components\n\n';

      if (categoryFilter || complexityFilter || tagsFilter) {
        output += `**Filtered by**: `;
        const filters: string[] = [];
        if (categoryFilter) filters.push(`category="${categoryFilter}"`);
        if (complexityFilter) filters.push(`complexity="${complexityFilter}"`);
        if (tagsFilter) filters.push(`tags="${tagsFilter}"`);
        output += filters.join(', ') + '\n\n';
      }

      Object.entries(categories).forEach(([category, components]) => {
        output += `## ${category}\n\n`;
        components.forEach((component) => {
          output += `### ${component.name}\n`;
          output += `- **Complexity**: ${component.complexity}\n`;
          output += `- **Tags**: ${component.tags.join(', ')}\n`;
          output += `- **Quick access**: \`get_component("${component.name}")\`\n\n`;
        });
      });

      const nextSteps = [
        'Click on any component name to view details',
        'Use filters to narrow down options',
        'Try get_recommendations for personalized suggestions',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(output, { nextSteps }),
          },
        ],
      };
    }

    // get_usage_example - Enhanced examples
    if (name === 'get_usage_example') {
      if (!args) {
        throw new Error('Missing arguments for get_usage_example');
      }
      const componentName = args.name as string;
      const scenario = args.scenario as string | undefined;

      updateContext('query', `example: ${componentName}`);

      const examplePath = `examples/${componentName}.tsx`;

      if (fileExists(examplePath)) {
        const content = readFileContent(examplePath);

        const tips = [
          'Copy this example and modify for your needs',
          'Check props documentation for more options',
          'Combine with hooks for enhanced functionality',
        ];

        return {
          content: [
            {
              type: 'text',
              text: generateSmartResponse(
                `# ${componentName} Usage Example\n\n\`\`\`typescript\n${content}\n\`\`\``,
                { tips }
              ),
            },
          ],
        };
      }

      // Generate basic example if no file exists
      const component = COMPONENTS.find(c => c.name === componentName);
      if (component) {
        const basicExample = `import { ${componentName} } from 'saha-ui'

function Example() {
  return (
    <${componentName}>
      ${component.name} content here
    </${componentName}>
  )
}

export default Example`;

        const suggestions = [
          'This is a basic example - check component docs for more props',
          `Category: ${component.category} - explore similar components`,
        ];

        return {
          content: [
            {
              type: 'text',
              text: generateSmartResponse(
                `# ${componentName} Usage Example\n\n\`\`\`typescript\n${basicExample}\n\`\`\``,
                { suggestions }
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `Example not found for "${componentName}". Use get_component to see implementation.`,
          },
        ],
      };
    }

    // get_theme_config
    if (name === 'get_theme_config') {
      const aspect = (args?.aspect as string) || 'all';

      // Filter comparison based on aspect
      const aspectFilters: Record<string, string[]> = {
        'styling': ['appearance', 'customization', 'themes'],
        'performance': ['bundle size', 'rendering', 'optimization'],
        'features': ['props', 'variants', 'capabilities'],
        'usage': ['examples', 'use cases', 'implementation']
      };

      updateContext('query', 'theme config');

      let output = '# Saha UI Theme Configuration\n\n';

      const tailwindConfig = readFileContent('tailwind.config.js') ||
                            readFileContent('tailwind.config.ts') ||
                            'No Tailwind config found';

      output += '## Tailwind Configuration\n\n```javascript\n' + tailwindConfig + '\n```\n\n';

      const indexCSS = readFileContent('src/index.css') || '';
      if (indexCSS) {
        output += '## CSS Variables\n\n```css\n' + indexCSS + '\n```\n\n';
      }

      const tips = [
        'Use CSS variables for dynamic theming',
        'Extend Tailwind config for custom colors',
        'Components respect theme configuration automatically',
      ];

      const nextSteps = [
        'Create a custom theme by extending the config',
        'Use useTheme hook for runtime theme switching',
        'Check component variants for styling options',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(output, { tips, nextSteps }),
          },
        ],
      };
    }

    // ask_question - Natural language Q&A
    if (name === 'ask_question') {
      if (!args) {
        throw new Error('Missing arguments for ask_question');
      }
      const question = args.question as string;

      updateContext('query', question);

      const intent = detectIntent(question);
      const q = question.toLowerCase();

      // Use intent to customize the answer format
      const intentPrefixes: Record<string, string> = {
        'tutorial': '📚 **Tutorial Answer**:\n\n',
        'example': '💻 **Code Example**:\n\n',
        'styling': '🎨 **Styling Guide**:\n\n',
        'api': '📖 **API Reference**:\n\n',
        'troubleshooting': '🔧 **Solution**:\n\n'
      };

      const intentPrefix = intentPrefixes[intent] || '';

      let answer = intentPrefix;

      // Smart question routing
      if (q.includes('install') || q.includes('setup') || q.includes('get started')) {
        answer = getQuickStartGuide();
      } else if (q.includes('component') || q.includes('what components')) {
        const componentsList = COMPONENTS.map(c => `- ${c.name} (${c.category})`).join('\n');
        answer = `# Available Components\n\n${componentsList}\n\nUse \`get_component("ComponentName")\` for details.`;
      } else if (q.includes('hook') || q.includes('what hooks')) {
        const hooksList = HOOKS.map(h => `- ${h.name} (${h.category})`).join('\n');
        answer = `# Available Hooks\n\n${hooksList}\n\nUse \`get_hook("hookName")\` for details.`;
      } else if (q.includes('theme') || q.includes('style') || q.includes('color')) {
        answer = 'For theming information, use `get_theme_config()`. You can customize colors, spacing, typography, and more through Tailwind configuration.';
      } else if (q.includes('example') || q.includes('how to use')) {
        answer = 'Use `get_usage_example("ComponentName")` to see complete, runnable examples for any component or hook.';
      } else {
        answer = `I understand you're asking about: "${question}"\n\nHere are some helpful tools:\n\n- \`list_components_by_category()\` - Browse all components\n- \`get_component("Name")\` - Get component details\n- \`search_code("pattern")\` - Search the codebase\n- \`get_recommendations({scenario: "your use case"})\` - Get personalized suggestions`;
      }

      const suggestions = [
        'Be specific about component names or features',
        'Use tool commands for detailed information',
        'Check examples for real-world usage',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(answer, { suggestions }),
          },
        ],
      };
    }

    // get_recommendations - Smart suggestions
    if (name === 'get_recommendations') {
      if (!args) {
        throw new Error('Missing arguments for get_recommendations');
      }
      const scenario = args.scenario as string;

      updateContext('query', `recommendations: ${scenario}`);

      const s = scenario.toLowerCase();
      let recommendations = `# Recommendations for: ${scenario}\n\n`;

      if (s.includes('dashboard') || s.includes('admin')) {
        recommendations += `## Suggested Components\n\n`;
        recommendations += `- **Card** - For metrics and data panels\n`;
        recommendations += `- **Tabs** - For navigation between sections\n`;
        recommendations += `- **Badge** - For status indicators\n`;
        recommendations += `- **Avatar** - For user profiles\n\n`;
        recommendations += `## Useful Hooks\n\n`;
        recommendations += `- **useMediaQuery** - Responsive layouts\n`;
        recommendations += `- **useLocalStorage** - Persist user preferences\n`;
      } else if (s.includes('form')) {
        recommendations += `## Suggested Components\n\n`;
        recommendations += `- **Input** - Text fields\n`;
        recommendations += `- **Select** - Dropdowns\n`;
        recommendations += `- **Checkbox** - Boolean inputs\n`;
        recommendations += `- **Button** - Form actions\n\n`;
        recommendations += `## Useful Hooks\n\n`;
        recommendations += `- **useDebounce** - Optimize input handling\n`;
        recommendations += `- **useToggle** - Manage boolean states\n`;
      } else if (s.includes('landing') || s.includes('marketing')) {
        recommendations += `## Suggested Components\n\n`;
        recommendations += `- **Button** - Call-to-action buttons\n`;
        recommendations += `- **Card** - Feature showcases\n`;
        recommendations += `- **Modal** - Sign-up forms\n`;
        recommendations += `- **Accordion** - FAQ sections\n`;
      } else {
        recommendations += `## General Recommendations\n\n`;
        recommendations += `Based on your needs, start with:\n\n`;
        recommendations += `1. Browse \`list_components_by_category()\`\n`;
        recommendations += `2. Check examples for similar projects\n`;
        recommendations += `3. Start with simple components and build up\n`;
      }

      const nextSteps = [
        'Get detailed info for each recommended component',
        'Check usage examples to see them in action',
        'Combine components for complex UIs',
      ];

      return {
        content: [
          {
            type: 'text',
            text: generateSmartResponse(recommendations, { nextSteps }),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);

  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Prompt handlers - Pre-built conversation starters
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'component_integration',
        description: 'Help integrate a Saha UI component into an existing project',
        arguments: [
          {
            name: 'component',
            description: 'Component to integrate',
            required: true,
          },
          {
            name: 'framework',
            description: 'Target framework (Next.js, Vite, etc.)',
            required: false,
          },
        ],
      },
      {
        name: 'build_ui',
        description: 'Get step-by-step guidance to build a specific UI',
        arguments: [
          {
            name: 'description',
            description: 'Describe the UI you want to build',
            required: true,
          },
        ],
      },
      {
        name: 'customize_theme',
        description: 'Get help customizing the Saha UI theme',
        arguments: [
          {
            name: 'requirements',
            description: 'Theme customization requirements',
            required: true,
          },
        ],
      },
      {
        name: 'debug_issue',
        description: 'Debug a Saha UI component issue',
        arguments: [
          {
            name: 'problem',
            description: 'Describe the problem',
            required: true,
          },
          {
            name: 'component',
            description: 'Component having issues',
            required: false,
          },
        ],
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'component_integration') {
    const component = args?.component as string;
    const framework = (args?.framework as string) || 'React';

    updateContext('query', `integrate: ${component}`);

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Help me integrate the ${component} component from Saha UI into my ${framework} project. Show me the imports, setup, and a working example.`,
          },
        },
      ],
    };
  }

  if (name === 'build_ui') {
    const description = args?.description as string;

    updateContext('query', `build: ${description}`);

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `I want to build: ${description}. Please recommend Saha UI components and provide a step-by-step implementation guide with code examples.`,
          },
        },
      ],
    };
  }

  if (name === 'customize_theme') {
    const requirements = args?.requirements as string;

    updateContext('query', `theme: ${requirements}`);

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `I need to customize the Saha UI theme: ${requirements}. Show me how to configure colors, typography, spacing, and other theme settings.`,
          },
        },
      ],
    };
  }

  if (name === 'debug_issue') {
    const problem = args?.problem as string;
    const component = args?.component as string;

    updateContext('query', `debug: ${problem}`);

    let text = `I'm having an issue with Saha UI: ${problem}.`;
    if (component) {
      text += ` This is related to the ${component} component.`;
    }
    text += ` Please help me troubleshoot and fix this issue.`;

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Saha UI MCP Server v2.0 running on stdio (Enhanced Dynamic Mode)');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
