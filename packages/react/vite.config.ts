import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: true,
    hash: false,
    unbundle: true,
    outputOptions: { preserveModules: true },
    inputOptions: { checks: { moduleLevelDirective: false } },
    copy: ["src/*.css", "!src/vendor.css"],
    entry: {
      index: "src/index.ts",
    },
  },
});
