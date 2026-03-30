import { cva } from "class-variance-authority";

export const numberInputContainerVariants = cva("flex flex-col gap-1.5", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: { fullWidth: false },
});

export const numberInputLabelVariants = cva(
  "text-sm font-semibold text-foreground transition-colors duration-200",
  {
    variants: {
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: { disabled: false },
  }
);

export const numberInputWrapperVariants = cva(
  "relative flex items-stretch rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-card/95 border-2 border-border/50 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20 hover:border-border",
        filled:
          "bg-muted/60 border-2 border-transparent focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20 hover:bg-muted/80",
        outline:
          "bg-transparent border-2 border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/20 hover:border-primary/50",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-2 border-white/20 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-ring/20",
      },
      size: {
        sm: "h-9 text-sm rounded-lg",
        md: "h-11 text-base rounded-xl",
        lg: "h-13 text-lg rounded-xl",
      },
      error: {
        true: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: { variant: "default", size: "md", error: false, disabled: false },
  }
);

export const numberInputFieldVariants = cva(
  "flex-1 bg-transparent text-center font-medium text-foreground outline-none placeholder:text-muted-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "px-2 text-sm",
        md: "px-3 text-base",
        lg: "px-4 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const numberInputButtonVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-150 select-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
  {
    variants: {
      position: {
        left: "rounded-l-[inherit] border-r border-border/30",
        right: "rounded-r-[inherit] border-l border-border/30",
        top: "rounded-t-[inherit] border-b border-border/30",
        bottom: "rounded-b-[inherit] border-t border-border/30",
      },
      size: {
        sm: "w-8 text-sm",
        md: "w-10 text-base",
        lg: "w-12 text-lg",
      },
    },
    defaultVariants: { position: "right", size: "md" },
  }
);

export const helperTextVariants = cva("text-xs mt-1 transition-colors duration-200", {
  variants: {
    error: {
      true: "text-destructive font-medium",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: { error: false },
});
