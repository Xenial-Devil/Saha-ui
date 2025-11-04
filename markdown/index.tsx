// src/components/Chart/index.tsx
import * as React from "react";
import {
  chartVariants,
  chartTitleVariants,
  chartDescriptionVariants,
  chartCanvasVariants,
  legendVariants,
  legendItemVariants,
  tooltipVariants,
} from "../src/components/Chart/Chart.styles";
import type {
  ChartProps,
  ChartDataPoint,
} from "../src/components/Chart/Chart.types";
import { cn } from "../src/lib/utils";

interface LegendItem {
  label: string;
  value: string;
  color: string;
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      type = "line",
      data,
      variant = "default",
      size = "md",
      title,
      description,
      showLegend = true,
      showGrid = true,
      showTooltip = true,
      showAnimation = true,
      legend,
      legendPosition = "bottom",
      colors,
      height,
      width,
      className,
      onDataPointClick,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [tooltip, setTooltip] = React.useState<{
      visible: boolean;
      x: number;
      y: number;
      content: string;
    }>({ visible: false, x: 0, y: 0, content: "" });

    const [hiddenSeries, setHiddenSeries] = React.useState<Set<string>>(
      new Set()
    );

    // Default colors based on theme
    const defaultColors = React.useMemo(
      () =>
        colors || [
          "hsl(var(--primary))",
          "hsl(var(--secondary))",
          "hsl(var(--accent))",
          "hsl(var(--success))",
          "hsl(var(--warning))",
          "hsl(var(--destructive))",
          "hsl(var(--info))",
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
        ],
      [colors]
    );

    // Generate legend items from data
    const legendItems = React.useMemo<LegendItem[]>(() => {
      if (legend) return legend as LegendItem[];

      const items: LegendItem[] = [];
      const seriesNames = new Set<string>();

      if (data) {
        data.forEach((point) => {
          if (point.series && !seriesNames.has(point.series)) {
            seriesNames.add(point.series);
            const index = items.length;
            items.push({
              label: point.series,
              color: defaultColors[index % defaultColors.length],
              value: point.series,
            });
          }
        });

        if (items.length === 0 && data.length > 0) {
          items.push({
            label: "Data",
            color: defaultColors[0],
            value: "default",
          });
        }
      }

      return items;
    }, [data, legend, defaultColors]);

    // Toggle series visibility
    const handleLegendClick = (value: string) => {
      setHiddenSeries((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          next.add(value);
        }
        return next;
      });
    };

    // Draw chart on canvas
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Filter visible data
      const visibleData = (data || []).filter(
        (point) => !point.series || !hiddenSeries.has(point.series)
      );

      if (visibleData.length === 0) return;

      // Calculate bounds
      const padding = 40;
      const chartWidth = rect.width - padding * 2;
      const chartHeight = rect.height - padding * 2;

      const values = visibleData.map((d) => d.value);
      const minValue = Math.min(...values, 0);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue || 1;

      // Draw grid
      if (showGrid) {
        ctx.strokeStyle = "rgba(128, 128, 128, 0.1)";
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(rect.width - padding, y);
          ctx.stroke();
        }

        // Vertical grid lines
        const step = Math.max(1, Math.floor(visibleData.length / 10));
        for (let i = 0; i < visibleData.length; i += step) {
          const x = padding + (chartWidth / (visibleData.length - 1 || 1)) * i;
          ctx.beginPath();
          ctx.moveTo(x, padding);
          ctx.lineTo(x, rect.height - padding);
          ctx.stroke();
        }
      }

      // Draw based on chart type
      if (type === "line") {
        drawLineChart(
          ctx,
          visibleData,
          padding,
          chartWidth,
          chartHeight,
          minValue,
          valueRange,
          defaultColors,
          showAnimation
        );
      } else if (type === "bar") {
        drawBarChart(
          ctx,
          visibleData,
          padding,
          chartWidth,
          chartHeight,
          minValue,
          valueRange,
          defaultColors,
          showAnimation
        );
      } else if (type === "area") {
        drawAreaChart(
          ctx,
          visibleData,
          padding,
          chartWidth,
          chartHeight,
          minValue,
          valueRange,
          defaultColors,
          showAnimation
        );
      } else if (type === "pie") {
        drawPieChart(
          ctx,
          visibleData,
          rect.width / 2,
          rect.height / 2,
          Math.min(chartWidth, chartHeight) / 2 - 20,
          defaultColors,
          showAnimation
        );
      } else if (type === "donut") {
        drawDonutChart(
          ctx,
          visibleData,
          rect.width / 2,
          rect.height / 2,
          Math.min(chartWidth, chartHeight) / 2 - 20,
          defaultColors,
          showAnimation
        );
      }
    }, [data, type, defaultColors, hiddenSeries, showGrid, showAnimation]);

    // Handle mouse move for tooltip
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!showTooltip) return;

      const canvas = canvasRef.current;
      if (!canvas || !data) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const padding = 40;
      const chartWidth = rect.width - padding * 2;
      const pointWidth = chartWidth / (data.length - 1 || 1);

      const index = Math.round((x - padding) / pointWidth);
      if (index >= 0 && index < data.length) {
        const point = data[index];
        setTooltip({
          visible: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          content: `${point.label || ""}: ${point.value}`,
        });
      } else {
        setTooltip({ ...tooltip, visible: false });
      }
    };

    const handleMouseLeave = () => {
      setTooltip({ ...tooltip, visible: false });
    };

    return (
      <div
        ref={ref}
        className={cn(chartVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className={chartTitleVariants({ size })}>{title}</h3>}
            {description && (
              <p className={chartDescriptionVariants({ size })}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Chart Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className={cn(chartCanvasVariants({ size }), "w-full")}
            style={{ height: height, width: width }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />

          {/* Tooltip */}
          {showTooltip && (
            <div
              className={tooltipVariants({ visible: tooltip.visible })}
              style={{
                left: tooltip.x + 10,
                top: tooltip.y - 10,
              }}
            >
              {tooltip.content}
            </div>
          )}
        </div>

        {/* Legend */}
        {showLegend && legendItems.length > 0 && (
          <div className={legendVariants({ position: legendPosition })}>
            {legendItems.map((item) => (
              <button
                key={item.value}
                type="button"
                className={legendItemVariants({
                  disabled: hiddenSeries.has(item.value),
                })}
                onClick={() => handleLegendClick(item.value)}
              >
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Chart.displayName = "Chart";

// Helper drawing functions
function drawLineChart(
  ctx: CanvasRenderingContext2D,
  data: ChartDataPoint[],
  padding: number,
  chartWidth: number,
  chartHeight: number,
  minValue: number,
  valueRange: number,
  colors: string[],
  animated: boolean
) {
  const seriesMap = new Map<string, ChartDataPoint[]>();

  data.forEach((point) => {
    const key = point.series || "default";
    if (!seriesMap.has(key)) {
      seriesMap.set(key, []);
    }
    seriesMap.get(key)!.push(point);
  });

  Array.from(seriesMap.entries()).forEach(([series, points], index) => {
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 2;
    ctx.beginPath();

    points.forEach((point, i) => {
      const x = padding + (chartWidth / (points.length - 1 || 1)) * i;
      const y =
        padding +
        chartHeight -
        ((point.value - minValue) / valueRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = colors[index % colors.length];
    points.forEach((point, i) => {
      const x = padding + (chartWidth / (points.length - 1 || 1)) * i;
      const y =
        padding +
        chartHeight -
        ((point.value - minValue) / valueRange) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: ChartDataPoint[],
  padding: number,
  chartWidth: number,
  chartHeight: number,
  minValue: number,
  valueRange: number,
  colors: string[],
  animated: boolean
) {
  const barWidth = chartWidth / data.length - 10;

  data.forEach((point, i) => {
    const x = padding + (chartWidth / data.length) * i + 5;
    const barHeight = ((point.value - minValue) / valueRange) * chartHeight;
    const y = padding + chartHeight - barHeight;

    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, y, barWidth, barHeight);
  });
}

function drawAreaChart(
  ctx: CanvasRenderingContext2D,
  data: ChartDataPoint[],
  padding: number,
  chartWidth: number,
  chartHeight: number,
  minValue: number,
  valueRange: number,
  colors: string[],
  animated: boolean
) {
  ctx.fillStyle = colors[0].replace(")", ", 0.3)").replace("hsl", "hsla");
  ctx.beginPath();

  data.forEach((point, i) => {
    const x = padding + (chartWidth / (data.length - 1 || 1)) * i;
    const y =
      padding +
      chartHeight -
      ((point.value - minValue) / valueRange) * chartHeight;

    if (i === 0) {
      ctx.moveTo(x, padding + chartHeight);
      ctx.lineTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.lineTo(padding + chartWidth, padding + chartHeight);
  ctx.closePath();
  ctx.fill();

  // Draw line on top
  drawLineChart(
    ctx,
    data,
    padding,
    chartWidth,
    chartHeight,
    minValue,
    valueRange,
    colors,
    animated
  );
}

function drawPieChart(
  ctx: CanvasRenderingContext2D,
  data: ChartDataPoint[],
  centerX: number,
  centerY: number,
  radius: number,
  colors: string[],
  animated: boolean
) {
  const total = data.reduce((sum, point) => sum + point.value, 0);
  let currentAngle = -Math.PI / 2;

  data.forEach((point, i) => {
    const sliceAngle = (point.value / total) * Math.PI * 2;

    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    currentAngle += sliceAngle;
  });
}

function drawDonutChart(
  ctx: CanvasRenderingContext2D,
  data: ChartDataPoint[],
  centerX: number,
  centerY: number,
  radius: number,
  colors: string[],
  animated: boolean
) {
  drawPieChart(ctx, data, centerX, centerY, radius, colors, animated);

  // Draw inner circle
  ctx.fillStyle = "hsl(var(--background))";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
  ctx.fill();
}

// Export sub-components
import ChartTitle from "../src/components/Chart/ChartTitle";
import ChartLegend from "../src/components/Chart/ChartLegend";
import ChartTooltip from "../src/components/Chart/ChartTooltip";
import ChartGrid from "../src/components/Chart/ChartGrid";

const ChartNamespace = Object.assign(Chart, {
  Title: ChartTitle,
  Legend: ChartLegend,
  Tooltip: ChartTooltip,
  Grid: ChartGrid,
});

export default ChartNamespace;
