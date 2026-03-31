import React from "react";

export interface GanttTask {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress?: number;
  dependencies?: string[];
  color?: string;
}

export interface GanttChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The list of tasks to render on the Gantt Chart
   */
  tasks: GanttTask[];

  /**
   * Chart view range start
   */
  startDate?: Date;

  /**
   * Chart view range end
   */
  endDate?: Date;

  /**
   * Height of the chart container
   * @default 400
   */
  height?: number | string;

  /**
   * Defines how many rows the chart shows
   * @default "auto"
   */
  rowHeight?: number;
}
