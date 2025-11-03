import { cva } from "class-variance-authority";
const treeVariants = cva("relative w-full transition-all duration-300", {
  variants: {
    variant: {
      default:
        "bg-card border border-border/40 rounded-lg p-2 shadow-sm hover:shadow-xl hover:border-primary/30 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
      glass:
        "glass-strong backdrop-blur-xl p-2 rounded-xl border border-border/30 shadow-lg hover:shadow-2xl hover:border-white/20 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:pointer-events-none",
      bordered:
        "border border-border/60 rounded-lg p-2 hover:border-primary/30 hover:shadow-md transition-all",
      minimal: "p-2",
    },
    size: {
      sm: "text-xs gap-1",
      md: "text-sm gap-2",
      lg: "text-base gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const treeNodeVariants = cva(
  "flex items-center gap-2 py-1 px-2 rounded transition-all duration-300 cursor-pointer select-none hover:scale-[1.02] hover:shadow-md group",
  {
    variants: {
      expanded: {
        true: "bg-accent/10 shadow-sm",
        false: "hover:bg-accent/5",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      size: {
        sm: "text-xs py-0.5",
        md: "text-sm py-1",
        lg: "text-base py-2",
      },
    },
    defaultVariants: {
      expanded: false,
      disabled: false,
      size: "md",
    },
  }
);
export { treeVariants, treeNodeVariants };