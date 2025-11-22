import { cva } from "class-variance-authority";

const tooltipBaseVariants = cva(
  "absolute whitespace-nowrap z-50 transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground border border-border/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none",
        dark: "bg-gray-900 text-white border border-gray-700 shadow-xl hover:shadow-2xl hover:scale-105",
        light:
          "bg-white text-gray-900 border border-gray-200 shadow-xl dark:bg-gray-100 dark:text-gray-900 hover:shadow-2xl hover:scale-105",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl text-foreground border border-white/20 shadow-2xl shadow-black/10 hover:shadow-[0_12px_48px_0] hover:shadow-primary/20 hover:scale-105 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700 after:pointer-events-none",
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_0] shadow-primary/40 border border-primary/50 hover:shadow-[0_12px_32px_0] hover:shadow-primary/50 hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
        success:
          "bg-green-500 text-white shadow-[0_8px_24px_0] shadow-green-500/40 border border-green-600 hover:shadow-[0_12px_32px_0] hover:shadow-green-500/50 hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
        warning:
          "bg-yellow-500 text-gray-900 shadow-[0_8px_24px_0] shadow-yellow-500/40 border border-yellow-600 hover:shadow-[0_12px_32px_0] hover:shadow-yellow-500/50 hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
        error:
          "bg-red-500 text-white shadow-[0_8px_24px_0] shadow-red-500/40 border border-red-600 hover:shadow-[0_12px_32px_0] hover:shadow-red-500/50 hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
        info: "bg-blue-500 text-white shadow-[0_8px_24px_0] shadow-blue-500/40 border border-blue-600 hover:shadow-[0_12px_32px_0] hover:shadow-blue-500/50 hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
      },
      size: {
        sm: "text-xs px-2 py-1 rounded-md",
        md: "text-sm px-3 py-1.5 rounded-lg",
        lg: "text-base px-4 py-2 rounded-xl",
      },
      interactive: {
        true: "pointer-events-auto cursor-auto",
        false: "pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
);

const tooltipVariants = (
  opts: {
    variant?: string;
    size?: string;
    position?: string;
    interactive?: boolean;
  } = {}
) => {
  const base = tooltipBaseVariants({
    variant: opts.variant as any,
    size: opts.size as any,
    interactive: opts.interactive as any,
  });
  const posMap: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2",
    bottom: "top-full left-1/2 -translate-x-1/2",
    left: "right-full top-1/2 -translate-y-1/2",
    right: "left-full top-1/2 -translate-y-1/2",
  };
  const posClass = opts.position ? posMap[opts.position] || "" : "";
  return `${base} ${posClass}`.trim();
};

/**
 * Arrow variants for tooltip
 */
const arrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-card border-l border-t border-border/50",
      dark: "bg-gray-900 border-l border-t border-gray-700",
      light: "bg-white border-l border-t border-gray-200 dark:bg-gray-100",
      glass:
        "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-l border-t border-white/20",
      primary: "bg-primary border-l border-t border-primary/50",
      success: "bg-green-500 border-l border-t border-green-600",
      warning: "bg-yellow-500 border-l border-t border-yellow-600",
      error: "bg-red-500 border-l border-t border-red-600",
      info: "bg-blue-500 border-l border-t border-blue-600",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "top",
  },
});
export { tooltipVariants, tooltipBaseVariants, arrowVariants };
