import { cva, type VariantProps } from 'class-variance-authority';

export const sectionVariants = cva(
  'relative w-full transition-all duration-500 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-background',
        muted: 'bg-muted/50',
        accent: 'bg-accent/5',
        gradient: 'bg-gradient-to-b from-background via-muted/30 to-background',
      },
      padding: {
        none: 'py-0',
        sm: 'py-8 sm:py-12',
        default: 'py-12 sm:py-16 md:py-20',
        lg: 'py-16 sm:py-24 md:py-32',
        xl: 'py-24 sm:py-32 md:py-40',
      },
      maxWidth: {
        xs: 'max-w-3xl',
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1400px]',
        '2xl': 'max-w-[1600px]',
        full: 'max-w-full',
      },
      center: {
        true: 'mx-auto',
        false: '',
      },
      bordered: {
        true: 'border-y border-border',
        false: '',
      },
      fullHeight: {
        true: 'min-h-screen flex flex-col justify-center',
        false: '',
      },
      gutter: {
        true: 'px-4 sm:px-6 lg:px-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      maxWidth: 'lg',
      center: true,
      bordered: false,
      fullHeight: false,
      gutter: true,
    },
  }
);

export type SectionVariants = VariantProps<typeof sectionVariants>;
