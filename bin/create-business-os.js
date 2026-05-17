#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = "business-os";
const DIRS = [
  "00-context",
  "01-strategy",
  "02-offers",
  "03-marketing",
  "04-website",
  "05-sales",
  "06-operations",
  "07-sops",
  "08-meetings",
  "09-reports",
  "10-prompts",
  "11-ideas",
  "12-archive",
];

const target = path.resolve(process.cwd(), ROOT);
for (const d of DIRS) {
  fs.mkdirSync(path.join(target, d), { recursive: true });
}
console.log(`Created ${ROOT}/ with ${DIRS.length} subdirectories at ${target}`);
