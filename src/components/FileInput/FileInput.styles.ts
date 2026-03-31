import { cva } from "class-variance-authority";

export const fileInputContainerVariants = cva("flex flex-col gap-1.5", {
  variants: {
    fullWidth: { true: "w-full", false: "w-auto" },
  },
  defaultVariants: { fullWidth: false },
});

export const fileInputLabelVariants = cva(
  "text-sm font-semibold text-foreground transition-colors duration-200",
  {
    variants: {
      disabled: { true: "opacity-50", false: "" },
    },
    defaultVariants: { disabled: false },
  }
);

export const fileInputDropzoneVariants = cva(
  "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ease-out group",
  {
    variants: {
      variant: {
        default:
          "border-border/60 bg-card/50 hover:border-primary/50 hover:bg-primary/5 focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20",
        outline:
          "border-border bg-transparent hover:border-primary/60 hover:bg-primary/5 focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20",
        filled:
          "border-transparent bg-muted/60 hover:bg-muted/80 focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20",
        glass:
          "border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl hover:border-primary/40 hover:bg-white/15 dark:hover:bg-black/15 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-ring/20",
      },
      size: {
        sm: "px-4 py-6 text-sm min-h-[100px]",
        md: "px-6 py-8 text-base min-h-[140px]",
        lg: "px-8 py-10 text-lg min-h-[180px]",
      },
      isDragActive: {
        true: "border-primary bg-primary/10 scale-[1.01] shadow-lg shadow-primary/10",
        false: "",
      },
      error: {
        true: "border-destructive hover:border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-default",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isDragActive: false,
      error: false,
      disabled: false,
    },
  }
);

export const fileInputIconVariants = cva(
  "text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      isDragActive: {
        true: "text-primary scale-110 animate-bounce",
        false: "",
      },
    },
    defaultVariants: { size: "md", isDragActive: false },
  }
);

export const filePreviewContainerVariants = cva(
  "flex flex-wrap gap-2 mt-2",
  {
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-3",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const filePreviewItemVariants = cva(
  "relative flex items-center gap-2 rounded-lg border border-border/50 bg-card/80 transition-all duration-200 hover:shadow-md group/item",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const fileRemoveButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-foreground/10 text-foreground/60 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const fileHelperTextVariants = cva("text-xs mt-1 transition-colors duration-200", {
  variants: {
    error: {
      true: "text-destructive font-medium",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: { error: false },
});
