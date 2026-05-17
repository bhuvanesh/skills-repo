#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = "business-os";

const ROOT_FILES = [
  "00-START-HERE.md",
  "BUSINESS-CONTEXT.md",
  "DAILY-COMMAND-CENTRE.md",
  "WEEKLY-REVIEW.md",
  "MONTHLY-REVIEW.md",
];

const STRUCTURE = {
  "01-STRATEGY": [
    "BUSINESS-MODEL.md",
    "POSITIONING.md",
    "CUSTOMER-PROFILES.md",
    "COMPETITOR-NOTES.md",
    "90-DAY-PRIORITIES.md",
  ],
  "02-OFFERS": [
    "OFFER-LADDER.md",
    "MAIN-OFFER.md",
    "OBJECTION-LIBRARY.md",
    "PRICING-NOTES.md",
  ],
  "03-MARKETING": [
    "BRAND-VOICE.md",
    "CONTENT-PILLARS.md",
    "LINKEDIN-SYSTEM.md",
    "EMAIL-SYSTEM.md",
    "CAMPAIGN-BUILDER.md",
    "30-DAY-CONTENT-CALENDAR.md",
  ],
  "04-WEBSITE": [
    "WEBSITE-AUDIT.md",
    "HOMEPAGE-IMPROVEMENT-PLAN.md",
    "SEO-CHECKLIST.md",
    "AI-VISIBILITY-CHECKLIST.md",
    "FAQ-STRUCTURE.md",
  ],
  "05-SALES": [
    "LEAD-FOLLOW-UP-SYSTEM.md",
    "SALES-CALL-PREP.md",
    "PROPOSAL-STRUCTURE.md",
    "FOLLOW-UP-EMAILS.md",
  ],
  "06-OPERATIONS": [
    "OPERATIONS-MAP.md",
    "TASK-DELEGATION.md",
    "CLIENT-DELIVERY.md",
    "BOTTLENECK-REVIEW.md",
  ],
  "07-SOPS": [
    "SOP-TEMPLATE.md",
    "CLIENT-ONBOARDING-SOP.md",
    "CONTENT-PUBLISHING-SOP.md",
    "WEEKLY-REVIEW-SOP.md",
  ],
  "08-MEETINGS": [
    "MEETING-NOTES-TEMPLATE.md",
    "MEETING-SUMMARY-PROMPT.md",
    "ACTION-ITEM-TRACKER.md",
  ],
  "09-REPORTS": [
    "WEEKLY-BUSINESS-REPORT.md",
    "MARKETING-REPORT.md",
    "SALES-PIPELINE-REVIEW.md",
  ],
  "10-PROMPT-LIBRARY": [
    "DAILY-CEO-PROMPT.md",
    "WEBSITE-AUDIT-PROMPT.md",
    "CONTENT-REPURPOSE-PROMPT.md",
    "SOP-CREATOR-PROMPT.md",
    "SALES-FOLLOW-UP-PROMPT.md",
    "MEETING-SUMMARY-PROMPT.md",
    "DECISION-MAKING-PROMPT.md",
    "WEEKLY-REVIEW-PROMPT.md",
  ],
};

const target = path.resolve(process.cwd(), ROOT);
fs.mkdirSync(target, { recursive: true });

let createdFiles = 0;
let skippedFiles = 0;

function writeIfMissing(filePath) {
  if (fs.existsSync(filePath)) {
    skippedFiles++;
    return;
  }
  fs.writeFileSync(filePath, "");
  createdFiles++;
}

for (const file of ROOT_FILES) {
  writeIfMissing(path.join(target, file));
}

for (const [dir, files] of Object.entries(STRUCTURE)) {
  const dirPath = path.join(target, dir);
  fs.mkdirSync(dirPath, { recursive: true });
  for (const file of files) {
    writeIfMissing(path.join(dirPath, file));
  }
}

console.log(`Scaffolded ${ROOT}/ at ${target}`);
console.log(`Created ${createdFiles} files, skipped ${skippedFiles} existing.`);
