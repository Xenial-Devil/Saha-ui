import { cva } from "class-variance-authority";

export const transferVariants = cva("flex items-center justify-center gap-4", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const transferListVariants = cva(
  "flex flex-col border rounded-lg bg-background overflow-hidden",
  {
    variants: {
      size: {
        xs: "min-w-[160px] w-[160px]",
        sm: "min-w-[200px] w-[200px]",
        md: "min-w-[280px] w-[280px]",
        lg: "min-w-[360px] w-[360px]",
        xl: "min-w-[440px] w-[440px]",
        "2xl": "min-w-[520px] w-[520px]",
        "3xl": "min-w-[600px] w-[600px]",
        "4xl": "min-w-[720px] w-[720px]",
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
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
        xl: "px-6 py-3 text-xl",
        "2xl": "px-7 py-3.5 text-2xl",
        "3xl": "px-8 py-4 text-3xl",
        "4xl": "px-10 py-5 text-4xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const transferListBodyVariants = cva("flex-1 overflow-y-auto p-2", {
  variants: {
    size: {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "p-3",
      xl: "p-4",
      "2xl": "p-5",
      "3xl": "p-6",
      "4xl": "p-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

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
        xs: "px-1.5 py-1 text-xs gap-1",
        sm: "px-2 py-1.5 text-sm gap-1.5",
        md: "px-3 py-2 text-base gap-2",
        lg: "px-4 py-2.5 text-lg gap-3",
        xl: "px-5 py-3 text-xl gap-3.5",
        "2xl": "px-6 py-3.5 text-2xl gap-4",
        "3xl": "px-7 py-4 text-3xl gap-5",
        "4xl": "px-8 py-5 text-4xl gap-6",
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

export const transferOperationsVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const transferOperationButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-md active:shadow-sm",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-14 w-14 text-xl",
        "2xl": "h-16 w-16 text-2xl",
        "3xl": "h-20 w-20 text-3xl",
        "4xl": "h-24 w-24 text-4xl",
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
        xs: "px-1.5 py-1 text-xs",
        sm: "px-2 py-1.5 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-2.5 text-lg",
        xl: "px-5 py-3 text-xl",
        "2xl": "px-6 py-3.5 text-2xl",
        "3xl": "px-7 py-4 text-3xl",
        "4xl": "px-8 py-5 text-4xl",
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
        false:
          "bg-background border-muted-foreground/30 hover:border-muted-foreground/50",
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
        xs: "py-4 px-2 text-xs",
        sm: "py-6 px-3 text-sm",
        md: "py-8 px-4 text-base",
        lg: "py-10 px-5 text-lg",
        xl: "py-12 px-6 text-xl",
        "2xl": "py-14 px-7 text-2xl",
        "3xl": "py-16 px-8 text-3xl",
        "4xl": "py-20 px-10 text-4xl",
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
        xs: "px-2 py-1 text-[10px]",
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
        xl: "px-6 py-3 text-lg",
        "2xl": "px-7 py-3.5 text-xl",
        "3xl": "px-8 py-4 text-2xl",
        "4xl": "px-10 py-5 text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
