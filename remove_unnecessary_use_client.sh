#!/bin/bash

# Components that should be SERVER COMPONENTS (no hooks, no browser APIs)
server_components=(
"src/components/Button/index.tsx"
"src/components/Typography/index.tsx"
"src/components/Container/Container.tsx"
"src/components/Grid/Grid.tsx"
"src/components/Stack/Stack.tsx"
"src/components/Section/Section.tsx"
"src/components/Empty/Empty.tsx"
"src/components/Skeleton/index.tsx"
"src/components/Spinner/index.tsx"
"src/components/Link/index.tsx"
"src/components/List/ListItem.tsx"
"src/components/Field/Field.tsx"
)

for file in "${server_components[@]}"; do
  if [ -f "$file" ]; then
    # Remove "use client" line and the empty line after it
    if grep -q "^['\"]use client['\"]" "$file"; then
      echo "Removing 'use client' from $file (can be server component)"
      # Remove first line if it's "use client" and the empty line after
      sed -i '1{/^"use client";$/d;}' "$file"
      sed -i '1{/^$/d;}' "$file"
    fi
  fi
done

echo "Done! Removed 'use client' from components that can be server components."
