import { cva } from "class-variance-authority";

// ============================================================================
// TOGGLE GROUP VARIANTS
// ============================================================================

export const toggleGroupVariants = cva(
  [
    "group/toggle-group inline-flex w-fit items-center rounded-md",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: ["focus-within:ring-accent/50"],
        primary: ["focus-within:ring-primary/50"],
        secondary: ["focus-within:ring-secondary/50"],
        accent: ["focus-within:ring-accent/50"],
        success: ["focus-within:ring-success/50"],
        warning: ["focus-within:ring-warning/50"],
        error: ["focus-within:ring-error/50"],
        info: ["focus-within:ring-info/50"],
        outline: [
          "border border-input shadow-sm",
          "focus-within:ring-accent/50",
        ],
        ghost: ["focus-within:ring-accent/50"],
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      spacing: 1,
    },
  }
);

export const toggleGroupItemVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "text-sm font-medium transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus:outline-none focus:z-10 focus-visible:z-10",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "whitespace-nowrap select-none cursor-pointer",
    "data-[state=on]:shadow-inner",
    "w-auto min-w-0 shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-transparent hover:bg-accent/10",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
          "focus-visible:ring-accent/50",
        ],
        primary: [
          "bg-transparent hover:bg-primary/10",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
          "focus-visible:ring-primary/50",
        ],
        secondary: [
          "bg-transparent hover:bg-secondary/10",
          "data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
          "focus-visible:ring-secondary/50",
        ],
        accent: [
          "bg-transparent hover:bg-accent/10",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
          "focus-visible:ring-accent/50",
        ],
        success: [
          "bg-transparent hover:bg-success/10",
          "data-[state=on]:bg-success data-[state=on]:text-white",
          "focus-visible:ring-success/50",
        ],
        warning: [
          "bg-transparent hover:bg-warning/10",
          "data-[state=on]:bg-warning data-[state=on]:text-white",
          "focus-visible:ring-warning/50",
        ],
        error: [
          "bg-transparent hover:bg-error/10",
          "data-[state=on]:bg-error data-[state=on]:text-white",
          "focus-visible:ring-error/50",
        ],
        info: [
          "bg-transparent hover:bg-info/10",
          "data-[state=on]:bg-info data-[state=on]:text-white",
          "focus-visible:ring-info/50",
        ],
        outline: [
          "border border-input bg-transparent hover:bg-accent/10",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-accent",
          "focus-visible:ring-accent/50",
        ],
        ghost: [
          "bg-transparent hover:bg-accent/10",
          "data-[state=on]:bg-accent/20",
          "focus-visible:ring-accent/50",
        ],
      },
      size: {
        sm: "h-8 px-2 min-w-8 text-xs",
        default: "h-9 px-3 min-w-9",
        lg: "h-10 px-4 min-w-10",
        xl: "h-11 px-5 min-w-11 text-base",
      },
      spacing: {
        0: [
          "rounded-none shadow-none",
          "first:rounded-l-md last:rounded-r-md",
          // Outline variant specific styles for no spacing
          "data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        ],
        1: "rounded-md",
        2: "rounded-md",
        3: "rounded-md",
        4: "rounded-md",
      },
      orientation: {
        horizontal: "",
        vertical: "w-full",
      },
    },
    compoundVariants: [
      {
        spacing: 0,
        orientation: "vertical",
        className: [
          "first:rounded-t-md first:rounded-b-none",
          "last:rounded-b-md last:rounded-t-none",
          "data-[variant=outline]:border-t-0 data-[variant=outline]:first:border-t",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      spacing: 1,
      orientation: "horizontal",
    },
  }
);

export type ToggleGroupVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost";

export type ToggleGroupSize = "sm" | "default" | "lg" | "xl";
export type ToggleGroupSpacing = 0 | 1 | 2 | 3 | 4;
export type ToggleGroupOrientation = "horizontal" | "vertical";
