import { cva } from "class-variance-authority";

export const splitButtonMainVariants = cva("rounded-r-none border-r-0 focus:z-10");
export const splitButtonToggleVariants = cva(
  "rounded-l-none px-2 focus:z-10 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 border-l border-white/20 dark:border-black/20"
);
export const splitButtonDropdownContentVariants = cva("min-w-[160px]");
export const splitButtonDropdownItemVariants = cva("flex items-center gap-2 cursor-pointer");
