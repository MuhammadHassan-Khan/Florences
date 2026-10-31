/**
 * prune-package-deps.mjs — removes injected backend/framework dependencies
 * from package.json (see purge-foreign.ps1).
 *
 * The workspace folder is shared with an external process that can add
 * packages from an unrelated product (Supabase, server-only, LiveKit…).
 * This project is a client-only MVP, so those dependencies are purged
 * before every check — owner-approved. Only explicitly foreign packages
 * are touched; project dependencies are left alone.
 *
 * Prints one line per removed dependency; prints nothing when clean.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = join(root, "package.json");

const FOREIGN_EXACT = new Set(["server-only"]);
const FOREIGN_PREFIXES = ["@supabase/", "@livekit/"];
const FOREIGN_NAMES = new Set(["next", "next-intl"]);

function isForeign(name) {
  return (
    FOREIGN_EXACT.has(name) ||
    FOREIGN_NAMES.has(name) ||
    FOREIGN_PREFIXES.some((prefix) => name.startsWith(prefix))
  );
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const removed = [];

for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
  const deps = pkg[field];
  if (!deps) continue;
  for (const name of Object.keys(deps)) {
    if (isForeign(name)) {
      delete deps[name];
      removed.push(`${field}: ${name}`);
    }
  }
}

if (removed.length > 0) {
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

for (const entry of removed) {
  console.log(`package.json: ${entry}`);
}
