import { cva } from "class-variance-authority";
import type { VideoPlayerVariant, VideoPlayerSize } from "./VideoPlayer.types";

export const videoPlayerVariants = cva(
  "relative rounded overflow-hidden bg-black",
  {
    variants: {
      variant: {
        default: "",
        subtle: "bg-neutral-900/60",
      } as Record<VideoPlayerVariant, string>,
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      } as Record<VideoPlayerSize, string>,
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const videoElementVariants = cva("w-full h-auto bg-black");

export const controlBarVariants = cva(
  // full width bar with internal padding so it visually spans the player
  "absolute left-0 right-0 bottom-4 px-6 py-3 bg-black/60 rounded-2xl text-white transition-opacity backdrop-blur-md z-40 flex items-center"
);

export const controlGroupVariants = cva(
  "flex items-center gap-4 justify-between w-full px-3 py-2"
);

export const controlButtonVariants = cva(
  // larger hit target, centered icon, subtle hover
  "inline-flex items-center justify-center bg-transparent hover:bg-white/10 px-3 py-2 rounded-lg text-sm min-w-[36px] min-h-[36px]"
);

export const progressBarVariants = cva(
  "relative h-2 rounded bg-white/10 overflow-hidden cursor-pointer shadow-inner"
);

export const playButtonVariants = cva(
  "w-20 h-20 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-2xl backdrop-brightness-125"
);

export default videoPlayerVariants;
