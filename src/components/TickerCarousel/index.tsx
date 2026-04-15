"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import {
  TickerCarouselProps,
  TickerCarouselRef,
  TickerCarouselRowProps,
  TickerCardProps,
  TickerDirection,
  TickerMetrics,
} from "./TickerCarousel.types";
import {
  tickerCarouselVariants,
  tickerViewportVariants,
  tickerRowsVariants,
  tickerRowVariants,
  tickerTrackVariants,
  tickerItemVariants,
  tickerCardVariants,
  edgeFadeVariants,
} from "./TickerCarousel.styles";

const toCssUnit = (value?: number | string, fallback?: string) => {
  if (value === undefined || value === null) return fallback;
  return typeof value === "number" ? `${value}px` : value;
};

const resolveValue = <T,>(
  value: T | ((...args: any[]) => T) | undefined,
  ...args: any[]
): T | undefined => {
  if (typeof value === "function") {
    return (value as (...args: any[]) => T)(...args);
  }
  return value;
};

const useControllableState = <T,>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}) => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
};

const usePrefersReducedMotion = (enabled: boolean) => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [enabled]);

  return reduced;
};

const useInView = (
  ref: React.RefObject<Element | null>,
  enabled: boolean,
): boolean => {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (
      !enabled ||
      typeof window === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, ref]);

  return inView;
};

const splitItemsIntoRows = <T,>(items: T[], rows: number): T[][] => {
  const safeRows = Math.max(1, rows);
  const result = Array.from({ length: safeRows }, () => [] as T[]);

  items.forEach((item, index) => {
    result[index % safeRows].push(item);
  });

  return result.map((row) => (row.length > 0 ? row : items));
};

const getAlternatingDirection = (
  baseDirection: TickerDirection,
  rowIndex: number,
): TickerDirection => {
  if (baseDirection === "left") {
    return rowIndex % 2 === 0 ? "left" : "right";
  }
  return rowIndex % 2 === 0 ? "right" : "left";
};

const defaultGetItemKey = (item: any, index: number): React.Key => {
  if (item && (typeof item.id === "string" || typeof item.id === "number")) {
    return item.id;
  }
  return index;
};

const TickerCard = forwardRef<HTMLDivElement, TickerCardProps<any>>(
  (
    {
      item,
      width,
      rowIndex,
      index,
      itemVariant = "default",
      className,
      ...props
    },
    ref,
  ) => {
    const content = item?.content ? (
      item.content
    ) : (
      <div className="flex h-full flex-col justify-between gap-4 p-4 sm:p-5">
        <div className="space-y-2">
          {(item?.quote || item?.description) && (
            <p className="text-sm leading-6 text-muted-foreground">
              {item.quote || item.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {item?.avatar || item?.image ? (
            <img
              src={item.avatar || item.image}
              alt={item?.name || item?.username || item?.title || "Item image"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {String(item?.name || item?.username || item?.title || "?")
                .slice(0, 1)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            {(item?.name || item?.title) && (
              <div className="truncate text-sm font-semibold">
                {item.name || item.title}
              </div>
            )}
            {item?.username && (
              <div className="truncate text-xs text-muted-foreground">
                {item.username}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const inner = (
      <div
        ref={ref}
        className={cn(tickerCardVariants({ itemVariant }), className)}
        style={{
          width: toCssUnit(width),
        }}
        tabIndex={0}
        data-row-index={rowIndex}
        data-item-index={index}
        {...props}
      >
        {content}
      </div>
    );

    if (item?.href) {
      return (
        <a
          href={item.href}
          className="block"
          style={{ width: toCssUnit(width) }}
          aria-label={
            item?.name || item?.title || item?.username || "Ticker item link"
          }
        >
          {inner}
        </a>
      );
    }

    return inner;
  },
);

TickerCard.displayName = "TickerCard";

const TickerCarouselRow = forwardRef<
  HTMLDivElement,
  TickerCarouselRowProps<any>
>(
  (
    {
      rowIndex,
      items,
      speed,
      direction,
      gap,
      cardWidth,
      itemVariant,
      pauseOnHover,
      pauseOnFocus,
      fillViewport,
      minimumClones,
      reducedMotionBehavior,
      showEdgeFade: _showEdgeFade,
      renderItem,
      getItemKey = defaultGetItemKey,
      itemClassName,
      itemStyle,
      rowTrackClassName,
      rowTrackStyle,
      slotProps,
      className,
      style,
      onMeasure,
      onHoverStart,
      onHoverEnd,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const rowId = useId();
    const rowRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const firstSetRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        rowRef.current = node;
        viewportRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [setWidth, setSetWidth] = useState(0);
    const [cloneMultiplier, setCloneMultiplier] = useState(
      Math.max(2, minimumClones),
    );

    const isPaused = (pauseOnHover && isHovered) || (pauseOnFocus && isFocused);

    const measure = useCallback(() => {
      const setNode = firstSetRef.current;
      const containerNode = viewportRef.current;

      if (!setNode || !containerNode) return;

      const nextSetWidth = setNode.scrollWidth;
      const nextContainerWidth = containerNode.clientWidth;

      setSetWidth(nextSetWidth);

      let nextCloneMultiplier = Math.max(2, minimumClones);

      if (fillViewport && nextSetWidth > 0 && nextContainerWidth > 0) {
        nextCloneMultiplier = Math.max(
          nextCloneMultiplier,
          Math.ceil((nextContainerWidth * 2) / nextSetWidth) + 1,
        );
      }

      setCloneMultiplier(nextCloneMultiplier);
      onMeasure?.(rowIndex, nextSetWidth, nextCloneMultiplier);
    }, [fillViewport, minimumClones, onMeasure, rowIndex]);

    useEffect(() => {
      measure();

      if (typeof window === "undefined") return;

      const handleResize = () => measure();
      window.addEventListener("resize", handleResize);

      let observer: ResizeObserver | null = null;
      if ("ResizeObserver" in window) {
        observer = new ResizeObserver(() => measure());
        if (firstSetRef.current) observer.observe(firstSetRef.current);
        if (viewportRef.current) observer.observe(viewportRef.current);
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        observer?.disconnect();
      };
    }, [measure]);

    const clones = useMemo(
      () =>
        Array.from({ length: cloneMultiplier }, (_, cloneIndex) => ({
          cloneIndex,
          isClone: cloneIndex > 0,
        })),
      [cloneMultiplier],
    );

    const durationSeconds =
      speed > 0 && setWidth > 0 ? Math.max(setWidth / speed, 0.001) : 0;

    const effectiveMotionDisabled =
      reducedMotionBehavior === "stop" || reducedMotionBehavior === "static";

    const resolvedGap = toCssUnit(gap, "16px");

    const animationName =
      direction === "left"
        ? `ticker-scroll-left-${rowId}`
        : `ticker-scroll-right-${rowId}`;

    const renderTickerItem = (
      item: any,
      index: number,
      cloneIndex: number,
      isClone: boolean,
    ) => {
      const meta = {
        index,
        rowIndex,
        cloneIndex,
        isClone,
        isPaused,
        direction,
      };

      const content = renderItem ? (
        renderItem(item, index, meta)
      ) : (
        <TickerCard
          item={item}
          width={cardWidth}
          rowIndex={rowIndex}
          index={index}
          itemVariant={itemVariant}
        />
      );

      const resolvedItemClassName = resolveValue(
        itemClassName,
        index,
        rowIndex,
      );
      const resolvedItemStyle = resolveValue(itemStyle, index, rowIndex);

      return (
        <div
          key={`${String(getItemKey(item, index))}-${cloneIndex}`}
          className={cn(
            tickerItemVariants({ itemVariant }),
            resolvedItemClassName,
          )}
          style={{
            ...resolvedItemStyle,
            width: renderItem ? toCssUnit(cardWidth) : undefined,
          }}
          {...slotProps?.item}
          onFocusCapture={() => {
            if (pauseOnFocus) setIsFocused(true);
          }}
          onBlurCapture={() => {
            if (pauseOnFocus) setIsFocused(false);
          }}
          onClick={() => onItemClick?.(item, index, rowIndex)}
          aria-hidden={isClone ? true : undefined}
        >
          {content}
        </div>
      );
    };

    const trackClassName = resolveValue(rowTrackClassName, rowIndex);
    const trackStyle = resolveValue(rowTrackStyle, rowIndex);

    return (
      <div
        ref={setRef}
        className={cn(tickerRowVariants(), className)}
        style={style}
        onMouseEnter={() => {
          if (pauseOnHover) setIsHovered(true);
          onHoverStart?.(rowIndex);
        }}
        onMouseLeave={() => {
          if (pauseOnHover) setIsHovered(false);
          onHoverEnd?.(rowIndex);
        }}
        {...slotProps?.row}
        {...props}
      >
        <div
          className={cn(tickerTrackVariants(), trackClassName)}
          style={{
            gap: resolvedGap,
            animationName:
              effectiveMotionDisabled || durationSeconds <= 0
                ? undefined
                : animationName,
            animationDuration:
              effectiveMotionDisabled || durationSeconds <= 0
                ? undefined
                : `${durationSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isPaused ? "paused" : "running",
            ...trackStyle,
          }}
          {...slotProps?.rowTrack}
        >
          {clones.map(({ cloneIndex, isClone }) => (
            <div
              key={cloneIndex}
              ref={cloneIndex === 0 ? firstSetRef : undefined}
              className="flex shrink-0"
              style={{ gap: resolvedGap }}
              aria-hidden={isClone ? true : undefined}
            >
              {items.map((item, index) =>
                renderTickerItem(item, index, cloneIndex, isClone),
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes ${animationName} {
            from {
              transform: ${direction === "left"
                ? "translate3d(0, 0, 0)"
                : `translate3d(calc(-1 * ${setWidth}px - ${resolvedGap}), 0, 0)`};
            }
            to {
              transform: ${direction === "left"
                ? `translate3d(calc(-1 * ${setWidth}px - ${resolvedGap}), 0, 0)`
                : "translate3d(0, 0, 0)"};
            }
          }
        `}</style>
      </div>
    );
  },
);

TickerCarouselRow.displayName = "TickerCarouselRow";

const TickerCarousel = forwardRef<TickerCarouselRef, TickerCarouselProps<any>>(
  (
    {
      items = [],
      children,
      rows = 2,
      rowConfigs,
      speed = 40,
      rowSpeeds,
      direction = "left",
      rowDirections,
      animationStrategy = "css",
      easing = "linear",
      loop = true,

      paused,
      defaultPaused = false,
      onPausedChange,

      pauseOnHover = true,
      pauseOnFocus = true,
      pauseOnPointerDown = false,
      pauseWhenOffscreen = true,
      playOnMount = true,

      gap = 16,
      rowGap = 16,
      cardWidth = 320,

      variant = "default",
      itemVariant = "default",

      showEdgeFade = false,
      edgeFadeWidth = 64,

      respectReducedMotion = true,
      reducedMotionBehavior = "stop",

      fillViewport = true,
      minimumClones = 2,

      ariaLabel = "Ticker carousel",
      ariaLabelledBy,
      ariaDescribedBy,
      rowAriaLabels,

      getItemKey = defaultGetItemKey,
      renderItem,

      classNames,
      styles,
      slotProps,

      className,
      style,

      onPlay,
      onPause,
      onMeasure,
      onRowHoverStart,
      onRowHoverEnd,
      onItemClick,

      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [internalPaused, setInternalPaused] = useControllableState<boolean>({
      value: paused,
      defaultValue: defaultPaused || !playOnMount,
      onChange: onPausedChange,
    });

    const reducedMotion = usePrefersReducedMotion(respectReducedMotion);
    const isInView = useInView(rootRef, pauseWhenOffscreen);

    const motionStoppedByPreference =
      reducedMotion &&
      (reducedMotionBehavior === "stop" || reducedMotionBehavior === "static");

    const effectivePaused =
      internalPaused ||
      (pauseWhenOffscreen && !isInView) ||
      motionStoppedByPreference;

    useEffect(() => {
      if (effectivePaused) {
        onPause?.();
      } else {
        onPlay?.();
      }
    }, [effectivePaused, onPause, onPlay]);

    const distributedRows = useMemo(() => {
      return splitItemsIntoRows(items, rows);
    }, [items, rows]);

    const resolvedRowGap = toCssUnit(rowGap, "16px");
    const resolvedEdgeFadeWidth = toCssUnit(edgeFadeWidth, "64px");

    const handleMeasure = useCallback(
      (rowIndex: number, rowWidth: number, cloneMultiplier: number) => {
        const nextMetrics: TickerMetrics = {
          rowWidths: distributedRows.map((_, index) =>
            index === rowIndex ? rowWidth : 0,
          ),
          cloneMultipliers: distributedRows.map((_, index) =>
            index === rowIndex ? cloneMultiplier : 0,
          ),
          containerWidth: rootRef.current?.clientWidth ?? 0,
        };

        onMeasure?.(nextMetrics);
      },
      [distributedRows, onMeasure],
    );

    const play = useCallback(
      () => setInternalPaused(false),
      [setInternalPaused],
    );
    const pause = useCallback(
      () => setInternalPaused(true),
      [setInternalPaused],
    );
    const toggle = useCallback(
      () => setInternalPaused(!effectivePaused),
      [effectivePaused, setInternalPaused],
    );
    const recalculate = useCallback(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"));
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play,
        pause,
        toggle,
        recalculate,
        getRootElement: () => rootRef.current,
        getRowElement: (rowIndex: number) => rowRefs.current[rowIndex] ?? null,
      }),
      [pause, play, recalculate, toggle],
    );

    const resolvedRootStyle: React.CSSProperties = {
      ...styles?.root,
      ...style,
      ["--ticker-row-gap" as any]: resolvedRowGap,
      ["--ticker-edge-fade-width" as any]: resolvedEdgeFadeWidth,
    };

    const viewportStyle: React.CSSProperties = {
      ...styles?.viewport,
    };

    const rowsStyle: React.CSSProperties = {
      ...styles?.rows,
      gap: resolvedRowGap,
    };

    const rowClassNameResolver = classNames?.row;
    const rowTrackClassNameResolver = classNames?.rowTrack;
    const itemClassNameResolver = classNames?.item;
    const itemStyleResolver = styles?.item;
    const rowStyleResolver = styles?.row;
    const rowTrackStyleResolver = styles?.rowTrack;

    if (children) {
      return (
        <div
          ref={rootRef}
          className={cn(
            tickerCarouselVariants({ variant }),
            className,
            classNames?.root
          )}
          style={resolvedRootStyle}
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          {...slotProps?.root}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (!items?.length) return null;
    if (!loop && items.length <= 1) return null;
    if (animationStrategy !== "css") return null;

    return (
      <div
        ref={rootRef}
        className={cn(
          tickerCarouselVariants({ variant }),
          className,
          classNames?.root,
        )}
        style={resolvedRootStyle}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...slotProps?.root}
        {...props}
      >
        <div
          className={cn(tickerViewportVariants(), classNames?.viewport)}
          style={viewportStyle}
          {...slotProps?.viewport}
          onPointerDown={() => {
            if (pauseOnPointerDown) setInternalPaused(true);
          }}
        >
          {showEdgeFade && (
            <>
              <div
                className={cn(
                  edgeFadeVariants(),
                  "left-0",
                  classNames?.edgeFadeLeft,
                )}
                style={{
                  width: resolvedEdgeFadeWidth,
                  background:
                    "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
                }}
              />
              <div
                className={cn(
                  edgeFadeVariants(),
                  "right-0",
                  classNames?.edgeFadeRight,
                )}
                style={{
                  width: resolvedEdgeFadeWidth,
                  background:
                    "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
                }}
              />
            </>
          )}

          <div
            className={cn(tickerRowsVariants(), classNames?.rows)}
            style={rowsStyle}
            {...slotProps?.rows}
          >
            {distributedRows.map((rowItems, rowIndex) => {
              const rowConfig = rowConfigs?.[rowIndex];
              const resolvedDirection =
                rowConfig?.direction ??
                rowDirections?.[rowIndex] ??
                getAlternatingDirection(direction, rowIndex);

              const resolvedSpeed =
                effectivePaused || motionStoppedByPreference
                  ? 0
                  : (rowConfig?.speed ?? rowSpeeds?.[rowIndex] ?? speed);

              const resolvedGap = rowConfig?.gap ?? gap;
              const resolvedPauseOnHover =
                rowConfig?.pauseOnHover ?? pauseOnHover;
              const resolvedPauseOnFocus =
                rowConfig?.pauseOnFocus ?? pauseOnFocus;

              const resolvedRowClassName = cn(
                resolveValue(rowClassNameResolver, rowIndex),
                rowConfig?.className,
              );

              const resolvedRowStyle = {
                ...resolveValue(rowStyleResolver, rowIndex),
                ...rowConfig?.style,
              };

              return (
                <TickerCarouselRow
                  key={rowConfig?.id ?? rowIndex}
                  ref={(node) => {
                    rowRefs.current[rowIndex] = node;
                  }}
                  rowIndex={rowIndex}
                  items={rowItems}
                  speed={resolvedSpeed}
                  direction={resolvedDirection}
                  gap={resolvedGap}
                  cardWidth={cardWidth}
                  itemVariant={itemVariant}
                  pauseOnHover={resolvedPauseOnHover}
                  pauseOnFocus={resolvedPauseOnFocus}
                  fillViewport={fillViewport}
                  minimumClones={minimumClones}
                  reducedMotionBehavior={reducedMotionBehavior}
                  showEdgeFade={showEdgeFade}
                  aria-label={rowAriaLabels?.[rowIndex] ?? rowConfig?.ariaLabel}
                  className={resolvedRowClassName}
                  style={resolvedRowStyle}
                  renderItem={renderItem}
                  getItemKey={getItemKey}
                  itemClassName={itemClassNameResolver}
                  itemStyle={itemStyleResolver}
                  rowTrackClassName={rowTrackClassNameResolver}
                  rowTrackStyle={{
                    ...resolveValue(rowTrackStyleResolver, rowIndex),
                    animationTimingFunction: easing,
                  }}
                  slotProps={slotProps}
                  onMeasure={handleMeasure}
                  onHoverStart={onRowHoverStart}
                  onHoverEnd={onRowHoverEnd}
                  onItemClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

TickerCarousel.displayName = "TickerCarousel";

export { TickerCarousel, TickerCarouselRow, TickerCard };
