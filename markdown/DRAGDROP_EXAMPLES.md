# DragDrop Examples

Comprehensive examples demonstrating all features of the DragDrop component system.

## 📚 Available Examples

### 1. Basic Example (`BasicExample.tsx`)
**What it demonstrates:**
- Simple drag and drop between containers
- Visual feedback during drag operations
- Basic item reordering
- Container-to-container movement

**Use case:** Perfect starting point for learning the component basics.

```tsx
import { BasicExample } from './examples';

<BasicExample />
```

---

### 2. Tree Example (`TreeExample.tsx`)
**What it demonstrates:**
- Nested hierarchical structures (file system-like)
- Expand/collapse functionality
- Depth constraints (max 4 levels)
- Parent-child relationship validation
- Visual indentation and tree lines

**Use case:** File managers, organization charts, category hierarchies.

```tsx
import { TreeExample } from './examples';

<TreeExample />
```

---

### 3. Virtual List Example (`VirtualListExample.tsx`)
**What it demonstrates:**
- Efficient rendering of 10,000+ items
- Windowing/virtualization for performance
- Dynamic item heights
- Overscan configuration
- Smooth 60fps scrolling

**Use case:** Large datasets, infinite lists, data tables.

```tsx
import { VirtualListExample } from './examples';

<VirtualListExample />
```

---

### 4. Multi-Selection Example (`MultiSelectionExample.tsx`)
**What it demonstrates:**
- Multi-item selection with Ctrl/Cmd + Click
- Range selection with Shift + Click
- Box selection (drag to select)
- Select all (Ctrl/Cmd + A)
- Batch operations on selected items
- Visual selection feedback

**Use case:** Task management, file systems, email clients, kanban boards.

```tsx
import { MultiSelectionExample } from './examples';

<MultiSelectionExample />
```

---

### 5. Advanced Example (`AdvancedExample.tsx`)
**What it demonstrates:**
- Undo/Redo functionality with history
- Snap-to-grid alignment
- Real-time analytics tracking
- Debug overlay with performance metrics
- FPS monitoring
- Drag distance and duration tracking
- Custom collision detection

**Use case:** Complex applications requiring advanced features and debugging.

```tsx
import { AdvancedExample } from './examples';

<AdvancedExample />
```

---

### 6. Plugin Example (`PluginExample.tsx`)
**What it demonstrates:**
- Custom plugin creation
- Plugin lifecycle hooks
- Event interception
- Validation plugins
- Logging plugins
- Animation plugins
- Extending functionality without modifying core

**Use case:** Enterprise applications requiring custom behaviors and validation.

```tsx
import { PluginExample } from './examples';

<PluginExample />
```

---

### 7. All Examples (`AllExamples.tsx`)
**What it demonstrates:**
- Comprehensive showcase of all examples
- Tabbed navigation interface
- Example descriptions and feature highlights
- Complete feature overview

**Use case:** Documentation, demos, learning all features at once.

```tsx
import { AllExamples } from './examples';

<AllExamples />
```

---

## 🚀 Quick Start

### Installation

All examples are ready to use. Simply import and render:

```tsx
import { AllExamples } from '@/components/DragDrop/examples';

function App() {
  return <AllExamples />;
}
```

### Individual Example Usage

```tsx
import { BasicExample } from '@/components/DragDrop/examples';

function MyPage() {
  return (
    <div>
      <h1>My Drag & Drop Demo</h1>
      <BasicExample />
    </div>
  );
}
```

---

## 🎨 Customization

All examples are fully customizable. Copy any example and modify to suit your needs:

```tsx
import React, { useState } from 'react';
import {
  DragDropContext,
  DroppableContainer,
  DraggableItem,
} from '@/components/DragDrop';

function CustomExample() {
  // Your custom logic here
  return (
    <DragDropContext>
      {/* Your custom implementation */}
    </DragDropContext>
  );
}
```

---

## 📖 Example Breakdown

### Basic Features (BasicExample)
- ✅ Drag and drop
- ✅ Container support
- ✅ Visual feedback
- ✅ Simple state management

### Tree Features (TreeExample)
- ✅ Nested structures
- ✅ Expand/collapse
- ✅ Depth constraints
- ✅ Parent validation
- ✅ Visual tree lines

### Virtual List Features (VirtualListExample)
- ✅ 10,000+ items
- ✅ Windowing
- ✅ Dynamic heights
- ✅ Overscan
- ✅ Performance optimization

### Multi-Selection Features (MultiSelectionExample)
- ✅ Ctrl/Cmd + Click
- ✅ Shift + Click
- ✅ Box selection
- ✅ Select all
- ✅ Batch operations
- ✅ Visual badges

### Advanced Features (AdvancedExample)
- ✅ Undo/Redo
- ✅ Snap-to-grid
- ✅ Analytics
- ✅ Debug overlay
- ✅ FPS monitoring
- ✅ Collision detection
- ✅ Performance tracking

### Plugin Features (PluginExample)
- ✅ Custom plugins
- ✅ Lifecycle hooks
- ✅ Event interception
- ✅ Validation
- ✅ Logging
- ✅ Animation hooks

---

## 🔥 Performance Tips

1. **Virtual Lists**: Use for 1,000+ items
2. **Memoization**: Wrap items in `React.memo()`
3. **Throttling**: Use throttled handlers for frequent events
4. **Debug Mode**: Enable only during development
5. **Analytics**: Implement sampling for high-frequency tracking

---

## 🎯 Use Cases by Industry

### Project Management
- ✅ Multi-Selection Example (Kanban boards)
- ✅ Tree Example (Task hierarchies)
- ✅ Advanced Example (Undo/redo for safety)

### File Management
- ✅ Tree Example (Folder structures)
- ✅ Multi-Selection Example (Batch operations)
- ✅ Virtual List Example (Large directories)

### E-commerce
- ✅ Basic Example (Product categorization)
- ✅ Virtual List Example (Large inventories)
- ✅ Plugin Example (Custom validation rules)

### Data Visualization
- ✅ Advanced Example (Analytics tracking)
- ✅ Plugin Example (Custom behaviors)
- ✅ Virtual List Example (Large datasets)

---

## 📱 Responsive Design

All examples are responsive and work on:
- 🖥️ Desktop (mouse + keyboard)
- 📱 Mobile (touch)
- ⌨️ Keyboard-only navigation
- 🎯 Screen readers (ARIA labels)

---

## 🧪 Testing Examples

Each example includes test scenarios:

```tsx
// Example test
import { render, screen } from '@testing-library/react';
import { BasicExample } from './examples';

test('renders basic example', () => {
  render(<BasicExample />);
  expect(screen.getByText('Container 1')).toBeInTheDocument();
});
```

---

## 🔗 Links

- [Main Documentation](../README.md)
- [Advanced Features Guide](../ADVANCED_FEATURES.md)
- [Implementation Details](../IMPLEMENTATION_COMPLETE.md)
- [API Reference](../DragDrop.types.ts)

---

## 💡 Tips & Tricks

### Tip 1: Start Simple
Begin with `BasicExample` and gradually add features.

### Tip 2: Use TypeScript
All examples are fully typed for excellent IntelliSense.

### Tip 3: Customize Styles
Examples use Tailwind CSS - easy to customize.

### Tip 4: Read the Comments
Each example includes detailed inline comments.

### Tip 5: Mix and Match
Combine features from multiple examples.

---

## 🐛 Common Issues & Solutions

### Issue: Items not dragging
**Solution:** Ensure `DragDropContext` wraps your components.

### Issue: Performance issues with large lists
**Solution:** Use `VirtualListExample` approach.

### Issue: Selection not working
**Solution:** Check `SelectionManager` setup in `MultiSelectionExample`.

### Issue: Plugins not executing
**Solution:** Verify plugin array passed to `DragDropContext`.

---

## 📊 Feature Matrix

| Example | Drag/Drop | Multi-Select | Undo/Redo | Virtual | Tree | Plugins | Debug |
|---------|-----------|--------------|-----------|---------|------|---------|-------|
| Basic | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Tree | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Virtual | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Multi-Select | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Advanced | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Plugin | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| All | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🎓 Learning Path

1. **Beginner**: Start with `BasicExample`
2. **Intermediate**: Explore `TreeExample` and `VirtualListExample`
3. **Advanced**: Study `MultiSelectionExample` and `AdvancedExample`
4. **Expert**: Master `PluginExample` and create custom plugins
5. **Complete**: View `AllExamples` for comprehensive overview

---

## 🤝 Contributing

Want to add a new example? Follow this template:

```tsx
import React, { useState } from 'react';
import { DragDropContext } from '../index';

/**
 * Your Example Name
 * 
 * Demonstrates:
 * - Feature 1
 * - Feature 2
 */
export const YourExample: React.FC = () => {
  // Your implementation
  return <DragDropContext>{/* ... */}</DragDropContext>;
};

export default YourExample;
```

---

## 📄 License

All examples are MIT licensed and free to use in your projects.

---

## 🙏 Credits

Built with:
- React 18+
- TypeScript
- Tailwind CSS
- Lucide React Icons

---

**Happy Dragging! 🎉**
