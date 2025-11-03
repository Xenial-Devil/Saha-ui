import { cva } from "class-variance-authority";
const buttonGroupVariants = cva(
  "inline-flex isolate relative transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-md hover:shadow-xl",
        outline:
          "border border-border rounded-xl hover:border-primary/50 hover:shadow-lg",
        ghost: "hover:shadow-md",
        glass:
          "backdrop-blur-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 shadow-lg hover:shadow-2xl hover:bg-white/10 dark:hover:bg-black/10 rounded-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-xl",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      attached: {
        true: "gap-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        attached: false,
        className: "gap-2",
      },
      {
        orientation: "vertical",
        attached: false,
        className: "gap-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      fullWidth: false,
      attached: true,
    },
  }
);

export { buttonGroupVariants };