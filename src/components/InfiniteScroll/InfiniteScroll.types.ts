import React from "react";

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Has more items to load
   */
  hasMore: boolean;
  
  /**
   * Currently loading next page
   */
  isLoading: boolean;
  
  /**
   * Callback fired to load next page
   */
  onLoadMore: () => void;
  
  /**
   * Custom loader element
   */
  loader?: React.ReactNode;
  
  /**
   * Custom end message element
   */
  endMessage?: React.ReactNode;
  
  /**
   * Root element for intersection observer. Defaults to browser viewport.
   */
  rootId?: string;
  
  /**
   * Threshold for IntersectionObserver (0.0 to 1.0)
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * Root margin for IntersectionObserver
   * @default "100px"
   */
  rootMargin?: string;
  
  /**
   * The list items
   */
  children?: React.ReactNode;
}
