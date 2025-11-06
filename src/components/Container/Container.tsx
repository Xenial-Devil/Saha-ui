import React from 'react';
import { Slot } from '../../lib/Slot';
import { cn } from '../../lib/utils';
import { containerVariants } from './Container.styles';
import { ContainerProps } from './Container.types';

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = 'lg',
      padding = 'default',
      center = true,
      gutter = true,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          containerVariants({ size, padding, center, gutter }),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = 'Container';
