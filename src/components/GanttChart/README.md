# GanttChart

Renders a temporal task schedule timeline extending the `Chart` / `recharts` foundation. Utilizes dynamic timeline bars marking progressive workflows alongside task dependency plotting visually.

## Installation

```tsx
import { GanttChart } from 'saha-ui';
```

## Usage

### Simple Schedule

```tsx
import { GanttChart } from "saha-ui";

export default function Example() {
  const tasks = [
    { 
      id: "1", 
      name: "Research", 
      startDate: new Date("2023-01-01"), 
      endDate: new Date("2023-01-10"),
      progress: 100 
    },
    { 
      id: "2", 
      name: "Development", 
      startDate: new Date("2023-01-10"), 
      endDate: new Date("2023-02-15"),
      progress: 40 
    }
  ];

  return (
    <GanttChart 
      tasks={tasks} 
      height={300} 
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tasks` | `GanttTask[]` | - | Iterative array storing rendering attributes |
| `startDate` | `Date` | - | Explicit minimum global rendering limit locking X-scale visually |
| `endDate` | `Date` | - | Absolute terminating limit pushing bounding graph padding seamlessly |
| `height` | `number \| string` | `400` | Extends underlying ResponsiveContainer component forcing scaling limits logically |
| `rowHeight` | `number` | `40` | Allocates base y-axis mapping distance enforcing visual spacing padding neatly |

### GanttTask

```typescript
export interface GanttTask {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress?: number;
  dependencies?: string[];
  color?: string;
}
```
