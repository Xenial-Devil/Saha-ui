import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "../../lib/utils";
import {
  resizablePanelGroupVariants,
  resizablePanelVariants,
  resizableHandleVariants,
  resizableHandleIndicatorVariants,
  resizableHandleDotsVariants,
} from "./Resizable.styles";
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
  ResizableCompactProps,
} from "./Resizable.types";

/**
 * Resizable Context
 */
const ResizableContext = createContext<ResizableContextValue | null>(null);

/**
 * Hook to use Resizable context
 */
const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error(
      "Resizable components must be used within a ResizablePanelGroup"
    );
  }
  return context;
};

/**
 * ResizablePanelGroup Component
 * Main container for resizable panels
 */
export const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
  children,
  direction = "horizontal",
  variant = "default",
  className,
  storageKey,
  storage = "localStorage",
  onResize,
  autoSaveDelay = 500,
  style,
  id,
}) => {
  const [panelSizes, setPanelSizes] = useState<number[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const panelRegistry = useRef<
    Map<
      string,
      { index: number; defaultSize: number; minSize: number; maxSize: number }
    >
  >(new Map());
  const resizingHandleIndex = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<number | undefined>(undefined);
  const initialMousePos = useRef<number>(0);

  // Load saved sizes from storage
  useEffect(() => {
    if (storageKey && storage !== "none") {
      try {
        const storageObj =
          storage === "localStorage"
            ? window.localStorage
            : window.sessionStorage;
        const saved = storageObj.getItem(storageKey);
        if (saved) {
          const sizes = JSON.parse(saved);
          if (Array.isArray(sizes)) {
            setPanelSizes(sizes);
          }
        }
      } catch (error) {
        console.error("Failed to load panel sizes:", error);
      }
    }
  }, [storageKey, storage]);

  // Save sizes to storage with debounce
  const saveSizes = useCallback(
    (sizes: number[]) => {
      if (storageKey && storage !== "none") {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = window.setTimeout(() => {
          try {
            const storageObj =
              storage === "localStorage"
                ? window.localStorage
                : window.sessionStorage;
            storageObj.setItem(storageKey, JSON.stringify(sizes));
          } catch (error) {
            console.error("Failed to save panel sizes:", error);
          }
        }, autoSaveDelay);
      }
    },
    [storageKey, storage, autoSaveDelay]
  );

  // Register panel
  const registerPanel = useCallback(
    (
      panelId: string,
      defaultSize: number,
      minSize: number,
      maxSize: number
    ) => {
      const index = panelRegistry.current.size;
      panelRegistry.current.set(panelId, {
        index,
        defaultSize,
        minSize,
        maxSize,
      });

      setPanelSizes((prev) => {
        const newSizes = [...prev];
        if (newSizes[index] === undefined) {
          newSizes[index] = defaultSize;
        }
        return newSizes;
      });

      return index;
    },
    []
  );

  // Unregister panel
  const unregisterPanel = useCallback((panelId: string) => {
    panelRegistry.current.delete(panelId);
  }, []);

  // Set individual panel size
  const setPanelSize = useCallback(
    (index: number, size: number) => {
      setPanelSizes((prev) => {
        const newSizes = [...prev];
        newSizes[index] = size;
        saveSizes(newSizes);
        onResize?.(newSizes);
        return newSizes;
      });
    },
    [saveSizes, onResize]
  );

  // Start resize
  const startResize = useCallback((handleIndex: number, initialPos: number) => {
    setIsResizing(true);
    resizingHandleIndex.current = handleIndex;
    initialMousePos.current = initialPos;
  }, []);

  // Resize panels
  const resize = useCallback(
    (currentPos: number) => {
      if (resizingHandleIndex.current === -1 || !containerRef.current) return;

      const handleIndex = resizingHandleIndex.current;
      const containerSize =
        direction === "horizontal"
          ? containerRef.current.offsetWidth
          : containerRef.current.offsetHeight;

      const delta = currentPos - initialMousePos.current;
      const deltaPercent = (delta / containerSize) * 100;

      setPanelSizes((prev) => {
        const newSizes = [...prev];
        const panels = Array.from(panelRegistry.current.values()).sort(
          (a, b) => a.index - b.index
        );

        // Get constraints for panels being resized
        const leftPanel = panels[handleIndex];
        const rightPanel = panels[handleIndex + 1];

        if (!leftPanel || !rightPanel) return prev;

        const leftOriginal = prev[handleIndex] || leftPanel.defaultSize;
        const rightOriginal = prev[handleIndex + 1] || rightPanel.defaultSize;

        let newLeftSize = leftOriginal + deltaPercent;
        let newRightSize = rightOriginal - deltaPercent;

        // Apply constraints
        newLeftSize = Math.max(
          leftPanel.minSize,
          Math.min(leftPanel.maxSize, newLeftSize)
        );

        // Calculate how much the left panel actually changed
        const actualLeftChange = newLeftSize - leftOriginal;

        // Apply the opposite change to the right panel
        newRightSize = rightOriginal - actualLeftChange;

        // Apply right panel constraints
        newRightSize = Math.max(
          rightPanel.minSize,
          Math.min(rightPanel.maxSize, newRightSize)
        );

        // If right panel hit a constraint, adjust left panel accordingly
        const actualRightChange = newRightSize - rightOriginal;
        if (Math.abs(actualRightChange + actualLeftChange) > 0.1) {
          newLeftSize = leftOriginal - actualRightChange;
          newLeftSize = Math.max(
            leftPanel.minSize,
            Math.min(leftPanel.maxSize, newLeftSize)
          );
        }

        newSizes[handleIndex] = newLeftSize;
        newSizes[handleIndex + 1] = newRightSize;

        saveSizes(newSizes);
        onResize?.(newSizes);

        return newSizes;
      });
    },
    [direction, saveSizes, onResize]
  );

  // End resize
  const endResize = useCallback(() => {
    setIsResizing(false);
    resizingHandleIndex.current = -1;
  }, []);

  const contextValue: ResizableContextValue = {
    direction,
    variant,
    panelSizes,
    setPanelSize,
    registerPanel,
    unregisterPanel,
    startResize,
    resize,
    endResize,
    isResizing,
  };

  return (
    <ResizableContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        id={id}
        className={resizablePanelGroupVariants({
          variant,
          direction,
          className,
        })}
        style={style}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
};

/**
 * ResizablePanel Component
 * Individual resizable panel
 */
export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  className,
  id,
  onResize,
  style,
}) => {
  const { direction, variant, panelSizes, registerPanel, unregisterPanel } =
    useResizableContext();
  const panelId = useRef(
    id || `panel-${Math.random().toString(36).substr(2, 9)}`
  );
  const panelIndex = useRef<number>(-1);

  useEffect(() => {
    panelIndex.current = registerPanel(
      panelId.current,
      defaultSize,
      minSize,
      maxSize
    );
    return () => {
      unregisterPanel(panelId.current);
    };
  }, [registerPanel, unregisterPanel, defaultSize, minSize, maxSize]);

  useEffect(() => {
    if (panelIndex.current !== -1 && onResize) {
      onResize(panelSizes[panelIndex.current] || defaultSize);
    }
  }, [panelSizes, onResize, defaultSize]);

  const size = panelSizes[panelIndex.current] || defaultSize;

  const panelStyle: React.CSSProperties = {
    ...style,
    [direction === "horizontal" ? "width" : "height"]: `${size}%`,
    flexShrink: 0,
  };

  return (
    <div
      className={resizablePanelVariants({ variant, className })}
      style={panelStyle}
    >
      {children}
    </div>
  );
};

/**
 * ResizableHandle Component
 * Draggable handle between panels
 */
export const ResizableHandle: React.FC<ResizableHandleProps> = ({
  disabled = false,
  variant: handleVariant,
  showIndicator = true,
  className,
  onDragStart,
  onDrag,
  onDragEnd,
  style,
  id,
}) => {
  const {
    direction,
    variant: groupVariant,
    startResize,
    resize,
    endResize,
    isResizing,
  } = useResizableContext();
  const variant = handleVariant || groupVariant;
  const startPos = useRef<number>(0);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();

      const initialPos = direction === "horizontal" ? e.clientX : e.clientY;
      startPos.current = initialPos;

      // Get handle index from DOM position
      const parent = handleRef.current?.parentElement;
      if (parent) {
        const handles = Array.from(
          parent.querySelectorAll("[data-resizable-handle]")
        );
        const handleIndex = handles.indexOf(handleRef.current!);
        startResize(handleIndex, initialPos);
      }

      onDragStart?.();
    },
    [disabled, direction, startResize, onDragStart]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
      resize(currentPos);
      onDrag?.(currentPos - startPos.current);
    };

    const handleMouseUp = () => {
      endResize();
      onDragEnd?.();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, direction, resize, endResize, onDrag, onDragEnd]);

  return (
    <div
      ref={handleRef}
      id={id}
      data-resizable-handle
      className={resizableHandleVariants({
        variant,
        direction,
        disabled,
        className,
      })}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation={direction}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={style}
    >
      {showIndicator && !disabled && (
        <div
          className={resizableHandleIndicatorVariants({ variant, direction })}
        >
          {direction === "horizontal" ? (
            <div className="flex flex-col gap-1">
              <div className={resizableHandleDotsVariants({ direction })} />
              <div className={resizableHandleDotsVariants({ direction })} />
              <div className={resizableHandleDotsVariants({ direction })} />
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <div className={resizableHandleDotsVariants({ direction })} />
              <div className={resizableHandleDotsVariants({ direction })} />
              <div className={resizableHandleDotsVariants({ direction })} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * ResizableCompact Component
 * Simplified props-based API
 */
export const ResizableCompact: React.FC<ResizableCompactProps> = ({
  panels,
  direction = "horizontal",
  variant = "default",
  showHandles = true,
  storageKey,
  className,
  onResize,
}) => {
  return (
    <ResizablePanelGroup
      direction={direction}
      variant={variant}
      className={className}
      storageKey={storageKey}
      onResize={onResize}
    >
      {panels.map((panel, index) => (
        <React.Fragment key={panel.id || index}>
          <ResizablePanel
            defaultSize={panel.defaultSize}
            minSize={panel.minSize}
            maxSize={panel.maxSize}
            id={panel.id}
          >
            {panel.content}
          </ResizablePanel>
          {showHandles && index < panels.length - 1 && (
            <ResizableHandle variant={variant} />
          )}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );
};

ResizablePanelGroup.displayName = "ResizablePanelGroup";
ResizablePanel.displayName = "ResizablePanel";
ResizableHandle.displayName = "ResizableHandle";
ResizableCompact.displayName = "ResizableCompact";

export default ResizablePanelGroup;
