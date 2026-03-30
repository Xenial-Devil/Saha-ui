import { cva } from "class-variance-authority";

export const dockVariants = cva(
  "flex items-center gap-4 bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl p-2 shadow-xl shrink-0 overflow-visible",
);

export const dockIconVariants = cva(
  "flex items-center justify-center rounded-full bg-muted/60 transition-[width,height] ease-out duration-200 cursor-pointer overflow-hidden",
);
