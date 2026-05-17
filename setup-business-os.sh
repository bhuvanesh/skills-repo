#!/usr/bin/env bash
set -euo pipefail

ROOT="business-os"

dirs=(
  "00-context"
  "01-strategy"
  "02-offers"
  "03-marketing"
  "04-website"
  "05-sales"
  "06-operations"
  "07-sops"
  "08-meetings"
  "09-reports"
  "10-prompts"
  "11-ideas"
  "12-archive"
)

for d in "${dirs[@]}"; do
  mkdir -p "$ROOT/$d"
done

echo "Created $ROOT/ with ${#dirs[@]} subdirectories."
