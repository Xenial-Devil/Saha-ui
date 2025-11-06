import React from 'react';
import { Slot } from '../../lib/Slot';
import { cn } from '../../lib/utils';
import { sectionVariants } from './Section.styles';
import { SectionProps } from './Section.types';

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'default',
      maxWidth = 'lg',
      center = true,
      bordered = false,
      fullHeight = false,
      gutter = true,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'section';

    return (
      <Comp
        ref={ref}
        className={cn(
          sectionVariants({
            variant,
            padding,
            maxWidth,
            center,
            bordered,
            fullHeight,
            gutter,
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

Section.displayName = 'Section';
