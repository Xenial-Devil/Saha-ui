export interface VirtualItem {
  key: string;
  index: number;
  start: number;
  size: number;
  end: number;
}

export interface VirtualListProps<T = any> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  onReorder?: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    virtualItem: VirtualItem
  ) => React.ReactNode;
  overscan?: number;
  className?: string;
  estimatedItemSize?: number;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
}

export interface UseVirtualScrollOptions {
  itemCount: number;
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan?: number;
}
