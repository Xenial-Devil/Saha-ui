import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { progressBarVariants } from "./VideoPlayer.styles";

interface BufferedRange {
  start: number;
  end: number;
}

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered?: BufferedRange[];
  onSeek: (time: number) => void;
}

const formatTime = (t: number) => {
  if (!isFinite(t) || t < 0) return "0:00";
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  buffered = [],
  onSeek,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [seeking, setSeeking] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const percent = duration ? (currentTime / duration) * 100 : 0;

  const clientXToTime = (clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const ratio = x / rect.width;
    return ratio * (duration || 0);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setSeeking(true);
    const t = clientXToTime(e.clientX);
    setHoverTime(t);
    onSeek(t);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const t = clientXToTime(e.clientX);
    setHoverTime(t);
    if (!seeking) return;
    onSeek(t);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setSeeking(false);
    const t = clientXToTime(e.clientX);
    setHoverTime(null);
    onSeek(t);
  };

  const handlePointerLeave = () => {
    if (!seeking) setHoverTime(null);
  };

  const hoverPercent =
    hoverTime != null && duration ? (hoverTime / duration) * 100 : null;

  return (
    <div
      ref={barRef}
      className={cn(progressBarVariants(), "h-2 cursor-pointer")}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration || 0}
      aria-valuenow={currentTime}
      tabIndex={0}
    >
      {/* Hover time tooltip (YouTube-like) */}
      {hoverPercent != null && duration > 0 && (
        <div
          className="absolute -top-6 px-2 py-1 rounded bg-black/90 text-white text-[10px] whitespace-nowrap"
          style={{
            left: `${hoverPercent}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          {formatTime(hoverTime!)}
        </div>
      )}

      {/* buffered ranges */}
      {buffered.map((b, i) => {
        const startPct = duration ? (b.start / duration) * 100 : 0;
        const endPct = duration ? (b.end / duration) * 100 : 0;
        const width = Math.max(0, endPct - startPct);
        return (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-white/30 rounded"
            style={{ left: `${startPct}%`, width: `${width}%` }}
          />
        );
      })}

      {/* played */}
      <div
        className="absolute top-0 bottom-0 left-0 bg-red-600 rounded"
        style={{ width: `${percent}%` }}
      />

      {/* handle */}
      <div
        className="absolute w-3 h-3 bg-white rounded-full -translate-y-1/2 top-1/2 shadow-md"
        style={{ left: `${percent}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

export default ProgressBar;
