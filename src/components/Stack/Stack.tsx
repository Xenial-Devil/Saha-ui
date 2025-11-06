import React from 'react';
import { Slot } from '../../lib/Slot';
import { cn } from '../../lib/utils';
import { stackVariants } from './Stack.styles';
import { StackProps } from './Stack.types';

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'vertical',
      spacing = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      responsive = false,
      divide = false,
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
          stackVariants({
            direction: responsive ? 'vertical' : direction,
            spacing,
            align,
            justify,
            wrap,
            responsive,
            divide,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Stack.displayName = 'Stack';
