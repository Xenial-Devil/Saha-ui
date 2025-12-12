import React from "react";

export type VideoSource = {
  src: string;
  type?: string;
  qualityLabel?: string; // e.g. 1080p
};

export type CaptionTrack = {
  src: string;
  srclang: string;
  label?: string;
  default?: boolean;
};

export type VideoPlayerVariant = "default" | "subtle";
export type VideoPlayerSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: VideoSource[]; // list of sources (for quality switching)
  // optional image to use as a thumbnail/poster. `thumbnail` is an alias
  // for `poster` and preferred when provided by the caller.
  poster?: string;
  thumbnail?: string;
  captions?: CaptionTrack[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean; // if true, show native controls as well (default false)
  onPlay?: () => void;
  onPause?: () => void;
  // styling variants
  variant?: VideoPlayerVariant;
  size?: VideoPlayerSize;
  title?: string;
}

export default VideoPlayerProps;
