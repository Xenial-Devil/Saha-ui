import { cva } from "class-variance-authority";

export const cropperContainerVariants = cva(
  "relative flex flex-col items-center justify-center overflow-hidden bg-black/90 w-full h-full min-h-[300px] select-none rounded-2xl border border-border",
  {
    variants: {},
  }
);

export const cropperAreaVariants = cva(
  "absolute inset-0 pointer-events-none z-10 box-border border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]",
  {
    variants: {
      shape: {
        rect: "rounded-sm",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "rect",
    },
  }
);
