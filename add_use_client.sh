#!/bin/bash
files=(
"src/components/Button/index.tsx"
"src/components/Chart/Chart.tsx"
"src/components/Chart/charts/AreaChartComponent.tsx"
"src/components/Chart/charts/BarChartComponent.tsx"
"src/components/Chart/charts/ComposedChartComponent.tsx"
"src/components/Chart/charts/FunnelChartComponent.tsx"
"src/components/Chart/charts/LineChartComponent.tsx"
"src/components/Chart/charts/PieChartComponent.tsx"
"src/components/Chart/charts/RadarChartComponent.tsx"
"src/components/Chart/charts/RadialBarChartComponent.tsx"
"src/components/Chart/charts/ScatterChartComponent.tsx"
"src/components/Chart/charts/TreemapChartComponent.tsx"
"src/components/Chart/components/ChartContainer.tsx"
"src/components/Chart/components/ChartHeader.tsx"
"src/components/Chart/components/ChartLegend.tsx"
"src/components/Chart/components/ChartLoading.tsx"
"src/components/Chart/components/ChartTooltip.tsx"
"src/components/Chart/components/ChartWrapper.tsx"
"src/components/Chart/index.tsx"
"src/components/CodeEditor/CodeEditor.tsx"
"src/components/CodeEditor/CodeViewer.tsx"
"src/components/CodeEditor/StatusBar.tsx"
"src/components/CodeEditor/TabBar.tsx"
"src/components/CodeEditor/Toolbar.tsx"
"src/components/ColorTest.tsx"
"src/components/Combobox/Combobox.tsx"
"src/components/Combobox/index.tsx"
"src/components/Command/Command.tsx"
"src/components/Command/index.tsx"
"src/components/Container/Container.tsx"
"src/components/Dialog/DialogComponents.tsx"
"src/components/Dialog/DialogOverlay.tsx"
"src/components/Dialog/index.tsx"
"src/components/Drawer/DrawerComponents.tsx"
"src/components/Drawer/DrawerOverlay.tsx"
"src/components/Drawer/index.tsx"
"src/components/Empty/Empty.tsx"
"src/components/Field/Field.tsx"
"src/components/Grid/Grid.tsx"
"src/components/Link/index.tsx"
"src/components/List/ListItem.tsx"
"src/components/NavigationMenu/index.tsx"
"src/components/NavigationMenu/NavigationMenu.tsx"
"src/components/Progress/index.tsx"
"src/components/Resizable/index.tsx"
"src/components/Section/Section.tsx"
"src/components/Skeleton/index.tsx"
"src/components/Spinner/index.tsx"
"src/components/Stack/Stack.tsx"
"src/components/ThemeProvider/index.tsx"
"src/components/Toast/index.tsx"
"src/components/Typography/index.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Add "use client" at the top if it doesn't exist
    if ! grep -q "^['\"]use client['\"]" "$file"; then
      echo "Adding 'use client' to $file"
      # Create temp file with "use client" at top
      echo '"use client";' > temp_file.tmp
      echo '' >> temp_file.tmp
      cat "$file" >> temp_file.tmp
      mv temp_file.tmp "$file"
    fi
  fi
done

echo "Done! Added 'use client' to all component files."
