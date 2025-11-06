import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "relative transition-all duration-300 ease-out transform-gpu will-change-transform overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-card/95 shadow-[0_4px_20px_0] shadow-black/5 dark:shadow-black/20 border border-border/30 backdrop-blur-sm hover:shadow-[0_10px_36px_0] hover:shadow-black/10 dark:hover:shadow-black/30 hover:border-border/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:pointer-events-none",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 dark:shadow-black/30 hover:shadow-[0_16px_56px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700 after:pointer-events-none",
        "glass-strong":
          "bg-white/15 dark:bg-black/15 backdrop-blur-2xl border-2 border-white/25 shadow-2xl shadow-black/15 dark:shadow-black/40 hover:shadow-[0_20px_72px_0] hover:shadow-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700 after:pointer-events-none",
        "glass-subtle":
          "bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 hover:shadow-[0_8px_32px_0] hover:shadow-primary/15 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_50%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none",
        bordered:
          "bg-card/90 border-2 border-border/50 shadow-sm hover:border-primary/40 hover:shadow-[0_6px_28px_0] hover:shadow-primary/10 backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/3 before:to-accent/3 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-[inherit] after:border-2 after:border-transparent after:bg-gradient-to-br after:from-primary/20 after:via-transparent after:to-accent/20 after:bg-origin-border after:-z-10 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none",
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
        true: "hover:scale-[1.02] cursor-pointer active:scale-[0.98] hover:-translate-y-1 active:translate-y-0",
        false: "",
      },
    },
    compoundVariants: [
      // Glass variants with hoverable get enhanced glow
      {
        variant: "glass",
        hoverable: true,
        className: "hover:shadow-primary/30 hover:shadow-[0_20px_64px_0]",
      },
      {
        variant: "glass-strong",
        hoverable: true,
        className:
          "hover:shadow-primary/40 hover:border-primary/30 hover:shadow-[0_24px_80px_0]",
      },
      // Bordered variant with hoverable gets color transition
      {
        variant: "bordered",
        hoverable: true,
        className:
          "hover:border-primary/60 hover:shadow-primary/20 hover:shadow-[0_8px_32px_0]",
      },
    ],
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "lg",
      hoverable: false,
    },
  },
);
