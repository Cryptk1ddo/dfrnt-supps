#!/bin/bash

# Fix all unescaped quotes and apostrophes in TypeScript files
# This script will replace common unescaped entities

echo "Fixing ESLint errors in TypeScript files..."

# Find all .tsx files and fix unescaped quotes
find src -name "*.tsx" -type f -exec sed -i '' \
  -e "s/\([^\\]\)'\([^']*\)'/\1\\&apos;\2\\&apos;/g" \
  -e 's/\([^\\]\)"\([^"]*\)"/\1\&quot;\2\&quot;/g' \
  {} \;

echo "Done!"
