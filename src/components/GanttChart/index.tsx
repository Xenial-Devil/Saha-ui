"use client";

import { forwardRef, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { GanttChartProps } from "./GanttChart.types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * GanttChart Component
 *
 * Renders a task schedule timeline using Recharts' BarChart.
 * 
 * @example
 * ```tsx
 * const tasks = [
 *   { id: "1", name: "Design", startDate: new Date("2023-01-01"), endDate: new Date("2023-01-10") }
 * ];
 * <GanttChart tasks={tasks} />
 * ```
 */
export const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>(
  (
    {
      tasks,
      startDate,
      endDate,
      height = 400,
      rowHeight = 40,
      className,
      ...props
    },
    ref
  ) => {

    const chartData = useMemo(() => {
      // Find absolute min and max if not provided
      let minTime = startDate?.getTime() || Infinity;
      let maxTime = endDate?.getTime() || 0;

      if (!startDate || !endDate) {
        tasks.forEach(t => {
          if (!startDate) minTime = Math.min(minTime, t.startDate.getTime());
          if (!endDate) maxTime = Math.max(maxTime, t.endDate.getTime());
        });
      }

      // Add a 5% margin
      const range = maxTime - minTime;
      const margin = range * 0.05;
      const finalMin = minTime - margin;
      const finalMax = maxTime + margin;

      return {
        data: tasks.map(t => ({
          id: t.id,
          name: t.name,
          // Recharts expects array for range bar: [start, end]
          timeRange: [t.startDate.getTime(), t.endDate.getTime()],
          color: t.color || "hsl(var(--primary))",
          progress: t.progress || 0,
        })),
        domain: [finalMin, finalMax] as [number, number]
      };
    }, [tasks, startDate, endDate]);

    const formatXAxis = (tickItem: number) => {
      const date = new Date(tickItem);
      // Format as "Jan 1"
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    };

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        const item = payload[0].payload;
        const start = new Date(item.timeRange[0]).toLocaleDateString();
        const end = new Date(item.timeRange[1]).toLocaleDateString();

        return (
          <div className="bg-popover text-popover-foreground border border-border/50 p-3 rounded-lg shadow-xl">
            <p className="font-semibold text-sm mb-1">{item.name}</p>
            <p className="text-xs text-muted-foreground">Start: {start}</p>
            <p className="text-xs text-muted-foreground">End: {end}</p>
            {item.progress > 0 && <p className="text-xs text-muted-foreground">Progress: {item.progress}%</p>}
          </div>
        );
      }
      return null;
    };

    return (
      <div 
        ref={ref} 
        className={cn("w-full bg-card border border-border/50 rounded-xl p-4 shadow-sm", className)} 
        style={{ height }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData.data}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="currentColor" className="opacity-10 dark:opacity-20" />
            <XAxis 
              type="number" 
              domain={chartData.domain} 
              tickFormatter={formatXAxis}
              orientation="top"
              stroke="currentColor" 
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="currentColor" 
              className="text-xs font-medium text-foreground"
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            
            <Bar 
              dataKey="timeRange" 
              // we can customize each bar render by using cell, but a simple fill works if colors are static.
              // We could use `payload.color` if we mapped it, but let's use a standard primary fill for simplicity
              fill="hsl(var(--primary))" 
              radius={[4, 4, 4, 4]} 
              barSize={rowHeight * 0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

GanttChart.displayName = "GanttChart";

export default GanttChart;
