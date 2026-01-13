import type { CSSProperties, ReactNode } from "react";
import type {
  GroupProps,
  PanelProps,
  SeparatorProps,
} from "react-resizable-panels";

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
 * ResizablePanelGroup Props
 * Extends react-resizable-panels GroupProps with variant styling
 */
export interface ResizablePanelGroupProps
  extends Omit<GroupProps, "orientation"> {
  /**
   * Orientation of the panel group
   * @default "horizontal"
   */
  orientation?: ResizableDirection;

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
 * Extends react-resizable-panels PanelProps with variant styling
 */
export interface ResizablePanelProps
  extends Omit<PanelProps, "className" | "style"> {
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
   * Custom styles
   */
  style?: CSSProperties;
}

/**
 * ResizableHandle Props
 * Extends react-resizable-panels SeparatorProps with variant styling
 */
export interface ResizableHandleProps
  extends Omit<SeparatorProps, "className" | "style"> {
  /**
   * Visual variant (inherits from group if not set)
   */
  variant?: ResizableVariant;

  /**
   * Show handle indicator (shadcn/ui pattern)
   * @default true
   */
  withHandle?: boolean;

  /**
   * Show handle indicator (legacy, use withHandle instead)
   * @default true
   * @deprecated Use withHandle instead
   */
  showIndicator?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: CSSProperties;
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
   * Auto-save ID for persistence
   */
  autoSaveId?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when layout changes
   */
  onLayout?: (sizes: number[]) => void;
}
