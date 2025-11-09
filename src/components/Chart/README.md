# Chart

A powerful and flexible charting component built on top of popular charting libraries. Visualize data with various chart types including line, bar, pie, area, and more.

## Features

- 📊 **Multiple Chart Types** - Line, bar, pie, area, radar, and more
- 🎨 **Customizable** - Colors, labels, legends, tooltips
- 📱 **Responsive** - Automatically adapts to container size
- ✨ **Animations** - Smooth transitions and interactions
- 🎯 **Interactive** - Click, hover, and zoom capabilities
- ♿ **Accessible** - Screen reader support and keyboard navigation
- 📈 **Real-time Updates** - Support for live data streaming
- 🎨 **Themes** - Light and dark mode support

## Installation

\`\`\`tsx
import { Chart } from '@saha-ui/core';
\`\`\`

## Basic Usage

### Line Chart

\`\`\`tsx
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales',
    data: [30, 45, 35, 50, 45, 60],
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

<Chart type="line" data={data} />
\`\`\`

### Bar Chart

\`\`\`tsx
const data = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 8000, 15000],
    backgroundColor: 'rgba(54, 162, 235, 0.5)'
  }]
};

<Chart type="bar" data={data} />
\`\`\`

### Pie Chart

\`\`\`tsx
const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
};

<Chart type="pie" data={data} />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`type\` | \`"line" \| "bar" \| "pie" \| "doughnut" \| "radar" \| "polarArea"\` | \`"line"\` | Chart type |
| \`data\` | \`ChartData\` | **required** | Chart data |
| \`options\` | \`ChartOptions\` | \`{}\` | Chart configuration options |
| \`width\` | \`number \| string\` | \`"100%"\` | Chart width |
| \`height\` | \`number \| string\` | \`300\` | Chart height |
| \`className\` | \`string\` | - | Additional CSS classes |

## Related Components

- **StatCard** - Display statistics with charts
- **Card** - Container for charts
- **DataTable** - Tabular data display
