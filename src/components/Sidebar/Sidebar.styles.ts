import { cva } from "class-variance-authority";

export const sidebarVariants = cva(
  "flex flex-col h-full transition-all duration-300 ease-in-out z-40",
  {
    variants: {
      variant: {
        default: "bg-card border-r border-border text-card-foreground",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-r border-white/20 text-foreground",
        outline: "bg-transparent border-r-2 border-border text-foreground",
        floating: "bg-card border border-border shadow-2xl rounded-2xl m-4 text-card-foreground",
      },
      collapsed: {
        true: "w-[80px]",
        false: "w-[280px]",
      },
      fixed: {
        true: "fixed top-0 bottom-0 left-0",
        false: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      collapsed: false,
      fixed: true,
    },
  }
);

export const sidebarItemVariants = cva(
  "relative flex items-center gap-3 px-3 py-2 my-1 rounded-xl outline-none transition-all duration-200 cursor-pointer w-full text-left group",
  {
    variants: {
      isActive: {
        true: "bg-primary text-primary-foreground font-medium shadow-sm",
        false: "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
      },
      collapsed: {
        true: "justify-center px-1",
        false: "justify-start",
      },
      isNested: {
        true: "pl-11",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
      collapsed: false,
      isNested: false,
    },
  }
);

export const sidebarGroupVariants = cva(
  "flex flex-col w-full py-2",
  {
    variants: {
      collapsed: {
        true: "items-center",
        false: "px-3",
      },
    },
    defaultVariants: { collapsed: false },
  }
);

export const sidebarToggleVariants = cva(
  "absolute -right-4 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground shadow-sm cursor-pointer transition-transform duration-300 hover:scale-110",
  {
    variants: {
      collapsed: {
        true: "rotate-180",
        false: "",
      },
    },
    defaultVariants: { collapsed: false },
  }
);
