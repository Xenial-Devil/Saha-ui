// components/Chart.styles.ts
import { cva } from "class-variance-authority";

export const chartContainerVariants = cva(
  "flex aspect-auto justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
        outline: "",
        ghost: "",
        glass: "",
      },
      size: {
        sm: "min-h-[200px]",
        md: "min-h-[300px]",
        lg: "min-h-[400px]",
        xl: "min-h-[500px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export const chartWrapperVariants = cva(
  "flex flex-col gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        primary: "border-primary/20 bg-primary/5",
        secondary: "border-secondary/20 bg-secondary/5",
        accent: "border-accent/20 bg-accent/5",
        success: "border-emerald-500/20 bg-emerald-500/5",
        warning: "border-amber-500/20 bg-amber-500/5",
        error: "border-rose-500/20 bg-rose-500/5",
        info: "border-sky-500/20 bg-sky-500/5",
        outline: "border-2",
        ghost: "border-transparent bg-transparent shadow-none",
        glass:
          "backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-border/40",
      },
      size: {
        sm: "p-3 gap-1.5",
        md: "p-4 gap-2",
        lg: "p-5 gap-3",
        xl: "p-6 gap-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export const chartHeaderVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-2.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const chartTitleVariants = cva(
  "font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
        xl: "text-2xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const chartDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export const chartLegendVariants = cva(
  "flex items-center justify-center gap-4 text-sm",
  {
    variants: {
      position: {
        top: "mb-2",
        bottom: "mt-2",
        left: "mr-2",
        right: "ml-2",
      },
    },
    defaultVariants: { position: "bottom" },
  },
);

export const chartTooltipVariants = cva(
  "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
  {
    variants: {
      indicator: {
        dot: "",
        line: "",
        dashed: "",
      },
    },
    defaultVariants: { indicator: "dot" },
  },
);

// Legacy exports for backward compatibility
export const chartVariants = chartWrapperVariants;
export const chartCanvasVariants = cva("w-full", {
  variants: {
    size: {
      sm: "h-[200px]",
      md: "h-[300px]",
      lg: "h-[400px]",
      xl: "h-[500px]",
    },
  },
  defaultVariants: { size: "md" },
});
export const legendVariants = chartLegendVariants;
export const legendItemVariants = cva("flex items-center gap-1.5");
export const tooltipVariants = chartTooltipVariants;
