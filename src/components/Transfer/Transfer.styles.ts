import { cva } from "class-variance-authority";

export const transferVariants = cva(
  "flex items-center justify-center gap-4",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  }
);

export const transferListVariants = cva(
  "flex flex-col border rounded-lg bg-background overflow-hidden",
  {
    variants: {
      size: {
        sm: "min-w-[200px] w-[200px]",
        md: "min-w-[280px] w-[280px]",
        lg: "min-w-[360px] w-[360px]",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export const transferListHeaderVariants = cva(
  "flex items-center justify-between px-4 py-2 border-b bg-muted/50",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const transferListBodyVariants = cva(
  "flex-1 overflow-y-auto p-2",
  {
    variants: {
      size: {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const transferItemVariants = cva(
  "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-muted/50 group",
  {
    variants: {
      selected: {
        true: "bg-primary/10 hover:bg-primary/15",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "",
      },
      size: {
        sm: "px-2 py-1.5 text-sm gap-1.5",
        md: "px-3 py-2 text-base gap-2",
        lg: "px-4 py-2.5 text-lg gap-3",
      },
    },
    compoundVariants: [
      {
        selected: true,
        disabled: false,
        className: "ring-1 ring-primary/20",
      },
    ],
    defaultVariants: {
      selected: false,
      disabled: false,
      size: "md",
    },
  }
);

export const transferOperationsVariants = cva(
  "flex gap-2",
  {
    variants: {
      orientation: {
        horizontal: "flex-col",
        vertical: "flex-row",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export const transferOperationButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-md active:shadow-sm",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
      },
      orientation: {
        horizontal: "",
        vertical: "rotate-90",
      },
    },
    defaultVariants: {
      size: "md",
      orientation: "horizontal",
    },
  }
);

export const transferSearchVariants = cva(
  "w-full px-3 py-2 border-b bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const transferCheckboxVariants = cva(
  "h-4 w-4 rounded border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
  {
    variants: {
      checked: {
        true: "bg-primary border-primary",
        false: "bg-background border-muted-foreground/30 hover:border-muted-foreground/50",
      },
      indeterminate: {
        true: "bg-primary/50 border-primary",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      checked: false,
      indeterminate: false,
      disabled: false,
    },
  }
);

export const transferEmptyVariants = cva(
  "flex flex-col items-center justify-center py-8 px-4 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "py-6 px-3 text-sm",
        md: "py-8 px-4 text-base",
        lg: "py-10 px-5 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const transferFooterVariants = cva(
  "px-4 py-2 border-t bg-muted/30 text-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
