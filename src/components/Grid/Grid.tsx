import React from 'react';
import { Slot } from '../../lib/Slot';
import { cn } from '../../lib/utils';
import { gridVariants, gridItemVariants } from './Grid.styles';
import { GridProps, GridItemProps } from './Grid.types';

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 12,
      responsive,
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      autoFit = false,
      minColWidth = '250px',
      asChild = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    // Build responsive classes
    const responsiveClasses = responsive
      ? [
          responsive.sm && `sm:grid-cols-${responsive.sm}`,
          responsive.md && `md:grid-cols-${responsive.md}`,
          responsive.lg && `lg:grid-cols-${responsive.lg}`,
          responsive.xl && `xl:grid-cols-${responsive.xl}`,
        ]
          .filter(Boolean)
          .join(' ')
      : '';

    // Auto-fit grid using CSS custom properties
    const autoFitStyle = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColWidth}, 100%), 1fr))`,
          ...style,
        }
      : style;

    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ cols: autoFit ? undefined : cols, gap, align, justify, autoFit }),
          responsiveClasses,
          className
        )}
        style={autoFitStyle}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Grid.displayName = 'Grid';

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan = 1,
      rowSpan = 1,
      responsive,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    // Build responsive classes
    const responsiveClasses = responsive
      ? [
          responsive.sm && `sm:col-span-${responsive.sm === 'full' ? 'full' : responsive.sm}`,
          responsive.md && `md:col-span-${responsive.md === 'full' ? 'full' : responsive.md}`,
          responsive.lg && `lg:col-span-${responsive.lg === 'full' ? 'full' : responsive.lg}`,
          responsive.xl && `xl:col-span-${responsive.xl === 'full' ? 'full' : responsive.xl}`,
        ]
          .filter(Boolean)
          .join(' ')
      : '';

    return (
      <Comp
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan }),
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

GridItem.displayName = 'GridItem';
