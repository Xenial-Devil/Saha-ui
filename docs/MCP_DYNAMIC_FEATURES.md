# Saha UI MCP Server - Dynamic Features Quick Reference

## 🧠 Intelligence Features

### Context Awareness
The server remembers your session and adapts responses:

```typescript
// Automatically tracked:
✓ Recently viewed components
✓ Recently used hooks  
✓ User intent (tutorial, example, styling, etc.)
✓ Skill level detection
✓ Query patterns
```

**Benefits:**
- Personalized suggestions
- Smarter next steps
- Related content recommendations
- Progressive complexity

---

## 🎯 Intent Detection

The server automatically detects what you're trying to accomplish:

| Intent | Triggers | Response Style |
|--------|----------|----------------|
| **Tutorial** | "how to", "guide", "learn" | Step-by-step guidance |
| **Example** | "example", "demo", "sample" | Working code samples |
| **Styling** | "style", "customize", "theme" | Customization focus |
| **API** | "props", "api", "parameters" | Technical reference |
| **Discovery** | "similar", "alternative", "related" | Component suggestions |
| **Troubleshooting** | "error", "fix", "problem" | Problem-solving mode |
| **Recommendation** | "best", "recommend", "should i" | Expert advice |

**Example:**
```
Query: "How do I customize the Button?"
Detected: styling
Response: Focuses on variants, CSS, theme config

Query: "Show me Button examples"
Detected: example
Response: Provides runnable code samples
```

---

## 🔍 Fuzzy Matching

Handles typos and partial names gracefully:

```typescript
// All of these work:
"Buton" → Button ✓
"Botton" → Button ✓
"Btn" → Button ✓
"inpt" → Input ✓
"Modl" → Modal ✓
"useDebonc" → useDebounce ✓
"useLoclStorage" → useLocalStorage ✓
```

**Algorithm:**
- Levenshtein distance calculation
- 60% similarity threshold
- Substring matching bonus
- Case-insensitive comparison

**Example:**
```typescript
get_component({ name: "Bttn" })
// Suggests: Button (95% match)

get_component({ name: "Inpt" })  
// Suggests: Input (90% match)
```

---

## 💡 Smart Suggestions

Every response includes contextual recommendations:

### Types of Suggestions

1. **Related Components**
   ```
   Viewing: Button
   Suggests: ButtonGroup, IconButton, Toggle
   ```

2. **Relevant Hooks**
   ```
   Viewing: Input
   Suggests: useDebounce, useLocalStorage
   ```

3. **Next Steps**
   ```
   After viewing component:
   - Try: get_usage_example()
   - Check: get_component_variants()
   - Explore: Related components
   ```

4. **Pro Tips**
   ```
   - Complexity hints
   - Common use cases
   - Best practices
   - Integration tips
   ```

---

## 📊 Progressive Disclosure

Information is revealed progressively based on detail level:

### Detail Levels

```typescript
get_component({ 
  name: "Button",
  detail_level: "summary" 
})
// Returns: Brief overview, props summary, quick example

get_component({ 
  name: "Button",
  detail_level: "full" 
})
// Returns: Full implementation, types, styles, examples, suggestions

get_component({ 
  name: "Button",
  detail_level: "code_only" 
})
// Returns: Just the source code, no fluff
```

---

## 🤝 Natural Language Processing

### Ask Questions Naturally

```typescript
// Instead of remembering tool names:
ask_question({ 
  question: "How do I install Saha UI?" 
})

ask_question({ 
  question: "What components work well for a dashboard?" 
})

ask_question({ 
  question: "How to make a button bigger?" 
})
```

**Smart Routing:**
- Detects intent from question
- Routes to appropriate tool
- Combines multiple tools if needed
- Returns comprehensive answer

---

## 🎨 Context-Aware Filtering

### Smart Component Filtering

```typescript
// By category
list_components_by_category({ 
  category: "Form Controls" 
})

// By complexity
list_components_by_category({ 
  complexity: "simple" 
})
// Perfect for beginners!

// By tags
list_components_by_category({ 
  tags: "form,input" 
})
// Find components by functionality

// Combined filters
list_components_by_category({ 
  category: "Data Display",
  complexity: "simple",
  tags: "user,profile"
})
```

---

## 🔄 Session Memory

### What's Tracked

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

### How It Helps

- **Better Suggestions**: Based on what you've viewed
- **Faster Navigation**: Skip repeated information
- **Personalized Tips**: Adjusted to your skill level
- **Related Content**: Contextual recommendations

**View Your Context:**
```
Resource: saha-ui://session/context
```

---

## 🎯 Personalized Recommendations

### Scenario-Based Recommendations

```typescript
// Building a dashboard
get_recommendations({ scenario: "dashboard" })
// Suggests: Card, Tabs, Badge, Avatar
// Hooks: useMediaQuery, useLocalStorage

// Building a form
get_recommendations({ scenario: "contact form" })
// Suggests: Input, TextArea, Button, Checkbox
// Hooks: useDebounce, useToggle

// Building a landing page
get_recommendations({ scenario: "landing page" })
// Suggests: Button, Card, Modal, Accordion
// Hooks: useMediaQuery, useScrollLock
```

---

## 💬 Response Formatting

### Rich, Contextual Responses

Every response includes:

```markdown
💡 **[Detected Mode]**: Brief mode description

[Main Content]

---

### 💡 Suggestions
- Contextual suggestion 1
- Contextual suggestion 2

### 🎯 Next Steps  
- Recommended action 1
- Recommended action 2

### 📌 Pro Tips
- Helpful tip 1
- Helpful tip 2

---

*Recently viewed: Component1, Component2*
```

---

## 🚀 Smart Workflows

### Workflow 1: Discover → Learn → Build

```typescript
// Step 1: Discover
list_components_by_category({ complexity: "simple" })

// Step 2: Learn (auto-suggests after Step 1)
get_component({ name: "Button" })

// Step 3: See Example (auto-suggests after Step 2)
get_usage_example({ name: "Button" })

// Step 4: Build (natural progression)
// Copy example, customize, integrate
```

### Workflow 2: Question → Tool → Answer

```typescript
// Natural question
ask_question({ 
  question: "How do I create a responsive navbar?" 
})

// Server auto-routes to:
// 1. get_recommendations({ scenario: "navigation" })
// 2. get_component({ name: "NavigationMenu" })
// 3. get_hook({ name: "useMediaQuery" })
// 4. Combines into comprehensive answer
```

### Workflow 3: Context-Driven Exploration

```typescript
// View component
get_component({ name: "Input" })
// Context: recentComponents = ["Input"]
// Intent: information

// Suggestion appears: "Try useDebounce hook"
get_hook({ name: "useDebounce" })
// Context: recentHooks = ["useDebounce"]
// Intent: learning

// Next suggestion: "See Input with debounce example"
get_usage_example({ 
  name: "Input", 
  scenario: "with debounce" 
})
```

---

## 🎓 Skill Level Adaptation

### Automatic Detection

```typescript
// Beginner indicators:
- Asks basic questions
- Views simple components
- Requests examples frequently

// Intermediate indicators:
- Asks about customization
- Explores hooks
- Queries about integration

// Advanced indicators:
- Searches code patterns
- Customizes theme
- Asks about architecture
```

### Adapted Responses

**Beginner:**
```
✓ More explanations
✓ Step-by-step guides
✓ Basic examples
✓ Common pitfalls highlighted
```

**Intermediate:**
```
✓ Balanced detail
✓ Best practices
✓ Multiple approaches
✓ Related concepts
```

**Advanced:**
```
✓ Technical depth
✓ Edge cases
✓ Performance tips
✓ Advanced patterns
```

---

## 🔧 Practical Examples

### Example 1: Typo Correction

```typescript
// You type with typo:
get_component({ name: "Botton" })

// Server response:
"Did you mean: Button (90% match)
Showing Button component..."
[Full Button documentation]

Suggestions:
- Try: ButtonGroup for multiple buttons
- Use: IconButton for icon-only buttons
```

### Example 2: Intent-Based Response

```typescript
// Styling intent:
get_component({ name: "Card" })

// Detected: No specific intent
// Standard response with code

// Then you ask:
ask_question({ question: "How do I style the card?" })

// Detected: styling intent
// Response focuses on:
- Variants and customization
- Theme integration
- CSS examples
- Best practices
```

### Example 3: Context Building

```typescript
// Query 1:
get_component({ name: "Input" })
// Context: recentComponents = ["Input"]

// Query 2:
get_component({ name: "Button" })
// Context: recentComponents = ["Button", "Input"]
// Response includes: "Building a form? Try these together..."

// Query 3:
get_hook({ name: "useDebounce" })
// Context: recentHooks = ["useDebounce"]
// Response: "Perfect for Input optimization!"
```

---

## 📈 Efficiency Tips

### 1. Start with Questions
```typescript
// Instead of guessing tools:
ask_question({ question: "Your question here" })
// Let AI route to the right tool
```

### 2. Use Fuzzy Matching
```typescript
// Don't worry about spelling:
get_component({ name: "approximate name" })
// Server will figure it out
```

### 3. Leverage Context
```typescript
// After viewing a component:
// Check suggestions for next steps
// Follow the recommended path
```

### 4. Filter Intelligently
```typescript
// Narrow down quickly:
list_components_by_category({ 
  complexity: "simple",
  tags: "form"
})
```

### 5. Get Recommendations
```typescript
// Starting fresh?
get_recommendations({ scenario: "your project type" })
// Get a curated list
```

---

## 🎯 Quick Command Reference

### Discovery
```typescript
ask_question()                    // Natural language query
get_recommendations()             // Scenario-based suggestions
list_components_by_category()     // Browse components
```

### Details
```typescript
get_component()                   // Component deep dive
get_hook()                        // Hook documentation
get_component_variants()          // Styling options
```

### Examples
```typescript
get_usage_example()               // Code samples
search_code()                     // Find patterns
```

### Configuration
```typescript
get_theme_config()                // Theming guide
get_utility()                     // Helper functions
```

---

## 🌟 Best Practices

1. **Ask Natural Questions**: Don't memorize tool names
2. **Trust Fuzzy Matching**: Typos are okay
3. **Follow Suggestions**: They're context-aware
4. **Start Broad**: Use recommendations first
5. **Build Progressively**: Summary → Full → Example
6. **Check Context**: View `saha-ui://session/context`

---

## 🚦 Status Indicators

Responses include status indicators:

- 💡 **Tutorial Mode**: Learning guidance
- 📋 **Example Mode**: Code samples
- 🎨 **Styling Mode**: Customization focus
- 📖 **API Mode**: Technical reference
- 🔧 **Troubleshooting Mode**: Problem solving

---

## 📚 Additional Resources

- Full Documentation: `MCP_SERVER.md`
- Quick Reference: `MCP_QUICK_REFERENCE.md`
- Session Context: `saha-ui://session/context`
- Package Info: `saha-ui://package`

---

**Dynamic MCP v2.0** - AI-powered, context-aware, human-friendly 🚀