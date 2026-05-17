#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "onboarding-help";
const SRC = path.resolve(__dirname, "..", "skills", SKILL_NAME, "SKILL.md");
const DEST_DIR = path.join(os.homedir(), ".claude", "skills", SKILL_NAME);
const DEST = path.join(DEST_DIR, "SKILL.md");

if (!fs.existsSync(SRC)) {
  console.error(`Source skill not found at ${SRC}`);
  process.exit(1);
}

fs.mkdirSync(DEST_DIR, { recursive: true });

if (fs.existsSync(DEST)) {
  const backup = `${DEST}.bak`;
  fs.copyFileSync(DEST, backup);
  console.log(`Existing skill backed up to ${backup}`);
}

fs.copyFileSync(SRC, DEST);
console.log(`Installed '${SKILL_NAME}' to ${DEST}`);
console.log(`Invoke in Claude Code with: /${SKILL_NAME} <filename>`);
