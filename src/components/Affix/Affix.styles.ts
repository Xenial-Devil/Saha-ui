import { cva } from "class-variance-authority";

export const affixVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      affixed: {
        true: "fixed z-10",
        false: "relative",
      },
      position: {
        top: "top-0",
        bottom: "bottom-0",
        none: "",
      },
    },
    defaultVariants: {
      affixed: false,
      position: "none",
    },
  }
);

export const affixPlaceholderVariants = cva(
  "pointer-events-none",
  {
    variants: {
      visible: {
        true: "block",
        false: "hidden",
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

export const affixContentVariants = cva(
  "w-full",
  {
    variants: {
      sticky: {
        true: "sticky",
        false: "",
      },
    },
    defaultVariants: {
      sticky: false,
    },
  }
);
