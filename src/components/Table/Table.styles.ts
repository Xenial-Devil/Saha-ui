import { cva } from "class-variance-authority";
const tableContainerVariants = cva(
  "w-full overflow-auto rounded-lg transition-all duration-300 relative isolate hover:shadow-2xl",
  {
    variants: {
      variant: {
        default:
          "border border-border shadow-md hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        bordered:
          "border-2 border-border shadow-md hover:shadow-xl hover:border-primary/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        striped: "border border-border shadow-md hover:border-primary/30",
        glass:
          "border border-border/30 bg-background/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-white/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:pointer-events-none",
        minimal: "hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tableVariants = cva("w-full border-collapse text-left", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const tableHeaderVariants = cva(
  "border-b border-border bg-muted/50 font-semibold text-muted-foreground uppercase tracking-wider relative isolate transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-accent/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      sticky: {
        true: "sticky top-0 z-10 bg-background shadow-md hover:shadow-lg backdrop-blur-sm",
        false: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      sticky: false,
      size: "md",
    },
  }
);

const tableCellVariants = cva(
  "border-b border-border transition-all duration-300 relative isolate before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
  {
    variants: {
      density: {
        compact: "px-3 py-2",
        normal: "px-4 py-3",
        comfortable: "px-6 py-4",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      density: "normal",
      align: "left",
    },
  }
);

const tableRowVariants = cva("transition-colors", {
  variants: {
    hoverable: {
      true: "hover:bg-muted/50 cursor-pointer",
      false: "",
    },
    striped: {
      true: "even:bg-muted/30",
      false: "",
    },
    selected: {
      true: "bg-primary/10 hover:bg-primary/20",
      false: "",
    },
  },
  defaultVariants: {
    hoverable: true,
    striped: false,
    selected: false,
  },
});
export {
  tableContainerVariants,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants,
  tableRowVariants,
};