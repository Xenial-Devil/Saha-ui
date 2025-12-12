import { cva } from "class-variance-authority";

const SeparatorVariants = cva("relative flex items-center justify-center", {
  variants: {
    orientation: {
      horizontal: "w-full flex-row",
      vertical: "h-full flex-col",
    },
    spacing: {
      none: "",
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    // Horizontal spacing
    {
      orientation: "horizontal",
      spacing: "xs",
      className: "my-2",
    },
    {
      orientation: "horizontal",
      spacing: "sm",
      className: "my-3",
    },
    {
      orientation: "horizontal",
      spacing: "md",
      className: "my-4",
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      className: "my-6",
    },
    {
      orientation: "horizontal",
      spacing: "xl",
      className: "my-8",
    },
    // Vertical spacing
    {
      orientation: "vertical",
      spacing: "xs",
      className: "mx-2",
    },
    {
      orientation: "vertical",
      spacing: "sm",
      className: "mx-3",
    },
    {
      orientation: "vertical",
      spacing: "md",
      className: "mx-4",
    },
    {
      orientation: "vertical",
      spacing: "lg",
      className: "mx-6",
    },
    {
      orientation: "vertical",
      spacing: "xl",
      className: "mx-8",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});
const SeparatorLineVariants = cva("transition-all duration-300 relative", {
  variants: {
    variant: {
      default: "border-border shadow-sm",
      solid: "border-gray-400 dark:border-gray-600 shadow-sm",
      dashed: "border-gray-400 dark:border-gray-600 border-dashed shadow-sm",
      dotted: "border-gray-400 dark:border-gray-600 border-dotted shadow-sm",
      gradient:
        "border-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent dark:from-transparent dark:via-primary/40 dark:to-transparent shadow-[0_2px_8px_0] shadow-primary/20",
      glass:
        "border-0 bg-gradient-to-r from-transparent via-gray-300/80 to-transparent dark:from-transparent dark:via-gray-700/80 dark:to-transparent backdrop-blur-sm shadow-lg after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-50",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    thickness: {
      thin: "",
      medium: "",
      thick: "",
    },
  },
  compoundVariants: [
    // Horizontal thickness
    {
      orientation: "horizontal",
      thickness: "thin",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-t",
    },
    {
      orientation: "horizontal",
      thickness: "medium",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-t-2",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-t-4",
    },
    // Vertical thickness
    {
      orientation: "vertical",
      thickness: "thin",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-l",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-l-2",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      variant: ["default", "solid", "dashed", "dotted"],
      className: "border-l-4",
    },
    // Gradient & Glass horizontal thickness
    {
      orientation: "horizontal",
      thickness: "thin",
      variant: ["gradient", "glass"],
      className: "h-px",
    },
    {
      orientation: "horizontal",
      thickness: "medium",
      variant: ["gradient", "glass"],
      className: "h-0.5",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      variant: ["gradient", "glass"],
      className: "h-1",
    },
    // Gradient & Glass vertical thickness
    {
      orientation: "vertical",
      thickness: "thin",
      variant: ["gradient", "glass"],
      className: "w-px",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      variant: ["gradient", "glass"],
      className: "w-0.5",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      variant: ["gradient", "glass"],
      className: "w-1",
    },
  ],
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
    thickness: "thin",
  },
});
const SeparatorLabelVariants = cva(
  "bg-background px-3 text-sm font-medium text-muted-foreground flex items-center gap-2 shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col py-3 px-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);
export { SeparatorVariants, SeparatorLineVariants, SeparatorLabelVariants };
