import { cva, type VariantProps } from 'class-variance-authority';

export const gridVariants = cva(
  'grid w-full transition-all duration-300 ease-out',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
      },
      gap: {
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
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        between: 'justify-items-stretch',
        around: 'justify-items-stretch',
        evenly: 'justify-items-stretch',
      },
      autoFit: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      cols: 12,
      gap: 'md',
      align: 'stretch',
      justify: 'start',
      autoFit: false,
    },
  }
);

export const gridItemVariants = cva(
  'transition-all duration-300 ease-out',
  {
    variants: {
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
      },
    },
    defaultVariants: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
);

export type GridVariants = VariantProps<typeof gridVariants>;
export type GridItemVariants = VariantProps<typeof gridItemVariants>;
