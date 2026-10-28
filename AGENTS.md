# AGENTS.md

- This project uses `bun` as its runtime and package manager.

## Using `vp` (vite-plus)

- This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task.
- Always run `vp check --fix` after changes for oxfmt, oxlint, and integrated TypeScript checks. Do not invoke `tsc` or `tsgo` directly.
- `vp fmt` (oxfmt), `vp lint` (oxlint and typecheck), `vp test` (vitest), `vp run {script}` (runs `package.json` script).
- Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.
