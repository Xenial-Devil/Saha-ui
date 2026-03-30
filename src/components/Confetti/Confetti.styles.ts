import { cva } from "class-variance-authority";

export const confettiVariants = cva("pointer-events-none fixed inset-0 z-50", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
