import { cva } from "class-variance-authority";

export const watermarkContainerVariants = cva("relative overflow-hidden");

export const watermarkOverlayVariants = cva(
  "pointer-events-none absolute inset-0 mix-blend-multiply",
);

export const watermarkAbsoluteVariants = cva(
  "pointer-events-none absolute inset-0 overflow-hidden",
);
