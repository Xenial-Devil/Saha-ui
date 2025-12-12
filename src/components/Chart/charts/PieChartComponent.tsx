"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { ChartTooltipContent } from "../components/ChartTooltip";
import { useChartColors } from "../../../hooks/useChartColors";
import type { BaseChartComponentProps, PieSeriesConfig } from "../Chart.types";

export function PieChartComponent({
  config,
  variant,
  size,
  hiddenSeries,
}: BaseChartComponentProps) {
  const { getColor } = useChartColors(variant);

  const series = config.series[0] as PieSeriesConfig;
  const visibleData = config.data.filter(
    (item) => !hiddenSeries.has(item[series.dataKey] as string)
  );

  const heightMap = {
    xs: 200,
    sm: 250,
    md: 350,
    lg: 450,
    xl: 550,
    "2xl": 650,
    "3xl": 750,
    "4xl": 850,
  };

  // Calculate total for percentage labels
  const total = visibleData.reduce(
    (sum, item) => sum + (item[series.dataKey] as number),
    0
  );

  // Custom label render function for data labels (percentage inside slices)
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is greater than 5%
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm drop-shadow-lg"
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom outer label for names
  const renderOuterLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    payload,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is greater than 3%
    if (percent < 0.03) return null;

    const name = payload[config.xAxis?.dataKey || "name"];

    return (
      <text
        x={x}
        y={y}
        fill="currentColor"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium opacity-80"
      >
        {name}
      </text>
    );
  };

  // Determine if this is a donut chart
  const isDonut = series.innerRadius && series.innerRadius > 0;

  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <PieChart>
        {config.tooltip?.show !== false && (
          <Tooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
        )}

        <Pie
          data={visibleData}
          dataKey={series.dataKey}
          nameKey={config.xAxis?.dataKey || "name"}
          cx="50%"
          cy="50%"
          innerRadius={series.innerRadius || 0}
          outerRadius={series.outerRadius || "70%"}
          paddingAngle={series.paddingAngle || 2}
          startAngle={series.startAngle || 90}
          endAngle={series.endAngle || 450}
          label={
            config.legend?.show === false ? renderOuterLabel : renderCustomLabel
          }
          labelLine={
            config.legend?.show === false
              ? {
                  stroke: "currentColor",
                  strokeWidth: 1,
                  strokeOpacity: 0.3,
                }
              : false
          }
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {visibleData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={series.color || getColor(index)}
              stroke="var(--background)"
              strokeWidth={2}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            />
          ))}

          {/* Center label for donut charts */}
          {isDonut && (
            <Label
              value="Total"
              position="center"
              className="text-sm font-semibold fill-current opacity-60"
              dy={-10}
            />
          )}
          {isDonut && (
            <Label
              value={total.toLocaleString()}
              position="center"
              className="text-2xl font-bold fill-current"
              dy={15}
            />
          )}
        </Pie>

        {config.legend?.show !== false && (
          <Legend
            verticalAlign={
              (config.legend?.position === "top" ||
              config.legend?.position === "bottom"
                ? config.legend.position
                : "bottom") as "top" | "bottom"
            }
            align="center"
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
            }}
            formatter={(value) => {
              const item = visibleData.find(
                (d) => d[config.xAxis?.dataKey || "name"] === value
              );
              if (item) {
                const percentage =
                  ((item[series.dataKey] as number) / total) * 100;
                return `${value} (${percentage.toFixed(1)}%)`;
              }
              return value;
            }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
