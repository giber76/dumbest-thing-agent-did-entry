import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dumbest thing my agent did today: it rebuilt the same game five
// times, then chmodded a folder it didn't own and crashed on its own
// output. True story — the grader's /output is root-owned, the program
// runs as uid 65534, and chmod on it dies with EPERM.
const LINE =
  "My agent rebuilt my game five times, then chmodded a folder it didn't own and crashed on its own output.";

// The gate allows 1-200 characters; fail loudly instead of submitting
// an over-long line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} chars, gate allows 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
