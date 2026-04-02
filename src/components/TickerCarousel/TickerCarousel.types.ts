import React from "react";

export type TickerDirection = "left" | "right";

export type TickerVariant = "default" | "contained" | "bordered" | "glass";

export type TickerItemVariant =
  | "default"
  | "bordered"
  | "soft"
  | "ghost"
  | "elevated";

export type ReducedMotionBehavior = "stop" | "static" | "scrollable";

export type AnimationStrategy = "css";

export interface TickerRowConfig {
  id?: string | number;
  direction?: TickerDirection;
  speed?: number;
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
}

export interface TickerClassNames {
  root?: string;
  viewport?: string;
  rows?: string;
  row?: string | ((rowIndex: number) => string);
  rowTrack?: string | ((rowIndex: number) => string);
  item?: string | ((index: number, rowIndex: number) => string);
  itemInner?: string | ((index: number, rowIndex: number) => string);
  edgeFadeLeft?: string;
  edgeFadeRight?: string;
}

export interface TickerStyles {
  root?: React.CSSProperties;
  viewport?: React.CSSProperties;
  rows?: React.CSSProperties;
  row?: React.CSSProperties | ((rowIndex: number) => React.CSSProperties);
  rowTrack?: React.CSSProperties | ((rowIndex: number) => React.CSSProperties);
  item?:
    | React.CSSProperties
    | ((index: number, rowIndex: number) => React.CSSProperties);
}

export interface TickerSlotProps {
  root?: React.HTMLAttributes<HTMLDivElement>;
  viewport?: React.HTMLAttributes<HTMLDivElement>;
  rows?: React.HTMLAttributes<HTMLDivElement>;
  row?: React.HTMLAttributes<HTMLDivElement>;
  rowTrack?: React.HTMLAttributes<HTMLDivElement>;
  item?: React.HTMLAttributes<HTMLDivElement>;
}

export interface TickerRenderMeta {
  index: number;
  rowIndex: number;
  cloneIndex: number;
  isClone: boolean;
  isPaused: boolean;
  direction: TickerDirection;
}

export interface TickerMetrics {
  rowWidths: number[];
  containerWidth: number;
  cloneMultipliers: number[];
}

export interface TickerCarouselRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  recalculate: () => void;
  getRootElement: () => HTMLDivElement | null;
  getRowElement: (rowIndex: number) => HTMLDivElement | null;
}

export interface TickerCarouselItemBase {
  id?: string | number;
  href?: string;
  avatar?: string;
  image?: string;
  name?: string;
  username?: string;
  title?: string;
  quote?: string;
  description?: string;
  content?: React.ReactNode;
  [key: string]: any;
}

export interface TickerCardProps<
  TItem = TickerCarouselItemBase,
> extends React.HTMLAttributes<HTMLDivElement> {
  item: TItem;
  width?: number | string;
  rowIndex?: number;
  index?: number;
  itemVariant?: TickerItemVariant;
}

export interface TickerCarouselRowProps<
  TItem = any,
> extends React.HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  items: TItem[];
  speed: number;
  direction: TickerDirection;
  gap: number | string;
  cardWidth?: number | string;
  itemVariant: TickerItemVariant;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  fillViewport: boolean;
  minimumClones: number;
  reducedMotionBehavior: ReducedMotionBehavior;
  showEdgeFade: boolean;
  renderItem?: (
    item: TItem,
    index: number,
    meta: TickerRenderMeta,
  ) => React.ReactNode;
  getItemKey?: (item: TItem, index: number) => React.Key;
  itemClassName?: string | ((index: number, rowIndex: number) => string);
  itemStyle?:
    | React.CSSProperties
    | ((index: number, rowIndex: number) => React.CSSProperties);
  rowTrackClassName?: string | ((rowIndex: number) => string);
  rowTrackStyle?:
    | React.CSSProperties
    | ((rowIndex: number) => React.CSSProperties);
  slotProps?: TickerSlotProps;
  onMeasure?: (
    rowIndex: number,
    rowWidth: number,
    cloneMultiplier: number,
  ) => void;
  onHoverStart?: (rowIndex: number) => void;
  onHoverEnd?: (rowIndex: number) => void;
  onItemClick?: (item: TItem, index: number, rowIndex: number) => void;
}

export interface TickerCarouselProps<
  TItem = TickerCarouselItemBase,
> extends React.HTMLAttributes<HTMLDivElement> {
  items?: TItem[];
  children?: React.ReactNode;

  rows?: number;
  rowConfigs?: TickerRowConfig[];

  speed?: number;
  rowSpeeds?: number[];
  direction?: TickerDirection;
  rowDirections?: TickerDirection[];
  animationStrategy?: AnimationStrategy;
  easing?: string;
  loop?: boolean;

  paused?: boolean;
  defaultPaused?: boolean;
  onPausedChange?: (paused: boolean) => void;

  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  pauseOnPointerDown?: boolean;
  pauseWhenOffscreen?: boolean;
  playOnMount?: boolean;

  gap?: number | string;
  rowGap?: number | string;
  cardWidth?: number | string;
  minCardWidth?: number | string;
  maxCardWidth?: number | string;

  variant?: TickerVariant;
  itemVariant?: TickerItemVariant;

  showEdgeFade?: boolean;
  edgeFadeWidth?: number | string;

  respectReducedMotion?: boolean;
  reducedMotionBehavior?: ReducedMotionBehavior;

  fillViewport?: boolean;
  minimumClones?: number;

  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  rowAriaLabels?: string[];

  getItemKey?: (item: TItem, index: number) => React.Key;
  renderItem?: (
    item: TItem,
    index: number,
    meta: TickerRenderMeta,
  ) => React.ReactNode;

  classNames?: TickerClassNames;
  styles?: TickerStyles;
  slotProps?: TickerSlotProps;

  onPlay?: () => void;
  onPause?: () => void;
  onMeasure?: (metrics: TickerMetrics) => void;
  onRowHoverStart?: (rowIndex: number) => void;
  onRowHoverEnd?: (rowIndex: number) => void;
  onItemClick?: (item: TItem, index: number, rowIndex: number) => void;
}
