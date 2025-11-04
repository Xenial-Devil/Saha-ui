import { Chart } from "../components/Chart";

/**
 * Chart Component Examples
 *
 * Demonstrates the Recharts-based Chart component with Saha UI styling.
 * Uses a config-based API for maximum flexibility and customization.
 */

export default function ChartExamples() {
  // Sample data for single-series charts
  const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 190 },
    { month: "Mar", sales: 150 },
    { month: "Apr", sales: 220 },
    { month: "May", sales: 280 },
    { month: "Jun", sales: 250 },
  ];

  const revenueData = [
    { quarter: "Q1", revenue: 45000 },
    { quarter: "Q2", revenue: 62000 },
    { quarter: "Q3", revenue: 58000 },
    { quarter: "Q4", revenue: 75000 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35 },
    { name: "Clothing", value: 25 },
    { name: "Food", value: 20 },
    { name: "Books", value: 15 },
    { name: "Others", value: 5 },
  ];

  // Multi-series data
  const weeklyData = [
    { day: "Mon", revenue: 12000, expenses: 8000 },
    { day: "Tue", revenue: 19000, expenses: 12000 },
    { day: "Wed", revenue: 15000, expenses: 10000 },
    { day: "Thu", revenue: 22000, expenses: 15000 },
    { day: "Fri", revenue: 28000, expenses: 18000 },
    { day: "Sat", revenue: 25000, expenses: 16000 },
    { day: "Sun", revenue: 30000, expenses: 19000 },
  ];

  const performanceData = [
    { metric: "Speed", value: 85 },
    { metric: "Quality", value: 92 },
    { metric: "Cost", value: 78 },
    { metric: "Reliability", value: 88 },
    { metric: "Innovation", value: 95 },
  ];

  // Sample data with multiple metrics
  const monthlyMetrics = [
    { month: "Jan", sales: 4000, revenue: 2400, profit: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398, profit: 2210 },
    { month: "Mar", sales: 2000, revenue: 9800, profit: 2290 },
    { month: "Apr", sales: 2780, revenue: 3908, profit: 2000 },
    { month: "May", sales: 1890, revenue: 4800, profit: 2181 },
    { month: "Jun", sales: 2390, revenue: 3800, profit: 2500 },
  ];

  return (
    <div className="space-y-12 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Chart Component Examples</h1>
        <p className="text-muted-foreground">
          Comprehensive examples showcasing all chart types using the
          config-based API
        </p>
      </div>

      {/* ========== LINE CHARTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Line Charts</h2>
          <p className="text-muted-foreground">
            Single and multi-series line charts with various customizations
          </p>
        </div>

        {/* Basic Line Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Line Chart</h3>
          <Chart
            type="line"
            config={{
              data: salesData,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [
                {
                  dataKey: "sales",
                  name: "Sales",
                  type: "monotone",
                  strokeWidth: 2,
                },
              ],
              legend: { show: false },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Monthly Sales"
            description="Sales performance over the last 6 months"
            variant="default"
            size="md"
          />
        </div>

        {/* Multi-Series Line Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Multi-Series Line Chart</h3>
          <Chart
            type="line"
            config={{
              data: weeklyData,
              xAxis: { dataKey: "day" },
              yAxis: {},
              series: [
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  type: "monotone",
                  strokeWidth: 2,
                  color: "#10b981",
                },
                {
                  dataKey: "expenses",
                  name: "Expenses",
                  type: "monotone",
                  strokeWidth: 2,
                  color: "#ef4444",
                },
              ],
              legend: { show: true, position: "top" },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Weekly Revenue vs Expenses"
            description="Financial comparison for the week"
            variant="primary"
            size="lg"
          />
        </div>

        {/* Line Chart with Dots */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Line Chart with Data Points</h3>
          <Chart
            type="line"
            config={{
              data: revenueData,
              xAxis: { dataKey: "quarter" },
              yAxis: {},
              series: [
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  type: "monotone",
                  strokeWidth: 3,
                  dot: true,
                  activeDot: { r: 6 },
                  color: "#6366f1",
                },
              ],
              legend: { show: false },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Quarterly Revenue"
            variant="accent"
            size="md"
          />
        </div>
      </section>

      {/* ========== BAR CHARTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Bar Charts</h2>
          <p className="text-muted-foreground">
            Vertical and horizontal bars with stacking support
          </p>
        </div>

        {/* Basic Bar Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Bar Chart</h3>
          <Chart
            type="bar"
            config={{
              data: salesData,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [
                {
                  dataKey: "sales",
                  name: "Sales",
                  radius: [8, 8, 0, 0],
                  color: "#10b981",
                },
              ],
              legend: { show: false },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Monthly Sales"
            variant="success"
            size="md"
          />
        </div>

        {/* Stacked Bar Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Stacked Bar Chart</h3>
          <Chart
            type="bar"
            config={{
              data: weeklyData,
              xAxis: { dataKey: "day" },
              yAxis: {},
              series: [
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  stackId: "a",
                  color: "#10b981",
                },
                {
                  dataKey: "expenses",
                  name: "Expenses",
                  stackId: "a",
                  color: "#ef4444",
                },
              ],
              legend: { show: true, position: "bottom" },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Weekly Financial Summary (Stacked)"
            variant="secondary"
            size="lg"
          />
        </div>

        {/* Grouped Bar Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Grouped Bar Chart</h3>
          <Chart
            type="bar"
            config={{
              data: monthlyMetrics,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [
                {
                  dataKey: "sales",
                  name: "Sales",
                  color: "#3b82f6",
                },
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  color: "#10b981",
                },
                {
                  dataKey: "profit",
                  name: "Profit",
                  color: "#f59e0b",
                },
              ],
              legend: { show: true, position: "top" },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Monthly Metrics Comparison"
            variant="default"
            size="lg"
          />
        </div>
      </section>

      {/* ========== AREA CHARTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Area Charts</h2>
          <p className="text-muted-foreground">
            Filled area charts for trend visualization
          </p>
        </div>

        {/* Basic Area Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Area Chart</h3>
          <Chart
            type="area"
            config={{
              data: salesData,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [
                {
                  dataKey: "sales",
                  name: "Sales",
                  type: "monotone",
                  fillOpacity: 0.6,
                  strokeWidth: 2,
                  color: "#a78bfa",
                },
              ],
              legend: { show: false },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Sales Trend"
            variant="accent"
            size="md"
          />
        </div>

        {/* Stacked Area Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Stacked Area Chart</h3>
          <Chart
            type="area"
            config={{
              data: weeklyData,
              xAxis: { dataKey: "day" },
              yAxis: {},
              series: [
                {
                  dataKey: "revenue",
                  name: "Revenue",
                  type: "monotone",
                  fillOpacity: 0.5,
                  stackId: "1",
                  color: "#10b981",
                },
                {
                  dataKey: "expenses",
                  name: "Expenses",
                  type: "monotone",
                  fillOpacity: 0.5,
                  stackId: "1",
                  color: "#ef4444",
                },
              ],
              legend: { show: true, position: "bottom" },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Cumulative Financial Data"
            variant="primary"
            size="lg"
          />
        </div>
      </section>

      {/* ========== PIE & DONUT CHARTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Pie & Donut Charts</h2>
          <p className="text-muted-foreground">
            Circular charts for part-to-whole relationships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Pie Chart</h3>
            <Chart
              type="pie"
              config={{
                data: categoryData,
                series: [
                  {
                    dataKey: "value",
                    name: "Category",
                    outerRadius: 80,
                    labelLine: false,
                  },
                ],
                legend: { show: true, position: "right" },
                tooltip: { show: true },
              }}
              title="Sales by Category"
              variant="default"
              size="md"
            />
          </div>

          {/* Donut Chart */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Donut Chart</h3>
            <Chart
              type="donut"
              config={{
                data: categoryData,
                series: [
                  {
                    dataKey: "value",
                    name: "Category",
                    innerRadius: 60,
                    outerRadius: 80,
                    paddingAngle: 2,
                  },
                ],
                legend: { show: true, position: "bottom" },
                tooltip: { show: true },
              }}
              title="Category Distribution"
              variant="glass"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* ========== RADAR CHARTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Radar Charts</h2>
          <p className="text-muted-foreground">
            Multi-dimensional data visualization
          </p>
        </div>

        {/* Basic Radar Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Performance Radar</h3>
          <Chart
            type="radar"
            config={{
              data: performanceData,
              series: [
                {
                  dataKey: "value",
                  name: "Performance",
                  fillOpacity: 0.6,
                  strokeWidth: 2,
                  color: "#f59e0b",
                },
              ],
              legend: { show: false },
              tooltip: { show: true },
              grid: { show: true },
            }}
            title="Performance Metrics"
            variant="warning"
            size="lg"
          />
        </div>
      </section>

      {/* ========== SIZE VARIANTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Size Variants</h2>
          <p className="text-muted-foreground">
            Available sizes: sm, md, lg, xl
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="bar"
            config={{
              data: salesData.slice(0, 4),
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [{ dataKey: "sales", name: "Sales" }],
              legend: { show: false },
            }}
            title="Small Chart"
            variant="primary"
            size="sm"
          />
          <Chart
            type="bar"
            config={{
              data: salesData.slice(0, 4),
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [{ dataKey: "sales", name: "Sales" }],
              legend: { show: false },
            }}
            title="Medium Chart"
            variant="success"
            size="md"
          />
        </div>

        <Chart
          type="line"
          config={{
            data: salesData,
            xAxis: { dataKey: "month" },
            yAxis: {},
            series: [{ dataKey: "sales", name: "Sales", type: "monotone" }],
            legend: { show: false },
            grid: { show: true },
          }}
          title="Large Chart"
          variant="accent"
          size="lg"
        />

        <Chart
          type="area"
          config={{
            data: salesData,
            xAxis: { dataKey: "month" },
            yAxis: {},
            series: [
              {
                dataKey: "sales",
                name: "Sales",
                type: "monotone",
                fillOpacity: 0.6,
              },
            ],
            legend: { show: false },
            grid: { show: true },
          }}
          title="Extra Large Chart"
          variant="warning"
          size="xl"
        />
      </section>

      {/* ========== VISUAL VARIANTS ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Visual Variants</h2>
          <p className="text-muted-foreground">
            Different color schemes and visual styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "default",
            "primary",
            "secondary",
            "accent",
            "success",
            "warning",
            "error",
            "info",
            "outline",
            "ghost",
            "glass",
          ].map((variant) => (
            <Chart
              key={variant}
              type="bar"
              config={{
                data: salesData.slice(0, 4),
                xAxis: { dataKey: "month" },
                yAxis: {},
                series: [{ dataKey: "sales", name: "Sales" }],
                legend: { show: false },
              }}
              title={variant.charAt(0).toUpperCase() + variant.slice(1)}
              variant={variant as any}
              size="sm"
            />
          ))}
        </div>
      </section>

      {/* ========== LOADING AND EMPTY STATES ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">States</h2>
          <p className="text-muted-foreground">Loading state handling</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            config={{
              data: salesData,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [{ dataKey: "sales", name: "Sales" }],
            }}
            title="Normal State"
            variant="default"
            size="md"
          />
          <Chart
            type="bar"
            config={{
              data: salesData,
              xAxis: { dataKey: "month" },
              yAxis: {},
              series: [{ dataKey: "sales", name: "Sales" }],
            }}
            title="Loading State"
            variant="default"
            size="md"
            loading={true}
          />
        </div>
      </section>

      {/* ========== USAGE GUIDE ========== */}
      <section className="space-y-4 bg-muted/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Quick Usage Guide</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Config-Based API</h3>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto text-sm">
              <code>{`import { Chart } from '@/components/Chart';

<Chart
  type="line"
  config={{
    data: [
      { month: 'Jan', sales: 120 },
      { month: 'Feb', sales: 190 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: {},
    series: [
      {
        dataKey: 'sales',
        name: 'Sales',
        type: 'monotone',
        strokeWidth: 2,
      },
    ],
    legend: { show: true, position: 'top' },
    tooltip: { show: true },
    grid: { show: true },
  }}
  title="Monthly Sales"
  variant="primary"
  size="md"
/>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Multi-Series Example</h3>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto text-sm">
              <code>{`<Chart
  type="line"
  config={{
    data: weeklyData,
    xAxis: { dataKey: 'day' },
    yAxis: {},
    series: [
      {
        dataKey: 'revenue',
        name: 'Revenue',
        type: 'monotone',
        color: '#10b981',
      },
      {
        dataKey: 'expenses',
        name: 'Expenses',
        type: 'monotone',
        color: '#ef4444',
      },
    ],
    legend: { show: true, position: 'bottom' },
  }}
  title="Revenue vs Expenses"
  variant="default"
/>`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
