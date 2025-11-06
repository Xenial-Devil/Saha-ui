#!/bin/bash

# Chart components that are purely presentational (no hooks, just props)
static_chart_components=(
"src/components/Chart/components/ChartHeader.tsx"
"src/components/Chart/components/ChartLoading.tsx"
)

for file in "${static_chart_components[@]}"; do
  if [ -f "$file" ]; then
    if grep -q "^['\"]use client['\"]" "$file"; then
      echo "Removing 'use client' from $file (static component)"
      sed -i '1{/^"use client";$/d;}' "$file"
      sed -i '1{/^$/d;}' "$file"
    fi
  fi
done

echo "Done!"
