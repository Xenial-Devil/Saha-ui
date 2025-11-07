# 🚀 Saha UI MCP Server v2.0 - Quick Start

## ✨ What You Get

A dynamic, intelligent MCP server with:
- 🧠 Context awareness (remembers your session)
- 🎯 Intent detection (understands what you need)
- 🔍 Fuzzy matching (handles typos)
- 💡 Smart suggestions (proactive help)
- 💬 Natural language (ask questions normally)

## 📦 Installation

```bash
# Already installed with Saha UI!
npm install saha-ui
```

## 🎬 30-Second Setup

### 1. Build (if needed)
```bash
npm run build:mcp
```

### 2. Configure AI Client

**Claude Desktop** (`claude_desktop_config.json`):
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

**Cline/VS Code** (settings):
```json
{
  "saha-ui": {
    "command": "npx",
    "args": ["saha-ui-mcp"]
  }
}
```

### 3. Test It
```bash
npx saha-ui-mcp
```
You should see: `Saha UI MCP Server v2.0 running on stdio (Enhanced Dynamic Mode)`

### 4. Done! 🎉

## 💬 Try These Queries

### Natural Language
```
"How do I get started with Saha UI?"
"What components should I use for a form?"
"Show me the Button component"
"How to customize colors?"
```

### With Typos (They Work!)
```
"Show me the Buton component"  ✅ → Button
"inpt component"                ✅ → Input
"useDebonc hook"                ✅ → useDebounce
```

### Smart Recommendations
```
"Recommend components for a dashboard"
"What's good for a contact form?"
"Components for beginners"
```

## 🎯 Key Features

| Feature | What It Does | Example |
|---------|--------------|---------|
| **Context Aware** | Remembers what you viewed | Views Input → Suggests useDebounce |
| **Intent Detection** | Understands your goal | "How to style" → Shows variants |
| **Fuzzy Match** | Handles typos | "Botton" → Button |
| **Smart Suggest** | Proactive tips | Shows related components |
| **Natural Language** | Ask normally | Plain English works |

## 📚 Common Commands

```typescript
// Discover components
ask_question({ question: "What components are available?" })

// Get recommendations
get_recommendations({ scenario: "dashboard" })

// View component (with typo tolerance)
get_component({ name: "Buton" })  // Works!

// Filter by complexity
list_components_by_category({ complexity: "simple" })

// Search code
search_code({ pattern: "useState" })

// Get examples
get_usage_example({ name: "Button" })
```

## 🔥 Hot Tips

1. **Don't Worry About Spelling** - Fuzzy matching fixes typos
2. **Ask Natural Questions** - The server understands
3. **Follow Suggestions** - They're context-aware
4. **Start Simple** - Filter by `complexity: "simple"`
5. **Check Context** - Access `saha-ui://session/context`

## 📖 Response Format

Every response includes:
```markdown
💡 **Mode Detected**: [What you're trying to do]

[Main Content]

---

### 💡 Suggestions
- [Smart recommendations]

### 🎯 Next Steps
- [What to do next]

### 📌 Pro Tips
- [Best practices]

---

*Recently viewed: Component1, Component2*
```

## 🎨 Example Session

```
You: "Show me simple form components"
AI: Lists Input, Button, Checkbox (complexity: simple)

You: "Tell me about the Input component"
AI: Shows Input with props, suggests useDebounce hook

You: "Show me an example"
AI: Provides complete code sample with best practices

You: "How to customize it?"
AI: [Detects styling intent] Shows variants and theme config
```

## 🆘 Troubleshooting

### Server won't start?
```bash
# Rebuild
npm run build:mcp

# Test
node dist/mcp/server.js
```

### AI client can't connect?
```bash
# Check installation
npm list saha-ui

# Verify path
ls node_modules/saha-ui/dist/mcp/server.js
```

### Need help?
```bash
# Run validation
node validate-mcp-v2.js

# Check docs
cat docs/MCP_SERVER.md
```

## 📚 Full Documentation

- **Complete Guide**: `docs/MCP_SERVER.md`
- **Dynamic Features**: `docs/MCP_DYNAMIC_FEATURES.md`
- **All Changes**: `DYNAMIC_MCP_UPDATE.md`
- **v1 vs v2**: `docs/MCP_V1_VS_V2.md`

## ✅ Verify It's Working

```bash
# Run validation
node validate-mcp-v2.js

# Should show:
# ✓ Total Checks: 32
# ✓ Passed: 32
# ✓ Failed: 0
# ✓ Success Rate: 100%
```

## 🎯 Next Steps

1. ✅ Configure AI client
2. ✅ Ask your first question
3. ✅ Try fuzzy matching (with typos)
4. ✅ Get recommendations
5. ✅ Build something awesome!

## 🌟 Pro Mode

### Advanced Filtering
```typescript
list_components_by_category({
  category: "Form Controls",
  complexity: "simple",
  tags: "input,form"
})
```

### Focused Theme Config
```typescript
get_theme_config({ aspect: "colors" })
```

### Detail Level Control
```typescript
get_component({ 
  name: "Button",
  detail_level: "summary"  // or "full", "code_only"
})
```

### Check Session Context
```
Resource: saha-ui://session/context
Returns: Your current session state
```

---

## 💡 Remember

- **It's smart** - Context-aware responses
- **It's forgiving** - Typos are okay
- **It's helpful** - Proactive suggestions
- **It's conversational** - Ask naturally
- **It's adaptive** - Learns your intent

---

**Ready to try?**

```bash
npx saha-ui-mcp
```

Then ask: *"What can you do?"*

---

**Saha UI MCP Server v2.0** | Making AI assistance feel human 🚀