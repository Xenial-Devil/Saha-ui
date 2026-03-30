import { cva } from "class-variance-authority";

export const chatBubbleWrapperVariants = cva(
  "flex w-full px-2 gap-3 mb-4",
  {
    variants: {
      isMe: {
        true: "justify-end flex-row-reverse",
        false: "justify-start",
      },
    },
    defaultVariants: {
      isMe: false,
    },
  }
);

export const chatBubbleContentVariants = cva(
  "relative max-w-[70%] sm:max-w-[60%] flex flex-col gap-1",
  {
    variants: {
      isMe: {
        true: "items-end",
        false: "items-start",
      },
    },
    defaultVariants: {
      isMe: false,
    },
  }
);

export const chatBubbleVariants = cva(
  "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors relative before:absolute before:content-[''] before:w-0 before:h-0 before:border-[8px] before:border-transparent",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "bg-transparent border border-border/50 text-foreground shadow-none",
        glass: "bg-background/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground",
      },
      isMe: {
        true: "rounded-tr-sm before:right-[-6px] before:top-[12px]",
        false: "rounded-tl-sm before:left-[-6px] before:top-[12px]",
      },
    },
    compoundVariants: [
      { variant: "primary", isMe: true, className: "before:border-l-primary" },
      { variant: "secondary", isMe: true, className: "before:border-l-secondary" },
      { variant: "default", isMe: true, className: "before:border-l-muted" },
      { variant: "primary", isMe: false, className: "before:border-r-primary" },
      { variant: "secondary", isMe: false, className: "before:border-r-secondary" },
      { variant: "default", isMe: false, className: "before:border-r-muted" },
      { variant: "ghost", isMe: false, className: "before:hidden" },
      { variant: "ghost", isMe: true, className: "before:hidden" },
      { variant: "glass", isMe: false, className: "before:border-r-white/20" },
      { variant: "glass", isMe: true, className: "before:border-l-white/20" },
    ],
    defaultVariants: {
      variant: "default",
      isMe: false,
    },
  }
);
