import { cva } from "class-variance-authority";

export const ganttChartVariants = cva(
  "w-full bg-card border border-border/50 rounded-xl p-4 shadow-sm"
);

export const ganttTooltipVariants = cva(
  "bg-popover text-popover-foreground border border-border/50 p-3 rounded-lg shadow-xl"
);
