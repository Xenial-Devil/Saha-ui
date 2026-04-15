import { cva } from "class-variance-authority";

export const multiSelectContentVariants = cva("flex flex-col w-full");
export const multiSelectAllItemVariants = cva("font-semibold text-primary");
export const multiSelectSeparatorVariants = cva("h-px w-full bg-border/50 my-1");
