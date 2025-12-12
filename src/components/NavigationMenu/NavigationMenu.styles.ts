import { cva } from "class-variance-authority";

export const navRoot = cva("transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-transparent text-inherit",
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      accent: "bg-accent text-white",
      ghost: "bg-muted/5 text-foreground",
      glass: "backdrop-blur-md bg-white/30 dark:bg-black/30",
      filled: "bg-muted text-contrast",
      outlined: "bg-transparent",
      minimal: "bg-transparent",
    },
    size: {
      xs: "text-xs py-0.5 px-1.5",
      sm: "text-sm py-1 px-2",
      md: "text-base py-2 px-3",
      lg: "text-lg py-3 px-4",
      xl: "text-xl py-4 px-5",
      "2xl": "text-2xl py-5 px-6",
      "3xl": "text-3xl py-6 px-8",
      "4xl": "text-4xl py-8 px-10",
    },
    orientation: {
      vertical: "flex flex-col gap-1",
      horizontal: "flex flex-row items-center gap-2 flex-wrap",
    },
    compact: {
      true: "gap-0.5",
      false: "",
    },
    responsive: {
      true: "flex-col md:flex-row md:items-center md:flex-wrap lg:flex-col lg:items-stretch",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    orientation: "vertical",
    responsive: false,
  },
});

export const navItemContainer = cva("", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "relative group",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const navItem = cva(
  "flex items-center gap-2 rounded-md transition-all duration-300 ease-in-out px-3 py-2 cursor-pointer",
  {
    variants: {
      active: { true: "bg-accent/10", false: "hover:bg-muted/5" },
      disabled: { true: "opacity-40 pointer-events-none", false: "" },
      responsive: {
        true: "w-full md:w-auto lg:w-full",
        false: "",
      },
      hasChildren: {
        true: "font-medium",
        false: "",
      },
      orientation: {
        vertical: "",
        horizontal: "",
      },
      level: {
        0: "",
        1: "",
        2: "",
        3: "",
      },
    },
    compoundVariants: [
      // Level indentation only for vertical mode
      {
        orientation: "vertical",
        level: 1,
        className: "pl-8 ml-2",
      },
      {
        orientation: "vertical",
        level: 2,
        className: "pl-12 ml-4",
      },
      {
        orientation: "vertical",
        level: 3,
        className: "pl-16 ml-6",
      },
    ],
    defaultVariants: {
      active: false,
      disabled: false,
      responsive: false,
      hasChildren: false,
      orientation: "vertical",
      level: 0,
    },
  }
);

export const navSubMenu = cva("transition-all duration-500 ease-in-out", {
  variants: {
    open: {
      true: "max-h-[2000px] opacity-100",
      false: "max-h-0 opacity-0",
    },
    orientation: {
      vertical: "mt-1 overflow-hidden",
      horizontal:
        "absolute top-0 left-0 min-w-[220px] shadow-lg rounded-md z-50 border border-gray-200 dark:border-gray-700 p-2",
    },
    variant: {
      default: "",
      primary: "",
      secondary: "",
      accent: "",
      ghost: "",
      glass: "",
      filled: "",
      outlined: "",
      minimal: "",
    },
    level: {
      0: "",
      1: "",
      2: "",
      3: "",
    },
  },
  compoundVariants: [
    // Horizontal mode overrides - use hover instead of open state
    {
      orientation: "horizontal",
      open: false,
      className: "opacity-0 invisible pointer-events-none max-h-[2000px]",
    },
    {
      orientation: "horizontal",
      open: true,
      className: "opacity-100 visible pointer-events-auto max-h-[2000px]",
    },
    // Level 0 submenu - shows on hover of level 0 parent
    {
      orientation: "horizontal",
      open: false,
      level: 1,
      className:
        "group-hover/item-0:opacity-100 group-hover/item-0:visible group-hover/item-0:pointer-events-auto",
    },
    // Level 1 submenu - shows on hover of level 1 parent
    {
      orientation: "horizontal",
      open: false,
      level: 2,
      className:
        "group-hover/item-1:opacity-100 group-hover/item-1:visible group-hover/item-1:pointer-events-auto",
    },
    // Level 2 submenu - shows on hover of level 2 parent
    {
      orientation: "horizontal",
      open: false,
      level: 3,
      className:
        "group-hover/item-2:opacity-100 group-hover/item-2:visible group-hover/item-2:pointer-events-auto",
    },
    {
      orientation: "horizontal",
      variant: "default",
      className: "bg-white dark:bg-gray-900",
    },
    {
      orientation: "horizontal",
      variant: "primary",
      className: "bg-primary text-white",
    },
    {
      orientation: "horizontal",
      variant: "secondary",
      className: "bg-secondary text-white",
    },
    {
      orientation: "horizontal",
      variant: "accent",
      className: "bg-accent text-white",
    },
    {
      orientation: "horizontal",
      variant: "ghost",
      className: "bg-white dark:bg-gray-900",
    },
    {
      orientation: "horizontal",
      variant: "glass",
      className: "backdrop-blur-md bg-white/90 dark:bg-black/90",
    },
    {
      orientation: "horizontal",
      variant: "filled",
      className: "bg-muted text-contrast",
    },
    {
      orientation: "horizontal",
      variant: "outlined",
      className: "bg-white dark:bg-gray-900",
    },
    {
      orientation: "horizontal",
      variant: "minimal",
      className: "bg-white dark:bg-gray-900",
    },
    // Level-based positioning for horizontal mode
    {
      orientation: "horizontal",
      level: 1,
      className: "top-full left-0",
    },
    {
      orientation: "horizontal",
      level: 2,
      className: "top-0 left-full ml-0.5",
    },
    {
      orientation: "horizontal",
      level: 3,
      className: "top-0 left-full ml-0.5",
    },
  ],
  defaultVariants: {
    open: false,
    orientation: "vertical",
    variant: "default",
    level: 0,
  },
});

export const navSection = cva("mb-4 last:mb-0", {
  variants: {
    responsive: {
      true: "w-full md:w-auto lg:w-full md:mb-2 lg:mb-4",
      false: "",
    },
  },
  defaultVariants: {
    responsive: false,
  },
});

export const navSectionTitle = cva(
  "text-xs uppercase font-medium mb-1 px-3 opacity-60",
  {
    variants: {
      responsive: {
        true: "md:hidden lg:block",
        false: "",
      },
    },
    defaultVariants: {
      responsive: false,
    },
  }
);
