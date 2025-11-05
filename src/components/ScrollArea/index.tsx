"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { type VariantProps } from "class-variance-authority";
import {
  scrollAreaRootVariants,
  scrollBarVariants,
  scrollThumbVariants,
} from "./ScrollArea.styles";

export type ScrollAreaVariant = VariantProps<
  typeof scrollAreaRootVariants
>["variant"];
export type ScrollOrientation = "vertical" | "horizontal" | "both";

// ============================================================================
// COMPONENT API - Full Composition
// ============================================================================

interface ScrollAreaRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ScrollAreaVariant;
  orientation?: ScrollOrientation;
  hideScrollbar?: boolean;
  smoothScroll?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const ScrollAreaRoot = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  (
    {
      className,
      children,
      variant = "default",
      orientation = "vertical",
      hideScrollbar = false,
      smoothScroll = true,
      autoHide = true,
      autoHideDelay = 1000,
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const [showScrollbar, setShowScrollbar] = React.useState(!autoHide);
    const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

    React.useImperativeHandle(ref, () => viewportRef.current!);

    const handleScroll = React.useCallback(() => {
      setIsScrolling(true);
      setShowScrollbar(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        if (autoHide) {
          setShowScrollbar(false);
        }
      }, autoHideDelay);
    }, [autoHide, autoHideDelay]);

    React.useEffect(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      viewport.addEventListener("scroll", handleScroll);
      return () => {
        viewport.removeEventListener("scroll", handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }, [handleScroll]);

    const contextValue = React.useMemo(
      () => ({
        viewportRef,
        contentRef,
        variant,
        orientation,
        hideScrollbar,
        smoothScroll,
        isScrolling,
        showScrollbar,
      }),
      [
        variant,
        orientation,
        hideScrollbar,
        smoothScroll,
        isScrolling,
        showScrollbar,
      ]
    );

    return (
      <ScrollAreaContext.Provider value={contextValue}>
        <div
          data-slot="scroll-area-root"
          className={cn(
            scrollAreaRootVariants({ variant }),
            "group",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ScrollAreaContext.Provider>
    );
  }
);
ScrollAreaRoot.displayName = "ScrollAreaRoot";

interface ScrollAreaViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  ScrollAreaViewportProps
>(({ className, children, ...props }, ref) => {
  const context = useScrollAreaContext();
  const localRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => localRef.current!);
  React.useImperativeHandle(context.viewportRef, () => localRef.current!);

  return (
    <div
      ref={localRef}
      data-slot="scroll-area-viewport"
      className={cn(
        "size-full overflow-auto rounded-[inherit]",
        context.smoothScroll && "scroll-smooth",
        // Always hide native scrollbar, we use custom scrollbar
        "[&::-webkit-scrollbar]:hidden",
        className
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      {...props}
    >
      <div ref={context.contentRef} className="min-h-full">
        {children}
      </div>
    </div>
  );
});
ScrollAreaViewport.displayName = "ScrollAreaViewport";

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, _ref) => {
    const context = useScrollAreaContext();
    const [thumbHeight, setThumbHeight] = React.useState(0);
    const [thumbWidth, setThumbWidth] = React.useState(0);
    const [thumbTop, setThumbTop] = React.useState(0);
    const [thumbLeft, setThumbLeft] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const thumbRef = React.useRef<HTMLDivElement>(null);

    const updateThumb = React.useCallback(() => {
      const viewport = context.viewportRef.current;
      if (!viewport) return;

      if (orientation === "vertical") {
        const scrollRatio =
          viewport.scrollHeight > 0
            ? viewport.clientHeight / viewport.scrollHeight
            : 0;
        const thumbH = Math.max(scrollRatio * viewport.clientHeight, 20);
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const thumbT =
          maxScroll > 0
            ? (viewport.scrollTop / maxScroll) *
              (viewport.clientHeight - thumbH)
            : 0;

        setThumbHeight(thumbH);
        setThumbTop(thumbT);
      } else {
        const scrollRatio =
          viewport.scrollWidth > 0
            ? viewport.clientWidth / viewport.scrollWidth
            : 0;
        const thumbW = Math.max(scrollRatio * viewport.clientWidth, 20);
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        const thumbL =
          maxScroll > 0
            ? (viewport.scrollLeft / maxScroll) *
              (viewport.clientWidth - thumbW)
            : 0;

        setThumbWidth(thumbW);
        setThumbLeft(thumbL);
      }
    }, [context.viewportRef, orientation]);

    React.useEffect(() => {
      const viewport = context.viewportRef.current;
      if (!viewport) return;

      updateThumb();
      viewport.addEventListener("scroll", updateThumb);
      window.addEventListener("resize", updateThumb);

      const observer = new ResizeObserver(updateThumb);
      observer.observe(viewport);

      return () => {
        viewport.removeEventListener("scroll", updateThumb);
        window.removeEventListener("resize", updateThumb);
        observer.disconnect();
      };
    }, [updateThumb, context.viewportRef]);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const startY = e.clientY;
      const startX = e.clientX;
      const viewport = context.viewportRef.current;
      if (!viewport) return;

      const startScrollTop = viewport.scrollTop;
      const startScrollLeft = viewport.scrollLeft;

      const handleMouseMove = (e: MouseEvent) => {
        if (orientation === "vertical") {
          const deltaY = e.clientY - startY;
          const scrollRatio =
            viewport.scrollHeight > 0
              ? viewport.scrollHeight / viewport.clientHeight
              : 1;
          viewport.scrollTop = startScrollTop + deltaY * scrollRatio;
        } else {
          const deltaX = e.clientX - startX;
          const scrollRatio =
            viewport.scrollWidth > 0
              ? viewport.scrollWidth / viewport.clientWidth
              : 1;
          viewport.scrollLeft = startScrollLeft + deltaX * scrollRatio;
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (
      context.hideScrollbar ||
      (orientation === "vertical" && context.orientation === "horizontal") ||
      (orientation === "horizontal" && context.orientation === "vertical")
    ) {
      return null;
    }

    const shouldShow = context.showScrollbar || isDragging;

    return (
      <div
        ref={_ref}
        data-slot="scroll-area-scrollbar"
        data-orientation={orientation}
        className={cn(
          scrollBarVariants({ variant: context.variant, orientation }),
          "transition-opacity duration-300",
          // Show on hover or when scrolling or when dragging
          shouldShow ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          className
        )}
        {...props}
      >
        <div
          ref={thumbRef}
          data-slot="scroll-area-thumb"
          className={cn(
            scrollThumbVariants({ variant: context.variant, orientation }),
            isDragging && "opacity-100"
          )}
          style={{
            height: orientation === "vertical" ? `${thumbHeight}px` : "100%",
            width: orientation === "horizontal" ? `${thumbWidth}px` : "100%",
            transform:
              orientation === "vertical"
                ? `translateY(${thumbTop}px)`
                : `translateX(${thumbLeft}px)`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }
);
ScrollBar.displayName = "ScrollBar";

const ScrollAreaCorner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = useScrollAreaContext();

  if (context.orientation !== "both" || context.hideScrollbar) {
    return null;
  }

  return (
    <div
      ref={ref}
      data-slot="scroll-area-corner"
      className={cn(
        "absolute bottom-0 right-0 w-2.5 h-2.5 bg-border/50",
        className
      )}
      {...props}
    />
  );
});
ScrollAreaCorner.displayName = "ScrollAreaCorner";

// ============================================================================
// COMPACT API - Props-based
// ============================================================================

export interface ScrollAreaProps extends ScrollAreaRootProps {
  scrollbarOrientation?: "vertical" | "horizontal" | "both";
  showCorner?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      variant = "default",
      orientation = "vertical",
      scrollbarOrientation,
      hideScrollbar = false,
      smoothScroll = true,
      autoHide = true,
      autoHideDelay = 1000,
      showCorner = false,
      onScroll,
      ...props
    },
    ref
  ) => {
    const actualOrientation = scrollbarOrientation || orientation;

    return (
      <ScrollAreaRoot
        variant={variant}
        orientation={actualOrientation}
        hideScrollbar={hideScrollbar}
        smoothScroll={smoothScroll}
        autoHide={autoHide}
        autoHideDelay={autoHideDelay}
        className={className}
        {...props}
      >
        <ScrollAreaViewport ref={ref} onScroll={onScroll}>
          {children}
        </ScrollAreaViewport>
        {actualOrientation === "vertical" || actualOrientation === "both" ? (
          <ScrollBar orientation="vertical" />
        ) : null}
        {actualOrientation === "horizontal" || actualOrientation === "both" ? (
          <ScrollBar orientation="horizontal" />
        ) : null}
        {showCorner && actualOrientation === "both" ? (
          <ScrollAreaCorner />
        ) : null}
      </ScrollAreaRoot>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

// ============================================================================
// CONTEXT
// ============================================================================

interface ScrollAreaContextValue {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  variant: ScrollAreaVariant;
  orientation: ScrollOrientation;
  hideScrollbar: boolean;
  smoothScroll: boolean;
  isScrolling: boolean;
  showScrollbar: boolean;
}

const ScrollAreaContext = React.createContext<
  ScrollAreaContextValue | undefined
>(undefined);

function useScrollAreaContext() {
  const context = React.useContext(ScrollAreaContext);
  if (!context) {
    throw new Error(
      "ScrollArea compound components must be used within ScrollAreaRoot"
    );
  }
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollBar,
  ScrollAreaCorner,
};
