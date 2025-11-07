# 🚀 How to Use Saha UI MCP Server v2.0

## Quick Start

### Option 1: Interactive Test Client (Recommended)

The easiest way to test the MCP server is with the interactive client:

```bash
node test-client.js
```

This gives you an interactive prompt where you can type commands:

```
> help                              # Show all commands
> examples                          # Show example commands
> component Button                  # Get Button component
> ask How do I install Saha UI?    # Natural language query
> recommend dashboard               # Get recommendations
> exit                              # Exit
```

### Option 2: Quick Demo

Run the automated demo to see all features:

```bash
node demo-mcp.js
```

This runs through 5 examples demonstrating:
- Fuzzy matching (typo tolerance)
- Natural language queries
- Smart recommendations
- Filtered component lists
- Theme configuration

### Option 3: Real AI Client

Configure your AI assistant (Claude Desktop, Cline, etc.):

**Claude Desktop** - Edit `claude_desktop_config.json`:
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

Then restart Claude Desktop and ask questions!

---

## Testing the Server

### 1. Build First
```bash
npm run build:mcp
```

### 2. Verify Build
```bash
node dist/mcp/server.js
```
You should see: `Saha UI MCP Server v2.0 running on stdio (Enhanced Dynamic Mode)`

Press Ctrl+C to stop.

### 3. Run Validation
```bash
node validate-mcp-v2.js
```
Should show: `Total Checks: 32 | Passed: 32 | Failed: 0`

---

## Interactive Client Commands

### Basic Commands

```bash
help                    # Show all commands
examples                # Show example usage
tools                   # List all available tools
resources               # List all resources
exit                    # Exit the client
```

### Component Discovery

```bash
# Get component info
component Button
component Card
component Input

# Try with typos (fuzzy matching)
component Buton         # → Button
component inpt          # → Input
component Modl          # → Modal
```

### Hook Information

```bash
# Get hook documentation
hook useDebounce
hook useLocalStorage
hook useTheme

# Try with typos
hook useDebonc          # → useDebounce
```

### Natural Language

```bash
# Ask questions naturally
ask How do I get started with Saha UI?
ask What components should I use for a form?
ask How to customize the primary color?
ask Show me components for beginners
```

### Smart Recommendations

```bash
# Get scenario-based recommendations
recommend dashboard
recommend contact form
recommend landing page
recommend e-commerce product page
```

### Advanced Filtering

```bash
# List components with filters
list                                    # All components
list complexity=simple                  # Simple components only
list category=Form Controls             # Form components
list tags=form,input                    # By tags
list complexity=simple category=Form    # Combined filters
```

### Search & Discovery

```bash
# Search code
search useState
search "glass morphism"
search export.*function

# Get theme config
theme                   # All theme config
theme colors            # Just colors
theme spacing           # Just spacing
theme typography        # Just typography
```

### Session Context

```bash
# View current session
context
```

Shows what you've recently viewed and your interaction history.

---

## Example Workflows

### Workflow 1: Learning the Library

```bash
> ask What should I learn first?
> list complexity=simple
> component Button
> hook useToggle
> context
```

### Workflow 2: Building a Form

```bash
> recommend contact form
> component Input
> component Button
> component TextArea
> hook useDebounce
```

### Workflow 3: Customizing Theme

```bash
> ask How do I customize colors?
> theme colors
> component ThemeProvider
> component ThemeToggle
```

### Workflow 4: Finding Components

```bash
> list tags=form
> component Input
> search "form validation"
> ask Show me related components
```

---

## Understanding the Response Format

Every response includes contextual information:

```markdown
💡 **[Detected Mode]**: Brief description

[Main Content Here]

---

### 💡 Suggestions
- Related component 1
- Related component 2

### 🎯 Next Steps
- Try this command next
- Check out this feature

### 📌 Pro Tips
- Best practice 1
- Best practice 2

---

*Recently viewed: Component1, Component2*
```

---

## Troubleshooting

### Server Won't Start

```bash
# Rebuild
npm run build:mcp

# Check for errors
node --check dist/mcp/server.js

# Verify dependencies
npm install
```

### Interactive Client Issues

```bash
# Make sure server is built
npm run build:mcp

# Check Node.js version
node --version  # Should be 18+

# Run with verbose output
node test-client.js
```

### No Response

The MCP server uses JSON-RPC protocol. You **cannot** type plain text directly to `npx saha-ui-mcp`.

**Use instead:**
- `node test-client.js` - Interactive client
- `node demo-mcp.js` - Automated demo
- Configure AI client (Claude, Cline)

### Connection Issues in AI Client

```bash
# Verify installation
npm list saha-ui

# Check binary exists
ls node_modules/saha-ui/dist/mcp/server.js

# Test directly
node node_modules/saha-ui/dist/mcp/server.js
```

---

## Tips & Tricks

### 1. Don't Worry About Spelling
The server uses fuzzy matching with 60% similarity threshold:
```
"Buton" → Button ✓
"useDebonc" → useDebounce ✓
"inpt" → Input ✓
```

### 2. Use Natural Language
Instead of memorizing tool names:
```bash
ask How do I install this?
ask What's good for a dashboard?
ask Show me simple components
```

### 3. Check Context
See what you've viewed recently:
```bash
context
```

### 4. Filter Smart
Find exactly what you need:
```bash
list complexity=simple tags=form
```

### 5. Follow Suggestions
The server provides contextual next steps - follow them!

---

## Feature Highlights

### 🧠 Context Awareness
The server remembers:
- Last 5 components viewed
- Last 5 hooks viewed
- Your detected intent
- Your skill level
- Query patterns

### 🎯 Intent Detection
Automatically detects:
- Tutorial mode → Step-by-step guidance
- Example mode → Code samples
- Styling mode → Customization focus
- API mode → Technical reference
- Troubleshooting → Problem solving

### 🔍 Fuzzy Matching
Handles typos automatically using Levenshtein distance algorithm.

### 💡 Smart Suggestions
Every response includes:
- Related components
- Relevant hooks
- Next steps
- Pro tips

---

## Testing Checklist

Before deploying or using in production:

- [ ] Build successful: `npm run build:mcp`
- [ ] Validation passes: `node validate-mcp-v2.js`
- [ ] Server starts: `node dist/mcp/server.js`
- [ ] Interactive client works: `node test-client.js`
- [ ] Demo runs: `node demo-mcp.js`
- [ ] AI client configured
- [ ] Test queries work

---

## Common Use Cases

### For Beginners

```bash
> ask How do I get started?
> list complexity=simple
> component Button
> ask Show me an example
```

### For Developers

```bash
> recommend dashboard
> component DataTable
> hook useMediaQuery
> search "responsive"
```

### For Designers

```bash
> theme colors
> component Card
> ask How to customize styles?
> search "variant"
```

### For Teams

```bash
> list                    # Browse all components
> component Button        # Standard usage
> ask Best practices      # Team conventions
```

---

## Performance

- **Startup**: < 100ms
- **Response Time**: < 300ms
- **Memory**: ~50MB base
- **Bundle Size**: 43.32 kB (9.75 kB gzipped)

---

## Documentation

- **Complete Guide**: `docs/MCP_SERVER.md`
- **Dynamic Features**: `docs/MCP_DYNAMIC_FEATURES.md`
- **v1 vs v2**: `docs/MCP_V1_VS_V2.md`
- **Update Summary**: `DYNAMIC_MCP_UPDATE.md`
- **Quick Start**: `QUICK_START_V2.md`
- **Issues Fixed**: `ISSUES_FIXED.md`

---

## Support

### Getting Help

1. Check documentation: `docs/MCP_SERVER.md`
2. Run validation: `node validate-mcp-v2.js`
3. Ask the server: `ask How do I...`
4. Review examples: `node demo-mcp.js`

### Reporting Issues

If you find issues:
1. Run validation script
2. Check build status
3. Review error messages
4. Report with details

---

## Quick Reference

```bash
# Build & Test
npm run build:mcp                 # Build server
node validate-mcp-v2.js           # Validate
node test-client.js               # Interactive test
node demo-mcp.js                  # Quick demo

# Interactive Commands
help                              # All commands
component <name>                  # Get component
hook <name>                       # Get hook
ask <question>                    # Natural language
recommend <scenario>              # Get suggestions
list [filters]                    # List components
search <pattern>                  # Search code
theme [aspect]                    # Theme config
context                           # Session state
exit                              # Quit

# AI Client
npx saha-ui-mcp                   # Start server
```

---

**Enjoy using Saha UI MCP Server v2.0!** 🚀

For the best experience, start with the interactive client:
```bash
node test-client.js
```

Then try asking: "What can you do?"