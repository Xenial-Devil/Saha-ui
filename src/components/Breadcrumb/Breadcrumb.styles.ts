import { cva } from "class-variance-authority";
const breadcrumbVariants = cva("flex items-center flex-wrap gap-1 text-sm", {
  variants: {
    size: {
      sm: "text-xs gap-0.5",
      md: "text-sm gap-1",
      lg: "text-base gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbItemVariants = cva(
  "inline-flex items-center gap-1.5 transition-all duration-300 ease-out font-medium relative overflow-hidden isolate",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground hover:scale-105",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md px-2 py-1 hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        bordered:
          "text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/50 rounded-full px-3 py-1 shadow-sm hover:shadow-lg hover:shadow-primary/20 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        pills:
          "text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/60 rounded-full px-3 py-1 hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        underline:
          "text-muted-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-primary after:to-primary/60 after:transition-all after:duration-300 after:shadow-[0_2px_8px_0] after:shadow-primary/30",
        glass:
          "text-muted-foreground hover:text-foreground bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg px-3 py-1 shadow-lg hover:shadow-xl hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      isCurrentPage: {
        true: "text-foreground font-semibold cursor-default pointer-events-none",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isCurrentPage: true,
        className: "text-primary",
      },
      {
        variant: "ghost",
        isCurrentPage: true,
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "bordered",
        isCurrentPage: true,
        className: "border-primary bg-primary/5 text-primary",
      },
      {
        variant: "pills",
        isCurrentPage: true,
        className: "bg-primary/20 text-primary",
      },
      {
        variant: "glass",
        isCurrentPage: true,
        className: "bg-primary/10 border-primary/30 text-primary",
      },
      {
        variant: "underline",
        isCurrentPage: true,
        className: "text-primary after:w-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      isCurrentPage: false,
    },
  }
);

const breadcrumbSeparatorVariants = cva("text-muted-foreground/50", {
  variants: {
    size: {
      sm: "mx-0.5",
      md: "mx-1",
      lg: "mx-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
export {
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
};