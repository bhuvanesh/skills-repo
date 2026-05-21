#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { pullFiles, printSummary } = require("./_pull-helpers");

const FILES = [
  "WEEK-1.html",
  "WEEK-1-README.md",
  "00-START-HERE.md",
  "01-STRATEGY/BUSINESS-MODEL.md",
  "01-STRATEGY/POSITIONING.md",
  "01-STRATEGY/CUSTOMER-PROFILES.md",
  "01-STRATEGY/COMPETITOR-NOTES.md",
  "01-STRATEGY/90-DAY-PRIORITIES.md",
];

// Recommended fill order — matches the order in WEEK-1-README.md.
// CLAUDE.md is omitted because it's instructions for Claude, not a fill-in template.
const FILL_ORDER = [
  "BUSINESS-CONTEXT.md",
  "00-START-HERE.md",
  "01-STRATEGY/BUSINESS-MODEL.md",
  "01-STRATEGY/CUSTOMER-PROFILES.md",
  "01-STRATEGY/POSITIONING.md",
  "01-STRATEGY/COMPETITOR-NOTES.md",
  "01-STRATEGY/90-DAY-PRIORITIES.md",
];

const sourceRoot = path.resolve(__dirname, "..", "templates");
const destRoot = path.resolve(process.cwd(), "templates");

const results = pullFiles(FILES, { sourceRoot, destRoot });
const { missing } = printSummary(results);

if (missing === 0) {
  console.log("");
  console.log("Next steps:");
  console.log("");
  console.log("  Read the guide:");
  console.log("    open templates/WEEK-1.html");
  console.log("");
  console.log("  Fill each template with /onboarding-help (recommended order):");
  for (const f of FILL_ORDER) {
    console.log(`    /onboarding-help templates/${f}`);
  }

  const missingFoundational = [];
  if (!fs.existsSync(path.join(destRoot, "BUSINESS-CONTEXT.md"))) {
    missingFoundational.push("    npx pull-business-context   (adds BUSINESS-CONTEXT.md)");
  }
  if (!fs.existsSync(path.join(destRoot, "CLAUDE.md"))) {
    missingFoundational.push("    npx pull-claude-md          (adds CLAUDE.md)");
  }
  if (missingFoundational.length > 0) {
    console.log("");
    console.log("  Missing foundational files — run these first:");
    for (const line of missingFoundational) console.log(line);
  }

  console.log("");
  console.log("  CLAUDE.md is for Claude's instructions — edit it manually if needed.");
  console.log("");
}

process.exit(missing > 0 ? 1 : 0);
