import React from "react";

export type CarouselVariant = "default" | "contained" | "bordered" | "glass";
export type CarouselEffect = "slide" | "fade" | "cube" | "flip";
export type CarouselDirection = "forward" | "backward";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CarouselVariant;
  effect?: CarouselEffect;
  autoplay?: boolean;
  autoplayInterval?: number;
  direction?: CarouselDirection;
  loop?: boolean;
  pauseOnHover?: boolean;
  swipeable?: boolean;
  showNavigation?: boolean;
  showIndicators?: boolean;
  onSlideChange?: (index: number) => void;
  children?: React.ReactNode;
}

export interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CarouselPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface CarouselNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
