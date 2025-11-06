# CodeEditor Component - Enhanced Modern UI

A feature-rich, modern code editor component built with Monaco Editor and styled with a beautiful, glassmorphic design that seamlessly integrates with your UI theme.

## ✨ Key Features

### 🎨 Modern UI Design
- **Glassmorphism Effects**: Translucent backgrounds with backdrop blur for a modern look
- **Smooth Animations**: Scale transforms, hover effects, and transitions (200-300ms duration)
- **Enhanced Shadows**: Multi-layer shadows with color-specific glows for variants
- **Professional Icons**: SVG icons replacing emoji for a polished appearance
- **Visual Separators**: Subtle dividers between toolbar sections
- **Better Spacing**: Improved padding, gaps, and sizing throughout

### 🎯 UI Components

#### Toolbar
- **Language Selector**: Dropdown with code icon indicator
- **Copy Button**: Shows checkmark feedback on successful copy (2s)
- **Format Button**: Format code with keyboard shortcut hint (Shift+Alt+F)
- **Search Button**: Find in code with keyboard hint (Ctrl+F)
- **Word Wrap Toggle**: Visual icon that changes based on wrap state
- **Hover Effects**: Scale animations (110% on hover, 95% on active)
- **Responsive Design**: Automatic dividers between button groups

#### Status Bar
- **Cursor Position**: Line and column with location icon
- **Selection Info**: Character count with select icon (when text selected)
- **Language Display**: Uppercase language name with code icon
- **Indent Info**: Spaces/Tabs indicator with indent icon
- **Enhanced Typography**: Font weights and improved readability
- **Visual Dividers**: Subtle separators between info sections

#### Tab Bar
- **File Icon**: Document icon showing file type
- **File Name**: Truncated filename (max 200px) with proper overflow
- **Extension Badge**: Optional badge showing file extension
- **Close Button**: Optional close functionality with hover effect
- **Active State**: 3px bottom border with colored glow effect
- **Hover Animations**: Subtle scale transform on hover

### 🎨 Theme Support

10 Beautiful themes with consistent styling:
- `saha-ui-light` - Saha UI light theme (matches your design system with hex equivalents)
- `saha-ui-dark` - Saha UI dark theme (matches your design system with hex equivalents)
- `vscode` - VS Code dark theme with signature blue accent
- `dark` - Modern dark theme
- `light` - Clean light theme
- `github` - GitHub-inspired light theme
- `monokai` - Classic Monokai Pro
- `dracula` - Popular Dracula theme
- `nord` - Nordic-inspired theme
- `solarized` - Solarized dark theme

### 🎭 Variant System

10 Semantic variants with color-coded styling:
- `default` - Neutral, clean appearance
- `primary` - Indigo/purple highlight
- `secondary` - Pink accent
- `accent` - Teal/cyan emphasis
- `success` - Green for positive states
- `warning` - Yellow/orange for caution
- `error` - Red for errors
- `info` - Blue for information
- `outline` - Bordered style with shadow
- `ghost` - Transparent with subtle focus

Each variant includes:
- Custom border color with 60% opacity
- Matching shadow with 20% opacity
- Focus states with 40% ring opacity
- Enhanced glow effects on focus

### 📏 Size Options

4 Size presets for different use cases:
- `sm` - Compact (text-xs, h-7/8 buttons)
- `default` - Standard (text-sm, h-8/9 buttons)
- `lg` - Large (text-base, h-9/10 buttons)
- `xl` - Extra large (text-lg, h-10/11 buttons)

## 🚀 Usage

### Basic Example

```tsx
import { CodeEditor } from '@/components/CodeEditor';

function MyEditor() {
  const [code, setCode] = useState('console.log("Hello World");');

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      language="javascript"
      theme="vscode"
      variant="primary"
      size="default"
      height={400}
    />
  );
}
```

### With All Features

```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  filename="App.tsx"
  theme="vscode"
  variant="primary"
  size="default"
  
  // UI Components
  showToolbar={true}
  showStatusBar={true}
  showTabBar={true}
  
  // Toolbar Options
  toolbarPlacement="inline" // or "floating" (default is "inline")
  showLanguageSelect={true}
  showCopy={true}
  showFormat={true}
  showFind={true}
  showWrapToggle={true}
  
  // Editor Options
  lineNumbers="on"
  showMinimap={true}
  wordWrap={false}
  readOnly={false}
  
  // Styling
  className="h-[600px]"
  fullWidth={true}
  
  // Callbacks
  onSave={(code) => console.log('Saved:', code)}
/>
```

### Read-Only Viewer

```tsx
import { CodeViewer } from '@/components/CodeEditor/CodeViewer';

<CodeViewer
  value={code}
  language="python"
  theme="github"
  variant="outline"
  copy={true}
  status={true}
  height={300}
/>
```

### Custom Language List

```tsx
<CodeEditor
  language="python"
  languages={[
    'javascript',
    'typescript',
    'python',
    { id: 'tsx', label: 'TypeScript React' },
    { id: 'jsx', label: 'JavaScript React' },
  ]}
/>
```

## 🎨 Styling Details

### Toolbar Placement

By default, the toolbar is placed **inline** at the top of the editor for better accessibility and visibility. You can change it to **floating** (positioned absolutely in the top-right corner) by setting `toolbarPlacement="floating"`.

```tsx
// Default: Inline toolbar (always visible at top)
<CodeEditor showToolbar={true} />

// Floating toolbar (top-right corner)
<CodeEditor showToolbar={true} toolbarPlacement="floating" />
```

### Glassmorphism
- Background opacity: 80-95%
- Backdrop blur: `blur-md` (12px)
- Border opacity: 60-80%
- Smooth transitions: 200-300ms

### Shadows
- Container: `shadow-lg` with variant-specific colors
- Toolbar: `shadow-lg` → `shadow-xl` on hover
- Active tabs: Colored glow using box-shadow
- Focus states: Ring with variant-matching colors

### Animations
```css
/* Hover effects */
hover:scale-[1.02]   /* Selects & tabs */
hover:scale-110      /* Icon buttons */

/* Active states */
active:scale-95      /* All buttons */

/* Transitions */
duration-200         /* Buttons & interactions */
duration-300         /* Containers & modals */
```

### Colors
Saha UI themes use hex equivalents of your OKLCH colors for Monaco Editor compatibility:
- **Light theme:** `#fafbfc` (background), `#262829` (foreground), `#6366f1` (primary)
- **Dark theme:** `#141517` (background), `#f1f3f4` (foreground), `#818cf8` (primary)
- **Container/UI:** Uses CSS variables directly (`var(--primary)`, `var(--border)`, etc.)
- **Monaco Editor:** Uses hex conversions for compatibility

Plus semantic colors (success, warning, error, info)

## 🎯 Icon System

All icons are custom SVG components with:
- Consistent sizing (12-16px)
- 2px stroke width
- Round line caps and joins
- Inherit current color
- Proper accessibility labels

### Available Icons
- **Code** - Language selector
- **Copy/Check** - Copy with success feedback
- **Format** - Code formatting
- **Search** - Find functionality
- **Wrap** - Word wrap toggle
- **Location** - Cursor position
- **Select** - Selection indicator
- **Indent** - Tab settings
- **File** - Tab file indicator
- **Close** - Close button

## 🔧 Props Reference

### CodeEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | `""` | Initial value |
| `onChange` | `(code: string) => void` | - | Change handler |
| `onSave` | `(code: string) => void` | - | Save handler (Ctrl/Cmd+S) |
| `language` | `string` | `"typescript"` | Programming language |
| `filename` | `string` | `"index.ts"` | Displayed filename |
| `theme` | `CodeEditorTheme` | `"dark"` | Color theme |
| `variant` | `CodeEditorVariant` | `"default"` | Visual variant |
| `size` | `CodeEditorSize` | `"default"` | Component size |
| `height` | `number \| string` | - | Editor height |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `lineNumbers` | `LineNumbersSetting` | `"on"` | Line number display |
| `showToolbar` | `boolean` | `true` | Show toolbar |
| `showStatusBar` | `boolean` | `true` | Show status bar |
| `showTabBar` | `boolean` | `false` | Show tab bar |
| `showMinimap` | `boolean` | `true` | Show minimap |
| `wordWrap` | `boolean` | `false` | Enable word wrap |
| `fullWidth` | `boolean` | `true` | Full width container |

## 🎨 Design Principles

1. **Consistency**: All components share the same design language
2. **Accessibility**: Proper ARIA labels, keyboard navigation, focus states
3. **Performance**: Smooth 60fps animations with GPU acceleration
4. **Responsive**: Adapts to different screen sizes
5. **Theme Integration**: Seamless integration with your design system
6. **Modern**: Latest design trends (glassmorphism, smooth animations)

## 🔄 Migration from Old Version

### Visual Changes
- ✅ Emoji icons → Professional SVG icons
- ✅ Flat design → Glassmorphic with shadows
- ✅ Basic borders → Enhanced with glows
- ✅ Simple hover → Smooth scale animations
- ✅ Rounded corners → More rounded (lg → xl)
- ✅ Basic toolbar → Floating with backdrop blur

### Breaking Changes
None! All existing props work the same way.

### New Features
- Copy success feedback
- Enhanced visual separators
- Better icon system
- Improved accessibility
- More animation polish

## 💡 Best Practices

1. **Choose appropriate variant**: Use semantic variants (success, error, warning) for contextual editors
2. **Theme consistency**: Use `saha-ui-light` or `saha-ui-dark` to perfectly match your design system, or choose from 8 other themes
3. **Size appropriately**: Use `sm` for inline editors, `default` for standard, `lg/xl` for primary views
4. **Toolbar placement**: Default is `inline` for best accessibility. Use `floating` for a cleaner, overlay-style toolbar
5. **Performance**: For multiple editors, consider lazy loading or virtualization

## 🎭 Examples Gallery

See `CodeEditorFrameworkExamples.tsx` for a comprehensive showcase of all variants, sizes, and themes.

## 🤝 Contributing

When adding new features:
1. Maintain design consistency with existing components
2. Add proper TypeScript types
3. Include accessibility features
4. Test across all themes and variants
5. Update this documentation

## 📝 License

Part of Saha UI component library.