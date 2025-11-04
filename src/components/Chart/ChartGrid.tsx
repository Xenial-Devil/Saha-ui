import React from "react";

export interface ChartGridProps {
  width: number;
  height: number;
  xLines?: number;
  yLines?: number;
  color?: string;
  strokeWidth?: number;
}

const ChartGrid: React.FC<ChartGridProps> = ({
  width,
  height,
  xLines = 5,
  yLines = 5,
  color = "hsl(var(--border))",
  strokeWidth = 1,
}) => {
  const horizontalLines = Array.from({ length: yLines + 1 }, (_, i) => i);
  const verticalLines = Array.from({ length: xLines + 1 }, (_, i) => i);

  return (
    <svg
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Horizontal lines */}
      {horizontalLines.map((i) => {
        const y = (height / yLines) * i;
        return (
          <line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={0.2}
          />
        );
      })}

      {/* Vertical lines */}
      {verticalLines.map((i) => {
        const x = (width / xLines) * i;
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={0.2}
          />
        );
      })}
    </svg>
  );
};

ChartGrid.displayName = "ChartGrid";

export default ChartGrid;
