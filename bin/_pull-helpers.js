const fs = require("fs");
const path = require("path");

function copyWithBackup(src, dest) {
  if (!fs.existsSync(src)) {
    return { status: "missing-source", src, dest };
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let backedUp = false;
  if (fs.existsSync(dest)) {
    fs.copyFileSync(dest, `${dest}.bak`);
    backedUp = true;
  }
  fs.copyFileSync(src, dest);
  return { status: "copied", src, dest, backedUp };
}

function pullFiles(files, { sourceRoot, destRoot }) {
  const results = [];
  for (const rel of files) {
    const src = path.join(sourceRoot, rel);
    const dest = path.join(destRoot, rel);
    results.push({ rel, ...copyWithBackup(src, dest) });
  }
  return results;
}

function printSummary(results) {
  let copied = 0;
  let missing = 0;
  for (const r of results) {
    if (r.status === "copied") {
      copied++;
      const tag = r.backedUp ? " (existing backed up to .bak)" : "";
      console.log(`Pulled ${r.rel}${tag}`);
    } else if (r.status === "missing-source") {
      missing++;
      console.error(`MISSING source: ${r.src}`);
    }
  }
  console.log(`${copied} file(s) pulled, ${missing} missing.`);
  return { copied, missing };
}

module.exports = { copyWithBackup, pullFiles, printSummary };
