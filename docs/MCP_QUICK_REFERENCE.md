# Saha UI MCP Server - Quick Reference

## 🚀 Installation & Setup (3 Steps)

### 1. Install Saha UI
```bash
npm install saha-ui
```

### 2. Configure Your AI Client

**Claude Desktop** (`%APPDATA%\Claude\claude_desktop_config.json`):
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

**Cline (VS Code)** - Add to MCP Settings:
```json
{
  "saha-ui": {
    "command": "npx",
    "args": ["saha-ui-mcp"]
  }
}
```

### 3. Restart Your AI Client

Done! 🎉

---

## 💬 Example Queries

### Get Component Info
```
"Show me the Button component from Saha UI"
"What props does the Card component accept?"
"Get all variants for the DataTable component"
```

### Build UIs
```
"Create a login form using Saha UI components"
"Build a dashboard with sidebar using Saha UI"
"Design a user profile page"
```

### Integration Help
```
"Help me integrate DatePicker into Next.js 15"
"How do I setup ThemeProvider in React?"
"Show me dark mode setup with Saha UI"
```

### Search & Explore
```
"Find all components using glass morphism"
"List all Form components"
"What hooks are available for forms?"
```

### Theme Customization
```
"Change the primary color to purple"
"How do I customize the theme?"
"Explain the OKLCH color system"
```

---

## 🛠️ Available Tools

| Tool | Purpose | Example Query |
|------|---------|---------------|
| `get_component` | Get component source & docs | "Show me the Button component" |
| `get_hook` | Get hook implementation | "How does useDebounce work?" |
| `search_code` | Search codebase | "Find glass variant usage" |
| `get_component_variants` | Get CVA variants | "What Button variants exist?" |
| `get_utility` | Get utility functions | "Show me the cn function" |
| `list_components_by_category` | List by category | "List all Layout components" |
| `get_usage_example` | Get examples | "Example of DataTable usage" |
| `get_theme_config` | Get theme info | "Show theme configuration" |

---

## 📦 Component Categories (73 Total)

### Layout (4)
Container • Stack • Grid • Section

### Navigation (7)
Breadcrumb • Link • NavigationMenu • Menubar • Steps • Tab • Pagination

### Form Controls (15+)
Button • Input • Checkbox • Radio • Switch • Select • TextArea • Slider • DatePicker • Upload • Autocomplete • Combobox • TagInput • InputOTP • NativeSelect

### Data Display (15+)
Badge • Card • Table • DataTable • List • Avatar • AvatarGroup • Image • Typography • Tag • Chip • Timeline • Tree • Item • Kbd • Empty

### Feedback (7)
Alert • Toast • Sonner • Progress • Spinner • Skeleton • Rating

### Overlay (8)
Dialog • Drawer • Popover • Tooltip • HoverCard • ContextMenu • Dropdown • Command

### Media (6)
Carousel • AspectRatio • PlayButton • Chart • CodeEditor • TextEditor

### Utility (8)
Separator • ScrollArea • Resizable • Collapsible • Accordion • Field • Form • Calendar

### Theming (2)
ThemeProvider • ThemeToggle

### Interaction (5)
Toggle • ToggleGroup • ButtonGroup • FloatingActionButton • Calendar

---

## 🪝 Popular Hooks (40+ Total)

**State Management**
- useControllableState
- useToggle
- useCounter
- useArray

**UI & Interaction**
- useAccordion
- useDisclosure
- useHover
- useClickOutside
- useFocusTrap

**Data & Forms**
- useForm
- useValidation
- useDebounce
- useThrottle
- useSearchFilter

**Browser APIs**
- useMediaQuery
- useLocalStorage
- useSessionStorage
- useClipboard
- useWindowSize

**Effects & Timing**
- useInterval
- useTimeout
- useUpdateEffect
- usePrevious
- useAsync

**Advanced**
- useIntersectionObserver
- useEventListener
- useAnimation
- useReducedMotion
- useMergedRefs

---

## 🔧 Troubleshooting

### Server Not Connecting
```bash
# Test the server directly
npx saha-ui-mcp

# Or check installation
npm list saha-ui
```

### Component Not Found
- Use exact names: `Button` not `button`
- Ask: "List all Saha UI components"

### Node Version
```bash
node --version  # Must be 18+
```

---

## 📚 Resources

- **Full Documentation**: [MCP_SERVER.md](./MCP_SERVER.md)
- **Main README**: [../README.md](../README.md)
- **GitHub**: [Saha-ui Repository](https://github.com/Xenial-Devil/Saha-ui)
- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

## 🎯 What You Get

✅ Access to all 73 components with source code  
✅ 40+ custom hooks with implementations  
✅ TypeScript types and interfaces  
✅ CVA variants for styling  
✅ Theme configuration and OKLCH colors  
✅ Code search across the codebase  
✅ Real-time, always up-to-date information  
✅ AI-powered component discovery  

---

## ⚡ Pro Tips

1. **Be specific**: "Show Button with all variants" > "Show button"
2. **Ask for examples**: "Example of DataTable with sorting" > "How does DataTable work?"
3. **Combine components**: "Create form using Input, Button, and Card"
4. **Request integration**: "Integrate ThemeProvider in Next.js 15"
5. **Explore categories**: "Show all Feedback components"

---

**Version**: 1.14.0+  
**License**: MIT  
**Made with ❤️ by Saha UI Team**