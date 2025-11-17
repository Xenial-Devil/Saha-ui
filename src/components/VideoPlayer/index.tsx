import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  videoPlayerVariants,
  videoElementVariants,
  controlBarVariants,
  playButtonVariants,
} from "./VideoPlayer.styles";
import Controls from "./Controls";
import type { VideoPlayerProps } from "./VideoPlayer.types";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  thumbnail,
  captions,
  className,
  autoplay = false,
  loop = false,
  muted = false,
  controls = false,
  onPlay: onPlayProp,
  onPause: onPauseProp,
  variant = "default",
  size = "md",
  title = "",
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // used for fullscreen

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [mutedState, setMutedState] = useState(Boolean(muted));
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);

  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(0);
  const sleepTimeoutRef = useRef<number | null>(null);

  const hideControlsTimeout = useRef<number | null>(null);

  const effectivePoster = poster || thumbnail || null;

  // Keep track of fullscreen state
  useEffect(() => {
    const onFs = () => {
      if (typeof document === "undefined") return;
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Attach video events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setDuration(v.duration || 0);

      // Generate poster if none provided
      if (!effectivePoster && !generatedPoster) {
        try {
          const w = v.videoWidth || 1280;
          const h = v.videoHeight || 720;
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(v, 0, 0, w, h);
            const data = canvas.toDataURL("image/jpeg", 0.8);
            setGeneratedPoster(data);
          }
        } catch {
          // ignore cross-origin errors
        }
      }
    };

    const onTime = () => setCurrentTime(v.currentTime || 0);

    const handlePlay = () => {
      setPlaying(true);
      onPlayProp?.();
    };

    const handlePause = () => {
      setPlaying(false);
      onPauseProp?.();
    };

    const onVolume = () => {
      setVolume(v.volume ?? 0);
      setMutedState(Boolean(v.muted));
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", handlePlay);
    v.addEventListener("pause", handlePause);
    v.addEventListener("volumechange", onVolume);

    setVolume(v.volume ?? 1);
    setMutedState(Boolean(v.muted));
    setDuration(v.duration || 0);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("pause", handlePause);
      v.removeEventListener("volumechange", onVolume);
    };
  }, [
    activeSourceIndex,
    onPlayProp,
    onPauseProp,
    effectivePoster,
    generatedPoster,
  ]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        window.clearTimeout(hideControlsTimeout.current);
      }
      if (sleepTimeoutRef.current) {
        window.clearTimeout(sleepTimeoutRef.current);
      }
    };
  }, []);

  // Auto-hide controls while playing
  useEffect(() => {
    if (!playing) {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        window.clearTimeout(hideControlsTimeout.current);
      }
      return;
    }

    setShowControls(true);
    if (hideControlsTimeout.current) {
      window.clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = window.setTimeout(
      () => setShowControls(false),
      2500
    );
  }, [playing]);

  const handleSeek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = Math.max(0, Math.min(t, v.duration || t));
      setCurrentTime(v.currentTime || 0);
    } catch {
      // ignore
    }
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {
        // ignore autoplay errors
      }
    } else {
      v.pause();
    }
  };

  const changeVolume = (value: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = Math.max(0, Math.min(1, value));
    setVolume(v.volume);
    if (v.volume === 0) v.muted = true;
    setMutedState(Boolean(v.muted));
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) {
      v.volume = 0.2;
      setVolume(0.2);
    }
    setMutedState(Boolean(v.muted));
  };

  const changePlaybackRate = (r: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = r;
    setPlaybackRate(r);
  };
  const toggleFullscreen = async () => {
    try {
      if (typeof document === "undefined") return;

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (containerRef.current) {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const togglePip = async () => {
    const v = videoRef.current as any;
    if (!v || typeof document === "undefined") return;
    try {
      if ((document as any).pictureInPictureElement) {
        await (document as any).exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch {
      // ignore
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (!playing) return;
    if (hideControlsTimeout.current) {
      window.clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = window.setTimeout(
      () => setShowControls(false),
      2500
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      const tag = (document.activeElement as HTMLElement | null)?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const v = videoRef.current;

      switch (e.code) {
        case "Space":
        case "KeyK":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          handleSeek((v.currentTime || 0) + 5);
          break;
        case "ArrowLeft":
          handleSeek((v.currentTime || 0) - 5);
          break;
        case "KeyL":
          handleSeek((v.currentTime || 0) + 10);
          break;
        case "KeyJ":
          handleSeek((v.currentTime || 0) - 10);
          break;
        case "ArrowUp":
          changeVolume(Math.min(1, (v.volume || 0) + 0.05));
          break;
        case "ArrowDown":
          changeVolume(Math.max(0, (v.volume || 0) - 0.05));
          break;
        case "KeyF":
          toggleFullscreen();
          break;
        case "KeyM":
          toggleMute();
          break;
        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9": {
          const digit = parseInt(e.code.replace("Digit", ""), 10);
          const pct = digit / 10;
          const target = (v.duration || 0) * pct;
          handleSeek(target);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const switchQuality = (index: number) => {
    const v = videoRef.current;
    if (!v) return;

    const wasPlaying = !v.paused;
    const time = v.currentTime || 0;

    setActiveSourceIndex(index);
    v.pause();
    v.src = sources[index].src;
    v.load();

    const onLoaded = () => {
      try {
        v.currentTime = Math.min(time, v.duration || time);
      } catch {
        // ignore
      }
      if (wasPlaying) {
        v.play().catch(() => {});
      }
      v.removeEventListener("loadedmetadata", onLoaded);
    };

    v.addEventListener("loadedmetadata", onLoaded);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  // Sleep timer: pause video after N minutes
  const updateSleepTimer = (minutes: number) => {
    setSleepTimerMinutes(minutes);

    if (sleepTimeoutRef.current) {
      window.clearTimeout(sleepTimeoutRef.current);
      sleepTimeoutRef.current = null;
    }

    if (minutes <= 0) return;

    const v = videoRef.current;
    if (!v) return;

    const remainingSeconds = (v.duration || 0) - (v.currentTime || 0);
    const timeoutMs = Math.min(minutes * 60 * 1000, remainingSeconds * 1000);

    sleepTimeoutRef.current = window.setTimeout(() => {
      v.pause();
    }, timeoutMs);
  };

  // Quality labels
  const qualityLabels = sources.map((s) => s.qualityLabel || "Auto");

  return (
    <div
      ref={containerRef}
      className={cn(
        videoPlayerVariants({ variant, size }),
        "relative bg-black overflow-hidden rounded-2xl",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (playing) setShowControls(false);
      }}
      {...props}
    >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/0 to-black/70 pointer-events-none" />

      {/* Top bar */}
      {(title || isFullscreen) && (
        <div
          className={cn(
            "pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3 text-sm md:text-base",
            "bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white",
            showControls || !playing ? "opacity-100" : "opacity-0",
            "transition-opacity duration-200"
          )}
        >
          <div className="pointer-events-auto font-semibold truncate max-w-[80%]">
            {title}
          </div>
          <button
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/40 border border-white/10"
            aria-label="More info"
          >
            <span className="text-lg leading-none">i</span>
          </button>
        </div>
      )}

      {/* Video */}
      <div style={{ width: "100%", aspectRatio: "16/9" }} className="bg-black">
        <video
          ref={videoRef}
          className={cn(
            videoElementVariants(),
            "relative z-0 h-full w-full object-cover cursor-pointer"
          )}
          poster={effectivePoster || generatedPoster || undefined}
          preload="metadata"
          loop={loop}
          playsInline
          muted={mutedState}
          autoPlay={autoplay}
          controls={controls || false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          onClick={togglePlay}
          onDoubleClick={toggleFullscreen}
        >
          {sources.map((s, i) => (
            <source key={s.src + i} src={s.src} type={s.type} />
          ))}
          {captions?.map((t, i) => (
            <track
              key={t.src + i}
              src={t.src}
              srcLang={t.srclang}
              label={t.label}
              default={t.default}
            />
          ))}
          Your browser does not support the video element.
        </video>
      </div>

      {/* Center Play Overlay */}
      {!playing && (
        <div
          role="button"
          tabIndex={0}
          onClick={togglePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") togglePlay();
          }}
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/35" />
          <div className={cn(playButtonVariants(), "shadow-xl")}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {/* Thin progress bar when controls hidden */}
      {playing && !showControls && (
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 bg-white/20">
          <div
            className="h-full bg-red-600"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Bottom controls */}
      <div
        className={cn(
          controlBarVariants(),
          "pointer-events-none absolute inset-x-0 bottom-0 pb-2 pt-8",
          "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
          "transition-opacity duration-200",
          showControls || !playing ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="pointer-events-auto px-3 md:px-4">
          <Controls
            playing={playing}
            onTogglePlay={togglePlay}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            muted={mutedState}
            volume={volume}
            onChangeVolume={changeVolume}
            onToggleMute={toggleMute}
            captions={Boolean(captions && captions.length)}
            onToggleCaptions={() => {
              const v = videoRef.current;
              if (!v) return;
              for (let i = 0; i < v.textTracks.length; i++) {
                const t = v.textTracks[i];
                t.mode = t.mode === "showing" ? "disabled" : "showing";
              }
            }}
            fullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onTogglePip={togglePip}
            playbackRate={playbackRate}
            onPlaybackRateChange={changePlaybackRate}
            qualities={qualityLabels}
            qualityIndex={activeSourceIndex}
            onQualityChange={switchQuality}
            sleepTimerMinutes={sleepTimerMinutes}
            onChangeSleepTimer={updateSleepTimer}
          />
        </div>
      </div>
    </div>
  );
};

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
export type { VideoPlayerProps };
export default VideoPlayer;
