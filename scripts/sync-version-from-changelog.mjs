#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const options = parseArgs(process.argv.slice(2));
const changelogPath = options.changelog ?? "docs/changelogs/CHANGELOG.md";
const targetFiles = [
  "package.json",
];

const changelog = readChangelog(changelogPath, options.ref);
const version = parseLatestChangelogVersion(changelog);

if (options.printVersion) {
  process.stdout.write(`${version}\n`);
  process.exit(0);
}

if (options.printNotes) {
  process.stdout.write(`${parseLatestChangelogNotes(changelog)}\n`);
  process.exit(0);
}

const changes = [];

for (const targetFile of targetFiles) {
  const absolutePath = resolve(repoRoot, targetFile);
  const current = readFileSync(absolutePath, "utf8");
  const next = updateTargetFile(targetFile, current, version);

  if (current !== next) {
    changes.push(targetFile);
    if (!options.check && !options.dryRun) {
      writeFileSync(absolutePath, next);
    }
  }
}

if (changes.length === 0) {
  console.log(`Project version already matches CHANGELOG.md: ${version}`);
  process.exit(0);
}

if (options.check) {
  console.error(
    `Project version is out of sync with CHANGELOG.md (${version}): ${changes.join(", ")}`,
  );
  process.exit(1);
}

if (options.dryRun) {
  console.log(
    `Would sync project version to ${version}: ${changes.join(", ")}`,
  );
  process.exit(0);
}

console.log(`Synced project version to ${version}: ${changes.join(", ")}`);

function parseArgs(args) {
  const parsed = {
    check: false,
    dryRun: false,
    printVersion: false,
    printNotes: false,
    changelog: null,
    ref: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--check") {
      parsed.check = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg === "--print-version") {
      parsed.printVersion = true;
      continue;
    }

    if (arg === "--print-notes") {
      parsed.printNotes = true;
      continue;
    }

    if (arg === "--changelog") {
      parsed.changelog = readOptionValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--ref") {
      parsed.ref = readOptionValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (parsed.check && parsed.dryRun) {
    throw new Error("Use either --check or --dry-run, not both.");
  }

  return parsed;
}

function readOptionValue(args, index, optionName) {
  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`${optionName} requires a value.`);
  }

  return value;
}

function printHelp() {
  console.log(`Usage: pnpm version:sync [options]

Updates package.json from the latest version heading in
docs/changelogs/CHANGELOG.md. Run this on main after adding the new
top-level changelog entry.

Options:
  --check              Exit non-zero when targets do not match.
  --dry-run            Print the files that would change without writing them.
  --print-version      Print the latest CHANGELOG version to stdout and exit.
  --print-notes        Print the latest CHANGELOG section (release notes) and exit.
  --changelog <path>   Read a different changelog path.
  --ref <git-ref>      Read the changelog from a git ref, e.g. main.
`);
}

function readChangelog(relativePath, ref) {
  if (!ref) {
    return readFileSync(resolve(repoRoot, relativePath), "utf8");
  }

  return execFileSync("git", ["show", `${ref}:${relativePath}`], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

function parseLatestChangelogVersion(changelog) {
  const match = changelog.match(
    /^##\s+\[v?(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\]/m,
  );

  if (!match) {
    throw new Error(
      "Could not find a version heading like `## [1.2.3]` in CHANGELOG.md.",
    );
  }

  return match[1];
}

function parseLatestChangelogNotes(changelog) {
  const lines = changelog.split("\n");
  const versionHeading = /^##\s+\[v?(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\]/;
  const nextVersionHeading = /^##\s+\[/;

  const startIndex = lines.findIndex((line) => versionHeading.test(line));

  if (startIndex === -1) {
    throw new Error(
      "Could not find a version heading like `## [1.2.3]` in CHANGELOG.md.",
    );
  }

  const body = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (nextVersionHeading.test(lines[index])) {
      break;
    }
    body.push(lines[index]);
  }

  // Drop the trailing `---` separator (and surrounding blanks) that precedes
  // the next section, then trim leading/trailing blank lines.
  while (body.length > 0) {
    const last = body[body.length - 1].trim();
    if (last === "" || last === "---") {
      body.pop();
      continue;
    }
    break;
  }
  while (body.length > 0 && body[0].trim() === "") {
    body.shift();
  }

  // Promote section headings one level (`### ` -> `## `) to match the heading
  // level used in published GitHub releases.
  return body.map((line) => line.replace(/^### /, "## ")).join("\n");
}

function updateTargetFile(relativePath, content, version) {
  if (relativePath.endsWith("package.json")) {
    return updatePackageJson(relativePath, content, version);
  }

  if (relativePath === "README.md") {
    return updateReadme(content, version);
  }

  throw new Error(`Unsupported target file: ${relativePath}`);
}

function updatePackageJson(relativePath, content, version) {
  const packageJson = JSON.parse(content);

  if (typeof packageJson.version !== "string") {
    throw new Error(`${relativePath} does not contain a string version field.`);
  }

  packageJson.version = version;
  return `${JSON.stringify(packageJson, null, 2)}\n`;
}

function updateReadme(content, version) {
  const versionLinePattern =
    /^Version:\s*v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?(\s*\|\s*\[Change log\]\(CHANGELOG\.md\).*)$/m;

  if (!versionLinePattern.test(content)) {
    throw new Error(
      "README.md does not contain a version line like `Version: 1.2.3 | [Change log](CHANGELOG.md)`.",
    );
  }

  return content.replace(versionLinePattern, `Version: ${version}$1`);
}
