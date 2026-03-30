# InfiniteScroll

A container-based wrapper rendering automatic fetching mechanisms via `IntersectionObserver`. Simply wraps a list and triggers an `onLoadMore` asynchronous call automatically upon scrolling to the bottom limit threshold.

## Installation

```tsx
import { InfiniteScroll } from 'saha-ui';
```

## Usage

### Simple Pagination Observer

```tsx
import { useState } from "react";
import { InfiniteScroll } from "saha-ui";

export default function Example() {
  const [items, setItems] = useState<number[]>([...Array(20).keys()]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    // Simulate API Call
    await new Promise(res => setTimeout(res, 1000));
    setItems(prev => [...prev, ...Array(10).keys()]);
    if (items.length > 50) setHasMore(false);
  };

  return (
    <InfiniteScroll 
      onLoadMore={loadMore} 
      hasMore={hasMore}
      className="h-[400px] overflow-y-auto"
    >
      {items.map((i, index) => (
        <div key={index} className="p-4 border-b">Item {index + 1}</div>
      ))}
    </InfiniteScroll>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onLoadMore` | `() => Promise<void> \| void` | - | Dispatch handler executing strictly once threshold crossed perfectly |
| `hasMore` | `boolean` | `true` | Continues attaching listeners globally rendering loading states correctly |
| `isLoading` | `boolean` | `false` | Internal state overriding natively locking interactions completely |
| `threshold` | `number` | `1.0` | Fractional threshold logic signaling observing bounding boxes accurately |
| `loader` | `ReactNode` | `<Spinner />` | Default UI injected effortlessly substituting built-in elements entirely |
| `endMessage` | `ReactNode` | - | Replaces rendering blocks denoting exhaustion successfully |
