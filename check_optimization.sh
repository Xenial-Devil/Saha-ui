#!/bin/bash

echo "=== Component Optimization Check ==="
echo ""

echo "1. Checking for inline arrow functions in JSX..."
grep -r "onClick={() =>" src/components --include="*.tsx" | wc -l

echo ""
echo "2. Checking for inline object creation in JSX..."
grep -r "style={{" src/components --include="*.tsx" | wc -l

echo ""
echo "3. Checking for missing React.memo..."
echo "Total components with React.forwardRef:"
grep -r "React.forwardRef" src/components --include="*.tsx" | wc -l
echo "Total components with React.memo:"
grep -r "React.memo" src/components --include="*.tsx" | wc -l

echo ""
echo "4. Checking for missing useMemo/useCallback..."
echo "Components using useMemo:"
grep -r "useMemo" src/components --include="*.tsx" | wc -l
echo "Components using useCallback:"
grep -r "useCallback" src/components --include="*.tsx" | wc -l

echo ""
echo "5. Checking for console.log statements..."
grep -r "console.log" src/components --include="*.tsx" --include="*.ts" | wc -l

echo ""
echo "6. Checking for TODO/FIXME comments..."
grep -r "TODO\|FIXME" src/components --include="*.tsx" --include="*.ts" | wc -l

