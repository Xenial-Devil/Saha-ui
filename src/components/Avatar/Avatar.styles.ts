import { cva } from "class-variance-authority";
// CVA variants for Avatar
const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden font-semibold transition-all duration-300 ease-out select-none isolate group hover:scale-110 active:scale-95 shadow-md hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-[10px]",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
        "2xl": "w-20 h-20 text-xl",
        "3xl": "w-24 h-24 text-2xl",
        "4xl": "w-28 h-28 text-3xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
      },
      bordered: {
        true: "ring-2 ring-border ring-offset-2 ring-offset-background hover:ring-primary/50 transition-all",
        false: "",
      },
      ring: {
        true: "ring-4 ring-primary/30 ring-offset-2 ring-offset-background shadow-lg shadow-primary/20 hover:ring-primary/50 hover:shadow-2xl hover:shadow-primary/40 transition-all",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      bordered: false,
      ring: false,
    },
  }
);

// Status indicator variants
const statusVariants = cva(
  "absolute bottom-0 right-0 rounded-full border-2 border-background transition-all duration-200 animate-pulse",
  {
    variants: {
      size: {
        xs: "w-1.5 h-1.5",
        sm: "w-2 h-2",
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3",
        xl: "w-3.5 h-3.5",
        "2xl": "w-4 h-4",
        "3xl": "w-5 h-5",
        "4xl": "w-6 h-6",
      },
      status: {
        online:
          "bg-success shadow-[0_0_12px_0] shadow-success/70 group-hover:shadow-[0_0_16px_0] group-hover:shadow-success/90",
        offline: "bg-muted animate-none",
        away: "bg-warning shadow-[0_0_12px_0] shadow-warning/70 group-hover:shadow-[0_0_16px_0] group-hover:shadow-warning/90",
        busy: "bg-destructive shadow-[0_0_12px_0] shadow-destructive/70 group-hover:shadow-[0_0_16px_0] group-hover:shadow-destructive/90",
        none: "hidden",
      },
    },
    defaultVariants: {
      size: "md",
      status: "none",
    },
  }
);
export { avatarVariants, statusVariants };
