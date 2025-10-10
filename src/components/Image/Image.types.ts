import React from "react";

export interface ImageProps {
  alt?: string;
  src?: string;
  srcset?: string;
  sizes?: string;
  crossOrigin?: "anonymous" | "use-credentials" | "";
  useMap?: string;
  isMap?: boolean;
  width?: number | string;
  height?: number | string;
  decoding?: "sync" | "async" | "auto";
  loading?: "eager" | "lazy";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url"
    | ""
    | "strict-origin"
    | "strict-origin-when-cross-origin";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  title?: string;
  draggable?: boolean;
}
