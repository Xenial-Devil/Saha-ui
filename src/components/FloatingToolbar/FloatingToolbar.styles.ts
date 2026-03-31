import { cva } from "class-variance-authority";

export const floatingToolbarVariants = cva(
  "fixed z-40 bg-background/80 backdrop-blur-md border border-border shadow-lg rounded-full p-1",
  {
    variants: {
      position: {
        top: "top-4 left-1/2 -translate-x-1/2",
        bottom: "bottom-8 left-1/2 -translate-x-1/2",
        left: "left-4 top-1/2 -translate-y-1/2 flex-col",
        right: "right-4 top-1/2 -translate-y-1/2 flex-col",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);
