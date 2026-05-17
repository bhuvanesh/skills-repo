#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const FILE = "CLAUDE.md";
const SRC = path.resolve(__dirname, "..", "templates", FILE);
const DEST_DIR = path.resolve(process.cwd(), "templates");
const DEST = path.join(DEST_DIR, FILE);

if (!fs.existsSync(SRC)) {
  console.error(`Template not found at ${SRC}`);
  process.exit(1);
}

fs.mkdirSync(DEST_DIR, { recursive: true });

if (fs.existsSync(DEST)) {
  const backup = `${DEST}.bak`;
  fs.copyFileSync(DEST, backup);
  console.log(`Existing ${FILE} backed up to ${backup}`);
}

fs.copyFileSync(SRC, DEST);
console.log(`Pulled ${FILE} to ${DEST}`);
