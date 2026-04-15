"use client";

import { forwardRef, useEffect, useRef, useCallback } from "react";
import { cn } from "../../lib/utils";
import type { InfiniteScrollProps } from "./InfiniteScroll.types";
import {
  infiniteScrollVariants,
  infiniteTargetVariants,
  infiniteMessageContainerVariants,
  infiniteEndMessageVariants,
} from "./InfiniteScroll.styles";
import  Spinner  from "../Spinner";

/**
 * InfiniteScroll Component
 *
 * A container that uses IntersectionObserver to trigger a callback when the user 
 * scrolls near the end of the list.
 *
 * @example
 * ```tsx
 * <InfiniteScroll
 *   hasMore={page < totalPages}
 *   isLoading={loading}
 *   onLoadMore={fetchNextPage}
 * >
 *   {items.map(item => <Item key={item.id} data={item} />)}
 * </InfiniteScroll>
 * ```
 */
export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      hasMore,
      isLoading,
      onLoadMore,
      loader,
      endMessage,
      rootId,
      threshold = 0.1,
      rootMargin = "100px",
      children,
      className,
      ...props
    },
    externalRef
  ) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      [hasMore, isLoading, onLoadMore]
    );

    useEffect(() => {
      const element = observerTarget.current;
      if (!element) return;

      const root = rootId ? document.getElementById(rootId) : null;
      
      const observer = new IntersectionObserver(handleObserver, {
        root,
        rootMargin,
        threshold,
      });

      observer.observe(element);
      return () => observer.unobserve(element);
    }, [handleObserver, rootId, rootMargin, threshold]);

    return (
      <div 
        ref={externalRef} 
        className={cn(infiniteScrollVariants(), className)} 
        {...props}
      >
        {children}
        
        {/* Intersection Target */}
        <div ref={observerTarget} className={infiniteTargetVariants()} />
        
        {/* Loading / End Messages */}
        <div className={infiniteMessageContainerVariants()}>
          {isLoading && (
            loader || <Spinner size="md" variant="primary" />
          )}
          
          {!hasMore && !isLoading && endMessage && (
            <div className={infiniteEndMessageVariants()}>
              {endMessage}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InfiniteScroll.displayName = "InfiniteScroll";

export default InfiniteScroll;
