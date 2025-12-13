import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Settings,
  Minimize2,
  Maximize2,
  PictureInPicture2,
  Captions,
  ChevronLeft,
  AlarmClock,
  GaugeCircle,
  MonitorPlay,
  ChevronRight,
} from "lucide-react";

type ControlsProps = {
  playing: boolean;
  onTogglePlay: () => void;

  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;

  muted: boolean;
  volume: number;
  onChangeVolume: (v: number) => void;
  onToggleMute: () => void;

  captions: boolean;
  onToggleCaptions: () => void;

  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onTogglePip: () => void;
  pipSupported?: boolean;

  playbackRate: number;
  onPlaybackRateChange: (rate: number) => void;

  qualities: string[];
  qualityIndex: number;
  onQualityChange: (index: number) => void;

  sleepTimerMinutes: number;
  onChangeSleepTimer: (minutes: number) => void;
};

const formatTime = (t: number) => {
  if (!Number.isFinite(t)) return "0:00";
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const sleepOptions = [0, 15, 30, 60, 120];
const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function Controls({
  playing,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  muted,
  volume,
  onChangeVolume,
  onToggleMute,
  captions,
  onToggleCaptions,
  fullscreen,
  onToggleFullscreen,
  onTogglePip,
  pipSupported = false,
  playbackRate,
  onPlaybackRateChange,
  qualities,
  qualityIndex,
  onQualityChange,
  sleepTimerMinutes,
  onChangeSleepTimer,
}: ControlsProps) {
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsView, setSettingsView] = useState<
    "main" | "speed" | "quality" | "sleep"
  >("main");
  const settingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
        setSettingsView("main");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [settingsOpen]);

  const sleepLabel =
    sleepTimerMinutes === 0 ? "Off" : `${sleepTimerMinutes} min`;

  const playbackLabel =
    playbackRate === 1
      ? "Normal"
      : `${playbackRate.toFixed(2).replace(/\.00$/, "")}x`;

  const qualityLabel = qualities[qualityIndex] || "Auto";

  return (
    <div className="absolute bottom-0 left-0 right-0 text-white transition-all duration-200 pb-2">
      {/* Progress bar */}
      <div className="w-full px-3 mb-1 pointer-events-auto">
        <div className="relative h-1 bg-white/25 rounded-full overflow-visible group">
          <div
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-red-600 rounded-full scale-0 group-hover:scale-100 transition-transform"
            style={{ left: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Main control bar */}
      <div className="flex justify-between items-center px-3 py-1 pointer-events-auto bg-gradient-to-t from-black/60 to-transparent h-[48px]">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Volume + Time */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20"
            >
              {muted || volume === 0 ? (
                <VolumeX size={20} />
              ) : volume < 0.5 ? (
                <Volume1 size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                const val = Number(e.target.value);
                // if previously muted and user raises volume, unmute
                if (muted && val > 0) {
                  onToggleMute();
                }
                onChangeVolume(val);
              }}
              className="w-[65px] accent-white"
            />
          </div>

          <div className="text-[12px] opacity-90">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Captions */}
          <button
            onClick={onToggleCaptions}
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/20"
          >
            <Captions
              size={20}
              className={captions ? "text-red-500" : "text-white"}
            />
          </button>

          {/* Settings popup */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => {
                setSettingsOpen((o) => !o);
                setSettingsView("main");
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20"
            >
              <Settings size={20} />
            </button>

            {settingsOpen && (
              <div
                className="
                  absolute right-0 bottom-[56px]
                  w-[320px]
                  rounded-2xl
                  bg-[#0f0f0f]/95
                  text-sm
                  overflow-hidden
                  shadow-[0_12px_35px_rgba(0,0,0,0.8)]
                  border border-white/10
                  backdrop-blur-md
                "
              >
                {/* header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  {settingsView === "main" ? (
                    <span className="text-[13px] font-semibold tracking-wide">
                      Settings
                    </span>
                  ) : (
                    <>
                      <button
                        className="p-1 rounded-full hover:bg-white/10 -ml-1"
                        onClick={() => setSettingsView("main")}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-[13px] font-semibold tracking-wide">
                        {settingsView === "speed" && "Playback speed"}
                        {settingsView === "quality" && "Quality"}
                        {settingsView === "sleep" && "Sleep timer"}
                      </span>
                    </>
                  )}
                </div>

                {/* MAIN VIEW */}
                {settingsView === "main" && (
                  <div className="py-2 px-2">
                    {/* one row */}
                    <button
                      className="
                        w-full flex items-center justify-between
                        px-3 py-2.5
                        rounded-xl
                        hover:bg-white/10
                        transition-colors
                      "
                      onClick={() => setSettingsView("sleep")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                          <AlarmClock size={18} className="opacity-80" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[13px] leading-tight">
                            Sleep timer
                          </span>
                          <span className="text-[11px] opacity-70 mt-[1px]">
                            {sleepLabel}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="opacity-70" />
                    </button>

                    <button
                      className="
                        w-full flex items-center justify-between
                        px-3 py-2.5
                        rounded-xl
                        hover:bg-white/10
                        transition-colors
                        mt-1
                      "
                      onClick={() => setSettingsView("speed")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                          <GaugeCircle size={18} className="opacity-80" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[13px] leading-tight">
                            Playback speed
                          </span>
                          <span className="text-[11px] opacity-70 mt-[1px]">
                            {playbackLabel}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="opacity-70" />
                    </button>

                    <button
                      className="
                        w-full flex items-center justify-between
                        px-3 py-2.5
                        rounded-xl
                        hover:bg-white/10
                        transition-colors
                        mt-1
                      "
                      onClick={() => setSettingsView("quality")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                          <MonitorPlay size={18} className="opacity-80" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[13px] leading-tight">
                            Quality
                          </span>
                          <span className="text-[11px] opacity-70 mt-[1px]">
                            {qualityLabel}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="opacity-70" />
                    </button>
                  </div>
                )}

                {/* PLAYBACK SPEED VIEW */}
                {settingsView === "speed" && (
                  <div className="py-2">
                    {speedOptions.map((s) => {
                      const label =
                        s === 1
                          ? "Normal"
                          : `${s.toFixed(2).replace(/\.00$/, "")}x`;
                      const active = playbackRate === s;
                      return (
                        <button
                          key={s}
                          className={`
                            w-full flex items-center justify-between
                            px-4 py-2.25 text-[13px]
                            hover:bg-white/10
                            transition-colors
                            ${active ? "bg-white/8" : ""}
                          `}
                          onClick={() => {
                            onPlaybackRateChange(s);
                            setSettingsView("main");
                          }}
                        >
                          <span>{label}</span>
                          {active && (
                            <span className="text-red-500 text-[11px]">●</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* QUALITY VIEW */}
                {settingsView === "quality" && (
                  <div className="py-2">
                    {qualities.map((q, index) => {
                      const active = qualityIndex === index;
                      return (
                        <button
                          key={q + index}
                          className={`
                            w-full flex items-center justify-between
                            px-4 py-2.25 text-[13px]
                            hover:bg-white/10
                            transition-colors
                            ${active ? "bg-white/8" : ""}
                          `}
                          onClick={() => {
                            onQualityChange(index);
                            setSettingsView("main");
                          }}
                        >
                          <span>{q}</span>
                          {active && (
                            <span className="text-red-500 text-[11px]">●</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* SLEEP TIMER VIEW */}
                {settingsView === "sleep" && (
                  <div className="py-2">
                    {sleepOptions.map((m) => {
                      const active = sleepTimerMinutes === m;
                      return (
                        <button
                          key={m}
                          className={`
                            w-full flex items-center justify-between
                            px-4 py-2.25 text-[13px]
                            hover:bg-white/10
                            transition-colors
                            ${active ? "bg-white/8" : ""}
                          `}
                          onClick={() => {
                            onChangeSleepTimer(m);
                            setSettingsView("main");
                          }}
                        >
                          <span>{m === 0 ? "Off" : `${m} minutes`}</span>
                          {active && (
                            <span className="text-red-500 text-[11px]">●</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PiP */}
          <button
            onClick={onTogglePip}
            disabled={!pipSupported}
            title={
              !pipSupported
                ? "Picture-in-Picture not supported"
                : "Toggle Picture-in-Picture"
            }
            className={
              "hidden sm:flex w-9 h-9 items-center justify-center rounded-full " +
              (pipSupported
                ? "hover:bg-white/20"
                : "opacity-40 cursor-not-allowed")
            }
          >
            <PictureInPicture2 size={20} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            {fullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}
