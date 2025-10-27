import { cva } from "class-variance-authority";

// ============================================================================
// TYPOGRAPHY VARIANTS
// ============================================================================

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      info: "text-info",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    transform: {
      none: "normal-case",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    decoration: {
      none: "no-underline",
      underline: "underline",
      overline: "overline",
      lineThrough: "line-through",
    },
    truncate: {
      none: "",
      truncate: "truncate",
      ellipsis: "overflow-hidden text-ellipsis",
      clip: "overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
    align: "left",
  },
});

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted"
  | "blockquote"
  | "code"
  | "list"
  | "inlineCode";

export type TypographyColor =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted";

export type TypographyAlign = "left" | "center" | "right" | "justify";

export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TypographyTransform =
  | "none"
  | "uppercase"
  | "lowercase"
  | "capitalize";

export type TypographyDecoration =
  | "none"
  | "underline"
  | "overline"
  | "lineThrough";

export type TypographyTruncate = "none" | "truncate" | "ellipsis" | "clip";
