# 🧪 Saha UI MCP Server v2.0 - Testing Guide

## 🚀 Quick Start - How to Test

The MCP server uses **JSON-RPC protocol** over stdin/stdout. You **cannot** type plain text directly to it. Use one of these methods:

### Method 1: Interactive Test Client ⭐ RECOMMENDED

```bash
npm run mcp:client
```

**What you get:**
- Interactive prompt with commands
- Real-time responses
- Easy to use and understand
- Perfect for testing all features

**Example session:**
```
> help                              # Show commands
> component Button                  # Get Button component
> ask How do I change colors?      # Natural language
> recommend dashboard               # Get suggestions
> exit                              # Exit
```

### Method 2: Quick Demo

```bash
npm run mcp:demo
```

**What it does:**
- Runs 5 automated demos
- Shows fuzzy matching (typo tolerance)
- Demonstrates natural language queries
- Shows smart recommendations
- Takes ~30 seconds

### Method 3: Validate Everything

```bash
npm run mcp:validate
```

**What it checks:**
- All files exist (32 checks)
- Features implemented
- Documentation complete
- Server starts correctly
- Should show: 100% success rate

### Method 4: Real AI Client

Configure Claude Desktop or Cline and use naturally!

---

## 📋 Pre-Testing Checklist

Before testing, ensure:

```bash
# 1. Install dependencies
npm install

# 2. Build the MCP server
npm run build:mcp

# 3. Verify build
ls dist/mcp/server.js  # Should exist
```

---

## 🎯 What to Test

### 1. Fuzzy Matching (Typo Tolerance)

**Test with interactive client:**
```bash
npm run mcp:client
```

Then try:
```
> component Buton          # Should suggest/show Button
> component Botton         # Should suggest/show Button
> component inpt           # Should suggest/show Input
> hook useDebonc           # Should suggest/show useDebounce
```

**Expected:** Server corrects typos automatically

### 2. Natural Language Queries

```
> ask How do I install Saha UI?
> ask What components should I use for a form?
> ask How to customize the primary color?
> ask Show me components for beginners
```

**Expected:** Smart responses routing to appropriate tools

### 3. Context Awareness

```
> component Input          # View Input
> hook useDebounce        # View useDebounce
> context                 # Check session context
```

**Expected:** Session shows recent views, tracks intent

### 4. Smart Recommendations

```
> recommend dashboard
> recommend contact form
> recommend landing page
```

**Expected:** Relevant component suggestions + hooks

### 5. Advanced Filtering

```
> list complexity=simple
> list tags=form,input
> list category=Form Controls
> list complexity=simple tags=form
```

**Expected:** Filtered component lists

### 6. Search Capabilities

```
> search useState
> search "glass morphism"
> search export.*function
```

**Expected:** Code search results with context

### 7. Theme Configuration

```
> theme
> theme colors
> theme spacing
> theme typography
```

**Expected:** Theme config focused by aspect

---

## 🔍 Testing Commands Reference

### Interactive Client Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | Show all commands | `help` |
| `examples` | Show example commands | `examples` |
| `component <name>` | Get component info | `component Button` |
| `hook <name>` | Get hook info | `hook useDebounce` |
| `ask <question>` | Natural language query | `ask How to install?` |
| `recommend <scenario>` | Get recommendations | `recommend dashboard` |
| `list [filters]` | List components | `list complexity=simple` |
| `search <pattern>` | Search code | `search useState` |
| `theme [aspect]` | Get theme config | `theme colors` |
| `context` | View session context | `context` |
| `tools` | List all tools | `tools` |
| `resources` | List all resources | `resources` |
| `exit` | Exit client | `exit` |

---

## ✅ Expected Behaviors

### Fuzzy Matching
- ✅ "Buton" → Suggests Button
- ✅ "inpt" → Suggests Input
- ✅ "useDebonc" → Suggests useDebounce
- ✅ Threshold: 60% similarity

### Intent Detection
- ✅ "How to..." → Tutorial mode
- ✅ "Show example..." → Example mode
- ✅ "Customize..." → Styling mode
- ✅ "Fix..." → Troubleshooting mode

### Context Tracking
- ✅ Remembers last 5 components
- ✅ Remembers last 5 hooks
- ✅ Detects user intent
- ✅ Tracks query count

### Smart Responses
- ✅ Related components suggested
- ✅ Relevant hooks recommended
- ✅ Next steps provided
- ✅ Pro tips included
- ✅ Recently viewed shown

---

## 🐛 Troubleshooting

### Server Won't Start

```bash
# Rebuild
npm run build:mcp

# Check syntax
node --check dist/mcp/server.js

# Verify dependencies
npm install
npm list @modelcontextprotocol/sdk
```

### Interactive Client Issues

```bash
# Make sure server is built
npm run build:mcp

# Check Node version (needs 18+)
node --version

# Run with error output
node test-client.js 2>&1
```

### No Response from Server

**Problem:** You typed directly to `npx saha-ui-mcp`

**Why:** MCP uses JSON-RPC protocol, not plain text

**Solution:** Use interactive client instead:
```bash
npm run mcp:client
```

### Validation Fails

```bash
# See what failed
npm run mcp:validate

# Common fixes:
npm install              # Install dependencies
npm run build:mcp        # Rebuild server
node dist/mcp/server.js  # Test startup
```

---

## 📊 Test Results Expectations

### Validation Script
```
✅ Total Checks: 32
✅ Passed: 32
✅ Failed: 0
✅ Success Rate: 100.0%
```

### Interactive Client
- Starts without errors
- Shows prompt: `>`
- Responds to commands
- Handles typos gracefully
- Provides smart suggestions

### Demo Script
- Runs 5 demos successfully
- Each demo shows response
- No timeout errors
- Completes in ~30 seconds

---

## 🎯 Test Scenarios

### Scenario 1: New User Learning

```bash
npm run mcp:client
```

```
> ask What should I learn first?
> list complexity=simple
> component Button
> ask Show me an example
> exit
```

**Expected:**
- Beginner-friendly guidance
- Simple components shown
- Code examples provided
- Next steps suggested

### Scenario 2: Building a Feature

```
> recommend contact form
> component Input
> component Button
> hook useDebounce
> context
```

**Expected:**
- Relevant components suggested
- Props and usage shown
- Hooks recommended
- Context shows viewing history

### Scenario 3: Customization

```
> ask How do I customize colors?
> theme colors
> component ThemeProvider
> search "theme"
```

**Expected:**
- Styling mode activated
- Theme config shown
- Related components found
- Search results relevant

---

## 💡 Tips for Testing

### 1. Start with Validation
```bash
npm run mcp:validate
```
Ensures everything is set up correctly.

### 2. Run the Demo
```bash
npm run mcp:demo
```
See all features in action quickly.

### 3. Use Interactive Client
```bash
npm run mcp:client
```
Best for thorough testing and exploration.

### 4. Test Edge Cases
- Try extreme typos: "Bttn", "inpu", "usDbnc"
- Ask weird questions
- Use empty filters
- Search for non-existent patterns

### 5. Check Context
```
> context
```
Verify session tracking works.

---

## 📈 Performance Benchmarks

**Expected Performance:**
- Startup: < 100ms
- Response: < 300ms
- Memory: ~50MB base
- Bundle: 43.32 kB (9.75 kB gzipped)

**Test performance:**
```bash
# Measure startup
time node dist/mcp/server.js &

# Measure response (interactive client)
npm run mcp:client
> component Button  # Note response time
```

---

## 🔐 Security Testing

The server is read-only and local:
- ✅ No network access
- ✅ No file writing
- ✅ No code execution
- ✅ Path validation (no traversal)
- ✅ Input sanitization

**Test security:**
- Try path traversal: `component ../../etc/passwd`
- Try command injection: `search "$(ls)"`
- Expected: Safely handled or rejected

---

## 📝 Test Report Template

After testing, document results:

```markdown
## Test Report - Saha UI MCP Server v2.0

**Date:** YYYY-MM-DD
**Tester:** Your Name
**Environment:** OS, Node version

### Build Status
- [ ] Build successful
- [ ] No errors
- [ ] No warnings

### Validation
- [ ] 32/32 checks passed
- [ ] Server starts correctly
- [ ] All files present

### Feature Testing
- [ ] Fuzzy matching works
- [ ] Natural language works
- [ ] Context tracking works
- [ ] Recommendations work
- [ ] Filtering works
- [ ] Search works

### Performance
- [ ] Startup < 100ms
- [ ] Response < 300ms
- [ ] Memory reasonable

### Issues Found
- None / List issues here

### Overall Status
✅ PASS / ❌ FAIL

**Notes:** Additional observations
```

---

## 🚦 Quick Status Check

```bash
# One-liner to check everything
npm run build:mcp && npm run mcp:validate && npm run mcp:demo
```

**Expected output:**
1. Build completes successfully
2. Validation shows 100% pass
3. Demo runs all 5 tests
4. No errors anywhere

---

## 📚 Additional Resources

- **Full Documentation:** `docs/MCP_SERVER.md`
- **Feature Reference:** `docs/MCP_DYNAMIC_FEATURES.md`
- **How to Use:** `HOW_TO_USE.md`
- **Quick Start:** `QUICK_START_V2.md`
- **Issues Fixed:** `ISSUES_FIXED.md`

---

## 🎉 Success Criteria

Your testing is complete when:

- ✅ Validation shows 100% pass
- ✅ Demo runs without errors
- ✅ Interactive client works smoothly
- ✅ Fuzzy matching handles typos
- ✅ Natural language queries work
- ✅ Context tracking functions
- ✅ Smart suggestions appear
- ✅ All commands respond
- ✅ Performance acceptable
- ✅ No crashes or hangs

---

## 🆘 Getting Help

If you encounter issues:

1. **Check documentation:** `HOW_TO_USE.md`
2. **Run validation:** `npm run mcp:validate`
3. **Review logs:** Check error messages
4. **Rebuild:** `npm run build:mcp`
5. **Reinstall:** `npm install`

---

## 🎯 Next Steps After Testing

Once testing passes:

1. **Configure AI Client:**
   - Claude Desktop: `claude_desktop_config.json`
   - Cline: VS Code settings
   - Use: `npx saha-ui-mcp`

2. **Deploy:**
   ```bash
   npm run build
   npm publish
   ```

3. **Celebrate!** 🎉

---

**Ready to test?**

```bash
npm run mcp:client
```

Ask: "What can you do?"

---

**Saha UI MCP Server v2.0** - Making AI assistance feel human 🚀