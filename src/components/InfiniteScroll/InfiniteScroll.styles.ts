import { cva } from "class-variance-authority";

export const infiniteScrollVariants = cva("flex flex-col w-full");
export const infiniteTargetVariants = cva("h-4 w-full shrink-0");
export const infiniteMessageContainerVariants = cva("flex w-full justify-center py-4");
export const infiniteEndMessageVariants = cva("text-sm text-muted-foreground");
