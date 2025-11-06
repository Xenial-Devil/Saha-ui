#!/bin/bash

echo "=== Saha UI Build Verification ==="
echo ""

echo "1. TypeScript Check..."
npx tsc --noEmit && echo "✅ TypeScript: PASS" || echo "❌ TypeScript: FAIL"

echo ""
echo "2. Component Count..."
echo "Total Components: $(find src/components -maxdepth 1 -type d | wc -l)"
echo "Type Files: $(find src/components -name "*.types.ts" | wc -l)"

echo ""
echo "3. Build Test..."
npm run build > /dev/null 2>&1 && echo "✅ Build: PASS" || echo "❌ Build: FAIL"

echo ""
echo "4. Exports Check..."
echo "Main exports available:"
grep -c "^export" src/index.ts

echo ""
echo "=== Verification Complete ==="
