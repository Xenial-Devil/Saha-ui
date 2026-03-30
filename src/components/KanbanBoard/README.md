# KanbanBoard

A specialized composition of `DragDrop` to create a Kanban-style board interface with columns and cards.

## Installation

```tsx
import { KanbanBoard } from 'saha-ui';
```

## Usage

### Basic Kanban Board

```tsx
import { KanbanBoard } from "saha-ui";

export default function Example() {
  const columns = [
    { 
      id: "todo", 
      title: "To Do", 
      cards: [{ id: "1", title: "Setup Project", description: "Initialize repo" }]
    },
    { 
      id: "in-progress", 
      title: "In Progress", 
      cards: [{ id: "2", title: "Write code" }]
    }
  ];

  return (
    <KanbanBoard 
      columns={columns} 
      onCardMove={(cardId, sourceCol, destCol, newIndex) => {
        console.log(`Moved card ${cardId} to column ${destCol} at index ${newIndex}`);
      }}
      onAddCard={(columnId) => {
        console.log(`Adding new card to ${columnId}`);
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `KanbanColumn[]` | - | Array of columns, each containing a list of cards |
| `onCardMove` | `(cardId: string, sourceColId: string, destColId: string, index: number) => void` | - | Callback fired when a card is dropped into a new position |
| `renderCard` | `(card: KanbanCard) => ReactNode` | - | Optional custom render function overriding the default Card |
| `onAddCard` | `(columnId: string) => void` | - | Callback injected into the bottom "Add Card" button if provided |
| `disabled` | `boolean` | `false` | Disables dragging capabilities globally |

### KanbanColumn

```typescript
export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}
```

### KanbanCard

```typescript
export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}
```
