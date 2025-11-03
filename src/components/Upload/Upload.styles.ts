import { cva } from "class-variance-authority";
/**
 * Upload button/dropzone variants
 */
const uploadVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-lg",
    "border-2 border-dashed transition-all duration-300",
    "cursor-pointer hover:border-opacity-80",
    "focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "hover:bg-muted/30 focus-within:border-primary focus-within:ring-primary/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-foreground",
          "hover:bg-primary/10 focus-within:border-primary focus-within:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-foreground",
          "hover:bg-secondary/10 focus-within:border-secondary focus-within:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-foreground",
          "hover:bg-accent/10 focus-within:border-accent focus-within:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5 text-foreground",
          "hover:bg-success/10 focus-within:border-success focus-within:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-foreground",
          "hover:bg-warning/10 focus-within:border-warning focus-within:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-foreground",
          "hover:bg-destructive/10 focus-within:border-destructive focus-within:ring-destructive/50",
        ],
        info: [
          "border-info/40 bg-info/5 text-foreground",
          "hover:bg-info/10 focus-within:border-info focus-within:ring-info/50",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-muted/20 focus-within:border-primary focus-within:ring-primary/50",
        ],
        ghost: [
          "border-transparent bg-muted/30 text-foreground",
          "hover:bg-muted/50 focus-within:border-primary focus-within:ring-primary/50",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
          "hover:bg-white/20 focus-within:border-primary/50 focus-within:ring-primary/30",
        ],
      },
      size: {
        sm: "px-4 py-3 text-sm min-h-[80px]",
        md: "px-6 py-4 text-base min-h-[120px]",
        lg: "px-8 py-6 text-lg min-h-[160px]",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-2xl",
        none: "rounded-none",
      },
      uploadType: {
        button: "min-h-0 py-2 px-4 inline-flex w-auto border-solid",
        dragger: "w-full flex-col",
        avatar: "w-32 h-32 rounded-full border-solid p-0 overflow-hidden",
        image: "w-full aspect-video border-solid overflow-hidden",
      },
      isDragActive: {
        true: "border-primary bg-primary/20 scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      uploadType: "dragger",
      isDragActive: false,
    },
  }
);

/**
 * File item variants
 */
const fileItemVariants = cva(
  [
    "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
    "hover:bg-muted/30",
  ],
  {
    variants: {
      status: {
        pending: "border-border bg-background",
        uploading: "border-primary/30 bg-primary/5",
        success: "border-success/30 bg-success/5",
        error: "border-destructive/30 bg-destructive/5",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);
export { uploadVariants, fileItemVariants };