import type { CSSProperties, ReactNode } from "react";

/**
 * Resizable variant types
 */
export type ResizableVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

/**
 * Resizable direction types
 */
export type ResizableDirection = "horizontal" | "vertical";

/**
 * Resizable handle position types
 */
export type ResizableHandlePosition = "start" | "center" | "end";

/**
 * Resizable storage types
 */
export type ResizableStorage = "localStorage" | "sessionStorage" | "none";

/**
 * Panel size units
 */
export interface PanelSize {
  value: number;
  unit: "percentage" | "pixels";
}

/**
 * Resize event data
 */
export interface ResizeEvent {
  panelId: string;
  size: number;
  direction: ResizableDirection;
}

/**
 * ResizablePanelGroup Props
 */
export interface ResizablePanelGroupProps {
  /** Panel group children (ResizablePanel and ResizableHandle) */
  children: ReactNode;

  /**
   * Direction of the panel group
   * @default "horizontal"
   */
  direction?: ResizableDirection;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: ResizableVariant;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Storage key for persisting panel sizes
   */
  storageKey?: string;

  /**
   * Storage type
   * @default "localStorage"
   */
  storage?: ResizableStorage;

  /**
   * Callback when panels are resized
   */
  onResize?: (sizes: number[]) => void;

  /**
   * Auto save delay in milliseconds
   * @default 500
   */
  autoSaveDelay?: number;

  /**
   * Custom styles
   */
  style?: CSSProperties;

  /**
   * Unique ID for the panel group
   */
  id?: string;
}

/**
 * ResizablePanel Props
 */
export interface ResizablePanelProps {
  /** Panel content */
  children: ReactNode;

  /**
   * Default size (percentage 0-100)
   * @default 50
   */
  defaultSize?: number;

  /**
   * Minimum size (percentage 0-100)
   * @default 10
   */
  minSize?: number;

  /**
   * Maximum size (percentage 0-100)
   * @default 90
   */
  maxSize?: number;

  /**
   * Panel order
   */
  order?: number;

  /**
   * Whether panel is collapsible
   * @default false
   */
  collapsible?: boolean;

  /**
   * Collapsed size when collapsible
   * @default 0
   */
  collapsedSize?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Panel ID for storage
   */
  id?: string;

  /**
   * Callback when panel is resized
   */
  onResize?: (size: number) => void;

  /**
   * Callback when panel is collapsed
   */
  onCollapse?: () => void;

  /**
   * Callback when panel is expanded
   */
  onExpand?: () => void;

  /**
   * Custom styles
   */
  style?: CSSProperties;
}

/**
 * ResizableHandle Props
 */
export interface ResizableHandleProps {
  /**
   * Whether handle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant (inherits from group if not set)
   */
  variant?: ResizableVariant;

  /**
   * Show handle indicator
   * @default true
   */
  showIndicator?: boolean;

  /**
   * Handle position within the handle area
   * @default "center"
   */
  position?: ResizableHandlePosition;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when dragging starts
   */
  onDragStart?: () => void;

  /**
   * Callback when dragging
   */
  onDrag?: (delta: number) => void;

  /**
   * Callback when dragging ends
   */
  onDragEnd?: () => void;

  /**
   * Custom styles
   */
  style?: CSSProperties;

  /**
   * Handle ID
   */
  id?: string;
}

/**
 * ResizableCompact Props - Simplified API
 */
export interface ResizableCompactProps {
  /**
   * Panel configurations
   */
  panels: {
    /** Panel content */
    content: ReactNode;
    /** Default size */
    defaultSize?: number;
    /** Minimum size */
    minSize?: number;
    /** Maximum size */
    maxSize?: number;
    /** Panel ID */
    id?: string;
    /** Whether collapsible */
    collapsible?: boolean;
  }[];

  /**
   * Direction
   * @default "horizontal"
   */
  direction?: ResizableDirection;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: ResizableVariant;

  /**
   * Show handles
   * @default true
   */
  showHandles?: boolean;

  /**
   * Storage key
   */
  storageKey?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when resized
   */
  onResize?: (sizes: number[]) => void;
}

/**
 * Resizable context value
 */
export interface ResizableContextValue {
  direction: ResizableDirection;
  variant: ResizableVariant;
  panelSizes: number[];
  setPanelSize: (index: number, size: number) => void;
  registerPanel: (
    id: string,
    defaultSize: number,
    minSize: number,
    maxSize: number
  ) => number;
  unregisterPanel: (id: string) => void;
  startResize: (handleIndex: number, initialPos: number) => void;
  resize: (currentPos: number) => void;
  endResize: () => void;
  isResizing: boolean;
}
