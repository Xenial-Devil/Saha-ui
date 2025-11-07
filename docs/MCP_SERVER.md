# Saha UI MCP Server - Dynamic & Context-Aware

## Overview

The Saha UI MCP Server is an intelligent, context-aware Model Context Protocol server that provides AI assistants with seamless access to the Saha UI component library. Unlike traditional static documentation servers, this implementation features:

- 🧠 **Context Awareness** - Remembers your session and adapts responses
- 🎯 **Intent Detection** - Understands natural language queries
- 🔍 **Fuzzy Matching** - Handles typos and partial names gracefully
- 💡 **Smart Suggestions** - Proactive recommendations based on context
- 📊 **Progressive Disclosure** - Shows summaries first, details on request
- 🤝 **Human-like Interaction** - Smooth, conversational responses

## Features

### 1. Context-Aware Sessions

The server tracks your interaction history to provide personalized responses:

```javascript
// Tracks:
- Recently viewed components
- Recently used hooks
- User intent (tutorial, example, styling, etc.)
- Skill level detection
- Query patterns
```

### 2. Intent Detection

Automatically detects what you're trying to do:

- **Tutorial Mode**: Step-by-step guidance
- **Example Mode**: Working code samples
- **Styling Mode**: Customization and theming
- **API Mode**: Technical reference
- **Troubleshooting Mode**: Problem solving
- **Discovery Mode**: Finding alternatives

### 3. Fuzzy Matching

Handles typos and partial matches:

```typescript
// All of these work:
"Buton" → Button
"inpt" → Input
"modl" → Modal
"useDebonc" → useDebounce
```

### 4. Smart Suggestions

Every response includes contextual suggestions:

- Related components in the same category
- Relevant hooks for the current component
- Next steps based on your intent
- Pro tips for better usage

## Installation

```bash
npm install saha-ui
# or
yarn add saha-ui
```

## Quick Start

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "saha-ui": {
      "command": "npx",
      "args": ["saha-ui-mcp"]
    }
  }
}
```

### Cline/VS Code Configuration

```json
{
  "mcpServers": {
    "saha-ui": {
      "command": "node",
      "args": ["./node_modules/saha-ui/dist/mcp/server.js"]
    }
  }
}
```

### Direct Usage

```bash
npx saha-ui-mcp
```

## Resources

The server provides these documentation resources:

| URI | Description |
|-----|-------------|
| `saha-ui://docs/quick-start` | Quick start guide |
| `saha-ui://docs/components` | All components with metadata |
| `saha-ui://docs/hooks` | Custom React hooks |
| `saha-ui://docs/theming` | Theming and customization |
| `saha-ui://docs/readme` | Main documentation |
| `saha-ui://package` | Package configuration |
| `saha-ui://session/context` | Current session context |

## Tools

### Component & Hook Discovery

#### `get_component`
Get detailed component information with smart suggestions.

```typescript
{
  name: string;              // Component name (fuzzy matching)
  detail_level?: 'summary' | 'full' | 'code_only'; // Default: 'full'
}
```

**Example:**
```
get_component({ name: "Button" })
get_component({ name: "Buton", detail_level: "summary" }) // Fuzzy match
```

**Response includes:**
- Component implementation
- Props and TypeScript types
- Category and complexity
- Related components
- Useful hooks
- Next steps

#### `get_hook`
Get custom React hook documentation with examples.

```typescript
{
  name: string;              // Hook name (fuzzy matching)
  include_example?: boolean; // Default: true
}
```

**Example:**
```
get_hook({ name: "useDebounce" })
get_hook({ name: "useLocalStorage", include_example: true })
```

#### `list_components_by_category`
Browse components with smart filtering.

```typescript
{
  category?: string;         // Filter by category
  complexity?: 'simple' | 'medium' | 'complex'; // Filter by complexity
  tags?: string;             // Comma-separated tags
}
```

**Example:**
```
list_components_by_category()
list_components_by_category({ category: "Form Controls" })
list_components_by_category({ complexity: "simple", tags: "form,input" })
```

### Code Search & Analysis

#### `search_code`
Search the codebase with context-aware results.

```typescript
{
  pattern: string;           // Search pattern (regex supported)
  directory?: string;        // Default: 'src'
  context_lines?: number;    // Lines of context (default: 2)
}
```

**Example:**
```
search_code({ pattern: "useState" })
search_code({ pattern: "glass.*morphism", directory: "src/components" })
```

### Styling & Customization

#### `get_component_variants`
Get all style variants for a component.

```typescript
{
  name: string;              // Component name
}
```

**Example:**
```
get_component_variants({ name: "Button" })
```

**Response includes:**
- CVA variants
- Tailwind classes
- Customization tips
- Styling best practices

#### `get_theme_config`
Get theming configuration and guide.

```typescript
{
  aspect?: 'colors' | 'spacing' | 'typography' | 'all'; // Default: 'all'
}
```

**Example:**
```
get_theme_config()
get_theme_config({ aspect: "colors" })
```

### Examples & Utilities

#### `get_usage_example`
Get complete, runnable code examples.

```typescript
{
  name: string;              // Component or hook name
  scenario?: string;         // Specific use case
}
```

**Example:**
```
get_usage_example({ name: "Button" })
get_usage_example({ name: "Input", scenario: "form validation" })
```

#### `get_utility`
Get utility function documentation.

```typescript
{
  name: string;              // Utility name
}
```

**Example:**
```
get_utility({ name: "cn" })
```

### Intelligent Assistance

#### `ask_question`
Ask natural language questions with intelligent routing.

```typescript
{
  question: string;          // Your question
}
```

**Example:**
```
ask_question({ question: "How do I install Saha UI?" })
ask_question({ question: "What components should I use for a form?" })
ask_question({ question: "How to customize theme colors?" })
```

The server automatically detects intent and routes to appropriate tools.

#### `get_recommendations`
Get personalized component recommendations.

```typescript
{
  scenario: string;          // What you're building
}
```

**Example:**
```
get_recommendations({ scenario: "dashboard" })
get_recommendations({ scenario: "landing page" })
get_recommendations({ scenario: "e-commerce product page" })
```

**Response includes:**
- Suggested components
- Useful hooks
- Layout patterns
- Best practices

## Prompts

Pre-built conversation starters for common tasks:

### `component_integration`
Get step-by-step integration help.

```typescript
{
  component: string;         // Component to integrate
  framework?: string;        // Target framework (default: React)
}
```

### `build_ui`
Build a complete UI with guidance.

```typescript
{
  description: string;       // Describe the UI
}
```

### `customize_theme`
Customize the Saha UI theme.

```typescript
{
  requirements: string;      // Theme requirements
}
```

### `debug_issue`
Debug component issues.

```typescript
{
  problem: string;           // Describe the problem
  component?: string;        // Component having issues
}
```

## Interactive Examples

### Example 1: Discover and Use a Component

```
You: "Show me form components"
Assistant uses: list_components_by_category({ category: "Form Controls" })

You: "Tell me about the Input component"
Assistant uses: get_component({ name: "Input" })

Response includes:
- Input implementation and props
- Related: Select, TextArea, Checkbox
- Useful hooks: useDebounce, useLocalStorage
- Next steps: get_usage_example, get_component_variants

You: "Show me an example"
Assistant uses: get_usage_example({ name: "Input" })
```

### Example 2: Build a Dashboard

```
You: "I need to build a dashboard"
Assistant uses: get_recommendations({ scenario: "dashboard" })

Recommendations:
- Card (for metrics)
- Tabs (for navigation)
- Badge (for status)
- Avatar (for users)
- Hooks: useMediaQuery, useLocalStorage

You: "Show me the Card component"
Assistant uses: get_component({ name: "Card" })

You: "How do I customize the card styles?"
Assistant uses: get_component_variants({ name: "Card" })
```

### Example 3: Customize Theme

```
You: "How do I change the primary color?"
Intent detected: styling
Assistant uses: get_theme_config({ aspect: "colors" })

Response includes:
- Tailwind config
- CSS variables
- Tips for dynamic theming
- Next steps: useTheme hook

You: "Show me the theme toggle component"
Assistant uses: get_component({ name: "ThemeToggle" })
```

## Smart Response Format

Every response includes contextual information:

```markdown
💡 **[Detected Mode]**: [Mode description]

[Main Content]

---

### 💡 Suggestions
- [Contextual suggestion 1]
- [Contextual suggestion 2]

### 🎯 Next Steps
- [Recommended next action 1]
- [Recommended next action 2]

### 📌 Pro Tips
- [Helpful tip 1]
- [Helpful tip 2]

---

*Recently viewed: [Component1, Component2, Component3]*
```

## Session Context

The server maintains context throughout your session:

```json
{
  "recentComponents": ["Button", "Input", "Card"],
  "recentHooks": ["useDebounce", "useLocalStorage"],
  "userIntent": "styling",
  "skillLevel": "intermediate",
  "lastQuery": "get_component_variants",
  "queryCount": 15,
  "timestamp": 1234567890
}
```

Access it via: `saha-ui://session/context`

## Advanced Features

### Fuzzy Matching Algorithm

Uses Levenshtein distance with smart weighting:

```typescript
// Match threshold: 0.6 (60% similarity)
// Exact match: 1.0
// Substring match: 0.8
// Levenshtein: scaled by string length
```

### Intent Detection Patterns

```typescript
'tutorial' → "how to", "guide", "learn"
'example' → "example", "demo", "sample"
'styling' → "style", "customize", "theme"
'api' → "props", "api", "parameters"
'discovery' → "similar", "alternative", "related"
'troubleshooting' → "error", "fix", "problem"
'recommendation' → "best", "recommend", "should i"
```

### Context-Aware Suggestions

Suggestions adapt based on:
- Current component category
- User's intent
- Recently viewed items
- Component complexity
- Common usage patterns

## Performance

- **Fast startup**: < 100ms
- **Low memory**: ~50MB
- **Instant search**: Regex-based with smart caching
- **No network**: Fully local operation

## Security

- ✅ Read-only access
- ✅ Path validation (no traversal)
- ✅ Local-only (no network calls)
- ✅ No code execution
- ✅ Sandboxed file access

## Troubleshooting

### Server not starting

```bash
# Check installation
npm list saha-ui

# Rebuild if needed
npm rebuild saha-ui

# Test directly
node ./node_modules/saha-ui/dist/mcp/server.js
```

### Fuzzy matching not working

The server automatically handles typos with 60% similarity threshold. If a component isn't found, it will suggest alternatives.

### Context not persisting

Context is session-based and resets when the server restarts. This is by design for security and privacy.

### AI not using tools correctly

Make sure your AI client is configured to use MCP tools. Check:
1. MCP server is running (check logs)
2. Tools are listed (`list_tools`)
3. AI has permission to call tools

## Best Practices

### 1. Start Broad, Get Specific

```
1. list_components_by_category()
2. get_component({ name: "Button" })
3. get_usage_example({ name: "Button" })
```

### 2. Use Fuzzy Matching

Don't worry about exact spelling - the server will figure it out.

### 3. Leverage Context

The server remembers what you've viewed - use this to get better suggestions.

### 4. Ask Natural Questions

Use `ask_question` for conversational queries - it routes to the right tool.

### 5. Get Recommendations

Use `get_recommendations` when starting a new project or feature.

## Examples by Use Case

### Building a Form

```typescript
1. get_recommendations({ scenario: "contact form" })
2. get_component({ name: "Input" })
3. get_component({ name: "Button" })
4. get_hook({ name: "useDebounce" })
5. get_usage_example({ name: "Input", scenario: "form validation" })
```

### Customizing Theme

```typescript
1. get_theme_config({ aspect: "colors" })
2. get_component({ name: "ThemeProvider" })
3. get_component({ name: "ThemeToggle" })
4. get_hook({ name: "useTheme" })
```

### Learning the Library

```typescript
1. ask_question({ question: "How do I get started?" })
2. list_components_by_category({ complexity: "simple" })
3. get_component({ name: "Button" })
4. get_usage_example({ name: "Button" })
```

## API Reference

### Component Metadata

```typescript
interface Component {
  name: string;
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  tags: string[];
}
```

### Hook Metadata

```typescript
interface Hook {
  name: string;
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  tags: string[];
}
```

### Session Context

```typescript
interface SessionContext {
  recentComponents: string[];
  recentHooks: string[];
  userIntent: string | null;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  lastQuery: string | null;
  queryCount: number;
  timestamp: number;
}
```

## Contributing

To enhance the MCP server:

1. Edit `mcp/server.ts`
2. Add new tools, resources, or prompts
3. Implement fuzzy matching for new entities
4. Add context-aware suggestions
5. Test with real AI interactions

## Version History

### v2.0.0 - Dynamic & Context-Aware
- ✨ Context-aware session tracking
- ✨ Intent detection
- ✨ Fuzzy matching
- ✨ Smart suggestions
- ✨ Progressive disclosure
- ✨ Natural language Q&A
- ✨ Personalized recommendations

### v1.0.0 - Initial Release
- Basic component/hook documentation
- Code search
- Theme configuration
- Usage examples

## License

MIT - Same as Saha UI

## Support

- 📖 [Full Documentation](https://github.com/your-repo/saha-ui)
- 💬 [Discord Community](https://discord.gg/your-server)
- 🐛 [Report Issues](https://github.com/your-repo/saha-ui/issues)
- 📧 [Email Support](mailto:support@your-domain.com)

---

**Built with ❤️ for the AI-assisted development workflow**