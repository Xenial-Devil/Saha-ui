import { cva, type VariantProps } from 'class-variance-authority';

export const stackVariants = cva(
  'flex transition-all duration-300 ease-out',
  {
    variants: {
      direction: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
      responsive: {
        true: 'flex-col md:flex-row',
        false: '',
      },
      divide: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        direction: 'vertical',
        divide: true,
        className: 'divide-y divide-border',
      },
      {
        direction: 'horizontal',
        divide: true,
        className: 'divide-x divide-border',
      },
      {
        responsive: true,
        divide: true,
        className: 'divide-y md:divide-y-0 md:divide-x divide-border',
      },
    ],
    defaultVariants: {
      direction: 'vertical',
      spacing: 'md',
      align: 'stretch',
      justify: 'start',
      wrap: false,
      responsive: false,
      divide: false,
    },
  }
);

export type StackVariants = VariantProps<typeof stackVariants>;
