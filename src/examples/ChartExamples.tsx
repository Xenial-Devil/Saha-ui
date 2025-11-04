import Chart from "../../markdown";

/**
 * Chart Component Examples
 *
 * This file demonstrates both API formats:
 * 1. Compact props-based API (simple and direct)
 * 2. Component API (flexible and composable)
 */

export default function ChartExamples() {
  // Sample data
  const salesData = [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 190 },
    { label: "Mar", value: 150 },
    { label: "Apr", value: 220 },
    { label: "May", value: 280 },
    { label: "Jun", value: 250 },
  ];

  const revenueData = [
    { label: "Q1", value: 45000 },
    { label: "Q2", value: 62000 },
    { label: "Q3", value: 58000 },
    { label: "Q4", value: 75000 },
  ];

  const categoryData = [
    { label: "Electronics", value: 35, color: "#3b82f6" },
    { label: "Clothing", value: 25, color: "#10b981" },
    { label: "Food", value: 20, color: "#f59e0b" },
    { label: "Books", value: 15, color: "#8b5cf6" },
    { label: "Others", value: 5, color: "#6b7280" },
  ];

  const multiSeriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 22000, 28000, 25000, 30000],
        color: "#3b82f6",
      },
      {
        label: "Expenses",
        data: [8000, 12000, 10000, 15000, 18000, 16000, 19000],
        color: "#ef4444",
      },
    ],
  };

  return (
    <div className="space-y-12 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Chart Component Examples</h1>
        <p className="text-muted-foreground">
          Comprehensive examples showcasing all chart types, features, and API
          formats
        </p>
      </div>

      {/* ========== COMPACT PROPS-BASED API ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Compact Props-Based API</h2>
          <p className="text-muted-foreground">
            Simple and direct approach - perfect for quick implementations
          </p>
        </div>

        {/* Line Chart - Basic */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Line Chart - Basic</h3>
          <Chart
            type="line"
            data={salesData}
            title="Monthly Sales"
            description="Sales performance over the last 6 months"
            variant="default"
            size="md"
            showLegend={false}
            showGrid={true}
            showTooltip={true}
            showAnimation={true}
          />
        </div>

        {/* Line Chart - Primary Variant with Glow */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Line Chart - Primary with Glow
          </h3>
          <Chart
            type="line"
            data={salesData}
            title="Sales Trend"
            variant="primary"
            size="lg"
            glow={true}
            smooth={true}
            colors={["#3b82f6", "#2563eb", "#1d4ed8"]}
          />
        </div>

        {/* Bar Chart - Success Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Bar Chart - Success Variant</h3>
          <Chart
            type="bar"
            data={revenueData}
            title="Quarterly Revenue"
            description="Revenue breakdown by quarter"
            variant="success"
            size="md"
            colors={["#10b981", "#059669", "#047857"]}
            showLabels={true}
          />
        </div>

        {/* Area Chart - Accent Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Area Chart - Accent Variant</h3>
          <Chart
            type="area"
            data={salesData}
            title="Sales Area"
            variant="accent"
            size="lg"
            smooth={true}
            glow={true}
          />
        </div>

        {/* Pie Chart - Default */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Pie Chart - Category Distribution
          </h3>
          <Chart
            type="pie"
            data={categoryData}
            title="Sales by Category"
            description="Product category distribution"
            variant="default"
            size="md"
            showLegend={true}
            legendPosition="right"
          />
        </div>

        {/* Donut Chart - Glass Effect */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Donut Chart - Glass Effect</h3>
          <Chart
            type="donut"
            data={categoryData}
            title="Category Breakdown"
            variant="glass"
            size="lg"
            showLegend={true}
            legendPosition="bottom"
          />
        </div>

        {/* Radar Chart - Warning Variant */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Radar Chart - Performance Metrics
          </h3>
          <Chart
            type="radar"
            data={[
              { label: "Speed", value: 85 },
              { label: "Quality", value: 92 },
              { label: "Cost", value: 78 },
              { label: "Reliability", value: 88 },
              { label: "Innovation", value: 95 },
            ]}
            title="Performance Metrics"
            variant="warning"
            size="md"
            showGrid={true}
          />
        </div>

        {/* Multi-Series Line Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Multi-Series Line Chart</h3>
          <Chart
            type="line"
            labels={multiSeriesData.labels}
            datasets={multiSeriesData.datasets}
            title="Revenue vs Expenses"
            description="Weekly comparison"
            variant="default"
            size="lg"
            showLegend={true}
            legendPosition="top"
            smooth={true}
          />
        </div>

        {/* Stacked Bar Chart */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Stacked Bar Chart</h3>
          <Chart
            type="bar"
            labels={multiSeriesData.labels}
            datasets={multiSeriesData.datasets}
            title="Weekly Financial Summary"
            variant="secondary"
            size="md"
            stacked={true}
            showLegend={true}
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
            data={salesData.slice(0, 4)}
            title="Small Chart"
            variant="primary"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Medium Chart"
            variant="success"
            size="md"
          />
        </div>

        <Chart
          type="line"
          data={salesData}
          title="Large Chart"
          variant="accent"
          size="lg"
          smooth={true}
        />

        <Chart
          type="area"
          data={salesData}
          title="Extra Large Chart"
          variant="warning"
          size="xl"
          smooth={true}
          glow={true}
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
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Default"
            variant="default"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Primary"
            variant="primary"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Secondary"
            variant="secondary"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Accent"
            variant="accent"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Success"
            variant="success"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Warning"
            variant="warning"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Error"
            variant="error"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Info"
            variant="info"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Outline"
            variant="outline"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Ghost"
            variant="ghost"
            size="sm"
          />
          <Chart
            type="bar"
            data={salesData.slice(0, 4)}
            title="Glass"
            variant="glass"
            size="sm"
          />
        </div>
      </section>

      {/* ========== COMPONENT API FORMAT ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Component API Format</h2>
          <p className="text-muted-foreground">
            Flexible composable approach with sub-components
          </p>
        </div>

        {/* Custom Title and Legend */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Custom Title and Legend</h3>
          <div className="relative bg-card border border-border rounded-lg p-6 space-y-4">
            <Chart.Title size="lg" align="center">
              Custom Sales Dashboard
            </Chart.Title>
            <Chart
              type="line"
              data={salesData}
              variant="primary"
              size="md"
              showLegend={false}
              smooth={true}
            />
            <Chart.Legend
              items={[
                { label: "Sales", color: "#3b82f6" },
                { label: "Target", color: "#10b981" },
              ]}
              position="bottom"
              size="md"
            />
          </div>
        </div>

        {/* Custom Grid Overlay */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Custom Grid Overlay</h3>
          <div className="relative bg-card border border-border rounded-lg p-6">
            <Chart.Title size="md" align="left">
              Revenue with Custom Grid
            </Chart.Title>
            <div className="relative mt-4">
              <Chart.Grid
                width={800}
                height={300}
                xLines={6}
                yLines={5}
                color="hsl(var(--primary))"
                strokeWidth={1}
              />
              <Chart
                type="area"
                data={revenueData}
                variant="ghost"
                size="md"
                showGrid={false}
                smooth={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADVANCED FEATURES ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Advanced Features</h2>
          <p className="text-muted-foreground">
            Smooth curves, glow effects, custom colors, and more
          </p>
        </div>

        {/* Smooth Curves */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Smooth Curves</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Without Smooth
              </p>
              <Chart
                type="line"
                data={salesData}
                title="Regular Lines"
                variant="primary"
                size="sm"
                smooth={false}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">With Smooth</p>
              <Chart
                type="line"
                data={salesData}
                title="Smooth Curves"
                variant="primary"
                size="sm"
                smooth={true}
              />
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Glow Effect</h3>
          <Chart
            type="area"
            data={salesData}
            title="Sales with Glow Effect"
            variant="accent"
            size="lg"
            smooth={true}
            glow={true}
          />
        </div>

        {/* Custom Colors */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Custom Color Palette</h3>
          <Chart
            type="pie"
            data={categoryData}
            title="Custom Colors"
            variant="default"
            size="md"
            colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"]}
            showLegend={true}
            legendPosition="right"
          />
        </div>

        {/* Data Labels */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">With Data Labels</h3>
          <Chart
            type="bar"
            data={revenueData}
            title="Revenue with Labels"
            variant="success"
            size="md"
            showLabels={true}
          />
        </div>
      </section>

      {/* ========== LOADING AND EMPTY STATES ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">States</h2>
          <p className="text-muted-foreground">
            Loading and empty state handling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={[]}
            title="Empty State"
            variant="default"
            size="md"
            emptyMessage="No data available"
          />
          <Chart
            type="bar"
            data={salesData}
            title="Loading State"
            variant="default"
            size="md"
            loading={true}
          />
        </div>
      </section>

      {/* ========== RESPONSIVE EXAMPLES ========== */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Responsive Design</h2>
          <p className="text-muted-foreground">
            Charts automatically adapt to container width
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Chart
            type="pie"
            data={categoryData.slice(0, 3)}
            title="Small"
            variant="primary"
            size="sm"
          />
          <Chart
            type="pie"
            data={categoryData.slice(0, 3)}
            title="Small"
            variant="success"
            size="sm"
          />
          <Chart
            type="pie"
            data={categoryData.slice(0, 3)}
            title="Small"
            variant="accent"
            size="sm"
          />
        </div>
      </section>

      {/* ========== USAGE GUIDE ========== */}
      <section className="space-y-4 bg-muted/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Quick Usage Guide</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Compact Props-Based API</h3>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto">
              <code>{`import Chart from '@/components/Chart';

<Chart
  type="line"
  data={[
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 190 },
    // ...
  ]}
  title="Monthly Sales"
  variant="primary"
  size="md"
  smooth={true}
  glow={true}
/>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Component API Format</h3>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto">
              <code>{`import Chart from '@/components/Chart';

<div className="space-y-4">
  <Chart.Title size="lg" align="center">
    Custom Dashboard
  </Chart.Title>
  
  <Chart type="line" data={data} variant="primary" />
  
  <Chart.Legend
    items={[
      { label: 'Revenue', color: '#3b82f6' },
      { label: 'Expenses', color: '#ef4444' }
    ]}
    position="bottom"
  />
</div>`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
