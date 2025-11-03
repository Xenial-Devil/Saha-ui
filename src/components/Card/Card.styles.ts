import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "relative transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card/95 shadow-[0_4px_20px_0] shadow-black/5 dark:shadow-black/20 border border-border/30 backdrop-blur-sm hover:shadow-[0_8px_30px_0] hover:shadow-black/10 dark:hover:shadow-black/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        glass:
          "glass backdrop-blur-2xl shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30 hover:shadow-[0_12px_48px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "glass-strong":
          "glass-strong backdrop-blur-3xl shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40 hover:shadow-[0_16px_64px_0] hover:shadow-primary/25 border-2 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "glass-subtle":
          "glass-subtle backdrop-blur-sm shadow-[0_2px_12px_0] shadow-black/5 dark:shadow-black/20 hover:shadow-[0_4px_20px_0] hover:shadow-primary/15 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        bordered:
          "bg-card/90 border-2 border-border/50 shadow-sm hover:border-primary/40 hover:shadow-[0_4px_24px_0] hover:shadow-primary/10 backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/3 before:to-accent/3 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
      hoverable: {
        true: "hover:scale-[1.02] cursor-pointer active:scale-[0.98]",
        false: "",
      },
    },
    compoundVariants: [
      // Glass variants with hoverable get enhanced glow
      {
        variant: "glass",
        hoverable: true,
        className: "hover:shadow-primary/30",
      },
      {
        variant: "glass-strong",
        hoverable: true,
        className: "hover:shadow-primary/40 hover:border-primary/30",
      },
      // Bordered variant with hoverable gets color transition
      {
        variant: "bordered",
        hoverable: true,
        className: "hover:border-primary/60 hover:shadow-primary/20",
      },
    ],
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "lg",
      hoverable: false,
    },
  }
);
