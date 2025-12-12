import { cva } from "class-variance-authority";
const timelineVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      default: "space-y-4",
      outlined: "space-y-4",
      gradient: "space-y-4",
      minimal: "space-y-2",
      glass: "space-y-4",
    },
    position: {
      left: "items-start",
      right: "items-end",
      alternate: "items-center",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "left",
  },
});

const timelineItemVariants = cva("relative flex gap-4", {
  variants: {
    position: {
      left: "flex-row",
      right: "flex-row-reverse",
      alternate: "flex-row even:flex-row-reverse",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

const timelineDotVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300 relative shadow-lg hover:shadow-xl",
  {
    variants: {
      status: {
        default:
          "bg-primary text-primary-foreground shadow-primary/30 hover:shadow-primary/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        success:
          "bg-green-500 text-white shadow-green-500/30 hover:shadow-green-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        error:
          "bg-red-500 text-white shadow-red-500/30 hover:shadow-red-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        warning:
          "bg-yellow-500 text-white shadow-yellow-500/30 hover:shadow-yellow-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        info: "bg-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/40 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        pending:
          "bg-gray-400 text-white shadow-gray-400/30 hover:shadow-gray-400/40",
      },
      size: {
        xs: "w-4 h-4",
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
        xl: "w-12 h-12",
        "2xl": "w-16 h-16",
        "3xl": "w-20 h-20",
        "4xl": "w-24 h-24",
      },
      active: {
        true: "scale-125 shadow-2xl ring-2 ring-primary/20 animate-pulse-glow",
        false: "hover:scale-110",
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
      active: false,
    },
  }
);

const timelineLineVariants = cva(
  "absolute left-1/2 -translate-x-1/2 w-0.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-border shadow-[0_0_4px_0] shadow-border/20",
        outlined: "bg-border shadow-[0_0_4px_0] shadow-border/20",
        gradient:
          "bg-gradient-to-b from-primary/50 to-transparent shadow-[0_0_8px_0] shadow-primary/20",
        minimal: "bg-border/30",
        glass:
          "bg-white/20 backdrop-blur-sm shadow-[0_0_8px_0] shadow-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export {
  timelineVariants,
  timelineItemVariants,
  timelineDotVariants,
  timelineLineVariants,
};
