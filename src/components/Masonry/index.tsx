"use client";

import React, { useEffect, useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  MasonryProps,
  MasonryColumns,
  MasonryColumnProps,
} from "./Masonry.types";
import {
  masonryVariants,
  masonryColumnVariants,
  masonryItemVariants,
  masonryCSSVariants,
  responsiveColumnClasses,
} from "./Masonry.styles";
import { Slot } from "../../lib/Slot";

export type MasonryVariantsProps = VariantProps<typeof masonryVariants>;

/**
 * MasonryColumn Component (internal)
 * Represents a single column in the masonry layout
 */
const MasonryColumn: React.FC<MasonryColumnProps> = ({
  children,
  className,
  gap = "md",
  animate = false,
  animationDelay = 50,
  columnIndex = 0,
  ...props
}) => {
  const [mounted, setMounted] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setMounted(true);
      }, columnIndex * animationDelay);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [animate, animationDelay, columnIndex]);

  // Handle numeric or custom string gap values
  const isTokenGap =
    typeof gap === "string" &&
    ["none", "xs", "sm", "md", "lg", "xl", "2xl"].includes(gap);

  const customGapStyle =
    !isTokenGap && gap !== undefined
      ? { gap: typeof gap === "number" ? `${gap}px` : gap }
      : {};

  return (
    <div
      className={cn(
        masonryColumnVariants({ gap: isTokenGap ? (gap as any) : undefined }),
        className
      )}
      style={{
        ...customGapStyle,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(1rem)",
        transition: "all 0.5s ease-out",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

MasonryColumn.displayName = "MasonryColumn";

/**
 * Masonry Component
 *
 * A masonry layout component that arranges items in a Pinterest-style grid.
 * Supports both CSS-based (using CSS columns) and JavaScript-based layouts.
 * Perfect for image galleries, card grids, and dynamic content.
 *
 * @example
 * ```tsx
 * // Basic masonry layout
 * <Masonry columns={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Masonry>
 *
 * // Responsive columns
 * <Masonry
 *   columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
 *   gap="lg"
 * >
 *   {items.map((item) => (
 *     <Card key={item.id}>{item.content}</Card>
 *   ))}
 * </Masonry>
 *
 * // Pinterest-style image gallery
 * <Masonry columns={4} gap="sm">
 *   {images.map((img) => (
 *     <img key={img.id} src={img.url} alt={img.alt} />
 *   ))}
 * </Masonry>
 *
 * // With animations
 * <Masonry
 *   columns={3}
 *   gap="md"
 *   animate={true}
 *   animationDelay={100}
 * >
 *   {children}
 * </Masonry>
 *
 * // JavaScript-based layout
 * <Masonry
 *   columns={3}
 *   gap="md"
 *   mode="js"
 * >
 *   {children}
 * </Masonry>
 * ```
 */
const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  (
    {
      columns = 3,
      gap = "md",
      children,
      className,
      columnClassName,
      itemClassName,
      mode = "css",
      renderItem,
      animate = false,
      animationDelay = 50,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(!animate);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      if (animate) {
        const timer = setTimeout(() => {
          setMounted(true);
        }, 100);

        return () => clearTimeout(timer);
      }
      return undefined;
    }, [animate]);

    // Handle numeric or custom string gap values
    const isTokenGap =
      typeof gap === "string" &&
      ["none", "xs", "sm", "md", "lg", "xl", "2xl"].includes(gap);

    // CSS mode - uses CSS columns
    if (mode === "css") {
      const Comp = asChild ? Slot : "div";

      // Custom style for non-token gap values
      const customStyle =
        !isTokenGap && gap !== undefined
          ? { columnGap: typeof gap === "number" ? `${gap}px` : gap }
          : undefined;

      // Determine column classes based on configuration
      const getColumnClasses = () => {
        if (typeof columns === "number") {
          return masonryCSSVariants({
            gap: isTokenGap ? (gap as any) : undefined,
            columns: columns as 1 | 2 | 3 | 4 | 5 | 6,
          });
        }

        // Build responsive column classes
        const classes: string[] = [
          masonryCSSVariants({ gap: isTokenGap ? (gap as any) : undefined }),
        ];

        if (columns.default) {
          classes.push(`columns-${columns.default}`);
        }
        if (
          columns.sm &&
          responsiveColumnClasses.sm[
            columns.sm as keyof typeof responsiveColumnClasses.sm
          ]
        ) {
          classes.push(
            responsiveColumnClasses.sm[
              columns.sm as keyof typeof responsiveColumnClasses.sm
            ]
          );
        }
        if (
          columns.md &&
          responsiveColumnClasses.md[
            columns.md as keyof typeof responsiveColumnClasses.md
          ]
        ) {
          classes.push(
            responsiveColumnClasses.md[
              columns.md as keyof typeof responsiveColumnClasses.md
            ]
          );
        }
        if (
          columns.lg &&
          responsiveColumnClasses.lg[
            columns.lg as keyof typeof responsiveColumnClasses.lg
          ]
        ) {
          classes.push(
            responsiveColumnClasses.lg[
              columns.lg as keyof typeof responsiveColumnClasses.lg
            ]
          );
        }
        if (
          columns.xl &&
          responsiveColumnClasses.xl[
            columns.xl as keyof typeof responsiveColumnClasses.xl
          ]
        ) {
          classes.push(
            responsiveColumnClasses.xl[
              columns.xl as keyof typeof responsiveColumnClasses.xl
            ]
          );
        }
        if (
          columns["2xl"] &&
          responsiveColumnClasses["2xl"][
            columns["2xl"] as keyof (typeof responsiveColumnClasses)["2xl"]
          ]
        ) {
          classes.push(
            responsiveColumnClasses["2xl"][
              columns["2xl"] as keyof (typeof responsiveColumnClasses)["2xl"]
            ]
          );
        }

        return classes.join(" ");
      };

      return (
        <Comp
          ref={ref}
          className={cn(getColumnClasses(), className)}
          style={customStyle}
          {...props}
        >
          {childrenArray.map((child, index) => {
            const itemContent = renderItem ? renderItem(child, index) : child;
            return (
              <div
                key={index}
                className={cn(masonryItemVariants({ animate }), itemClassName)}
                style={
                  animate && mounted
                    ? {
                        opacity: 1,
                        transform: "translateY(0)",
                        transitionDelay: `${index * animationDelay}ms`,
                      }
                    : undefined
                }
              >
                {itemContent}
              </div>
            );
          })}
        </Comp>
      );
    }

    // JS mode - uses flexbox columns
    const columnCount =
      typeof columns === "number" ? columns : columns.default || 3;
    const columnWrapper: React.ReactNode[][] = Array.from(
      { length: columnCount },
      () => []
    );

    // Distribute children across columns
    childrenArray.forEach((child, index) => {
      const columnIndex = index % columnCount;
      columnWrapper[columnIndex].push(child);
    });

    const Comp = asChild ? Slot : "div";

    // Custom style for non-token gap values in JS mode
    const customJsStyle =
      !isTokenGap && gap !== undefined
        ? { gap: typeof gap === "number" ? `${gap}px` : gap }
        : undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex",
          masonryVariants({ gap: isTokenGap ? (gap as any) : undefined }),
          className
        )}
        style={customJsStyle}
        {...props}
      >
        {columnWrapper.map((columnChildren, columnIndex) => (
          <MasonryColumn
            key={columnIndex}
            gap={gap}
            className={cn("flex-1", columnClassName)}
            animate={animate}
            animationDelay={animationDelay}
            columnIndex={columnIndex}
          >
            {columnChildren.map((child, itemIndex) => {
              const globalIndex = columnIndex + itemIndex * columnCount;
              const itemContent = renderItem
                ? renderItem(child, globalIndex)
                : child;
              return (
                <div
                  key={itemIndex}
                  className={cn(
                    masonryItemVariants({ animate }),
                    itemClassName
                  )}
                  style={
                    animate && mounted
                      ? {
                          opacity: 1,
                          transform: "translateY(0)",
                          transitionDelay: `${globalIndex * animationDelay}ms`,
                        }
                      : undefined
                  }
                >
                  {itemContent}
                </div>
              );
            })}
          </MasonryColumn>
        ))}
      </Comp>
    );
  }
);

Masonry.displayName = "Masonry";

export { Masonry, MasonryColumn };
export default Masonry;
export type { MasonryProps, MasonryColumns };
