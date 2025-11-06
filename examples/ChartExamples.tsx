import React from "react";
import {
  ChartContainer,
  ChartWrapper,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "../src/components/Chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const monthlyData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const revenueData = [
  { month: "Jan", revenue: 4000, profit: 2400, expenses: 1600 },
  { month: "Feb", revenue: 3000, profit: 1398, expenses: 1602 },
  { month: "Mar", revenue: 5000, profit: 3800, expenses: 1200 },
  { month: "Apr", revenue: 4500, profit: 3908, expenses: 592 },
  { month: "May", revenue: 6000, profit: 4800, expenses: 1200 },
  { month: "Jun", revenue: 5500, profit: 3800, expenses: 1700 },
];

const browserData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

// Example 1: Simple Bar Chart
export function BarChartExample() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartWrapper
      title="Bar Chart - Interactive"
      description="Showing total visitors for the last 6 months"
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart data={monthlyData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip content={<ChartTooltipContent indicator="line" />} />
          <Legend content={<ChartLegendContent />} />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="mobile"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 2: Stacked Bar Chart
export function StackedBarChartExample() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartWrapper
      title="Stacked Bar Chart"
      description="Desktop and mobile users stacked"
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart data={monthlyData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip content={<ChartTooltipContent indicator="line" />} />
          <Legend content={<ChartLegendContent />} />
          <Bar
            dataKey="desktop"
            stackId="a"
            fill="var(--color-desktop)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="mobile"
            stackId="a"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 3: Line Chart
export function LineChartExample() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartWrapper
      title="Line Chart"
      description="Showing trends over 6 months"
      footer={
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      }
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <LineChart data={monthlyData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
          <Legend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="desktop"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="mobile"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 4: Area Chart
export function AreaChartExample() {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-2))",
    },
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <ChartWrapper
      title="Area Chart - Stacked"
      description="Revenue, profit, and expenses over time"
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <AreaChart data={revenueData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip content={<ChartTooltipContent indicator="line" />} />
          <Legend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="var(--color-revenue)"
            fill="var(--color-revenue)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stackId="1"
            stroke="var(--color-profit)"
            fill="var(--color-profit)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="1"
            stroke="var(--color-expenses)"
            fill="var(--color-expenses)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 5: Pie Chart
export function PieChartExample() {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return browserData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <ChartWrapper
      title="Pie Chart - Browser Usage"
      description="Browser market share breakdown"
      footer={
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total Visitors: {totalVisitors.toLocaleString()}
            </div>
          </div>
        </div>
      }
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <PieChart>
          <Tooltip content={<ChartTooltipContent hideLabel />} />
          <Legend content={<ChartLegendContent nameKey="browser" />} />
          <Pie
            data={browserData}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }: any) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 6: Donut Chart
export function DonutChartExample() {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return browserData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <ChartWrapper
      title="Donut Chart"
      description="Browser usage with center label"
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <PieChart>
          <Tooltip content={<ChartTooltipContent hideLabel />} />
          <Legend content={<ChartLegendContent nameKey="browser" />} />
          <Pie
            data={browserData}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-3xl font-bold"
          >
            {totalVisitors}
          </text>
          <text
            x="50%"
            y="50%"
            dy="1.5em"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            Total Visitors
          </text>
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 7: Mixed Chart Types
export function MixedChartExample() {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartWrapper
      title="Mixed Chart - Line & Bar"
      description="Revenue as bars, profit as line"
    >
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
}

// Example 8: Minimal Chart (No wrapper)
export function MinimalChartExample() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={monthlyData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

// Main demo component
export function ChartExamples() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Chart Examples</h1>
        <p className="text-muted-foreground">
          Shadcn-style charts built with Recharts
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <BarChartExample />
        <StackedBarChartExample />
        <LineChartExample />
        <AreaChartExample />
        <PieChartExample />
        <DonutChartExample />
        <MixedChartExample />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Minimal Chart</h2>
        <MinimalChartExample />
      </div>
    </div>
  );
}

export default ChartExamples;
