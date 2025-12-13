import React from "react";

export type VideoSource = {
  src: string;
  type?: string;
  qualityLabel?: string; // e.g. 1080p
};

export type CaptionTrack = {
  src: string;
  srclang: string;
  kind?: CaptionKind;
  label?: string;
  default?: boolean;
};

export type CaptionKind =
  | "captions"
  | "subtitles"
  | "descriptions"
  | "chapters"
  | "metadata";

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
  /**
   * Controls the video element's `crossOrigin` attribute. Needed when
   * loading remote resources that require CORS for certain operations
   * (e.g. drawing frames to canvas or fetching cross-origin media).
   */
  crossOrigin?: "" | "anonymous" | "use-credentials";
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
  /**
   * How the video resource is loaded. `native` uses the browser's
   * `<source>` elements and native loading. `fetch` will programmatically
   * fetch the selected source and attach a blob URL to the video element.
   * Use `fetch` when you need to inspect response headers or control
   * the network request. Note: CORS headers may still be required for
   * operations like drawing frames to canvas.
   */
  loadStrategy?: "native" | "fetch";
}

// Export the props type as a named export so it can be imported with
// `import type { VideoPlayerProps } from './VideoPlayer.types'`.
