import { cva } from "class-variance-authority";

export const otpDisplayBlockVariants = cva("flex flex-col items-center gap-4");

export const otpDisplayBlockErrorVariants = cva(
  "text-sm font-medium text-destructive mt-2",
);
