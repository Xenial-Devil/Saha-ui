import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva(
  "w-full transition-all duration-300 ease-out",
  {
    variants: {
      size: {
        xs: "max-w-3xl",
        sm: "max-w-4xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-[1400px]",
        "2xl": "max-w-[1600px]",
        "3xl": "max-w-[1800px]",
        "4xl": "max-w-[2000px]",
        full: "max-w-full",
      },
      padding: {
        none: "p-0",
        sm: "py-4 sm:py-6",
        default: "py-6 sm:py-8 md:py-10",
        lg: "py-8 sm:py-12 md:py-16",
      },
      center: {
        true: "mx-auto",
        false: "",
      },
      gutter: {
        true: "px-4 sm:px-6 lg:px-8",
        false: "px-0",
      },
    },
    defaultVariants: {
      size: "lg",
      padding: "default",
      center: true,
      gutter: true,
    },
  }
);

export type ContainerVariants = VariantProps<typeof containerVariants>;
