import { cva } from "class-variance-authority";

export const dateTimePickerVariants = cva("flex flex-col gap-1.5 w-full");

export const dateTimeLabelVariants = cva("text-sm font-medium", {
  variants: {
    disabled: {
      true: "opacity-50",
    },
  },
});

export const dateTimeWrapperVariants = cva("flex items-center gap-2 relative");

export const dateTimeDateGroupVariants = cva("flex-1 min-w-[200px]");

export const dateTimeTimeGroupVariants = cva("w-[140px] shrink-0");

export const dateTimeHelperTextVariants = cva("text-xs transition-colors", {
  variants: {
    error: {
      true: "text-destructive",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: {
    error: false,
  },
});
