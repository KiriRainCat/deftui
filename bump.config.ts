import { defineConfig } from "bumpp";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

if (execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim()) {
  throw new Error("Commit or stash your changes before releasing.");
}

const packages = [...new Bun.Glob("packages/*/package.json").scanSync()]
  .map((path) => path.replaceAll("\\", "/"))
  .map((path) => ({ path, manifest: JSON.parse(readFileSync(path, "utf8")) }))
  .filter(({ manifest }) => !manifest.private);

export default defineConfig({
  all: true,
  files: packages.map(({ path }) => path),
  commit: "chore(release): bump version to {tag}",
  execute: ({ state }) => {
    const deps = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
    const names = packages.map(({ manifest }) => manifest.name);
    for (const { path } of packages) {
      const manifest = JSON.parse(readFileSync(path, "utf8"));
      for (const field of deps) for (const name of names) if (manifest[field]?.[name]) manifest[field][name] = `^${state.newVersion}`;
      writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
    }
  },
});
