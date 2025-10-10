import React from "react";

export interface LinkProps {
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?:
    | "alternate"
    | "author"
    | "bookmark"
    | "external"
    | "help"
    | "license"
    | "next"
    | "nofollow"
    | "noreferrer"
    | "noopener"
    | "prev"
    | "search"
    | "tag"
    | "";
  download?: string | boolean;
  hreflang?: string;
  type?: string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "";
  ping?: string;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  title?: string;
  draggable?: boolean;
  tabIndex?: number;
  accessKey?: string;
  role?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | boolean;
  children: React.ReactNode;
}
