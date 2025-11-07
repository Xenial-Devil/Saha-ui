import { cva, type VariantProps } from "class-variance-authority";

export const resultStyles = cva(
  [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "text-center",
    "w-full",
  ],
  {
    variants: {
      size: {
        sm: ["py-8", "px-4"],
        md: ["py-12", "px-6"],
        lg: ["py-16", "px-8"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const resultIconStyles = cva(
  ["flex", "items-center", "justify-center", "rounded-full", "mb-6"],
  {
    variants: {
      status: {
        success: [
          "bg-green-100",
          "text-green-600",
          "dark:bg-green-950/50",
          "dark:text-green-400",
        ],
        error: [
          "bg-red-100",
          "text-red-600",
          "dark:bg-red-950/50",
          "dark:text-red-400",
        ],
        info: [
          "bg-blue-100",
          "text-blue-600",
          "dark:bg-blue-950/50",
          "dark:text-blue-400",
        ],
        warning: [
          "bg-yellow-100",
          "text-yellow-600",
          "dark:bg-yellow-950/50",
          "dark:text-yellow-400",
        ],
        "404": [
          "bg-gray-100",
          "text-gray-600",
          "dark:bg-gray-900",
          "dark:text-gray-400",
        ],
        "403": [
          "bg-orange-100",
          "text-orange-600",
          "dark:bg-orange-950/50",
          "dark:text-orange-400",
        ],
        "500": [
          "bg-red-100",
          "text-red-600",
          "dark:bg-red-950/50",
          "dark:text-red-400",
        ],
      },
      size: {
        sm: ["w-16", "h-16"],
        md: ["w-20", "h-20"],
        lg: ["w-24", "h-24"],
      },
    },
    defaultVariants: {
      status: "info",
      size: "md",
    },
  },
);

export const resultIconInnerStyles = cva([], {
  variants: {
    size: {
      sm: ["w-8", "h-8"],
      md: ["w-10", "h-10"],
      lg: ["w-12", "h-12"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const resultTitleStyles = cva(
  ["font-semibold", "text-gray-900", "dark:text-gray-100", "mb-2"],
  {
    variants: {
      size: {
        sm: ["text-lg"],
        md: ["text-2xl"],
        lg: ["text-3xl"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const resultSubTitleStyles = cva(
  ["text-gray-600", "dark:text-gray-400", "max-w-md", "mb-6"],
  {
    variants: {
      size: {
        sm: ["text-sm"],
        md: ["text-base"],
        lg: ["text-lg"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const resultExtraStyles = cva([
  "flex",
  "flex-wrap",
  "items-center",
  "justify-center",
  "gap-3",
]);

export type ResultStylesProps = VariantProps<typeof resultStyles>;
export type ResultIconStylesProps = VariantProps<typeof resultIconStyles>;
export type ResultIconInnerStylesProps = VariantProps<
  typeof resultIconInnerStyles
>;
export type ResultTitleStylesProps = VariantProps<typeof resultTitleStyles>;
export type ResultSubTitleStylesProps = VariantProps<
  typeof resultSubTitleStyles
>;
