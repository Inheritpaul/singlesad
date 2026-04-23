#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile, access, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`\x1b[31merror:\x1b[0m ${message}`);
  process.exit(1);
}

function printUsage() {
  console.error("Usage: pnpm new-site <slug> <domain>");
  console.error("Example: pnpm new-site firstprusiosuncheon firstprusiosuncheon.co.kr");
}

async function main() {
  const [slug, domain] = process.argv.slice(2);

  if (!slug || !domain) {
    printUsage();
    process.exit(1);
  }

  if (!SLUG_PATTERN.test(slug)) {
    fail(
      `invalid slug "${slug}". Must be lowercase-alphanumeric with dashes (e.g. "firstprusiosuncheon").`
    );
  }

  const starterDir = path.join(repoRoot, "apps", "_starter");
  const targetDir = path.join(repoRoot, "apps", slug);

  if (!existsSync(starterDir)) {
    fail(`starter template not found at ${starterDir}`);
  }

  if (existsSync(targetDir)) {
    fail(`apps/${slug}/ already exists. Pick a different slug or remove the folder first.`);
  }

  console.log(`Creating apps/${slug}/ from apps/_starter/...`);

  await cp(starterDir, targetDir, {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src);
      return base !== "node_modules" && base !== "dist" && base !== ".astro";
    },
  });

  const pkgPath = path.join(targetDir, "package.json");
  const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  pkg.name = `@singlesad/${slug}`;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  const indexPath = path.join(targetDir, "src", "pages", "index.astro");
  let indexContent = await readFile(indexPath, "utf8");
  indexContent = indexContent.replace(
    /const siteName = ".*?";/,
    `const siteName = "${slug}";`
  );
  await writeFile(indexPath, indexContent);

  const envExample = path.join(targetDir, ".env.example");
  const envLocal = path.join(targetDir, ".env.local");
  if (existsSync(envExample)) {
    await copyFile(envExample, envLocal);
  }

  console.log("");
  console.log(`\x1b[32m✓\x1b[0m apps/${slug}/ created`);
  console.log("");
  console.log("Next steps:");
  console.log("");
  console.log(`  1. Upload images to R2 folder: singlesad-assets/${slug}/`);
  console.log(`  2. Create a Cloudflare Pages project named "${slug}" pointing at apps/${slug}`);
  console.log(`     - Build command:   pnpm --filter @singlesad/${slug} build`);
  console.log(`     - Build output:    apps/${slug}/dist`);
  console.log(`     - Root directory:  (leave empty — repo root)`);
  console.log(`  3. Add www.${domain} and ${domain} as custom domains in Cloudflare Pages`);
  console.log(`  4. Implement the Figma design in apps/${slug}/src/pages/index.astro`);
  console.log("");
  console.log("Local dev:");
  console.log(`  pnpm install`);
  console.log(`  pnpm --filter @singlesad/${slug} dev`);
  console.log("");
}

main().catch((err) => {
  fail(err.stack || err.message);
});
