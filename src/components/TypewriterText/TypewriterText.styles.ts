import { cva } from "class-variance-authority";

export const typewriterTextVariants = cva("inline-block", {
  variants: {},
  defaultVariants: {},
});

export const typewriterCursorVariants = cva(
  "inline-block w-[2px] h-[1em] bg-current ml-1 align-middle opacity-100 animate-pulse",
);
